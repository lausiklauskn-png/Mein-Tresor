# Mein Tresor — Bootstrap-Brief & Verfassung (für die ERSTE Sitzung im neuen Repo)

> **Zweck dieser Datei:** Start-Anweisung für eine neue KI-Sitzung im Repo **`lausiklauskn-png/Mein-Tresor`**.
> Damit baut sich das Repo **selbst** — indem es die getesteten Originale aus dem öffentlichen Schwester-Repo
> **Jasons-Tresor** holt (raw GitHub), 1:1 kopiert und nur die Schale (Design) neu macht. Zusätzlich:
> **SBKIM-Andock**, **Briefkasten** und **Synchronisation** mit den anderen Repos/Sitzungen.
> **Klaus legt diese MD ins neue Repo** (z. B. als `CLAUDE.md` und/oder `docs/sessions/BRIEF_start.md`).
>
> ⚠️ **Voraussetzung:** Sowohl **Jasons-Tresor** als auch **Mein-Tresor** müssen **public** sein, sonst sind die
> raw-URLs unten nicht abrufbar. (Stand der Planung: Mein-Tresor ist public, Jasons-Tresor noch privat → öffnen.)

## Was „Mein Tresor" ist
Eine **design-vereinfachte Schwester** von Jasons-Tresor. **Funktion = identisch** (jedes Fach ist ein echter
AES-Tresor, mit Schlüssel/Passwort geöffnet; Honigtopf/Tarnfach, Shamir 3-von-5, alle Dateiformate,
Gesamt-Sicherung — alles aus dem bewiesenen `JasonLib`-Kern). **Nur das Gesicht ist neu:** ein futuristischer
High-End-Dreh-Safe als Eingang → ein einziger Tresorraum mit **20 nummerierten Fächern**. **Offline-PWA**,
läuft in **Hoch- UND Querformat** (Handy/Tablet/Rechner). Zugleich ein **echter SBKIM-Endknoten** mit eigener
Identität, Briefkasten und Andock an Sage + SB-KIMTool-Point.

## Leitplanken (1:1 aus Jasons-Tresor — unverändert)
- **Kopieren, nicht klonen.** Getestete Originale aus Jasons-Tresor holen, 1:1 kopieren, nur CONFIG/Schale anpassen.
- **Echte Krypto.** Ed25519/SHA-256 (`node:crypto`); AES-256-GCM/PBKDF2-SHA256 600k (WebCrypto). `domainVector` ehrlich `_demo`, bis echtes Embedding.
- **`npm test` = Beweis.** Headless-Tests grün, bevor irgendetwas „fertig" heißt.
- **Kein PII / kein Secret im Code.** Privater Schlüssel + Passwort **nie** ins Repo/Commits (nur per env). `node_key.enc.json` (verschlüsselt) darf rein.
- **Offline / keine externen Abhängigkeiten.** Eine `index.html`; Node ≥ 20 nur für Skripte/Tests.
- **Mirror byte-gleich.** `JasonLib`-Kern in Wurzel & Spiegel **byte-identisch** (Test schneidet den Kern aus dem Spiegel).
- **Ehrlichkeit zuerst.** `status.json` zeigt Real-Anteil; Browser-Teile bleiben „ungeprüft, wartet auf Klaus' Browser-Lauf".
- **Plan-vor-Code + Rücksprache.** Erst Plan an Klaus, dann bauen.
- **Brief-Kette nie abreißen.** `CLAUDE.md → PULS.md → neuester BRIEF → status.json`, am Ende PULS + neuen Brief schreiben.

