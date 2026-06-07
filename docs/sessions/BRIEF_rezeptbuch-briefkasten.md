# BRIEF — Mein-Rezeptbuch-Briefkasten (zweiseitiger Postkasten-Sync aufbauen)

> ⚠️ REKONSTRUIERT am 2026-06-07. Der Original-Brief dieser Sitzung wurde von Klaus
> ins Archiv verschoben und ist nirgends mehr vorhanden (kein Git-Commit, kein
> Reflog-Eintrag, keine nicht-committete Arbeit). Dieser Brief ist aus belastbaren
> Belegen wieder aufgebaut: Branch-Name `claude/mein-rezeptbuch-mailbox-setup`,
> Vorgänger-Brief `BRIEF_sbkim-netz-und-feinschliff.md` (§6b/§6d) und aktueller
> Repo-Stand (SIGNAL.json, App-Mailbox-CONFIG, Wächter). KEIN Original-Wortlaut.

Stand: 2026-06-07 · Repo: `lausiklauskn-png/Mein-Tresor` · Entwicklungsbranch: `claude/<scope>`

---

## 0. ARBEITSREGEL (verbindlich, von Klaus gewünscht) — in dieser Reihenfolge
1. **Lesen.** Pflichtlektüre (unten) + Code der zugewiesenen Scheibe.
2. **Nachdenken.** Plan formulieren (was, warum, welche Datei, welches Risiko).
3. **Mit allen Knoten kommunizieren (wenn möglich).** Briefkasten-Runde: jede Nachbar-
   `SIGNAL.json` aus deren `raw/main` lesen, mit unserem `ack` vergleichen, Ungelesenes
   lesen, ihre Sporen frisch verifizieren (`scripts/verify_foreign_spore.mjs`),
   `ack`/Inbox nachziehen. (Mechanik: Sage INTERFACES §11.6.)
4. **Mit Klaus abgleichen.** Kurzen Plan zeigen (Plan-vor-Code). Klaus hat Freibrief für
   Andock + selbständiges Mergen — größere/kreative Bauten trotzdem kurz zeigen.
5. **Dann Code.** Additiv bauen, Leitplanken wahren, `npm test` grün, committen, (auto-)mergen.

---

## 1. Pflichtlektüre VOR der Arbeit (in dieser Reihenfolge)
1. `CLAUDE.md` — Verfassung + Leitplanken.
2. `PULS.md` — aktueller Stand.
3. **Dieser Brief** + Vorgänger `BRIEF_sbkim-netz-und-feinschliff.md` + Gründung `BRIEF_start.md`.
4. `status.json` — ehrlicher Real-Anteil.
5. Code: `sbkim/SIGNAL.json`, `sbkim/*_inbox.json`, `index.html` (`window.SBKIM_MAILBOX`),
   `.github/sbkim-watch.mjs`, `scripts/verify_foreign_spore.mjs`, `docs/ANDOCK.md`.

---

