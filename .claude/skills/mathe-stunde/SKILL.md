---
name: mathe-stunde
description: "Erstellt zusammengehörige Unterrichtsmaterialien für Mathematik-Doppelstunden (Gymnasium, MV, Klasse 11-12): eine PPTX-Präsentation UND ein passendes DOCX-Arbeitsblatt. IMMER verwenden, wenn der Nutzer sagt: 'Erstelle eine Stunde zu...', 'Präsentation und Arbeitsblatt zu...', 'Unterrichtsmaterial zu...', 'Doppelstunde vorbereiten', 'Materialien für die nächste Stunde', 'Erstelle Folien und AB zu...'. Auch verwenden, wenn aus dem Matheportal (index.html) Inhalte als Unterrichtsmaterial aufbereitet werden sollen. Dieser Skill definiert die verbindliche Folienreihenfolge, das Diagramm-Design, das Arbeitsblatt-Format und die didaktische Struktur. Nutzt pptxgenjs (PPTX), docx-js (DOCX) und matplotlib (Diagramme) als technische Basis."
---

# Mathe-Stunde — Präsentation + Arbeitsblatt

Dieser Skill erzeugt ein **zusammengehöriges Material-Paar** für eine Mathematik-Doppelstunde: eine Präsentation (PPTX) und ein passendes Arbeitsblatt (DOCX). Beide Dateien teilen sich ein gemeinsames Designsystem, dieselben Diagramme und dieselbe Aufgabenstruktur.

Lies vor dem Erstellen immer auch die Skills `pptx` (pptxgenjs.md) und `docx` (SKILL.md) für die technische Umsetzung. Dieser Skill ergänzt die **inhaltlichen und gestalterischen Regeln**.

---

## 1. Farbpalette (Website-Palette)

Diese Palette wird für BEIDE Outputs verwendet — Präsentation und Arbeitsblatt:

| Konstante | Hex | Rolle |
|-----------|-----|-------|
| `KIKU` | `#5b6e2e` | Hauptakzent, merkeBox-Rand, positive Flächen, Lösungsfarbe |
| `KIKU_LIGHT` | `#e8edda` | merkeBox-Füllung |
| `KIKU_BG` | `#f3f5ec` | Lösungsbox-Hintergrund |
| `SANGO` | `#c75c3a` | Frage-Label, negative Flächen, Warnhinweise, Erkenntnis-Boxen |
| `SANGO_LIGHT` | `#fceee9` | Negative-Flächen-Füllung in Diagrammen |
| `FUKA` | `#3a6e8a` | Zweite Segment-Farbe (Rechtecke), Kontext-Karte "Verkehr" |
| `MUSHI` | `#c8b55e` | Tipp-Boxen, Schwierigkeitstags, Hinweise |
| `MUSHI_LIGHT` | `#f7f3e2` | Tipp-Box-Füllung |
| `TEXT_D` | `#2c2c2c` | Fließtext dunkel |
| `TEXT_S` | `#6b6560` | Sekundärtext, Achsen |
| `BG_WARM` | `#fffcf6` | Hintergrund Inhaltsfolien |
| `BORDER` | `#e8e4de` | Gitterlinien, dezente Rahmen |

---

## 2. Präsentation (PPTX)

### 2.1 Verbindliche Folienreihenfolge

Jede Doppelstunde folgt diesem Schema. Folien dürfen ergänzt, aber nicht in der Grundstruktur umgestellt werden:

