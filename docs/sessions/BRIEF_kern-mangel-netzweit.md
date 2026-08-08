# BRIEF — Was übrig bleibt, gehört dem Netz (nicht dieser App)

Stand: 2026-08-08

## Pflichtlektüre vor der Arbeit (in dieser Reihenfolge)

1. `CLAUDE.md` — Verfassung + Leitplanken.
2. `PULS.md` — aktueller Stand (getan / offen / nächste Schritte), oberster Eintrag.
3. **Dieser Brief** (der neueste in `docs/sessions/BRIEF_*.md`).
4. `status.json` — ehrlicher Real-Anteil.
5. Doku + Code der zugewiesenen Scheibe.

Zusätzlich, weil es wieder um dieses Gewerk geht:
`family-project/.claude/skills/seiten-bauregeln/regeln/` — `messen.md` (Regel 1b:
lokal ist ein Hinweis, PageSpeed der Beweis) und `layout.md`, sowie den Skill
`netzweiter-modul-rollout` für alles, was aus dem Kanon kommt.

## Stand

Die Ladezeit-Arbeit vom 2026-08-08 ist durch. Mein-Tresor ist von der langsamsten
Seite im Netz auf **Handy 80 / Computer 98** gekommen, Übertragung beim Laden von
**15,9 MB auf 0,75 MB**, Barrierefreiheit **84/87 → 95/95** (über der Schwester
Jasons-Tresor mit 92). Einzelheiten und die vollständige Messreihe stehen im
obersten `PULS.md`-Eintrag.

**Alles das ist lokal gemessen.** Der Beweis fehlt noch: ein PageSpeed-Lauf.
Am 2026-08-07 lag eine lokale Messung schon einmal um 23 Punkte daneben.

## Was als Nächstes kommt — in dieser Reihenfolge

### 1 · Klaus' Browser-Lauf abwarten und auswerten (blockiert 2 und 3)

Die Bilder des Safes sind neu gerechnet (WebP, Güte 0,90). Alt und neu wurden in
echter Anzeigegröße nebeneinander angesehen und waren nicht zu unterscheiden — aber
das war ein Bildschirm im Container, nicht Klaus' Tablet.

Sagt Klaus „sieht gut aus": weiter mit 2. Sagt er „körnig / fleckig": die alten PNG
liegen in der Git-Historie (`git show <commit>^:assets/safe/safe-front.png`), einmal
mit Güte 0,95 neu rechnen, Anleitung in `assets/safe/README.md`.

Sagt er „zu groß, mach kleiner": Güte 0,80 spart nochmal 342 KiB, zeigt aber im
3-fach-Zoom Flecken in den dunklen Metall-Verläufen. Das ist eine **Geschmacksfrage,
keine technische** — Klaus entscheidet.

### 2 · Der eine große Mangel, der beiden Tresoren gehört: die drei Auswahlfelder

Lighthouse meldet in **beiden** Tresoren `select-name` mit **Gewicht 10** — der
größte verbliebene Einzelposten der Barrierefreiheit:

```
body > main > div.tools > select#f-cat
body > main > div.tools > select#f-tag
body > main > div.tools > select#f-sort
```

Drei Auswahlfelder ohne Beschriftung. Eine Vorlesehilfe sagt dort „Auswahlfeld" und
sonst nichts.

**Das gehört NICHT hier repariert.** Die drei stehen im **JasonLib-Kern**, und der
ist byte-gleich zu Jasons-Tresor (`sha256 a98a704c…`, siehe `status.json`; `npm test`
schneidet genau diese Bytes und prüft sie). Wer sie hier anfasst, erzeugt eine
zweite Kern-Generation und bricht die Prüfung zu Recht.

**Der Weg ist:** im Kanon **Jasons-Tresor** beheben (ein `aria-label` je Feld
genügt), dort `npm test` grün, dann den Kern **neu herüberkopieren** und hier die
Prüfsumme in `status.json` nachziehen. Der Skill `netzweiter-modul-rollout`
beschreibt genau diese Kette samt der Fallen (Prüfsummen stecken in Test-Dateien
**und** in Drift-Guards, und die pinnen oft mehr, als ein Brief nennt).

Erwartung: beide Tresore von 95 auf **100**. Das ist ein Rollout, keine Reparatur.

### 3 · Ebenfalls Kanon: die Knöpfe des SBKIM-Widgets

Siegel, Minimieren und Schließen im Flying-Widget sind als Berührungsziele zu klein.
Das ist **Modul 17**, byte-1:1 aus dem Sage-Kanon. Gleicher Weg: in Sage-Protokol
beheben, `ZERTIFIKAT_ASPEKTE` um einen Aspekt ergänzen (Datum + Modul-ID + ein Satz,
Pflicht laut Sage-`CLAUDE.md`), netzweit ausrollen. **Hier nicht anfassen.**

### 4 · Klaus' offene Entscheidung: der Briefkasten beim Seitenstart

Der Blick in die Briefkästen der Nachbarn (fünf Abrufe an
`raw.githubusercontent.com`) läuft jetzt **nach** dem Laden statt mittendrin — die
Ladezeit ist damit erledigt. Die zweite Hälfte der Frage ist offen und gehört Klaus:

> Soll die Seite beim bloßen Öffnen überhaupt mit einem fremden Server sprechen —
> oder erst auf Knopfdruck?

