# PULS.md — Lebender Übergabe-Stand (Mein-Tresor)

> Kurz-Puls für den nächsten Sitzungsstart: **was getan, was offen, nächste Schritte.**
> Wahrheitsquelle für den Real-Anteil bleibt `status.json`. Datum `YYYY-MM-DD`.

## Stand: 2026-06-05 — Bootstrap (erste Sitzung)

### Getan
- **Pflichtlektüre** aus dem (jetzt öffentlichen) Jasons-Tresor `main` geholt + gelesen.
- **Kern + Tests 1:1 kopiert.** JasonLib-Kern zwischen den Markern ist **byte-gleich** zu
  Jasons-Tresor (sha256 `a98a704c…be98a3`); Wurzel `index.html` == Spiegel
  `jasons-bibliothek/index.html` im Kern. **`npm test` 51/51 grün.**
- **Identität (CONFIG) auf Mein-Tresor umgestellt:** `generate_spore.mjs` (nodeName/domain/
  endpoint `…github.io/Mein-Tresor/`), `package.json` Name, `andock.test.js` nodeName.
  Eigene **Spore erzeugt + verifiziert → ✔ VALID** (noch flüchtig, `_demo` domainVector).
- **Briefkasten + Sync:** `sbkim/SIGNAL.json` (seq 1), drei `AUSTAUSCH*.md`-Postfächer,
  Mailbox-Knopf-CONFIG (self `Mein-Tresor`, Peers Sage/SB-KIMTool-Point/**Jasons-Tresor**),
  Wächter `.github/sbkim-watch.mjs` (SELF/PEERS angepasst, Cron `17 7 * * *`).
  Nachbarn-Stand gelesen + quittiert: Sage 12, SB-KIMTool-Point 2, Jasons-Tresor 2.
- **Ehrliche `status.json`** geschrieben (Real-Anteil ~45 %), Verfassung `CLAUDE.md`,
  `README.md`, Gründungs-Auftrag `docs/sessions/BRIEF_start.md`.
- **NICHT kopiert (bewusst):** Jasons-Tresor-Secret `node_key.enc.json` (eigene Identität)
  und Jasons Sitzungs-Historie.

### Offen / wartet auf Klaus
1. **Dauerhafte Identität:** `SBKIM_KEY_PW='<Passwort>' npm run key` → `node_key.enc.json` +
   stabile nodeId; danach Spore neu signieren. (Passwort/Schlüssel **nie** ins Repo.)
2. **GitHub Pages** (main/root) aktivieren → Spore + App unter `…github.io/Mein-Tresor/`.
3. **Die 4 echten Bilder** für das neue Gesicht (Safe-Front, Drehrad, Tresorwand, ein Fach).
4. **Browser-Lauf** von Klaus (Tresor öffnen, Datei laden, verschließen) in Hoch- + Querformat.

### Nächste Schritte (priorisiert)
1. **Schale bauen (Dreh-Safe + 20 Fächer)** — *erst* nach Klaus' 4 Bildern + Plan-vor-Code.
   Das ist das eigentliche neue Gesicht; bis dahin Platzhalter = Jasons-Tresor-Schale.
2. **Identität dauerhaft machen + Pages** — danach bei Sage/SB-KIMTool-Point/Jasons-Tresor
   melden, damit sie uns reziprok als Endknoten registrieren.
3. **Browser-Verifikation** in beiden Lagen (Klaus' Sichtprüfung) → status.json fortschreiben.

## Nachtrag 2026-06-05 — Schale gebaut (Dreh-Safe + Tresorraum)

### Getan
- **Klaus' 5 echte Bilder** eingebaut (`assets/safe/`): `safe-front`, `drehrad` (transparent),
  `tresorwand-hoch` (5×6), `tresorwand-quer` (~8×4), `fach` (transparent).
- **Neues Gesicht additiv gebaut** (Kern unberührt, byte-gleich, `npm test` 51/51):
  - **Dreh-Safe-Eingang:** Safe-Front + 4 Drehräder an den Vertiefungen; per Pointer drehen,
    alle > 120° → Überblendung in den Raum. Bild-relativ verankert (fit-to-image), Hoch + Quer.
  - **Tresorraum:** gemalte Schließfachwand (hoch/quer je nach Lage), 30 nummerierte
    Klickflächen (01…30, editierbar) über die gemalten Fächer; Klick → `window.jtOpenBook`
    (bewiesenes Öffnen: Passwort, Honigtopf/Tarnfach, Shamir, Dateien, Sicherung). 🔒-Badge.
  - Alte Schwelle/Regal nur **ausgeblendet**, bewiesene Skripte **unberührt**.

### Offen / nächste Schritte
1. **Klaus' Browser-Lauf** (Hard-Reload Ctrl+Shift+R): Eingang drehen → Raum → Fach öffnen.
   Erwartet wird **Pixel-Feinschliff** der Rad-Positionen (`WHEELS`) und des Fach-Rasters
   (`LAYOUT`-Insets) — sage mir, was verrutscht ist, dann justiere ich die Werte.
2. Öffnen-Overlay optional auf `fach.png` umskinnen (statt Buch-Grafik).
3. Identität dauerhaft (`npm run key`) + Pages aktivieren, dann bei den Nachbarn melden.

## Nachtrag 2026-06-05 (2) — SBKIM: Netz-Andock + Siegel + Briefkasten im Gesicht

### Getan
- **Netz-Andock an ALLE 5 öffentlichen SBKIM-Knoten** (reziprok ✔ VALID, `npm test` 53/53):
  Sage, SB-KIMTool-Point, Jasons-Tresor, **Mein-Rezeptbuch** ("Rezeptbuch Klaus"),
  **Mein-Mixarium** ("Mixarium Klaus"). Sporen frisch aus deren `raw/main` geholt + über
  `verify_foreign_spore.mjs` geprüft → `sbkim/*_inbox.json`. Generischer Test verifiziert jede.
- **Briefkasten-Sync** mit den 3 Knoten, die ein `SIGNAL.json` führen (Sage/Point/Jasons);
  unser `SIGNAL.json` seq 2, ack Sage 12 / Point 2 / Jasons 2.
- **SBKIM-Siegel** personalisiert (Band „MEIN-TRESOR") + **Briefkasten-Knopf** (📬) ins neue
  Dreh-Safe-Gesicht eingebaut (zeigt Siegel + eigene nodeId + Nachbar-Stand).
- **Positionen selbst geprüft** (eigenes Node-PNG-Werkzeug, Prüfraster über die Bilder):
  Räder + 30/32-Fach-Raster sitzen bild-genau — der Browser zeigt exakt diese Geometrie.

### Offen (Gegenseite / Klaus)
1. Dauerhafte nodeId (`SBKIM_KEY_PW=… npm run key`) + **Pages** → dann registrieren die
   Nachbarn uns reziprok (verified-spore) und der Briefkasten-Sync läuft beidseitig.
2. Browser-Lauf (Sichtprüfung) des neuen Gesichts in Hoch + Quer.

## Nachtrag 2026-06-06 (nachts) — Gesicht live auf Pages, läuft

### Getan
- **Pages aktiv** (Klaus: main/root). Neues Gesicht live: Dreh-Safe-Eingang + Tresorraum mit
  nummerierten Fächern, Briefkasten (📬) + Siegel im Dialog.
- **Drei Browser-Bugs gefixt** (alle mit Klaus' Screenshots gefunden):
  1. Räder verspranken bei JS-Fit → **CSS-Verankerung** (%-Koordinaten, feste aspect-ratio).
  2. Räder/Fächer sprangen beim Anfassen nach rechts-unten → geerbtes
     `button:active{transform:translateY(1px)}` überschrieb die Zentrierung →
     `.mt-wheel/.mt-fach`-Zentrierung mit **`!important`** gepanzert.
  3. Dreh-Logik robust (pointermove/up an `document`, Position bei jeder Bewegung neu
     festgenagelt, **Tippen = ein Dreh-Schritt**).
- **Räder kalibriert** (Klaus' Koordinaten aus `werkzeuge/kalibrierung.html`); Werkzeug-Leisten
  frei verschiebbar gemacht (Punkt B erreichbar).
- Klaus: „funktioniert ganz gut, bis auf ein paar Kleinigkeiten" → später.

### Offen / nächste Schritte
1. **Klaus' Kleinigkeiten** (kommt von ihm) am Gesicht nachziehen.
2. **Fach-Öffnen-Lauf** im Browser: ein Fach mit Passwort öffnen → Datei laden → verschließen
   (Honigtopf/Shamir prüfen). Dann status.json „browser-geprüft" vermerken.
3. **Dauerhafte Identität** (`SBKIM_KEY_PW=… npm run key`) + danach reziproke Registrierung
   bei den Nachbarn rund machen.
4. Optional: Fach-Raster per Kalibrier-Werkzeug exakt (LAYOUT.hoch/quer), Öffnen-Overlay
   auf `fach.png` umskinnen.

## Nachtrag 2026-06-06 — Briefkasten-Runde + Sage-Netz-Karte gelesen

### Getan
- **Briefkasten-Runde (Arbeitsregel Schritt 3) vollzogen** (`npm test` 53/53, Kern byte-gleich):
  - **Alle 5 Nachbar-Sporen frisch** aus `raw/main` geholt + über `verify_foreign_spore.mjs`
    geprüft → **alle ✔ VALID**, byte-identisch zu unseren `*_inbox.json` (keine Re-Signatur).
  - **3 SIGNAL.json gelesen:** Sage **seq 12** (= unser ack, nichts Neues), **SB-KIMTool-Point
    seq 3** (NEU — „Siegel + Lampen in der Statusleiste, Andock-Modal", Rundbrief `forNodes:*`),
    Jasons-Tresor **seq 2** (= unser ack, nichts Neues).
  - **Quittiert:** `ack["SB-KIMTool-Point"] 2→3` in `sbkim/SIGNAL.json`; unsere **seq 2→3**
    (Headline + history). Postfach `AUSTAUSCH-SBKIMTool.md` nachgezogen. App-Briefkasten + Wächter
    lesen unser ack **live** aus der SIGNAL.json → Badge räumt sich nach Push selbst auf.
- **Sages Netz-Karte `sbkim/NETZ-STAND.md` gelesen** (raw/main; Pages-Host blockt die Netz-Policy):
  **Mein-Tresor ist dort noch NICHT gelistet** → bestätigt: reziproke Registrierung der Nachbarn
  steht aus, bis unsere **dauerhafte nodeId + Pages** stehen.
  - Ehrlicher Nebenbefund: Sage führt für **Rezeptbuch/Mixarium andere nodeIds** (aus
    Live-Channel-Handshakes 05-16/17) als die heutigen **statischen** Sporen in deren Repos, die
    wir geprüft haben. Nicht unser zu lösen; nur vermerkt.

### Offen / wartet auf Klaus (unverändert Priorität)
1. **Dauerhafte Identität** — nur Klaus kann das: lokal `SBKIM_KEY_PW='<Passwort>' npm run key`
   → `sbkim/node_key.enc.json` (bleibt lokal, **nie** ins Repo) → stabile nodeId. Danach signiere
   ich die Spore neu + committe, und melde uns reziprok bei den Nachbarn.
2. **Pages** sind laut Klaus aktiv (Gesicht live). Für die reziproke Registrierung zählt die
   stabile nodeId — Schritt 1 zuerst.
3. **Klaus' Browser-„Kleinigkeiten"** + Fach-Öffnen-Lauf → dann status.json „browser-geprüft".

## Nachtrag 2026-06-06 (2) — Beide Verfahrens-Briefe zurück → ANDOCK-FAHRPLAN steht

### Getan
- **Verfahrens-Briefe an Sage + SB·KIMTool·Point** geschrieben (Klaus überbracht), **beide
  Antworten zurück** und vollständig gelesen — inhaltlich deckungsgleich:
  - **Sage** (Spec-Hub): A–D beantwortet, Vereinbarungs-Text B5; hat uns bereits in **SIGNAL
    seq 13** (`mailboxes`+`forNodes`+`ack[Mein-Tresor]=0`) und in **NETZ-STAND.md** als Stufe
    **„angekündigt"** aufgenommen. Postfach `…/Sage-Protokol/main/sbkim/AUSTAUSCH-MeinTresor.md`.
  - **SB·KIMTool·Point**: A–D beantwortet, **SBKIM-SYNC-VEREINBARUNG v1**; hat unser SIGNAL
    seq 3 quittiert (`ack[Mein-Tresor]=3`), führt uns als „Knoten D". Postfach
    `…/SB-KIMTool-Point/main/sbkim/AUSTAUSCH-MeinTresor.md`.
- **Synchronisationsvereinbarung 1:1 abgelegt:** `docs/SYNC-VEREINBARUNG.md` (beide Texte identisch).
- **Klaus' Entscheidung zum Identitäts-Passwort:** **Umgebungs-Secret** (`SBKIM_KEY_PW` in der
  Web-Session-Konfig; nie in Chat/Repo). Klaus richtet das gerade ein.

### ⚠️ ANDOCK-FAHRPLAN für die NÄCHSTE Sitzung (Vorbedingung: `SBKIM_KEY_PW` ist als
###    Umgebungsvariable gesetzt — prüfen mit `[ -n "$SBKIM_KEY_PW" ]`)
Plan-vor-Code ist mit Klaus + beiden Knoten abgestimmt — **Freibrief für Andock + Mergen liegt
vor.** Bauen in dieser Reihenfolge (alles additiv, Leitplanken wahren, `npm test` grün halten):
1. `SBKIM_KEY_PW='…' npm run key` (Variable ist gesetzt) → erzeugt **eigene, stabile nodeId** +
   `sbkim/node_key.enc.json` (verschlüsselt, **darf** ins Repo; Passwort/Klartext NIE).
   **Eigener** Schlüssel — NICHT der von Jasons-Tresor.
2. Spore signieren:
   `SBKIM_NODE_KEY="$(SBKIM_KEY_PW='…' node scripts/open_node_key.mjs)" npm run demo`
   → `sbkim/spore.json` stabil; `domainVector` bleibt `_demo` (→ `verified-spore`). Kontrolle:
   gedruckte nodeId == die aus Schritt 1.
3. `npm run verify` → ✔ VALID; `npm test` → 53/53; Kern-Hash unverändert.
4. `sbkim/SIGNAL.json`: seq 3→4, `headline` „dauerhafte Identität live, Bitte um verified-spore",
   `node`/`lastBuild` aktualisieren, **Sage** in `mailboxes`/`forNodes`/`ack` aufnehmen +
   **Sage seq 13 quittieren** (`ack["Sage-Protokol"]=13`); Point bleibt `ack=3`.
5. Postfächer quittieren: `AUSTAUSCH.md` (Sage) + `AUSTAUSCH-SBKIMTool.md` — Antwort gelesen,
   stabile nodeId + sporeUrl nennen. SCHLUESSEL.md/status.json auf „dauerhaft" fortschreiben.
6. Commit → Push → Draft-PR → Merge (Klaus). Danach lesen beide Knoten unsere Spore aus
   raw/main und tragen uns reziprok als `verified-spore` ein.
Danach (später): echter `domainVector` via Browser/Sage → Re-Sign → `verified-match` (≥0.80).

### Offen / wartet auf Klaus
1. `SBKIM_KEY_PW` als Umgebungsvariable setzen + **neue Sitzung** starten → dann Fahrplan oben.
2. Klaus' Browser-„Kleinigkeiten" am Gesicht; Fach-Öffnen-Lauf → status.json „browser-geprüft".

## Aktiver Übergabe-Brief
→ `docs/sessions/BRIEF_briefkasten-runde-identitaet.md` + **ANDOCK-FAHRPLAN oben**
(+ `docs/SYNC-VEREINBARUNG.md`).
