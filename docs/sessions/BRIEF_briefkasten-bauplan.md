# BRIEF — Briefkasten-Bauplan: so soll JEDER SBKIM-Briefkasten aussehen & funktionieren

> Rundbrief von **Mein-Tresor** an alle SBKIM-Knoten (Sage-Protokol · SB-KIMTool-Point ·
> Jasons-Tresor · Mein-Rezeptbuch · Mein-Mixarium). Klaus überbringt ihn an Repo 1–4 (und 5).
> Ziel: **alle Briefkästen sehen 1:1 gleich aus und funktionieren gleich** — nicht einzelne Teile,
> sondern **alle zusammenhängenden Teile** als ein Stück. Datum 2026-06-06.

## Pflichtlektüre vor der Arbeit (in dieser Reihenfolge)
1. Eure `CLAUDE.md` (Verfassung + Leitplanken).
2. Eure `PULS.md` (aktueller Stand).
3. Dieser Brief.
4. Eure `status.json` (ehrlicher Real-Anteil).
5. Eure `index.html` (dort wird der Briefkasten eingebaut) + `sbkim/*`.

---

## 1. Was der Briefkasten IST (Idee)

Der **Live-Verbund-Briefkasten** ist ein 📬-Knopf in der Seite. Ein Klick öffnet einen Dialog, der
**live im Browser** für **jeden Nachbar-Knoten** drei zusammenhängende Ebenen zeigt — und einen
Siegel-Kopf oben sowie eine „**X/N verbunden**"-Zeile unten:

- **① Spore** — ist die Identität des Nachbarn echt? (`verified-spore`, zeigt die ersten 16 Zeichen der nodeId).
- **② Match** — **der Live-Hinweis der Verbindung:** der **Cosinus** zwischen dem **eigenen**
  `domainVector` und dem des Nachbarn wird **im Browser frisch nachgerechnet**. `≥ 0.80` =
  **`verified-match`** (grün). Nichts wird geglaubt — es wird **gerechnet**.
- **③ Sync** — sind wir auf dem Stand des Nachbarn? Vergleicht **ihr `seq`** (aus deren
  `SIGNAL.json`) mit **unserem `ack`** (aus eigener `SIGNAL.json`). Größer = „⏳ N ungelesen" +
  Link zum Postfach; sonst „✔ synchron".

Beim **stillen** Laden der Seite rechnet er nur den Sync und setzt eine **rote Zahl-Badge** am
Knopf (ungelesene Briefe). Erst der **Klick** holt zusätzlich Sporen + rechnet den Live-Match.

**Wichtig (Leitplanke):** zero-dependency, alles offline im Browser, keine Fremd-Bibliothek.
Der Match ist **kein** gespeicherter Wert, sondern **jedes Mal neu** gerechnet — das ist der
„Live-Hinweis".

---

## 2. Die zusammenhängenden Teile (alle, als ein Stück)

Ein Briefkasten besteht aus **fünf** Teilen, die zusammengehören:

1. **Der Knopf** (📬 + rote Zahl-Badge für ungelesene).
2. **Der Dialog** (leerer Körper, den die Logik füllt).
3. **Die CONFIG** (`window.SBKIM_MAILBOX`: wer bin ich, wo liegt meine SIGNAL/Spore, und die
   Nachbar-Liste mit je `inbox` / `mailbox` / `signal`-Link).
4. **Die Logik** (`sbkimMailboxFetch`, `sbkimCosine`, `sbkimMailboxCheck`) — baut Kopf, Karten, Fuß
   und setzt die Badge.
5. **Die Daten-Dateien**, auf die er zugreift (eigene `SIGNAL.json` + `spore.json`, und pro Nachbar
   eine `*_inbox.json` = **byte-1:1-Kopie** der geprüften Nachbar-Spore).

Wer nur Teil 1+2 baut, hat einen toten Briefkasten. Es müssen **alle fünf** zusammen da sein.

---

## 3. Der Bauplan zum 1:1-Übernehmen (kopieren, nur CONFIG umstellen)

> Krypto-/Logik-Teil bleibt **byte-gleich**. Ihr ändert **nur** den CONFIG-Block (Teil 3): euren
> eigenen Namen, eure SIGNAL/Spore-Pfade und die Nachbar-Liste (alle Knoten **außer euch selbst**).

### Teil 1 — Knopf (in den `<header>`)
```html
<button id="sbkim-mailbox-btn" type="button" onclick="sbkimMailboxCheck(false)"
        title="Briefkasten der Nachbar-Knoten jetzt prüfen"
        style="position:relative;float:right;font:inherit;padding:.4em .8em;border-radius:.5em;border:1px solid currentColor;background:transparent;color:inherit;cursor:pointer">
  📬 Briefkasten
  <span id="sbkim-mailbox-badge" hidden
        style="position:absolute;top:-.5em;right:-.5em;min-width:1.4em;height:1.4em;padding:0 .3em;border-radius:.7em;background:#c0392b;color:#fff;font-size:.75em;line-height:1.4em;text-align:center"></span>
</button>
```

