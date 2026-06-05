# ANDOCK — Mein-Tresor als Endknoten am Sage-Protokoll

> Spec vor Code (Verfassung). Dieser Vertrag legt fest, **wie** unser Knoten andockt,
> **was real** ist und **was ehrlich Demo** bleibt. Code richtet sich nach diesem Dokument.
>
> Re-Skin von `SB-KIMTool-Point/docs/ANDOCK.md`. Schema, kanonische Signier-Form und
> Verifizierer sind **1:1 dieselben** (byte-deckungsgleich mit Sages Modul 02); nur die
> eigene Identität (Name/Domäne/Endpoint) und der ehrliche Real-Stand sind angepasst.

Stand: 2026-05-31 · Protokoll-Version `0.1`

## 1. Ziel und ehrliche Grenze

Wir veröffentlichen eine **echt signierte Spore** (kryptografische Visitenkarte) unter
`sbkim/spore.json`, damit das Sage-Protokoll uns als Endknoten **lesen und die Echtheit
prüfen** kann. Der Krypto-Teil läuft **headless** über `node:crypto` (Ed25519).

**Real:** Identität (Ed25519-Schlüssel, nodeId, Signatur) — reziprok gegen Sage geprüft.
**Demo (ehrlich markiert):** der `domainVector` (das semantische Embedding) und damit der
**Match-Score**. Wir rechnen das Embedding-Modell (`multilingual-e5-small`) nicht selbst;
der Vektor ist bis zu Klaus' Browser-Lauf (Modul 03) ein deterministischer Stub mit
`_demo`-Markierung. Ein echter semantischer Handshake (Score ≥ 0.80) ist daher **noch nicht**
möglich.

**Zusätzlich ehrlich:** Die nodeId ist **provisorisch**, solange kein `SBKIM_NODE_KEY`
gesetzt ist (flüchtiger Schlüssel, nodeId wechselt pro Lauf). Siehe `docs/SCHLUESSEL.md`.

## 2. Sage-Schema (Ziel-Format)

Pflicht- und genutzte Felder unserer `sbkim/spore.json` (Reihenfolge wie bei Sage):

| Feld                | Typ / Form                                   | real? | Quelle |
|---------------------|----------------------------------------------|-------|--------|
| `protocolVersion`   | `"0.1"`                                       | real  | CONFIG |
| `id`                | 43-Zeichen base64url = `SHA256(roher Pubkey)` | real  | abgeleitet |
| `nodeName`          | `"Mein-Tresor"`                            | real  | fest |
| `nodeType`          | `"hybrid"`                                    | real  | fest |
| `domain`            | `"Mein-Tresor-Bibliothek"`                  | real  | fest |
| `domainDescription` | ein Satz                                       | real  | fest |
| `domainKeywords`    | String-Array                                   | real  | fest |
| `stammCategories`   | String-Array (eigener Stamm / Kern-Angebot)    | real  | fest |
| `guestCategories`   | String-Array (was Gäste/Forker hier tun)       | real  | fest |
| `endpoint`          | URL **mit** Schrägstrich am Ende               | real  | Pages-URL |
| `publicKey`         | JWK `{kty:"OKP",crv:"Ed25519",x,key_ops,ext,alg}` | real | aus Schlüssel |
| `domainVector`      | 384-Float-Array, L2-normalisiert               | **Demo** | Stub (`_demo`), bis Modul 03 §5 |
| `createdAt`         | ISO-Zeitstempel                                | real  | Generator (Sage-Pflichtfeld) |
| `embeddingModel`    | `"Xenova/multilingual-e5-small"`              | real  | fest (Sage-Pflichtfeld) |
| `signature`         | 86-Zeichen base64url Ed25519                    | real  | s. §4 |

Der `publicKey` ist ein **JWK** (wie bei Sage), nicht DER. `x` = roher 32-Byte-Public-Key
base64url. Die `id` ist **nicht** gleich `x`, sondern `base64url(SHA256(roher Pubkey))`.

## 3. Schlüssel-Haltung (dauerhafte Identität)

- Der **private** Schlüssel kommt **niemals** ins Repo (Kein-PII / Kein-Secret-im-Code).
- Er wird als **Umgebungs-Secret `SBKIM_NODE_KEY`** (PKCS8-PEM, base64) **und** als
  Passwort-Tresor `sbkim/node_key.enc.json` hinterlegt (Rezept: `docs/SCHLUESSEL.md`).
- Der Generator liest `process.env.SBKIM_NODE_KEY`. Fehlt es, erzeugt er eine **flüchtige**
  Identität und markiert die Ausgabe klar als „ungesichert / nur Test".
