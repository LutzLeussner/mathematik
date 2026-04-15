# Referenzbeispiel: Bestände — vom Graphen zum Integral

Dieses Dokument zeigt die vollständige Folienstruktur und alle Unterschiede zwischen der Claude-Erstversion und der finalen Lehrerversion. Die Lehrerversion ist verbindlich.

---

## Folienreihenfolge (final, 13 Folien)

| Nr | Folientyp | Titel | Hintergrund |
|----|-----------|-------|-------------|
| 1 | Titelfolie | Bestände / Vom Graphen zum Integral | Gradient |
| 2 | Lernziele | Lernziele der Stunde | BG_WARM |
| 3 | Aufgabe | Beispiel: Die Badewanne | BG_WARM |
| 4 | Lösung | Lösung: Die Badewanne | BG_WARM |
| 5 | Arbeitsauftrag | Arbeitsauftrag | Gradient |
| 6 | Sicherung | Sicherung B1 — Schwimmbecken | BG_WARM |
| 7 | Sicherung | Sicherung B2 — Straßenbahn | BG_WARM |
| 8 | Sicherung | Sicherung B3 — Regenrückhaltebecken | BG_WARM |
| 9 | Hausaufgabe | Hausaufgabe (Integralübungen) | BG_WARM |
| 10 | Hausaufgabe | Hausaufgabe (Website-Aufgabe) | BG_WARM |
| 11 | Brücke | Brücke zum bestimmten Integral | BG_WARM |
| 12 | Zusammenfassung | Zusammenfassung | BG_WARM |
| 13 | Schlussfolie | Übung & Ausblick | Gradient |

---

## Wesentliche Änderungen durch den Lehrer

### A. Was ENTFERNT wurde

1. **Wiederholungsbox (merkeBox)** auf der Lernziele-Folie → ersetzt durch nummerierte Liste
2. **B4 Reflexion** komplett entfernt (weder AB noch Präsentation)
3. **Schema-Diagramm** ("Bestand = Anfangswert + Flächenbilanz") als eigenständige Folie → entfernt, stattdessen als Text in Lösungsfolien integriert
4. **Wiederholungs-Section** am Anfang des Arbeitsblatts
5. **Leere Antwortzeilen** im Arbeitsblatt (gepunktete Linien)

### B. Was HINZUGEFÜGT wurde

1. **Hausaufgabe-Folien** (2 Stück): Eine mit Integralübungen a)–n), eine mit Website-Aufgabe
2. **Brücke zum bestimmten Integral**: Übergangsfolie von geometrischer Flächenberechnung zum formalen Integral, mit dem Kraftwerk-Beispiel (f(t) = −t² + 8t)
3. **Zusammenfassung**: 4 Kernpunkte in KIKU-Rahmen + 3 Kontext-Karten (Wasser/Verkehr/Industrie)
4. **Schlussfolie** (Gradient): Übung & Ausblick mit Verweis auf Hausaufgabe und nächste Stunde
5. **Farbig gefüllte Einzelflächen** in den Lösungsdiagrammen (statt einheitlicher Füllung)

### C. Was GEÄNDERT wurde

1. **Badewanne: 2 Folien statt 1** — Aufgabe und Lösung getrennt
2. **Lösungsdiagramme komplett überarbeitet**: Jede Teilfläche einzeln gefärbt (Rechteck=grün, Rechteck2=blau, Dreieck=rot), gestrichelte Trennlinien, Labels in den Flächen
3. **Sicherungsfolien kompakter**: Rechnungen auf je 3-4 Zeilen, keine ausführlichen Erklärungen
4. **Antwortboxen am unteren Folienrand**: Ergebnis im Sachkontext in umrahmter Box (KIKU, MUSHI oder SANGO je nach Funktion)
5. **Arbeitsauftrag-Folie**: Nur B1–B3, "Gruppenarbeit mit Präsentation der Ergebnisse | 20 min"
6. **Straßenbahn-Diagramm**: y-Achse bis 14 (statt 12), dickere Linien, Markers an Knotenpunkten

---

## Diagramm-Spezifikationen (Lösungsversionen)

### Badewanne (Lösung)
- t=[0,4,6,7,9], f=[17,17,8.5,12,0]
- A₁: Rechteck 0–4, KIKU-Fill, Label "A₁ = 68 L"
- A₂: Rechteck 4–6, FUKA-Fill, Label "A₂ = 17 L"
- A₃: Rechteck 6–7, SANGO-Fill, Label "A₃ = 12 L"
- A₄: Dreieck 7–9, SANGO-Fill (heller), Label "A₄ = 12 L"
- Dashed vertikale Linien bei t=4, t=6, t=7

### Schwimmbecken (Lösung)
- t=[0,3,5,6], f=[20,20,12,0]
- A₁: Rechteck 0–3, KIKU-Fill, "A₁ = 60 m³"
- A₂: Rechteck 3–5, FUKA-Fill, "A₂ = 24 m³"
- A₃: Dreieck 5–6, SANGO-Fill, "A₃ = 6 m³"

### Straßenbahn (Lösung)
- t=[0,8,23,29], v=[0,12,12,4]
- A₁: Dreieck 0–8, KIKU-Fill, "A₁ = 48 m"
- A₂: Rechteck 8–23, FUKA-Fill, "A₂ = 180 m"
- A₃: Trapez 23–29, SANGO-Fill, "A₃ = 48 m"

### Regenrückhaltebecken (Lösung)
- t=[0,3,5,7,10], f=[3,3,0,-2,-2]
- A₁: Rechteck 0–3, KIKU-Fill, "A₁ = +9"
- A₂: Dreieck 3–5, KIKU-Fill (heller), "A₂ = +3"
- A₃: Dreieck 5–7, SANGO_LIGHT-Fill, "A₃ = −2"
- A₄: Rechteck 7–10, SANGO_LIGHT-Fill, "A₄ = −6"
- Annotation: "Regen hört auf" bei t≈5
- x-Achse deutlich hervorgehoben (Nulllinie)

---

## Zusammenfassung-Folie: Kontext-Karten

Drei gleichbreite Karten am unteren Rand:

| Karte | Rahmenfarbe | Füllung | Titel | Inhalt |
|-------|------------|---------|-------|--------|
| 1 | KIKU | KIKU_BG | "Wasser" | Änderungsrate: *Zuflussrate* / Bestand: *Füllstand* |
| 2 | FUKA | FUKA_LIGHT | "Verkehr" | Änderungsrate: *Geschwindigkeit* / Bestand: *Strecke* |
| 3 | SANGO | SANGO_LIGHT | "Industrie" | Änderungsrate: *Produktionsrate* / Bestand: *Lagerbestand* |
