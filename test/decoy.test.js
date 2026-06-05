// Headless-Beweis fuer das Tarnfach / den Honigtopf (Stufe-2-Alternative).
// Prinzip wie die anderen Tests: der JasonLib-Kern wird zwischen den Markern aus der
// ausgelieferten Datei geschnitten und in einer Sandbox ausgefuehrt — keine Kopie der Logik.
// Geprueft wird die echte Krypto-Aufloesung openVault(rec, pw):
//   echtes Passwort -> echte Daten (mode 'real'); Koeder-Passwort -> Schein-Bibliothek
//   (mode 'decoy'); falsches Passwort scheitert (AES-GCM-Auth-Tag).

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
const L = new Function("window", "module", core + "\n;return window.JasonLib;")(root, {});

const REAL_PW = "echtes-Passwort-123";
const DECOY_PW = "Koeder-Passwort-456";

function realLib() {
  return L.buildLibraryExport([
    L.makeEntry({ name: "Konto", category: "Finanzen", payload: { iban: "GEHEIM", saldo: 42 } }),
    L.makeEntry({ name: "Vermaechtnis", category: "Privat", payload: { text: "nur fuer Klaus" } })
  ]);
}
function decoyLib() {
  return L.buildLibraryExport([
    L.makeEntry({ name: "Einkaufsliste", category: "Alltag", payload: { artikel: ["Milch", "Brot"] } }),
    L.makeEntry({ name: "Apfelkuchen", category: "Rezepte", payload: { zutaten: ["Aepfel", "Mehl"] } })
  ]);
}

async function makeRecord(withDecoy) {
  const tresor = await L.encryptTresor(realLib(), REAL_PW);
  const rec = { tresor: tresor, name: "Mein Buch" };
  if (withDecoy) rec.decoy = await L.encryptTresor(decoyLib(), DECOY_PW);
  return rec;
}

test("openVault ist exportiert", () => {
  assert.equal(typeof L.openVault, "function");
});

test("echtes Passwort -> mode 'real' + echte Daten", async () => {
  const rec = await makeRecord(true);
  const res = await L.openVault(rec, REAL_PW);
  assert.equal(res.mode, "real");
  const got = L.payloadToEntries(res.plain, "Buch").entries.map(e => e.name).sort();
  assert.deepEqual(got, ["Konto", "Vermaechtnis"]);
});

test("Koeder-Passwort -> mode 'decoy' + harmlose Schein-Bibliothek", async () => {
  const rec = await makeRecord(true);
  const res = await L.openVault(rec, DECOY_PW);
  assert.equal(res.mode, "decoy");
  const got = L.payloadToEntries(res.plain, "Buch").entries.map(e => e.name).sort();
  assert.deepEqual(got, ["Apfelkuchen", "Einkaufsliste"]);
  // ehrlich: der Koeder enthaelt KEINE echten Daten
  assert.equal(JSON.stringify(res.plain).includes("GEHEIM"), false);
});

test("falsches Passwort scheitert (auch mit Tarnfach)", async () => {
  const rec = await makeRecord(true);
  await assert.rejects(() => L.openVault(rec, "voellig-falsch-000"));
});

test("ohne Tarnfach: echtes Passwort oeffnet, Koeder-Passwort scheitert", async () => {
  const rec = await makeRecord(false);
  const res = await L.openVault(rec, REAL_PW);
  assert.equal(res.mode, "real");
  await assert.rejects(() => L.openVault(rec, DECOY_PW), "ohne decoy darf ein zweites Passwort NICHT oeffnen");
});

test("Tarnfach ist ein eigener, unabhaengiger AES-256-GCM-Umschlag", async () => {
  const rec = await makeRecord(true);
  assert.equal(L.isTresor(rec.tresor), true);
  assert.equal(L.isTresor(rec.decoy), true);
  // verschiedene Salts/IVs/Chiffren -> die Umschlaege verraten ihre Verwandtschaft nicht
  assert.notEqual(rec.tresor.ciphertext, rec.decoy.ciphertext);
  assert.notEqual(rec.tresor.kdf.salt, rec.decoy.kdf.salt);
});
