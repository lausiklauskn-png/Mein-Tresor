# BEFEHL — „Briefkasten lesen und übernehmen" (für JEDES Repo wiederverwendbar)

> **Zweck.** Ein dauerhafter, wieder­verwendbarer Befehl, mit dem **jeder SBKIM-Knoten**
> denselben Briefkasten-Aufbau wie Mein-Tresor übernimmt — in sein **eigenes Repo** und in
> seine **eigene PWA/Web-App**. So laufen alle Knoten synchron und können sich gegenseitig
> Bauten melden (server-los, datei-getragen, INTERFACES §11.6).
>
> **So benutzt Klaus ihn:** In der Sitzung des Ziel-Repos den Auslöse-Satz sagen
> **„Briefkasten lesen und übernehmen"** und den **GENERISCHEN BEFEHL** (Abschnitt 1) einfügen.
> Die Sitzung liest dann die Referenz-Dateien von Mein-Tresor, gleicht sie an ihr Repo an
> (überschreibt nichts Bestehendes) und baut den 📬-Briefkasten in ihre eigene PWA ein.

Stand: 2026-06-07 · Quelle/Referenz-Umsetzung: `lausiklauskn-png/Mein-Tresor` (`main`)

---

## Was der Briefkasten ist (fünf Teile)

1. **`sbkim/SIGNAL.json`** — maschinenlesbarer Aushang: `node`, `seq` (monoton +1 pro
   gemeldetem Bau), `headline`, `mailboxes{}`, `forNodes:["*"]`, `ack{}` (zuletzt gelesene seq
   je Nachbar), `history[]`. **Das Pushen dieser Datei IST das Signal** (kein Server).
2. **Postfächer `sbkim/AUSTAUSCH-<Nachbar>.md`** — je Nachbar eine Datei (Status-Kopf-Tabelle
   + Nachricht + Verlauf). Jeder legt SEINE Datei ab und liest die des anderen aus `raw`.
3. **Wächter `.github/sbkim-watch.mjs`** — liest die `SIGNAL.json` aller Nachbarn, vergleicht
   mit dem eigenen `ack`, meldet Ungelesenes. Keine npm-Abhängigkeiten (nur Node-fetch).
4. **Cron-Workflow `.github/workflows/sbkim-watch.yml`** — fährt den Wächter täglich.
5. **📬-Knopf + Siegel in der eigenen PWA** — `window.SBKIM_MAILBOX` + `sbkimMailboxCheck`:
   prüft beim Laden still die Nachbarn, zeigt einen Badge mit Anzahl ungelesener Bauten,
   öffnet auf Klick einen Dialog mit Nachbar-Stand + SBKIM-Siegel + eigener nodeId.

---

## Referenz-Dateien (roh aus dem Netz holen und 1:1 als Vorlage nehmen)
```
https://raw.githubusercontent.com/lausiklauskn-png/Mein-Tresor/main/sbkim/SIGNAL.json
https://raw.githubusercontent.com/lausiklauskn-png/Mein-Tresor/main/sbkim/AUSTAUSCH.md
https://raw.githubusercontent.com/lausiklauskn-png/Mein-Tresor/main/.github/sbkim-watch.mjs
https://raw.githubusercontent.com/lausiklauskn-png/Mein-Tresor/main/.github/workflows/sbkim-watch.yml
https://raw.githubusercontent.com/lausiklauskn-png/Mein-Tresor/main/assets/sbkim-siegel-wappen.svg
https://raw.githubusercontent.com/lausiklauskn-png/Mein-Tresor/main/index.html
   → darin die Blöcke "=== SBKIM-Briefkasten CONFIG ===" + "=== SBKIM-Briefkasten Logik ===",
     der Dialog "#sbkim-mailbox-dialog", der "📬 Briefkasten"-Knopf und das Siegel-Badge
     "#sbkim-siegel-badge".
```

---

