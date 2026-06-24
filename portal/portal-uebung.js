/* =====================================================================
   Aufrüst-Schicht: macht bestehende Portal-Aufgaben interaktiv.

   Liest window.PORTAL_SPECS = { panelId: { "V1.1": spec, ... }, ... }
   Eine spec:
     { modus:"auto", felder:[ {typ,...} ], hinweise:[h1,h2] }
     { modus:"selbst", hinweise:[h1,h2] }
   Feld-Typen: vektor(erwartet=[x,y,z]) · zahl(erwartet,tol) ·
               janein(prompt,erwartet) · ortho(n=[x,y,z])

   Pro Aufgabe wird:
     - das Klick-Aufklappen (togTask) deaktiviert,
     - Eingabe/Hinweise/Feedback ergänzt,
     - die VORHANDENE Portallösung (.ta) erst freigegeben, wenn verdient
       (3. Fehlversuch bzw. „Lösung anzeigen").
   Gespeichert wird über window.PortalAuth.save() — nur wenn angemeldet.
   Panel-genau, weil Aufgabennummern kapitelübergreifend mehrdeutig sind.
===================================================================== */
const SPECS = window.PORTAL_SPECS || {};

const CSS = `
.pu{margin-top:16px;padding-top:14px;border-top:1px solid var(--border-light,#f0ece6);font-family:var(--sans,'Inter',system-ui,sans-serif)}
.pu .pu-feld{display:flex;flex-wrap:wrap;align-items:center;gap:14px;margin:12px 0}
.pu .pu-lab{font-size:.95rem;color:var(--ink-soft,#6b6560);min-width:104px}
.pu .pu-vek{display:inline-flex;align-items:stretch}
.pu .pu-mat{position:relative;display:flex;flex-direction:column;gap:7px;padding:7px 17px}
.pu .pu-mat::before,.pu .pu-mat::after{content:"";position:absolute;top:1px;bottom:1px;width:11px;border:2.5px solid var(--ink-muted,#a09a92)}
.pu .pu-mat::before{left:0;border-right:0;border-radius:18px 0 0 18px}
.pu .pu-mat::after{right:0;border-left:0;border-radius:0 18px 18px 0}
.pu input.pu-num{width:62px;padding:7px 6px;border:1px solid var(--border,#e8e4de);border-radius:var(--radius-xs,8px);font:inherit;font-size:1.05rem;text-align:center;background:var(--bg-card,#fff);color:var(--ink,#2c2c2c)}
.pu input.pu-num:focus{outline:none;border-color:var(--kiku,#5b6e2e);box-shadow:0 0 0 3px var(--kiku-light,#e8edda)}
.pu .pu-jn{display:flex;gap:10px}
.pu .pu-jn button{border:1px solid var(--border,#e8e4de);background:var(--bg-card,#fff);border-radius:999px;padding:8px 24px;cursor:pointer;color:var(--ink-soft,#6b6560);font:inherit;font-weight:600;font-size:.95rem;transition:all var(--transition,.2s)}
.pu .pu-jn button:hover{border-color:var(--kiku,#5b6e2e)}
.pu .pu-jn button.pu-aktiv{border-color:var(--kiku,#5b6e2e);background:var(--kiku-bg,#f3f5ec);color:var(--kiku,#5b6e2e)}
.pu .pu-akt{display:flex;align-items:center;gap:14px;flex-wrap:wrap;margin-top:16px}
.pu .pu-btn{background:var(--kiku,#5b6e2e);color:#fff;border:0;padding:10px 26px;border-radius:999px;font:inherit;font-weight:600;font-size:.95rem;cursor:pointer;transition:all var(--transition,.2s)}
.pu .pu-btn:hover{filter:brightness(1.08)}
.pu .pu-btn:disabled{opacity:.5}
.pu .pu-btn2{background:var(--kiku-bg,#f3f5ec);color:var(--kiku,#5b6e2e);border:1px solid var(--kiku-light,#e8edda);padding:9px 18px;border-radius:999px;font:inherit;font-weight:600;font-size:.92rem;cursor:pointer;transition:all var(--transition,.2s)}
.pu .pu-btn2:hover{background:var(--kiku-light,#e8edda)}
.pu .pu-btn2:disabled{opacity:.45;cursor:default}
.pu .pu-info{font-size:.9rem;color:var(--ink-muted,#a09a92)}
.pu .pu-rm{margin-top:12px;font-weight:600;font-size:1rem}
.pu .pu-rm.ok{color:var(--success,#5b6e2e)}.pu .pu-rm.no{color:var(--error,#c75c3a)}
.pu .pu-hint{margin-top:12px;border-left:3px solid var(--mushikuri,#c8b55e);background:var(--mushikuri-light,#f7f3e2);padding:14px 18px;border-radius:var(--radius-sm,14px);font-size:1rem;line-height:1.65;color:var(--ink-soft,#6b6560)}
.pu .pu-hint b{color:#9a8327}
.pu .pu-status{display:inline-block;font-size:.72rem;letter-spacing:.02em;padding:3px 11px;border-radius:999px;font-weight:600;margin-left:10px;vertical-align:middle}
.pu .pu-st-offen{background:var(--border-light,#f0ece6);color:var(--ink-muted,#a09a92)}
.pu .pu-st-ok{background:var(--success-bg,#e8edda);color:var(--success,#5b6e2e)}
.pu .pu-st-loes{background:var(--mushikuri-light,#f7f3e2);color:#9a8327}
.pu .pu-sb{margin-top:12px}
.pu .pu-sb .pu-q{font-size:.95rem;color:var(--ink-soft,#6b6560);margin-bottom:8px}
.pu .pu-sb .pu-row{display:flex;gap:10px;flex-wrap:wrap}
.pu .pu-sb button{border:1px solid var(--border,#e8e4de);background:var(--bg-card,#fff);border-radius:999px;padding:8px 17px;cursor:pointer;font:inherit;font-weight:600;font-size:.9rem;transition:all var(--transition,.2s)}
.pu .pu-sb button:hover{border-color:var(--ink-muted,#a09a92)}
.pu .pu-sb button.b-ok{color:var(--success,#5b6e2e)}.pu .pu-sb button.b-teil{color:#9a8327}.pu .pu-sb button.b-no{color:var(--error,#c75c3a)}
.pu .pu-sb button.pu-aktiv{background:var(--kiku-bg,#f3f5ec);border-color:var(--kiku,#5b6e2e)}
.pu .pu-hinweis-anmeldung{font-size:.82rem;color:var(--ink-muted,#a09a92);margin-top:10px}
/* Klick-Aufklappen deaktiviert (Normalmodus): Chevron aus, kein Pointer */
.tk-top.pu-toggleoff{cursor:default}
.tk-top.pu-toggleoff .tk-toggle{display:none}
/* Präsentationsmodus: Eingabe-/Interaktionsschicht ausblenden, Aufgabe per Klick auf-/zuklappbar */
body.presi .pu{display:none!important}
body.presi .tk-top.pu-toggleoff{cursor:pointer}
body.presi .tk-top.pu-toggleoff .tk-toggle{display:block}
`;

