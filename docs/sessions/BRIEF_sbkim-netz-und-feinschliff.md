# BRIEF — Nachfolgesitzung: SBKIM-Netz (Briefkasten · Siegel · Voll-Andock an alle 5 Knoten) + Feinschliff

> **Dieser Brief ist die Anknüpfung.** Er erklärt vollständig, was in Mein-Tresor bereits
> gebaut ist, wie alles zusammenhängt (besonders die SBKIM-Verbindungen zu den anderen
> Tools über Sage-Protokol), und was als Nächstes zu tun ist. Wer hier anfängt, soll **ohne
> Rückfragen verstehen**, wo es steht, und sofort weiterarbeiten können.

Stand: 2026-06-06 · Repo: `lausiklauskn-png/Mein-Tresor` · Entwicklungsbranch: `claude/<scope>`

---

## 0. ARBEITSREGEL (verbindlich, von Klaus gewünscht) — in dieser Reihenfolge
1. **Lesen.** Pflichtlektüre (unten) + den Code der zugewiesenen Scheibe.
2. **Nachdenken.** Plan formulieren (was, warum, welche Datei, welches Risiko).
3. **Mit allen Knoten kommunizieren (wenn möglich).** Briefkasten-Runde: jede Nachbar-
   `SIGNAL.json` aus deren `raw/main` lesen, mit unserem `ack` vergleichen, Ungelesenes lesen,
   ihre Sporen frisch verifizieren (`scripts/verify_foreign_spore.mjs`), unser `ack`/Inbox
   nachziehen. (Mechanik: INTERFACES §11.6, s. Abschnitt 6.)
4. **Mit Klaus abgleichen.** Kurzen Plan zeigen (Plan-vor-Code). Klaus hat **Freibrief für
   Andock + selbständiges Mergen** erteilt — größere/kreative Bauten trotzdem kurz zeigen.
5. **Dann Code.** Additiv bauen, Leitplanken wahren, `npm test` grün halten, committen, (auto-)mergen.

---

## 1. Pflichtlektüre VOR der Arbeit (in dieser Reihenfolge)
1. `CLAUDE.md` — Verfassung + Leitplanken.
2. `PULS.md` — aktueller Stand (getan / offen / nächste Schritte).
3. **Dieser Brief** (neuester in `docs/sessions/BRIEF_*.md`) + Gründungs-Auftrag `BRIEF_start.md`.
4. `status.json` — ehrlicher Real-Anteil.
5. Code: `index.html` (+ Spiegel `jasons-bibliothek/index.html`), `werkzeuge/kalibrierung.html`,
   `scripts/*.mjs`, `sbkim/*`, `.github/sbkim-watch.mjs`, `docs/ANDOCK.md`, `docs/SCHLUESSEL.md`,
   `docs/JASONS-BIBLIOTHEK.md`.

---

## 2. Was Mein-Tresor IST
Design-vereinfachte **Schwester von Jasons-Tresor**. Funktion 1:1 (jedes Fach = echter
AES-Tresor; Honigtopf/Tarnfach, Shamir 3-von-5, alle Dateiformate, Gesamt-Sicherung) aus dem
**byte-gleich kopierten JasonLib-Kern**. NEU ist nur das Gesicht: futuristischer **Dreh-Safe-
Eingang** → **Tresorraum mit nummerierten Fächern**. Offline-PWA, Hoch- und Querformat.
Zugleich **echter SBKIM-Endknoten** (eigene Ed25519-Identität, Briefkasten, Andock).

---

## 3. LEITPLANKEN (unverändert, immer)
- **Kopieren, nicht klonen.** Kern aus Jasons-Tresor `raw/main`, 1:1, **byte-gleich**.
- **Kern unantastbar:** Block zwischen `// JASONLIB-CORE-START` und `// JASONLIB-CORE-END`
  muss in Wurzel `index.html` **und** Spiegel `jasons-bibliothek/index.html` **byte-identisch**
  bleiben. **Prüf-Hash (sha256, beide Dateien):**
  `a98a704c6518c1b18d22df4d33fe90e4a792ad063d4e0dadaa9ed55362be98a3`.
  Befehl: `awk '/JASONLIB-CORE-START/{f=1} f{print} /JASONLIB-CORE-END/{f=0}' <datei> | sha256sum`.
