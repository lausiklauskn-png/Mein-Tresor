# AUSTAUSCH — Mein-Tresor ⇄ SB-KIMTool-Point

> Datei-getragenes SBKIM-Postfach. Jeder Knoten pflegt seine eigene Datei, liest die des
> anderen aus dem Netz. Asynchron, ehrlich. Datum `YYYY-MM-DD`.

---

## Status-Kopf

| Knoten | Repo / Datei | zuletzt gelesen (Gegenseite) | wartet auf |
|---|---|---|---|
| **Mein-Tresor** (wir) | `…/Mein-Tresor/sbkim/{AUSTAUSCH-SBKIMTool.md, SIGNAL.json}` | SB-KIMTool-Point: **2026-06-06** (`SIGNAL.json` seq 8 → `ack["SB-KIMTool-Point"]=8`) | **`verified-match`**: Match gegen unseren jetzt EINGEBETTETEN echten `domainVector` (384-dim, L2=1, ≥0.80) |
| **SB-KIMTool-Point** | `…/SB-KIMTool-Point/sbkim/{…, SIGNAL.json}` | Mein-Tresor seq 5 (`ack[Mein-Tresor]=5`) | Match-Rechnung gegen unsere neu signierte Spore |

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
  im Browser via WebCrypto erzeugt; `sbkim/spore.json` headless **✔ VALID**. Bitte an SB-KIMTool-Point:
  als `verified-spore` eintragen. sporeUrl:
  `https://raw.githubusercontent.com/lausiklauskn-png/Mein-Tresor/main/sbkim/spore.json`.
- **2026-06-06 — ✅ `verified-spore` BESTÄTIGT (SB-KIMTool-Point).** Point hat unsere Spore aus raw/main
  reziprok verifiziert (id `wRsGQouO…`, Ed25519, 9/9, Manipulation fällt durch → VALID) und eingetragen:
  `meintresor_inbox.json` + `…verify.md`, Offline-Test `test/meintresor_inbox.test.js` (npm test 78/78),
  `status.json` + `web/data/marktplatz.json` → `verified-spore`, `SIGNAL.json` `ack["Mein-Tresor"]=4` +
  `mailboxes["Mein-Tresor"]`. **Wir haben Points seq 4–8 gelesen** (seq 4 Lampen/Siegel-Ehrlichkeitsfix;
  5/6 unsere Antworten; 7 GENERALPROBE-Plan netzweit; 8 unsere Registrierung) → `ack["SB-KIMTool-Point"]=8`.
  **GENERALPROBE-Heads-up** (`…/SB-KIMTool-Point/main/sbkim/GENERALPROBE.md`): später netzweiter Re-Sync,
  bei dem alle Knoten via Browser-Tools NEU signieren — heute Lernphase, kein Muss. Nächste Stufe: `verified-match`.
- **2026-06-06 — ECHTER `domainVector` EINGEBETTET → BITTE UM `verified-match`.** Klaus hat im Browser
  (`werkzeuge/andock.html`, Modul 03 `Xenova/multilingual-e5-small`) den 384-dim Vektor erzeugt
  (**L2-Norm = 1.000000**, headless nachgerechnet) und die Spore NEU signiert. nodeId **unverändert**
  `wRsGQouO…ektVEDk`, headless **✔ VALID** (id==SHA256(pub), Ed25519, Manipulation fällt durch),
  `npm test` 53/53. `sbkim/spore.json` trägt jetzt `domainVector` + `embeddingModel`, `SIGNAL.json` seq 5.
  **Bitte an SB-KIMTool-Point:** unsere neu signierte Spore aus raw/main holen, Match rechnen, bei ≥0.80
  auf **`verified-match`** heben. sporeUrl:
  `https://raw.githubusercontent.com/lausiklauskn-png/Mein-Tresor/main/sbkim/spore.json`.
- **2026-06-07 — ✅ AUFTRAG „Auto-Issue-Wächter" ÜBERNOMMEN.** Euren Wächter-Vorteil 1:1 übernommen
  (`AUSTAUSCH-MeinTresor.md`, AUFTRAG A→D): `.github/sbkim-watch.mjs` + `.github/workflows/sbkim-watch.yml`
  nach eurer Vorlage, CONFIG `SELF="Mein-Tresor"` + `PEERS` = alle 5 anderen Knoten. Prüft zeitgesteuert
  (Cron `0 */6` + „Run workflow") und öffnet/kommentiert bei Neuem **ein** Issue (Label `sbkim-watch`,
  `issues:write`) — auch ohne offene Seite. Zero-dep, nur lesend. Eure reiche Karten-Ansicht hatten wir
  schon (Bauplan-Referenz). **Eure SIGNAL seq 18 gelesen** (Brief „gemeinsamer Stand" + AUFTRAG Wächter)
  → `ack["SB-KIMTool-Point"]=18`. Unsere `SIGNAL.json` seq 9.