```
1. TITELFOLIE (Gradient)
   → Thema groß rechts, Untertitel + Trennlinie darunter
   → "Zwischenschritt | Mathematik Klasse 11" unten links
   → "Doppelstunde (90 min)" kursiv darunter
   → Vertikale weiße Linie links

2. LERNZIELE DER STUNDE
   → Nummerierte Liste (1–4 Punkte)
   → Schlüsselwörter fett
   → KEIN merkeBox — einfacher Text auf BG_WARM
   → KIKU-Linie unter dem Titel

3. BEISPIEL-AUFGABE (Aufgabenfolie)
   → Zwei-Spalten-Layout: Text links, Diagramm rechts
   → "Frage:" in SANGO, fett
   → Tipp-Box (MUSHI) unten links
   → Diagramm zeigt den Graphen OHNE Lösungslabels (_leer-Version)

4. BEISPIEL-LÖSUNG (Lösungsfolie)
   → Zwei-Spalten: Rechnung links, Diagramm rechts
   → "Vorgehen:" kursiv in SANGO als Einstieg
   → Teilflächen A₁, A₂, ... mit farbcodierten Ergebniswerten
   → Diagramm zeigt farbig gefüllte Flächen MIT Labels
   → Unten: Ergebnisbox (KIKU-Rahmen) mit Antwort im Sachkontext

5. ARBEITSAUFTRAG (Gradient)
   → Linke Hälfte: "Arbeitsauftrag", Sozialform + Zeit kursiv
   → Rechte Hälfte: Aufgabenliste mit Schwierigkeits-★
   → Vertikale weiße Trennlinie in der Mitte

6–N. SICHERUNGSFOLIEN (pro Aufgabe eine Folie)
   → Titel: "Sicherung B1 — [Name]"
   → diffTag oben rechts (★/★★)
   → "Anfangswert: ..." kursiv als erste Zeile
   → Kompakte Rechnung: A₁ = ..., A₂ = ..., A₃ = ...
   → Farbcodierte Ergebniswerte (KIKU für positiv, SANGO für negativ)
   → Ergebniszeile fett + groß: "Bestand = 0 + ... = XX Einheit"
   → Diagramm rechts mit farbigen Flächen + Labels
   → Unten: Antwortbox (KIKU-Rahmen) ODER Hinweisbox (MUSHI) ODER Erkenntnisbox (SANGO-Rahmen)

N+1. HAUSAUFGABE (1–2 Folien, BG_WARM)
   → Übungsaufgaben oder Verweis auf Website-Aufgaben
   → Kann auch Website-Aufgabenkarten einbetten (mit Aufgabennummer + ★)

N+2. BRÜCKE / TRANSFER (optional, BG_WARM)
   → Verbindung zum nächsten Thema herstellen
   → Übergang von konkretem Verfahren zur formalen Notation
   → Kann ein Beispiel mit Diagramm enthalten

N+3. ZUSAMMENFASSUNG (BG_WARM)
   → 4 Kernaussagen in nummerierter Liste, KIKU-Rahmen
   → Farbige Schlüsselwörter (positiv=KIKU, negativ=SANGO)
   → Optional: Kontext-Karten am unteren Rand
     (3 nebeneinander, farbig: KIKU=Wasser, FUKA=Verkehr, SANGO=Industrie o.ä.)

N+4. SCHLUSSFOLIE (Gradient)
   → "Übung & Ausblick" rechts oben
   → Hausaufgaben-Verweis links unten, fett
   → "Nächste Stunde:" + Vorschau kursiv
```

### 2.2 Folientypen im Detail

**Gradient-Folien** (Titel, Arbeitsauftrag, Schluss):
- Hintergrund: Orange→Türkis-Verlauf (gradient_bg.png)
- Weiße Schrift, vertikale weiße Linie als Akzent
- Maximal 3 Gradient-Folien pro Präsentation

