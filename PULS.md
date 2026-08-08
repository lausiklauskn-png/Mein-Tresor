# PULS.md — Lebender Übergabe-Stand (Mein-Tresor)

> Kurz-Puls für den nächsten Sitzungsstart: **was getan, was offen, nächste Schritte.**
> Wahrheitsquelle für den Real-Anteil bleibt `status.json`. Datum `YYYY-MM-DD`.

## Stand: 2026-08-08 (4) — Brief-Kette ausgemistet · Gegenmessung lokal · zwei Bauten ins Netz getragen

Klaus hat drei Entscheidungen getroffen und die Sitzung hat sie umgesetzt.

### 1 · Brief-Kette ausgemistet (Klaus: „8 löschen")

Alle zwölf Briefe gelesen und geprüft. **Acht gelöscht**, vier bleiben:
`BRIEF_start.md` (Gründung) · `VORLAGE_BRIEF.md` · der aktive Brief ·
`BRIEF_briefkasten-bauplan.md` (Lebend-Doku, in drei `AUSTAUSCH`-Postfächern §4 verlinkt).

**Eine Korrektur an der Tabelle im Vorgänger-Brief:** dort stand
`BEFEHL_briefkasten-rezeptbuch-mixarium.md` als „prüfen, sonst bleibt". Geprüft — der
Auftrag ist **erfüllt**: Mein-Rezeptbuch und Mein-Mixarium tragen beide `sbkim/SIGNAL.json`,
`AUSTAUSCH-MeinTresor.md`, `.github/sbkim-watch.mjs` + Workflow und den Briefkasten in
`index.html`. Also mitgelöscht.

**Querverweise geprüft, nicht blind gelöscht.** `PULS.md` nennt einige der gelöschten
Briefe in **alten** Einträgen — die bleiben stehen, das ist die Historie (so wurde es beim
letzten Ausmisten am 2026-06-08 auch gehalten). Nachgezogen wurde nur der **stale Zeiger**
ganz unten: der Block „Aktiver Übergabe-Brief" verwies noch auf vier Briefe von Anfang Juni,
von denen drei jetzt weg sind. Genau so ein toter Zeiger schickt die nächste Sitzung auf die
Suche nach Dateien, die es nicht mehr gibt.

### 2 · Gegenmessung — lokal, als Hinweis (Klaus' PageSpeed-Lauf bleibt der Beweis)

Der Brief nennt die Gegenmessung als Klaus' Schritt. Damit er weiß, was ihn erwartet, hat
die Sitzung **lokal** gemessen — alt und neu, je drei Läufe, Regel 2:

