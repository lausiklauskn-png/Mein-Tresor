// Headless-Beweis für die Gesamt-Sicherung (Scheibe 2b): die ganze Bibliothek wird zu EINER
// Datei zusammengefasst und mit dem Super-Passwort verschlüsselt; das Super-Passwort ist über
// 3-von-5-Codes wiederherstellbar. Geprüft wird die echte Krypto-Kette, wie die App sie nutzt.

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const html = readFileSync(resolve(ROOT, "jasons-bibliothek/index.html"), "utf8");
const core = html.slice(html.indexOf("// JASONLIB-CORE-START"), html.indexOf("// JASONLIB-CORE-END"));
// eslint-disable-next-line no-new-func
const L = new Function("window", "module", core + "\n;return window.JasonLib;")({}, {});

const SUPER = "Super-Passwort-für-alles-123";

// Eine realistische Gesamt-Sicherung: jt-vaults mit einem echten (eigen-verschlüsselten) Buch.
async function makeBundle() {
  const buchTresor = await L.encryptTresor(
    L.buildLibraryExport([ L.makeEntry({ name: "Konto", payload: { iban: "GEHEIM" } }) ]),
    "buch-eigenes-passwort"
  );
  return {
    schemaVersion: 1, kind: "jt-gesamtsicherung", version: 1, exportedAt: L.nowIso(),
    vaults: { "1-0-1": { tresor: buchTresor, name: "Mein Buch", category: "Finanzen" } },
    names: { "1-0-1": "Mein Buch" },
    liste: null, layout: null, shelves: null
  };
}

test("Gesamt-Sicherung: Super-Passwort verschlüsselt -> entschlüsselt deckungsgleich", async () => {
  const bundle = await makeBundle();
  const blob = await L.encryptTresor(bundle, SUPER);
  assert.equal(L.isTresor(blob), true);
  const back = await L.decryptTresor(blob, SUPER);
  assert.equal(back.kind, "jt-gesamtsicherung");
  assert.deepEqual(back, bundle);                          // ganze Bibliothek byte-genau zurück
  // das innere Buch ist weiterhin durch sein EIGENES Passwort geschützt (Doppel-Schutz)
  const innen = await L.decryptTresor(back.vaults["1-0-1"].tresor, "buch-eigenes-passwort");
  assert.equal(L.payloadToEntries(innen, "B").entries[0].payload.iban, "GEHEIM");
});

test("Gesamt-Sicherung: falsches Super-Passwort scheitert", async () => {
  const blob = await L.encryptTresor(await makeBundle(), SUPER);
  await assert.rejects(() => L.decryptTresor(blob, "falsch-000"));
});

test("Super-Passwort: 3 von 5 Codes stellen es wieder her", async () => {
  const res = await L.splitSecret(SUPER);
  assert.equal(res.shares.length, 5);
  // beliebige 3 (hier 0,2,4) ergeben das Super-Passwort byte-genau zurück
  const back = await L.combineShares([res.shares[0], res.shares[2], res.shares[4]]);
  assert.equal(back, SUPER);
  // 2 Codes genügen NICHT
  await assert.rejects(() => L.combineShares([res.shares[0], res.shares[1]]));
});