**Inhaltsfolien** (alles andere):
- Hintergrund: `BG_WARM` (#fffcf6)
- Dunkle Schrift (`TEXT_D`)
- Titel groß (36–40pt), KIKU-Linie darunter
- Zwei-Spalten-Layout bevorzugt (Text links 45%, Diagramm rechts 55%)

**Lösungsfolien** — Layout-Schema:
```
┌────────────────────────────────────────────────┐
│  Sicherung B1 — Name                     [★]  │
│  ─────────── (KIKU-Linie)                      │
│                                                │
│  Anfangswert: 0 (leeres Becken)    ┌────────┐ │
│                                    │Diagramm│ │
│  A₁ = 20·3 = 60 m³  (R, 0–3h)    │  mit   │ │
│  A₂ = 12·2 = 24 m³  (R, 3–5h)    │farbigen│ │
│  A₃ = ½·12·1 = 6 m³ (D, 5–6h)    │Flächen │ │
│                                    └────────┘ │
│  Bestand = 0+60+24+6 = 90 m³                  │
│                                                │
│  ┌──────────────────────────────────────────┐  │
│  │  Nach 6h befinden sich 90 m³ im Becken  │  │
│  └──────────────────────────────────────────┘  │
└────────────────────────────────────────────────┘
```

### 2.3 Schwierigkeitstags (diffTag)

Position: oben rechts (x=8.3, y=0.4), 1.3×0.35 inches

| Niveau | Text | Farbe |
|--------|------|-------|
| Leicht | ★ | KIKU |
| Mittel | ★★ | MUSHI |
| Schwer | ★★★ | SANGO |

### 2.4 Boxen-Typen (unterer Bereich der Folien)

| Box-Typ | Rahmen | Füllung | Verwendung |
|---------|--------|---------|------------|
| Antwortbox | KIKU | KIKU_BG | Ergebnis im Sachkontext |
| Hinweisbox | MUSHI | MUSHI_LIGHT | Physikalische/mathematische Einsicht |
| Erkenntnisbox | SANGO | SANGO_LIGHT | Überraschende oder wichtige Schlussfolgerung |

---

## 3. Diagramme (matplotlib)

Jeder Graph wird in ZWEI Versionen generiert:

### 3.1 `_leer`-Version (für Arbeitsblatt + Aufgabenfolie)
- Graph ohne Flächenlabels
- Einheitliche helle Füllung unter dem Graphen (`alpha=0.08, color=TEXT_S`)
- Dashed vertikale Linien an den Segmentgrenzen (Breakpoints)
- Graph-Segmente in verschiedenen Farben (KIKU, FUKA, SANGO)
- **Dicke Linien** (`linewidth=3.5–4.0`), zorder=5
- Knotenpunkte als Marker (`markersize=6`, weiße Edge)

### 3.2 Lösungsversion (für Sicherungsfolien)
- JEDE geometrische Teilfläche einzeln farbig gefüllt:
  - Positive Flächen: KIKU-Füllung (alpha=0.25) + FUKA-Füllung für mittlere Abschnitte
  - Negative Flächen: SANGO_LIGHT-Füllung (alpha=0.25)
- Dashed vertikale Linien an Segmentgrenzen (KIKU-Farbe, linewidth=1.2)
- Flächenlabels in jeder Region: "A₁ = XX Einheit"
- Farbcodiert: positive Werte in KIKU, negative in SANGO
- Optional: Annotationen ("Regen hört auf" etc.)

### 3.3 Allgemeine Diagramm-Regeln

```python
# Diese Einstellungen sind Pflicht für ALLE Diagramme:
fig.patch.set_facecolor(BG)        # "#fffcf6"
ax.set_facecolor(BG)
ax.grid(True, color=GRID, linewidth=0.6, alpha=0.8, zorder=0)
ax.spines["top"].set_visible(False)
ax.spines["right"].set_visible(False)
ax.spines["left"].set_color(TEXT_S)
ax.spines["bottom"].set_color(TEXT_S)
ax.tick_params(colors=TEXT_S, labelsize=10)

# Y-Achse: mindestens 15–20% Luft über dem Maximalwert
# Beispiel: max_y=12 → ylim=(-.5, 15)

# Speichern:
fig.savefig(out, dpi=150, bbox_inches="tight", facecolor=BG)
```

### 3.4 Farbzuordnung für Segmente und Flächen

Bei stückweise linearen Graphen mit 3+ Segmenten:

| Segment | Graphlinie | Fläche (Lösung) | Typischer Inhalt |
|---------|-----------|------------------|------------------|
| 1. Abschnitt | KIKU | KIKU (alpha=0.25) | Erstes Rechteck / Dreieck |
| 2. Abschnitt | FUKA | FUKA (alpha=0.15) | Mittleres Segment |
| 3. Abschnitt | SANGO | SANGO (alpha=0.20) | Letztes Segment / Dreieck |
| Negative Flächen | SANGO | SANGO_LIGHT (alpha=0.25) | Unterhalb der x-Achse |

Bei Graphen mit positiven UND negativen Abschnitten:
- Alle positiven Flächen: grünlich (KIKU-Palette)
- Alle negativen Flächen: rötlich (SANGO-Palette)
- Die Vorzeichen (+/−) in den Flächenlabels hervorheben

---

## 4. Arbeitsblatt (DOCX)

### 4.1 Grundstruktur

```
KOPFZEILE: "Arbeitsblatt: [Thema] – [Untertitel]"
           Farbiger Balken (KIKU + SANGO)

AUFGABE B1 — [Name]  ★
   Sachtext (vollständig, selbsterklärend)
   [DIAGRAMM (_leer-Version)]
   Aufgabenstellung (fett: Operatoren)
   Tipp (kursiv, in Hinweisbox oder als Zeile)

AUFGABE B2 — [Name]  ★
   ...

AUFGABE B3 — [Name]  ★★
   ...

FUSSZEILE: Seitenzahlen
```

### 4.2 Regeln für das Arbeitsblatt

1. **Nur Aufgaben, KEINE Lösungen** — das AB ist für die Schülerhand
2. **Keine Wiederholungsbox am Anfang** — die Theorie kommt in der Präsentation
3. **Keine leeren Antwortzeilen** — Schüler rechnen auf eigenem Papier oder im Heft
4. **B4 (Reflexion) weglassen** — gehört in die Präsentation, nicht aufs AB
5. **Diagramme: immer die `_leer`-Version** (kein Label, keine farbigen Flächen)
6. **Tipps kurz und präzise** — maximal 1-2 Sätze, kursiv
7. **Operatoren fett** hervorheben: **Berechne**, **Gib an**, **Erkläre**, **Zeige**
8. **Schwierigkeitssterne** hinter dem Aufgabentitel
9. **A4-Format**, Arial/Calibri, max. 2-3 Seiten

### 4.3 Technische Umsetzung (docx-js)

- Header: farbiger Balken, Thema + Klassenstufe
- Aufgabenblöcke: Heading2 für Aufgabentitel (KIKU-Farbe)
- Diagramme als ImageRun einbetten (transformation: width 420, height 230)
- Tipp-Zeilen: kursiv, eingerückt oder in leichtem Rahmen (MUSHI_LIGHT)
- Footer: zentrierte Seitenzahlen

---

## 5. Zusammenspiel Präsentation ↔ Arbeitsblatt

| Element | Präsentation | Arbeitsblatt |
|---------|-------------|--------------|
| Theorie/Wiederholung | Lernziele-Folie + Beispiel | NICHT enthalten |
| Aufgabentext | Gekürzt auf Folie | Vollständig |
| Diagramm Aufgabe | `_leer`-Version (klein) | `_leer`-Version (groß) |
| Diagramm Lösung | Farbige Flächen + Labels | NICHT enthalten |
| Lösung/Rechnung | Sicherungsfolien | NICHT enthalten |
| Ergebnis im Sachkontext | Antwortbox unten | NICHT enthalten |
| Reflexion (B4) | Zusammenfassung-Folie | NICHT enthalten |
| Hausaufgabe | Eigene Folie(n) | NICHT enthalten |

---

## 6. Workflow

1. **Inhalt extrahieren** — Aus dem Matheportal (index.html) oder vom Nutzer gegebene Aufgaben lesen
2. **Diagramme generieren** — Für jede Aufgabe _leer + Lösung (matplotlib)
3. **Präsentation bauen** — Folienreihenfolge aus §2.1, Helpers aus physik-praesi/Bestände-Template
4. **Arbeitsblatt bauen** — Struktur aus §4.1, nur Aufgaben + _leer-Diagramme
5. **QA** — Beide Dateien konvertieren (soffice→PDF→Bilder) und visuell prüfen
6. **Bereitstellen** — In den Matheportal-Ordner kopieren, computer://-Links anbieten

Lies `references/beispiel-bestaende.md` für ein vollständiges Referenzbeispiel (Folienstruktur, Aufgabentexte, Diagramm-Spezifikationen).
