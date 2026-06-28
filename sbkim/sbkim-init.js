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

        // Modul 17 Floating-Widget — schlankes Lampen-Design (LEBT/VERKEHR/FREMD),
        // self-mountend, verschiebbar, schließbar. KEIN Siegel-Slot: das volle
        // Siegel bleibt das vorhandene statische #sbkim-siegel-badge dieses
        // Tresors (kein ID-Konflikt). Klick auf VERKEHR zeigt die letzten 10
        // Handshakes/Knoten. Fail-soft.
        if (window.SbkimWidget && typeof SbkimWidget.init === "function") {
          try {
            await SbkimWidget.init({
              slots: ["lebt", "verkehr", "fremd"],
              allowedOrigins: ["https://lausiklauskn-png.github.io"],
              repoUrl: "https://github.com/lausiklauskn-png/Mein-Tresor",
            });
          } catch (e) { console.warn("[MT-SBKIM] Widget-Init übersprungen:", e); }
        }

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
              .then(function () {
                console.info("[MT-SBKIM] Auto-Lauschen aktiv (Empfangsmodus mit Antwortrecht).");
                // Sichtbar im Widget: VERKEHR-Lampe ruhig grün (= lauscht).
                try { window.dispatchEvent(new CustomEvent("sbkim:nostr-listening", { detail: { active: true } })); } catch (e) {}
              })
              .catch(function (e) { console.warn("[MT-SBKIM] Auto-Lauschen übersprungen:", e); });
          } catch (e) { console.warn("[MT-SBKIM] Auto-Lauschen übersprungen:", e); }
        }
      } catch (e) {
        console.warn("[MT-SBKIM] Andock-Init übersprungen (braucht Browser):", e);
      }
    })();
  }

  // ── Modul 23 Rendezvous — öffentlicher Floating-Knopf „🌐 Mit dem Netz
  // verbinden" (Klaus' Festlegung 2026-06-28: sofort öffentlich, eigener kleiner
  // Floating-Knopf). UNABHÄNGIG von der Andock-Kette gemountet (soll immer
  // erscheinen). Mechanik = geteiltes Modul 23 (SbkimRendezvous), das den
  // vorhandenen Stack lazy nutzt; createIdentity erzeugt die lebende Spore bei
  // Bedarf (Modul 03 Embedding + Modul 02 generateOwnSpore) mit der Tresor-
  // Domänen-Beschreibung. Verfassungstreu: nutzer-ausgelöst, kein Auto-Connect.
  var RDV_CFG = {
    nodeName: "Mein Tresor",
    domain: "Mein-Tresor-Bibliothek",
    endpoint: "https://lausiklauskn-png.github.io/Mein-Tresor/",
    nodeType: "hybrid",
    domainDescription: "Verwahrt und verschlüsselt JSON-Dateien und SBKIM-Schlüssel offline; Bibliothek/Tresor.",
    domainKeywords: ["Tresor", "Verschlüsselung", "AES", "Geheimfach", "Bibliothek", "Offline", "Datenschutz", "JSON", "Schlüssel"],
  };
  function rdvCreateIdentity() {
    if (!window.SbkimEmbedding || !window.SbkimSpore) {
      return Promise.reject(new Error("Module 02/03 nicht geladen."));
    }
    return window.SbkimEmbedding.init()
      .then(function () {
        return window.SbkimEmbedding.embedPassage(RDV_CFG.domainDescription + ". " + RDV_CFG.domainKeywords.join(", "));
      })
      .then(function (vec) {
        return window.SbkimSpore.generateOwnSpore({
          domain: RDV_CFG.domain, endpoint: RDV_CFG.endpoint, nodeType: RDV_CFG.nodeType, nodeName: RDV_CFG.nodeName,
          domainDescription: RDV_CFG.domainDescription, domainKeywords: RDV_CFG.domainKeywords, domainVector: Array.from(vec),
        });
      });
  }
  function mountRendezvous() {
    if (!window.SbkimRendezvousUI) return;
    try {
      window.SbkimRendezvousUI.init({ nodeName: RDV_CFG.nodeName, corner: "bl", createIdentity: rdvCreateIdentity });
      console.info("[MT-SBKIM] Rendezvous-UI gemountet (öffentlicher 🌐-Knopf).");
    } catch (e) { console.warn("[MT-SBKIM] Rendezvous-UI übersprungen:", e); }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { boot(); mountRendezvous(); });
  } else {
    boot();
    mountRendezvous();
  }
})();