- **Echte Krypto.** Ed25519/SHA-256 (node:crypto); AES-256-GCM/PBKDF2-SHA256 600k (WebCrypto).
  `domainVector` ist bis Modul 03 ein markierter **Demo-Stub** (`_demo:["domainVector"]`).
- **Ehrlichkeit.** `status.json` führt den Real-Anteil. Browser-Pfade bleiben „ungeprüft,
  wartet auf Klaus' Browser-Lauf", bis Klaus sie gesehen hat. Beweis = `npm test` (derzeit **53/53**).
- **Kein PII/Secret im Repo.** Privater Schlüssel + Passwort NIE ins Repo. `sbkim/node_key.enc.json`
  legt **Klaus lokal** an. `.gitignore` schützt `*.pem`/`*.key`/`.env`.
- **Offline / keine externen Abhängigkeiten.** Eine `index.html`.
- **Schale additiv:** neues Gesicht NUR außerhalb der Kern-Marker; bewiesene Skripte unberührt.

---

## 4. WAS BEREITS GEBAUT IST (Detail — damit nichts neu erfunden wird)

### 4a. Repo-Gerüst & Kern (PR #1, „Bootstrap")
- Voller Baum 1:1 aus Jasons-Tresor `main` kopiert; **Jasons Secret `node_key.enc.json` bewusst
  NICHT** kopiert (eigene Identität), Jasons Sitzungs-Historie nicht kopiert.
- `package.json` Name `mein-tresor`; Scripts: `test` (node --test), `key`, `demo`, `verify`.
- Tests: `test/*.test.js` (jason_lib, datei, decoy, shamir, gesamtsicherung, node_key, andock).
  Die Logik-Tests **schneiden den Kern aus `jasons-bibliothek/index.html` zwischen den Markern**
  und prüfen ihn headless (kein Duplikat).

### 4b. Das NEUE Gesicht — die Schale (PRs #2, #4, #5, #7, #8)
Additiv in `index.html` + Spiegel eingefügt, in 3 Teilen: `<style>`, DOM, `<script>` (IIFE).
- **Alte Schale neutralisiert:** Kopf-`<script>` setzt `sessionStorage['jt-threshold-seen']='1'`
  (alte Tür überspringt sich), Kopf-`<style>` blendet `#threshold` und `#regal` aus
  (`display:none!important`). Die geerbten Skripte laufen weiter (liefern `window.jtOpenBook`,
  `window.jtBookLocked`, `window.sbkimMailboxCheck`, `jt-vaults`/`jt-booknames`, Sync etc.).
- **Eingang `#mt-entry`** (z-index 1300): `#mt-entry-fit` = Rahmen mit `aspect-ratio:1/1`,
  `width:min(100vw,100vh)`. Darin `#mt-safe` (assets/safe/safe-front.png, `object-fit:fill`) +
  4 Räder `.mt-wheel[data-wheel=c|tl|tr|br]` (assets/safe/drehrad.png).
  **Positionierung rein per CSS-%** (kein JS-Fit): `WHEELS = { c:{x,y,d}, tl, tr, br }` (Anteile
  der Rahmenbreite/-höhe). **Aktuelle, von Klaus kalibrierte Werte:**
  `WHEELS = { c:{x:.4994,y:.4975,d:.3960}, tl:{x:.2928,y:.3091,d:.2160}, tr:{x:.7092,y:.3073,d:.2160}, br:{x:.7077,y:.6959,d:.2120} }`.
  Drehen: Pointer-Drag (rotiert NUR das innere `<img>`), `pointermove/up` an **`document`**;
  `lockWheel()` nagelt die Position bei jeder Bewegung neu fest; **Tippen = ein Schritt (60°)**.
  Schwelle: jedes Rad >120° → `openSafe()` → Überblendung in den Raum. Reine Inszenierung,
  KEINE echte Kombination. Gate: `sessionStorage['mt-entry-seen']`.