function injectCss() { const s = document.createElement("style"); s.textContent = CSS; document.head.appendChild(s); }
function typeset(node) { if (window.MathJax && window.MathJax.typesetPromise) window.MathJax.typesetPromise([node]).catch(() => {}); }
function num(s) { if (s == null) return NaN; return parseFloat(String(s).replace(",", ".").replace(/\s/g, "")); }
function elFrom(html) { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstChild; }

const ST = new WeakMap(); // tg -> Zustand

function enhanceAll() {
  for (const panelId in SPECS) {
    const root = document.getElementById(panelId);
    if (!root) continue;
    const map = SPECS[panelId];
    root.querySelectorAll(".tg").forEach(tg => {
      const tnEl = tg.querySelector(".tn");
      if (!tnEl) return;
      const nr = tnEl.textContent.trim();
      const spec = map[nr];
      if (!spec || tg.dataset.puEnhanced) return;
      tg.dataset.puEnhanced = "1";
      enhanceTask(panelId, nr, spec, tg);
    });
  }
}

function neutralisiereToggle(tg) {
  const top = tg.querySelector(".tk-top");
  if (top) { top.removeAttribute("onclick"); top.onclick = null; top.classList.add("pu-toggleoff"); }
}
function findeTa(tg) { return tg.querySelector(".ta"); }
function zeigeTa(tg) { const ta = findeTa(tg); if (ta) ta.classList.add("on"); }