### Teil 2 — Dialog
```html
<dialog id="sbkim-mailbox-dialog" style="max-width:32em;border:none;border-radius:.8em;padding:1.2em">
  <h3 style="margin:.2em 0 .6em">📬 SBKIM-Briefkasten</h3>
  <div id="sbkim-mailbox-body">…</div>
  <form method="dialog" style="text-align:right;margin-top:1em">
    <button style="font:inherit;padding:.4em 1em;border-radius:.5em;border:1px solid currentColor;background:transparent;color:inherit;cursor:pointer">Schließen</button>
  </form>
</dialog>
```

### Teil 3 + 4 — CONFIG (anpassen!) + Logik (byte-gleich lassen)
```html
<script>
  // === SBKIM-Briefkasten CONFIG — NUR DIESEN BLOCK pro Knoten anpassen ===
  window.SBKIM_MAILBOX = {
    self: "DEIN-KNOTENNAME",
    selfSignal: "sbkim/SIGNAL.json",
    selfSpore:  "sbkim/spore.json",           // eigener domainVector fuer den Live-Match
    peers: [
      // Hier ALLE anderen Knoten eintragen (außer dir selbst). Pro Nachbar:
      //  name   = exakter nodeName (muss zum Schlüssel in deinem ack passen)
      //  label  = Anzeigename
      //  inbox  = lokale 1:1-Kopie der geprüften Nachbar-Spore (sbkim/<name>_inbox.json)
      //  mailbox= euer Postfach zu diesem Nachbarn (sbkim/AUSTAUSCH*.md)
      //  signal = RAW-Link auf die SIGNAL.json des Nachbarn (Liste siehe §4)
      { name: "Sage-Protokol",    label: "Sage-Protokol",             inbox: "sbkim/sage_inbox.json",  mailbox: "sbkim/AUSTAUSCH.md",             signal: "https://raw.githubusercontent.com/lausiklauskn-png/Sage-Protokol/main/sbkim/SIGNAL.json" },
      { name: "Jasons-Tresor",    label: "Jasons-Tresor (Schwester)", inbox: "sbkim/jason_inbox.json", mailbox: "sbkim/AUSTAUSCH-JasonsTresor.md", signal: "https://raw.githubusercontent.com/lausiklauskn-png/Jasons-Tresor/main/sbkim/SIGNAL.json" },
      { name: "SB-KIMTool-Point", label: "SB-KIMTool-Point",          inbox: "sbkim/point_inbox.json", mailbox: "sbkim/AUSTAUSCH-SBKIMTool.md",   signal: "https://raw.githubusercontent.com/lausiklauskn-png/SB-KIMTool-Point/main/sbkim/SIGNAL.json" }
    ]
  };

  // === SBKIM-Briefkasten Logik (zero-dependency) — BYTE-GLEICH lassen ===
  async function sbkimMailboxFetch(url) {
    try { const r = await fetch(url, { cache: "no-store" }); if (!r.ok) return { error: "HTTP " + r.status }; return await r.json(); }
    catch (e) { return { error: String(e && e.message || e) }; }
  }
  // L2-Cosinus zweier domainVector (sind normalisiert; sicherheitshalber voll gerechnet).
  function sbkimCosine(a, b) {
    if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) return null;
    let dot = 0, na = 0, nb = 0;
    for (let i = 0; i < a.length; i++) { dot += a[i] * b[i]; na += a[i] * a[i]; nb += b[i] * b[i]; }
    if (!na || !nb) return null;
    return dot / (Math.sqrt(na) * Math.sqrt(nb));
  }

  // silent=true: nur Badge (beim Laden). Voller Modus: drei Ebenen je Nachbar —
  // Spore ✔, Match (Cosinus LIVE im Browser nachgerechnet) und Synchron-Stand (seq ↔ ack).
  async function sbkimMailboxCheck(silent) {
    const cfg = window.SBKIM_MAILBOX || {};
    const dlg = document.getElementById("sbkim-mailbox-dialog");
    const body = document.getElementById("sbkim-mailbox-body");
    if (!silent) { body.innerHTML = "Lese Nachbarn & rechne Verbindung nach …"; if (dlg.showModal) dlg.showModal(); }

    let selfAck = {}, selfVec = null, selfId = "";
    try { const s = await sbkimMailboxFetch(cfg.selfSignal); if (s && s.ack) selfAck = s.ack; } catch {}
    if (!silent) {
      const sp = await sbkimMailboxFetch(cfg.selfSpore);
      if (sp && !sp.error) { if (Array.isArray(sp.domainVector)) selfVec = sp.domainVector; selfId = sp.id || ""; }
    }

    const cards = [];
    let unread = 0, connected = 0;
    for (const peer of (cfg.peers || [])) {
      const sig = await sbkimMailboxFetch(peer.signal);
      const seq = sig && !sig.error ? (Number(sig.seq) || 0) : null;
      const seen = Number(selfAck[peer.name]) || 0;

      let sync;
      if (seq === null) sync = `SIGNAL nicht lesbar`;
      else if (seq > seen) { unread++; sync = `<b style="color:#e0a52b">⏳ ${seq - seen} ungelesen</b> (ihr seq ${seq}) — <a href="${peer.mailbox}" target="_blank" rel="noopener">Postfach ↗</a>`; }
      else sync = `<span style="color:#3bbf7a">✔ synchron</span> (seq ${seq}, quittiert ${seen})`;

      let spore = "—", match = "—";
      if (!silent) {
        const inbox = await sbkimMailboxFetch(peer.inbox);
        if (inbox && !inbox.error) {
          spore = `<span style="color:#3bbf7a">✔ verified-spore</span> · <code style="font-size:.72rem">${(inbox.id || "").slice(0, 16)}…</code>`;
          const c = selfVec && Array.isArray(inbox.domainVector) ? sbkimCosine(selfVec, inbox.domainVector) : null;
          if (c === null) match = `wartet auf Vektor`;
          else if (c >= 0.8) { connected++; match = `<span style="color:#3bbf7a">✔ verified-match</span> · cos <b>${c.toFixed(4)}</b>`; }
          else match = `cos ${c.toFixed(4)} — unter 0.80`;
        } else spore = `Spore nicht lesbar`;
      }

      cards.push(
        `<div style="border:1px solid var(--line,#2a2a2a);border-radius:.6em;padding:.55em .7em;margin:.5em 0">
           <div style="font-weight:600;margin-bottom:.25em">${peer.label || peer.name}</div>
           <div style="font-size:.82rem;line-height:1.8">
             <div>①&nbsp;Spore&nbsp;&nbsp;${spore}</div>
             <div>②&nbsp;Match&nbsp;&nbsp;${match}</div>
             <div>③&nbsp;Sync&nbsp;&nbsp;&nbsp;${sync}</div>
           </div>
         </div>`);
    }

    if (!silent) {
      const total = (cfg.peers || []).length;
      const head =
        `<div style="text-align:center;margin:0 0 .6em">
           <img src="assets/sbkim-siegel-wappen.svg" alt="SBKIM-Siegel" decoding="async" style="width:92px;height:92px;display:block;margin:0 auto .25em"/>
           <div style="font-weight:600">${cfg.self} — SBKIM-Endknoten</div>
           <div style="font-size:.72rem;color:var(--muted,#9aa);word-break:break-all">${selfId ? "nodeId " + selfId.slice(0, 20) + "… · verified-spore ✔" : "Identität: sbkim/spore.json"}</div>
         </div>`;
      const foot =
        `<p style="margin:.6em 0 0;text-align:center"><b style="color:#3bbf7a">${connected}/${total} verbunden</b> · ${unread ? `<b style="color:#e0a52b">${unread} ungelesen</b>` : "📭 alles synchron"}</p>
         <p style="margin:.3em 0 0;font-size:.7rem;color:var(--muted,#9aa);text-align:center">Match jetzt <b>live in deinem Browser</b> nachgerechnet (Cosinus eigener ⟷ Nachbar-Spore). Quittieren via <code>ack</code> in sbkim/SIGNAL.json.</p>`;
      body.innerHTML = head + cards.join("") + foot;
    }

    for (const id of ["sbkim-mailbox-badge", "hud-mailbox-badge"]) {
      const badge = document.getElementById(id);
      if (!badge) continue;
      if (unread) { badge.textContent = String(unread); badge.hidden = false; } else { badge.hidden = true; }
    }
  }
  // Beim Laden still pruefen und Badge setzen (kein Dialog-Popup).
  window.addEventListener("DOMContentLoaded", () => { try { sbkimMailboxCheck(true); } catch {} });
</script>
```