## Pflichtlektüre VOR der Arbeit — öffentliche raw-URLs holen
**Basis:** `https://raw.githubusercontent.com/lausiklauskn-png/Jasons-Tresor/main/`
- Verfassung/Stand: `CLAUDE.md`, `PULS.md`, `status.json`, `docs/sessions/VORLAGE_BRIEF.md`
- Datenverträge/Spec: `docs/JASONS-BIBLIOTHEK.md`, `docs/ANDOCK.md`, `docs/SCHLUESSEL.md`
- App + Kern: `index.html` (Kern zwischen `// JASONLIB-CORE-START` … `// JASONLIB-CORE-END`) und Spiegel `jasons-bibliothek/index.html`
- Andock/SBKIM: `scripts/make_node_key.mjs`, `scripts/open_node_key.mjs`, `scripts/generate_spore.mjs`, `scripts/verify_foreign_spore.mjs`, `web/tools/sbkim-spore.js`
- Briefkasten/Sync: der Mailbox-`<script>`-Block in `index.html` (`window.SBKIM_MAILBOX` + `sbkimMailboxCheck`), `.github/sbkim-watch.mjs`, `.github/workflows/sbkim-watch.yml`, `sbkim/SIGNAL.json`, `sbkim/AUSTAUSCH.md`
- Tests: `test/jason_lib.test.js`, `test/andock.test.js`, `test/node_key.test.js`, `test/shamir.test.js`, `test/decoy.test.js`, `test/datei.test.js`, `test/gesamtsicherung.test.js`
- **Nachbarn (für Andock + Sync):** `https://raw.githubusercontent.com/lausiklauskn-png/Sage-Protokol/main/sbkim/SIGNAL.json` und `.../SB-KIMTool-Point/main/sbkim/SIGNAL.json`; dazu die SBKIM-/Briefkasten-Doku in **Sage-Protokol** (z. B. `.github/SBKIM-WATCH-FUER-FORKER.md`) und **SB-KIMTool-Point**.

## Aufbau-Prinzip: was kopieren, was neu
**1:1 kopieren (Kern & Logik, nur CONFIG ändern):**
- Den **`JasonLib`-Kern** aus `index.html` (Marker-Schnitt) → in Mein-Tresor `index.html` **und** Spiegel, byte-gleich. `npm test` mit demselben Schnitt.
- Die **Vault-Logik**: `openVault`/`encryptTresor`/`decryptTresor`, Passwort-Abfrage, Sperre nach 2 Fehlversuchen, **Honigtopf/Tarnfach**, **Shamir 3-von-5**, beliebige Dateiformate, Gesamt-Sicherung + Auto-Sync-Ordner. Speicher-Format `jt-vaults` **pro Fach**.
- Die **Andock-Skripte** + `web/tools/sbkim-spore.js` → nur CONFIG (Knotenname/Domain/Endpoint) anpassen.
- Den **Briefkasten** (`window.SBKIM_MAILBOX` + `sbkimMailboxCheck`) + `.github/sbkim-watch.mjs` + Workflow → CONFIG (`self`, `peers`) anpassen.

**Neu bauen (nur die Schale/Design):** Dreh-Safe-Eingang, 20-Fächer-Raster, re-geskinntes Öffnen-Overlay (Fach-Tür statt Buch), editierbare Nummern. Effekte aus Jasons-Tresor wiederverwenden (`buch-energie`, `licht-blitz`, `mix-blend:screen`, `prefers-reduced-motion`, `sessionStorage`-Gate).

---

## Das Design (die neue Schale)

### Eingang — Dreh-Safe (reine Inszenierung)
Vorlage: die `#threshold`-Tür-Sequenz aus Jasons-Tresor. Statt Tür ein **Safe-Front-Bild** mit **vier Drehrädern**
(1 großes mittig + 3 kleine: oben links, oben rechts, unten rechts), die per Pointer **gedreht** werden →
Glitzer-Effekt → nach einer einfachen Schwelle (z. B. jedes Rad > ~120° gedreht) „öffnet" der Safe → sanfte
Überblendung in den Tresorraum. **Keine echte Kombination** (Sicherheit = Passwort pro Fach). `sessionStorage`-Gate
+ „nochmal ansehen". Die Räder sind **an das angezeigte Bild-Rechteck verankert** (Muster `fitBooksToImage`),
damit sie in Hoch- und Querformat auf ihren Vertiefungen bleiben (Ränder dürfen beschnitten werden).

