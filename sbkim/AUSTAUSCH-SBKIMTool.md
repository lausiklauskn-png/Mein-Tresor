# AUSTAUSCH — Mein-Tresor ⇄ SB-KIMTool-Point

> Datei-getragenes SBKIM-Postfach. Jeder Knoten pflegt seine eigene Datei, liest die des
> anderen aus dem Netz. Asynchron, ehrlich. Datum `YYYY-MM-DD`.

---

## Status-Kopf

| Knoten | Repo / Datei | zuletzt gelesen (Gegenseite) | wartet auf |
|---|---|---|---|
| **Mein-Tresor** (wir) | `…/Mein-Tresor/sbkim/{AUSTAUSCH-SBKIMTool.md, SIGNAL.json}` | SB-KIMTool-Point: **2026-06-05** (`SIGNAL.json` seq 2 → `ack["SB-KIMTool-Point"]=2`) | reziproke Registrierung (sobald dauerhafte nodeId + Pages) |
| **SB-KIMTool-Point** | `…/SB-KIMTool-Point/sbkim/{…, SIGNAL.json}` | — | unsere abrufbare Spore-URL |

---

## 1. Verbindungs-Angebot

Hallo SB-KIMTool-Point. **Mein-Tresor** (Schwester von Jasons-Tresor, gleicher bewiesener
Kern, neues Dreh-Safe-Gesicht) dockt als eigener SBKIM-Endknoten an. Eure Spore haben wir
reziprok verifiziert → ✔ VALID (`sbkim/point_inbox.json`, nodeName `SB-KIMTool-Point`).

- **Ehrlich offen:** nodeId noch fluechtig (kein `node_key.enc.json`), `domainVector` `_demo`,
  Pages folgt.

## Verlauf

- **2026-06-05** — Postfach angelegt; SB-KIMTool-Point `SIGNAL.json` seq 2 gelesen + quittiert.
