# mixarium_inbox.verify.md — reziproker Verifikations-Vermerk

> Beleg, dass Mein-Tresor die Spore von **Mein-Mixarium** reziprok geprüft hat
> (INTERFACES §11.6 / ANDOCK). Wahrheitsquelle bleibt der headless `npm test`
> (generischer `*_inbox.json`-Test) + `scripts/verify_foreign_spore.mjs`.

Stand: 2026-06-07

## Geprüfter Knoten
- **nodeName:** Mixarium Klaus (Mein-Mixarium)
- **nodeId:** `B7Fke9CYTR1BrC3xOXzEY5q9RuRH8xxHPUuqRHV3utA`
- **Quelle:** `https://raw.githubusercontent.com/lausiklauskn-png/Mein-Mixarium/main/sbkim/spore.json`
- **Inbox-Kopie:** `sbkim/mixarium_inbox.json` (byte-1:1, unverändert)

## Ergebnis
- **Spore ✔ VALID** — `id == base64url(SHA256(rawPubkey))`, Ed25519-Signatur über die kanonische
  Form gültig, 9/9 Pflichtfelder, Manipulationsprobe fällt durch (`verify_foreign_spore.mjs`,
  im `npm test`).
- **Match: verified-spore (NICHT verified-match)** — Cosinus(eigener `domainVector` ⟷ Mixarium)
  = **0.788402**, **ehrlich unter 0.80**. Andere Domäne (Getränke/Mixen vs. Tresor) → kein
  verified-match, kein grün-Rechnen. Deckt sich mit dem von uns/Mixarium genannten Wert 0.7884.

## Stufe
`verified-spore` — Mein-Tresor ⟷ Mein-Mixarium (Identität echt geprüft; Domänen-Match unter Schwelle).
