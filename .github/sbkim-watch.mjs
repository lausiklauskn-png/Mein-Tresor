#!/usr/bin/env node
/*
 * SBKIM Briefkasten-Waechter (INTERFACES 11.6)
 * Liest die SIGNAL.json aller PEERS, vergleicht deren seq mit dem zuletzt
 * quittierten Stand (ack in der EIGENEN SIGNAL.json) und meldet ungelesene
 * Bauten. Serverlos: laeuft im GitHub-Actions-Cron ODER lokal per `node`.
 *
 * KEINE npm-Abhaengigkeiten. Node >= 18 (global fetch).
 *
 * Exit 0 = nichts Neues; Exit 0 + Ausgabe = Neues gefunden (nicht-fatal).
 * Schreibt NICHT zurueck (kein Auto-Commit) — meldet nur, was offen ist.
 */

// ===== CONFIG (pro Knoten anpassen) =====
const SELF = "Mein-Tresor";
const SELF_SIGNAL = "sbkim/SIGNAL.json";
const PEERS = [
  { name: "Sage-Protokol",    signal: "https://raw.githubusercontent.com/lausiklauskn-png/Sage-Protokol/main/sbkim/SIGNAL.json", mailbox: "https://github.com/lausiklauskn-png/Sage-Protokol/blob/main/sbkim/AUSTAUSCH.md" },
  { name: "SB-KIMTool-Point", signal: "https://raw.githubusercontent.com/lausiklauskn-png/SB-KIMTool-Point/main/sbkim/SIGNAL.json", mailbox: "https://github.com/lausiklauskn-png/SB-KIMTool-Point/blob/main/sbkim/AUSTAUSCH.md" },
  { name: "Jasons-Tresor",    signal: "https://raw.githubusercontent.com/lausiklauskn-png/Jasons-Tresor/main/sbkim/SIGNAL.json", mailbox: "https://github.com/lausiklauskn-png/Jasons-Tresor/blob/main/sbkim/AUSTAUSCH.md" },
];
// ========================================

const RAW = (u) => u.trim();

async function getJson(url) {
  try {
    const r = await fetch(RAW(url), { headers: { "cache-control": "no-cache" } });
    if (!r.ok) return { error: `HTTP ${r.status}` };
    return await r.json();
  } catch (e) {
    return { error: String(e?.message || e) };
  }
}

function readSelfAck() {
  // Liest die eigene SIGNAL.json lokal (im Repo-Checkout), Feld ack{}.
  return import("node:fs/promises")
    .then((fs) => fs.readFile(new URL(`../${SELF_SIGNAL}`, import.meta.url), "utf8"))
    .then((t) => JSON.parse(t))
    .then((j) => (j && typeof j.ack === "object" && j.ack) || {})
    .catch(() => ({}));
}

async function main() {
  const selfAck = await readSelfAck();
  const findings = [];
  for (const peer of PEERS) {
    const sig = await getJson(peer.signal);
    if (sig.error) { findings.push(`  - ${peer.name}: SIGNAL nicht lesbar (${sig.error})`); continue; }
    const seq = Number(sig.seq) || 0;
    const seen = Number(selfAck[peer.name]) || 0;
    if (seq > seen) {
      findings.push(`  - ${peer.name}: NEUER Bau seq=${seq} (zuletzt quittiert ${seen}) — ${sig.headline || "(ohne Schlagzeile)"}\n    Postfach: ${peer.mailbox}`);
    }
  }
  if (findings.length) {
    console.log(`\n📬 SBKIM-Briefkasten (${SELF}): ungelesene Bauten der Nachbarn:\n${findings.join("\n")}\n`);
    console.log(`→ Lies das jeweilige Postfach, handle/quittiere, dann setze ack["<Knoten>"] = seq in ${SELF_SIGNAL}.`);
  } else {
    console.log(`📭 SBKIM-Briefkasten (${SELF}): nichts Neues bei den Nachbarn.`);
  }
}

main().catch((e) => { console.error("Waechter-Fehler:", e?.stack || e); process.exit(0); });