### Tresorraum — 20 Fächer (responsiv, beide Orientierungen)
Wand = Hintergrund (`object-fit:cover`, mittig). Darüber ein **CSS-Grid**: **Hochformat ~4×5**, **Querformat ~5×4**
(per Orientierungs-/Aspect-Query; dieselben 20 Fächer ordnen sich um). **Eine** Raum-Ansicht; wird es eng, leichtes
Scrollen. Jede Zelle = ein **Fach-PNG**. **IDs `f-1`…`f-20`** = je ein `jt-vaults`-Datensatz (`tresor`/`decoy`/`name`/
`category`). **Nummern editierbar** (Default „01"…„20", lokal gespeichert, Overlay bei ~64 % Höhe über dem Schild).
Schlüsselloch-Glanz/Klickfläche bei ~28 % Höhe. Klick aufs Fach → bekanntes Öffnen-Overlay (Passwort → Inhalt →
Datei laden → verschließen), 1:1 aus Jasons-Tresor re-geskinnt.

### Die vier Bild-Prompts (für Klaus' externe Bild-KI)
Stil für alle: **futuristisch, „nicht von dieser Welt", SpaceX-Vibe,** dunkles Metall mit **türkisem (#6EE7D3) und
gold-warmem (#F4B435) Leuchten**, fotorealistisch, **kein Text/keine Personen/keine Wasserzeichen**, frontal.
Hintergründe (1 & 3) **quadratisch (1:1), streng zentriert, ~15 % ruhiger Rand** (übersteht Beschnitt in beiden Lagen).

1. **Safe-Front (1:1):** gewaltige futuristische Tresortür, frontal/symmetrisch; **in der Mitte eine große, leere,
   kreisrunde Vertiefung** + **drei kleinere leere kreisrunde Vertiefungen** (oben links/rechts, unten rechts), je mit
   zartem Leuchtring, **ohne Räder** (kommen separat); alle vier in den mittleren ~70 %.
2. **Drehrad (transparentes PNG, quadratisch):** ein kreisrundes Dreh-/Kombinationsrad mit Griffkerben, türkisen
   Marken; **Alpha-Hintergrund, Rad exakt zentriert (Drehachse = Bildmitte), ~90 % Breite, kein Schlagschatten.**
3. **Tresorraum-Wand (1:1):** gleichmäßige futuristische Tresorwand als Hintergrund **ohne** gezeichnete Türen
   (Türen macht das Raster), dezente Rahmung, atmosphärisches Licht.
4. **Ein Fach (transparentes PNG):** eine metallische Schließfach-Tür, leicht hochkant, **Alpha-Hintergrund,
   zentriert**; genau zwei Elemente: **(1) rundes Schlüsselloch im oberen Drittel, Mitte ~28 % Höhe; (2) leeres,
   glattes Nummern-Schild unten, zentriert, ~60 % Breite, ~14 % Höhe, Mitte ~64 % von oben** — **kein Text/keine Zahl.**

> *Koordinaten-Anliegen:* Die Bild-KI muss nur **ein** kleines Element exakt setzen (Schlüsselloch ~28 %, Schild ~64 %
> im EINEN Fach-PNG) — das schafft sie. Die Platzierung der 20 Fächer und der 4 Räder macht die **App** (exakt, in jeder Orientierung).

---

## SBKIM-Andock (eigene Identität)
Nach `docs/ANDOCK.md` + `docs/SCHLUESSEL.md`:
1. `SBKIM_KEY_PW='<Passwort>' npm run key` → erzeugt `sbkim/node_key.enc.json` + zeigt die **dauerhafte nodeId** (Passwort/Schlüssel **nie** ins Repo).
2. **CONFIG** in `scripts/generate_spore.mjs` anpassen (`nodeName: "Mein-Tresor"`, eigene `domain`, `endpoint: "https://lausiklauskn-png.github.io/Mein-Tresor/"` mit `/`), dann `npm run demo` → signierte `sbkim/spore.json`.
3. `npm run verify` → `✔ VALID`. **GitHub Pages** (main/root) aktivieren → Spore live abrufbar.
4. Bei **Sage-Protokol** und **SB-KIMTool-Point** als Endknoten melden (Postfächer/AUSTAUSCH), reziprok deren Spore in `sbkim/sage_inbox.json` / `sbkim/point_inbox.json` ablegen + `verify`.

## Briefkasten + Synchronisation (mit den anderen Repos/Sitzungen)
1:1 aus Jasons-Tresor:
- **`sbkim/SIGNAL.json`** (eigener Briefkasten): `{ node:"Mein-Tresor", seq, headline, mailboxes{…}, ack{} }`. Bei jedem Bau `seq` erhöhen + `headline` setzen.
- **`sbkim/AUSTAUSCH.md`** je Nachbar (menschen- + maschinenlesbares Postfach).
- **Briefkasten-Knopf** (`window.SBKIM_MAILBOX` + `sbkimMailboxCheck`): `self:"Mein-Tresor"`, `peers` = Sage + SB-KIMTool-Point (+ ggf. Jasons-Tresor) mit deren **raw `SIGNAL.json`-URLs**. Beim Laden still prüfen → Badge, wenn Nachbar-`seq` > eigener `ack`.
- **Sync = gegenseitiges Lesen/Quittieren:** Nachbar gelesen → `ack[Nachbar] = seq` setzen. **„Seltene Zeitabläufe"** = der tägliche, bewusst versetzte Cron `.github/workflows/sbkim-watch.yml` (`"17 7 * * *"`) ruft `.github/sbkim-watch.mjs` (CONFIG `SELF/PEERS` anpassen) → meldet ungelesene Bauten, ändert nichts automatisch. **Die genauen Spielregeln/Protokoll** in Jasons-Tresor (`sbkim/AUSTAUSCH.md` §11.6) + **Sage-Protokol** (`.github/SBKIM-WATCH-FUER-FORKER.md`) + **SB-KIMTool-Point** lesen und befolgen.

## Datenverträge (nicht brechen)
- Tresor-Umschlag `jason-tresor` v2; `jason-eintrag` / `jason-bibliothek`; **`jt-vaults` pro Fach** (`tresor`/`decoy`/`name`/`category`).
- Shamir-Teil `JT3v5-<i>-<base64url>`; Tarnfach = eigener AES-Umschlag (`rec.decoy`). Spore: kanonische Signier-Form (ANDOCK §4), 9 Pflichtfelder (§7).

## Verifikation
- `npm test` grün (Kern-Schnitt wie in Jasons-Tresor); `npm run verify` → Spore `✔ VALID`.
- Browser-Lauf in **Hoch- UND Querformat** (Handy + Rechner): Dreh-Eingang → Raum → Fach mit Passwort öffnen → Datei laden → verschließen → erneut öffnen; Nummern editierbar; Honigtopf; Shamir. Klaus' Sichtprüfung in beiden Lagen.

## Erste Schritte (Bootstrap-Reihenfolge)
1. Pflichtlektüre (raw-URLs) holen + lesen. 2. Repo-Gerüst (`package.json` `type:module` + scripts; `README.md`; Ordner `docs/`, `docs/sessions/`, `scripts/`, `test/`, `sbkim/`, `.github/workflows/`, `assets/`). 3. **Kern + Tests 1:1 kopieren → `npm test` grün** (Spiegel anlegen, Kern byte-gleich). 4. **Andock** (Key + Spore + verify + Pages). 5. **Schale bauen** (Dreh-Safe + 20-Fächer-Raster) — erst nach Klaus' echten Bildern, Plan-vor-Code. 6. **Briefkasten + Sync** (SIGNAL.json, AUSTAUSCH, Watcher). 7. `PULS.md` + neuen `BRIEF_*.md` schreiben.

## Abschluss-Befehl (Brief-Kette)
`PULS.md` fortschreiben → neuen Brief schreiben (Pflichtlektüre + diesen Abschluss-Befehl wiederholen) → Brief als
Chat-Codeblock ausgeben → Commit/Push auf `claude/<scope>` → **Draft-PR** mit Test-Plan. **Merge entscheidet Klaus.**

---

### Bestätigte Eckdaten / offene Punkte
- **Repo-Slug:** `lausiklauskn-png/Mein-Tresor` (public, Branch `main`, noch leer). **Endpoint** für Spore/Pages:
  `https://lausiklauskn-png.github.io/Mein-Tresor/`.
- **Jasons-Tresor muss public werden**, sonst greifen die raw-Bootstrap-URLs nicht.
- Farbstimmung „SpaceX" (kühles Weiß-Blau vs. Türkis-Gold) — nach Klaus' echten Bildern festlegen.
- Spiegel `jasons-bibliothek/index.html` optional (für den Kern-Test genügt ein Marker-Schnitt aus einer Datei;
  bei Spiegel die Mirror-Regel beachten).
