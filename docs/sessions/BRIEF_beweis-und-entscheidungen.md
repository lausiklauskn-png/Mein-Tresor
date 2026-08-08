# BRIEF — Der Beweis fehlt noch, und drei Sachen gehören Klaus

Stand: 2026-08-08

## Pflichtlektüre vor der Arbeit (in dieser Reihenfolge)

1. `CLAUDE.md` — Verfassung + Leitplanken.
2. `PULS.md` — aktueller Stand (getan / offen / nächste Schritte), oberster Eintrag.
3. **Dieser Brief** (der neueste in `docs/sessions/BRIEF_*.md`).
4. `status.json` — ehrlicher Real-Anteil.
5. Doku + Code der zugewiesenen Scheibe.

Weil es wieder um dasselbe Gewerk geht, zusätzlich:
`family-project/.claude/skills/seiten-bauregeln/regeln/` — `messen.md` (Regel 1b: lokal ist
ein Hinweis, PageSpeed der Beweis) und `layout.md`. Für alles aus dem Kanon der Skill
`netzweiter-modul-rollout`.

## Stand

Zwei Arbeiten liegen fertig, aber **keine ist bewiesen**, weil beide auf Klaus warten:

- **PR #91** (offen, Entwurf): Ladezeit. Safe-Bilder nach WebP, das geerbte, ausgeblendete
  Erlebnis wird nicht mehr mitgeladen. Lokal Handy 80 / Computer 98, Übertragung 15,9 MB →
  0,75 MB. **Wartet auf Klaus' Blick auf die Bilder.**
