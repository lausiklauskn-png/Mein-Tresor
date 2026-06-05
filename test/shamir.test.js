// Headless-Beweis fuer Shamir 3-von-5 (Geheimnis aufteilen) im JasonLib-Kern.
// Prinzip wie test/jason_lib.test.js: wir schneiden GENAU die ausgelieferten Bytes
// zwischen den Markern aus jasons-bibliothek/index.html und fuehren sie in einer
// Sandbox aus. Keine Kopie der Logik. Echte GF(256)-Mathematik + WebCrypto (Node >=20).

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const html = readFileSync(resolve(ROOT, "jasons-bibliothek/index.html"), "utf8");

const START = "// JASONLIB-CORE-START";
const END = "// JASONLIB-CORE-END";
const a = html.indexOf(START);
const b = html.indexOf(END);
assert.ok(a !== -1 && b !== -1 && b > a, "Kern-Marker in index.html gefunden");
const core = html.slice(a, b);

const root = {};
// eslint-disable-next-line no-new-func
const run = new Function("window", "module", core + "\n;return window.JasonLib;");
const L = run(root, {});

// Alle 3-aus-5-Kombinationen (C(5,3)=10), genutzt fuer die Vollabdeckung.
function combos3(arr) {
  const out = [];
  for (let i = 0; i < arr.length; i++)
    for (let j = i + 1; j < arr.length; j++)
      for (let k = j + 1; k < arr.length; k++) out.push([arr[i], arr[j], arr[k]]);
  return out;
}

test("Shamir-API ist vorhanden + Kennzahlen 3 von 5", () => {
  assert.equal(typeof L.splitSecret, "function");
  assert.equal(typeof L.combineShares, "function");
  assert.equal(L.shamirInfo.k, 3);
  assert.equal(L.shamirInfo.n, 5);
  assert.equal(L.shamirInfo.tag, "JT3v5");
});

test("GF(256) selbst: Identitaeten, AES-Bekanntwert, jedes Element invertierbar, Distributivitaet", () => {
  // Neutrale/absorbierende Elemente
  for (let x = 0; x < 256; x++) {
    assert.equal(L._gfMul(0, x), 0);
    assert.equal(L._gfMul(1, x), x);
  }
  // Klassischer AES-Bekanntwert: 0x53 * 0xCA = 0x01 (multiplikative Inverse).
  assert.equal(L._gfMul(0x53, 0xca), 0x01);
  // Jedes von 0 verschiedene Element hat genau eine Inverse: a * (1/a) == 1.
  for (let aa = 1; aa < 256; aa++) assert.equal(L._gfMul(aa, L._gfDiv(1, aa)), 1);
  // Distributivitaet a*(b+c) == a*b + a*c  (in GF ist + == XOR), Stichprobe.
  for (const [x, y, z] of [[0x57, 0x83, 0x1f], [0xff, 0x02, 0x10], [0x9a, 0x9a, 0x01]]) {
    assert.equal(L._gfMul(x, y ^ z), L._gfMul(x, y) ^ L._gfMul(x, z));
  }
});

test("Aufteilen -> beliebige 3 von 5 ergeben das Original (ALLE 10 Kombinationen)", async () => {
  const secret = "buchpasswort-2026!";
  const res = await L.splitSecret(secret);
  assert.equal(res.shares.length, 5);
  res.shares.forEach((s, i) => assert.match(s, new RegExp("^JT3v5-" + (i + 1) + "-")));
  const all = combos3(res.shares);
  assert.equal(all.length, 10);
  for (const three of all) assert.equal(await L.combineShares(three), secret);
});

test("Auch 4 oder 5 Teile stellen wieder her", async () => {
  const secret = "noch-ein-Pass_wort";
  const res = await L.splitSecret(secret);
  assert.equal(await L.combineShares(res.shares.slice(0, 4)), secret);
  assert.equal(await L.combineShares(res.shares), secret);
});

