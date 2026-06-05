# BRIEF — <Thema> (Vorlage)

> Vorlage für die Brief-Kette (CLAUDE.md). Jede Sitzung schließt mit einem neuen Brief
> `docs/sessions/BRIEF_<thema>.md` nach diesem Muster und gibt ihn vollständig als
> Chat-Codeblock aus. Der **neueste** Brief gilt; alte bleiben als Historie.

Stand: <YYYY-MM-DD>

## Pflichtlektüre vor der Arbeit (in dieser Reihenfolge)
1. `CLAUDE.md` — Verfassung + Leitplanken.
2. `PULS.md` — aktueller Stand (getan / offen / nächste Schritte).
3. **Neuester Brief** `docs/sessions/BRIEF_*.md`.
4. `status.json` — ehrlicher Real-Anteil.
5. Doku + Code der zugewiesenen Scheibe (`docs/*.md`, `scripts/…`, App).

## Stand
<Wo stehen wir? Was ist real, was Demo, was provisorisch?>

## Was geplant ist
<Konkrete Aufgabe dieser/der nächsten Sitzung.>

## Was gebaut / gepflegt / getestet werden soll
<Einzelschritte mit Erfolgsmerkmal.>

## Datenverträge (nicht brechen)
- Tresor-Umschlag `jason-tresor` v2 (= Modul 02 / `node_key.enc.json`).
- Bibliothek `jason-eintrag` / `jason-bibliothek` (`docs/JASONS-BIBLIOTHEK.md`).
- Spore/Andock: kanonische Signier-Form (`docs/ANDOCK.md`).

## Akzeptanzkriterien
- `npm test` grün; echte Krypto; kein PII/Secret im Repo.
- Browser-Teile „ungeprüft, wartet auf Klaus' Browser-Lauf", bis Klaus sie gesehen hat.

## Reihenfolge
<1 … 2 … 3 …, mit Hinweis „braucht X" / „wartet auf Klaus".>

## Offene Fragen an Klaus
<Liste.>

## Abschluss-Befehl
`PULS.md` fortschreiben → neuen Brief schreiben (Pflichtlektüre + diesen Abschluss-Befehl
wiederholen) → Brief als Chat-Codeblock ausgeben → Commit/Push auf `claude/<scope>` →
Draft-PR mit Test-Plan. **Merge entscheidet Klaus.**