## 2. Stand — wo wir stehen (real / provisorisch)
- SBKIM-Netz-Andock steht: **5 Nachbar-Sporen reziprok ✔ VALID** (Sage, SB-KIMTool-Point,
  Jasons-Tresor, **Mein-Rezeptbuch** = „Rezeptbuch Klaus", Mein-Mixarium). `npm test` 53/53.
- **Briefkasten-Sync läuft aber nur mit 3 Knoten** (Sage, SB-KIMTool-Point, Jasons-Tresor),
  weil nur diese ein `SIGNAL.json` führen. Mein-Rezeptbuch + Mein-Mixarium haben bisher
  **nur verifizierte Spore, KEINEN Postkasten** (Vorgänger-Brief §6b: Briefkasten „nein").
- Unsere `sbkim/SIGNAL.json`: `seq 2`, `mailboxes` = 3 URLs, `ack` = {Sage 12, Point 2, Jasons 2}.
- Eigene nodeId weiter **flüchtig** (`_demo`-domainVector), bis Klaus `npm run key` läuft.

## 3. Was geplant ist (Aufgabe dieser Sitzung)
**Den zweiseitigen Briefkasten zwischen Mein-Tresor und Mein-Rezeptbuch aufsetzen** —
analog zu den 3 bestehenden Mailbox-Nachbarn. Mein-Rezeptbuch ist Klaus' eigener Knoten;
die beiden sollen sich gegenseitig Bauten melden können.

**Voraussetzung (zuerst prüfen!):** Hat Mein-Rezeptbuch inzwischen ein eigenes
`sbkim/SIGNAL.json` unter
`https://raw.githubusercontent.com/lausiklauskn-png/Mein-Rezeptbuch/main/sbkim/SIGNAL.json`?
- **Ja** → vollen Sync aufbauen (Schritte 4a–4f).
- **Nein** → unsere Seite vorbereiten (Postfach + App/Wächter-Eintrag) und Mein-Rezeptbuch
  bitten, ein `SIGNAL.json` anzulegen; ehrlich vermerken „wartet auf Gegenseite".

## 4. Was gebaut / gepflegt / getestet werden soll (Einzelschritte)
**a. Spore auffrischen.** `sbkim/rezeptbuch_inbox.json` neu aus `raw/main` holen + über
   `scripts/verify_foreign_spore.mjs` prüfen → ✔ VALID. Erfolg: Test bleibt 53/53 grün.
**b. Postfach anlegen.** `sbkim/AUSTAUSCH-Rezeptbuch.md` nach Muster der bestehenden
   `AUSTAUSCH-*.md` (unsere Nachricht an Mein-Rezeptbuch + Platz für deren Antwort).
**c. `SIGNAL.json` erweitern.** In `mailboxes` die Rezeptbuch-Postfach-URL ergänzen, in `ack`
   `"Mein-Rezeptbuch": <gelesene seq>`; `seq` +1 mit Schlagzeile; `history[]`-Eintrag.
**d. App-CONFIG.** In `index.html` (+ Spiegel `jasons-bibliothek/index.html`)
   `window.SBKIM_MAILBOX.peers` um Mein-Rezeptbuch ergänzen. Erfolg: Kern bleibt
   byte-gleich (Hash `a98a704c…`), Wurzel == Spiegel, additiv außerhalb der Marker.
**e. Wächter.** In `.github/sbkim-watch.mjs` `PEERS` um Mein-Rezeptbuch (SIGNAL- + Postfach-URL)
   ergänzen — falls Mein-Rezeptbuch ein SIGNAL.json hat.
**f. Briefkasten-Runde.** Schritt 3 der Arbeitsregel fahren, `ack` aller Nachbarn aktuell halten.

## 5. Datenverträge (nicht brechen)
- Spore kanonisch (ANDOCK §4), 9 Pflichtfelder. `*_inbox.json` = verifizierte Nachbar-Spore.
- `SIGNAL.json`: `node`, `seq` (monoton +1 pro gemeldetem Bau), `mailboxes{}`, `ack{}`, `history[]`.
- App-Mailbox: `window.SBKIM_MAILBOX = { self, selfSignal, peers:[…] }`.
- Tresor-Kern unberührt: `jt-vaults`/`jt-booknames`/`mt-fachnums`, `jason-tresor` v2, Shamir,
  Tarnfach `rec.decoy` — alles byte-gleich.

## 6. Akzeptanzkriterien
- `npm test` grün (53/53); Kern byte-gleich (Wurzel == Spiegel, Hash s. §5/Vorgänger §3).
- `npm run verify` ✔ VALID; alle `sbkim/*_inbox.json` ✔ VALID.
- Echte Krypto; kein PII/Secret im Repo; offline; Schale/CONFIG additiv.
- Browser-Teile bleiben „ungeprüft, wartet auf Klaus' Browser-Lauf", bis Klaus sie gesehen hat.

## 7. Mitgeführte offene Punkte (aus dem Vorgänger-Brief, weiter gültig)
1. **Dauerhafte Identität:** `SBKIM_KEY_PW='…' npm run key` (Klaus, lokal) → Spore neu
   signieren → stabile nodeId committen. Erst danach reziproke Registrierung bei den Nachbarn.
2. **Browser-Lauf (Klaus):** Eingang → Raum → ein Fach mit Passwort öffnen → Datei laden →
   verschließen → erneut öffnen; Honigtopf/Tarnfach + Shamir; Hoch- UND Querformat.
3. **Klaus' „Kleinigkeiten"** am Gesicht (Details holt die Sitzung von Klaus ab).
4. **Fach-Raster exakt** via `werkzeuge/kalibrierung.html` → `LAYOUT.hoch/quer` einbacken.

## 8. Offene Fragen an Klaus
- Hat Mein-Rezeptbuch schon ein `SIGNAL.json`, oder soll ich es dort (oder hier vorbereitend) anstoßen?
- Mein-Mixarium gleich mit-anbinden (gleiche Lage: nur Spore, kein Postkasten)?
- Dauerhafte Identität (`npm run key`) jetzt anlegen — ja/nein?

## 9. Abschluss-Befehl (Kette nie abreißen lassen)
`PULS.md` fortschreiben → **neuen Brief** `docs/sessions/BRIEF_<thema>.md` (Pflichtlektüre +
Arbeitsregel + diesen Abschluss-Befehl wiederholen) → Brief vollständig als Chat-Codeblock →
Commit/Push auf `claude/<scope>` → Draft-PR mit Test-Plan → (Auto-)Merge.
**Merge entscheidet Klaus** (Freibrief für Andock + selbständiges Mergen liegt vor).
