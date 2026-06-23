/* Aufgaben-Specs für den Vektoren-Tab (Panel #k12-vek).
   Soll-Antworten + gestaffelte Hinweise. Frage und Lösung bleiben im index.html.
   Feld-Typen: vektor(erwartet=[x,y,z]) · zahl(erwartet,tol) · janein(prompt,erwartet) · ortho(n=[x,y,z]). */
window.PORTAL_SPECS = window.PORTAL_SPECS || {};
window.PORTAL_SPECS["k12-vek"] = {
 "V1.1": {
  "modus": "auto",
  "felder": [
   {
    "typ": "vektor",
    "label": "Ortsvektor",
    "erwartet": [
     4,
     -2,
     3
    ]
   }
  ],
  "hinweise": [
   "Der Ortsvektor eines Punktes zeigt vom Ursprung \\(O\\) direkt zum Punkt. Seine Koordinaten sind genau die Punktkoordinaten.",
   "Schreibe die drei Koordinaten von \\(P\\) als Spaltenvektor."
  ]
 },
 "V1.2": {
  "modus": "auto",
  "felder": [
   {
    "typ": "vektor",
    "erwartet": [
     4,
     -2,
     6
    ]
   }
  ],
  "hinweise": [
   "Beim Multiplizieren mit einer Zahl (Skalar) wird jede Komponente einzeln mit der Zahl multipliziert.",
   "Rechne \\(2\\cdot 2,\\; 2\\cdot(-1),\\; 2\\cdot 3\\)."
  ]
 },
 "V1.3": {
  "modus": "auto",
  "felder": [
   {
    "typ": "vektor",
    "label": "Summe",
    "erwartet": [
     4,
     1,
     6
    ]
   },
   {
    "typ": "zahl",
    "label": "Betrag (gerundet)",
    "erwartet": 7.280109889280518,
    "tol": 0.05
   }
  ],
  "hinweise": [
   "Vektoren addierst du komponentenweise: \\(x+x,\\;y+y,\\;z+z\\). Den Betrag bildest du danach aus dem Summenvektor.",
   "Betrag: \\(|\\vec v|=\\sqrt{x^2+y^2+z^2}\\). Quadriere jede Komponente der Summe und addiere."
  ]
 },
 "V1.4": {
  "modus": "auto",
  "felder": [
   {
    "typ": "janein",
    "prompt": "Sind die Vektoren kollinear?",
    "erwartet": "ja"
   }
  ],
  "hinweise": [
   "Kollinear heißt: ein Vektor ist ein Vielfaches des anderen. Suche eine Zahl \\(r\\) mit \\(\\vec a=r\\cdot\\vec b\\).",
   "Vergleiche die Verhältnisse \\(2/1,\\;4/2,\\;6/3\\) — sind sie alle gleich?"
  ]
 },
 "V1.6": {
  "modus": "auto",
  "felder": [
   {
    "typ": "ortho",
    "label": "Vektor m",
    "n": [
     2,
     3,
     1
    ]
   }
  ],
  "hinweise": [
   "Senkrecht (orthogonal) bedeutet: das Skalarprodukt \\(\\vec n\\cdot\\vec m\\) ist 0.",
   "Wähle z. B. eine Komponente 0 und stelle die anderen so ein, dass \\(2m_1+3m_2+1m_3=0\\). Der Nullvektor zählt nicht."
  ]
 },
 "B1.1": {
  "modus": "selbst",
  "felder": [],
  "hinweise": [
   "Trage jeden Punkt über seinen Bauplan ein: erst \\(x\\) nach vorne, dann \\(y\\) nach rechts, dann \\(z\\) nach oben.",
   "Verbinde \\(A,B,C\\) zum Dreieck. Achte auf die Kavalierperspektive (\\(x\\) schräg nach vorn)."
  ]
 },
 "B1.2": {
  "modus": "auto",
  "felder": [
   {
    "typ": "janein",
    "prompt": "Ist das Dreieck gleichseitig?",
    "erwartet": "nein"
   }
  ],
  "hinweise": [
   "Gleichseitig heißt: alle drei Seiten gleich lang. Berechne die Beträge \\(|\\vec{PQ}|,|\\vec{PR}|,|\\vec{QR}|\\).",
   "\\(|\\vec{QR}|=\\sqrt{8}=2\\sqrt2\\approx 2{,}83\\), die anderen sind 2 — vergleiche."
  ]
 },
 "B1.3": {
  "modus": "selbst",
  "felder": [],
  "hinweise": [
   "b) Quadrat nur, wenn benachbarte Seiten gleich lang sind: vergleiche \\(|\\vec{AB}|\\) und \\(|\\vec{AD}|\\).",
   "\\(|\\vec{AB}|=3,\\;|\\vec{AD}|=\\sqrt5\\approx 2{,}24\\) → verschieden → kein Quadrat."
  ]
 },
 "B1.4": {
  "modus": "auto",
  "felder": [
   {
    "typ": "janein",
    "prompt": "Ist der Quader ein Würfel?",
    "erwartet": "ja"
   }
  ],
  "hinweise": [
   "Ein Würfel hat drei gleich lange, paarweise senkrechte Kanten. Die Senkrechtheit ist gegeben — prüfe nur die Längen.",
   "Berechne \\(|\\vec{AB}|,|\\vec{AD}|,|\\vec{AE}|\\). Sind alle drei gleich?"
  ]
 },
 "V2.1": {
  "modus": "auto",
  "felder": [
   {
    "typ": "vektor",
    "label": "v",
    "erwartet": [
     3,
     -2,
     3
    ]
   },
   {
    "typ": "zahl",
    "label": "Betrag (gerundet)",
    "erwartet": 4.69041575982343,
    "tol": 0.05
   }
  ],
  "hinweise": [
   "Der Verschiebungsvektor ist \\(\\vec v=Q-P\\) („Spitze minus Fuß“).",
   "Betrag danach: \\(|\\vec v|=\\sqrt{v_1^2+v_2^2+v_3^2}\\)."
  ]
 },
 "V2.2": {
  "modus": "auto",
  "felder": [
   {
    "typ": "janein",
    "prompt": "Stehen die Vektoren senkrecht?",
    "erwartet": "ja"
   }
  ],
  "hinweise": [
   "Zwei Vektoren stehen senkrecht, wenn ihr Skalarprodukt 0 ist.",
   "Rechne \\(\\vec a\\cdot\\vec b=1\\cdot2+0\\cdot5+(-2)\\cdot1\\)."
  ]
 },
 "V2.3": {
  "modus": "selbst",
  "felder": [],
  "hinweise": [
   "Der Mittelpunkt liegt genau zwischen den Punkten: \\(\\vec{OM}=\\tfrac12(\\vec{OB}+\\vec{OC})\\).",
   "Rechne komponentenweise \\((b_i+c_i)/2\\)."
  ]
 },
 "V2.4": {
  "modus": "selbst",
  "felder": [],
  "hinweise": [
   "Für ein Parallelogramm muss \\(\\vec{AD}=\\vec{BC}\\) gelten (gegenüberliegende Seiten gleich).",
   "Bestimme \\(D\\) so, dass sich das Viereck schließt."
  ]
 },
 "V2.5": {
  "modus": "auto",
  "felder": [
   {
    "typ": "janein",
    "prompt": "Sind die Vektoren kollinear?",
    "erwartet": "nein"
   }
  ],
  "hinweise": [
   "Prüfe, ob ein \\(r\\) existiert mit \\(\\vec b=r\\,\\vec a\\): aus einer Komponente \\(r\\) bestimmen, dann Probe.",
   "Aus der 1. Komponente folgt \\(r=-2\\). Passt damit die 2. Komponente (\\(3\\) vs. \\(-4\\cdot(-2)=8\\))?"
  ]
 },
 "V2.6": {
  "modus": "selbst",
  "felder": [],
  "hinweise": [
   "Zeichne ein rechtwinkliges Dreieck: Bodenprojektion als Ankathete, Höhe als Gegenkathete.",
   "Die Weglänge ist die Hypotenuse: \\(\\sqrt{\\text{Boden}^2+\\text{Höhe}^2}\\)."
  ]
 },
 "V2.7": {
  "modus": "selbst",
  "felder": [],
  "hinweise": [
   "Nutze die Winkelformel \\(\\cos\\alpha=\\dfrac{\\vec a\\cdot\\vec b}{|\\vec a|\\,|\\vec b|}\\).",
   "Wenn \\(\\vec a\\cdot\\vec b=0\\) und beide \\(\\ne\\vec0\\), ist \\(\\cos\\alpha=0\\), also \\(\\alpha=90^\\circ\\)."
  ]
 },
 "V2.8": {
  "modus": "selbst",
  "felder": [],
  "hinweise": [
   "Ortsvektor: vom Ursprung zum Punkt (absolute Lage). Verbindungsvektor: von einem Punkt zum anderen.",
   "Es gilt \\(\\vec{AB}=\\vec{OB}-\\vec{OA}\\) („Spitze minus Fuß“)."
  ]
 },
 "V2.9": {
  "modus": "selbst",
  "felder": [],
  "hinweise": [
   "Rechter Winkel in \\(P\\): \\(\\vec{PO}\\cdot\\vec{PQ}_a=0\\). Stelle das Skalarprodukt auf.",
   "Die \\(a\\)-Komponente von \\(\\vec{PO}\\) ist 0 — \\(a\\) hat keinen Hebel. Was folgt für die Lösung?"
  ]
 },
 "V2.10": {
  "modus": "selbst",
  "felder": [],
  "hinweise": [
   "\\(\\vec v_S\\) (Osten) und \\(\\vec v_W\\) (Norden) stehen senkrecht → rechtwinkliges Dreieck.",
   "Betrag der Resultierenden: \\(\\sqrt{v_S^2+v_W^2}\\)."
  ]
 },
 "V2.11": {
  "modus": "selbst",
  "felder": [],
  "hinweise": [
   "Jedes Vielfache von \\(\\vec a\\) ist kollinear zu \\(\\vec a\\).",
   "Wähle z. B. \\(2\\vec a,\\;-\\vec a,\\;\\tfrac12\\vec a\\)."
  ]
 },
 "V2.12": {
  "modus": "auto",
  "felder": [
   {
    "typ": "janein",
    "prompt": "Sind die Vektoren kollinear?",
    "erwartet": "ja"
   }
  ],
  "hinweise": [
   "Suche \\(r\\) mit \\(\\vec a=r\\,\\vec b\\): aus einer Komponente bestimmen, dann Probe in allen.",
   "Aus der 1. Komponente: \\(3=r\\cdot(-1)\\Rightarrow r=-3\\). Probe bestätigt."
  ]
 },
 "V2.13": {
  "modus": "auto",
  "felder": [
   {
    "typ": "janein",
    "prompt": "Sind die Vektoren kollinear?",
    "erwartet": "nein"
   }
  ],
  "hinweise": [
   "Vergleiche die Komponentenverhältnisse \\(\\vec v\\) zu \\(\\vec u\\): \\(6/2,\\;12/4,\\;2/1\\).",
   "Sind alle drei gleich? Wenn nein → nicht kollinear."
  ]
 },
 "V2.14": {
  "modus": "auto",
  "felder": [
   {
    "typ": "zahl",
    "label": "t",
    "erwartet": -4
   }
  ],
  "hinweise": [
   "Ansatz \\((t,6,-4)=r\\,\\vec a\\). Bestimme \\(r\\) aus einer Komponente ohne \\(t\\).",
   "Aus der 2. Komponente: \\(6=r\\cdot(-3)\\Rightarrow r=-2\\). Dann \\(t=r\\cdot2\\)."
  ]
 },
 "V3.1": {
  "modus": "selbst",
  "felder": [],
  "hinweise": [
   "Eine Verschiebung addiert \\(\\vec v\\) zu Punkt und Ortsvektor; der freie Vektor selbst ändert sich nicht.",
   "\\(P\\) und \\(\\vec{OP}\\) wandern um \\(\\vec v\\); der freie Vektor \\(\\vec a\\) bleibt gleich."
  ]
 },
 "V3.2": {
  "modus": "selbst",
  "felder": [],
  "hinweise": [
   "Trage für Punkt, Ortsvektor und freien Vektor je „vorher / nachher / Regel“ ein.",
   "Regel: Punkt und Ortsvektor verschieben sich, der freie Vektor bleibt."
  ]
 },
 "V3.3": {
  "modus": "selbst",
  "felder": [],
  "hinweise": [
   "Nutze gleiche Koordinaten für Punkt und Vektor, aber verschiedene Bedeutung.",
   "Stelle Teilaufgaben, die Verbindungsvektor, Verschiebung und Betrag unterscheiden."
  ]
 },
 "L1.1": {
  "modus": "auto",
  "felder": [
   {
    "typ": "vektor",
    "label": "w",
    "erwartet": [
     -1,
     6,
     7
    ]
   }
  ],
  "hinweise": [
   "Skaliere zuerst: berechne \\(2\\vec a\\) und \\(3\\vec b\\) einzeln (jede Komponente mal der Zahl).",
   "Addiere danach komponentenweise \\(2\\vec a+3\\vec b\\)."
  ]
 },
 "L1.2": {
  "modus": "auto",
  "felder": [
   {
    "typ": "vektor",
    "label": "w",
    "erwartet": [
     2,
     -5,
     3
    ]
   }
  ],
  "hinweise": [
   "Schreibe es als \\(\\vec a+(-2)\\vec b\\). Berechne \\(-2\\vec b\\), dann addieren.",
   "\\(-2\\vec b=(-2,-4,0)\\); rechne \\(\\vec a+(-2\\vec b)\\)."
  ]
 },
 "L1.4": {
  "modus": "auto",
  "felder": [
   {
    "typ": "vektor",
    "label": "w",
    "erwartet": [
     2,
     1,
     -1
    ]
   }
  ],
  "hinweise": [
   "Skaliere jeden Vektor einzeln: \\(-\\vec a,\\;2\\vec b,\\;3\\vec c\\).",
   "Addiere alle drei komponentenweise."
  ]
 },
 "L2.1": {
  "modus": "selbst",
  "felder": [],
  "hinweise": [
   "Im Parallelogramm: \\(\\vec{AC}=\\vec{AB}+\\vec{AD}=\\vec a+\\vec b\\).",
   "\\(\\vec{BD}=\\vec{AD}-\\vec{AB}=\\vec b-\\vec a\\); \\(\\vec{DB}=\\vec a-\\vec b\\)."
  ]
 },
 "L2.2": {
  "modus": "selbst",
  "felder": [],
  "hinweise": [
   "\\(M\\) ist Mittelpunkt der Diagonale \\(\\overline{AC}\\): \\(\\vec{AM}=\\tfrac12\\vec{AC}\\).",
   "\\(\\vec{AC}=\\vec a+\\vec b\\Rightarrow \\vec{AM}=\\tfrac12(\\vec a+\\vec b)\\)."
  ]
 },
 "L2.3": {
  "modus": "selbst",
  "felder": [],
  "hinweise": [
   "Im regelmäßigen Sechseck haben die Eckvektoren von \\(M\\) gleichen Betrag, je um \\(60^\\circ\\) gedreht.",
   "Drücke die Ecken über \\(\\vec u=\\vec{MA}\\) und \\(\\vec v=\\vec{MB}\\) aus; Nachbarecken sind Summen/Differenzen."
  ]
 },
 "L2.4": {
  "modus": "selbst",
  "felder": [],
  "hinweise": [
   "Skizziere das Dreieck im Schrägbild; nutze \\(\\vec{AS}=\\tfrac13\\vec{AB}+\\tfrac13\\vec{AC}\\).",
   "Setze \\(\\vec{AB}\\) und \\(\\vec{AC}\\) ein und rechne komponentenweise."
  ]
 },
 "L2.5": {
  "modus": "selbst",
  "felder": [],
  "hinweise": [
   "Setze in \\(\\vec{OP}=\\tfrac23\\vec a+\\tfrac12\\vec b\\) ein und strecke wie gefragt.",
   "\\(\\vec{OP'}=2\\,\\vec{OP}=\\tfrac43\\vec a+1\\cdot\\vec b\\)."
  ]
 },
 "L2.6": {
  "modus": "selbst",
  "felder": [],
  "hinweise": [
   "Lies den Term als Weg von \\(A\\) aus: erst entlang \\(\\vec a\\), dann entlang \\(\\vec b\\).",
   "\\(\\vec a+\\tfrac12\\vec b\\) führt zum Mittelpunkt von \\(\\overline{BC}\\)."
  ]
 }
};
