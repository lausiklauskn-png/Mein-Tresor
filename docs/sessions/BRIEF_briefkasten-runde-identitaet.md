# BRIEF — Nachfolgesitzung: Dauerhafte Identität + reziproke Registrierung (nach Briefkasten-Runde)

> Anknüpfungs-Brief. Erklärt vollständig, wo Mein-Tresor im SBKIM-Netz steht, was die
> Briefkasten-Runde vom 2026-06-06 ergeben hat und was als Nächstes zu tun ist. Wer hier
> anfängt, soll ohne Rückfragen weiterarbeiten können. Der **neueste** Brief gilt; alte bleiben
> als Historie (`BRIEF_sbkim-netz-und-feinschliff.md` ist der umfassende Vorgänger mit der
> kompletten Daten-/Dateikarte — bei Bedarf dort nachschlagen).

Stand: 2026-06-06 · Repo: lausiklauskn-png/Mein-Tresor · Entwicklungsbranch: `claude/<scope>`

## 0. ARBEITSREGEL (verbindlich, von Klaus gewünscht) — in dieser Reihenfolge
1. **Lesen.** Pflichtlektüre + Code der zugewiesenen Scheibe.
2. **Nachdenken.** Plan formulieren (was, warum, welche Datei, welches Risiko).
3. **Mit allen Knoten kommunizieren** (wenn möglich). Briefkasten-Runde: jede Nachbar-Spore aus
   `raw/main` frisch holen + `scripts/verify_foreign_spore.mjs` prüfen; jede `SIGNAL.json` lesen,
   mit unserem `ack` vergleichen, Ungelesenes lesen, unser `ack`/Postfach nachziehen.
4. **Mit Klaus abgleichen.** Kurzen Plan zeigen (Plan-vor-Code). Freibrief für Andock + Mergen liegt vor.
5. **Dann Code.** Additiv, Leitplanken wahren, `npm test` grün, committen, (auto-)mergen.

## 1. Pflichtlektüre VOR der Arbeit (in dieser Reihenfolge)
1. `CLAUDE.md` → 2. `PULS.md` → 3. dieser Brief (+ bei Bedarf `BRIEF_sbkim-netz-und-feinschliff.md`,
   `BRIEF_start.md`) → 4. `status.json` → 5. Code: `index.html` (+ Spiegel
   `jasons-bibliothek/index.html`), `werkzeuge/kalibrierung.html`, `scripts/*.mjs`, `sbkim/*`,
   `.github/sbkim-watch.mjs`, `docs/ANDOCK.md`, `SCHLUESSEL.md`.

## 2. Was Mein-Tresor IST
Design-vereinfachte Schwester von Jasons-Tresor. Funktion 1:1 (jedes Fach = echter AES-Tresor;
Honigtopf/Tarnfach, Shamir 3-von-5, alle Dateiformate, Gesamt-Sicherung) aus dem byte-gleich
kopierten JasonLib-Kern. NEU nur das Gesicht: Dreh-Safe-Eingang → Tresorraum mit nummerierten
Fächern. Offline-PWA, Hoch- und Querformat. Zugleich echter SBKIM-Endknoten.

## 3. LEITPLANKEN (unverändert, immer)
- **Kopieren, nicht klonen.** Kern aus Jasons-Tresor `raw/main`, 1:1, byte-gleich.
- **Kern unantastbar:** Block zwischen `// JASONLIB-CORE-START` und `// JASONLIB-CORE-END` muss in
  Wurzel `index.html` UND Spiegel `jasons-bibliothek/index.html` byte-identisch bleiben.
  Prüf-Hash (sha256, beide): `a98a704c6518c1b18d22df4d33fe90e4a792ad063d4e0dadaa9ed55362be98a3`
  Befehl: `awk '/JASONLIB-CORE-START/{f=1} f{print} /JASONLIB-CORE-END/{f=0}' <datei> | sha256sum`