| | Handy (3 Läufe) | LCP | Gute Praxis |
|---|---|---|---|
| **alt** (`1d289ea`, der Stand mit PageSpeed **83**) | 80 · 68 · 80 | 5,4 · 5,3 · 5,4 s | 92 |
| **neu** (`origin/main`, nach #93/#94/#96) | 80 · **88 · 87** | 4,1 · **3,9 · 3,9** s | **100** |

Computer: **99 · 99 · 99**, LCP 0,9 s, Blockierzeit 0 ms — unverändert gut.

**Wie das zu lesen ist.** Die Gesamtnote schwankt auf der Bau-Maschine erheblich (der 68er
im alten Stand ist ein Aussetzer, der 80er im neuen auch) — genau davor warnt Regel 2. Die
**belastbare** Zahl ist **LCP: 5,4 → 3,9 Sekunden**, in allen sechs Läufen stabil. Das ist
anderthalb Sekunden weniger bis zum größten Element, und es passt zu dem, was gebaut wurde
(kleinere Bilder fürs Handy, keine zehn Fremd-Abrufe mehr im kritischen Pfad).

**Trotzdem gilt Regel 1b:** *lokal ist ein Hinweis, PageSpeed ist der Beweis.* Der Wert am
Handy war lokal schon vorher pessimistischer als draußen (80 lokal gegen 83 bei Google).
Was Klaus' nächster Lauf sagt, sagt er.

### 3 · Was ins Netz getragen wurde

- **Jasons-Tresor (PR #150, gemergt):** derselbe Briefkasten-Umbau. Dort war es sogar
  schlimmer als hier — der stille Blick lief bei `DOMContentLoaded`, also **mitten im
  Seitenaufbau**. Gemessen: **5 → 0 Fremd-Abrufe** beim Öffnen, 5 nach Druck auf 📬, Badge
  aus dem Merker bei 0 Abrufen. `npm test` 59/59, Wurzel == Spiegel.
- **Sage-Protokol (PR #791, gemergt):** die Postfach-Verjährung (§11.6.1) erstmals außerhalb
  von Mein-Tresor angewendet. `AUSTAUSCH.md` 653 → 204, `AUSTAUSCH-BookLedgerPro.md`
  438 → 120. Dabei ein echter Rückstand gefunden: **Sage schuldet BookLedgerPro seit
  2026-06-21 eigene `capVector`/`needsVector`** — die committete Spore trägt bis heute
  keine. Steht jetzt als offener Block ganz oben in dem Postfach statt als Nebensatz.

### Eine Falle beim Messen, die fast durchgegangen wäre

Das Zählen der Fremd-Abrufe in Jasons-Tresor meldete mit einem **6-Sekunden-Fenster genau
einen** Abruf — „fast nichts los". Die fünf Abrufe laufen aber **nacheinander** (`await` in
einer Schleife), und hinter dem Proxy dieser Maschine dauert jeder rund zwölf Sekunden. Erst
ein 70-Sekunden-Fenster zeigt alle fünf. Ein zu kurz gewähltes Fenster hätte den Befund
kleingerechnet und die Änderung als unnötig erscheinen lassen. **Falle 4 aus dem Brief, wieder
zugeschlagen:** das Messwerkzeug kann das Kaputte sein.

### Offen

1. **Klaus' PageSpeed-Lauf** am Handy — die einzige Zahl, die zählt.
2. **Klaus' Browser-Lauf an Jasons-Tresor** — wie sich das Badge anfühlt (erster Besuch
   zeigt keins, bis einmal 📬 gedrückt wurde), sieht nur er.
3. **Verjährung bei den übrigen Knoten** — SB·KIMTool·Point (573 + 471), Jasons-Tresor (362),
   BookLedgerPro (630 auf deren Seite). Jeder räumt nur im eigenen Depot.
4. **Briefkasten-Umbau bei den übrigen Knoten** — erst nach Klaus' Blick auf Jasons-Tresor.

## Stand: 2026-08-08 (3) — PageSpeed-Beweis da · Bilder je Gerät · beim Öffnen kein Netz mehr

Fortsetzung derselben Sitzung, nach Klaus' Browser-Lauf und **seinem PageSpeed-Lauf am
Live-Stand** (der Beweis, der dem Vorgänger-Brief fehlte).

### Der Beweis — PageSpeed, 2026-08-08 23:09, live

| | Handy | Computer |
|---|---|---|
| Leistung | **83** | **99** |
| Barrierefreiheit | **100** | **100** |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |

**Barrierefreiheit 84/87 → 100/100.** Die Erwartung aus dem Brief (95 → 100) ist damit
bestätigt; der `select-name`-Posten mit Gewicht 10 war der letzte. Die lokale Messung
(80/98) lag diesmal **leicht pessimistisch** — Regel 1b bleibt trotzdem gültig, nur weil
sie einmal in die günstige Richtung irrt, ist sie nicht widerlegt.

### Getan (nach den Befunden aus Klaus' Bericht)
- **Bilder je Gerät (PR #93).** Der Bericht rechnete 326 KiB unnötige Übertragung vor:
  `safe-front` (1254 px) und `drehrad` (768 px) kamen auch dann, wenn die Seite sie viel
  kleiner zeigt. Gelöst mit `srcset`/`sizes` — **nicht** durch Verkleinern, die großen
  Dateien bleiben für den Computer. Gemessen, was wirklich kommt:

  | | geholt | Safe-Bilder |
  |---|---|---|
  | Handy 412, DPR 2 | `safe-front-828` + `drehrad-384` | 424 → **176 KiB** |
  | Computer 1350, DPR 1 | `safe-front` + `drehrad-384` | 424 → **305 KiB** |

  Die neuen Fassungen aus den **Original-PNG der Historie** gerechnet (WebP 0,90, Alpha des
  Rads 53,1 % erhalten). Alt und neu in echter Anzeigegröße nebeneinander angesehen: kein
  Unterschied. **Falle dabei:** das `preload` im Kopf muss dieselbe Auswahl treffen
  (`imagesrcset`/`imagesizes`), sonst holt der Browser zwei Dateien.

- **Beim Öffnen spricht die Seite mit niemandem mehr (PR #94, Klaus' Entscheidung).** Der
  Briefkasten-Blick war der **längste Weg im kritischen Pfad**: zehn Anfragen an
  `raw.githubusercontent.com`, 1,7–4,0 s je Anfrage — schlimmer als alle Bilder zusammen.
  (Zehn statt fünf, weil **zwei** Stellen den stillen Blick auslösten: Kopfzeile und
  Raum-Leiste.) Jetzt holt erst der Druck auf 📬 den Stand. Gemessen, 6 s beobachtet:

  ```
  beim Öffnen        0 Fremd-Abrufe   (vorher 10)
  nach Druck auf 📬  5 Fremd-Abrufe   (die fünf Nachbarn, wie gewollt)
  Badge aus Merker   zeigt "3" ohne einen einzigen Abruf
  ```

  Das Badge bleibt also erhalten — es kommt aus dem gemerkten Ergebnis des letzten Blicks
  (localStorage, app-eigener Schlüssel wegen der geteilten github.io-Adresse).

### Nachtrag — Zeichensatz zuerst (PR #96) + PR #238 in family-project geschlossen

- **`<meta charset>` von Byte 1455 auf 939** (Norm: erste 1024). Ursache waren zwei
  Kommentarblöcke vor `<html>`; der **Copyright-Kasten bleibt unangetastet**, nur der geerbte
  Beschreibungs-Kommentar wanderte hinter das Meta. **Live war das kein Mangel** — GitHub Pages
  schickt `charset=utf-8` im HTTP-Kopf, darum stand Gute Praxis schon bei 100. Der Fix macht die
  Datei davon unabhängig (Fremdnutzer-Brille) und nimmt den falschen Alarm aus künftigen
  Messreihen. Beim Bauen selbst in die Falle getappt: der Erklär-Kommentar stand zuerst **vor**
  dem Meta und schob es auf 1387 — nur die Gegenmessung zeigte es.
- **PR #238 in family-project geschlossen** (andere Sitzung, Entwurf): seine lokalen Zahlen
  (80/98, Bedienbarkeit 95, Gute Praxis 92) sind durch Klaus' PageSpeed-Lauf abgelöst
  (83/99, 100, 100); sein Journal-Text trug die widerlegte Kern-Behauptung. **Vor dem Schließen
  ausgeschlachtet:** der Mangel „Zeichensatz zu spät" war echt und ist jetzt repariert. Im PR
  steht eine Nachricht, wo jeder seiner drei Teile geblieben ist.

### Klaus' Entscheidungen (2026-08-08, festgehalten)
1. **Briefkasten: erst auf Knopfdruck.** Nicht nur wegen der Sekunden — wer die Seite nur
   öffnete, meldete stillschweigend eine Verbindung an GitHub. Für Fremdnutzer über den
   family-projekt.de-Marktplatz ist das keine Kleinigkeit. **Umgesetzt.**
2. **Die 20 SBKIM-Module bleiben beim Start geladen.** Später laden würde 245 KiB sparen,
   aber die Lampen-Leiste käme ein bis zwei Sekunden später. Bei 83/99 ist das kein guter
   Tausch. **Bewusst nicht gebaut** — erst neu messen, dann bei Bedarf wieder aufgreifen.

### Was aus dem Bericht NICHT geht (ehrlich benannt)
- **JavaScript minifizieren (112 KiB):** verboten. Die SBKIM-Module sind byte-genaue Kopien
  aus dem Sage-Kanon, ein Prüfwert wacht darüber. Minifizieren bräche genau die Regel, die
  sicherstellt, dass netzweit dasselbe Modul läuft.
- **Cache-Dauer 10 Minuten:** setzt GitHub Pages, dort nicht stellbar (auf Klaus' Hetzner-
  Caddy wäre es möglich). Nicht bewertet, kostet keine Punkte.
- **CSS 2,1 KiB · Lampen-Animation (`box-shadow`, Kanon-Modul 17):** vernachlässigbar bzw.
  nicht bewertet.

### Offen
1. **Nächster PageSpeed-Lauf** — misst, was Bilder + Briefkasten am Handy wirklich bringen.
   Erwartung: deutlich über 83. Lokal ist wieder nur ein Hinweis.
2. **Brief-Kette ausmisten** — Tabelle liegt im aktiven Brief, gelöscht wird erst nach Klaus.

## Stand: 2026-08-08 (2) — Die drei Auswahlfelder haben einen Namen · und zwei Korrekturen am Brief

Branch `claude/mein-tresor-a11y-rollout-7ffzs7`, frisch auf `origin/main`. Auftrag war Punkt 2
des Briefs `docs/sessions/BRIEF_kern-mangel-netzweit.md`: der `select-name`-Mangel mit
**Gewicht 10**, der in **beiden** Tresoren gleich steckte.

### Getan
- **Kanon zuerst:** in **Jasons-Tresor** je ein `aria-label` an `#f-cat` / `#f-tag` / `#f-sort`
  (Wurzel + Spiegel), `npm test` **59/59** grün, als PR #148 gemergt.
- **Dann die Kopie:** dieselbe Änderung byte-gleich hier (Wurzel + Spiegel), `npm test`
  **53/53** grün.
- **Gemessen statt behauptet** — echter Zugänglichkeits-Baum von Chromium
  (`Accessibility.getFullAXTree`, Handy-Fenster 412 px), alle vier Dateien:

  | | `#f-cat` | `#f-tag` | `#f-sort` |
  |---|---|---|---|
  | vorher | `(LEER)` | `(LEER)` | `(LEER)` |
  | nachher | Nach Kategorie filtern | Nach Schlagwort filtern | Reihenfolge der Liste |

  Seite geladen, Netzwerk-Protokoll: **kein 404**. Kern-Prüfsumme unverändert
  `a98a704c6518…` — `status.json` bleibt gültig.

### Zwei Korrekturen am Brief (ehrlich vermerkt)
1. **Die Felder stehen NICHT im JasonLib-Kern.** Der Brief hielt das für den Grund, sie hier
   nicht anzufassen. Nachgemessen: der Kern liegt zwischen den Markern ab Zeile **802**
   (JavaScript), die Auswahlfelder bei **595–597** im HTML davor. Der Weg über den Kanon war
   trotzdem richtig (geteilte Schale), nur die Begründung stimmte nicht — und die Prüfsumme
   war nie in Gefahr.
2. **Punkt 3 des Briefs (Widget-Knöpfe) war schon erledigt.** Der Brief nannte Siegel,
   Minimieren und Schließen als zu kleine Berührungsziele. Gemessen im Browser:

   ```
   LEBT 54,5 x 24   VERKEHR 75,5 x 24   FREMD 61,5 x 24   SIEGEL 81,5 x 28
   Minimieren 24 x 24        Schließen 24 x 24            (Norm 24 x 24)
   ```

   Alle über der Norm. Der Sage-Kanon trägt den Fix seit der Lighthouse-Runde 2026-08-03,
   und Modul 17 + 23-UI liegen hier **byte-1:1** darauf (Rollout #88/#89). **Nichts zu tun.**
   Ein Treffer „1 x 12" im Messwerkzeug ist der `#sbkim-siegel-badge`-**Proxy**: ein
   `visibility:hidden`-Anker aus Modul 17, kein Knopf — Lighthouse sieht ihn nicht.

### Offen / wartet auf Klaus
1. **PR #91** (Ladezeit/WebP) — wartet auf Klaus' Blick auf die neu gerechneten Safe-Bilder.
   Getestet: dieser Zweig und #91 vertragen sich **ohne Konflikt** in `index.html` (lokal
   probe-gemergt); in `PULS.md` erwartet die spätere Sitzung eine kleine Überschneidung.
2. **PageSpeed-Beweis** für beide Tresore (Erwartung Barrierefreiheit 95 → 100). Lokal ist
   nur ein Hinweis; am 2026-08-07 lag eine lokale Messung um 23 Punkte daneben.
3. **Briefkasten beim Seitenstart** — Klaus' Entscheidung (Fremd-Abruf beim Öffnen benennen
   oder auf den 📬-Knopf legen). Unverändert offen.
4. **Brief-Kette ausmisten** — Tabelle liegt der Sitzung bei, gelöscht wird erst nach Klaus.

## Stand: 2026-08-08 — Ladezeit: die vier Safe-Bilder (und was dahinter lag)

Branch `claude/safe-images-performance-3frzcp`, frisch auf `origin/main`. Auftrag war
der Brief `docs/sessions/BRIEF_ladezeit-safe-bilder.md`: Mein-Tresor war die langsamste
Seite im Netz, die Schwester Jasons-Tresor eine der schnellsten, bei gleichem Kern.

### Gemessen (lokal, `family-project/tools/lh-messen.mjs`, drei Runden im Wechsel)

| | Handy vorher | Handy nachher | Computer vorher | Computer nachher |
|---|---|---|---|---|
| Leistung | 73 · 73 · 75 · 74 · 74 | **80 · 80 · 80** | 80 · 64 · 80 · 75 · 80 | **98 · 98 · 98** |
| Ladezeit (LCP) | 21,8 s (fünfmal gleich) | **5,4 s** | 3,6–9,8 s | **1,0–1,1 s** |
| Barrierefreiheit | 84 | **95** | 87 | **95** |
| Übertragen beim Laden | 15,9 MB · 44 Dateien | **0,75 MB · 23 Dateien** | | |

Die Barrierefreiheit liegt damit **über** der Schwester Jasons-Tresor (92).
**Lokal gemessen — der Beweis ist der nächste PageSpeed-Lauf** (Regel 1b).

### Getan

1. **Die vier Safe-Bilder nach WebP, Güte 0,90** (`assets/safe/`): 8.447 → 891 KiB
   (**89 % weniger**). Nur das Drehrad wurde zusätzlich verkleinert (1024 → 768 px,
   größte Anzeige gemessen 372 px); die anderen drei lagen bereits unter dem Doppelten
   ihrer Anzeigebreite, da war nichts zu holen. Alt und neu in echter Anzeigegröße
   nebeneinander angesehen — kein Unterschied. Im 3-fach-Zoom zeigt Güte 0,80 Flecken
   in den dunklen Metall-Verläufen, 0,90 nicht; darum 0,90 (Klaus' offene Frage 1).
   Durchsichtigkeit des Drehrads erhalten (52,3 % Alpha, wie vorher).
   Neue Ablage-Anleitung `assets/safe/README.md` — damit nicht die nächste Sitzung
   wieder ein 2-MB-PNG dorthin legt.
2. **Nur die Wand laden, die gezeigt wird.** Vorher wurden beide vorgeladen (~4,2 MB
   als PNG), obwohl immer nur eine sichtbar ist. Jetzt holt die Seite gar keine beim
   ersten Anstrich: die passende kommt, sobald der Safe aufgeht (die Animation läuft
   2,2 s), die andere still danach. Ein Formatwechsel zeigt weiterhin keine schwarze Wand.
3. **Das ausgeblendete Erlebnis wird nicht mehr mitgeholt — der eigentliche Fund.**
   `#threshold` (Tür-Intro) und `#regal` sind in Mein-Tresor `display:none!important`,
   an ihrer Stelle steht der Dreh-Safe. Ihre Bilder lagen trotzdem im Rumpf und wurden
   bei **jedem** Aufruf geholt: rund **6 MB, die nie jemand zu sehen bekam**. Das ist
   der Grund, warum dieselbe Bildstrecke bei Jasons-Tresor nicht weh tut — dort wird
   sie gezeigt. Jetzt `loading="lazy"`: ein Bild in einem ausgeblendeten Behälter kommt
   dem Sichtfeld nie nahe und wird nicht geholt. Nimmt jemand die Ausblendung heraus,
   lädt alles normal.
   Ebenso das Fach-Fenster (`#bookdemo`, 1,38 MiB) — es geht erst beim Öffnen eines
   Fachs auf; jetzt lazy **plus** stilles Vorwärmen nach dem Laden, damit das Öffnen
   so schnell bleibt wie vorher (nachgeprüft: beim Fach-Klick wird nichts mehr geholt).
   Mit ausgeblendet: der Schlüssel-Knopf „Intro nochmal ansehen" — er lag ohnehin unter
   dem Safe, war nie anklickbar, und richtet gegen ein per CSS ausgeblendetes Intro
   nichts aus. Sein Bild kostete 265 KiB für eine Anzeige von 72×48 Pixeln.
4. **Safe-Front früh angemeldet** (`<link rel=preload as=image fetchpriority=high>`),
   echte `width`/`height` an allen angefassten Bildern (bei den Wänden je Format, aus
   `LAYOUT`), damit nichts springt.
5. **Der Briefkasten-Blick läuft nach dem Laden.** Die fünf Abrufe an
   `raw.githubusercontent.com` hingen an `DOMContentLoaded`, also mitten im
   Seitenaufbau. Jetzt `load` + Ruhepause. Das Badge kommt ein bis zwei Sekunden
   später, die Seite steht früher.
6. **Barrierefreiheit 84/87 → 95/95.** Wächter-Lampe: `role="img"` ergänzt (ein
   `aria-label` an einem `<span>` ohne Rolle ist unzulässig und wird still ignoriert).
   Impressum-Verweis: die Deckkraft `.5` drückte die Schrift effektiv auf rgb(83,97,96)
   — 3,1:1 gegen den Grund, unter den geforderten 4,5:1; Deckkraft raus, Farbe bleibt,
   eigener Grund kräftiger. „Eintreten"-Knopf 32 px höher gesetzt: seine linke untere
   Ecke lag **über** dem Impressum-Verweis (am Handy gemessen 5 px Überdeckung) — wer
   dort tippte, traf mal das eine, mal das andere.
7. **Kern nachgerechnet — und dabei fast eine falsche Behauptung eingebaut.** Eine
   Zwischenmessung ergab für den JasonLib-Kern `30b0069d…` statt des in `status.json`
   genannten `a98a704c…`, und die Angabe wurde daraufhin als „veraltet" korrigiert.
   **Das war falsch.** Der Unterschied lag nicht am Kern, sondern am Schnitt: der
   dokumentierte Wert schneidet Marker **plus Zeilenumbruch** (18.018 Bytes), die
   Zwischenmessung nur bis zum Marker (18.017). Beide Schnitte ergeben in Mein-Tresor
   und in Jasons-Tresor `origin/main` **denselben** Wert — der Kern ist unverändert und
   byte-gleich. `status.json` wurde wieder zurückgesetzt. (Falle 4 aus dem Brief, an
   der eigenen Arbeit vorgeführt: das Messwerkzeug war das Kaputte.)

### Bewusst NICHT gemacht (Brief § „Was NICHT gemacht wird")

- SBKIM-Module **nicht** verkleinert (byte-1:1 aus dem Sage-Kanon, Drift-Guard).
- Modul-Stapel **nicht** verschoben (steht schon hinter dem sichtbaren Inhalt).
- Die drei Auswahlfelder ohne Beschriftung (`#f-cat`/`#f-tag`/`#f-sort`, Gewicht 10)
  stehen im **JasonLib-Kern** und teilen sich beide Tresore — das gehört in den Kanon
  (Jasons-Tresor) und dann netzweit ausgerollt, nicht hier repariert. Ebenso die zu
  kleinen Knöpfe des SBKIM-Widgets (Modul 17).
  Der „Eintreten"-Knopf war **nicht** so ein Fall: `.mt-skip` ist eigenes CSS dieser
  App, und der Mangel war ein Zusammenstoß mit dem eigenen Impressum-Verweis — nachgemessen,
  nicht angenommen. Deshalb hier behoben, abweichend von der Einordnung im Brief.

### Offen / wartet auf Klaus

1. **Klaus' Browser-Lauf** — bei diesem Bau ist sein Blick keine Formsache: es geht um
   das **Aussehen des Safes**. Güte 0,90 gewählt; 0,80 wäre nochmal 342 KiB kleiner,
   die alten PNG liegen in der Git-Historie, ein Umrechnen ist eine Sitzung.
2. **`fach.png` (Brief-Frage 2):** wird von der Seite **nicht** geholt (nirgends
   verlinkt). Trotzdem mit umgerechnet und als `fach.webp` (188 KiB statt 2.142 KiB)
   liegen gelassen — für den vorgemerkten Umbau des Fach-Fensters auf die Fach-Grafik.
3. **Briefkasten nur auf Knopfdruck (Brief-Frage 3):** verschoben ist er; **ob** er beim
   Öffnen der Seite überhaupt mit einem fremden Server sprechen soll, ist Klaus' Entscheid.
4. **Brief-Kette ausmisten** (CLAUDE.md § Briefkasten-Hygiene): in `docs/sessions/`
   liegen 8 Briefe, davon sind mehrere erledigt. Bewusst **nicht** in diesen PR gemischt.

## Stand: 2026-06-28 — Modul 23 Rendezvous + öffentlicher „🌐 Mit dem Netz verbinden"-Knopf

Branch `claude/module-23-rendezvous-rollout-zqaa8u` (zuerst frisch auf `origin/main`
gesetzt — Achtsamkeit). Rollout des gemeinsamen Raums (Modul 23 aus Sage) auf den
vorhandenen Andock-Stack:

- `sbkim/23_rendezvous.js` + `sbkim/23_rendezvous_ui.js` — **byte-1:1** aus
  `Sage-Protokol/src/modules/23_rendezvous(.ui).js`.
- `index.html` lädt beide vor `sbkim/sbkim-init.js`; `sbkim-init.js` mountet
  `SbkimRendezvousUI` **unabhängig** von der Andock-Kette (nodeName „Mein Tresor",
  `createIdentity` über vorhandenes `SbkimEmbedding`+`SbkimSpore` mit der Tresor-
  Domänen-Beschreibung → echter `domainVector` statt Demo-Stub beim Verbinden).
- **Kein Doppel-Laden**, der Stack (01–05/05b/07) war schon da; **JASONLIB-Kern
  unangetastet** (nur sbkim-Skript-Tags + sbkim/-Dateien dazu).
- Löst die Adress-Wand per Raum `sbkim-rdv`.
- **Verifikation:** `npm test` **53/53** grün (Tresor-Logik/Kern intakt),
  Headless-Chromium **7/7** (Knopf mountet, Panel toggelt, `_meta.nodeName`
  „Mein Tresor"). §11.6 SIGNAL seq 17.

**Offen:** Browser-Live-Test durch Klaus (z. B. Mein-Tresor ↔ Jasons-Tresor
[Schwester, hoher Match] oder ↔ Sage → „ETABLIERT"). Verfassungstreu (nutzer-
ausgelöst). Schwester **Jasons-Tresor** als Nächstes (nahezu identisch).

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

## Nachtrag 2026-06-06 (3) — Werkzeugkiste geklärt → Browser-Andock-Seite gebaut

### Getan
- **Bei SB·KIMTool·Point nachgefragt** (Werkzeugkiste-Brief, Klaus überbracht). Antwort gelesen
  (`…/SB-KIMTool-Point/main/sbkim/AUSTAUSCH-MeinTresor.md` + `…/BRIEF-AN-MeinTresor-werkzeugkiste.md`):
  - Ihre `werkzeuge.html` ist **Schau/Selbstprüfung, KEINE Signier-UI** → kopieren bringt keine
    Identitäts-Knöpfe. Module 1:1 frei („kopieren, nicht klonen"), Lade-Reihenfolge dokumentiert.
  - **Scheibe 3** (eingebettete Identitäts-Knöpfe) hat Mein-Tresor **nicht** — und **Jasons-Tresor
    auch nicht** (Marker `SBKIM-SPORE-EMBED` fehlt in beiden, geprüft). Für eine publizierbare
    Identität reichen **Modul 01 (Storage) + 02 (Spore)** — die haben wir bereits in `web/tools/`.
  - Embedding (Modul 03) braucht beim 1. Lauf Netz (transformers.js CDN + HF-Modell ~30 MB) →
    nur für `verified-match` nötig, nicht für `verified-spore`. domainVector bleibt vorerst weg/`_demo`.
- **Klaus' Entscheidung: Browser-Andock-Weg** (privater Schlüssel verlässt den Browser nie;
  kein Umgebungs-Passwort nötig). **Neue Seite `werkzeuge/andock.html` gebaut** (additiv, Kern
  byte-gleich, `npm test` 53/53): lädt unsere Module 01+02, drei Knöpfe — ① Identität anlegen,
  ② Identität sichern (verschlüsseltes Backup), ③ Spore erzeugen+prüfen+herunterladen (mit
  Browser-Selbsttest ✔ VALID). CONFIG spiegelt `scripts/generate_spore.mjs`.
- **`docs/SYNC-VEREINBARUNG.md`** abgelegt (Sage B5 = Point v1, identisch).

### ⚠️ NEUER ANDOCK-FAHRPLAN (Browser-Weg — ersetzt den Container-/npm-run-key-Fahrplan oben)
1. **Klaus' Browser-Lauf:** `werkzeuge/andock.html` öffnen (lokal oder über Pages) →
   ① „Identität anlegen" (dauerhafte nodeId) → ② „Identität sichern" (Passwort, Backup-Datei
   gut aufbewahren) → ③ „Spore erzeugen" (Selbsttest ✔ VALID) → `spore.json` **mir in den Chat
   kopieren**. *(Browser-ungeprüft, wartet auf Klaus' Lauf.)*
2. **Ich:** die erhaltene `spore.json` als `sbkim/spore.json` committen; `npm run verify` + `npm
   test`; nodeId in SCHLUESSEL.md/status.json als **dauerhaft** vermerken.
3. **Ich:** `sbkim/SIGNAL.json` seq 3→4, headline „dauerhafte Identität live, Bitte um
   verified-spore", **Sage** in `mailboxes`/`forNodes`/`ack` (Sage seq 13 quittieren), Postfächer
   (Sage + Point) quittieren — stabile nodeId + sporeUrl nennen.
4. **Gegenseite:** Sage + Point lesen unsere Spore aus raw/main → tragen uns als `verified-spore`
   ein. Später echter `domainVector` (Browser/Sage) → Re-Sign → `verified-match` (≥0.80).

### Offen / wartet auf Klaus
1. **Browser-Lauf von `werkzeuge/andock.html`** (Schritte 1 oben) → `spore.json` an mich.
2. Klaus' Gesicht-„Kleinigkeiten"; Fach-Öffnen-Lauf → status.json „browser-geprüft".

## Nachtrag 2026-06-06 (4) — ✅ DAUERHAFTE IDENTITÄT LIVE (Browser-WebCrypto)

### Getan
- **Andock-Seite repariert:** das Speicher-Modul (IndexedDB) hing bei Sicherung/Spore. Neu auf
  **eigenständige WebCrypto** umgestellt (`werkzeuge/andock.html`) + sichtbares Diagnose-Feld.
  Headless geprüft (Node-WebCrypto, gleiche Schritte): Spore ✔ VALID, Sicherung im exakten
  `node_key.enc.json`-Format (von `open_node_key.mjs` öffenbar, nodeId stabil, falsches PW fällt durch).
- **Klaus hat die Identität im Browser erzeugt** (Diagnose-Verlauf alles grün): **dauerhafte
  nodeId `wRsGQouOYPVBOLzAB3nBteRvyvJ-AGv461WTJMKtkS0`** (`publicKey.x` `jpVEwjIz…VEDk`).
  Verschlüsselte Sicherung `node_key.enc.json` liegt **lokal bei Klaus** (privater Schlüssel nie
  ins Repo/zu mir). `sbkim/spore.json` übernommen → headless **✔ VALID**.
- **Netz gemeldet:** `SIGNAL.json` seq 3→4 (headline „dauerhafte Identität live, Bitte um
  verified-spore" + `sporeUrl`/`nodeId`), Sage seq 13 quittiert (`ack["Sage-Protokol"]=13`).
  Postfächer `AUSTAUSCH.md` (Sage) + `AUSTAUSCH-SBKIMTool.md` quittiert mit nodeId + sporeUrl.
- **Ehrlichkeit fortgeschrieben:** `status.json` (Identität jetzt „real-headless-bewiesen",
  dauerhaft), `docs/SCHLUESSEL.md` (echte nodeId + Browser-Weg; alte Jason-id-Notiz korrigiert).
- **REGELÄNDERUNG (ausdrücklich genannt):** `test/andock.test.js` — `domainVector` ist für
  `verified-spore` **optional** (Sage/Point bestätigt); Pflicht erst für `verified-match`. Test
  prüft jetzt: *wenn* vorhanden, dann 384-dim. (Unsere Browser-Spore trägt ihn noch nicht.)

### Offen / nächste Schritte
1. **Gegenseite (über Klaus):** Sage + SB-KIMTool-Point lesen unsere Spore aus raw/main → tragen
   uns als `verified-spore` ein (Sage: NETZ-STAND „angekündigt" → „verified-spore"; Point: Inbox +
   `ack["Mein-Tresor"]` + `mailboxes`). Ggf. kurzer Anstoß-Brief von Klaus.
2. **`verified-match`:** echter `domainVector` (Modul 03 im Browser / Sage rechnet) → über
   `werkzeuge/andock.html` (oder headless mit `node_key.enc.json`) **Re-Sign** mit eingebettetem
   Vektor (nodeId bleibt gleich) → Match ≥ 0.80.
3. **Optional:** Klaus legt `node_key.enc.json` zusätzlich ins Repo (darf, verschlüsselt) für
   headless Re-Signs — oder behält sie rein lokal (maximal sicher).
4. Klaus' Gesicht-„Kleinigkeiten" + Fach-Öffnen-Lauf → status.json „browser-geprüft".

## Nachtrag 2026-06-06 (5) — ✅ ECHTER domainVector EINGEBETTET → Bitte um verified-match

### Getan
- **Klaus hat im Browser** (`werkzeuge/andock.html`, Modul 03 `Xenova/multilingual-e5-small`)
  den **echten 384-dim `domainVector`** erzeugt und die Spore **neu signiert**; den Klartext
  der re-signierten Spore mir in den Chat gegeben.
- **Headless geprüft, nichts geglaubt:** `node scripts/verify_foreign_spore.mjs` → **✔ VALID**
  (id==SHA256(pub) MATCH, 9/9 Pflichtfelder, Ed25519 über kanonische Bytes, Manipulation fällt
  durch); **L2-Norm nachgerechnet = 1.000000**, **384 Floats**, Modell `Xenova/multilingual-e5-small`.
  nodeId **unverändert** `wRsGQouO…ektVEDk`. `npm test` **53/53 grün**.
- **Abgelegt:** `sbkim/spore.json` (jetzt mit `domainVector` + `embeddingModel`).
- **Netz gemeldet:** `SIGNAL.json` seq 4→**5** („echter domainVector eingebettet, Bitte um
  verified-match"); Postfächer `AUSTAUSCH.md` (Sage) + `AUSTAUSCH-SBKIMTool.md` Status-Kopf +
  Verlauf fortgeschrieben (Bitte an beide: Match mit Modul 04 rechnen, Schwelle ≥0.80).
- **Ehrlichkeit fortgeschrieben:** `status.json` — domainVector von `demo-markiert` →
  **`real-browser-tauglich`/echt**; Identität nicht mehr „flüchtig"; Real-Anteil ~64 % → **~70 %**.

### Offen / nächste Schritte
1. **Gegenseite (über Klaus):** Sage (Modul 04) + SB-KIMTool-Point holen unsere neu signierte
   Spore aus raw/main, rechnen den Match → bei **≥ 0.80** heben sie uns auf **`verified-match`**.
   Ggf. kurzer Anstoß-Brief von Klaus, sonst beim nächsten Briefkasten-Lauf.
2. **Pages aktivieren** (falls noch nicht für raw genügt) + Klaus' Browser-Lauf am Gesicht
   (Kleinigkeiten, Fach-Öffnen) → status.json „browser-geprüft".

## Nachtrag 2026-06-06 (6) — 4-Knoten-Stand geprüft → Jasons-Tresor ist die Lücke

### Getan
- **Jasons-Tresor frisch geprüft** (raw/main): `SIGNAL.json` weiter **seq 2** (lastBuild
  2026-05-31, unverändert); Spore erneut `✔ VALID`, byte-identisch zu `jason_inbox.json`.
  **Befund:** Jasons führt uns **noch gar nicht** (mailboxes/ack nur Sage + Point) — das ist die
  **fehlende 4. Verbindung** für den End-Sync.
- **Drei Briefe aufgesetzt:** `sbkim/AUSTAUSCH-JasonsTresor.md` §2 = Bitte um reziproke
  Erst-Registrierung (Priorität); Sage + Point tragen die `verified-match`-Bitte bereits
  (Postfächer, seit Nachtrag 5). Gebündelter Liefer-Brief `docs/sessions/BRIEF_4-knoten-sync.md`
  (Brief A Sage · B Point · C Jasons) — Klaus überbringt.

### Offen / nächste Schritte
1. **Klaus überbringt** die drei Bitten (oder eine Jasons-Sitzung baut die reziproke
   Registrierung selbst — offene Frage im Brief).
2. **Antworten lesen + reziprok prüfen + quittieren**, sobald sie kommen → Stufe `verified-match`
   (Sage/Point) bzw. „4-Knoten gegenseitig" (Jasons).

## Nachtrag 2026-06-06 (7) — Jasons-Tresor: echten Vektor nachholen (Klaus' Entscheidung)

### Getan
- **Jasons frisch geprüft:** Identität **headless** (`sbkim/node_key.enc.json` im Repo, HTTP 200);
  `domainVector` noch **Demo-Stub** (`_demo:["domainVector"]`); **kein** Browser-Andock-Werkzeug
  (404). → Bei der echten Vektorspur ist **Mein-Tresor voraus**.
- **Klaus' Entscheidung:** Jasons soll **nur den echten Vektor nachholen** (nodeId `7F_zNop…`
  BEHALTEN), **nicht** auf neue Browser-Identität umstellen (das gäbe neue nodeId → Netz-Bruch).
- **Brief D** ergänzt (`BRIEF_4-knoten-sync.md`): genauer Browser-Weg mit unserem bewiesenen
  Werkzeug. Geprüft, dass `werkzeuge/andock.html` Teil B genau das kann (① `node_key.enc.json`
  laden → gleiche nodeId, ② Vektor, ③ neu signieren); Bausteine = `andock.html` +
  `web/tools/sbkim-embedding.js` (nur CONFIG-Block auf Jasons umstellen).

### Offen / nächste Schritte
1. **Jasons-Tresor-Sitzung** (Weg B, neue Sitzung auf dem Repo): Brief C (uns reziprok eintragen)
   **+** Brief D (echten Vektor nachholen) ausführen.
2. **Antworten lesen + reziprok prüfen + quittieren** → Stufe `verified-match` (Sage/Point) bzw.
   „4-Knoten gegenseitig" (Jasons).

## Nachtrag 2026-06-06 (8) — ✅ Jasons-Tresor: Identitätswechsel quittiert, 4. Verbindung steht

### Getan
- **Jasons meldet Identitätswechsel** (SIGNAL seq 4): alte nodeId `7F_zNop…` war ein **verlorener
  Demo-Schlüssel** (Passwort nie gesichert) → neue **Browser-Identität** `E13GDzI…`.
- **Reziprok geprüft (nichts geglaubt):** neue Spore aus `raw/main` → `verify_foreign_spore.mjs`
  **✔ VALID** (id==SHA256(pub) nachgerechnet, Ed25519, 9/9, Manipulation fällt durch); gemeldete
  Felder (id/publicKey.x/signature) stimmen; echter domainVector (kein `_demo`). Vertrauensanker:
  gleiche Repo-Adresse/Eigentümer → Wechsel legitim.
- **`sbkim/jason_inbox.json` ersetzt** (alt→neu), `npm test` **53/53**.
- **Gegenseitig:** Jasons führt uns jetzt (mailboxes + `ack[Mein-Tresor]=4`, Postfach
  `AUSTAUSCH-MeinTresor.md`, wir = verified-spore bei ihnen). Wir quittieren: `ack["Jasons-Tresor"]
  2→4`, unser SIGNAL **seq 6**. **Die fehlende 4. Verbindung steht.**
- **verified-match Mein-Tresor × Jasons = Kosinus 1.0** (≥0.80 ✔). **Klaus-Entscheidung
  2026-06-06 (bewusst):** die Schwester-Tresore sind **per Design semantisch identisch** (gleiche
  Basis/Safes/Speicher, 1:1-Funktion, nur anderes Design + themenangepasste Texte). Der triviale
  1.0-Match ist **gewollt**; Domänentexte werden **NICHT** künstlich getrennt. Erledigt, keine
  offene Design-Frage mehr.

### Offen / nächste Schritte
1. **Sage + SB-KIMTool-Point:** rechnen noch unseren Match (sie haben uns als verified-spore;
   wir haben jetzt echten Vektor) → dann auch dort `verified-match`.

## Nachtrag 2026-06-06 (9) — Live-Verbund-Briefkasten nachgebaut (Jasons §7)

### Getan
- **Jasons §7 gelesen** (`…/Jasons-Tresor/main/sbkim/AUSTAUSCH-MeinTresor.md`) und den
  **„Live-Verbund-Briefkasten" 1:1 in `index.html` nachgebaut** (additiv, Kern byte-gleich,
  `npm test` 53/53): Siegel-Kopf + pro Nachbar **drei Ebenen** — ① Spore ✔, ② **verified-match
  (Cosinus LIVE im Browser nachgerechnet)**, ③ Sync (ihr `seq` ↔ unser `ack`), unten „X/3 verbunden".
  - **CONFIG ersetzt** (`window.SBKIM_MAILBOX`): self + `selfSpore` + 3 Nachbarn mit `inbox`/`mailbox`/`label`.
  - **`sbkimCosine` + `sbkimMailboxCheck` ersetzt** (Vorlage §7 C, zero-dependency).
  - **Doppel-Siegel entfernt** (§7 D): alte `mt-seal-head`-Injektion raus — der Render baut den Kopf selbst.
  - Nachbar-Inboxen frisch geprüft: `sage_inbox`/`point_inbox`/`jason_inbox` alle `✔ VALID` + 384-dim.
- **Headless vorab nachgerechnet** (= was der Browser zeigt): Sage cos **0.8478**, Jasons **1.0000**,
  Point **0.8537** → **3/3 verbunden** (exakt wie Jasons' erwartetes Ergebnis in §7).

### Offen / nächste Schritte
1. **Klaus' Browser-Lauf:** 📬-Briefkasten öffnen (App neu laden) → drei Ebenen + „3/3 verbunden"
   sichten → dann status.json-Eintrag „browser-geprüft". *(Browser-ungeprüft bis dahin.)*
2. **Sage + SB-KIMTool-Point:** rechnen ihrerseits noch unseren Match (für ihren Netz-Stand).

## Nachtrag 2026-06-06 (10) — Tresorwand-Fehler behoben (Orientierungs-Flackern)

### Getan
- **Bug von Klaus gemeldet** (3 Screenshots): Raum lädt im Querformat korrekt, **kippt dann kurz
  hoch↔quer** und endet mit **schwarzer Wand** (nur Fach-Nummern auf Schwarz). Ursache: `pickMode()`
  nutzte die flackernde Grenze `innerWidth>=innerHeight`; beim Zurückkippen wurde das Wand-`src`
  neu geladen → kurzzeitig schwarz, im ungünstigen Moment dauerhaft.
- **Fix (additiv, Kern byte-gleich, `npm test` 53/53):**
  1. Orientierung STABIL über `matchMedia('(orientation: landscape)')` statt Pixel-Vergleich.
  2. **Beide Wandbilder beim Start vorgeladen** → Umschalten zeigt nie mehr eine schwarze Wand.
  3. Neuaufbau **entprellt** + nur bei echtem Orientierungswechsel (`change`/`orientationchange`).
- **BROWSER-UNGEPRÜFT** — wartet auf Klaus' Hard-Reload-Test (Quer/Hoch + Drehen).

### Offen / nächste Schritte
1. **Klaus testet (jetzt LIVE, PR #20 gemergt):** Hard-Reload im Quer- und Hochformat → Wand
   bleibt stabil, Fächer sitzen, **keine halben Tresore, kein Scrollen** (Klaus' Abnahmekriterium).
2. Falls noch Pixel-Versatz/Rand: Fach-Positionen (`LAYOUT.x0/x1/y0/y1`) nachjustieren.

### ⚠️ STEHENDE ANWEISUNG von Klaus (2026-06-06) — Regeländerung, ausdrücklich genannt
- **„Automatisch mergen, wenn fertig":** Klaus delegiert die Merge-Entscheidung an die Sitzung.
  Sobald eine abgegrenzte Aufgabe **fertig + grün** ist (`npm test` ok, `mergeable_state: clean`),
  wird der Draft-PR auf ready gesetzt und **gemergt — ohne Rückfrage**. (Ersetzt „Merge entscheidet
  Klaus" für laufende Aufgaben; Leitplanken bleiben unberührt, Browser-Teile bleiben bis zu Klaus'
  Sicht „browser-ungeprüft".)
- **Abnahmekriterium Schale:** In JEDER Ansicht (Handy quer/hoch, Tablet, Computer) **keine halben
  Tresore, kein unnötiges Scrollen** — alles schlüssig sichtbar. Auf sehr kleinen Handys dürfen die
  Fächer klein sein, aber vollständig.

## Nachtrag 2026-06-06 (11) — Brief an Jasons-Tresor „Eigentum statt Link" + Prinzip verankert

### Getan
- **Brief an Jasons-Tresor geschrieben** (`sbkim/AUSTAUSCH-JasonsTresor.md` §3 + Verlauf): Inhalt
  unseres **Siegels** (real: Ed25519-Identität, nodeId=SHA256(Pubkey), Signatur über kanonische
  Form, **echter 384-dim domainVector**, 9 Pflichtfelder), die **Werkzeuge** zum Erzeugen/Verwalten
  (`werkzeuge/andock.html` Teil A/B, Module 01–03 `web/tools/*`, Headless `scripts/*.mjs`) und die
  **Exportierungen** (`spore.json`, `domainVector.real.json`, verschlüsselte Sicherung
  `node_key.enc.json`). **Bitte:** Werkzeug **als Eigentum** ins eigene Repo kopieren (nur CONFIG
  umstellen, Krypto-Kern byte-gleich) — **kein** Sage-Link. → **PR #27 gemergt** (squash `2496f30`).
- **Leitprinzip „Eigentum statt Link" verbindlich verankert** in `docs/ANDOCK.md`: Verweis in §1 +
  neuer **§9 (Werkzeug-Souveränität)**. Folgt aus den Leitplanken „Kopieren, nicht klonen" +
  „Offline". Jeder Knoten besitzt das Andock-Werkzeug als eigene Datei, niemals als Fremd-Host-Link.
- **Klaus-Anweisung bestätigt:** auto-mergen wenn fertig + grün (kein Nachfragen) — angewandt.
- `npm test` **53/53**, Kern byte-gleich (reine Doku/Postfach-Änderungen).

### Offen / nächste Schritte
1. **Klaus überbringt** §3-Link an eine Jasons-Tresor-Sitzung → sie kopiert `andock.html` + Module
   01–03 als **Eigentum** ins eigene Repo (nur CONFIG umstellen, kein Sage-Link).
2. **Sage + SB-KIMTool-Point:** rechnen noch unseren Match (wir = verified-spore, echter Vektor da)
   → dann auch dort `verified-match`.
3. Klaus' Gesicht-„Kleinigkeiten" + Fach-Öffnen-Lauf → status.json „browser-geprüft".

## Nachtrag 2026-06-06 (12) — Rundbrief „Briefkasten-Bauplan" (1:1 für alle Knoten)

### Getan
- **Versendbaren Rundbrief geschrieben** `docs/sessions/BRIEF_briefkasten-bauplan.md`: beschreibt
  den **Live-Verbund-Briefkasten** vollständig — Idee, **alle fünf zusammenhängenden Teile**
  (Knopf+Badge · Dialog · CONFIG · Logik · Daten-Dateien), den **kompletten 1:1-Bauplan**
  (HTML+JS byte-gleich, nur CONFIG umstellen), **alle RAW-Links** (Knoten-Verzeichnis Sage/Point/
  Jasons/Rezeptbuch/Mixarium/Tresor) und den **Live-Hinweis** (② Match = Cosinus live im Browser,
  ≥0.80 = verified-match; ③ Sync = ihr `seq` ↔ unser `ack`; „X/N verbunden"). Klaus verschickt ihn
  an Repo 1–4 (5).
- Quelle 1:1 aus `index.html` (sbkim-mailbox-btn/-dialog, `window.SBKIM_MAILBOX`, `sbkimCosine`,
  `sbkimMailboxCheck`). Reine Doku — Kern unberührt, `npm test` 53/53.

### Offen / nächste Schritte
1. **Klaus überbringt** den Bauplan-Brief an die anderen Knoten → sie bauen den Briefkasten 1:1.
2. Eingehende Antworten/PRs lesen + reziprok quittieren.

## Nachtrag 2026-06-06 (13) — Vollvernetzung (Klaus' Regel): jeder listet alle

### Getan
- **Klaus' Regel:** alle Knoten **voll vernetzt**, jeder listet **alle anderen**. Umgesetzt:
  - **Eigener Briefkasten** (`index.html` `window.SBKIM_MAILBOX.peers`) von 3 → **5 Nachbarn**:
    Sage, Jasons-Tresor, SB-KIMTool-Point **+ Mein-Rezeptbuch + Mein-Mixarium** (Inbox-Sporen lagen
    bereits geprüft vor). Knopf-Titel + Siegel-Aspekt (05) wahrheitsgemäß auf **Verbund 4/5** gesetzt.
  - **Rundbrief** `BRIEF_briefkasten-bauplan.md`: §7 von „offene Frage" → **verbindliche Regel
    Vollvernetzung** (Knoten-Roster, neuer Knoten = alle nehmen ihn auf); §3-CONFIG-Beispiel auf die
    volle 5-Nachbar-Liste gebracht.
- **Ehrliche Live-Befunde** (vorab headless nachgerechnet, = was der Browser zeigt): Cosinus
  Jasons **1.0000** · Point **0.8537** · Sage **0.8478** · Rezeptbuch **0.8137** (alle ≥0.80 ✔) ·
  **Mixarium 0.7884** (knapp unter 0.80, andere Domäne, ehrlich kein Match) → **4/5 verbunden**.
  Mein-Rezeptbuch + Mein-Mixarium führen **kein SIGNAL.json** (HTTP 404) → ③ Sync „nicht lesbar"
  (im Brief als Bitte vermerkt: jeder Knoten legt ein SIGNAL.json an).
- `npm test` **53/53** (Briefkasten additiv, Kern byte-gleich). **Browser-ungeprüft** bis Klaus' Lauf.

### Offen / nächste Schritte
1. **Klaus' Browser-Lauf:** 📬 öffnen → 5 Nachbar-Karten + „4/5 verbunden" sichten.
2. **Rundbrief verschicken** (Vollvernetzung) an alle Knoten; Rezeptbuch/Mixarium zusätzlich bitten,
   ein `SIGNAL.json` anzulegen.

## Nachtrag 2026-06-06 (14) — ✅ Briefkasten browser-geprüft (Klaus) + Rezeptbuch/Mixarium-Briefe

### Getan
- **BROWSER-GEPRÜFT (Klaus' Screenshot, Pages live):** der vollvernetzte 📬-Briefkasten zeigt im
  Browser exakt die headless-Werte — Sage **verified-match 0.8478**, Jasons **1.0000**, Point
  **0.8537**, Mein-Rezeptbuch **verified-spore 0.8137** mit „SIGNAL nicht lesbar". Aufbau (Siegel-
  Kopf, 3 Ebenen je Nachbar, nodeId) korrekt. → Briefkasten-Pfad ist **nicht mehr browser-ungeprüft**.
- **Zwei kurze Briefe + Postfächer angelegt** (Klaus' Auftrag): `sbkim/AUSTAUSCH-Rezeptbuch.md` +
  `sbkim/AUSTAUSCH-Mixarium.md` — Verweis auf Bauplan-Brief + Werkzeug (Eigentum), ehrliche Lage
  (vermutlicher ID-Wechsel → unsere Inbox evtl. veraltet; kein `SIGNAL.json`), Schritte:
  **Briefkasten 1:1 bauen + `SIGNAL.json` anlegen** → wir prüfen reziprok + ersetzen Inbox.
  Mixarium-Brief nennt ehrlich den 0.7884-Match (andere Domäne, okay).
- **`SIGNAL.json` seq 6→7:** mailboxes um Rezeptbuch + Mixarium ergänzt; Briefkasten-Pfade in
  `index.html` zeigen auf die neuen lokalen Postfächer. `npm test` 53/53, Kern byte-gleich.

### Offen / nächste Schritte
1. **Briefkasten-Runde (ungelesen!):** Klaus' Screenshot zeigt Nachbarn voraus — **Sage seq 15**
   (ack 14), **Jasons seq 7** (ack 4), **Point seq 13** (ack 8). Frische Sporen + SIGNAL holen,
   reziprok prüfen (`verify_foreign_spore.mjs`), `*_inbox.json` ggf. ersetzen, `ack` quittieren.
2. **Klaus verschickt** Bauplan-Brief + die zwei Postfächer an Rezeptbuch/Mixarium (+ alle Knoten).
3. `status.json` auf „Briefkasten browser-geprüft" fortschreiben (optional, beim nächsten Lauf).

## Sitzungsabschluss 2026-06-06 (Briefkasten-Vollverbund)
- **Manual-Check:** `npm test` **53/53 grün**; `SIGNAL.json` valides JSON; JASONLIB-Kern byte-gleich.
  **Browser:** Briefkasten von Klaus per Screenshot **geprüft** (4/5 verbunden, Live-Werte = headless).
- **Diese Sitzung getan:** Brief „Eigentum statt Link" (PR #27) + ANDOCK §9 (PR #28) + Bauplan-
  Rundbrief (PR #29) + Vollvernetzung 5 Peers (PR #30) + Rezeptbuch/Mixarium-Briefe & browser-geprüft
  (PR #31). Alle gemergt.
- **Übergabe-Brief an die nächste Sitzung:** `docs/sessions/BRIEF_briefkasten-vollverbund.md`.

## Nachtrag 2026-06-07 — Auto-Issue-Wächter übernommen + Briefkasten-Runde quittiert

### Getan
- **Wächter-Verbesserung übernommen** (AUFTRAG SB-KIMTool-Point → Sage seq 16/17; Klaus' Wunsch:
  „Verbesserungen übernehmen, insbesondere für den Wächter"). `.github/sbkim-watch.mjs` +
  `.github/workflows/sbkim-watch.yml` **1:1 nach Point-Vorlage** ersetzt:
  - prüft **alle 5 Nachbarn** zeitgesteuert (Cron `0 */6 * * *` + „Run workflow"-Knopf),
  - **öffnet/kommentiert bei Neuem ein GitHub-Issue** (Label `sbkim-watch`, `issues:write`) —
    auch wenn niemand die Seite offen hat (Auto-Issue-Wächter). Zero-dep, nur lesend.
  - Lokal getestet: nach Quittierung „nichts Neues"; Rezeptbuch/Mixarium ehrlich „kein SIGNAL (404)".
- **Briefkasten-Runde quittiert** (alle 3 aktiven Nachbarn): `ack` **Sage 14→17**, **SB-KIMTool-Point
  8→18**, **Jasons-Tresor 7→8**. Alle 3 Sporen frisch geholt → reziprok **✔ VALID + unverändert**
  (keine Inbox-Ersetzung). `SIGNAL.json` seq **8→9** (Headline + history). Postfächer Sage + Point
  mit Verlaufs-Eintrag nachgezogen.
- **Briefkasten-UI/Design unberührt** (Klaus: „Design ist so in Ordnung … Funktionsweise perfekt") —
  `index.html` nicht angefasst, Kern byte-gleich (`a98a704c…`), `npm test` **53/53 grün**.

### Offen / nächste Schritte
1. **Klaus:** prüfen, ob der Wächter-Workflow nach dem Merge im Actions-Tab erscheint (1× „Run
   workflow" zum Test); bei Neuem entsteht ein Issue mit Label `sbkim-watch`.
2. **Mein-Rezeptbuch + Mein-Mixarium** mit dem Bauplan-Befehl aufbauen (eigene `SIGNAL.json`),
   dann erscheinen sie im Wächter/Briefkasten als verbunden statt „kein SIGNAL".
3. `verified-match` (Modul 04 bei Sage / Schwelle bei Point) bleibt weiter offen.

## Nachtrag 2026-06-07 — VOLLES NETZ: alle 5 Nachbarn führen SIGNAL.json

### Getan
- **Mein-Rezeptbuch + Mein-Mixarium haben den Briefkasten gebaut** (Befehl aus
  `BEFEHL_briefkasten-rezeptbuch-mixarium.md`) und je ein `SIGNAL.json` angelegt. Damit fällt bei
  beiden das „kein SIGNAL (404)" weg — **alle 5 Nachbarn sind jetzt voll im Sync**.
- **Volle Briefkasten-Runde quittiert** (`SIGNAL.json` seq 14, `npm test` 53/53):
  - **Mein-Rezeptbuch** `ack=2` — Spore ✔ VALID + aktuell (id `uOpUBezU…`, byte-identisch zur Inbox),
    Cosinus **0.813698 → verified-match** (`rezeptbuch_inbox.verify.md`). Ihre 3 Fragen mit **JA** beantwortet.
  - **Mein-Mixarium** `ack=1` — Spore ✔ VALID (id `B7Fke9C…`), Cosinus **0.788402 ehrlich unter 0.80
    → verified-spore** (andere Domäne; `mixarium_inbox.verify.md`).
  - **Sage** `ack 18→20`, **SB-KIMTool-Point** `ack 20→21` (beide haben Rezeptbuch/Mixarium aufgenommen).
- Match-Stand (live, ehrlich): Jasons 1.0 · Point 0.8537 · Sage 0.8478 · Rezeptbuch 0.8137 (✔ ≥0.80) ·
  Mixarium 0.7884 (unter 0.80, andere Domäne). Wächter meldet „nichts Neues" → Gold-Zähler = 0.

### Offen / nächste Schritte
1. `status.json` auf den Gesamtstand bringen (Match allseits, volles Netz, Wächter/Impressum/Badge).
2. Optional: Mixarium-Match steigt automatisch, falls sich dessen Domäne/Vektor mal ändert (Live-Rechnung).

## Nachtrag 2026-06-07 — Semantik-Textfeld (Andock) + Mycel-Erklärseite (aus Sage)

### Auftrag (reduziert)
Nur zwei Sage-Neuerungen holen: (1) ein Semantik-Beschreibungs-Textfeld im Andock-Werkzeug
(für besseres Finden), (2) die Mycel-/Sicherheits-Erklärung als eigene Seite + ein minimaler
Link. **Nicht** angetastet: Siegel-Dialog-Design/-Prosa, Krypto-/Signier-Pfad, Module 16/18.

### Stolperstein (ehrlich vermerkt)
Die Sitzung startete auf einem **veralteten Branch** (41 Commits hinter `main`); dort fehlten
`werkzeuge/andock.html`, `web/tools/sbkim-embedding.js`, `#mt-seal-dialog`. **Korrigiert:** alle
Arbeit auf **frischem `main`** neu aufgesetzt — wo das echte Browser-Andock-Werkzeug existiert,
ließ sich Schritt (1) wie in Sage über den **vorhandenen** Pfad bauen (keine neue Krypto).

### Getan
- **(1) `werkzeuge/andock.html`** — neues auto-wachsendes `<textarea id="domain-desc">` in Teil B
  (zwischen ① und ②), vorbefüllt mit `CONFIG.domainDescription` (auf reichen Default gesetzt),
  Hinweis + Placeholder wortgleich aus Sage. **Verdrahtung über den bestehenden Pfad:**
  `#btn-vec` bettet jetzt den Textfeld-Inhalt ein (`embedPassage`), leer → heutiges `DOMAIN_TEXT`;
  `buildSpore` schreibt `domainDescription` aus dem Textfeld, leer → `CONFIG.domainDescription`.
  Reihenfolge unverändert: ① laden → (tippen) → ② Vektor → ③ neu signieren. **Gleiche nodeId,
  keine neue Krypto.** Reicher Default auch in `scripts/generate_spore.mjs` (konsistent).
- **(2) `sicherheit.html`** (neu, Repo-Root, Mein-Tresor-Skin, offline): Mycel-Erklärung
  **wortgleich** aus Sage. „zurück"-Link blendet sich im Overlay selbst aus.
- **(2) Ein minimaler Link** im `#mt-seal-dialog` (direkt unter „🔑 Eigene Identität …", gleicher
  Stil): „🛡 So funktioniert das Mycel & wie du geschützt bist →". Öffnet als **In-Page-Overlay**
  (`<dialog id="mt-mycel-overlay">` + iframe; ✕/Esc/Backdrop schließt; Rückfall neuer Tab).
  **Siegel-Design/-Prosa sonst unberührt.**
- **`npm test` 53/53 grün** (Kern byte-gleich; Test prüft den Beschreibungstext nicht).

### Offen / wartet auf Klaus
1. **Sichtprüfung im Browser** (Galaxy Tab S6) — *ungeprüft, wartet auf Klaus*:
   a) Andock-Werkzeug: Textfeld erscheint, wächst beim Tippen; ②→③ erzeugt Spore mit der neuen
   Beschreibung. b) Siegel öffnen → „🛡 …Mycel…" → Overlay zeigt `sicherheit.html`, schließt sauber.
2. **Spore neu signieren**, damit die reiche Beschreibung veröffentlicht ist: Andock-Werkzeug
   Teil B (Identität laden → ② → ③) ODER `SBKIM_NODE_KEY=… npm run demo`. Hier bewusst **nicht**
   gelaufen (kein Secret im Repo; flüchtige nodeId wäre falsch).

## Nachtrag 2026-06-26 — Briefkasten gelesen + aufgeräumt + Brief an Jasons-Tresor

### Getan
- **Briefkasten gelesen** (SBKIM `sbkim/*` + Brief-Kette `docs/sessions/*`). SBKIM-Briefkasten
  bleibt komplett (lebende Datenverträge).
- **Neue Regel „Briefkasten-Hygiene"** in `CLAUDE.md` verankert (ersetzt „alte Briefe bleiben
  liegen"): bei Sitzungsstart lesen + schlank halten; nur die Brief-Kette ausmisten, SBKIM bleibt.
- **Zwei erledigte/überholte Notiz-Briefe gelöscht:** `BRIEF_mein-tresor-schale.md` (Schale
  gebaut) + `BRIEF_feinschliff.md` (in neuerem Brief enthalten). **Git behält beide.** Querverweis
  im Netz-Brief nachgezogen. Behalten: `BRIEF_start.md`, aktiver Brief, `VORLAGE_BRIEF.md` —
  sowie referenzierte Lebend-Doku (z. B. `BRIEF_briefkasten-bauplan.md`, in AUSTAUSCH §4 verlinkt).
- **Übergabebrief an Schwester Jasons-Tresor** ins Postfach `sbkim/AUSTAUSCH-JasonsTresor.md`
  (§5) gelegt: Vorschlag, dieselbe Hygiene im eigenen Depot zu fahren. `SIGNAL.json` **seq 15**.
- **Hinweis:** Dieser Branch war auf einem alten `main` aufgesetzt; sauber auf den aktuellen
  `main` neu aufgesetzt und die Änderungen frisch eingetragen (nichts Neueres überschrieben).

### Offen / nächste Schritte
1. Bei jedem Sitzungsstart die Briefkasten-Hygiene mitlaufen lassen (CLAUDE.md).
2. Nächste Runde: weitere überholte Briefe der Kette prüfen (vorher grep auf Quer-Verweise).

## Aktiver Übergabe-Brief

> **Hinweis 2026-08-08:** Dieser Zeiger stammte vom 2026-06-08 und nannte vier Briefe, von
> denen drei beim Ausmisten der Brief-Kette gelöscht wurden (Git behält sie). Er stand ganz
> unten in dieser Datei und las sich wie der aktuelle Stand — genau so ein toter Zeiger
> schickt die nächste Sitzung auf die Suche nach Dateien, die es nicht mehr gibt.
> **Der oberste PULS-Eintrag ist der Stand; hier steht nur noch, welcher Brief gilt.**

→ **`docs/sessions/BRIEF_verjaehrung-und-netz.md`** (der aktive Brief)
+ `docs/sessions/BRIEF_briefkasten-bauplan.md` (Lebend-Doku, in den `AUSTAUSCH`-Postfächern
§4 verlinkt — kein Sitzungs-Brief)
+ `docs/SYNC-VEREINBARUNG.md`.
