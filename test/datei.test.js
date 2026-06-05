// Headless-Beweis: beliebige Dateien (nicht nur JSON) überstehen den echten Tresor-Rundlauf.
// Eine Datei wird als Eintrag mit payload {kind:'jt-datei', ... data:<DataURL>} abgelegt;
// hier wird geprueft, dass dieser Eintrag durch encryptTresor -> decryptTresor -> payloadToEntries
// BYTE-GENAU zurueckkommt (echte AES-256-GCM-Krypto, kein Datenverlust).

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

const PW = "datei-passwort-123";
// Ein kleines "Binaer"-Beispiel als DataURL (PNG-Header-Bytes), wie es readAsDataURL liefert.
const DATA_URL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";

function fileEntry(name, mime, size, data) {
  return L.makeEntry({ name: name, category: "Bilder", payload: {
    kind: "jt-datei", filename: name, mimeType: mime, size: size, encoding: "dataurl", data: data
  }});
}

test("Datei-Eintrag überlebt encrypt -> decrypt byte-genau", async () => {
  const lib = L.buildLibraryExport([ fileEntry("foto.png", "image/png", 70, DATA_URL) ]);
  const blob = await L.encryptTresor(lib, PW);
  const plain = await L.decryptTresor(blob, PW);
  const entries = L.payloadToEntries(plain, "Buch").entries;
  assert.equal(entries.length, 1);
  const p = entries[0].payload;
  assert.equal(p.kind, "jt-datei");
  assert.equal(p.filename, "foto.png");
  assert.equal(p.mimeType, "image/png");
  assert.equal(p.size, 70);
  assert.equal(p.data, DATA_URL);                 // byte-genau, kein Verlust
  assert.equal(entries[0].category, "Bilder");
});

test("mehrere Dateien + falsches Passwort", async () => {
  const lib = L.buildLibraryExport([
    fileEntry("a.bin", "application/octet-stream", 12, "data:application/octet-stream;base64,QUJDREVG"),
    fileEntry("b.txt", "text/plain", 5, "data:text/plain;base64,aGVsbG8=")
  ]);
  const blob = await L.encryptTresor(lib, PW);
  const entries = L.payloadToEntries(await L.decryptTresor(blob, PW), "Buch").entries;
  assert.deepEqual(entries.map(e => e.payload.filename).sort(), ["a.bin", "b.txt"]);
  await assert.rejects(() => L.decryptTresor(blob, "falsch-000"));   // AES-GCM-Auth-Tag
});

test("selbstgebautes Format wird als opake Bytes bewahrt", async () => {
  const weird = "data:application/x-klaus-format;base64," + Buffer.from("Klaus#42!§").toString("base64");
  const lib = L.buildLibraryExport([ fileEntry("klaus.kfmt", "application/x-klaus-format", 10, weird) ]);
  const entries = L.payloadToEntries(await L.decryptTresor(await L.encryptTresor(lib, PW), PW), "Buch").entries;
  assert.equal(entries[0].payload.data, weird);
});
