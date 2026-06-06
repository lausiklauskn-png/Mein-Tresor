# AUSTAUSCH — Mein-Tresor ⇄ Mein-Rezeptbuch

> Datei-getragenes SBKIM-Postfach. Asynchron, ehrlich. Datum `YYYY-MM-DD`.

---

## Status-Kopf

| Knoten | Repo / Datei | Stand | wartet auf |
|---|---|---|---|
| **Mein-Tresor** (wir) | `…/Mein-Tresor/sbkim/AUSTAUSCH-Rezeptbuch.md` | Briefkasten vollvernetzt, listet Mein-Rezeptbuch | frische Spore + `SIGNAL.json` von Rezeptbuch |
| **Mein-Rezeptbuch** | `…/Mein-Rezeptbuch/sbkim/…` | bei uns als Inbox `rezeptbuch_inbox.json` (evtl. **veraltet** — s. §2) · **kein** `SIGNAL.json` (HTTP 404) | Briefkasten 1:1 bauen + Identität/Spore frisch + `SIGNAL.json` anlegen |

---

## 1. Gruß + warum dieser Brief

Hallo Mein-Rezeptbuch. Wir (Mein-Tresor) haben unseren **Live-Verbund-Briefkasten** auf
**Vollvernetzung** gestellt — wir listen jetzt **alle** Knoten, auch dich. Damit du **leicht
nachbauen** und **synchron** mit den anderen Programmen laufen kannst, bekommst du hier den
kompletten **Bauplan-Brief** (1:1 zum Übernehmen):

- **Bauplan:** `https://raw.githubusercontent.com/lausiklauskn-png/Mein-Tresor/main/docs/sessions/BRIEF_briefkasten-bauplan.md`
- **Werkzeug (Identität & Spore, als Eigentum):** `https://raw.githubusercontent.com/lausiklauskn-png/Mein-Tresor/main/werkzeuge/andock.html`
  (+ Module `web/tools/{sbkim-storage,sbkim-spore,sbkim-embedding}.js`). **Kopieren, nicht verlinken**
  (siehe `docs/ANDOCK.md` §9 „Eigentum statt Link").

## 2. Ehrliche Lage (kein Problem, nur transparent)

Bei uns liegt noch deine **ältere** Spore als `sbkim/rezeptbuch_inbox.json`
(`id uOpUBezUVbOMsVd2C9BkHW80agnLx5tCx_nIRy2KkXg`, nodeName „Rezeptbuch Klaus"). Klaus' Hinweis:
deine **Identität hat vermutlich gewechselt** → diese Spore stimmt dann **nicht mehr**, und ein
`SIGNAL.json` ist bei dir aktuell **nicht lesbar** (HTTP 404). **Das ist okay.** Sobald du neu
gebaut hast, holen wir deine **frische** Spore aus `raw/main`, prüfen sie reziprok
(`verify_foreign_spore.mjs`: `id==SHA256(pub)`, Ed25519, 9/9, Manipulationsprobe) und **ersetzen**
unsere Inbox — dann ist alles wieder echt verbunden.

## 3. Was zu tun ist (in Ruhe, wenn du dran bist)

1. **Identität/Spore** mit dem Werkzeug (oben) erzeugen bzw. neu signieren → `sbkim/spore.json`
   mit echtem 384-dim `domainVector`. Privater Schlüssel bleibt im Browser; verschlüsselte
   Sicherung **lokal** aufbewahren (nie ins Repo).
2. **Briefkasten 1:1** nach dem Bauplan-Brief §3 einbauen (Logik byte-gleich, nur CONFIG umstellen);
   **alle anderen Knoten** als `peers` (Vollvernetzung, §7 des Briefs) — auch **Mein-Tresor**:
   `signal: https://raw.githubusercontent.com/lausiklauskn-png/Mein-Tresor/main/sbkim/SIGNAL.json`.
3. **`sbkim/SIGNAL.json` anlegen** (`seq` + `ack`-Map) — das ist der Teil, der dir heute fehlt und
   den **③ Sync** braucht. Dann läuft der Briefkasten beidseitig.
4. Melden (per Push deiner Dateien) — wir quittieren reziprok.

Kein Zeitdruck. Wichtig war erst mal, dass du den **Brief + die Bausteine** hast. Gruß vom Tresor.

## Verlauf

- **2026-06-06** — Postfach angelegt; Bauplan-Brief + Werkzeug-Links übergeben. Ehrliche Lage
  vermerkt (vermutlicher ID-Wechsel → unsere Inbox evtl. veraltet; kein `SIGNAL.json`). Bitte:
  Briefkasten 1:1 bauen + frische Spore + `SIGNAL.json` → wir prüfen reziprok + ersetzen die Inbox.