- Nur der **öffentliche** Teil landet in `sbkim/spore.json`. So bleibt die nodeId über
  Sitzungen **gleich** = ein echter, bleibender Endknoten.

## 4. Kanonische Signier-Form (byte-deckungsgleich mit Sage)

```
canonical = JSON.stringify( spore ohne Feld "signature",
                            Schlüssel rekursiv sortiert,
                            kein Whitespace )
signature = base64url_nopad( Ed25519_sign( UTF-8(canonical), privateKey ) )
```

**Prüfen:** `signature` entfernen → erneut kanonisieren → `Ed25519_verify` gegen `publicKey.x`.
Jede Manipulation am Inhalt zerstört die Signatur. Implementierung:
`scripts/verify_foreign_spore.mjs` (Funktion `canonicalize` / `verifyForeignSpore`).

**4 Pflicht-Prüfpunkte** (Ergebnis nur VALID, wenn 2 ∧ 3 ∧ 4 zutreffen, 1 ist Vorbedingung):
1. **Pflichtfelder** vollständig (die 9 REQUIRED, §2 + §7).
2. **`id == base64url(SHA256(roher 32-Byte-Pubkey))`** — unabhängig nachgerechnet.
3. **Signatur** Ed25519 gültig über die kanonischen Bytes.
4. **Manipulationsprobe** — ein verändertes Feld lässt die Signatur **durchfallen**.

## 5. domainVector — derzeit ehrlich Demo

`domainVector` ist aktuell ein **deterministischer Demo-Stub** (`_demo: ["domainVector"]`),
**kein** echtes Embedding. Der Generator fällt darauf zurück, wenn `sbkim/domainVector.real.json`
fehlt. Eine vorhandene, aber kaputte Vektor-Datei lässt den Generator **laut scheitern** (kein
stilles Demo).

**Weg zum echten Vektor (wie SB-KIMTool-Point ihn ging):** ein echtes 384-dim-Embedding
(`Xenova/multilingual-e5-small`, transformers.js, `pooling:"mean"`, `normalize:true`,
L2-normalisiert) **im Browser** (Modul 03) aus dem reproduzierbaren e5-Text erzeugen:

```
passage: <domainDescription> <domainKeywords.join(", ")>
```

Das Ergebnis liegt versioniert unter `sbkim/domainVector.real.json` und wird beim **Re-Sign**
(mit Secret) fest in die signierten Bytes übernommen; dann entfällt `_demo`. Alternativ kann
Sage den Vektor aus unserem Domänen-Text rechnen (so lief es bei SB-KIMTool-Point, Match 0.8485).

## 6. Andock-Fluss

1. **Wir → Sage:** `sbkim/spore.json` wird über GitHub Pages veröffentlicht
   (`…github.io/Mein-Tresor/sbkim/spore.json` → 200). Sage liest und prüft Identität + Signatur.
2. **Sage → Wir:** Sages Spore lesen wir öffentlich (`raw`/Pages) und prüfen sie reziprok mit
   `scripts/verify_foreign_spore.mjs`. Eine signatur-reine Momentaufnahme liegt unter
   `sbkim/sage_inbox.json` (1:1-Kopie, **kein** Zusatzfeld) und wird offline im Test
   `test/andock.test.js` dauerhaft gegengeprüft.
3. **Kein Live-Socket.** Asynchroner Austausch über offene Dateien (dead-drop) + Postfach
   `sbkim/AUSTAUSCH.md`, wie die Brief-Kette — nur über die Repo-Grenze.

## 7. Akzeptanzkriterien (Beweis)

- `sbkim/spore.json` validiert gegen §2 (alle Pflichtfelder, Formen, Längen).
- `id === base64url(SHA256(roher Pubkey))`.
- Signatur verifiziert gegen den eigenen `publicKey.x`; manipulierter Inhalt verifiziert **nicht**.
- Reziprok: Sages Spore verifiziert ✔ VALID mit unserem Verifizierer.
- Headless-Test (`npm test`) bleibt grün.

**9 REQUIRED_SPORE_FIELDS:** `createdAt`, `domain`, `embeddingModel`, `endpoint`, `id`,
`nodeType`, `protocolVersion`, `publicKey`, `signature`.

## 8. Offen (wartet auf Klaus)

- **Schlüssel sichern** (Secret + Tresor) → stabile nodeId, dann **Re-Sign**.
- **Echter `domainVector`** via Modul 03 im Browser → `_demo` entfällt.
- **GitHub Pages aktivieren** → Pages-Endpoint liefert 200.
- **Sage bitten**, Mein-Tresor als neuen Endknoten zu registrieren (`verified-spore` →
  `verified-match`), `sporeUrl` eintragen — über `sbkim/AUSTAUSCH.md`.
