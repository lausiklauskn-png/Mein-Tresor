# BRIEF — Der Beweis ist da. Was jetzt noch offen ist.

Stand: 2026-08-08 (Fassung 2 — die erste Fassung von heute ist überholt, siehe `PULS.md`)

## Pflichtlektüre vor der Arbeit (in dieser Reihenfolge)

1. `CLAUDE.md` — Verfassung + Leitplanken.
2. `PULS.md` — aktueller Stand (getan / offen / nächste Schritte), oberster Eintrag.
3. **Dieser Brief** (der neueste in `docs/sessions/BRIEF_*.md`).
4. `status.json` — ehrlicher Real-Anteil.
5. Doku + Code der zugewiesenen Scheibe. Bei Bild-Arbeit **zwingend**
   `assets/safe/README.md` — dort steht die `srcset`-Regel und die preload-Falle.

Weil es wieder um dasselbe Gewerk geht, zusätzlich:
`family-project/.claude/skills/seiten-bauregeln/regeln/` — `messen.md` (Regel 1b) und
`bilder.md`. Für alles aus dem Kanon der Skill `netzweiter-modul-rollout`.

## Stand

**Der Beweis, der drei Briefe lang gefehlt hat, ist erbracht.** Klaus' PageSpeed-Lauf am
Live-Stand, 2026-08-08 23:09:

| | Handy | Computer |
|---|---|---|
| Leistung | 83 | 99 |
| Barrierefreiheit | **100** | **100** |
| Best Practices · SEO | 100 · 100 | 100 · 100 |

