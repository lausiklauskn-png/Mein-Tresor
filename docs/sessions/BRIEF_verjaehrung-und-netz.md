# BRIEF — Was das Netz jetzt erbt

Stand: 2026-08-08 (Fassung 3 — löst `BRIEF_beweis-und-entscheidungen.md` ab)

## Pflichtlektüre vor der Arbeit (in dieser Reihenfolge)

1. `CLAUDE.md` — Verfassung + Leitplanken.
2. `PULS.md` — aktueller Stand (getan / offen / nächste Schritte), oberster Eintrag.
3. **Dieser Brief** (der neueste in `docs/sessions/BRIEF_*.md`).
4. `status.json` — ehrlicher Real-Anteil.
5. Doku + Code der zugewiesenen Scheibe. Bei Bild-Arbeit **zwingend**
   `assets/safe/README.md` — dort steht die `srcset`-Regel und die preload-Falle.

Weil es weiter um dasselbe Gewerk geht, zusätzlich:
`family-project/.claude/skills/seiten-bauregeln/regeln/` — `messen.md` (Regel 1b und **Regel 2**)
und `bilder.md`. Für Netz-Arbeit die Regel selbst:
`Sage-Protokol/docs/INTERFACES.md` **§11.6.1 „Postfach-Verjährung"**.

## Stand

Klaus hat drei Entscheidungen getroffen, alle drei sind umgesetzt und gemergt.

**1 · Brief-Kette ausgemistet.** Acht Briefe gelöscht, vier bleiben (`BRIEF_start.md` ·
`VORLAGE_BRIEF.md` · dieser · `BRIEF_briefkasten-bauplan.md` als Lebend-Doku). Korrektur an
der alten Tabelle: `BEFEHL_briefkasten-rezeptbuch-mixarium.md` war **erfüllt** — beide
Schwester-Apps tragen SIGNAL, Postfach, Wächter und Briefkasten. Der tote „Aktiver
Übergabe-Brief"-Zeiger ganz unten in `PULS.md` ist ersetzt.

