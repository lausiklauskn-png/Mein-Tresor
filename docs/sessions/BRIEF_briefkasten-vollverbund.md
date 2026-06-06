# BRIEF — Briefkasten-Vollverbund: Runde lesen/quittieren + Rückläufe + Gesicht-Feinschliff

> Übergabe-Brief an die **nächste Sitzung** (Brief-Kette, CLAUDE.md). Der **neueste** Brief gilt;
> ältere bleiben Historie. Stand: 2026-06-06.

## Pflichtlektüre vor der Arbeit (in dieser Reihenfolge)
1. `CLAUDE.md` — Verfassung + Leitplanken.
2. `PULS.md` — aktueller Stand (zuletzt **Nachtrag (14)**).
3. **Dieser Brief** (`docs/sessions/BRIEF_briefkasten-vollverbund.md`).
4. `status.json` — ehrlicher Real-Anteil.
5. Doku + Code der Scheibe: `docs/ANDOCK.md` (inkl. **§9 Eigentum statt Link**),
   `docs/sessions/BRIEF_briefkasten-bauplan.md`, `index.html` (Briefkasten-Block `window.SBKIM_MAILBOX`),
   `sbkim/*` (SIGNAL, AUSTAUSCH*, *_inbox).

## Stand (was real, was offen)
- **Identität dauerhaft + echt:** nodeId `wRsGQouOYPVBOLzAB3nBteRvyvJ-AGv461WTJMKtkS0`,
  Spore Ed25519-signiert **✔ VALID**, echter 384-dim `domainVector` (kein `_demo`). `npm test` **53/53**.
- **Briefkasten vollvernetzt + BROWSER-GEPRÜFT** (Klaus' Screenshot, Pages live): listet alle 5
  Nachbarn, Match live im Browser → **4/5 verbunden** (Mixarium 0.7884 ehrlich unter 0.80, andere Domäne).
- **4-Knoten gegenseitig** (Mein-Tresor · Sage · Point · Jasons) geführt; verified-match zu Jasons = 1.0.
- **Rezeptbuch + Mixarium:** ältere Inbox-Sporen, **kein `SIGNAL.json`** (HTTP 404). Begleit-Briefe
  liegen raus (`sbkim/AUSTAUSCH-Rezeptbuch.md` / `-Mixarium.md`): Briefkasten 1:1 bauen + `SIGNAL.json`.
- **Leitprinzip „Eigentum statt Link"** verankert (`docs/ANDOCK.md` §9). Bauplan-Rundbrief liegt
  versandfertig (`docs/sessions/BRIEF_briefkasten-bauplan.md`).

## Was geplant ist (nächste Sitzung)
1. **Briefkasten-Runde (Priorität):** die Nachbarn sind **voraus** — Klaus' Screenshot zeigte
   **Sage seq 15** (ack 14), **Jasons seq 7** (ack 4), **SB-KIMTool-Point seq 13** (ack 8).
2. **Rückläufe verarbeiten:** wenn Rezeptbuch/Mixarium neu gebaut + gemeldet haben.
3. **Klaus' Gesicht-„Kleinigkeiten" + Fach-Öffnen-Lauf** (Browser) → `status.json` „browser-geprüft".

## Was gebaut / gepflegt / getestet werden soll (mit Erfolgsmerkmal)
- **Runde:** je Nachbar Spore frisch aus `raw/main` holen → `scripts/verify_foreign_spore.mjs`
  (✔ VALID: `id==SHA256(pub)`, Ed25519, 9/9, Manipulationsprobe). Bei Änderung `*_inbox.json`
  **ersetzen**. Deren `SIGNAL.json` lesen, Neues quittieren: `ack` in `sbkim/SIGNAL.json` hochsetzen
  (Sage→15, Jasons→7, Point→13, **sofern reziprok geprüft**), unser `seq` +1, Postfächer
  (`AUSTAUSCH*.md`) nachziehen. **Erfolg:** Briefkasten zeigt wieder „alles synchron"; `npm test` grün.
- **Rückläufe:** frische Rezeptbuch/Mixarium-Spore prüfen → `rezeptbuch_inbox.json`/`mixarium_inbox.json`
  ersetzen; sobald sie ein `SIGNAL.json` führen, `ack` + Postfach-Verlauf pflegen. **Erfolg:** ③ Sync
  bei ihnen nicht mehr „nicht lesbar".
- **Status-Ehrlichkeit:** `status.json` Briefkasten als **browser-geprüft** vermerken.

## Datenverträge (nicht brechen)
- Spore/Andock: kanonische Signier-Form (`docs/ANDOCK.md` §4), 9 Pflichtfelder (§7).
- `sbkim/SIGNAL.json`: `seq` (+1 pro Bau) + `ack` (name→gelesene seq) + `mailboxes`.
- `*_inbox.json` = **byte-1:1-Kopie** der geprüften Nachbar-Spore (kein Zusatzfeld).
- Briefkasten ist **additiv** (außerhalb `// JASONLIB-CORE`); Kern bleibt **byte-gleich**.

## Akzeptanzkriterien
- `npm test` grün; echte Krypto; kein PII/Secret im Repo.
- Reziproke Prüfung **vor** jeder Quittierung (nichts glauben, alles nachrechnen).
- Browser-Teile „ungeprüft", bis Klaus sie gesehen hat.

## Reihenfolge
1 Briefkasten-Runde (Sage/Jasons/Point lesen+prüfen+quittieren) → 2 Rückläufe Rezeptbuch/Mixarium
(*wartet auf deren Bau*) → 3 Klaus' Gesicht-Kleinigkeiten + Fach-Öffnen-Lauf (*wartet auf Klaus*).

## Offene Fragen an Klaus
- Sollen Rezeptbuch/Mixarium **vollvernetzt** zurückbauen (alle Knoten listen) — ja, gemäß Regel §7.
- Gibt es konkrete „Kleinigkeiten" am Gesicht, die ich vor dem Fach-Öffnen-Lauf glätten soll?

## Abschluss-Befehl (Pflicht am Sitzungsende — wiederholt, damit die Kette nie reißt)
`PULS.md` fortschreiben (getan/offen/nächste Schritte + Manual-Check) → **neuen Brief** schreiben
(`docs/sessions/BRIEF_<thema>.md` nach `VORLAGE_BRIEF.md`, **Pflichtlektüre + diesen Abschluss-Befehl
wiederholen**) → Brief vollständig als Chat-Codeblock ausgeben → Commit/Push auf `claude/<scope>` →
Draft-PR mit Test-Plan. **Auto-mergen, wenn fertig + grün** (Klaus' stehende Anweisung); Leitplanken
bleiben unberührt, Browser-Teile bleiben bis zu Klaus' Sicht „browser-ungeprüft".