Barrierefreiheit **84/87 → 100/100**. Danach hat Klaus die Diagnose-Listen durchgereicht,
und daraus sind zwei weitere Bauten entstanden (PR #93 Bilder, PR #94 Briefkasten). Alles
gemergt, alles gemessen — Einzelheiten im obersten `PULS.md`-Eintrag.

**Was den Handy-Wert noch drückte**, war nicht das, wonach es aussah: nicht die Bilder,
sondern **zehn Abrufe an `raw.githubusercontent.com`** beim bloßen Öffnen der Seite, bis zu
4 s im kritischen Pfad. Die sind jetzt weg (erst auf Knopfdruck).

**Danach kamen noch zwei Dinge dazu** (siehe `PULS.md`): die **Postfach-Verjährung** — reine
Quittungen im Briefkasten verjähren nach 30 Tagen zu einem Ergebnis-Block, netzweit als
`Sage INTERFACES §11.6.1` — und der **Zeichensatz** steht jetzt bei Byte 939 statt 1455.

## Was als Nächstes kommt — in dieser Reihenfolge

### 1 · Neu messen (Klaus, ein Klick)

Nach PR #93 + #94 fehlt die Gegenmessung. Erwartung am Handy **deutlich über 83** — die
zwei größten Posten des Berichts sind weg. Der Computer stand schon bei 99.

**Weicht der Lauf ab: die Zahl gilt, nicht die Erwartung.** Vor allem, falls der Handy-Wert
sich **nicht** bewegt: dann steckt die Bremse woanders, und die nächste Sitzung fängt bei
der Frage an, nicht bei einer neuen Optimierung.

### 2 · Zwei Entscheidungen von Klaus sind gefallen — nicht neu aufrollen

- **Briefkasten erst auf Knopfdruck.** Gebaut. Wer das rückgängig machen will, braucht
  Klaus' Wort: es geht nicht nur um Sekunden, sondern darum, dass ein Seitenaufruf keine
  stille Verbindung zu GitHub mehr meldet (Fremdnutzer-Brille, Marktplatz).
- **Die 20 SBKIM-Module bleiben beim Start geladen.** Später laden spart 245 KiB, kostet
  aber die sofort sichtbare Lampen-Leiste. Bei 83/99 kein guter Tausch. **Erst nach der
  Gegenmessung (Schritt 1) wieder aufgreifen — und nur, wenn die Zahl es verlangt.**

### 3 · Brief-Kette ausmisten (eigener PR, klein) — Tabelle liegt vor, Klaus entscheidet

Unverändert offen. Nach `CLAUDE.md` § Briefkasten-Hygiene bleiben `BRIEF_start.md`, der
aktive Brief und `VORLAGE_BRIEF.md`.

| Brief | Art | Vorschlag |
|---|---|---|
| `BRIEF_start.md` | Gründung | **bleibt** |
| `VORLAGE_BRIEF.md` | Vorlage | **bleibt** |
| `BRIEF_beweis-und-entscheidungen.md` | aktiv (dieser) | **bleibt** |
| `BRIEF_kern-mangel-netzweit.md` | erledigt/korrigiert | löschen |
| `BRIEF_ladezeit-safe-bilder.md` | erledigt (#91 gemergt) | löschen |
| `BRIEF_briefkasten-bauplan.md` | Lebend-Doku, in `AUSTAUSCH` §4 verlinkt | **bleibt** |
| `BRIEF_4-knoten-sync.md` | erledigt | löschen |
| `BRIEF_briefkasten-vollverbund.md` | erledigt | löschen |
| `BRIEF_briefkasten-runde-identitaet.md` | erledigt | löschen |
| `BRIEF_sbkim-netz-und-feinschliff.md` | erledigt | löschen |
| `BRIEF_waechter-auto-issue.md` | erledigt | löschen |
| `BEFEHL_briefkasten-rezeptbuch-mixarium.md` | Auftrag an andere Repos | prüfen, sonst **bleibt** |

**Vor dem `git rm`:** Querverweise greppen, Tabelle Klaus zeigen. Der SBKIM-Briefkasten
(`sbkim/`) wird **nie** angefasst — lebende Datenverträge.

### 4 · Die Postfach-Verjährung ins Netz tragen (Klaus fragen, bevor gebaut wird)

Die Regel steht im Kanon (`Sage INTERFACES §11.6.1`) und ist in Mein-Tresor angewendet
(105→75, 91→50, 251→179 Zeilen). **Angewendet hat sie sonst noch niemand** — und dort liegt
die eigentliche Last:

| Postfach | Zeilen |
|---|---|
| `Sage-Protokol/sbkim/AUSTAUSCH.md` | **653** |
| `SB-KIMTool-Point/sbkim/AUSTAUSCH.md` | 573 |
| `SB-KIMTool-Point/sbkim/AUSTAUSCH-MeinTresor.md` | 471 |
| `Sage-Protokol/sbkim/AUSTAUSCH-BookLedgerPro.md` | 438 |

**Jeder Knoten räumt nur im eigenen Postfach** — nie im Depot der Gegenstelle. Drei
Bedingungen aus der Regel gelten immer: Endstand steht danach da · es wird hingeschrieben,
dass gekürzt wurde · nichts geht verloren (Git-Historie).

### 5 · Was das Netz erben sollte

Zwei Funde dieser Runde betreffen **nicht nur Mein-Tresor**:

- **Der Briefkasten-Blick beim Seitenstart** steckt in jedem Knoten mit Postfach
  (Jasons-Tresor, SB-KIMTool-Point, Sage, BookLedgerPro …). Überall dieselbe Rechnung:
  Sekunden im kritischen Pfad **und** eine stille Fremd-Verbindung beim bloßen Öffnen.
  Der hiesige Umbau (Badge aus dem gemerkten Stand, Abruf erst auf Knopfdruck) ist die
  Vorlage. **Vor dem Rollout Klaus fragen** — es ändert sichtbares Verhalten.
- **Zwei Stellen lösten denselben stillen Blick aus** (Kopfzeile + Raum-Leiste), darum
  zehn statt fünf Abrufe. Wer den Umbau woanders macht, sucht zuerst **alle** Aufrufer.

## Datenverträge (nicht brechen)

- Tresor-Umschlag `jason-tresor` v2, `jason-eintrag` / `jason-bibliothek`, `jt-vaults` pro
  Fach, Shamir `JT3v5-…`, Tarnfach als eigener AES-Umschlag.
- Spore/Andock kanonisch (`docs/ANDOCK.md`), 9 Pflichtfelder.
- JasonLib-Kern zwischen `// JASONLIB-CORE-START..END` **byte-gleich**, Wurzel == Spiegel.
  Prüfwert `a98a704c…`. **Beim Nachrechnen:** Marker **plus Zeilenumbruch** (18.025 Bytes).
  Nur bis zum Marker geschnitten ergibt `30b0069d…` — dann hält man die Doku fälschlich
  für veraltet.
- **Die drei Auswahlfelder liegen außerhalb des Kerns** (HTML ~595, Kern ab 802). Trotzdem
  immer zuerst im Kanon Jasons-Tresor ändern und byte-gleich kopieren.
- **localStorage-Schlüssel app-spezifisch** (`…_meintresor`): auf der geteilten
  github.io-Adresse liegen die Geschwister-Apps im selben Speicher.

## Akzeptanzkriterien

- `npm test` grün (53 Proben hier, 59 im Kanon), Kern byte-gleich, Spiegel gleichgezogen.
- Jede Zahl **vorher und nachher** genannt, auch was nicht besser wurde.
- Seite geladen und auf **404 im Netzwerk-Protokoll** gesehen.
- Bei Bild-Arbeit: alt und neu in **echter Anzeigegröße angesehen**, nicht nur nachgemessen.
- Browser-Teile bleiben **„ungeprüft, wartet auf Klaus' Browser-Lauf"**, bis er sie sah.

## Offene Fragen an Klaus

1. Was sagt der neue PageSpeed-Lauf am Handy?
2. Brief-Kette ausmisten wie in der Tabelle?
3. Soll der Briefkasten-Umbau ins Netz (Jasons-Tresor zuerst)?

## Acht Fallen, die echte Arbeit gekostet haben

Die sieben aus der ersten Fassung gelten weiter. Eine achte ist dazugekommen.

1. **Die lokale Zahl ist ein Hinweis, PageSpeed ist der Beweis.** In beide Richtungen —
   diesmal war lokal **zu pessimistisch** (80/98 gegen 83/99). Das entlastet die Regel nicht.
2. **Zuerst bei der Schwester nachsehen.**
3. **Jede plausible Geschichte gegenprüfen.** Der genannte Verdächtige kann echt sein und
   trotzdem nicht allein schuld.
4. **Das Messwerkzeug kann das Kaputte sein.** Wieder passiert: ein Vergleichsbild zeigte
   nur kaputte Bild-Symbole, weil der Prüfserver ein anderes Verzeichnis auslieferte als
   angenommen. Wer da „sieht gleich aus" gemeldet hätte, hätte zwei leere Rahmen verglichen.
5. **Eine Reparatur kann einen neuen Fehler bauen.** Lies deinen eigenen Diff.
6. **Ausgeblendet heißt nicht ungeholt.** `display:none` verhindert das Anzeigen, nicht das
   Laden.
7. **Auch der Brief ist nur eine Behauptung** — dieser hier ebenso.
8. **NEU — was PageSpeed vorschlägt, darf die Verfassung verbieten.** Der Bericht empfahl,
   112 KiB durch Minifizieren von JavaScript zu sparen. Das ist hier **untersagt**: die
   SBKIM-Module sind byte-genaue Kanon-Kopien, ein Prüfwert wacht darüber. Ein Werkzeug
   kennt die Hausregeln nicht. **Prüfe jeden Vorschlag gegen die Leitplanken, bevor du ihn
   umsetzt** — und schreibe hin, warum du ihn nicht umgesetzt hast, sonst schlägt ihn der
   nächste Bericht wieder vor und jemand tut es doch.

## Abschluss-Befehl

`PULS.md` fortschreiben → neuen Brief schreiben (Pflichtlektüre + diesen Abschluss-Befehl
wiederholen) → Brief als Chat-Codeblock ausgeben → Commit/Push auf `claude/<scope>` →
Draft-PR mit Test-Plan.
Nach dem netzweiten Selbst-Merge-Freibrief (Klaus 2026-06-28) merget die Sitzung selbst,
sobald getestet, abgegrenzt und nicht zweifelhaft. **Bei einer Änderung am Aussehen gilt
seit 2026-08-08 die Umkehrung:** Klaus prüft auf der **live deployten** Seite, also **erst
mergen, dann zeigen** — sonst kann er gar nicht hinsehen.