- **Echte Krypto.** Ed25519/SHA-256 (`node:crypto`); AES-256-GCM/PBKDF2-SHA256 600k (WebCrypto).
  `domainVector` markierter Demo-Stub (`_demo:["domainVector"]`).
- **Ehrlichkeit.** `status.json` führt den Real-Anteil. Browser-Pfade „ungeprüft, wartet auf
  Klaus' Browser-Lauf", bis gesehen. Beweis = `npm test` (derzeit **53/53**).
- **Kein PII/Secret im Repo.** Privater Schlüssel + Passwort NIE ins Repo. `node_key.enc.json`
  legt **Klaus lokal** an. `.gitignore` schützt `*.pem/*.key/.env`.
- **Offline / keine externen Abhängigkeiten.** Schale additiv (nur außerhalb der Kern-Marker).

## 4. STAND — was diese Sitzung getan hat (Briefkasten-Runde)
- **Alle 5 Nachbar-Sporen frisch** aus `raw/main` geholt + verifiziert → **alle ✔ VALID**,
  byte-identisch zu unseren `sbkim/*_inbox.json` (keine Re-Signatur bei den Nachbarn).
- **3 SIGNAL.json gelesen + verglichen:**
  - **Sage** seq **12** = unser ack → nichts Neues.
  - **SB-KIMTool-Point** seq **3** (war ack 2) → **NEU gelesen** („SBKIM-Siegel + Lampen
    lebt/verkehr/fremd in der Statusleiste, alle vier Seiten; Andock-Modal"; Rundbrief
    `forNodes:*`, nichts speziell an uns). **Quittiert:** `ack["SB-KIMTool-Point"] = 3`.
  - **Jasons-Tresor** seq **2** = unser ack → nichts Neues.
- **Unsere `sbkim/SIGNAL.json`:** seq **2→3** (Headline + history-Eintrag), `ack` aktualisiert.
  Postfach `AUSTAUSCH-SBKIMTool.md` nachgezogen. App-Briefkasten (📬) und Wächter
  `.github/sbkim-watch.mjs` lesen unser `ack` **live** aus der SIGNAL.json — kein Hardcode, das
  Badge räumt sich nach dem Push selbst auf.
- **Sages Netz-Karte `sbkim/NETZ-STAND.md` gelesen** (über `raw/main`; die Pages-Domain
  `*.github.io` blockt die Netz-Policy dieses Containers — „Host not in allowlist"):
  **Mein-Tresor ist dort noch NICHT eingetragen.** Das bestätigt: die Nachbarn registrieren uns
  erst reziprok, wenn unsere **dauerhafte nodeId + Pages** stehen.
  - **Ehrlicher Nebenbefund (nur vermerkt, nicht unser zu lösen):** Sage führt für
    **Mein-Rezeptbuch/Mein-Mixarium andere nodeIds** (aus Live-Channel-Handshakes 2026-05-16/17)
    als die **heutigen statischen** Sporen in deren Repos, die wir geprüft haben. Falls relevant,
    müsste die Gegenseite das auflösen (Re-Sign oder Sage rechnet neu).

## 5. WO ES KLEMMT / WAS ALS NÄCHSTES (priorisiert)
**Das Netz hängt jetzt an genau einem Schritt, den nur Klaus tun kann:**

1. **Dauerhafte Identität (NUR Klaus — Secret).** Klaus läuft **einmal lokal**:
   `SBKIM_KEY_PW='<sein Passwort>' npm run key`
   → erzeugt `sbkim/node_key.enc.json` (bleibt **lokal**, `.gitignore` schützt es, kommt **NIE**
   ins Repo, der Assistent sieht das Passwort **nie**) und damit eine **stabile nodeId**.
   - Danach (kann der Assistent): `SBKIM_NODE_KEY=… npm run demo` → Spore mit stabiler nodeId neu
     signieren → `npm run verify` (✔ VALID) → committen. Siegel im Gesicht zeigt dann die stabile nodeId.
2. **Reziprok bei den Nachbarn melden** (sobald nodeId stabil + Pages live): in deren Postfächern
   /Issues mit stabiler nodeId + Pages-URL anklopfen, damit Sage uns in `NETZ-STAND.md` als
   `verified-spore` einträgt und der Briefkasten-Sync beidseitig läuft. Unsere `SIGNAL.seq` +1.
3. **`verified-match` (≥0.80)** braucht echten `domainVector` (Sage Modul 03 im Browser) — später.
4. **Klaus' Browser-„Kleinigkeiten"** am Gesicht + **Fach-Öffnen-Lauf** (ein Fach mit Passwort
   öffnen → Datei laden → verschließen; Honigtopf/Shamir; Hoch+Quer) → dann status.json
   „browser-geprüft". Fach-Raster ggf. via `werkzeuge/kalibrierung.html` exakt (LAYOUT.hoch/quer);
   Öffnen-Overlay optional auf `fach.png` re-skinnen.

