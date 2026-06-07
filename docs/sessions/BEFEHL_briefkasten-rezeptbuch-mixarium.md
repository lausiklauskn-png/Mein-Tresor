# BEFEHL — Briefkasten bauen für Mein-Rezeptbuch + Mein-Mixarium

> Auslöse-Satz: **„Briefkasten lesen und bauen"**. Diese Datei hält die zwei fertigen Befehle
> dauerhaft fest, mit denen Klaus den **kompletten** SBKIM-Briefkasten in **Mein-Rezeptbuch**
> (zuerst) und **Mein-Mixarium** baut. Klaus fügt den jeweiligen Block in die Session des
> Ziel-Repos ein.
>
> Das Paket = Bauplan (5 Teile + Live-Cosinus-Match) **plus** die neueren Mein-Tresor-Vorzüge:
> **Auto-Issue-Wächter**, **Gold-Zähler am geschlossenen 📬-Knopf**, SBKIM-Siegel.
> Referenz/Quelle: `lausiklauskn-png/Mein-Tresor` (`main`).

Stand: 2026-06-07

---

## ① Befehl für die Mein-Rezeptbuch-Session

```text
BRIEFKASTEN LESEN UND BAUEN — vollständiges SBKIM-Briefkasten-Paket übernehmen

AUFGABE: Baue in DIESES Repo (Mein-Rezeptbuch) und in DIESE PWA den kompletten SBKIM-Briefkasten,
1:1 nach der Referenz-Umsetzung von Mein-Tresor. Ziel: alle Knoten laufen gleich + synchron.
ANGLEICHEN, NICHT ÜBERSCHREIBEN: falls hier schon etwas existiert, bestehenden Stand bewahren.

ZUERST LESEN (Pflichtlektüre):
1. Eure EIGENE CLAUDE.md + PULS + neuester BRIEF + status.json. Eure Leitplanken gelten weiter.
2. Die Referenz-Dateien aus Mein-Tresor (roh holen + lesen):
   - Bauplan mit komplettem Code (5 Teile + Live-Cosinus-Match):
     https://raw.githubusercontent.com/lausiklauskn-png/Mein-Tresor/main/docs/sessions/BRIEF_briefkasten-bauplan.md
   - Auto-Issue-Wächter:
     https://raw.githubusercontent.com/lausiklauskn-png/Mein-Tresor/main/.github/sbkim-watch.mjs
     https://raw.githubusercontent.com/lausiklauskn-png/Mein-Tresor/main/.github/workflows/sbkim-watch.yml
   - Siegel-Wappen: https://raw.githubusercontent.com/lausiklauskn-png/Mein-Tresor/main/assets/sbkim-siegel-wappen.svg
   - Gold-Zähler + 📬-Knopf im Gesicht (in index.html: Block "SBKIM-Briefkasten CONFIG"/"Logik",
     Dialog "#sbkim-mailbox-dialog", Button "mt-room-mail" + Badge "mt-room-mail-badge"):
     https://raw.githubusercontent.com/lausiklauskn-png/Mein-Tresor/main/index.html
   - Netz-Konvention: https://raw.githubusercontent.com/lausiklauskn-png/Mein-Tresor/main/docs/SYNC-VEREINBARUNG.md

DANN BAUEN (alles additiv; Krypto/Logik byte-gleich, nur CONFIG anpassen):
1. sbkim/SIGNAL.json NEU anlegen (ihr habt noch keins → erscheint im Netz als "kein SIGNAL/404"):
   { node:"Mein-Rezeptbuch", seq:1, lastBuild, headline, sporeUrl, nodeId,
     mailboxes:{Knoten→AUSTAUSCH-URL}, forNodes:["*"], ack:{Knoten→seq}, history:[] }
2. Pro Nachbar ein Postfach sbkim/AUSTAUSCH-<Nachbar>.md (Status-Kopf + Nachricht + Verlauf).
3. 📬-Briefkasten ins Gesicht (index.html) einbauen — Knopf + Dialog + CONFIG + Logik (sbkimMailboxCheck,
   sbkimCosine) byte-gleich aus dem Bauplan; dazu den GOLD-ZÄHLER am geschlossenen Knopf
   (Badge-Element + CSS, zeigt Anzahl neuer/unbearbeiteter Briefe = seq>ack) und das SBKIM-Siegel.
   CONFIG anpassen: self="Mein-Rezeptbuch", selfSignal/selfSpore = eure Pfade.
4. Auto-Issue-Wächter: .github/sbkim-watch.mjs + .github/workflows/sbkim-watch.yml 1:1 übernehmen,
   CONFIG SELF="Mein-Rezeptbuch" + PEERS = alle anderen Knoten. (Workflow: issues:write, Cron 0 */6 + Run-Knopf.)
5. PEERS / peers-Liste (alle anderen, ihr lasst euch selbst weg):
   Sage-Protokol · SB-KIMTool-Point · Jasons-Tresor · Mein-Tresor · Mein-Mixarium
   (je SIGNAL-raw-URL …/<Repo>/main/sbkim/SIGNAL.json; Spore analog …/sbkim/spore.json)
6. Daten-Dateien: pro Nachbar dessen geprüfte Spore holen (scripts/verify_foreign_spore.mjs → ✔ VALID)
   und als sbkim/<name>_inbox.json (byte-1:1) ablegen. Eure eigene spore.json mit echtem domainVector
   (384-dim, multilingual-e5-small) — falls noch nicht, im Browser einbetten + neu signieren.
7. ack quittieren: jede Nachbar-SIGNAL.json lesen, ack[<Nachbar>] = deren seq.

EHRLICHKEIT: Match wird LIVE im Browser gerechnet (Cosinus, ≥0.80 = verified-match). Da Rezeptbuch eine
ANDERE Domäne als die Tresore hat, darf ein Wert unter 0.80 stehen — das ehrlich so zeigen, nichts
grün-rechnen. Additiv; bestehende seq/history nie zurücksetzen; echte Krypto; kein PII/Secret; keine
npm-Abhängigkeiten (Wächter nutzt nur Node-fetch); offline.

ABSCHLUSS: npm test grün halten; sbkim/SIGNAL.json pushen (das Pushen IST das Signal); PULS + neuen
Brief schreiben; Commit/Push auf claude/<scope>; Draft-PR mit Test-Plan. Merge entscheidet Klaus.
```

