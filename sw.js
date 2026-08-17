/* Mein-Tresor — Service Worker.
 *
 * WOZU. Ohne ihn kann keine Seite ohne Netz antworten: die App war deshalb
 * weder installierbar noch offline nutzbar, obwohl sie sonst alles mitbringt
 * (Klaus 2026-08-14, aufgefallen im PWA-Toolpoint-Marktplatz — dort stand an
 * der Karte nur „kein Zähldienst gefunden", und die zwei anderen Häkchen
 * fehlten).
 *
 * ⚠ DAS DOKUMENT KOMMT ZUERST AUS DEM NETZ — und das ist bei DIESER App keine
 * Geschmacksfrage. Ein Tresor trägt Krypto-Code. Läge er cache-first vor, würde
 * eine behobene Schwäche noch tagelang aus dem Vorrat ausgeliefert, ohne dass
 * jemand es merkt. Also: online immer die neueste Fassung, offline die letzte
 * bekannte. Langsamer beim Start, aber ein Tresor ist kein Nachrichten-Portal.
 *
 * WAS NICHT IN DEN VORRAT KOMMT. Die Erlebnis-Bilder sind rund 11 MB. Sie
 * würden die Installation minutenlang blockieren, für etwas, das die meisten
 * nie zu Gesicht bekommen. Sie landen im Vorrat, WENN sie einmal geholt wurden
 * — dann sind sie beim nächsten Mal auch ohne Netz da.
 *
 * FREMDE ADRESSEN WERDEN NIE GESPEICHERT. Ein Relais oder ein fremder Knoten
 * hat in einem lokalen Vorrat nichts verloren; und eine „opake" Antwort, deren
 * Inhalt der Browser gar nicht zeigt, wäre ohnehin nur toter Ballast.
 *
 * Wer alles loswerden will: der Hard-Reload-Knopf in der App meldet diesen
 * Service Worker ab und leert jeden Vorrat (`hardReloadApp` in index.html).
 */

var CACHE = "mein-tresor-v3";

/* Nur das Gerüst. Alles andere kommt bei Bedarf dazu. */
var SHELL = [
  "./",
  "./index.html",
  "./assets/schutz-init.js",
  "./assets/siegel-inhalt.js",
  "./assets/sbkim-siegel-wappen.svg",
  "./sbkim/01_storage.js",
  "./sbkim/02_spore.js",
  "./sbkim/03_embedding.js",
  "./sbkim/04_match.js",
  "./sbkim/05_anastomose.js",
  "./sbkim/05b_nostr_relay.js",
  "./sbkim/07_apoptose.js",
  "./sbkim/15_membran.js",
  "./sbkim/16_siegel.js",
  "./sbkim/17_floating_widget.js",
  "./sbkim/20_schluessel_safe.js",
  "./sbkim/23_rendezvous.js",
  "./sbkim/23_rendezvous_ui.js",
  "./sbkim/sbkim-init.js"
];

/* `allSettled`, nicht `all`: EINE fehlende Datei darf die Installation nicht
   umwerfen. Sonst hätte die App gar keinen Offline-Betrieb, weil irgendwo ein
   Modul umbenannt wurde — und niemand sähe den Grund. */
self.addEventListener("install", function (e) {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(function (c) {
      return Promise.allSettled(SHELL.map(function (u) {
        return c.add(new Request(u, { cache: "reload" }));
      }));
    }).catch(function () {})
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (ks) {
      return Promise.all(ks.map(function (k) {
        return k === CACHE ? null : caches.delete(k);
      }));
    }).then(function () { return self.clients.claim(); }).catch(function () {})
  );
});

function ausDemNetzZuerst(req) {
  return fetch(req).then(function (res) {
    if (res && res.ok) {
      var kopie = res.clone();
      caches.open(CACHE).then(function (c) { c.put(req, kopie); }).catch(function () {});
    }
    return res;
  }).catch(function () {
    return caches.match(req).then(function (t) {
      return t || caches.match("./index.html");
    });
  });
}

function ausDemVorratZuerst(req) {
  return caches.match(req).then(function (t) {
    if (t) return t;
    return fetch(req).then(function (res) {
      if (res && res.ok && res.type === "basic") {
        var kopie = res.clone();
        caches.open(CACHE).then(function (c) { c.put(req, kopie); }).catch(function () {});
      }
      return res;
    });
  });
}

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;

  var u;
  try { u = new URL(req.url); } catch (_e) { return; }
  if (u.origin !== self.location.origin) return;   /* fremde Adressen: durchreichen */

  /* Das Dokument und alles, was Zustand trägt (Spore, Konfiguration), immer
     zuerst aus dem Netz — siehe Kopf dieser Datei. */
  if (req.mode === "navigate" || /\.json($|\?)/i.test(u.pathname)) {
    e.respondWith(ausDemNetzZuerst(req));
    return;
  }
  e.respondWith(ausDemVorratZuerst(req));
});
