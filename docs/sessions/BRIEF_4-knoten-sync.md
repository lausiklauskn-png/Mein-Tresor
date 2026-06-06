# BRIEF — 4-Knoten-Sync: verified-match + Jasons-Tresor reziprok

> Liefer- und Übergabe-Brief. Enthält drei adressierte Bitten (Sage, SB-KIMTool-Point,
> Jasons-Tresor), die Klaus überbringt, **und** schließt die Brief-Kette der Sitzung.
> Der **neueste** Brief gilt; alte bleiben Historie.

Stand: 2026-06-06

## Pflichtlektüre vor der Arbeit (in dieser Reihenfolge)
1. `CLAUDE.md` — Verfassung + Leitplanken.
2. `PULS.md` — aktueller Stand (getan / offen / nächste Schritte).
3. **Neuester Brief** `docs/sessions/BRIEF_*.md` (dieser).
4. `status.json` — ehrlicher Real-Anteil.
5. Doku + Code der zugewiesenen Scheibe (`docs/ANDOCK.md`, `scripts/…`, App, `sbkim/…`).

## Stand (was real, was offen)
- **Identität dauerhaft + echt:** nodeId `wRsGQouOYPVBOLzAB3nBteRvyvJ-AGv461WTJMKtkS0`,
  `sbkim/spore.json` trägt jetzt den **echten 384-dim `domainVector`** (`Xenova/multilingual-e5-small`,
  L2-Norm = 1.000000, im Browser erzeugt, neu signiert). Headless **✔ VALID**, `npm test` 53/53.
- **Netz-Stand der vier Repos (frisch geprüft 2026-06-06):**
  - **Sage-Protokoll:** führt uns als `verified-spore` (ihr SIGNAL seq 14, `ack[Mein-Tresor]=4`). Offen: **`verified-match`** (Modul 04, ≥0.80) gegen unsere jetzt eingebettete Spore.
  - **SB-KIMTool-Point:** führt uns als `verified-spore` (ihr SIGNAL seq 8). Offen: **`verified-match`**.
  - **Jasons-Tresor:** führt uns **noch gar nicht** (SIGNAL seq 2, lastBuild 2026-05-31, mailboxes/ack nur Sage+Point). Ihre Spore ist bei uns `✔ VALID`. Offen: **reziproke Erst-Registrierung** — das ist die fehlende 4. Verbindung.
- Unser `SIGNAL.json` ist auf **seq 5** (Bitte um verified-match). Postfächer aller drei Nachbarn fortgeschrieben.

## Ziel
**Alle vier Repos laufen gegenseitig synchron** — der angestrebte End-zu-End-Test des Netzes:
Mein-Tresor · Jasons-Tresor · Sage-Protokoll · SB-KIMTool-Point führen sich **alle gegenseitig**
mit verifizierter Spore (und, wo möglich, `verified-match`).

---

## Brief A — an **Sage-Protokoll**
Bitte unsere **neu signierte** Spore aus `raw/main` holen und mit **Modul 04** den Match rechnen;
bei **≥ 0.80** auf Stufe **`verified-match`** heben (NETZ-STAND.md + status.json).
- nodeId: `wRsGQouOYPVBOLzAB3nBteRvyvJ-AGv461WTJMKtkS0`
- sporeUrl: `https://raw.githubusercontent.com/lausiklauskn-png/Mein-Tresor/main/sbkim/spore.json`
- domainVector: 384-dim, `Xenova/multilingual-e5-small`, L2≈1.
- Unser SIGNAL: seq 5. Wir führen euch bei `ack["Sage-Protokol"]=14`.

## Brief B — an **SB-KIMTool-Point**
Gleiche Bitte: neu signierte Spore aus `raw/main` holen, Match rechnen, bei **≥ 0.80** auf
**`verified-match`** heben.
- nodeId / sporeUrl wie oben.
- Unser SIGNAL: seq 5. Wir führen euch bei `ack["SB-KIMTool-Point"]=8` (Points seq 4–8 gelesen).

## Brief C — an **Jasons-Tresor** (Priorität — schließt die Lücke)
Liebe grosse Schwester: unsere Vorbedingung (dauerhafte nodeId + abrufbare, signierte Spore mit
echtem `domainVector`) ist **erfüllt**. Bitte uns **reziprok eintragen**:
1. Spore aus `raw/main` holen → über euren Fremd-Verifizierer prüfen (`id==SHA256(pub)`, Ed25519,
   9/9 Pflichtfelder, Manipulationsprobe) → **✔ VALID** erwartet.
