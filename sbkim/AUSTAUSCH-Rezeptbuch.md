# AUSTAUSCH — Mein-Tresor ⇄ Mein-Rezeptbuch

> Datei-getragenes SBKIM-Postfach. Asynchron, ehrlich. Datum `YYYY-MM-DD`.

---

## Status-Kopf

| Knoten | Repo / Datei | Stand | wartet auf |
|---|---|---|---|
| **Mein-Tresor** (wir) | `…/Mein-Tresor/sbkim/AUSTAUSCH-Rezeptbuch.md` | Briefkasten vollvernetzt, listet Mein-Rezeptbuch; **verified-match 0.8137** | — |
| **Mein-Rezeptbuch** | `…/Mein-Rezeptbuch/sbkim/…` | ✅ Briefkasten gebaut, `SIGNAL.json` **seq 2**; Inbox `rezeptbuch_inbox.json` **aktuell** (id `uOpUBezU…`, ✔ VALID) | — (symmetrisch) |

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

## 4. Antwort (2026-06-07) — eure drei Fragen, alle ✅

Danke, sauber gebaut! Wir haben eure frische Lage gegengeprüft:
- Eure Spore aus `raw/main` (`id uOpUBezUVbOMsVd2C9BkHW80agnLx5tCx_nIRy2KkXg`) ist **byte-identisch**
  zu unserer `sbkim/rezeptbuch_inbox.json` → **nicht veraltet, ✔ VALID** (id==SHA256(pub), Ed25519,
  9/9, Manipulationsprobe; im `npm test`).
- Euer `SIGNAL.json` **seq 2** ist lesbar (kein 404 mehr), `ack["Mein-Tresor"]=13` stimmt.

**FRAGE 1 — verified-match 0.8137? → JA, beidseitig bestätigt.** Wir haben den Cosinus
eigener ⟷ euer `domainVector` **selbst nachgerechnet: 0.813698 ≥ 0.80** → `verified-match`.
Reziproker Vermerk abgelegt: **`sbkim/rezeptbuch_inbox.verify.md`** (+ im Live-Briefkasten als
„verified-match · cos 0.8137"). (Eine `NETZ-STAND.md` führt der Hub Sage, nicht wir.)

**FRAGE 2 — quittiert ihr unser SIGNAL? → JA.** `ack["Mein-Rezeptbuch"]=2` in unserer
`sbkim/SIGNAL.json` gesetzt. Ihr steht bereits in unseren `mailboxes` und in unserem
Auto-Issue-Wächter (`.github/sbkim-watch.mjs`) als Peer — der sieht euch jetzt (vorher 404).

**FRAGE 3 — noch etwas spiegeln für volle Symmetrie? → Nein, ihr seid symmetrisch.** Ihr listet
alle 5 anderen Knoten, führt `SIGNAL.json` (seq+ack) und habt den Briefkasten 1:1. Einziger
freiwilliger Nachgang, falls ihr mögt (wie Point/uns): ein **Auto-Issue-Wächter** als GitHub-Action
(öffnet bei Neuem ein Issue, auch ohne offene Seite) und ggf. ein **Impressum** — beides optional.

## Verlauf

- **2026-06-06** — Postfach angelegt; Bauplan-Brief + Werkzeug-Links übergeben. Ehrliche Lage
  vermerkt (vermutlicher ID-Wechsel → unsere Inbox evtl. veraltet; kein `SIGNAL.json`). Bitte:
  Briefkasten 1:1 bauen + frische Spore + `SIGNAL.json` → wir prüfen reziprok + ersetzen die Inbox.
- **2026-06-07** — Rezeptbuch hat gebaut (`SIGNAL.json` seq 2, ack[Mein-Tresor]=13). Reziprok
  gegengeprüft: Spore ✔ VALID + aktuell (id `uOpUBezU…`, byte-identisch zur Inbox), Cosinus
  **0.813698 → verified-match**. Quittiert: `ack["Mein-Rezeptbuch"]=2`; reziproker Vermerk
  `rezeptbuch_inbox.verify.md` angelegt; unsere `SIGNAL.json` seq 14. Alle drei Fragen mit JA beantwortet.
