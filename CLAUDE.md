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
- **Selbst-Merge-Freibrief (Klaus 2026-06-28, netzweit für ALLE Repos — Mixarium und
  andere eingeschlossen):** Die Sitzung merget ihre **eigenen** PRs **selbstständig**
  in `main`, sobald sie getestet (`npm test`/Headless grün; bei reinen Doku-/byte-Kopie-
  Änderungen Drift-Guard grün), abgegrenzt und nicht architektonisch zweifelhaft sind —
  **ohne auf „X mergen" zu warten** (Draft-PR → ready → squash-merge). **NICHT** automatisch
  mergen bei echtem Zweifel (Richtungsentscheid, schwer umkehrbar, mehrere gleich gute Wege)
  ODER wenn Klaus ausdrücklich vorher draufschauen will. Klaus' Browser-Sichttest bleibt davon
  unberührt (headless ersetzt ihn nicht); die Leitplanken (Ehrlichkeit, echte Krypto,
  `npm test`/Beweis, kein PII, offline, Plan-vor-Code, Brief-Kette) bleiben **immer** unberührt
  — der Freibrief betrifft nur den Merge-Schritt. Niemals auf einen anderen als den vorgegebenen
  Branch pushen ohne ausdrückliche Erlaubnis.

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
