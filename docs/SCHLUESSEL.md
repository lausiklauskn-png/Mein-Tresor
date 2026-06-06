# SCHLÜSSEL — Knoten-Identität von Mein-Tresor

Stand: 2026-05-31

> Re-Skin von `SB-KIMTool-Point/docs/SCHLUESSEL.md`. Rezept und Sicherheitsregeln 1:1;
> nur die konkrete nodeId/der Schlüssel sind hier (noch) andere.

## Worum geht's

Unser Knoten unterschreibt seine Spore mit einem **privaten Ed25519-Schlüssel**
(`SBKIM_NODE_KEY`, base64 PKCS8-PEM). Daraus leitet sich die dauerhafte **nodeId**
`base64url(SHA256(roher Pubkey))` ab. Solange wir denselben Schlüssel behalten, bleibt die
nodeId gleich — Sage muss uns nicht neu registrieren.

## ✓ Aktueller Stand: nodeId ist DAUERHAFT (im Browser erzeugt, 2026-06-06)

Die **dauerhafte nodeId** von Mein-Tresor ist
**`wRsGQouOYPVBOLzAB3nBteRvyvJ-AGv461WTJMKtkS0`** (`publicKey.x` =
`jpVEwjIzDT05p3d-7umg0rvAZogTX0vtLKd0ektVEDk`). Die Spore `sbkim/spore.json` ist echt
Ed25519-signiert und **✔ VALID** (`node scripts/verify_foreign_spore.mjs sbkim/spore.json`).

**Erzeugt über den Browser-Weg** (`werkzeuge/andock.html`, WebCrypto): Klaus hat die Identität
in seinem Browser angelegt, der **private Schlüssel verlässt den Browser nie**. Die
verschlüsselte Sicherung **`node_key.enc.json`** (AES-256-GCM / PBKDF2-SHA256 600k, im
**exakt gleichen Format** wie `scripts/open_node_key.mjs` es liest) liegt **lokal bei Klaus** —
sie ist **bewusst (noch) nicht im Repo**. Sie *dürfte* dort liegen (ohne Passwort wertlos);
solange sie lokal bleibt, ist sie maximal geschützt.

Damit darf Sage / SB-KIMTool-Point die nodeId jetzt **fest registrieren** (`verified-spore`).
Re-Sign (z. B. wenn der echte `domainVector` dazukommt) hält die nodeId gleich, solange
derselbe Schlüssel benutzt wird — entweder erneut im Browser (`werkzeuge/andock.html`) **oder**
am Rechner, falls Klaus die `node_key.enc.json` einspielt (Rezept unten). **Sicherung +
Passwort gut aufbewahren** — Verlust = neue Identität nötig.

## Schlüssel dauerhaft machen (einmalig, durch Klaus)

> Ein einziger Lauf genügt. `scripts/make_node_key.mjs` erzeugt den frischen Schlüssel,
> zeigt die **dauerhafte** nodeId und legt ihn **sofort verschlüsselt** als
> `sbkim/node_key.enc.json` ab — der private Schlüssel/das Passwort werden dabei **nie**
> ausgegeben. (Headless bewiesen in `test/node_key.test.js`: Rundlauf `make → open`,
> falsches Passwort fällt durch.)

1. **Schlüssel erzeugen + Tresor anlegen** (Passwort nur über die Umgebungsvariable,
   **nie** als Argument — sonst steht es in der Prozessliste):
   ```
   SBKIM_KEY_PW='<dein-Passwort>' node scripts/make_node_key.mjs
   ```
   → schreibt `sbkim/node_key.enc.json` und druckt die **dauerhafte nodeId**. Das Passwort
   sicher merken (Passwort-Manager) — es steht **nirgends** im Repo. Ein vorhandener Tresor
   wird **nicht** überschrieben (Identitätsschutz), außer `SBKIM_KEY_FORCE=1` ist gesetzt.
2. **Optional zusätzlich als Umgebungs-Secret `SBKIM_NODE_KEY`** hinterlegen (bequemstes
   Re-Sign ohne Passwort-Eingabe). Wenn gesetzt, nutzt `generate_spore.mjs` es automatisch:
   ```
   SBKIM_NODE_KEY="$(SBKIM_KEY_PW='<Passwort>' node scripts/open_node_key.mjs)"
   ```
3. **Spore signieren — mit genau diesem Schlüssel → nodeId bleibt stabil:**
   ```
   SBKIM_NODE_KEY="$(SBKIM_KEY_PW='<Passwort>' node scripts/open_node_key.mjs)" \
     node scripts/generate_spore.mjs
   ```
   **Kontrolle:** Die gedruckte nodeId muss die **dauerhafte** aus Schritt 1 sein.

## Re-Sign-Ablauf (wenn Vektor/Kategorien sich ändern)

1. Schlüssel beschaffen (Tresor öffnen ODER Secret gesetzt).
2. `node scripts/generate_spore.mjs` → schreibt `sbkim/spore.json` neu.
3. **Kontrolle:** Ausgabe muss die **dauerhafte** nodeId zeigen (nicht eine neue). Weicht sie
   ab → falscher/fehlender Schlüssel → **stoppen**, Klaus fragen.
4. `node scripts/verify_foreign_spore.mjs sbkim/spore.json` → ✔ VALID; `npm test` grün.

## Wenn das Passwort verloren geht

Dann ist der Tresor nicht mehr zu öffnen. Lösung: **neue Identität erzeugen** (frischer
Schlüssel sichern, neuer Tresor) und Sage um **Neu-Registrierung** bitten.

## Sicherheitsregeln (unverändert)

- Der **private** Schlüssel (Klartext base64/PEM) und das **Passwort** kommen **nie** ins
  Repo, nie in Commits, nie in gepushte Chat-Artefakte.
- Nur der **öffentliche** Teil (nodeId, `publicKey.x`) darf nach außen / in `sbkim/spore.json`.
- Der verschlüsselte Tresor `node_key.enc.json` **darf** ins Repo (ohne Passwort wertlos).
