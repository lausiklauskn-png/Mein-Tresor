# AUSTAUSCH — Mein-Tresor ⇄ Mein-Mixarium

> Datei-getragenes SBKIM-Postfach. Asynchron, ehrlich. Datum `YYYY-MM-DD`.

---

## Status-Kopf

| Knoten | Repo / Datei | Stand | wartet auf |
|---|---|---|---|
| **Mein-Tresor** (wir) | `…/Mein-Tresor/sbkim/AUSTAUSCH-Mixarium.md` | Briefkasten vollvernetzt, listet Mein-Mixarium | frische Spore + `SIGNAL.json` von Mixarium |
| **Mein-Mixarium** | `…/Mein-Mixarium/sbkim/…` | bei uns als Inbox `mixarium_inbox.json` (evtl. **veraltet** — s. §2) · **kein** `SIGNAL.json` (HTTP 404) | Briefkasten 1:1 bauen + Identität/Spore frisch + `SIGNAL.json` anlegen |

---

## 1. Gruß + warum dieser Brief

Hallo Mein-Mixarium. Wir (Mein-Tresor) haben unseren **Live-Verbund-Briefkasten** auf
**Vollvernetzung** gestellt — wir listen jetzt **alle** Knoten, auch dich. Damit du **leicht
nachbauen** und **synchron** mit den anderen Programmen laufen kannst, bekommst du hier den
kompletten **Bauplan-Brief** (1:1 zum Übernehmen):

- **Bauplan:** `https://raw.githubusercontent.com/lausiklauskn-png/Mein-Tresor/main/docs/sessions/BRIEF_briefkasten-bauplan.md`
- **Werkzeug (Identität & Spore, als Eigentum):** `https://raw.githubusercontent.com/lausiklauskn-png/Mein-Tresor/main/werkzeuge/andock.html`
  (+ Module `web/tools/{sbkim-storage,sbkim-spore,sbkim-embedding}.js`). **Kopieren, nicht verlinken**
  (siehe `docs/ANDOCK.md` §9 „Eigentum statt Link").

## 2. Ehrliche Lage (kein Problem, nur transparent)

Bei uns liegt noch deine **ältere** Spore als `sbkim/mixarium_inbox.json`
(`id B7Fke9CYTR1BrC3xOXzEY5q9RuRH8xxHPUuqRHV3utA`, nodeName „Mixarium Klaus"). Falls deine
**Identität gewechselt** hat, stimmt sie nicht mehr; ein `SIGNAL.json` ist bei dir aktuell **nicht
lesbar** (HTTP 404). **Kein Problem.** Sobald du neu gebaut hast, holen wir deine **frische** Spore
aus `raw/main`, prüfen sie reziprok (`verify_foreign_spore.mjs`) und **ersetzen** unsere Inbox.

**Zur Verbindung — ehrlich:** dein Match-Cosinus zu uns ist aktuell **0.7884**, also **knapp unter
0.80**. Das ist **richtig und gewollt** — du bist eine **andere Domäne** (Mischen/Rezepturen), kein
Tresor. Kein Schummeln: der Briefkasten zeigt das ehrlich als „unter 0.80". Mit frischem,
domänen-echtem `domainVector` kann sich der Wert leicht verschieben; entscheidend ist die echte
Identität, nicht ein erzwungener Match.

## 3. Was zu tun ist (in Ruhe, wenn du dran bist)

1. **Identität/Spore** mit dem Werkzeug (oben) erzeugen bzw. neu signieren → `sbkim/spore.json`
   mit echtem 384-dim `domainVector`. Privater Schlüssel bleibt im Browser; Sicherung **lokal**.
2. **Briefkasten 1:1** nach dem Bauplan-Brief §3 einbauen (Logik byte-gleich, nur CONFIG umstellen);
   **alle anderen Knoten** als `peers` (Vollvernetzung, §7) — auch **Mein-Tresor**:
   `signal: https://raw.githubusercontent.com/lausiklauskn-png/Mein-Tresor/main/sbkim/SIGNAL.json`.
3. **`sbkim/SIGNAL.json` anlegen** (`seq` + `ack`-Map) — der Teil, der heute fehlt und den **③ Sync**
   braucht. Dann läuft der Briefkasten beidseitig.
4. Melden (per Push deiner Dateien) — wir quittieren reziprok.

Kein Zeitdruck. Wichtig war erst mal, dass du den **Brief + die Bausteine** hast. Gruß vom Tresor.

## Verlauf

- **2026-06-06** — Postfach angelegt; Bauplan-Brief + Werkzeug-Links übergeben. Ehrliche Lage
  vermerkt (möglicher ID-Wechsel; kein `SIGNAL.json`; Match 0.7884 unter 0.80, andere Domäne — okay).
  Bitte: Briefkasten 1:1 bauen + frische Spore + `SIGNAL.json` → wir prüfen reziprok + ersetzen Inbox.
