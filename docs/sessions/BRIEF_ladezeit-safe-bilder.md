# BRIEF — Ladezeit: die vier Safe-Bilder

Stand: 2026-08-08

## Pflichtlektüre vor der Arbeit (in dieser Reihenfolge)

1. `CLAUDE.md` — Verfassung + Leitplanken.
2. `PULS.md` — aktueller Stand (getan / offen / nächste Schritte).
3. **Dieser Brief** (der neueste in `docs/sessions/BRIEF_*.md`).
4. `status.json` — ehrlicher Real-Anteil.
5. Doku + Code der zugewiesenen Scheibe.

Zusätzlich, weil es genau um dieses Gewerk geht:
`family-project/.claude/skills/seiten-bauregeln/regeln/bilder.md` — dort steht,
warum Bilder in diesem Netz der teuerste Einzelposten waren, und wie man ohne
Bildwerkzeug nach WebP umrechnet.

## Stand

Klaus hat am 2026-08-08 gemessen: **Mein-Tresor ist die langsamste Seite im
Netz.** Die Schwester **Jasons-Tresor** ist eine der schnellsten. Beide teilen
denselben Kern, dieselben Module, dieselbe Erlebnis-Bildstrecke — nur das
Gesicht ist verschieden.

Lokal gegengemessen (Lighthouse, Handy):

| | Leistung | LCP | Übertragen |
|---|---|---|---|
| Jasons-Tresor | **99** | 1,1 s | ~7 MB |
| Mein-Tresor | **68** | **32,5 s** | **12,0 MB** |

**Der Unterschied ist nicht das Protokoll, nicht der Code, nicht der
Modul-Stapel.** Beide laden die SBKIM-Module am Ende des Rumpfes (Zeile 3250
von 3329 hier, 3010 von 3092 dort) — dort ist nach Regel 2 der Skript-Regeln
wenig zu holen. Der Unterschied sind **vier Bilder**.

## Die Ursache, in einer Tabelle

| Datei | Größe | angezeigt | Datei ist | Ersparnis laut Google |
|---|---|---|---|---|
| `assets/safe/safe-front.png` | **2.323 KiB** | 721 × 721 | 1254 × 1254 | 2.238 KiB |
| `assets/safe/tresorwand-quer.png` | **2.121 KiB** | — | 1536 × 1024 | — |
| `assets/safe/tresorwand-hoch.png` | **2.085 KiB** | — | 1402 × 1122 | — |
| `assets/safe/drehrad.png` | **1.918 KiB** | 285 × 285 | 1024 × 1024 | 1.905 KiB |
| **zusammen** | **8.447 KiB** | | | |

Das sind **70 % der gesamten Übertragung**. Jasons-Tresor hat keine davon.

Drei Dinge stecken darin, und sie sind unabhängig voneinander:

1. **PNG statt WebP.** Bei Klaus' Bannern an SB-KIMTool-Point brachte allein der
   Formatwechsel **95 % weniger** bei nachweislich unverändertem Aussehen.
2. **Viel zu groß gerechnet.** Das Drehrad wird mit **285 px** angezeigt und
   liegt mit **1024 px** auf der Platte. Gefordert ist höchstens das Doppelte
   der Anzeige (für Bildschirme mit doppelter Pixeldichte), also ~570 px.
3. **Beide Tresorwände werden geladen**, obwohl immer nur **eine** zu sehen ist
   — `hoch` im Hochformat, `quer` im Querformat. Rund **2 MB werden in jedem
   Fall umsonst geholt.**

Dazu kommt: `assets/safe/fach.png` liegt mit 2,1 MB im Repo. Im Netzwerk-
Protokoll taucht es nicht auf — **erst prüfen, ob es überhaupt gebraucht wird**,
bevor es mit umgerechnet wird.

## Was gebaut werden soll — in dieser Reihenfolge

Die Reihenfolge ist nach Wirkung sortiert. **Nach jedem Schritt messen**, nicht
erst am Ende: sonst weiß niemand, welcher Schritt was gebracht hat.

### 1 · Ausgangswert festhalten

Vorher messen und die Zahl notieren (Leistung, LCP, Übertragung). Ohne diese
Zahl ist am Ende nicht belegbar, dass die Arbeit etwas gebracht hat.

