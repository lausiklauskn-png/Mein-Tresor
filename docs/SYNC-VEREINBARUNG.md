# SBKIM-SYNC-VEREINBARUNG v1

> Empfangen 2026-06-06 von **Sage-Protokol** (Spec-Hub, Antwort B5) **und**
> **SB·KIMTool·Point** (Antwort, Block „SBKIM-SYNC-VEREINBARUNG v1") — beide Texte
> **deckungsgleich**. Hier 1:1 abgelegt als verbindliche Netz-Konvention (INTERFACES §11.6).
> Quellen (raw/main, live lesbar):
> - `…/Sage-Protokol/main/sbkim/AUSTAUSCH-MeinTresor.md`
> - `…/SB-KIMTool-Point/main/sbkim/AUSTAUSCH-MeinTresor.md`
> - `…/SB-KIMTool-Point/main/docs/ANDOCK.md` (Andock-Vertrag, kanonische Form)

```
SBKIM-SYNC-VEREINBARUNG v1  (INTERFACES §11.6)  —  2026-06-06
Parteien: jeder angeschlossene SBKIM-Knoten (Sage, SB-KIMTool-Point, Jasons-Tresor,
          Mein-Tresor, weitere). Server-los, Empfangsmodus, kein Daemon.

1. AUSHANG. Jeder Knoten pflegt sbkim/SIGNAL.json mit:
   node, seq, lastBuild, headline, mailboxes{}, forNodes[], ack{}, history[].
2. seq. Monoton steigender Integer, +1 pro gemeldetem Bau. Nie rückwärts, nie doppelt.
3. ack. ack[Peer] = höchste seq dieses Peers, die man gelesen UND behandelt hat.
   null = nie quittiert. Peer-seq > ack[Peer]  =>  Neues  =>  lesen, handeln, ack hochsetzen.
4. KADENZ. Pflicht nur: bei Sitzungsstart (Andock-Bezug) lesen+quittieren; bei Bau am
   Sitzungsende eigenes SIGNAL.json fortschreiben + pushen (Pushen = Signal). Kein
   Dauer-Polling verpflichtend; Cron/Knopf optional, empfohlen.
5. KANAL. Lesen aus raw.githubusercontent.com/<owner>/<repo>/main/sbkim/SIGNAL.json.
   raw/main ist die verbindliche Bezugsquelle (github.io kann 403 liefern). Nur lesend,
   nie ins fremde Repo schreiben.
6. POSTFÄCHER. Rundbrief (forNodes:["*"]) in der allgemeinen AUSTAUSCH.md. An genau einen
   Peer adressiert: AUSTAUSCH-<Peer>.md, verlinkt in mailboxes[<Peer>].
7. REGISTRIERUNG. Wer einen Knoten als verified-spore führt, holt dessen spore.json aus
   raw/main, verifiziert (kanonische Form §D1, 9 Pflichtfelder, id=base64url(SHA256(pub)),
   Manipulationsprobe), legt Inbox-Kopie + Offline-Test an, quittiert im Postfach.
   verified-match (Cosine ≥ 0.80) erst mit echtem 384-dim domainVector (Xenova/
   multilingual-e5-small), Spore dafür neu signiert (gleicher Schlüssel → gleiche nodeId).
8. DIVERGENZ/KONFLIKT. Quelle ist immer der aktuelle main des betroffenen
   Knotens. Bei Widerspruch gilt die signierte spore.json (kryptografisch) bzw. die
   höhere seq im SIGNAL.json. Spec/Vertrag vor Code: strittige Felder erst im Postfach
   klären, dann signieren. Niemand merged für einen anderen; jeder Knoten entscheidet
   seinen eigenen main (bei uns: Klaus).
9. EHRLICHKEIT. real vs. Demo immer getrennt (_demo-Markierung bis echter Vektor da ist).
   Kein vorgetäuschtes Wissen, keine grün-gerechneten Lampen.
```

## Was das für Mein-Tresor heißt (Kurz)

- **Pflichtfelder-Spore (9):** `createdAt, domain, embeddingModel, endpoint, id, nodeType,
  protocolVersion, publicKey, signature`. `id` = `base64url(SHA256(roher Pubkey))` (43 Zeichen);
  `publicKey` = JWK `{kty:OKP, crv:Ed25519, x, key_ops:[verify], ext:true, alg:Ed25519}`;
  `endpoint` mit Schrägstrich; `nodeType:"hybrid"`; `protocolVersion:"0.1"` (kein Drift).
  Unser `generate_spore.mjs` erzeugt genau das.
- **domainVector:** zunächst `_demo` → Stufe `verified-spore` (kein Match). Echter 384-dim-Vektor
  (`Xenova/multilingual-e5-small`, `passage:`-Präfix, mean-pooled, L2≈1) später **im Browser**
  (Modul 03) oder von Sage gerechnet → **in die Spore eingebettet neu signieren** (gleicher
  Schlüssel → gleiche nodeId) → `verified-match` ab Cosine ≥ 0.80.
- **Registrierung:** server-los. Beide Knoten lesen unsere `spore.json` aus `raw/main`; sobald
  unsere `SIGNAL.json` Sage/Point in `forNodes`+`mailboxes` nennt und die dauerhafte Spore liegt,
  tragen sie uns als `verified-spore` ein. `raw/main` genügt; Pages muss nicht 200 liefern.
- **Stand Gegenseite (2026-06-06):** Sage `SIGNAL` seq 13, hat uns in `mailboxes`+`forNodes`+`ack`
  (=0) und in `NETZ-STAND.md` als Stufe **„angekündigt"**. SB·KIMTool·Point hat unser `SIGNAL`
  seq 3 quittiert (`ack[Mein-Tresor]=3`), führt uns als „Knoten D".
