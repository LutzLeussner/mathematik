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
.pu{margin-top:12px;border-top:1px dashed #d4ddd7;padding-top:12px}
.pu .pu-feld{display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:8px 0}
.pu .pu-lab{font-size:.84rem;color:#5b6770;font-weight:600;min-width:92px}
.pu .pu-vek{display:inline-flex;align-items:center;gap:6px}
.pu .pu-vek .pu-kl{font-size:2rem;color:#9aa6ac;line-height:1}
.pu .pu-vek .pu-sp{display:flex;flex-direction:column;gap:5px}
.pu input.pu-num{width:74px;padding:7px 8px;border:1.5px solid #dfe5e8;border-radius:7px;font-size:.98rem;text-align:center;font-family:inherit}
.pu input.pu-num:focus{outline:none;border-color:#2e7d5b}
.pu .pu-jn{display:flex;gap:9px}
.pu .pu-jn button{border:1.5px solid #dfe5e8;background:#fff;border-radius:9px;padding:7px 20px;cursor:pointer;font-weight:600;color:#5b6770;font-family:inherit;font-size:.95rem}
.pu .pu-jn button.pu-aktiv{border-color:#2e7d5b;background:#e7f2ec;color:#1f5a40}
.pu .pu-akt{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-top:10px}
.pu .pu-btn{background:#2e7d5b;color:#fff;border:0;padding:9px 20px;border-radius:9px;font-weight:600;cursor:pointer;font-family:inherit;font-size:.92rem}
.pu .pu-btn:hover{background:#1f5a40}
.pu .pu-btn:disabled{opacity:.5}
.pu .pu-btn2{background:#fff;color:#1f5a40;border:1.5px solid #2e7d5b;padding:8px 16px;border-radius:9px;font-weight:600;cursor:pointer;font-family:inherit;font-size:.9rem}
.pu .pu-btn2:hover{background:#e7f2ec}
.pu .pu-btn2:disabled{opacity:.45;cursor:default}
.pu .pu-info{font-size:.84rem;color:#5b6770}
.pu .pu-rm{margin-top:10px;font-weight:600}
.pu .pu-rm.ok{color:#1f5a40}.pu .pu-rm.no{color:#c0392b}
.pu .pu-hint{margin-top:10px;border-left:4px solid #b9821a;background:#fdf4e2;padding:10px 14px;border-radius:0 8px 8px 0;font-size:.94rem;color:#22303a}
.pu .pu-hint b{color:#b9821a}
.pu .pu-status{display:inline-block;font-size:.74rem;padding:2px 9px;border-radius:20px;font-weight:600;margin-left:8px}
.pu .pu-st-offen{background:#f5f7f8;color:#5b6770}
.pu .pu-st-ok{background:#e7f2ec;color:#1f5a40}
.pu .pu-st-loes{background:#fdf4e2;color:#b9821a}
.pu .pu-sb{margin-top:10px}
.pu .pu-sb .pu-q{font-size:.9rem;color:#5b6770;margin-bottom:6px}
.pu .pu-sb .pu-row{display:flex;gap:9px;flex-wrap:wrap}
.pu .pu-sb button{border:1.5px solid #dfe5e8;background:#fff;border-radius:9px;padding:7px 15px;cursor:pointer;font-weight:600;font-size:.88rem;font-family:inherit}
.pu .pu-sb button.b-ok{color:#1f5a40}.pu .pu-sb button.b-teil{color:#b9821a}.pu .pu-sb button.b-no{color:#c0392b}
.pu .pu-sb button.pu-aktiv{background:#f5f7f8;border-color:#5b6770}
.pu-hinweis-anmeldung{font-size:.78rem;color:#8a9499;margin-top:8px}
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
  if (top) { top.removeAttribute("onclick"); top.onclick = null; top.style.cursor = "default"; const tog = top.querySelector(".tk-toggle"); if (tog) tog.style.display = "none"; }
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
    <span class="pu-vek"><span class="pu-kl">(</span><span class="pu-sp">
      <input class="pu-num" data-fi="${fi}" data-k="0" inputmode="decimal" placeholder="?">
      <input class="pu-num" data-fi="${fi}" data-k="1" inputmode="decimal" placeholder="?">
      <input class="pu-num" data-fi="${fi}" data-k="2" inputmode="decimal" placeholder="?">
    </span><span class="pu-kl">)</span></span></div>`);
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

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", enhanceAll);
else enhanceAll();
window.PortalUebung = { enhanceAll };
