# BRIEF — Feinschliff Gesicht + Browser-Lauf

Stand: 2026-06-06

## Pflichtlektüre vor der Arbeit (in dieser Reihenfolge)
1. CLAUDE.md → 2. PULS.md → 3. dieser Brief → 4. status.json →
5. App (index.html + Spiegel jasons-bibliothek/index.html), docs/*.md, werkzeuge/kalibrierung.html.

## Stand
- Neues Gesicht live auf Pages (Dreh-Safe + Tresorraum), Räder/Fächer fest, Briefkasten+Siegel,
  Andock an 5 SBKIM-Knoten ✔ VALID. npm test 53/53, Kern byte-gleich (a98a704c…).
- Klaus meldet „ein paar Kleinigkeiten" (Details folgen).

## Was geplant ist
- Klaus' genannte Kleinigkeiten am Gesicht beheben (additiv, Kern byte-gleich lassen).
- Browser-Lauf: Eingang → Raum → Fach mit Passwort öffnen → Datei laden → verschließen →
  Honigtopf/Tarnfach + Shamir prüfen. Danach status.json ehrlich „browser-geprüft".
- Optional: Fach-Raster exakt kalibrieren (LAYOUT.hoch/quer aus werkzeuge/kalibrierung.html),
  Öffnen-Overlay auf fach.png umskinnen.

## Datenverträge (nicht brechen)
jt-vaults pro Fach (f-1..f-30) · jason-tresor v2 · jason-eintrag/jason-bibliothek ·
Shamir JT3v5-<i>-<base64url> · Tarnfach rec.decoy · Spore kanonisch (ANDOCK §4).

## Akzeptanzkriterien
- npm test grün; Kern byte-gleich (Wurzel==Spiegel); echte Krypto; kein Secret im Repo.
- Browser-Teile bleiben „ungeprüft, wartet auf Klaus' Browser-Lauf" bis gesehen.

## Offene Fragen an Klaus
- Welche „Kleinigkeiten" genau (Position, Text, Verhalten)?
- Fach-Raster per Werkzeug exakt setzen — ja/nein?
- Dauerhafte Identität jetzt anlegen (Passwort) — ja/nein?

## Abschluss-Befehl
PULS.md fortschreiben → neuen Brief schreiben (Pflichtlektüre + diesen Abschluss-Befehl
wiederholen) → Brief als Chat-Codeblock → Commit/Push auf claude/<scope> → (Auto-)Merge.
Merge entscheidet Klaus / Freibrief für Andock+Mergen erteilt.