### 2 · Die vier Safe-Bilder nach WebP, auf die richtige Größe

Chromium ist im Container vorhanden und kann WebP kodieren — Bild als
`data:`-URL in ein Canvas der **Zielbreite** zeichnen, `toDataURL('image/webp',
0.80)`, Bytes schreiben. Muster und Begründung: `bilder.md` § „Umrechnen ohne
Bildwerkzeug". Güte 0,80 war bei Klaus' Bannern nicht vom Original zu
unterscheiden.

Zielbreiten (doppelte Anzeigegröße):

- `safe-front` → **1442 px** (angezeigt 721)
- `drehrad` → **570 px** (angezeigt 285)
- `tresorwand-hoch` / `-quer` → an der echten Anzeigebreite messen, dann
  verdoppeln. **Nicht schätzen** — die Wand füllt den Bildschirm, die Zahl
  hängt am Gerät.

Erwartung, nach den Erfahrungswerten des Netzes: **8.447 KiB → unter 800 KiB**.
Das ist eine Erwartung, keine Zusage — die Zahl gilt erst, wenn sie gemessen
ist.

**Pflicht danach:** alt und neu in der **echten Anzeigegröße** nebeneinander
rendern und **ansehen**. 95 % kleiner ist kein Erfolg, wenn es schlechter
aussieht. Beim Point-Fix hat genau dieser Blick den Ausschlag gegeben. Und der
Safe ist hier nicht Beiwerk, sondern das Gesicht der App.

### 3 · Nur die Tresorwand laden, die auch gezeigt wird

Heute holt die Seite beide. Der Wechsel zwischen `hoch` und `quer` steckt in
`index.html` (~Z. 3120). Die nicht gebrauchte Wand erst holen, wenn das Gerät
wirklich gedreht wird. Spart rund 2 MB — **bei jedem Aufruf**.

### 4 · Das LCP-Bild früh bekannt machen

Google sagt es wörtlich: *„Anfrage ist im ursprünglichen Dokument sichtbar"*
schlägt fehl, `fetchpriority=high` fehlt. Das größte Element des ersten
Eindrucks ist `#mt-safe`.

```html
<link rel="preload" as="image" href="assets/safe/safe-front.webp" fetchpriority="high">
```

An Mein-Rezeptbuch-Page brachte derselbe Griff **182 → 53 ms**, und das Bild
wurde weiterhin nur **einmal** geholt (die Vorladung wird wiederverwendet).

### 5 · `width` und `height` an jedes Bild

Fehlt heute mindestens an `assets/erlebnis/bilder/schluessel.webp`. **Die
echten Maße eintragen**, nicht ungefähre.

⚠ **Falle, die an Mein-Mixarium-Page real zugeschlagen hat:** Maße ohne
`height:auto` im CSS zerreißen die Handy-Ansicht — die starre Höhe aus dem
Attribut gilt weiter, während die Breite auf 100 % schrumpft. Also **immer
beides**: Attribute im HTML **und** `height:auto` im CSS.

### 6 · Die acht `SIGNAL.json`-Abrufe aus dem kritischen Pfad nehmen

Die Kette zeigt **acht** Abrufe an `raw.githubusercontent.com`, bis zu
**1.299 ms**, mitten im Seitenaufbau. Das ist der Briefkasten-Blick übers Netz,
und er gehört **nach** `load`, nicht davor.

Zwei Gründe, nicht nur einer: er kostet Ladezeit, **und** er lässt die Seite
beim bloßen Öffnen mit einem fremden Server sprechen. Für Fremdnutzer über den
Marktplatz gehört das benannt oder verschoben.

### 7 · Barrierefreiheit: 84 → 92 ist geschenkt, der Rest gehört in den Kanon

Auch hier lohnt der Blick zur Schwester. Gemessen:

| | Barrierefreiheit |
|---|---|
| Jasons-Tresor | **92** |
| Mein-Tresor | **84** |

Die acht Punkte Differenz sind **genau zwei Stellen**, die nur Mein-Tresor hat:

- **`<span class="hud-lamp" aria-label="Wächter ruhig">`** — ein `aria-label` an
  einem `span` **ohne Rolle** ist nicht zulässig; Vorlesehilfen ignorieren es.
  Entweder `role="img"` dazu, oder den Text sichtbar danebenstellen. Gewicht 7.
