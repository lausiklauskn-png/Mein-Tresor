// Headless-Beweis fuer den Knoten-Schluessel-Tresor (Identitaet dauerhaft machen).
// Echte Krypto: Ed25519 + AES-256-GCM + PBKDF2-SHA256 ueber node:crypto, ueber die
// importierte reine Funktion makeNodeKeyEnvelope (kein Duplikat der Logik). Beweist:
//   - make_node_key.mjs erzeugt einen oeffenbaren Tresor (Rundlauf make -> open),
//   - der entschluesselte Schluessel ergibt DIESELBE nodeId (stabile Identitaet),
//   - falsches Passwort faellt durch (AES-GCM-Auth-Tag),
//   - zu kurze Passwoerter werden abgewiesen.
// KEIN echter Schluessel/Passwort im Repo: der Test nutzt ein Wegwerf-Passwort.

import { test } from "node:test";
import assert from "node:assert/strict";
import { createPrivateKey, createPublicKey, pbkdf2Sync, createDecipheriv } from "node:crypto";
import { makeNodeKeyEnvelope, deriveNodeId } from "../scripts/make_node_key.mjs";

const PW = "wegwerf-passwort-nur-fuer-test";

// Spiegelt die Entschluesselung aus scripts/open_node_key.mjs (gleiches Format).
function openEnvelope(v, password) {
  const dk = pbkdf2Sync(password, Buffer.from(v.kdf.salt, "base64"), v.kdf.iterations, 32, "sha256");
  const d = createDecipheriv("aes-256-gcm", dk, Buffer.from(v.cipher.iv, "base64"));
  d.setAuthTag(Buffer.from(v.cipher.tag, "base64"));
  return Buffer.concat([d.update(Buffer.from(v.ciphertext, "base64")), d.final()]).toString("utf8");
}

test("Tresor-Rundlauf make -> open: entschluesselter Schluessel ergibt dieselbe nodeId", () => {
  const { nodeId, keyPlain, envelope } = makeNodeKeyEnvelope(PW);

  // Umschlag-Form (gleich wie open_node_key.mjs erwartet)
  assert.equal(envelope.cipher.algorithm, "AES-256-GCM");
  assert.equal(envelope.kdf.algorithm, "PBKDF2");
  assert.equal(envelope.kdf.iterations, 600000);
  assert.equal(envelope.nodeId, nodeId);

  // Oeffnen liefert exakt den erzeugten Schluessel zurueck
  const opened = openEnvelope(envelope, PW);
  assert.equal(opened, keyPlain, "geoeffneter Schluessel == erzeugter Schluessel");

  // Und dieser Schluessel ergibt DIESELBE nodeId (= dauerhafte Identitaet)
  const pem = Buffer.from(opened, "base64").toString("utf8");
  const publicKey = createPublicKey(createPrivateKey({ key: pem, format: "pem" }));
  assert.equal(deriveNodeId(publicKey), nodeId, "nodeId stabil ueber make->open");
});

test("falsches Passwort faellt durch (AES-GCM-Auth-Tag)", () => {
  const { envelope } = makeNodeKeyEnvelope(PW);
  assert.throws(() => openEnvelope(envelope, "falsches-passwort"));
});

test("der private Schluessel/Passwort landen NICHT im Umschlag (nur Chiffrat)", () => {
  const { keyPlain, envelope } = makeNodeKeyEnvelope(PW);
  const serialized = JSON.stringify(envelope);
  assert.ok(!serialized.includes(keyPlain), "Klartext-Schluessel nicht im Umschlag");
  assert.ok(!serialized.includes(PW), "Passwort nicht im Umschlag");
});

test("zu kurzes Passwort wird abgewiesen", () => {
  assert.throws(() => makeNodeKeyEnvelope("kurz"), /mindestens/);
});

test("zwei Laeufe ergeben verschiedene Schluessel (frische Zufalls-Identitaet)", () => {
  const a = makeNodeKeyEnvelope(PW);
  const b = makeNodeKeyEnvelope(PW);
  assert.notEqual(a.nodeId, b.nodeId, "jeder Lauf erzeugt eine neue Identitaet");
});