function enhanceTask(panelId, nr, spec, tg) {
  neutralisiereToggle(tg);
  const aufgabeId = panelId + ":" + nr;
  const st = { versuche: 0, status: "offen", werte: {}, hinweisstufe: 0, fertig: false };
  ST.set(tg, st);

  const box = document.createElement("div"); box.className = "pu";
  const statusSpan = elFrom(`<span class="pu-status pu-st-offen">offen</span>`);
  // Status an den Aufgabenkopf hängen
  const tkt = tg.querySelector(".tkt") || tg.querySelector(".tk-top");
  if (tkt) tkt.appendChild(statusSpan);
  st.statusSpan = statusSpan;

  if (spec.modus === "auto") {
    spec.felder.forEach((fd, fi) => box.appendChild(feldEl(fd, fi)));
    const akt = elFrom(`<div class="pu-akt"><button class="pu-btn">Antwort prüfen</button><span class="pu-info"></span></div>`);
    box.appendChild(akt);
    box.appendChild(elFrom(`<div class="pu-rm"></div>`));
    box.appendChild(elFrom(`<div class="pu-hints"></div>`));
    akt.querySelector(".pu-btn").addEventListener("click", () => pruefeAuto(aufgabeId, spec, tg, box));
    box.querySelectorAll(".pu-jn button").forEach(btn => btn.addEventListener("click", () => {
      if (st.status !== "offen") return;
      box.querySelectorAll(`.pu-jn button[data-fi="${btn.dataset.fi}"]`).forEach(x => x.classList.remove("pu-aktiv"));
      btn.classList.add("pu-aktiv"); st.werte["f" + btn.dataset.fi] = btn.dataset.val;
    }));
  } else {
    const akt = elFrom(`<div class="pu-akt">
      <button class="pu-btn2 pu-h">Hinweis anzeigen</button>
      <button class="pu-btn2 pu-l">Lösung anzeigen</button></div>`);
    box.appendChild(akt);
    box.appendChild(elFrom(`<div class="pu-hints"></div>`));
    akt.querySelector(".pu-h").addEventListener("click", () => naechsterHinweis(spec, tg, box));
    akt.querySelector(".pu-l").addEventListener("click", () => selbstLoesung(aufgabeId, spec, tg, box));
  }

  if (window.PortalAuth && !window.PortalAuth.istAngemeldet() && !window.PortalAuth.istDemo) {
    box.appendChild(elFrom(`<div class="pu-hinweis-anmeldung">Zum Speichern deines Fortschritts oben rechts anmelden.</div>`));
  }

  // UI nach dem .tk einfügen (innerhalb der .tg)
  const tk = tg.querySelector(".tk");
  if (tk && tk.parentNode === tg) tk.insertAdjacentElement("afterend", box); else tg.appendChild(box);
  typeset(box);
}

