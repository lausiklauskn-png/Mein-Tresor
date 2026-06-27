/*
 * SBKIM — Andock-Runtime + Auto-Lauschen (Stufe 2, 2026-06-27)
 *
 * Mein-Tresor war bisher SBKIM-Knoten nur über Identität (Ed25519-Spore) +
 * Briefkasten (§11.6). Dieser Init hebt den Tresor auf den Live-Nostr-Kanal:
 * er lädt den Modul-Runtime (01 Storage / 02 Spore / 03 Embedding /
 * 04 Match / 05 Anastomose / 05b Nostr-Relais / 07 Apoptose) und beginnt
 * beim Öffnen selbsttätig am Relais `wss://relay.family-projekt.de` zu
 * lauschen.
 *
 * EMPFANGSMODUS MIT ANTWORTRECHT: der Knoten lauscht auf eingehende
 * Handshakes und ANTWORTET nur — er initiiert NIE von sich aus (kein
 * Crawler, keine Pulsation, keine Eigenanfrage ins offene Netz).
 *
 * Vollständig fail-soft + nicht-blockierend: ohne Browser (WebCrypto/
 * IndexedDB), ohne Relais-Client (Modul 05b, type=module) oder bei
 * Netz-Fehler passiert schlicht nichts — der Tresor bleibt voll nutzbar.
 *
 * Muster: family-project/sbkim/sbkim-init.js + Sage-Protokol/sbkim-init.js.
 * Die acht Module sind byte-identisch aus Sage `src/modules/` kopiert.
 */
(function () {
  "use strict";

  // Eindeutiger IndexedDB-Namensraum (geteilter github.io-Origin!).
  var DB_SUFFIX = "meintresor";

  // Wartet kurz, bis das deferred type=module 05b window.SbkimNostrRelay
  // gesetzt hat (Module laufen nach klassischen Skripten). Fail-soft: gibt
  // null zurück, wenn es nach kurzer Zeit nicht da ist.
  function waitForRelay(tries) {
    return new Promise(function (resolve) {
      var n = tries || 25;
      (function poll() {
        if (window.SbkimNostrRelay) return resolve(window.SbkimNostrRelay);
        if (--n <= 0) return resolve(null);
        setTimeout(poll, 80);
      })();
    });
  }

  function boot() {
    (async function () {
      try {
        if (!window.SbkimStorage) return; // Module nicht geladen — still aussteigen.
        await SbkimStorage.init({ dbSuffix: DB_SUFFIX });

        // Modul 07 Apoptose stellt die aktive Knoten-Identität sicher
        // (Ed25519 lokal in IndexedDB — nichts verlässt das Gerät).
        if (window.SbkimApoptose && typeof SbkimApoptose.init === "function") {
          try { await SbkimApoptose.init(); }
          catch (e) { console.warn("[MT-SBKIM] Apoptose-Init übersprungen:", e); }
        }

        if (window.SbkimAnastomose && typeof SbkimAnastomose.init === "function") {
          await SbkimAnastomose.init();
        }

        // Auto-Lauschen am Relais (Empfangsmodus mit Antwortrecht).
        await waitForRelay();
        if (window.SbkimAnastomose &&
            typeof SbkimAnastomose.listenNostr === "function" &&
            window.SbkimNostrRelay) {
          try {
            SbkimAnastomose.listenNostr()
              .then(function () { console.info("[MT-SBKIM] Auto-Lauschen aktiv (Empfangsmodus mit Antwortrecht)."); })
              .catch(function (e) { console.warn("[MT-SBKIM] Auto-Lauschen übersprungen:", e); });
          } catch (e) { console.warn("[MT-SBKIM] Auto-Lauschen übersprungen:", e); }
        }
      } catch (e) {
        console.warn("[MT-SBKIM] Andock-Init übersprungen (braucht Browser):", e);
      }
    })();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
