**🔬 Regel: Forschung nur in Kimhub (Klaus 2026-10-31: „einheitlich alles in Kimhub … in den einzelnen Repos soll keine Forschungseinträge sein“):** jeder Forschungseintrag (Sitzungs-Befunde, Messungen, Stunden-Auswertungen, Forschungsnotizen) kommt nach **Kimhub `forschung/messungen/`**; in diesem Repo werden keine Forschungseinträge geführt und keine Forschungsdateien angelegt. Öffentliche Forschungs**aufgaben** stehen in Sage-Protokol.

# CLAUDE.md — Verfassung dieses Repos

Leitfaden für jede Sitzung an **Mein-Tresor**.

> Re-Skin von `Jasons-Tresor/CLAUDE.md` (1:1-Leitplanken übernommen, Repo-Spezifika
> angepasst). Die Leitplanken sind **unverändert**: Ehrlichkeit, echte Krypto,
> `npm test` = Beweis, kein PII, offline, Selbst-Merge nach Freibrief (Klaus
> 2026-06-28, netzweit), Plan-vor-Code, Brief-Kette.

## Was dieses Repo ist

**Mein-Tresor** ist die **design-vereinfachte Schwester von Jasons-Tresor**. Die **Funktion
ist identisch** (jedes Fach = echter AES-Tresor mit Schlüssel/Passwort; Honigtopf/Tarnfach,
Shamir 3-von-5, alle Dateiformate, Gesamt-Sicherung — alles aus dem bewiesenen JasonLib-Kern,
**byte-gleich** kopiert). **NUR das Gesicht ist neu:** ein futuristischer High-End-Dreh-Safe
als Eingang → ein Tresorraum mit 20 nummerierten Fächern. Offline-PWA, Hoch- und Querformat.

Zugleich ein **echter SBKIM-Endknoten** — eigene Ed25519-Identität (`sbkim/spore.json`),
Briefkasten (`sbkim/SIGNAL.json` + `AUSTAUSCH*.md`) und Andock an Sage + SB-KIMTool-Point
(+ Schwester Jasons-Tresor).

## Sprache & Begriffe

- Doku auf **Deutsch**, Code-Bezeichner auf **Englisch**. Datum `YYYY-MM-DD`.
- „Jason" = Klaus' Name für eine `.json`-Datei (Daten-Vertrag, bleibt).

## Disziplin (Leitplanken — unverändert)

- **Kopieren, nicht klonen.** Der Kern kommt aus den **getesteten Originalen** von
  Jasons-Tresor (`raw.githubusercontent.com/lausiklauskn-png/Jasons-Tresor/main/<pfad>`).
  **1:1 kopieren, nicht abwandeln.** Der Kern zwischen `// JASONLIB-CORE-START..END` bleibt
  **byte-gleich** (Wurzel `index.html` == Spiegel `jasons-bibliothek/index.html`).
- **Echte Krypto.** Ed25519/SHA-256 über `node:crypto`; AES-256-GCM/PBKDF2-SHA256 600k über
  WebCrypto. Das `domainVector`-Embedding ist bis zu Klaus' Browser-Lauf ein markierter
  **Demo-Stub** (`_demo`).
- **Ehrlichkeit zuerst.** `status.json` zeigt den Real-Anteil. Browser-Pfade bleiben
  **„ungeprüft, wartet auf Klaus' Browser-Lauf"**, bis Klaus sie gesehen hat. Beweis = `npm test`.
- **Kein PII / kein Secret im Code.** Privater Schlüssel und Passwort kommen **nie** ins Repo
  (siehe `docs/SCHLUESSEL.md`). `sbkim/node_key.enc.json` wird **lokal** von Klaus angelegt.
- **Offline.** Die App hat **keine externen Abhängigkeiten** (eine `index.html`).
- **Nichts vortäuschen, nichts im Hintergrund vorbauen.**

## Befehle

```bash
npm test         # headless Beweis: Tresor-Logik + Andock-Krypto (51 Tests)
npm run key      # EINMALIG: SBKIM_KEY_PW='…' npm run key -> dauerhafte nodeId (lokal)
npm run demo     # Spore neu erzeugen (mit SBKIM_NODE_KEY für stabile nodeId)
npm run verify   # eigene Spore reziprok verifizieren (✔ VALID)
```

## Branch & PR-Workflow (verbindlich)

