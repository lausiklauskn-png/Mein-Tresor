# BRIEF — Schale bauen: Dreh-Safe-Eingang + 20-Fächer-Tresorraum

> Brief-Kette (CLAUDE.md). Der **neueste** Brief gilt; alte bleiben Historie. Diese Sitzung
> schließt mit einem neuen Brief nach `docs/sessions/VORLAGE_BRIEF.md`.

Stand: 2026-06-05

## Pflichtlektüre vor der Arbeit (in dieser Reihenfolge)
1. `CLAUDE.md` — Verfassung + Leitplanken.
2. `PULS.md` — aktueller Stand (getan / offen / nächste Schritte).
3. **Neuester Brief** `docs/sessions/BRIEF_*.md` (dieser) + Gründungs-Auftrag `BRIEF_start.md`.
4. `status.json` — ehrlicher Real-Anteil.
5. App-Code (`index.html` + Spiegel `jasons-bibliothek/index.html`), `docs/ANDOCK.md`,
   `docs/SCHLUESSEL.md`, `docs/JASONS-BIBLIOTHEK.md`.

## Stand
- **Bootstrap fertig:** Kern + Tests 1:1 **byte-gleich** aus Jasons-Tresor; `npm test` 51/51.
  Spore ✔ VALID (noch flüchtig + `_demo` domainVector). Briefkasten/Sync/Wächter eingerichtet.
- **Platzhalter-Gesicht:** aktuell läuft die übernommene Jasons-Tresor-Schale (Buch/Regal).
  Das **eigentliche neue Gesicht ist NOCH NICHT gebaut.**

## Was geplant ist (diese/nächste Sitzung)
Das **neue Gesicht** bauen — **erst nach Klaus' 4 echten Bildern + Plan-vor-Code**:
1. **EINGANG — Dreh-Safe** (reine Inszenierung, KEINE echte Kombination): Safe-Front-Bild +
   4 Drehräder (1 groß mittig + 3 klein) per Pointer drehen → Glitzer → nach Schwelle
   (jedes Rad > ~120°) Überblendung in den Raum. Räder an das Bild-Rechteck verankert
   (Muster `fitBooksToImage`) → in Hoch- und Querformat auf ihren Vertiefungen.
2. **RAUM — 20 Fächer, responsiv:** Wand = Hintergrund (`object-fit:cover`), darüber CSS-Grid
   (Hochformat ~4×5, Querformat ~5×4). IDs `f-1…f-20` = je ein `jt-vaults`-Datensatz.
   Nummern editierbar (Default 01…20, lokal). Schlüsselloch-Klickfläche ~28 % Höhe →
   bekanntes Öffnen-Overlay (Passwort→Inhalt→Datei→verschließen), re-geskinnt (Fach statt Buch).

## Was gebaut / gepflegt / getestet werden soll
- Neue Schale **nur in der Schale** (außerhalb `// JASONLIB-CORE-START..END`): Kern bleibt
  **byte-gleich** (Wurzel == Spiegel); `npm test` muss grün bleiben.
- Effekte wiederverwenden (buch-energie, licht-blitz, `mix-blend:screen`,
  `prefers-reduced-motion`, sessionStorage-Gate).
- Klaus' Bilder nach `assets/` (4 Stück: Safe-Front, Drehrad transparent, Tresorwand, ein Fach).

## Datenverträge (nicht brechen)
- `jt-vaults` pro Fach (tresor/decoy/name/category) · `jason-tresor` v2 ·
  `jason-eintrag`/`jason-bibliothek` · Shamir `JT3v5-<i>-<base64url>` · Tarnfach `rec.decoy` ·
  Spore kanonisch (ANDOCK §4), 9 Pflichtfelder (§7).

## Akzeptanzkriterien
- `npm test` grün; Kern byte-gleich; echte Krypto; kein PII/Secret im Repo.
- Browser-Lauf in **Hoch- UND Querformat** (Handy + Rechner): Dreh-Eingang → Raum → Fach mit
  Passwort öffnen → Datei laden → verschließen → erneut öffnen; Nummern editierbar; Honigtopf;
  Shamir. Bis Klaus es gesehen hat: „ungeprüft, wartet auf Klaus' Browser-Lauf".

## Reihenfolge
1. **Klaus liefert die 4 Bilder** (wartet auf Klaus) → 2. **Plan-vor-Code** an Klaus →
3. Eingang (Dreh-Safe) → 4. Raum (20 Fächer) → 5. Öffnen-Overlay re-skin →
6. Browser-Verifikation beidlagig → 7. PULS + neuer Brief.
Parallel möglich (unabhängig von Bildern): **dauerhafte Identität** (`npm run key`) + **Pages**
aktivieren, dann bei Sage/SB-KIMTool-Point/Jasons-Tresor reziprok melden.

## Offene Fragen an Klaus
- Die **4 Bilder** nach den Prompts in `BRIEF_start.md` — liegen sie vor?
- Sollen die Fach-Nummern wirklich 01…20 (Default) sein, editierbar pro Gerät?
- Identität dauerhaft jetzt (Passwort über `SBKIM_KEY_PW`) oder später?

## Abschluss-Befehl
`PULS.md` fortschreiben → neuen Brief schreiben (Pflichtlektüre + diesen Abschluss-Befehl
wiederholen) → Brief als Chat-Codeblock ausgeben → Commit/Push auf `claude/<scope>` →
Draft-PR mit Test-Plan. **Merge entscheidet Klaus.**
