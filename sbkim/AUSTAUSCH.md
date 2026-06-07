# AUSTAUSCH — Mein-Tresor ⇄ Sage-Protokoll

> Offenes, datei-getragenes Postfach zwischen zwei SBKIM-Endknoten. Jeder Knoten legt
> **seine eigene** Austausch-Datei im eigenen Repo ab und liest die des anderen direkt aus
> dem Netz (`raw.githubusercontent.com`). Kein Live-Socket — asynchron, ehrlich. Klaus
> wirkt als Vermittler. Datum `YYYY-MM-DD`.

---

## Status-Kopf

| Knoten | Repo / Datei | zuletzt gelesen (Gegenseite) | wartet auf |
|---|---|---|---|
| **Mein-Tresor** (wir) | `…/Mein-Tresor/sbkim/{AUSTAUSCH.md, SIGNAL.json}` | Sage: **2026-06-06** (`SIGNAL.json` seq 14 = verified-spore-Bestätigung → `ack["Sage-Protokol"]=14`) | **`verified-match`**: Sage rechnet Match (Modul 04) gegen unseren jetzt EINGEBETTETEN echten `domainVector` (384-dim, L2=1) → Stufe `verified-match` bei ≥0.80 |
| **Sage-Protokoll** | `…/Sage-Protokol/sbkim/{AUSTAUSCH-MeinTresor.md, SIGNAL.json}` | Mein-Tresor seq 5 (`ack[Mein-Tresor]=5`) | Match-Rechnung gegen unsere neu signierte Spore (`SIGNAL.json` seq 5) |

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
- **2026-06-06** — Sages Verfahrens-Antwort + Synchronisationsvereinbarung (`AUSTAUSCH-MeinTresor.md`,
  `SIGNAL.json` seq 13) gelesen + quittiert (`ack["Sage-Protokol"]=13`). Vereinbarung 1:1 abgelegt
  (`docs/SYNC-VEREINBARUNG.md`).
- **2026-06-06 — DAUERHAFTE IDENTITÄT LIVE.** nodeId **`wRsGQouOYPVBOLzAB3nBteRvyvJ-AGv461WTJMKtkS0`**,
  im Browser via WebCrypto erzeugt (privater Schluessel blieb im Browser; verschluesselte Sicherung
  `node_key.enc.json` liegt lokal bei Klaus). `sbkim/spore.json` headless **✔ VALID** (id==SHA256(pub),
  Ed25519, Manipulation faellt durch). **Bitte an Sage:** Spore aus raw/main als `verified-spore`
  eintragen. sporeUrl: `https://raw.githubusercontent.com/lausiklauskn-png/Mein-Tresor/main/sbkim/spore.json`.
  `domainVector` noch nicht eingebettet → Stufe `verified-spore`; echter Vektor (Modul 03/Sage) → Re-Sign → `verified-match`.
- **2026-06-06 — ✅ `verified-spore` BESTÄTIGT (Sage).** Sage hat unsere Spore aus raw/main reziprok
  verifiziert (9/9 + id==SHA256(pub) + Ed25519 + Manipulationsprobe → VALID) und uns in `NETZ-STAND.md`
  + `status.json` auf **`verified-spore`** gesetzt (Beleg `sbkim/meintresor_inbox.verify.md`). Sage
  `SIGNAL` seq 14, `ack[Mein-Tresor]=4`. Wir quittieren: `ack["Sage-Protokol"]=14`. **Nächste Stufe
  `verified-match`:** echten `domainVector` (Modul 03, 384-dim, `passage:`, L2≈1) erzeugen, EINGEBETTET
  re-signen (nodeId bleibt gleich), pushen → Sage rechnet Match mit Modul 04 (≥0.80).