## 1. GENERISCHER BEFEHL (in JEDE Ziel-Sitzung einfügen)

> Vor dem Einfügen nur **zwei Stellen** ersetzen: `<DEIN-KNOTEN-NAME>` und die **PEERS-Liste**
> (alle anderen Knoten, die schon eine `SIGNAL.json` führen). Sonst nichts ändern.

```text
BRIEFKASTEN LESEN UND ÜBERNEHMEN

AUFGABE: Übernimm den SBKIM-Briefkasten (INTERFACES §11.6) 1:1 in DIESES Repo und in DIESE
PWA/Web-App — nach der Referenz-Umsetzung von Mein-Tresor. Ziel: alle Knoten laufen synchron
und können sich gegenseitig Bauten melden. ANGLEICHEN, NICHT ÜBERSCHREIBEN: falls dieses Repo
schon eine SIGNAL.json mit seq/Verlauf hat, bleibt der bestehende Stand erhalten.

ZUERST LESEN (Pflichtlektüre):
1. Die EIGENE CLAUDE.md + PULS + neuester BRIEF + status.json dieses Repos. Eure Leitplanken
   gelten immer weiter.
2. Die Referenz-Dateien aus Mein-Tresor (roh holen und lesen):
   - https://raw.githubusercontent.com/lausiklauskn-png/Mein-Tresor/main/sbkim/SIGNAL.json
   - https://raw.githubusercontent.com/lausiklauskn-png/Mein-Tresor/main/sbkim/AUSTAUSCH.md
   - https://raw.githubusercontent.com/lausiklauskn-png/Mein-Tresor/main/.github/sbkim-watch.mjs
   - https://raw.githubusercontent.com/lausiklauskn-png/Mein-Tresor/main/.github/workflows/sbkim-watch.yml
   - https://raw.githubusercontent.com/lausiklauskn-png/Mein-Tresor/main/assets/sbkim-siegel-wappen.svg
   - https://raw.githubusercontent.com/lausiklauskn-png/Mein-Tresor/main/index.html
     (Blöcke "=== SBKIM-Briefkasten CONFIG ===" + "=== SBKIM-Briefkasten Logik ===",
      Dialog "#sbkim-mailbox-dialog", "📬 Briefkasten"-Knopf, Siegel-Badge "#sbkim-siegel-badge")

DANN ÜBERNEHMEN (alles additiv, eure Leitplanken bleiben unberührt):
1. sbkim/SIGNAL.json auf dieses Schema bringen (falls noch nicht so):
   { node, seq, headline, mailboxes:{Knoten→AUSTAUSCH-URL}, forNodes:["*"], ack:{Knoten→seq}, history:[] }
   WICHTIG: vorhandene seq/history NICHT zurücksetzen — nur ergänzen und seq +1 für diesen Bau.
2. Pro Nachbar ein Postfach sbkim/AUSTAUSCH-<Nachbar>.md (Muster wie Mein-Tresors AUSTAUSCH*.md:
   Status-Kopf-Tabelle + Verbindungs-Angebot + Verlauf).
3. .github/sbkim-watch.mjs 1:1 übernehmen, NUR die CONFIG anpassen:
   SELF = "<DEIN-KNOTEN-NAME>"; SELF_SIGNAL = "sbkim/SIGNAL.json";
   PEERS = [ <alle anderen Knoten mit SIGNAL.json> ]  (je {name, signal-raw-URL, mailbox-URL}).
4. .github/workflows/sbkim-watch.yml 1:1 übernehmen (Cron "17 7 * * *", permissions contents:read).
5. EIGENE PWA/Web-App: den 📬-Briefkasten-Knopf + Dialog + Badge und das SBKIM-Siegel-Badge
   additiv in die eigene index.html einbauen (window.SBKIM_MAILBOX mit self/selfSignal/peers,
   Funktion sbkimMailboxCheck, beim Laden still prüfen). Siegel-Band auf "<DEIN-KNOTEN-NAME>"
   personalisieren. Falls dieses Repo (noch) KEINE Web-App hat: Schritte 1–4 genügen; den
   PWA-Teil später nachrüsten.
6. ack hochsetzen: jede Nachbar-SIGNAL.json lesen, ack[<Nachbar>] = deren aktuelle seq.
   Alle bestehenden Knoten in deine peers + ack aufnehmen — das macht das Netz symmetrisch.

LEITPLANKEN: additiv; keine Überschreibung bestehender seq/history; echte Krypto bleibt wie sie
ist; kein PII/Secret ins Repo; keine npm-Abhängigkeiten (Wächter nutzt nur Node-fetch); offline.

ABSCHLUSS: Tests grün halten; SIGNAL.json seq +1 mit Schlagzeile pushen (das Pushen IST das
Signal); PULS + neuen Brief schreiben; Commit/Push auf claude/<scope>; Draft-PR. Merge entscheidet Klaus.
```