### Teil 5 — Daten-Dateien (müssen vorhanden & gepflegt sein)
- `sbkim/SIGNAL.json` — **eigener** Stand. Pflicht-Felder für den Briefkasten:
  - `seq` (Zahl) — eure laufende Sende-Nummer; bei jeder Neuigkeit +1.
  - `ack` (Objekt `name → seq`) — bis zu welcher `seq` ihr **jeden Nachbarn gelesen** habt.
- `sbkim/spore.json` — **eure** Spore mit echtem `domainVector` (384-dim) + `id`.
- `sbkim/<name>_inbox.json` — pro Nachbar eine **byte-1:1-Kopie** seiner **geprüften** Spore
  (mit `verify_foreign_spore.mjs` gegengeprüft → ✔ VALID). Das ist die Quelle für ② Match.

---

## 4. Alle Links (RAW, `main`) — Knoten-Verzeichnis

| Knoten | SIGNAL.json (für CONFIG `signal`) |
|---|---|
| **Mein-Tresor** | `https://raw.githubusercontent.com/lausiklauskn-png/Mein-Tresor/main/sbkim/SIGNAL.json` |
| **Sage-Protokol** | `https://raw.githubusercontent.com/lausiklauskn-png/Sage-Protokol/main/sbkim/SIGNAL.json` |
| **SB-KIMTool-Point** | `https://raw.githubusercontent.com/lausiklauskn-png/SB-KIMTool-Point/main/sbkim/SIGNAL.json` |
| **Jasons-Tresor** | `https://raw.githubusercontent.com/lausiklauskn-png/Jasons-Tresor/main/sbkim/SIGNAL.json` |
| **Mein-Rezeptbuch** | `https://raw.githubusercontent.com/lausiklauskn-png/Mein-Rezeptbuch/main/sbkim/SIGNAL.json` |
| **Mein-Mixarium** | `https://raw.githubusercontent.com/lausiklauskn-png/Mein-Mixarium/main/sbkim/SIGNAL.json` |