function feldEl(fd, fi) {
  if (fd.typ === "janein") {
    return elFrom(`<div class="pu-feld"><span class="pu-lab">${fd.prompt || "Antwort:"}</span>
      <span class="pu-jn"><button type="button" data-fi="${fi}" data-val="ja">Ja</button>
      <button type="button" data-fi="${fi}" data-val="nein">Nein</button></span></div>`);
  }
  if (fd.typ === "zahl") {
    return elFrom(`<div class="pu-feld"><span class="pu-lab">${fd.label || "Ergebnis"}</span>
      <input class="pu-num" data-fi="${fi}" data-k="0" inputmode="decimal" placeholder="?"></div>`);
  }
  const lab = fd.label || "Vektor";
  return elFrom(`<div class="pu-feld"><span class="pu-lab">${lab}</span>
    <span class="pu-vek"><span class="pu-mat">
      <input class="pu-num" data-fi="${fi}" data-k="0" inputmode="decimal" placeholder="?">
      <input class="pu-num" data-fi="${fi}" data-k="1" inputmode="decimal" placeholder="?">
      <input class="pu-num" data-fi="${fi}" data-k="2" inputmode="decimal" placeholder="?">
    </span></span></div>`);
}

function gefuellt(spec, tg, box) {
  const st = ST.get(tg);
  for (let fi = 0; fi < spec.felder.length; fi++) {
    const fd = spec.felder[fi];
    if (fd.typ === "janein") { if (!st.werte["f" + fi]) return false; }
    else { for (const inp of box.querySelectorAll(`input[data-fi="${fi}"]`)) if (inp.value.trim() === "") return false; }
  }
  return true;
}
function korrekt(spec, tg, box) {
  const st = ST.get(tg);
  for (let fi = 0; fi < spec.felder.length; fi++) {
    const fd = spec.felder[fi];
    if (fd.typ === "janein") { if (st.werte["f" + fi] !== fd.erwartet) return false; }
    else if (fd.typ === "zahl") {
      const v = num(box.querySelector(`input[data-fi="${fi}"][data-k="0"]`).value);
      if (isNaN(v) || Math.abs(v - fd.erwartet) > (fd.tol || 1e-6)) return false;
    } else {
      const vals = [0, 1, 2].map(k => num(box.querySelector(`input[data-fi="${fi}"][data-k="${k}"]`).value));
      if (vals.some(isNaN)) return false;
      if (fd.typ === "ortho") {
        const dot = vals[0] * fd.n[0] + vals[1] * fd.n[1] + vals[2] * fd.n[2];
        if (Math.abs(dot) > 1e-6 || vals.every(x => Math.abs(x) < 1e-9)) return false;
      } else { for (let k = 0; k < 3; k++) if (Math.abs(vals[k] - fd.erwartet[k]) > (fd.tol || 1e-6)) return false; }
    }
  }
  return true;
}

async function pruefeAuto(aufgabeId, spec, tg, box) {
  const st = ST.get(tg); if (st.status !== "offen") return;
  const rm = box.querySelector(".pu-rm");
  if (!gefuellt(spec, tg, box)) { rm.className = "pu-rm no"; rm.textContent = "Bitte alle Felder ausfüllen."; return; }
  st.versuche++;
  if (korrekt(spec, tg, box)) {
    st.status = "geloest"; setStatus(st, "ok", `gelöst nach ${st.versuche} Versuch${st.versuche > 1 ? "en" : ""}`);
    rm.className = "pu-rm ok"; rm.textContent = st.versuche === 1 ? "Richtig — auf Anhieb!" : "Richtig gelöst!";
    sperre(box);
    await save(aufgabeId, spec, { versuche: st.versuche, geloest: true, loesungAngezeigt: false, hinweisstufe: Math.min(st.versuche - 1, 2) });
  } else {
    rm.className = "pu-rm no"; rm.textContent = "Noch nicht richtig.";
    box.querySelector(".pu-info").textContent = `Versuche: ${st.versuche}`;
    if (st.versuche >= 3) {
      st.status = "loesung"; zeigeTa(tg); setStatus(st, "loes", "Lösung gezeigt"); sperre(box);
      await save(aufgabeId, spec, { versuche: st.versuche, geloest: false, loesungAngezeigt: true, hinweisstufe: 2 });
    } else {
      zeigeHinweis(spec, box, st.versuche - 1);
      await save(aufgabeId, spec, { versuche: st.versuche, geloest: false, loesungAngezeigt: false, hinweisstufe: st.versuche });
    }
  }
}