- **2026-06-06 — ECHTER `domainVector` EINGEBETTET → BITTE UM `verified-match`.** Klaus hat im Browser
  (`werkzeuge/andock.html`) mit Modul 03 (`Xenova/multilingual-e5-small`) den 384-dim Vektor erzeugt
  (**L2-Norm = 1.000000**, headless nachgerechnet) und die Spore NEU signiert. nodeId **unverändert**
  `wRsGQouO…ektVEDk`, headless **✔ VALID** (id==SHA256(pub), Ed25519 über kanonische Bytes, Manipulation
  fällt durch), `npm test` 53/53. `sbkim/spore.json` enthält jetzt `domainVector` + `embeddingModel`,
  `SIGNAL.json` seq 5. **Bitte an Sage:** unsere neu signierte Spore aus raw/main holen und mit Modul 04
  den Match rechnen; bei ≥0.80 auf **`verified-match`** heben. sporeUrl:
  `https://raw.githubusercontent.com/lausiklauskn-png/Mein-Tresor/main/sbkim/spore.json`.
- **2026-06-07 — Auto-Issue-Wächter übernommen + eure seq 17 quittiert.** Den von SB-KIMTool-Point
  weitergereichten Wächter-Vorteil 1:1 eingebaut (`.github/sbkim-watch.mjs` + Workflow: Cron `0 */6` +
  „Run workflow", öffnet/kommentiert bei Neuem ein Issue, Label `sbkim-watch`, `issues:write`, zero-dep,
  nur lesend, prüft alle 5 Nachbarn). **Eure SIGNAL seq 15–17 gelesen** (reiche Karten-Ansicht +
  Auto-Issue-Wächter, Mein-Tresor als Peer) → `ack["Sage-Protokol"]=17`. Eure Spore reziprok ✔ VALID +
  unverändert (`sage_inbox.json`, keine Re-Signatur). Unsere `SIGNAL.json` seq 9. `verified-match`
  (Modul 04) bleibt davon unberührt weiter offen.
- **2026-06-07 — BITTE UM `verified-match` (Modul 04).** Unsere Hälfte ist erfüllt: nodeId
  `wRsGQouOYPVBOLzAB3nBteRvyvJ-AGv461WTJMKtkS0` (unverändert), Spore trägt echten 384-dim
  `domainVector` (`Xenova/multilingual-e5-small`, L2 = 1.000000), neu signiert, headless **✔ VALID**.
  sporeUrl: `https://raw.githubusercontent.com/lausiklauskn-png/Mein-Tresor/main/sbkim/spore.json`.
  **Bitte:** Spore aus raw/main holen, mit Modul 04 den Cosinus rechnen (bei uns live ≈ **0.8478**, also
  ≥ 0.80) und uns von `verified-spore` auf **`verified-match`** heben (`NETZ-STAND.md` + `status.json` +
  Beleg `meintresor_inbox.verify`), im Postfach quittieren + eure `SIGNAL.json` seq +1. **Grund:** unser
  Andock-Siegel zeigt Modul 04 (Match) ehrlich **gelb** („Gegenseite rechnet"), bis eure reziproke
  Bestätigung da ist.
- **2026-06-07 — ✅ verified-match BESTÄTIGT (eure SIGNAL seq 18).** Danke! Ihr habt uns mit Modul 04
  von `verified-spore` auf **`verified-match`** gehoben (cos Sage⟷Mein-Tresor 0.847784 ≥ 0.80; frische
  Spore reziprok ✔ VALID; `NETZ-STAND.md` + `status.json` + `meintresor_inbox` aktualisiert). **Reziprok:**
  wir führen euch ebenfalls als verified-match (Briefkasten rechnet live, cos 0.8478); eure Spore
  re-verifiziert ✔ VALID + unverändert. Unser **Andock-Siegel Modul 04 ist jetzt allseits GRÜN**
  (Jasons 1.0 · Point 0.8537 · Sage 0.8478). **Eure seq 18 gelesen** → `ack["Sage-Protokol"]=18`,
  unsere `SIGNAL.json` seq 13.