## 6. SBKIM-NETZ — Kurzkarte (von uns reziprok ✔ VALID geprüft)
| Knoten | nodeName | id | SIGNAL | unser Inbox | unser ack |
|---|---|---|---|---|---|
| Sage | Sage | `nysOZE3Vu…MtJkYfA` | ja (seq 12) | `sage_inbox.json` | 12 |
| SB-KIMTool-Point | SB-KIMTool-Point | `CyunQNDRZZ…XXNY` | ja (seq 3) | `point_inbox.json` | **3** |
| Jasons-Tresor | Jasons-Tresor | `7F_zNopFg…Z_3hCs` | ja (seq 2) | `jason_inbox.json` | 2 |
| Mein-Rezeptbuch | Rezeptbuch Klaus | `uOpUBezUV…2KkXg` | nein | `rezeptbuch_inbox.json` | — |
| Mein-Mixarium | Mixarium Klaus | `B7Fke9CYT…V3utA` | nein | `mixarium_inbox.json` | — |

Spore-/SIGNAL-URL: `https://raw.githubusercontent.com/lausiklauskn-png/<Repo>/main/sbkim/{spore,SIGNAL}.json`
(Sage-Repo heißt `Sage-Protokol` — ein „l"). Sync §11.6: Peer-SIGNAL lesen, bei `seq>ack` lesen+quittieren.

## 7. DATENVERTRÄGE (nicht brechen)
`jt-vaults` (f-1..f-30 → {tresor: jason-tresor v2, name}) · `jt-booknames` · `mt-fachnums` ·
`jason-tresor` v2 · `jason-eintrag`/`jason-bibliothek` · Shamir `JT3v5-<i>-<base64url>` ·
Tarnfach `rec.decoy` · Spore kanonisch (ANDOCK §4), 9 Pflichtfelder.

## 8. AKZEPTANZKRITERIEN
`npm test` grün (53/53); Kern byte-gleich (Hash §3), Wurzel==Spiegel; `npm run verify` ✔ VALID;
alle `*_inbox.json` ✔ VALID; echte Krypto; kein Secret im Repo; offline; Schale additiv;
Browser-Teile „ungeprüft" bis Klaus sie sah.

## 9. OFFENE FRAGEN AN KLAUS
1. **Möchtest du jetzt die dauerhafte Identität anlegen?** (Schritt 5.1 — nur du, lokal, mit
   deinem Passwort.) Sobald `node_key.enc.json` lokal liegt, signiere ich die Spore neu + melde
   uns reziprok bei den Nachbarn.
2. Welche **„Kleinigkeiten"** am Gesicht (Räder/Fächer/Öffnen-Fenster) sollen nachgezogen werden?

## 10. ABSCHLUSS-BEFEHL
`PULS.md` fortschreiben → neuen Brief schreiben (Pflichtlektüre + Arbeitsregel + diesen
Abschluss-Befehl wiederholen) → Brief vollständig als Chat-Codeblock ausgeben → Commit/Push auf
`claude/<scope>` → Draft-PR mit Test-Plan → (Auto-)Merge. **Merge entscheidet Klaus** (Freibrief
für Andock + Mergen liegt vor).