- **`#mt-impressum`** — zu schwacher Kontrast. **Pro Thema nachrechnen und die
  Deckkraft mitrechnen** (Regel 2.2/2.3); und die Farbe vom Browser umrechnen
  lassen, nicht selbst parsen — siehe Falle 4 unten.

Beides zusammen bringt Mein-Tresor auf das Niveau der Schwester.

**Was danach übrig bleibt, teilen sich beide** — es gehört deshalb **nicht**
hierher repariert, sondern in den Kanon und dann netzweit ausgerollt:

- Die drei Auswahlfelder `#f-cat`, `#f-tag`, `#f-sort` ohne Label (**Gewicht 10**
  — der größte Einzelposten). Sie stehen in beiden Tresoren gleich.
- Der Überspringen-Knopf (`#mt-entry-skip` hier, `#th-skip` dort) ist als
  Berührungsziel zu klein. Ebenfalls in beiden.
- Die Knöpfe des SBKIM-Widgets (Siegel, Minimieren, Schließen) sind ebenfalls zu
  klein — das ist **Modul 17, byte-1:1 aus dem Sage-Kanon**. Hier **nicht**
  anfassen (siehe „Was NICHT gemacht wird"). Der Weg ist: im Kanon beheben,
  Aspekt im Siegel ergänzen, netzweit ausrollen. Dafür gibt es den Skill
  `netzweiter-modul-rollout`.

Die Trennung ist der eigentliche Punkt dieses Abschnitts: **erst prüfen, ob ein
Mangel dieser App gehört oder dem Netz.** Wer einen Kanon-Mangel lokal
repariert, erzeugt eine dritte Modul-Generation und verschiebt das Problem, statt
es zu lösen.

## Was NICHT gemacht wird — und warum

- **Die SBKIM-Module NICHT verkleinern.** Lighthouse schlägt 112 KiB durch
  Minifizierung vor. Das sind **byte-1:1-Kopien aus dem Sage-Kanon**. Wer sie
  hier anfasst, erzeugt eine dritte Modul-Generation, und der Drift-Guard
  schlägt zu Recht an. Reift etwas, wird es **im Kanon** behoben und netzweit
  neu ausgerollt. (Skript-Regel 7.)
- **Den Modul-Stapel NICHT verschieben.** Er steht schon hinter dem sichtbaren
  Inhalt. Am Tomys Werkzeugkasten brachte das Entfernen des **kompletten**
  Stapels dort 0,1 s, und `defer` machte es sogar **schlechter** (98 → 90).
  Erst messen, wo er steht.
- **Das Erlebnis NICHT wegoptimieren.** Die Bildstrecke unter
  `assets/erlebnis/` teilt sich Mein-Tresor mit Jasons-Tresor — und Jasons
  steht mit ihr bei **99**. Sie ist also nicht das Problem. Wer sie anfasst,
  repariert am falschen Ende und nimmt der App ihr Gesicht.

## Fünf Fallen aus der Arbeit vom 2026-08-08

Sie haben an diesem einen Tag jeweils echte Arbeit gekostet.

1. **Die lokale Zahl ist ein Hinweis, PageSpeed ist der Beweis — in beide
   Richtungen.** Dreimal an einem Tag lag die lokale Messung daneben, einmal um
   **23 Punkte**: Mein-Rezeptbuch-Page maß hier 75, draußen 98. Eine geplante
   „nächste Untersuchung" galt einem Problem, das es nur auf der Bau-Maschine
   gab. **Also: nichts als Erfolg melden, was nur lokal gemessen ist — und aus
   einer lokalen Zahl keine Arbeitsliste bauen.**

2. **Zuerst bei der Schwester nachsehen.** An den beiden Landeseiten lagen
   zwei fertige, von Klaus freigegebene Reparaturen bereit — sie waren nur nie
   nachgezogen worden. Das war billiger als jede Analyse. Hier gilt dasselbe:
   **Jasons-Tresor ist die Antwort auf die meisten Fragen.**

3. **Jede plausible Geschichte gegenprüfen.** Vier Ideen wurden an diesem Tag
   gemessen und **verworfen**: Service-Worker-Vorrat kürzen (kostete nichts),
   härtere Bremsschwelle (im Rauschen), Bilder als Hebel (kamen nach 182 ms
   an), Animationen abschalten (kein LCP-Gewinn). Ohne Gegenprobe wäre jede
   davon als „Verbesserung" eingebaut worden.

4. **Das Messwerkzeug kann das Kaputte sein.** Zweimal an einem Tag: eine
   Kontrast-Sonde las `color-mix`-Werte von 0–1 als 0–255, eine andere schnitt
   die Fundstellen nach vier Einträgen ab — und ich meldete daraufhin eine
   falsche Ursache. **Wenn ein Ergebnis überrascht, erst das Werkzeug prüfen.**

5. **Eine Reparatur kann einen neuen Fehler bauen.** Das Entfernen einer
   Deckkraft machte einen Verweis unsichtbar, obwohl Lighthouse 100 gab — die
   Prüfung greift nur bei einem *Farb*-Unterschied. **Nach dem Fix hinsehen,
   nicht nur nachmessen.**

## Datenverträge (nicht brechen)

- Tresor-Umschlag `jason-tresor` v2, `jason-eintrag` / `jason-bibliothek`,
  `jt-vaults` pro Fach, Shamir `JT3v5-…`, Tarnfach als eigener AES-Umschlag.
- Spore/Andock kanonisch (`docs/ANDOCK.md`), 9 Pflichtfelder.
- Der JasonLib-Kern zwischen `// JASONLIB-CORE-START..END` bleibt **byte-gleich**
  (Wurzel `index.html` == Spiegel `jasons-bibliothek/index.html`).

**Die Bild-Arbeit fasst nichts davon an.** Sie berührt Dateien unter `assets/`
und die `<img>`-Verweise. Wer dabei in den Kern gerät, ist falsch abgebogen.

## Akzeptanzkriterien

- `npm test` grün (51 Tests), Kern byte-gleich, Drift-Guard grün.
- Übertragung **unter 4 MB** (heute 12,0), Leistung **über 90** lokal.
- **Vorher/nachher gemessen und beide Zahlen genannt**, auch was nicht besser
  wurde.
- **Alt und neu nebeneinander angesehen**, bevor die alten Dateien weichen.
- Seite geladen und auf **404 im Netzwerk-Protokoll** gesehen — ein Bild, das
  nach dem Umbenennen fehlt, sieht nicht kaputt aus, es ist nur weg.
- Browser-Teile bleiben **„ungeprüft, wartet auf Klaus' Browser-Lauf"**, bis
  Klaus sie gesehen hat. Bei diesem Bau ist sein Blick nicht Formsache: es geht
  um das **Aussehen des Safes**.

## Offene Fragen an Klaus

1. **Wie streng darf gerechnet werden?** WebP mit Güte 0,80 war anderswo nicht
   vom Original zu unterscheiden. Beim Safe geht es um Metall, Reflexe und
   feine Verläufe — dort bandet eine zu harte Stufe eher. Soll die Sitzung
   zwei Güten (0,80 und 0,90) zum Vergleich vorlegen, statt selbst zu
   entscheiden?
2. **Wird `fach.png` (2,1 MB) überhaupt gebraucht?** Es liegt im Repo, wird
   aber beim Laden nicht geholt. Weg, oder mit umrechnen?
3. **Der Briefkasten-Blick beim Seitenstart** (acht Abrufe an
   `raw.githubusercontent.com`): nach hinten verschieben ist unstrittig. Soll
   er zusätzlich **nur auf Knopfdruck** laufen, damit die Seite beim bloßen
   Öffnen gar nicht mit einem fremden Server spricht?

## Abschluss-Befehl

`PULS.md` fortschreiben → neuen Brief schreiben (Pflichtlektüre + diesen
Abschluss-Befehl wiederholen) → Brief als Chat-Codeblock ausgeben →
Commit/Push auf `claude/<scope>` → Draft-PR mit Test-Plan.
Nach dem netzweiten Selbst-Merge-Freibrief (Klaus 2026-06-28) merget die
Sitzung selbst, sobald getestet, abgegrenzt und nicht zweifelhaft — **außer**
Klaus will vorher draufschauen. Bei einer Änderung am **Aussehen des Safes**
ist genau das wahrscheinlich: **erst zeigen, dann mergen.**
