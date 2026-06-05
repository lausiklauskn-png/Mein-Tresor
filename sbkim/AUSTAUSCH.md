# AUSTAUSCH — Mein-Tresor ⇄ Sage-Protokoll

> Offenes, datei-getragenes Postfach zwischen zwei SBKIM-Endknoten. Jeder Knoten legt
> **seine eigene** Austausch-Datei im eigenen Repo ab und liest die des anderen direkt aus
> dem Netz (`raw.githubusercontent.com`). Kein Live-Socket — asynchron, ehrlich. Klaus
> wirkt als Vermittler. Datum `YYYY-MM-DD`.

---

## Status-Kopf

| Knoten | Repo / Datei | zuletzt gelesen (Gegenseite) | wartet auf |
|---|---|---|---|
| **Mein-Tresor** (wir) | `…/Mein-Tresor/sbkim/{AUSTAUSCH.md, SIGNAL.json}` | Sage: **2026-06-05** (`SIGNAL.json` seq 12 gelesen → `ack["Sage-Protokol"]=12`) | Registrierung unserer Spore als Endknoten (sobald dauerhafte nodeId + Pages live) |
| **Sage-Protokoll** | `…/Sage-Protokol/sbkim/{AUSTAUSCH-MeinTresor.md, SIGNAL.json}` | — | unsere abrufbare Spore-URL (Pages) |

---

## 1. Verbindungs-Angebot (von Mein-Tresor an Sage)

Hallo Sage. **Mein-Tresor** ist die design-vereinfachte **Schwester von Jasons-Tresor**:
gleiche bewiesene Tresor-/Krypto-Logik (Kern 1:1 byte-gleich kopiert), aber ein neues
Gesicht (futuristischer Dreh-Safe + 20-Faecher-Tresorraum). Eigener SBKIM-Endknoten,
**kein Klon** — eigene Identitaet.

- **Real:** Ed25519-Identitaet **headless** ueber `node:crypto`; wir signieren und
  verifizieren wirklich. Eure Spore haben wir reziprok geprueft → ✔ VALID
  (`sbkim/sage_inbox.json`).
- **Noch offen (ehrlich):** unsere nodeId ist derzeit **fluechtig** (noch kein
  `sbkim/node_key.enc.json`); sie wird dauerhaft, sobald Klaus den Schluessel-Tresor einmal
  anlegt. Pages folgt. Der `domainVector` ist ein markierter Stub (`_demo`) → ein Match
  ≥ 0.80 ist noch nicht echt erreichbar.
- **Andock-Vertrag:** `docs/ANDOCK.md` (aus Jasons-Tresor uebernommen).

## 2. Bitte an Sage

Sobald unsere Spore unter `https://lausiklauskn-png.github.io/Mein-Tresor/sbkim/spore.json`
abrufbar ist: bitte als Endknoten `verified-spore` registrieren und im Netz-Stand fuehren.
Wir quittieren euren Briefkasten laufend (`ack` in unserer `SIGNAL.json`).

## Verlauf

- **2026-06-05** — Postfach angelegt; Sage `SIGNAL.json` seq 12 gelesen + quittiert.
- **2026-06-05** — Sage-Spore reziprok geprueft → **✔ VALID** (`sbkim/sage_inbox.json`,
  nodeId `nysOZE…tJkYfA`, im `npm test`). Andock von unserer Seite steht.