- Entwicklung auf `claude/<scope>`. Ein Commit pro abgegrenzter Aufgabe, semantische Nachricht.
- **Selbst-Merge-Freibrief (Klaus 2026-06-28, netzweit):** die Sitzung merget ihre
  **eigenen** PRs selbstständig nach `main`, sobald sie getestet, abgegrenzt und nicht
  architektonisch zweifelhaft sind — ohne auf ein Wort zu warten. **Nicht** bei echtem
  Zweifel oder wenn Klaus vorher draufschauen will. Niemals auf einen anderen als den
  für die Sitzung vorgegebenen Branch pushen. Die Leitplanken (Ehrlichkeit, echte
  Krypto, `npm test` als Beweis, kein PII, offline, Plan-vor-Code, Brief-Kette) bleiben
  unberührt — der Freibrief betrifft nur den Merge-Schritt.
  Volltext: [NETZWEIT § 1](https://github.com/lausiklauskn-png/Sage-Protokol/blob/main/docs/NETZWEIT.md).

## Schale (das NEUE Gesicht) — erst nach Klaus' Bildern

Der Dreh-Safe-Eingang + das 20-Fächer-Raster werden **erst gebaut, wenn Klaus' 4 echte Bilder
vorliegen** (Safe-Front, Drehrad, Tresorwand, ein Fach) und ein **Plan-vor-Code** abgestimmt
ist. Bis dahin läuft als **Platzhalter** die übernommene Jasons-Tresor-Schale. Effekte
(buch-energie, licht-blitz, `mix-blend:screen`, `prefers-reduced-motion`, sessionStorage-Gate)
werden wiederverwendet. Die 20 Fächer + 4 Räder platziert die **APP** exakt — nicht die Bild-KI.

## Datenverträge (nicht brechen)

`jason-tresor` v2 · `jason-eintrag`/`jason-bibliothek` · `jt-vaults` pro Fach
(tresor/decoy/name/category) · Shamir `JT3v5-<i>-<base64url>` · Tarnfach = eigener AES-Umschlag
(`rec.decoy`) · Spore kanonisch (ANDOCK §4), 9 Pflichtfelder (§7).

## Übergabe (PULS) am Sitzungsende — Pflicht

1. `PULS.md` aktualisieren (getan / offen / nächste Schritte) + Manual-Check vermerken.
2. Commit + Push (ein Commit pro Aufgabe), Draft-PR mit Test-Plan.
3. **„Nächste Schritte"-Block** direkt in der Chat-Antwort (2–4 priorisierte Punkte).
4. **Neuen Brief** `docs/sessions/BRIEF_<thema>.md` nach `VORLAGE_BRIEF.md` + vollständig
   als Codeblock im Chat. Pflichtlektüre + Abschluss-Befehl wiederholen — die Kette reißt nie ab.

## Briefkasten-Hygiene (regelmäßig aufräumen)

Damit der Briefkasten nicht zuwächst, wird er **bei jedem Sitzungsstart gelesen und schlank
gehalten** (Klaus' Wunsch):

- **SBKIM-Briefkasten** (`sbkim/SIGNAL.json`, `AUSTAUSCH*.md`, `*_inbox.json`): die
  **Datenverträge** bleiben immer — `SIGNAL.json`, `spore.json`, jede `*_inbox.json`, der
  Status-Kopf, **jeder offene Auftrag** und alles, was die Gegenstelle noch nicht quittiert hat.
  **Aber die Quittungen darin verjähren** (Klaus 2026-08-08, netzweit als
  `Sage-Protokol/docs/INTERFACES.md` **§11.6.1 „Postfach-Verjährung"**): Verlaufs-Einträge, die
  reine Bestätigungen abgeschlossener Wege sind („gelesen + quittiert", „✅ bestätigt", eine
  erfüllte Bitte), werden nach **30 Tagen** zu **einem Ergebnis-Block** zusammengefasst, der den
  **Endstand** trägt. Eine Bestätigung muss nicht lange aufgehoben werden — der Briefkasten soll
  nicht übervoll werden. Bedingungen: Endstand steht danach da · es wird hingeschrieben, dass
  gekürzt wurde · nichts geht verloren (Git-Historie). **Nie** im Postfach einer Gegenstelle.
  *(Ersetzt die frühere Fassung „bleibt immer, niemals ausmisten" — die war gegen das falsche
  Aufräumen richtig, hat aber auch das richtige verhindert.)*
- **Brief-Kette** (`docs/sessions/BRIEF_*.md`): Es bleiben **`BRIEF_start.md`** (Gründung),
  der **aktuell aktive** Brief (in `PULS.md` benannt) und **`VORLAGE_BRIEF.md`**. Briefe, die
  **erledigt oder vom neueren Brief überholt** sind und deren Inhalt schon in `PULS.md` steht,
  werden **gelöscht** — die Git-Historie bleibt das Archiv, nichts geht verloren.
  (Ersetzt die frühere Regel „alte Briefe bleiben liegen".)

## Pflichtlektüre **vor** jeder Arbeit (in dieser Reihenfolge)

1. `CLAUDE.md` (diese Verfassung) → 2. `PULS.md` → 3. neuester `docs/sessions/BRIEF_*.md`
→ 4. `status.json` → 5. Doku + Code der zugewiesenen Scheibe (`docs/*.md`, `scripts/…`, App).
Der Gründungs-Auftrag liegt in `docs/sessions/BRIEF_start.md`.

## Plan-vor-Code + Freibrief-Klausel

- Zuerst Pflichtlektüre + relevanten Code lesen + **Plan** formulieren, kurz an Klaus zeigen,
  bevor größere Bauten starten. Gibt Klaus ausdrücklich einen **Freibrief**, entfällt die
  Plan-an-Klaus-Pflicht im freigegebenen Umfang (nur für die benannte Sitzung). Leitplanken
  bleiben **immer** unberührt. **Niemals stille Workarounds** — Änderungen an Regeln werden
  Klaus ausdrücklich genannt.

## Kommunikations-Disziplin

- **Klaus ist kein Programmierer** (lernt gern): ruhiger, präziser Ton, Antworten auf Deutsch.
  Bevorzugt einfache Seiten. **Keine Terminal-Kommandos für Klaus** — Bedien-Flüsse über
  benannte Knöpfe in der Seite.

---

## 🏷️ Gerätename · netzweite Regeln

Der Gerätename gehört **ins Verbinden-Panel**, hineingehängt vom app-eigenen Glue
— **nie** in eine byte-kopierte Panel-Datei. Jedes Feld trägt
`data-sbkim-geraetename`; der Name geht **nur** an Anzeige und Anmeldung, **nie** an
`generateOwnSpore`. Er ist ein Hinweis, kein Vertrauens-Beweis: immer mit der Kennung
zusammen anzeigen.

Diese und die übrigen netzweiten Regeln — Selbst-Merge-Freibrief, frisch von
`origin/main`, Ton, kein PII, Ehrlichkeit — stehen seit 2026-08-22 **einmal** in
**[`Sage-Protokol/docs/NETZWEIT.md`](https://github.com/lausiklauskn-png/Sage-Protokol/blob/main/docs/NETZWEIT.md)** statt wortgleich in bis zu
20 Repos. Verträge: **[`INTERFACES.md`](https://github.com/lausiklauskn-png/Sage-Protokol/blob/main/docs/INTERFACES.md)** · die Fallen beim
Abzweigen und Veröffentlichen: **[`LEHREN.md`](https://github.com/lausiklauskn-png/Sage-Protokol/blob/main/docs/LEHREN.md)** · alte Fassung dieser
Datei: [`docs/archiv/CLAUDE-2026-08-22.md`](docs/archiv/CLAUDE-2026-08-22.md).

## ⬇ Kein „Websitedaten löschen“ im Installieren-Rat (Klaus 2026-10-18)

`assets/installieren.js` ist wieder byte-1:1 aus Sage (#1151, sha `09c533b3…2193`). Der alte letzte Rat „Websiteeinstellungen → Daten löschen“ hätte auf `lausiklauskn-png.github.io` den gemeinsamen Speicher aller Apps geleert — hier samt der verschlüsselten Schlüssel. Jetzt: App unter Android-Einstellungen deinstallieren, Chrome schließen, neu laden, neu installieren. `installieren.js?v=4`, Cache v37.

**Nachtrag 2026-10-18 · Kontrast:** am Handy stand das Erklärfenster hell auf weiß (`color:inherit` erbt helle Schrift, `--flaeche` fehlt → weiß). `assets/installieren.js` neu byte-1:1 aus Sage (#1152, sha `874d2a29…8dc4`): nach dem Einhängen wird der Kontrast gemessen, unter 4,5 steht die Meldung fest `#1a1a1a` auf `#fff`. `installieren.js?v=5`, Cache v38. ⚠ Am Tablet nicht gemessen.

**Nachtrag 2026-10-18 · Knopf in den Einstellungen:** `assets/installieren.js` neu byte-1:1 aus Sage (#1153, sha `e0644084…73c3`, enthält die Kontrast-Sicherung). Keine Einstellungen in dieser App, also bleibt der Knopf fest oben (`data-fest`, `data-vor`). `installieren.js?v=6`, Cache v39. ⚠ Am Tablet nicht gemessen.