- **Raum `#mt-room`** (z-index 800): `#mt-wall-wrap` = Rahmen mit `--ar` (Bild-Seitenverhältnis),
  darin `#mt-wall` + `#mt-grid`. **Wandbilder:** Hochformat `assets/safe/tresorwand-hoch.png`
  (5×6=30 Fächer, ar 1402/1122), Querformat `assets/safe/tresorwand-quer.png` (8×4, ar 1536/1024).
  `LAYOUT = { hoch:{img,ar,cols:5,rows:6,x0:.045,x1:.955,y0:.045,y1:.955}, quer:{...,cols:8,rows:4,x0:.035,x1:.965,y0:.05,y1:.95} }`.
  Die App legt **`N=30` nummerierte Klickflächen `.mt-fach[data-id=f-1..f-30]`** als CSS-%-Raster
  über die gemalten Fächer (im Querformat 2 gemalte Fächer bleiben inert). Nummern editierbar
  (Knopf „✎ Nummern"), gespeichert in `localStorage['mt-fachnums']` (id→Text), Default 01..30.
  🔒-Badge via `window.jtBookLocked('f-N')`. Klick → **`window.jtOpenBook({id,label,el})`** →
  geerbtes Öffnen-Fenster (Passwort → Honigtopf/Tarnfach → Shamir → Dateien → Verschließen).
  Raum-Leiste: `📬 Briefkasten`, `✎ Nummern`, `☰ Liste` (zeigt geerbte Bibliothek), `🔒 Verriegeln`
  (zurück zum Safe). `#mt-toroom` holt aus der Liste zurück.
- **WICHTIGER FIX (PR #8) — nicht rückgängig machen:** `.mt-wheel`/`.mt-fach` sind `<button>`.
  Das geerbte CSS `button:active{transform:translateY(1px)}` überschrieb deren Zentrierung
  `transform:translate(-50%,-50%)` → Sprung um halbe Größe nach rechts-unten. Gepanzert mit:
  `.mt-wheel,.mt-wheel:hover,.mt-wheel:active,.mt-wheel:focus,.mt-fach,...{transform:translate(-50%,-50%)!important}`.
  → Bei neuen Button-Elementen im Gesicht IMMER an diese Vererbungs-Falle denken.

### 4c. Kalibrier-Werkzeug `werkzeuge/kalibrierung.html` (PRs #4, #6)
Offline-Seite, **gleiche Bild-Mathematik wie die App**. Reiter „Dreh-Safe" (4 Räder ziehen +
Größe-Regler), „Wand HOCH"/„Wand QUER" (Punkt A = Mitte Fach oben-links, Punkt B = Mitte Fach
unten-rechts; Spalten/Reihen einstellbar). Gibt Copy-Snippet aus: `WHEELS = {…}` bzw.
`LAYOUT.hoch = {…}`. Beide Werkzeug-Leisten am `≡` **frei verschiebbar** (damit Punkt B
erreichbar ist). → So liefert Klaus exakte Koordinaten; wir backen sie 1:1 in die App-Konstanten.

### 4d. SBKIM-Identität & Andock-Skripte (1:1 aus Jasons-Tresor, nur CONFIG)
- `scripts/generate_spore.mjs` (CONFIG: nodeName „Mein-Tresor", domain „Mein-Tresor-Bibliothek",
  endpoint `https://lausiklauskn-png.github.io/Mein-Tresor/`) → `npm run demo` → `sbkim/spore.json`.
- `scripts/verify_foreign_spore.mjs` → `npm run verify` (eigene/fremde Spore ✔ VALID).
- `scripts/make_node_key.mjs` (`npm run key`, braucht `SBKIM_KEY_PW`) + `open_node_key.mjs`.
- `web/tools/sbkim-spore.js`, `web/tools/sbkim-storage.js` (Browser-Modul 02, byte-identisch).

### 4e. Honesty-Stand
- **Eigene nodeId derzeit FLÜCHTIG:** `CSKmC8kKMs-jIMZ39KEIUB2J7NEBO0-27Tla2rQMBbE` ist nur ein
  Lauf-Ergebnis ohne Schlüssel-Tresor; `spore.json` trägt `_demo:["domainVector"]` + „ungesichert".
  **Dauerhaft erst nach `SBKIM_KEY_PW='…' npm run key`** (Klaus' Passwort, bleibt lokal).
- Pages ist von Klaus aktiv (main/root) → App + Spore live unter dem Endpoint.
- Schale ist **browser-getestet von Klaus** (läuft „ganz gut", ein paar Kleinigkeiten offen).
- `npm test` 53/53; Real-Anteil ~64% (s. `status.json`).

---

## 5. DATEIKARTE (wichtigste Pfade)
```
index.html                      Wurzel-App (Kern + neue Schale + Briefkasten/Siegel)
jasons-bibliothek/index.html    Spiegel (Kern byte-gleich; Asset-Pfade ../)
werkzeuge/kalibrierung.html     Kalibrier-Werkzeug (Räder + Fach-Raster)
assets/safe/                    safe-front.png, drehrad.png, tresorwand-hoch.png,
                                tresorwand-quer.png, fach.png  (Klaus' echte Bilder)
assets/sbkim-siegel-wappen.svg  SBKIM-Siegel (Band auf „MEIN-TRESOR" personalisiert)
sbkim/spore.json                eigene Identität (derzeit flüchtig + _demo)
sbkim/SIGNAL.json               Briefkasten-Aushang (seq 2, ack s.u.)
sbkim/AUSTAUSCH*.md             Postfächer (Sage / SBKIMTool / JasonsTresor)
sbkim/*_inbox.json              verifizierte Nachbar-Sporen (5 Stück, alle ✔ VALID)
scripts/*.mjs                   generate/verify/make/open (Andock + Schlüssel)
.github/sbkim-watch.mjs         Briefkasten-Wächter (Cron „17 7 * * *")
.github/workflows/sbkim-watch.yml
docs/ANDOCK.md SCHLUESSEL.md JASONS-BIBLIOTHEK.md   Verträge/Anleitungen
docs/sessions/BRIEF_*.md        Brief-Kette (start = Gründung; aktiver Brief s. PULS; VORLAGE)
status.json PULS.md CLAUDE.md README.md
```

---

## 6. SBKIM-NETZ — die Verbindungen zu den anderen Tools (Kernstück dieses Briefs)

### 6a. Das Mycel (Quelle: Sage-Protokol `sbkim/NETZ-STAND.md`)
**Sage-Protokol** ist Hub + Knoten. Alle Knoten docken über das Andock-Protokoll an (Spore +
reziproke Verifikation) und pflegen einen Briefkasten (`SIGNAL.json` mit monoton steigender
`seq`). Wahrheitsquelle: jeweils `status.json` + `*_inbox.verify`-Vermerke; menschenlesbare
Karte: Sages `NETZ-STAND.md`. Andock-Konventionen: Sage `INTERFACES §11` (Andock) + **§11.6**
(Briefkasten-Pflege).

### 6b. Alle SBKIM-Knoten (öffentlich erreichbar), von Mein-Tresor reziprok ✔ VALID geprüft
| Knoten | nodeName (Spore) | nodeId | Endpoint | Briefkasten (SIGNAL.json)? | unsere Inbox |
|---|---|---|---|---|---|
| Sage-Protokol | `Sage` | `nysOZE3VuKqZA23i5G2XL67s41JIIykI58zXMtJkYfA` | …github.io/Sage-Protokol/ | **ja** | `sage_inbox.json` |
| SB-KIMTool-Point | `SB-KIMTool-Point` | `CyunQNDRZZ3st8xGDYyK0ymJLNxn_S1UcIJpFKpXXNY` | …/SB-KIMTool-Point/ | **ja** | `point_inbox.json` |
| Jasons-Tresor (Schwester) | `Jasons-Tresor` | `7F_zNopFgYLPCmEFhVlRUDnQVKk3y-RHNr139Z_3hCs` | …/Jasons-Tresor/ | **ja** | `jason_inbox.json` |
| Mein-Rezeptbuch | `Rezeptbuch Klaus` | `uOpUBezUVbOMsVd2C9BkHW80agnLx5tCx_nIRy2KkXg` | …/Mein-Rezeptbuch/ | **nein** | `rezeptbuch_inbox.json` |
| Mein-Mixarium | `Mixarium Klaus` | `B7Fke9CYTR1BrC3xOXzEY5q9RuRH8xxHPUuqRHV3utA` | …/Mein-Mixarium/ | **nein** | `mixarium_inbox.json` |

(Mein-Tresor = wir; nodeId noch flüchtig, s. 4e.) **Sporen-URL-Muster:**
`https://raw.githubusercontent.com/lausiklauskn-png/<Repo>/main/sbkim/spore.json`;
SIGNAL analog `.../sbkim/SIGNAL.json`.

### 6c. Briefkasten/Sync-Mechanik (INTERFACES §11.6)
- **Unsere `SIGNAL.json`:** `node:"Mein-Tresor"`, `seq:2`, `mailboxes` (3 Postfach-URLs),
  `ack:{ "Sage-Protokol":12, "SB-KIMTool-Point":2, "Jasons-Tresor":2 }`, `history[]`.
  `ack[Nachbar]` = die `seq`, die wir vom Nachbarn zuletzt gelesen/quittiert haben.
- **Sitzungsstart (Schritt 3 der Arbeitsregel):** jede Peer-`SIGNAL.json` lesen; ist deren
  `seq` > unserem `ack`, gibt es Ungelesenes → Postfach lesen, handeln, `ack` hochsetzen.
- **Sitzungsende nach einem Bau:** unsere `seq` +1, `headline` setzen, pushen — das Pushen IST
  das Signal. (Server-los.)
- **In der App:** `window.SBKIM_MAILBOX = { self, selfSignal, peers:[Sage, SB-KIMTool-Point,
  Jasons-Tresor] }`; `sbkimMailboxCheck(silent)` zeigt ungelesene Bauten; **Knopf „📬 Briefkasten"
  im Tresorraum** öffnet den Dialog mit **SBKIM-Siegel + eigener nodeId** (oben) + Nachbar-Stand.
- **Wächter:** `.github/sbkim-watch.mjs` (SELF/PEERS = die 3 Briefkasten-Knoten), Cron täglich
  `17 7 * * *`; meldet Ungelesenes, schreibt nichts automatisch.
- **Postfächer (`AUSTAUSCH*.md`):** je Nachbar eine Datei; man legt SEINE Datei ab und liest die
  des anderen. Mein-Rezeptbuch/Mein-Mixarium haben (noch) KEIN SIGNAL.json → nur verifizierte
  Verbindung, kein Postkasten-Sync.

### 6d. Was am Andock OFFEN ist
- **Reziproke Registrierung der Gegenseite:** Sage/SB-KIMTool-Point/Jasons-Tresor tragen
  Mein-Tresor erst als Endknoten ein, wenn unsere **dauerhafte** nodeId + Pages live sind und
  wir uns in ihren Postfächern melden. Voraussetzung dafür: `npm run key` (Klaus).
- **`verified-match` (≥0.80):** erst mit echtem `domainVector` (Sage Modul 03 im Browser →
  `sbkim/domainVector.real.json`), dann Spore neu signieren. Bis dahin ehrlich `verified-spore`.

---

## 7. AUFGABEN DER NACHFOLGESITZUNG

### 7a. ZUERST (Priorität, von Klaus benannt): Briefkasten · Siegel · Voll-Andock an alle 5 Knoten
Diese sind **gebaut** (s. 4b/6c). „Umsetzen/fertig machen" heißt jetzt:
1. **Briefkasten-Runde fahren** (Arbeitsregel Schritt 3): alle 5 Sporen frisch verifizieren,
   die 3 SIGNAL-Knoten lesen + `ack` aktualisieren, ggf. `*_inbox.json` auffrischen.
2. **Dauerhafte Identität** mit Klaus: `SBKIM_KEY_PW='…' npm run key` → `node_key.enc.json`
   (lokal) → Spore neu signieren (`SBKIM_NODE_KEY=… npm run demo`), `_demo`-Vektor bleibt ehrlich.
   Danach `sbkim/spore.json` mit **stabiler** nodeId committen.
3. **Reziprok bei den Nachbarn melden** (in deren Postfächer/Issues): Mein-Tresor mit stabiler
   nodeId + Pages-Spore-URL zur Registrierung anbieten; unsere `SIGNAL.seq` +1 mit Schlagzeile.
4. **Siegel im Gesicht** verifizieren (zeigt stabile nodeId statt „flüchtig").

### 7b. DANN (Nachfolgeaufträge / Feinschliff)
- **Klaus' „Kleinigkeiten"** am Gesicht (Details holt die Sitzung von Klaus ab).
- **Browser-Lauf** (Klaus): Eingang → Raum → **ein Fach mit Passwort öffnen → Datei laden →
  verschließen → erneut öffnen**; Honigtopf/Tarnfach + Shamir prüfen; in Hoch- UND Querformat.
  Danach `status.json` ehrlich auf „browser-geprüft" setzen.
- **Fach-Raster exakt:** mit `werkzeuge/kalibrierung.html` (Wand HOCH/QUER) `LAYOUT.hoch/quer`
  ermitteln und in die App-Konstanten backen.
- **Öffnen-Fenster re-skin:** geerbtes Buch-Overlay optional auf `assets/safe/fach.png` umstellen.
- **`verified-match`** vorbereiten (echter domainVector via Sage Modul 03), wenn Klaus mag.

---

## 8. DATENVERTRÄGE (nicht brechen)
`jt-vaults` pro Fach (`f-1`..`f-30`; Wert: `{tresor: jason-tresor v2, name}`) ·
`jt-booknames` (Buch/Fach-Namen) · `mt-fachnums` (App-Fach-Nummern) ·
`jason-tresor` v2 (`kdf`+`cipher`+`ciphertext`) · `jason-eintrag`/`jason-bibliothek` ·
Shamir-Teil `JT3v5-<i>-<base64url>` · Tarnfach = eigener AES-Umschlag `rec.decoy` ·
Spore kanonisch (ANDOCK §4), 9 Pflichtfelder (createdAt, domain, embeddingModel, endpoint, id,
nodeType, protocolVersion, publicKey, signature).

## 9. AKZEPTANZKRITERIEN
- `npm test` grün (derzeit 53/53); Kern byte-gleich (Hash s. §3), Wurzel==Spiegel.
- `npm run verify` → ✔ VALID; alle `sbkim/*_inbox.json` ✔ VALID.
- Echte Krypto; kein PII/Secret im Repo; offline; Schale additiv.
- Browser-Teile bleiben „ungeprüft", bis Klaus sie gesehen hat.

## 10. ABSCHLUSS-BEFEHL (Kette nie abreißen lassen)
`PULS.md` fortschreiben → **neuen Brief** `docs/sessions/BRIEF_<thema>.md` (Pflichtlektüre +
Arbeitsregel + diesen Abschluss-Befehl wiederholen) → Brief vollständig als Chat-Codeblock →
Commit/Push auf `claude/<scope>` → Draft-PR mit Test-Plan → (Auto-)Merge.
**Merge entscheidet Klaus** (Freibrief für Andock + selbständiges Mergen liegt vor).