function naechsterHinweis(spec, tg, box) {
  const genutzt = box.querySelectorAll(".pu-hint").length;
  if (genutzt >= spec.hinweise.length) return;
  zeigeHinweis(spec, box, genutzt);
  const st = ST.get(tg); st.hinweisstufe = genutzt + 1;
  if (genutzt + 1 >= spec.hinweise.length) { const b = box.querySelector(".pu-h"); if (b) b.disabled = true; }
}
async function selbstLoesung(aufgabeId, spec, tg, box) {
  const st = ST.get(tg); if (st.loesungOffen) return; st.loesungOffen = true;
  zeigeTa(tg); setStatus(st, "loes", "Lösung angesehen");
  const sb = elFrom(`<div class="pu-sb"><div class="pu-q">Wie war deine Lösung im Vergleich?</div>
    <div class="pu-row"><button class="b-ok" data-v="richtig">Hatte ich richtig</button>
      <button class="b-teil" data-v="teilweise">Teilweise</button>
      <button class="b-no" data-v="falsch">Hatte ich falsch</button></div></div>`);
  box.querySelector(".pu-hints").appendChild(sb);
  sb.querySelectorAll("button").forEach(btn => btn.addEventListener("click", async () => {
    sb.querySelectorAll("button").forEach(x => x.classList.remove("pu-aktiv")); btn.classList.add("pu-aktiv");
    st.status = "selbst-" + btn.dataset.v;
    await save(aufgabeId, spec, { versuche: 0, geloest: btn.dataset.v === "richtig", loesungAngezeigt: true, selbstbewertung: btn.dataset.v, hinweisstufe: st.hinweisstufe || 0 });
  }));
}

function zeigeHinweis(spec, box, stufe) {
  if (stufe >= spec.hinweise.length) return;
  const d = elFrom(`<div class="pu-hint"><b>Hinweis ${stufe + 1}:</b> ${spec.hinweise[stufe]}</div>`);
  box.querySelector(".pu-hints").appendChild(d); typeset(d);
}
function setStatus(st, typ, text) {
  if (!st.statusSpan) return;
  st.statusSpan.className = "pu-status " + (typ === "ok" ? "pu-st-ok" : typ === "loes" ? "pu-st-loes" : "pu-st-offen");
  st.statusSpan.textContent = text;
}
function sperre(box) {
  box.querySelectorAll("input.pu-num").forEach(i => i.disabled = true);
  box.querySelectorAll(".pu-jn button").forEach(b => b.disabled = true);
  const p = box.querySelector(".pu-btn"); if (p) { p.disabled = true; p.style.display = "none"; }
  const info = box.querySelector(".pu-info"); if (info) info.textContent = "";
}
async function save(aufgabeId, spec, daten) {
  try { if (window.PortalAuth) await window.PortalAuth.save(aufgabeId, { aufgabeTitel: aufgabeId.split(":")[1], modus: spec.modus, ...daten }); }
  catch (e) { console.warn("Speichern fehlgeschlagen:", e); }
}

// Im Präsentationsmodus: Klick auf den Aufgabenkopf blendet die Musterlösung (.ta) ein/aus
document.addEventListener("click", (e) => {
  if (!document.body.classList.contains("presi")) return;
  const top = e.target.closest(".tk-top.pu-toggleoff");
  if (!top) return;
  const tg = top.closest(".tg"); if (!tg) return;
  const ta = tg.querySelector(".ta"); if (ta) ta.classList.toggle("on");
});

injectCss();
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", enhanceAll);
else enhanceAll();
window.PortalUebung = { enhanceAll };