---

## ② Befehl für die Mein-Mixarium-Session (für danach)

```text
BRIEFKASTEN LESEN UND BAUEN — vollständiges SBKIM-Briefkasten-Paket übernehmen

AUFGABE: Baue in DIESES Repo (Mein-Mixarium) und in DIESE PWA den kompletten SBKIM-Briefkasten,
1:1 nach der Referenz-Umsetzung von Mein-Tresor. Ziel: alle Knoten laufen gleich + synchron.
ANGLEICHEN, NICHT ÜBERSCHREIBEN: falls hier schon etwas existiert, bestehenden Stand bewahren.

ZUERST LESEN (Pflichtlektüre):
1. Eure EIGENE CLAUDE.md + PULS + neuester BRIEF + status.json. Eure Leitplanken gelten weiter.
2. Die Referenz-Dateien aus Mein-Tresor (roh holen + lesen):
   - Bauplan mit komplettem Code (5 Teile + Live-Cosinus-Match):
     https://raw.githubusercontent.com/lausiklauskn-png/Mein-Tresor/main/docs/sessions/BRIEF_briefkasten-bauplan.md
   - Auto-Issue-Wächter:
     https://raw.githubusercontent.com/lausiklauskn-png/Mein-Tresor/main/.github/sbkim-watch.mjs
     https://raw.githubusercontent.com/lausiklauskn-png/Mein-Tresor/main/.github/workflows/sbkim-watch.yml
   - Siegel-Wappen: https://raw.githubusercontent.com/lausiklauskn-png/Mein-Tresor/main/assets/sbkim-siegel-wappen.svg
   - Gold-Zähler + 📬-Knopf im Gesicht (in index.html: Block "SBKIM-Briefkasten CONFIG"/"Logik",
     Dialog "#sbkim-mailbox-dialog", Button "mt-room-mail" + Badge "mt-room-mail-badge"):
     https://raw.githubusercontent.com/lausiklauskn-png/Mein-Tresor/main/index.html
   - Netz-Konvention: https://raw.githubusercontent.com/lausiklauskn-png/Mein-Tresor/main/docs/SYNC-VEREINBARUNG.md

DANN BAUEN (alles additiv; Krypto/Logik byte-gleich, nur CONFIG anpassen):
1. sbkim/SIGNAL.json NEU anlegen (ihr habt noch keins → erscheint im Netz als "kein SIGNAL/404"):
   { node:"Mein-Mixarium", seq:1, lastBuild, headline, sporeUrl, nodeId,
     mailboxes:{Knoten→AUSTAUSCH-URL}, forNodes:["*"], ack:{Knoten→seq}, history:[] }
2. Pro Nachbar ein Postfach sbkim/AUSTAUSCH-<Nachbar>.md (Status-Kopf + Nachricht + Verlauf).
3. 📬-Briefkasten ins Gesicht (index.html) einbauen — Knopf + Dialog + CONFIG + Logik (sbkimMailboxCheck,
   sbkimCosine) byte-gleich aus dem Bauplan; dazu den GOLD-ZÄHLER am geschlossenen Knopf
   (Badge-Element + CSS, zeigt Anzahl neuer/unbearbeiteter Briefe = seq>ack) und das SBKIM-Siegel.
   CONFIG anpassen: self="Mein-Mixarium", selfSignal/selfSpore = eure Pfade.
4. Auto-Issue-Wächter: .github/sbkim-watch.mjs + .github/workflows/sbkim-watch.yml 1:1 übernehmen,
   CONFIG SELF="Mein-Mixarium" + PEERS = alle anderen Knoten. (Workflow: issues:write, Cron 0 */6 + Run-Knopf.)
5. PEERS / peers-Liste (alle anderen, ihr lasst euch selbst weg):
   Sage-Protokol · SB-KIMTool-Point · Jasons-Tresor · Mein-Tresor · Mein-Rezeptbuch
   (je SIGNAL-raw-URL …/<Repo>/main/sbkim/SIGNAL.json; Spore analog …/sbkim/spore.json)
6. Daten-Dateien: pro Nachbar dessen geprüfte Spore holen (scripts/verify_foreign_spore.mjs → ✔ VALID)
   und als sbkim/<name>_inbox.json (byte-1:1) ablegen. Eure eigene spore.json mit echtem domainVector
   (384-dim, multilingual-e5-small) — falls noch nicht, im Browser einbetten + neu signieren.
7. ack quittieren: jede Nachbar-SIGNAL.json lesen, ack[<Nachbar>] = deren seq.

EHRLICHKEIT: Match wird LIVE im Browser gerechnet (Cosinus, ≥0.80 = verified-match). Mixarium hat eine
ANDERE Domäne als die Tresore (Match mit Mein-Tresor lag live bei 0.7884, ehrlich unter 0.80) — das so
zeigen, nichts grün-rechnen. Additiv; bestehende seq/history nie zurücksetzen; echte Krypto; kein
PII/Secret; keine npm-Abhängigkeiten; offline.

ABSCHLUSS: npm test grün halten; sbkim/SIGNAL.json pushen (das Pushen IST das Signal); PULS + neuen
Brief schreiben; Commit/Push auf claude/<scope>; Draft-PR mit Test-Plan. Merge entscheidet Klaus.
```

---

## Nachgang bei Mein-Tresor (wir)
Sobald Mein-Rezeptbuch bzw. Mein-Mixarium ein eigenes `sbkim/SIGNAL.json` hat, entfällt deren
„kein SIGNAL (404)". Dann beide in unsere Wächter-`PEERS` (`.github/sbkim-watch.mjs`) aufnehmen,
damit auch ihr Gold-Zähler/Auto-Issue greift, und reziprok quittieren.
