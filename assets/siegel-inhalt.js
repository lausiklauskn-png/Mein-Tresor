/*
 * Siegel-Inhalt — DIE IDENTITÄT DIESES KNOTENS, und sonst nichts.
 *
 * ⚠ HIER STEHT KEIN KANON. Der Andock-Wizard, alle Anzeigetexte und alle
 * Prüfungen liegen seit A18 (2026-09-14) in EINER netzweit byte-gleichen
 * Datei — `assets/sbkim-andock-wizard.js`, Kanon `Sage-Protokol/src/modules/16b_andock_wizard.js`.
 * Diese Datei trägt nur noch, was in jedem Knoten ANDERS sein muss.
 *
 * Warum die Trennung: gemessen über die 20 Kopien im Netz standen am 2026-09-14
 * ZWÖLF verschiedene Code-Fassungen desselben Werkzeugs. Jede Verbesserung
 * kostete Handarbeit mal zwanzig und unterblieb deshalb meistens.
 *
 * ⚠ UND DIESE DATEI WIRD NIE VERTEILT. Sie trägt die BEDEUTUNG des Knotens; ein
 * Überschreiben gäbe dieser App den Namen und den Vektor einer fremden — der
 * Schaden vom 2026-08-16 in Alis Moderaum.
 *
 * Vertrag: Sage-Protokol/docs/INTERFACES.md §11.9.
 */
(function () {
  "use strict";
  window.SBKIM_SIEGEL_WIZ = {
    domain: "Mein-Tresor-Bibliothek",
    endpoint: "https://lausiklauskn-png.github.io/Mein-Tresor/",
    nodeType: "hybrid",
    nodeName: "Mein-Tresor",
    domainDescription: "Mein-Tresor ist ein Endknoten im SBKIM-Mycel zum sicheren Verwahren: er verschlüsselt und speichert JSON-Dateien und SBKIM-Schlüssel offline im Browser (AES-256-GCM), Tresor und Bibliothek zugleich. Backups lassen sich passwortgeschützt exportieren und auf einem anderen Gerät zurückspielen; der private Schlüssel verlässt den Browser nie. Verwandt mit dem Schwester-Tresor Jasons-Tresor und angedockt ans Netz aus Sage, SB-KIMTool-Point, Rezeptbuch und Mixarium.",
    domainKeywords: ["Tresor", "Bibliothek", "JSON", "SBKIM-Schlüssel", "Verschlüsselung", "Endknoten"],
    stammCategories: ["JSON-Tresor", "Jasons-Bibliothek", "Schlüssel-Backup", "AES-256-GCM-Verschlüsselung"],
    guestCategories: ["Jason-Verwahrung", "Schlüssel-Andock", "Spore-Verifikation"],
    backupPrefix: "mein-tresor-backup",
  };
})();