Für Fremdnutzer über den family-projekt.de-Marktplatz ist das keine Kleinigkeit: ein
Aufruf der Seite meldet heute stillschweigend eine Verbindung an GitHub. Entweder
benennen (ein Satz im Siegel/Datenschutz) oder auf den 📬-Knopf legen. **Nicht ohne
Klaus entscheiden.**

### 5 · Brief-Kette ausmisten (eigener PR, klein)

In `docs/sessions/` liegen acht Briefe. Nach `CLAUDE.md` § Briefkasten-Hygiene bleiben
`BRIEF_start.md`, der aktuell aktive Brief und `VORLAGE_BRIEF.md`; erledigte Protokolle,
deren Inhalt in `PULS.md` steht, werden gelöscht (die Git-Historie ist das Archiv).

**Vorgehen:** alle lesen → kleine Tabelle (Brief · Art · Status) → **Klaus zeigen** →
erst dann `git rm`. Der SBKIM-Briefkasten (`sbkim/`) wird dabei **nie** angefasst —
das sind lebende Datenverträge.

## Datenverträge (nicht brechen)

- Tresor-Umschlag `jason-tresor` v2, `jason-eintrag` / `jason-bibliothek`,
  `jt-vaults` pro Fach, Shamir `JT3v5-…`, Tarnfach als eigener AES-Umschlag.
- Spore/Andock kanonisch (`docs/ANDOCK.md`), 9 Pflichtfelder.
- Der JasonLib-Kern zwischen `// JASONLIB-CORE-START..END` bleibt **byte-gleich**
  (Wurzel `index.html` == Spiegel `jasons-bibliothek/index.html`). Prüfwert
  `a98a704c…` in `status.json`. **Achtung beim Nachrechnen:** dieser Wert schneidet
  Marker **plus Zeilenumbruch** (18.018 Bytes). Wer nur bis zum Marker schneidet,
  bekommt `30b0069d…` und hält die Doku fälschlich für veraltet — genau das ist am
  2026-08-08 passiert.

## Akzeptanzkriterien

- `npm test` grün (53 Proben), Kern byte-gleich, Spiegel gleichgezogen.
- Bei jeder Bild-Arbeit: vorher/nachher gemessen, **beide Zahlen genannt**, auch was
  nicht besser wurde — und alt/neu **angesehen**, nicht nur nachgemessen.
- Seite geladen und auf **404 im Netzwerk-Protokoll** gesehen.
- Browser-Teile bleiben **„ungeprüft, wartet auf Klaus' Browser-Lauf"**, bis Klaus
  sie gesehen hat.

## Sechs Fallen, die an einem Tag echte Arbeit gekostet haben

Die fünf aus dem Vorgänger-Brief gelten weiter — sie haben sich in dieser Sitzung
**alle** wieder bewährt. Eine sechste ist dazugekommen.

1. **Die lokale Zahl ist ein Hinweis, PageSpeed ist der Beweis.** In beide Richtungen.
2. **Zuerst bei der Schwester nachsehen.** Der ganze Fund dieser Sitzung kam aus der
   Frage „warum ist Jasons mit denselben Bildern schnell?" — Antwort: dort werden sie
   **gezeigt**, hier nicht.
3. **Jede plausible Geschichte gegenprüfen.** Der Brief nannte die vier Safe-Bilder als
   Ursache. Sie waren 70 % der Bytes — und trotzdem nur die halbe Wahrheit: nach ihrer
   Umrechnung stand die Ladezeit am Handy immer noch bei 12,6 s. Erst das ausgeblendete
   Erlebnis brachte sie auf 5,4 s. **Der genannte Verdächtige kann echt sein und
   trotzdem nicht allein schuld.**
4. **Das Messwerkzeug kann das Kaputte sein.** In dieser Sitzung wieder: ein selbst
   geschriebener Byte-Zähler las `content-length` aus Antworten, die keins trugen, und
   meldete „0,00 MB". Wenn ein Ergebnis überrascht, erst das Werkzeug prüfen.
5. **Eine Reparatur kann einen neuen Fehler bauen.** Auch das wieder: ein eingefügter
   Erklär-Absatz endete außerhalb seines Kommentars, freier Text stand im `<head>`.
   Gefunden nur, weil der eigene Diff am Ende noch einmal gelesen wurde. **Lies deinen
   eigenen Diff, bevor du committest.**
6. **NEU — ausgeblendet heißt nicht ungeholt.** `display:none` verhindert das
   Anzeigen, nicht das Laden. Ein `<img>` in einem ausgeblendeten Behälter wird
   normal heruntergeladen; erst `loading="lazy"` verhindert es (weil das Bild dem
   Sichtfeld nie nahe kommt). Wer eine geerbte Schale „nur ausblendet", schleppt ihre
   Bilder weiter mit — hier waren das 6 MB bei jedem Aufruf. **Bei jeder geerbten,
   ausgeblendeten Schicht ins Netzwerk-Protokoll sehen, nicht auf den Bildschirm.**

## Abschluss-Befehl

`PULS.md` fortschreiben → neuen Brief schreiben (Pflichtlektüre + diesen
Abschluss-Befehl wiederholen) → Brief als Chat-Codeblock ausgeben →
Commit/Push auf `claude/<scope>` → Draft-PR mit Test-Plan.
Nach dem netzweiten Selbst-Merge-Freibrief (Klaus 2026-06-28) merget die Sitzung
selbst, sobald getestet, abgegrenzt und nicht zweifelhaft — **außer** Klaus will
vorher draufschauen. Bei einer Änderung am **Aussehen** ist genau das wahrscheinlich:
**erst zeigen, dann mergen.**
