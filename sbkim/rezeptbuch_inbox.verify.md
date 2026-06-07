# rezeptbuch_inbox.verify.md — reziproker Verifikations-Vermerk

> Beleg, dass Mein-Tresor die Spore von **Mein-Rezeptbuch** reziprok geprüft hat
> (INTERFACES §11.6 / ANDOCK). Wahrheitsquelle bleibt der headless `npm test`
> (generischer `*_inbox.json`-Test) + `scripts/verify_foreign_spore.mjs`.

Stand: 2026-06-07

## Geprüfter Knoten
- **nodeName:** Rezeptbuch Klaus (Mein-Rezeptbuch)
- **nodeId:** `uOpUBezUVbOMsVd2C9BkHW80agnLx5tCx_nIRy2KkXg`
- **Quelle:** `https://raw.githubusercontent.com/lausiklauskn-png/Mein-Rezeptbuch/main/sbkim/spore.json`
- **Inbox-Kopie:** `sbkim/rezeptbuch_inbox.json` (byte-1:1, unverändert)

## Ergebnis
- **Spore ✔ VALID** — `id == base64url(SHA256(rawPubkey))`, Ed25519-Signatur über die kanonische
  Form gültig, 9/9 Pflichtfelder, Manipulationsprobe fällt durch (`verify_foreign_spore.mjs`,
  im `npm test`).
- **verified-match ✔** — Cosinus(eigener `domainVector` ⟷ Rezeptbuch) = **0.813698 ≥ 0.80**
  (384-dim, `Xenova/multilingual-e5-small`). Deckungsgleich mit dem von Rezeptbuch genannten
  Wert 0.8137 und dem Bauplan §7.
- **Identität aktuell** — frische Spore byte-identisch zur Inbox; ältere Handshake-id `BSWxXmX…`
  führt Rezeptbuch (und Sage) als `previousNodeId`.

## Stufe
`verified-match` (reziprok) — Mein-Tresor ⟷ Mein-Rezeptbuch.