2. Postfach `sbkim/AUSTAUSCH-MeinTresor.md` anlegen.
3. In eurer `SIGNAL.json`: `mailboxes["Mein-Tresor"]` + `ack["Mein-Tresor"]` setzen, `seq` +1.
- nodeId / sporeUrl wie oben. Wir führen euch bereits (`sbkim/jason_inbox.json`, ✔ VALID, `ack=2`).

## Brief D — an **Jasons-Tresor**: echten `domainVector` im Browser nachholen (nodeId behalten)

Befund (geprüft 2026-06-06 aus eurem `raw/main`): euer `domainVector` ist noch ein **Demo-Stub**
(`_demo:["domainVector"]`), eure Identität ist **headless** erzeugt (`sbkim/node_key.enc.json` im
Repo). Mein-Tresor hat den **echten** Vektor inzwischen im Browser gerechnet. Damit alle vier auf
demselben „echter-Vektor"-Stand sind, holt ihr den echten Vektor nach — **ohne neue Identität**:

> ⚠️ **NICHT** eine neue Identität anlegen — das gäbe eine neue nodeId und zerrisse alle
> bestehenden Registrierungen bei Sage + Point. **Bestehenden Schlüssel laden und neu signieren.**

Schritte (Browser-Weg, der bei Mein-Tresor bewiesen lief):
1. Aus Mein-Tresor `raw/main` zwei Dateien kopieren und in **eurem** Repo ablegen:
   - `werkzeuge/andock.html` → CONFIG-Block (≈ Z. 118–125) auf **eure** Werte umstellen
     (`nodeName:"Jasons-Tresor"`, `domain:"Jasons-Tresor-Bibliothek"`, `endpoint`, Kategorien,
     `domainDescription`/`domainKeywords`); den Mein-Tresor-nodeId-Hinweistext kosmetisch anpassen.
   - `web/tools/sbkim-embedding.js` (Modul 03, unverändert).
2. Seite öffnen (Pages oder lokal), **Teil B**:
   ① `node_key.enc.json` + Passwort laden → **eure** nodeId `7F_zNop…` erscheint (gleich!).
   ② „domainVector erzeugen" (Modell ~30 MB, 1. Mal Internet) → „✔ 384 Floats, L2≈1".
   ③ „Spore neu signieren" → Browser-Selbsttest ✔ VALID → `spore.json` herunterladen.
3. `sbkim/spore.json` ersetzen (jetzt **echter** Vektor, **kein** `_demo` mehr), `npm test` grün,
   `node …/verify_foreign_spore.mjs sbkim/spore.json` → ✔ VALID; SIGNAL seq +1, headline
   „echter domainVector eingebettet". Commit + Push + Draft-PR.

Quelle der Werkzeuge:
`https://raw.githubusercontent.com/lausiklauskn-png/Mein-Tresor/main/werkzeuge/andock.html`
`https://raw.githubusercontent.com/lausiklauskn-png/Mein-Tresor/main/web/tools/sbkim-embedding.js`

---

## Datenverträge (nicht brechen)
- Spore/Andock: kanonische Signier-Form (`docs/ANDOCK.md` §4), 9 Pflichtfelder (§7).
- Tresor-Umschlag `jason-tresor` v2; Bibliothek `jason-eintrag`/`jason-bibliothek`.

## Akzeptanzkriterien
- `npm test` grün; echte Krypto; kein PII/Secret im Repo.
- Fremde Antworten **reziprok prüfen** (`verify_foreign_spore.mjs`) bevor wir etwas quittieren.
- Browser-Teile bleiben „ungeprüft, wartet auf Klaus' Browser-Lauf", bis Klaus sie gesehen hat.

## Reihenfolge (nächste Sitzung)
1. **Antworten der Nachbarn lesen** (raw/main): rechnen Sage/Point den Match? Hat Jasons uns
   eingetragen? — jeweils reziprok prüfen.
2. **Quittieren:** ack hochsetzen, Postfächer + `status.json` fortschreiben (Stufe `verified-match`
   bzw. „4-Knoten gegenseitig" sobald Jasons uns führt).
3. Erst wenn alle vier sich gegenseitig führen → im `status.json` als **End-Sync erreicht** vermerken.

## Offene Fragen an Klaus
- Sollen wir Jasons-Tresor (eigenes Repo, Schwester) in einer eigenen Sitzung **selbst** die
  reziproke Registrierung bauen, oder überbringst du den Brief und eine Jasons-Sitzung macht es?

## Abschluss-Befehl
`PULS.md` fortschreiben → neuen Brief schreiben (Pflichtlektüre + diesen Abschluss-Befehl
wiederholen) → Brief als Chat-Codeblock ausgeben → Commit/Push auf `claude/<scope>` →
Draft-PR mit Test-Plan. **Merge entscheidet Klaus.**
