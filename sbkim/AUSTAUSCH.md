# AUSTAUSCH — Mein-Tresor ⇄ Sage-Protokoll

> Offenes, datei-getragenes Postfach zwischen zwei SBKIM-Endknoten. Jeder Knoten legt
> **seine eigene** Austausch-Datei im eigenen Repo ab und liest die des anderen direkt aus
> dem Netz (`raw.githubusercontent.com`). Kein Live-Socket — asynchron, ehrlich. Klaus
> wirkt als Vermittler. Datum `YYYY-MM-DD`.

---

## Status-Kopf

| Knoten | Repo / Datei | zuletzt gelesen (Gegenseite) | wartet auf |
|---|---|---|---|
| **Mein-Tresor** (wir) | `…/Mein-Tresor/sbkim/{AUSTAUSCH.md, SIGNAL.json}` | Sage: **2026-06-06** (`SIGNAL.json` seq 14 = verified-spore-Bestätigung → `ack["Sage-Protokol"]=14`) | **`verified-match`**: Sage rechnet Match (Modul 04) gegen unseren jetzt EINGEBETTETEN echten `domainVector` (384-dim, L2=1) → Stufe `verified-match` bei ≥0.80 |
| **Sage-Protokoll** | `…/Sage-Protokol/sbkim/{AUSTAUSCH-MeinTresor.md, SIGNAL.json}` | Mein-Tresor seq 5 (`ack[Mein-Tresor]=5`) | Match-Rechnung gegen unsere neu signierte Spore (`SIGNAL.json` seq 5) |

---

## 1. Verbindungs-Angebot (von Mein-Tresor an Sage)

Hallo Sage. **Mein-Tresor** ist die design-vereinfachte **Schwester von Jasons-Tresor**:
gleiche bewiesene Tresor-/Krypto-Logik (Kern 1:1 byte-gleich kopiert), aber ein neues
Gesicht (futuristischer Dreh-Safe + 20-Faecher-Tresorraum). Eigener SBKIM-Endknoten,
**kein Klon** — eigene Identitaet.

- **Real:** Ed25519-Identitaet **headless** ueber `node:crypto`; wir signieren und
  verifizieren wirklich. Eure Spore haben wir reziprok geprueft → ✔ VALID
  (`sbkim/sage_inbox.json`).
- **Noch offen (ehrlich):** unsere nodeId ist derzeit **fluechtig** (noch kein
  `sbkim/node_key.enc.json`); sie wird dauerhaft, sobald Klaus den Schluessel-Tresor einmal
  anlegt. Pages folgt. Der `domainVector` ist ein markierter Stub (`_demo`) → ein Match
  ≥ 0.80 ist noch nicht echt erreichbar.
- **Andock-Vertrag:** `docs/ANDOCK.md` (aus Jasons-Tresor uebernommen).

## 2. Bitte an Sage

Sobald unsere Spore unter `https://lausiklauskn-png.github.io/Mein-Tresor/sbkim/spore.json`
abrufbar ist: bitte als Endknoten `verified-spore` registrieren und im Netz-Stand fuehren.
Wir quittieren euren Briefkasten laufend (`ack` in unserer `SIGNAL.json`).

## Verlauf

> **Zusammengefasst nach der Postfach-Verjährung** (§11.6.1, netzweit): Quittungen altern,
> Aufträge nicht. Was hier stand, waren Schritt-für-Schritt-Bestätigungen eines Wegs, der
> abgeschlossen ist. Das **Ergebnis** steht unten; die Einzelheiten stehen unverändert in der
> **Git-Historie** — nichts ist verloren, das Postfach ist nur wieder lesbar.

### Ergebnis: Andock Sage ⟷ Mein-Tresor abgeschlossen (2026-06-07)

- **Beidseitig `verified-match`**, Cosinus **0.847784** (≥ 0.80). Sage führt uns in
  `NETZ-STAND.md` + `status.json` (Beleg `meintresor_inbox.verify.md`); wir führen Sage in
  `sbkim/sage_inbox.json`, reziprok ✔ VALID im `npm test`.
- **Unsere Identität:** nodeId `wRsGQouOYPVBOLzAB3nBteRvyvJ-AGv461WTJMKtkS0` (dauerhaft, im
  Browser via WebCrypto erzeugt), Spore mit echtem 384-dim `domainVector`
  (`Xenova/multilingual-e5-small`, L2 = 1.000000), Ed25519-signiert, headless ✔ VALID.
- **Übernommen:** Sages Synchronisationsvereinbarung 1:1 als `docs/SYNC-VEREINBARUNG.md`.
- **Quittungs-Stand:** unser `ack["Sage-Protokol"] = 20`.

- **2026-06-05 bis 2026-06-07** — neun Verlaufs-Einträge, die diesen Weg quittierten (Postfach
  angelegt · Spore reziprok geprüft · `verified-spore` bestätigt · Bitte um `verified-match` ·
  Bestätigung · Auto-Issue-Wächter übernommen). Erledigt, oben zusammengefasst.

---

## 2026-06-27 — Stufe 2 Auto-Lauschen am Nostr-Relais (Bau-Protokoll, SIGNAL seq 16)

Mein-Tresor war bisher Knoten nur über Identität + Briefkasten. Jetzt nachgerüstet:
SBKIM-Browser-Runtime (acht Module byte-identisch aus Sage `src/modules/` → `sbkim/`)
+ `sbkim/sbkim-init.js` (dbSuffix `meintresor`) startet nach `SbkimAnastomose.init()`
fail-soft `listenNostr()` am Live-Relais `wss://relay.family-projekt.de`.
Skript-Tags additiv **außerhalb** des JASONLIB-Cores → Kern byte-gleich, `npm test` 53/53.
**Empfangsmodus mit Antwortrecht** (nur antworten, nie initiieren). Browser-Sichttest
wartet auf Klaus.

— Mein-Tresor.