**2 · Der Briefkasten-Umbau ist bei Jasons-Tresor angekommen** (PR #150, gemergt). Dort lief
der stille Blick sogar bei `DOMContentLoaded` — mitten im Seitenaufbau. Gemessen: **5 → 0**
Fremd-Abrufe beim Öffnen, 5 nach Druck auf 📬, Badge aus dem Merker bei 0 Abrufen.
`npm test` 59/59, Wurzel == Spiegel.

**3 · Die Postfach-Verjährung ist bei Sage angekommen** (PR #791, gemergt).
`AUSTAUSCH.md` 653 → 204, `AUSTAUSCH-BookLedgerPro.md` 438 → 120.

**Dazu die Gegenmessung**, lokal, alt gegen neu, je drei Läufe:

| | Handy | LCP | Gute Praxis |
|---|---|---|---|
| alt (`1d289ea`, PageSpeed hatte **83**) | 80 · 68 · 80 | 5,4 · 5,3 · 5,4 s | 92 |
| neu (`origin/main`) | 80 · 88 · 87 | 4,1 · **3,9 · 3,9** s | **100** |

Computer 99 · 99 · 99. **Die Gesamtnote ist hier zu verrauscht, um etwas zu beweisen** — der
belastbare Wert ist **LCP 5,4 → 3,9 s**, stabil über alle sechs Läufe.

## Was als Nächstes kommt — in dieser Reihenfolge

### 1 · Zwei Dinge kann nur Klaus (beide blockieren nichts anderes)

- **PageSpeed am Handy**, an der Live-Seite. Erwartung: über 83. **Weicht der Lauf ab, gilt
  die Zahl, nicht die Erwartung** — und falls er sich gar nicht bewegt, fängt die nächste
  Sitzung bei dieser Frage an, nicht bei einer neuen Optimierung.
- **Jasons-Tresor im Browser ansehen.** Der erste Besuch zeigt **kein** Badge, bis einmal
  📬 gedrückt wurde. Das ist so gewollt — aber ob es sich richtig anfühlt, sieht nur er.

### 2 · Verjährung bei den übrigen Knoten

Das Muster steht jetzt zweimal vor (Mein-Tresor, Sage). Was noch liegt:

| Postfach | Zeilen |
|---|---|
| `BookLedgerPro/sbkim/AUSTAUSCH-Sage.md` | **630** |
| `SB-KIMTool-Point/sbkim/AUSTAUSCH.md` | 573 |
| `SB-KIMTool-Point/sbkim/AUSTAUSCH-MeinTresor.md` | 471 |
| `Jasons-Tresor/sbkim/AUSTAUSCH-MeinTresor.md` | 362 |

**Jeder Knoten räumt nur im eigenen Postfach** — nie im Depot der Gegenstelle. Drei
Bedingungen aus der Regel gelten immer: der Endstand steht danach da · es wird hingeschrieben,
dass gekürzt wurde · nichts geht verloren (Git-Historie).

**Und der Teil, der wirklich zählt:** beim Kürzen wird **nachgeprüft**, nicht umgeschichtet.
In Sage kam dabei heraus, dass Sage BookLedgerPro seit dem 2026-06-21 eigene
`capVector`/`needsVector` schuldet — die committete Spore trägt bis heute keine. Das stand als
Nebensatz in zwei Briefen und wäre beim bloßen Kürzen verschwunden. Wer verjährt, prüft jede
Zusage gegen den echten Stand.

### 3 · Briefkasten-Umbau bei den übrigen Knoten — erst nach Klaus' Blick

Betroffen sind SB·KIMTool·Point, Sage, BookLedgerPro und die zwei Rezept-Apps. Überall
dieselbe Rechnung: Sekunden im kritischen Pfad **und** eine stille Verbindung zu GitHub beim
bloßen Öffnen. Die Vorlage liegt zweimal (Mein-Tresor, Jasons-Tresor).

**Vor jedem weiteren Rollout Klaus fragen** — es ändert sichtbares Verhalten. Und: **zuerst
alle Aufrufer suchen.** In Mein-Tresor lösten *zwei* Stellen denselben stillen Blick aus
(Kopfzeile und Raum-Leiste), darum zehn statt fünf Abrufe.

### 4 · Zwei Entscheidungen sind gefallen — nicht neu aufrollen

- **Briefkasten erst auf Knopfdruck.** Gebaut, in zwei Repos.
- **Die 20 SBKIM-Module bleiben beim Start geladen.** Später laden spart 245 KiB, kostet die
  sofort sichtbare Lampen-Leiste. Erst nach Klaus' Gegenmessung wieder aufgreifen, und nur,
  wenn die Zahl es verlangt.

### 5 · Nebenbefund, der jemandem gehört

`Sage-Protokol/docs/PULS.md` steht bei **8405 Zeilen**; die Schutz-Klausel im Kopf nennt 3000
und sagt „auslagern statt kürzen". Nicht neu, aber bisher unbenannt. Eine eigene
Auslagerungs-Sitzung nach `docs/sessions/archiv/` wäre fällig — **nicht** nebenbei, das wäre
genau das falsche Aufräumen, vor dem die Regel warnt.

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
- **localStorage-Schlüssel app-spezifisch** (`…_meintresor`, in Jasons-Tresor
  `…_jasonstresor`): auf der geteilten github.io-Adresse liegen die Geschwister-Apps im
  selben Speicher.
- **SBKIM-Briefkasten:** `SIGNAL.json`, `spore.json`, `*_inbox.json`, `*.verify.md` werden
  **nie** angefasst. Auch nicht beim Verjähren.

## Akzeptanzkriterien

- `npm test` grün (53 Proben hier, 59 im Kanon), Kern byte-gleich, Spiegel gleichgezogen.
- Jede Zahl **vorher und nachher** genannt, auch was nicht besser wurde.
- Seite geladen und auf **404 im Netzwerk-Protokoll** gesehen.
- Bei Bild-Arbeit: alt und neu in **echter Anzeigegröße angesehen**, nicht nur nachgemessen.
- Browser-Teile bleiben **„ungeprüft, wartet auf Klaus' Browser-Lauf"**, bis er sie sah.

## Offene Fragen an Klaus

1. Was sagt der PageSpeed-Lauf am Handy?
2. Fühlt sich das Briefkasten-Badge in Jasons-Tresor richtig an (erster Besuch ohne Zahl)?
3. Soll der Briefkasten-Umbau zu den übrigen Knoten — und in welcher Reihenfolge?

## Neun Fallen, die echte Arbeit gekostet haben

Die acht aus der letzten Fassung gelten weiter. Eine neunte ist dazugekommen.

1. **Die lokale Zahl ist ein Hinweis, PageSpeed ist der Beweis.** In beide Richtungen.
2. **Zuerst bei der Schwester nachsehen.**
3. **Jede plausible Geschichte gegenprüfen.** Der genannte Verdächtige kann echt sein und
   trotzdem nicht allein schuld.
4. **Das Messwerkzeug kann das Kaputte sein.** Diesmal am eigenen Leib: das Zählen der
   Fremd-Abrufe meldete mit einem 6-Sekunden-Fenster **einen** statt fünf, weil die Abrufe
   nacheinander laufen und hinter dem Proxy je zwölf Sekunden dauern. Ein zu kurzes Fenster
   hätte den Befund kleingerechnet und die ganze Änderung als unnötig erscheinen lassen.
5. **Eine Reparatur kann einen neuen Fehler bauen.** Lies deinen eigenen Diff.
6. **Ausgeblendet heißt nicht ungeholt.** `display:none` verhindert das Anzeigen, nicht das
   Laden.
7. **Auch der Brief ist nur eine Behauptung** — dieser hier ebenso.
8. **Was PageSpeed vorschlägt, darf die Verfassung verbieten.** Minifizieren (112 KiB) bricht
   die byte-1:1-Regel der SBKIM-Kanon-Kopien. Prüfe jeden Vorschlag gegen die Leitplanken —
   und schreibe hin, warum du ihn nicht umgesetzt hast, sonst schlägt ihn der nächste Bericht
   wieder vor und jemand tut es doch.
9. **Eine einzelne Punktzahl beweist nichts, wenn sie schwankt.** Der alte Stand maß 80 · 68 ·
   80, der neue 80 · 88 · 87 — wer je einen Lauf nimmt, kann daraus „schlechter geworden"
   **oder** „viel besser" lesen. Erst die Kennzahl darunter war eindeutig: LCP 5,4 → 3,9 s in
   allen sechs Läufen. **Miss abwechselnd, nenne die Einzelwerte, und such die Kennzahl, die
   nicht wackelt.**

## Abschluss-Befehl

`PULS.md` fortschreiben → neuen Brief schreiben (Pflichtlektüre + diesen Abschluss-Befehl
wiederholen) → Brief als Chat-Codeblock ausgeben → Commit/Push auf `claude/<scope>` →
Draft-PR mit Test-Plan → **Briefkasten-Hygiene anwenden** (erledigte Protokolle raus, der
SBKIM-Briefkasten bleibt).
Nach dem netzweiten Selbst-Merge-Freibrief (Klaus 2026-06-28) merget die Sitzung selbst,
sobald getestet, abgegrenzt und nicht zweifelhaft. **Bei einer Änderung am Aussehen gilt
seit 2026-08-08 die Umkehrung:** Klaus prüft auf der **live deployten** Seite, also **erst
mergen, dann zeigen** — sonst kann er gar nicht hinsehen.