---

## 2. Knoten-Verzeichnis (Stand 2026-06-07)

Knoten, die **schon** eine `SIGNAL.json` führen (= echte Briefkasten-Peers):

| Knoten | nodeName | `SIGNAL.json`-URL (raw, `…/<Repo>/main/sbkim/SIGNAL.json`) |
|---|---|---|
| Sage-Protokol | `Sage` | `…/Sage-Protokol/…` |
| SB-KIMTool-Point | `SB-KIMTool-Point` | `…/SB-KIMTool-Point/…` |
| Jasons-Tresor | `Jasons-Tresor` | `…/Jasons-Tresor/…` |
| Mein-Tresor | `Mein-Tresor` | `…/Mein-Tresor/…` |

Knoten **ohne** `SIGNAL.json` (erst Spore verifiziert, Postkasten folgt): **Mein-Rezeptbuch**,
**Mein-Mixarium**. Sobald sie diesen Befehl ausgeführt haben, in alle `PEERS`-Listen aufnehmen.

> Die `PEERS`-Liste eines Knotens = **alle anderen** Knoten dieser Tabelle (ohne sich selbst).

---

## 3. Fertige Beispiel-Befehle (nur peers-Liste vorausgefüllt)

### Sage-Protokol
`SELF = "Sage-Protokol"` · `PEERS = [ SB-KIMTool-Point, Jasons-Tresor, Mein-Tresor ]`
(Hinweis: Sage hat §11.6 definiert + führt seq 12 — unbedingt angleichen, NICHT zurücksetzen.)

### SB-KIMTool-Point
`SELF = "SB-KIMTool-Point"` · `PEERS = [ Sage-Protokol, Jasons-Tresor, Mein-Tresor ]`
(Hinweis: führt bereits seq 2 — angleichen, NICHT zurücksetzen.)

### Mein-Rezeptbuch (später)
`SELF = "Mein-Rezeptbuch"` · `PEERS = [ Sage-Protokol, SB-KIMTool-Point, Jasons-Tresor, Mein-Tresor ]`

### Mein-Mixarium (später)
`SELF = "Mein-Mixarium"` · `PEERS = [ Sage-Protokol, SB-KIMTool-Point, Jasons-Tresor, Mein-Tresor ]`

---

## 4. Wichtig (Ehrlichkeit)
- Jeder Knoten integriert den Briefkasten in **sein eigenes Repo UND seine eigene PWA** — der
  📬-Knopf gehört in die jeweilige `index.html`, nicht zentral.
- Reihenfolge nach Klaus: **zuerst Sage-Protokol + SB-KIMTool-Point**, danach Mein-Rezeptbuch +
  Mein-Mixarium. So sind erst die vier SIGNAL-führenden Knoten symmetrisch, dann wächst der Rest an.
- Wer diesen Befehl ausführt, bleibt an **seine eigenen** Leitplanken gebunden; der Briefkasten
  wird **additiv** ergänzt, niemals wird ein bestehender Stand überschrieben.