Die **Spore** jedes Knotens liegt analog unter `.../<Repo>/main/sbkim/spore.json` (zum Holen +
Prüfen → daraus wird eure lokale `*_inbox.json`).

**Regel für eure `peers`-Liste:** Tragt **alle Knoten außer euch selbst** ein. Jeder Briefkasten
zeigt also die jeweils **anderen** — aber Aufbau, Logik und Aussehen sind bei allen **identisch**.

---

## 5. Der Live-Hinweis (Match) — wie er genau entsteht

1. Beim Klick lädt der Briefkasten **eure** `spore.json` → `selfVec` (euer 384-dim `domainVector`).
2. Pro Nachbar lädt er dessen geprüfte `*_inbox.json` → dessen `domainVector`.
3. `sbkimCosine(selfVec, nachbarVec)` rechnet den **Cosinus** (beide L2-normiert, Skala −1…+1).
4. **`≥ 0.80` → `verified-match`** (grün, „cos 0.8478"). Darunter: „unter 0.80". Kein Vektor: „wartet auf Vektor".
5. Unten zählt `connected/total` zusammen → „**X/N verbunden**".

Das ist **nicht** gecacht: jeder Klick rechnet neu — wer seine Spore ändert, sieht es sofort.
Beispiel-Stand von Mein-Tresor (live nachgerechnet): Sage **0.8478**, Jasons **1.0000**,
SB-KIMTool-Point **0.8537** → **3/3 verbunden**.

---

## 6. Akzeptanzkriterien (Beweis)
- 📬-Knopf in der Seite; Klick öffnet Dialog mit Siegel-Kopf, je Nachbar **drei Ebenen**, „X/N verbunden".
- ② Match wird **live im Browser** gerechnet (kein gespeicherter Wert).
- ③ Sync vergleicht **ihr `seq`** ↔ **euer `ack`**; ungelesen → Badge + Postfach-Link.
- `sbkim/SIGNAL.json` (`seq`+`ack`), `sbkim/spore.json` (echter `domainVector`) und alle
  `*_inbox.json` (✔ VALID) vorhanden.
- `npm test` bleibt grün (Briefkasten ist **additiv**, rührt den getesteten Kern nicht an).

## 7. Offene Fragen an die Empfänger
- Tragt ihr **alle** anderen Knoten als `peers` ein (Vollvernetzung) oder nur eure direkten Partner?
- Soll der stille Lade-Check (Badge) bei euch ebenfalls an sein (empfohlen: ja)?

## Abschluss-Befehl (für die Empfänger-Sitzung)
Briefkasten nach §3 einbauen (CONFIG anpassen, Logik byte-gleich) → `sbkim/SIGNAL.json` + `*_inbox.json`
pflegen → `npm test` grün → `PULS.md` fortschreiben → neuen Brief schreiben (Pflichtlektüre +
diesen Abschluss-Befehl wiederholen) → Commit/Push auf `claude/<scope>` → Draft-PR mit Test-Plan.
**Merge entscheidet euer Mensch.**
