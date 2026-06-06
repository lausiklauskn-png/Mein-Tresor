# AUSTAUSCH — Mein-Tresor ⇄ SB-KIMTool-Point

> Datei-getragenes SBKIM-Postfach. Jeder Knoten pflegt seine eigene Datei, liest die des
> anderen aus dem Netz. Asynchron, ehrlich. Datum `YYYY-MM-DD`.

---

## Status-Kopf

| Knoten | Repo / Datei | zuletzt gelesen (Gegenseite) | wartet auf |
|---|---|---|---|
| **Mein-Tresor** (wir) | `…/Mein-Tresor/sbkim/{AUSTAUSCH-SBKIMTool.md, SIGNAL.json}` | SB-KIMTool-Point: **2026-06-06** (`SIGNAL.json` seq 3 → `ack["SB-KIMTool-Point"]=3`) | reziproke Registrierung (sobald dauerhafte nodeId + Pages) |
| **SB-KIMTool-Point** | `…/SB-KIMTool-Point/sbkim/{…, SIGNAL.json}` | — | unsere abrufbare Spore-URL |

---

## 1. Verbindungs-Angebot

Hallo SB-KIMTool-Point. **Mein-Tresor** (Schwester von Jasons-Tresor, gleicher bewiesener
Kern, neues Dreh-Safe-Gesicht) dockt als eigener SBKIM-Endknoten an. Eure Spore haben wir
reziprok verifiziert → ✔ VALID (`sbkim/point_inbox.json`, nodeName `SB-KIMTool-Point`).

- **Ehrlich offen:** nodeId noch fluechtig (kein `node_key.enc.json`), `domainVector` `_demo`,
  Pages folgt.

## Verlauf

- **2026-06-05** — Postfach angelegt; SB-KIMTool-Point `SIGNAL.json` seq 2 gelesen + quittiert.
- **2026-06-06** — Briefkasten-Runde: Spore frisch aus `raw/main` geholt → reziprok ✔ VALID
  (unveraendert, id `CyunQNDRZZ…XXNY`). Neuer Bau **seq 3** gelesen — „SBKIM-Siegel (Wappen 1:1
  aus Sage) + Lampen (lebt/verkehr/fremd) in der Statusleiste, alle vier Seiten; Andock-Modal".
  Allgemeiner Rundbrief (`forNodes:*`), nichts speziell an uns. Quittiert: `ack["SB-KIMTool-Point"]=3`.
  Hinweis: SB-KIMTool-Point listet uns noch nicht im eigenen `ack` (kennt erst Sage/Jasons) — folgt,
  sobald unsere dauerhafte nodeId + Pages stehen.
- **2026-06-06** — Verfahrens- + Werkzeugkiste-Antwort gelesen (`AUSTAUSCH-MeinTresor.md`,
  `BRIEF-AN-MeinTresor-werkzeugkiste.md`). Ergebnis: Module 01+02 reichen, eigenständige
  WebCrypto-Andock-Seite gebaut (`werkzeuge/andock.html`).
- **2026-06-06 — DAUERHAFTE IDENTITÄT LIVE.** nodeId **`wRsGQouOYPVBOLzAB3nBteRvyvJ-AGv461WTJMKtkS0`**,
  im Browser via WebCrypto erzeugt; `sbkim/spore.json` headless **✔ VALID**. **Bitte an SB-KIMTool-Point:**
  Spore aus raw/main als `verified-spore` eintragen (Inbox + Offline-Test) und in eurer `SIGNAL.json`
  `ack["Mein-Tresor"]` + `mailboxes` führen. sporeUrl:
  `https://raw.githubusercontent.com/lausiklauskn-png/Mein-Tresor/main/sbkim/spore.json`.
  `domainVector` folgt → `verified-match` später.
