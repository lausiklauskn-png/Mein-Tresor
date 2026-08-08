# assets/safe — die Bilder des Dreh-Safes

Hier liegen die vier Bilder, aus denen das **Gesicht** von Mein-Tresor besteht:
die Safe-Front, das Drehrad und die beiden Tresorwände (hoch und quer).

**Bitte diese Anleitung lesen, bevor hier eine Datei abgelegt oder ersetzt wird.**
Am 2026-08-08 waren genau diese vier Dateien als PNG **8.447 KiB** groß — 70 % von
allem, was die Seite überhaupt übertrug, und der Grund, warum Mein-Tresor die
langsamste Seite im Netz war.

## Was hier gilt

| | Vorgabe |
|---|---|
| Format | **WebP**, Güte **0,90** |
| Breite | höchstens das **Doppelte** der echten Anzeigebreite |
| Dateigröße | pro Bild **unter 300 KiB** |
| Durchsichtigkeit | das Drehrad **muss** einen Alpha-Kanal behalten |

## Die Maße, gemessen (nicht geschätzt)

| Datei | Breite | angezeigt bei 412 px / 1350 px Fenster | jetzt |
|---|---|---|---|
| `safe-front.webp` | 1254 | 412 / 940 | 258 KiB |
| `drehrad.webp` | 768 | 163 / 372 (größtes Rad) | 165 KiB |
| `tresorwand-hoch.webp` | 1402 | füllt die Breite (Hochformat) | 242 KiB |
| `tresorwand-quer.webp` | 1536 | füllt die Breite (Querformat) | 226 KiB |

`fach.webp` liegt als Vorrat hier — die Seite holt es **nicht**. Gedacht ist es für
den Fall, dass das Fach-Öffnen-Fenster einmal auf die Fach-Grafik umgestellt wird.

## Eine Bild-KI liefert PNG — einmal umrechnen ist Pflicht

Wer ein neues Bild von einer Bild-KI bekommt, bekommt fast immer ein PNG von
1–3 MB. **So darf es hier nicht liegen bleiben.** Im Container gibt es weder
`cwebp` noch ImageMagick, aber Chromium kann WebP kodieren: das Bild als
`data:`-URL in ein Canvas der Zielbreite zeichnen, `canvas.toDataURL('image/webp',
0.90)`, die Bytes schreiben. Das Muster und die Begründung stehen in
`family-project/.claude/skills/seiten-bauregeln/regeln/bilder.md`
§ „Umrechnen ohne Bildwerkzeug".

## Danach: hinsehen, nicht nur nachmessen

**90 % kleiner ist kein Erfolg, wenn es schlechter aussieht.** Alt und neu in der
**echten Anzeigegröße** nebeneinander rendern und ansehen, bevor die alte Datei
weicht. Der Safe ist hier kein Beiwerk, sondern das Erste, was jemand sieht.

Güte 0,80 wäre nochmal rund 340 KiB kleiner, zeigt aber im 3-fach-Zoom sichtbare
Flecken in den dunklen Metall-Verläufen. Deshalb steht hier **0,90**.

## Wenn ein Bild ausgetauscht wird

1. Umrechnen (WebP, Güte 0,90, Zielbreite aus der Tabelle oben).
2. In `index.html` die echten `width`/`height` nachziehen — bei den Wänden auch
   in `LAYOUT` (`w`, `h`, `ar`), sonst springt die Seite beim Laden.
3. Seite laden und ins **Netzwerk-Protokoll** sehen: **kein 404**. Ein Bild, das
   nach einer Umbenennung fehlt, sieht nicht kaputt aus — es ist nur weg.
4. `npm test` (53 Proben) und den Spiegel `jasons-bibliothek/index.html`
   gleichziehen.
