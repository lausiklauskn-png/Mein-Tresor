# 🗝️ assets/erlebnis/ — bitte nicht löschen

Dies ist die **Schatzkammer** von Mein-Tresor: ein eigener, klar gekennzeichneter Ordner,
in dem das **Erlebnis** lebt (Bilder der Tür, des Schlüssels, der Bibliothek und der
Tresorräume; später der Service-Worker für die Offline-Installation als PWA).

> **Wichtig (Klaus' Regel):** Hier darf **nichts aus Versehen gelöscht** werden.
> Dieser Ordner gehört zur App. Wer ihn entfernt, nimmt dem Tresor sein Gesicht.

## Was hier hineingehört
- `bilder/` — alle generierten Bilder (Phase 1: `tuer-zu`, `schluessel`, `schloss-frame-1..4`,
  `tuer-rahmen`, `tuer-fluegel`, `licht-blitz`; später Bibliothek & Räume).
- `sw.js` — Service-Worker (kommt im Bau): cached die Dateien → echte Offline-Installation.

## Format (2026-06-05): WebP statt PNG
Die Bilder liegen seit Sitzung 22 als **`.webp`** (verlustarm, ~q82) statt PNG vor —
**~87 % kleiner** (74 MB → ~9,9 MB) für schnelleres Laden und eine schlanke PWA. Die
**Motive sind unverändert**, nur das Speicherformat. Die alten PNG bleiben in der
Git-Historie erhalten. Optik wartet auf Klaus' Browser-Abnahme (Hard-Reload Ctrl+Shift+R).

## Stil (Kurzfassung — Details im Plan)
Flüssiges **Spiegel-Metall in fester Form** („Glas und doch nicht Glas"), warmes Gold +
türkises Glühen, **Indiana-Jones-Abenteuer** (Jason → Jones) auf zartem Steampunk-Grund.

Voller Plan: `docs/sessions/PLAN_tresor-erlebnis.md` · Brief: `docs/sessions/BRIEF_tresor-erlebnis.md`