test("2 Teile sind wertlos -> sauberer Fehler (kein halbes Geheimnis)", async () => {
  const res = await L.splitSecret("geheimnisvoll");
  await assert.rejects(() => L.combineShares(res.shares.slice(0, 2)), /Zu wenige Teile/);
  await assert.rejects(() => L.combineShares([res.shares[0]]), /Zu wenige Teile/);
});

test("UTF-8 byte-genau: Umlaute, Emoji, Sonderzeichen, kurz & lang", async () => {
  const secrets = [
    "x",                                   // 1 Byte
    "Käse & Wür«st» — über/Öl48",         // Umlaute + Sonderzeichen
    "🔑🗝️ Tresor 🐉 3v5 ✓",                // Emoji (Mehr-Byte)
    "p".repeat(512)                        // lang
  ];
  for (const sec of secrets) {
    const res = await L.splitSecret(sec);
    // eine zufaellig gemischte Auswahl von 3 Teilen
    const pick = [res.shares[4], res.shares[1], res.shares[2]];
    assert.equal(await L.combineShares(pick), sec);
  }
});

test("Manipuliertes/verschriebenes Teil faellt auf (Pruefziffer)", async () => {
  const res = await L.splitSecret("passwort-integritaet");
  const good = res.shares.slice(0, 3);
  // Ein Zeichen im Nutzdaten-Teil von Teil 1 kippen (hinter 'JT3v5-1-').
  const s = good[0];
  const head = "JT3v5-1-";
  const body = s.slice(head.length);
  const flip = (body[0] === "A" ? "B" : "A") + body.slice(1);
  const tampered = [head + flip, good[1], good[2]];
  await assert.rejects(() => L.combineShares(tampered), /verschrieben|beschaedigt|Pruefziffer|fehlgeschlagen/);
});

test("Teile aus zwei verschiedenen Aufteilungen passen nicht zusammen", async () => {
  const A = await L.splitSecret("derselbe-text");
  const B = await L.splitSecret("derselbe-text"); // gleiches Geheimnis, andere Split-ID
  await assert.rejects(() => L.combineShares([A.shares[0], A.shares[1], B.shares[2]]),
    /gehoeren nicht zum selben Geheimnis/);
});

test("Doppeltes Teil wird erkannt", async () => {
  const res = await L.splitSecret("kein-doppel");
  await assert.rejects(() => L.combineShares([res.shares[0], res.shares[0], res.shares[1]]),
    /doppelt/);
});

test("Zwei Aufteilungen desselben Geheimnisses sind unterschiedlich (Zufall), beide korrekt", async () => {
  const sec = "zufall-pruefen";
  const A = await L.splitSecret(sec);
  const B = await L.splitSecret(sec);
  assert.notDeepEqual(A.shares, B.shares); // andere Polynome/Split-ID
  assert.equal(await L.combineShares(A.shares.slice(0, 3)), sec);
  assert.equal(await L.combineShares(B.shares.slice(2, 5)), sec);
});

test("Eingabe-Robustheit: Unsinn, leer, leere Geheimnisse werden sauber abgewiesen", async () => {
  await assert.rejects(() => L.combineShares(["kein-code", "auch-nicht", "nope"]), /Kein gueltiger Teil-Code/);
  await assert.rejects(() => L.combineShares([]), /Keine Teile/);
  await assert.rejects(() => L.splitSecret(""), /fehlt/);
  await assert.rejects(() => L.splitSecret("p".repeat(L.shamirInfo.maxLen + 1)), /zu lang/);
  // parseShare erkennt einen gueltigen Teil und gibt die Kennzahlen zurueck.
  const res = await L.splitSecret("kurz123");
  const p = L.parseShare(res.shares[0]);
  assert.equal(p.ok, true);
  assert.equal(p.k, 3);
  assert.equal(p.n, 5);
  assert.equal(p.x, 1);
});
