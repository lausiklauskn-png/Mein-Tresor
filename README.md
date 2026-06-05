# Mein-Tresor

**Design-vereinfachte Schwester von [Jasons-Tresor](https://github.com/lausiklauskn-png/Jasons-Tresor).**
Gleiche bewiesene Funktion (jedes Fach = echter AES-Tresor; Honigtopf/Tarnfach, Shamir 3-von-5,
alle Dateiformate, Gesamt-Sicherung — aus dem **byte-gleich** kopierten JasonLib-Kern). **Neu ist
nur das Gesicht:** ein futuristischer High-End-**Dreh-Safe** als Eingang → ein **Tresorraum mit
20 nummerierten Fächern**. Offline-PWA, Hoch- und Querformat. Zugleich ein echter **SBKIM-Endknoten**
mit eigener Identität, Briefkasten und Andock an Sage + SB-KIMTool-Point.

> **Stand 2026-06-05 (Bootstrap):** Kern + Tests **1:1 byte-gleich** aus Jasons-Tresor kopiert,
> `npm test` **51/51 grün**. Eigene SBKIM-Spore ✔ VALID (noch **flüchtig** — wartet auf Klaus'
> Schlüssel). Das **neue Gesicht (Dreh-Safe + 20 Fächer) ist noch nicht gebaut** — aktuell läuft
> als Platzhalter die übernommene Jasons-Tresor-Schale. Re-Skin folgt nach Klaus' 4 echten Bildern.
> Ehrlicher Detailstand: [`status.json`](status.json).

## Echte Krypto

- **Tresor:** AES-256-GCM, Schlüssel via PBKDF2-SHA256 **600 000** Runden (WebCrypto).
- **Identität:** Ed25519 / SHA-256 (`node:crypto`), signierte Spore (`sbkim/spore.json`).
- **Passwort vergessen = Inhalt weg** (kein Hintertürchen). Export ist die echte Sicherung.

## Befehle (für Entwickler — Klaus bedient nur Knöpfe in der Seite)

```bash
npm test                              # headless Beweis (51 Tests): Tresor-Logik + Andock-Krypto
SBKIM_KEY_PW='<Passwort>' npm run key # EINMALIG: dauerhafte nodeId (Schlüssel bleibt lokal)
npm run demo                          # Spore neu signieren
npm run verify                        # eigene Spore -> ✔ VALID
```

## Aufbau

| Pfad | Inhalt |
|---|---|
| `index.html` (+ Spiegel `jasons-bibliothek/index.html`) | Die App. Kern zwischen `// JASONLIB-CORE-START..END` (byte-gleich). |
| `test/*.test.js` | Headless-Beweise (schneiden den Kern aus der ausgelieferten Datei). |
| `scripts/` | Andock-/Schlüssel-Skripte (Spore erzeugen/prüfen, Knoten-Schlüssel-Tresor). |
| `sbkim/` | Identität (`spore.json`), Briefkasten (`SIGNAL.json`, `AUSTAUSCH*.md`), Nachbar-Snapshots. |
| `.github/` | Briefkasten-Wächter (täglicher Cron, meldet ungelesene Nachbar-Bauten). |
| `docs/` | `ANDOCK.md`, `SCHLUESSEL.md`, `JASONS-BIBLIOTHEK.md`, `sessions/` (Brief-Kette). |

## Sicherheit & Ehrlichkeit

Privater Schlüssel und Passwort kommen **nie** ins Repo. `sbkim/node_key.enc.json` (falls
vorhanden) ist ein Passwort-Tresor (ohne Passwort wertlos). Was echt bewiesen ist und was noch
auf Klaus wartet, steht ehrlich in [`status.json`](status.json). Verfassung: [`CLAUDE.md`](CLAUDE.md).

*Privat-Projekt, UNLICENSED. Kein Klon — kopiert aus den getesteten Originalen von Jasons-Tresor.*
