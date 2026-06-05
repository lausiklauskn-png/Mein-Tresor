# PULS.md — Lebender Übergabe-Stand (Mein-Tresor)

> Kurz-Puls für den nächsten Sitzungsstart: **was getan, was offen, nächste Schritte.**
> Wahrheitsquelle für den Real-Anteil bleibt `status.json`. Datum `YYYY-MM-DD`.

## Stand: 2026-06-05 — Bootstrap (erste Sitzung)

### Getan
- **Pflichtlektüre** aus dem (jetzt öffentlichen) Jasons-Tresor `main` geholt + gelesen.
- **Kern + Tests 1:1 kopiert.** JasonLib-Kern zwischen den Markern ist **byte-gleich** zu
  Jasons-Tresor (sha256 `a98a704c…be98a3`); Wurzel `index.html` == Spiegel
  `jasons-bibliothek/index.html` im Kern. **`npm test` 51/51 grün.**
- **Identität (CONFIG) auf Mein-Tresor umgestellt:** `generate_spore.mjs` (nodeName/domain/
  endpoint `…github.io/Mein-Tresor/`), `package.json` Name, `andock.test.js` nodeName.
  Eigene **Spore erzeugt + verifiziert → ✔ VALID** (noch flüchtig, `_demo` domainVector).
- **Briefkasten + Sync:** `sbkim/SIGNAL.json` (seq 1), drei `AUSTAUSCH*.md`-Postfächer,
  Mailbox-Knopf-CONFIG (self `Mein-Tresor`, Peers Sage/SB-KIMTool-Point/**Jasons-Tresor**),
  Wächter `.github/sbkim-watch.mjs` (SELF/PEERS angepasst, Cron `17 7 * * *`).
  Nachbarn-Stand gelesen + quittiert: Sage 12, SB-KIMTool-Point 2, Jasons-Tresor 2.
- **Ehrliche `status.json`** geschrieben (Real-Anteil ~45 %), Verfassung `CLAUDE.md`,
  `README.md`, Gründungs-Auftrag `docs/sessions/BRIEF_start.md`.
- **NICHT kopiert (bewusst):** Jasons-Tresor-Secret `node_key.enc.json` (eigene Identität)
  und Jasons Sitzungs-Historie.

### Offen / wartet auf Klaus
1. **Dauerhafte Identität:** `SBKIM_KEY_PW='<Passwort>' npm run key` → `node_key.enc.json` +
   stabile nodeId; danach Spore neu signieren. (Passwort/Schlüssel **nie** ins Repo.)
2. **GitHub Pages** (main/root) aktivieren → Spore + App unter `…github.io/Mein-Tresor/`.
3. **Die 4 echten Bilder** für das neue Gesicht (Safe-Front, Drehrad, Tresorwand, ein Fach).
4. **Browser-Lauf** von Klaus (Tresor öffnen, Datei laden, verschließen) in Hoch- + Querformat.

### Nächste Schritte (priorisiert)
1. **Schale bauen (Dreh-Safe + 20 Fächer)** — *erst* nach Klaus' 4 Bildern + Plan-vor-Code.
   Das ist das eigentliche neue Gesicht; bis dahin Platzhalter = Jasons-Tresor-Schale.
2. **Identität dauerhaft machen + Pages** — danach bei Sage/SB-KIMTool-Point/Jasons-Tresor
   melden, damit sie uns reziprok als Endknoten registrieren.
3. **Browser-Verifikation** in beiden Lagen (Klaus' Sichtprüfung) → status.json fortschreiben.
