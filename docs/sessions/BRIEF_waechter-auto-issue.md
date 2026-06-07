# BRIEF — Auto-Issue-Wächter übernommen + Briefkasten-Runde quittiert

Stand: 2026-06-07

## Pflichtlektüre vor der Arbeit (in dieser Reihenfolge)
1. `CLAUDE.md` → 2. `PULS.md` → 3. dieser Brief → 4. `status.json` →
5. `sbkim/SIGNAL.json`, `sbkim/*_inbox.json`, `.github/sbkim-watch.mjs`,
   `.github/workflows/sbkim-watch.yml`, `docs/sessions/BRIEF_briefkasten-bauplan.md`,
   `docs/SYNC-VEREINBARUNG.md`.

## Stand
- **Wächter aufgewertet (Auto-Issue-Wächter).** Auf Auftrag von SB-KIMTool-Point (weitergereicht
  über Sage, deren SIGNAL seq 16/17) und auf Klaus' Wunsch hin ist `.github/sbkim-watch.mjs` +
  `.github/workflows/sbkim-watch.yml` jetzt **1:1 die Point-Vorlage**: prüft zeitgesteuert
  (Cron `0 */6 * * *` + „Run workflow") **alle 5 Nachbarn** und **öffnet/kommentiert bei Neuem ein
  GitHub-Issue** (Label `sbkim-watch`, `permissions: issues:write`) — auch ohne offene Seite.
  Zero-dependency, nur lesend, kein Schreiben in fremde Repos.
- **Briefkasten-Runde quittiert:** `ack` Sage **14→17**, SB-KIMTool-Point **8→18**, Jasons-Tresor
  **7→8**. Alle 3 Sporen reziprok **✔ VALID + unverändert** (keine Inbox-Ersetzung). Eigene
  `SIGNAL.json` seq **9**.
- **UI/Design unberührt** (Klaus: „Design ist so in Ordnung … Funktionsweise perfekt"). `index.html`
  nicht angefasst, JASONLIB-Kern byte-gleich (`a98a704c…`), `npm test` **53/53 grün**.
- Mein-Rezeptbuch + Mein-Mixarium haben weiter **kein `SIGNAL.json`** → der Wächter meldet sie
  ehrlich als „kein SIGNAL (404)", kein Alarm.

## Was geplant ist (nächste Sitzung)
- **Wächter im Betrieb bestätigen:** nach dem Merge im Actions-Tab 1× „Run workflow"; bei Neuem
  entsteht/aktualisiert sich ein Issue mit Label `sbkim-watch`.
- **Mein-Rezeptbuch + Mein-Mixarium** mit `docs/sessions/BRIEF_briefkasten-bauplan.md` aufbauen
  (eigene `SIGNAL.json` + Briefkasten + Wächter) → dann erscheinen sie als verbunden statt „kein SIGNAL".
- **Nächste Briefkasten-Runde** beim Sitzungsstart: Nachbar-SIGNAL lesen, Sporen prüfen, `ack` hochsetzen.

## Was gebaut / gepflegt / getestet werden soll
- Beim Übernehmen des Wächters in weitere Repos: **nur den CONFIG-Block** (`SELF` + `PEERS`)
  anpassen, Rest byte-gleich lassen. Erfolg: `node .github/sbkim-watch.mjs` läuft lokal grün;
  Workflow hat `issues:write` + `workflow_dispatch`.
- Jede Quittung: `ack[<Nachbar>] = deren seq`, eigene `seq` +1, `history`-Eintrag.

## Datenverträge (nicht brechen)
- `SIGNAL.json`: `node`, `seq` (monoton +1), `headline`, `mailboxes{}`, `forNodes`, `ack{}`, `history[]`.
- `*_inbox.json` = byte-1:1-Kopie der geprüften Nachbar-Spore (✔ VALID via `verify_foreign_spore.mjs`).
- Tresor-Kern byte-gleich (Wurzel == Spiegel, Hash `a98a704c…`); Schale/Infra additiv.

## Akzeptanzkriterien
- `npm test` grün (53/53); Kern byte-gleich; `SIGNAL.json` valides JSON.
- Wächter: zero-dep, nur lesend; öffnet Issue **nur** bei `seq > ack`; sonst still.
- Echte Krypto; kein PII/Secret im Repo; offline; Browser-Teile bleiben „ungeprüft" bis Klaus sie sah.

## Offene Fragen an Klaus
- Wächter-Issues gewünscht so (ein wiederverwendetes Issue je Repo), oder lieber pro Bau ein neues?
- Rezeptbuch/Mixarium als Nächstes aufbauen — ja?

## Abschluss-Befehl
`PULS.md` fortschreiben → neuen Brief schreiben (Pflichtlektüre + diesen Abschluss-Befehl
wiederholen) → Brief als Chat-Codeblock → Commit/Push auf `claude/<scope>` → Draft-PR mit
Test-Plan. **Merge entscheidet Klaus.**