- **Gemergt (dieser Zweig):** die drei Auswahlfelder der Freien Liste haben einen Namen —
  im Kanon Jasons-Tresor (PR #148) und hier byte-gleich. Gemessen im echten
  Zugänglichkeits-Baum: vorher dreimal `(LEER)`, nachher benannt. `npm test` 59/59 bzw.
  53/53, kein 404, Kern-Prüfsumme `a98a704c…` unberührt.

**Zwei Punkte des Vorgänger-Briefs haben sich beim Nachmessen erledigt bzw. korrigiert** —
siehe `PULS.md`, Eintrag 2026-08-08 (2). Kurz: die Auswahlfelder standen nie im JasonLib-Kern,
und die Widget-Knöpfe sind längst über der 24-px-Norm (Kanon-Rollout #88/#89). Wer das
nachrechnen will, misst mit `Accessibility.getFullAXTree` und `getBoundingClientRect` —
nicht mit dem Auge über dem Quelltext.

## Was als Nächstes kommt — in dieser Reihenfolge

### 1 · Der fehlende Beweis: ein PageSpeed-Lauf für beide Tresore

Alles, was seit dem 2026-08-08 an Ladezeit und Barrierefreiheit gemessen wurde, ist **lokal**
gemessen. Am 2026-08-07 lag eine lokale Messung schon einmal um 23 Punkte daneben.

Erwartung nach dem Merge von PR #91 und dieser Runde:
Barrierefreiheit **95 → 100** in beiden Tresoren, Ladezeit Mein-Tresor Handy ~80.

Weicht der Lauf ab: **die Zahl gilt, nicht die Erwartung.** Dann ehrlich beide nennen und
der Abweichung nachgehen, bevor irgendetwas als „grün" gemeldet wird.

### 2 · Klaus' Blick auf die Safe-Bilder → dann PR #91 mergen

Alt und neu wurden in echter Anzeigegröße nebeneinander angesehen und waren nicht zu
unterscheiden — aber das war ein Bildschirm im Container, nicht Klaus' Tablet.

- „sieht gut aus" → mergen.
- „körnig / fleckig" → die alten PNG liegen in der Git-Historie
  (`git show <commit>^:assets/safe/safe-front.png`), einmal mit Güte 0,95 neu rechnen,
  Anleitung in `assets/safe/README.md`.
- „zu groß" → Güte 0,80 spart nochmal 342 KiB, zeigt aber im 3-fach-Zoom Flecken in den
  dunklen Metall-Verläufen. Geschmacksfrage, keine technische — Klaus entscheidet.

**Gemessen:** dieser Zweig und #91 vertragen sich in `index.html` ohne Konflikt. In `PULS.md`
überschneiden sie sich an einer Stelle; wer #91 aufmacht, löst das in einem Griff.

### 3 · Klaus' offene Entscheidung: der Briefkasten beim Seitenstart

Der Blick in die Briefkästen der Nachbarn (fünf Abrufe an `raw.githubusercontent.com`) läuft
seit #91 **nach** dem Laden statt mittendrin — die Ladezeit ist damit erledigt. Die zweite
Hälfte der Frage ist offen und gehört Klaus:

> Soll die Seite beim bloßen Öffnen überhaupt mit einem fremden Server sprechen — oder erst
> auf Knopfdruck?

Für Fremdnutzer über den family-projekt.de-Marktplatz ist das keine Kleinigkeit: ein Aufruf
der Seite meldet heute stillschweigend eine Verbindung an GitHub. Entweder benennen (ein Satz
im Siegel/Datenschutz) oder auf den 📬-Knopf legen. **Nicht ohne Klaus entscheiden.**

### 4 · Brief-Kette ausmisten (eigener PR, klein) — Tabelle liegt vor, Klaus entscheidet

Nach `CLAUDE.md` § Briefkasten-Hygiene bleiben `BRIEF_start.md`, der aktuell aktive Brief und
`VORLAGE_BRIEF.md`. Die Bestandsaufnahme ist gemacht:

| Brief | Art | Vorschlag |
|---|---|---|
| `BRIEF_start.md` | Gründung | **bleibt** (Verfassung verweist darauf) |
| `VORLAGE_BRIEF.md` | Vorlage | **bleibt** |
| `BRIEF_beweis-und-entscheidungen.md` | aktiv (dieser) | **bleibt** |
| `BRIEF_kern-mangel-netzweit.md` | erledigt/korrigiert, Inhalt in `PULS.md` | löschen |
| `BRIEF_ladezeit-safe-bilder.md` | erledigt (PR #91), Inhalt in `PULS.md` | löschen, **erst nach Merge von #91** |
| `BRIEF_briefkasten-bauplan.md` | Lebend-Doku, in `AUSTAUSCH` §4 verlinkt | **bleibt** |
| `BRIEF_4-knoten-sync.md` | erledigt, Inhalt in `PULS.md` | löschen |
| `BRIEF_briefkasten-vollverbund.md` | erledigt, Inhalt in `PULS.md` | löschen |
| `BRIEF_briefkasten-runde-identitaet.md` | erledigt (Identität steht seit 2026-06-06) | löschen |
| `BRIEF_sbkim-netz-und-feinschliff.md` | erledigt, Inhalt in `PULS.md` | löschen |
| `BRIEF_waechter-auto-issue.md` | erledigt (Wächter läuft) | löschen |
| `BEFEHL_briefkasten-rezeptbuch-mixarium.md` | Auftrag an andere Repos | prüfen: ausgeführt? sonst **bleibt** |

**Vor dem `git rm`:** Querverweise greppen (`grep -rn "BRIEF_" --include="*.md" .`) und die
Tabelle Klaus zeigen. Der SBKIM-Briefkasten (`sbkim/`) wird dabei **nie** angefasst — das
sind lebende Datenverträge.

## Datenverträge (nicht brechen)

- Tresor-Umschlag `jason-tresor` v2, `jason-eintrag` / `jason-bibliothek`, `jt-vaults` pro
  Fach, Shamir `JT3v5-…`, Tarnfach als eigener AES-Umschlag.
- Spore/Andock kanonisch (`docs/ANDOCK.md`), 9 Pflichtfelder.
- Der JasonLib-Kern zwischen `// JASONLIB-CORE-START..END` bleibt **byte-gleich** (Wurzel
  `index.html` == Spiegel `jasons-bibliothek/index.html`). Prüfwert `a98a704c…` in
  `status.json`. **Beim Nachrechnen:** der Wert schneidet Marker **plus Zeilenumbruch**
  (18.025 Bytes — der Vorgänger-Brief nannte 18.018, das war zu wenig). Wer nur bis zum
  Marker schneidet, bekommt `30b0069d…` und hält die Doku fälschlich für veraltet.
- **Die drei Auswahlfelder liegen außerhalb des Kerns** (HTML bei Zeile 595–597, Kern ab
  802). Sie trotzdem immer im Kanon Jasons-Tresor zuerst ändern und byte-gleich kopieren —
  die Schale ist geteilt.

## Akzeptanzkriterien

- `npm test` grün (53 Proben hier, 59 im Kanon), Kern byte-gleich, Spiegel gleichgezogen.
- Jede Zahl **vorher und nachher** genannt, auch was nicht besser wurde.
- Seite geladen und auf **404 im Netzwerk-Protokoll** gesehen.
- Browser-Teile bleiben **„ungeprüft, wartet auf Klaus' Browser-Lauf"**, bis Klaus sie
  gesehen hat.

## Reihenfolge

1 (PageSpeed) läuft erst sinnvoll **nach** 2 (Merge #91). 3 und 4 sind unabhängig, brauchen
aber beide Klaus' Wort, bevor gehandelt wird.

## Offene Fragen an Klaus

1. Sehen die neu gerechneten Safe-Bilder am Tablet gut aus? (blockiert #91)
2. Briefkasten beim Seitenstart: benennen oder auf den Knopf legen?
3. Brief-Kette ausmisten wie in der Tabelle vorgeschlagen?

## Sieben Fallen, die echte Arbeit gekostet haben

Die sechs aus dem Vorgänger-Brief gelten weiter. Eine siebte ist dazugekommen.

1. **Die lokale Zahl ist ein Hinweis, PageSpeed ist der Beweis.** In beide Richtungen.
2. **Zuerst bei der Schwester nachsehen.**
3. **Jede plausible Geschichte gegenprüfen.** Der genannte Verdächtige kann echt sein und
   trotzdem nicht allein schuld.
4. **Das Messwerkzeug kann das Kaputte sein.** Wenn ein Ergebnis überrascht, erst das
   Werkzeug prüfen.
5. **Eine Reparatur kann einen neuen Fehler bauen.** Lies deinen eigenen Diff, bevor du
   committest.
6. **Ausgeblendet heißt nicht ungeholt.** `display:none` verhindert das Anzeigen, nicht das
   Laden. Bei jeder geerbten, ausgeblendeten Schicht ins Netzwerk-Protokoll sehen.
7. **NEU — auch der Brief ist nur eine Behauptung.** Dieser Brief hier ebenso. Der
   Vorgänger nannte zwei Dinge, die beim Nachmessen anders lagen: die Auswahlfelder standen
   nie im geschützten Kern (Zeilennummern vergleichen genügte), und die Widget-Knöpfe waren
   längst repariert (eine Messung genügte). Beides hätte man ungeprüft übernehmen können —
   einmal hätte es zu unnötiger Vorsicht geführt, einmal zu doppelter Arbeit. **Was ein Brief
   als Tatsache nennt, prüfe an der Sache selbst, bevor du darauf baust.**

## Abschluss-Befehl

`PULS.md` fortschreiben → neuen Brief schreiben (Pflichtlektüre + diesen Abschluss-Befehl
wiederholen) → Brief als Chat-Codeblock ausgeben → Commit/Push auf `claude/<scope>` →
Draft-PR mit Test-Plan.
Nach dem netzweiten Selbst-Merge-Freibrief (Klaus 2026-06-28) merget die Sitzung selbst,
sobald getestet, abgegrenzt und nicht zweifelhaft — **außer** Klaus will vorher draufschauen.
Bei einer Änderung am **Aussehen** ist genau das wahrscheinlich: **erst zeigen, dann mergen.**
