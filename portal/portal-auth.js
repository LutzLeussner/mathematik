/* =====================================================================
   Portal-Login & Datenspeicherung (eine Anmeldung fürs ganze Portal).

   - Baut eine kleine Login-Leiste oben rechts.
   - Anmeldung mit Matrikelnummer + PIN (Firebase Auth).
   - Das Portal bleibt OHNE Login voll nutzbar; nur das SPEICHERN des
     Fortschritts erfordert eine Anmeldung.
   - Stellt window.PortalAuth bereit:
       .matrikel            aktuelle Matrikelnummer oder null
       .istAngemeldet()     true/false
       .istDemo             true, wenn Firebase noch nicht eingerichtet
       .onChange(cb)        ruft cb(matrikel) bei jeder Änderung
       .save(aufgabeId, daten)  speichert einen Versuch (nur wenn angemeldet)
   Lädt das modulare Firebase-SDK nur, wenn eine echte Config gesetzt ist.
===================================================================== */
const cfg = window.FIREBASE_CONFIG || { apiKey: "DEIN_API_KEY" };
const DOMAIN = window.PORTAL_EMAIL_DOMAIN || "@schueler.matheportal.local";
const DEMO = !cfg.apiKey || cfg.apiKey.indexOf("DEIN_") === 0;

let auth = null, db = null, FB = {};
let matrikel = null;
const listeners = [];
function notify() { listeners.forEach(cb => { try { cb(matrikel); } catch (e) {} }); }

if (!DEMO) {
  const { initializeApp } = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js");
  const { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } =
    await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js");
  const { getFirestore, doc, setDoc, serverTimestamp } =
    await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js");
  const app = initializeApp(cfg);
  auth = getAuth(app); db = getFirestore(app);
  FB = { signInWithEmailAndPassword, signOut, doc, setDoc, serverTimestamp };
  onAuthStateChanged(auth, (user) => {
    matrikel = user ? (user.email || "").split("@")[0] : null;
    aktualisiereLeiste(); notify();
  });
}

/* ---------------------------------------------------------------- API */
window.PortalAuth = {
  get matrikel() { return matrikel; },
  istAngemeldet() { return !!matrikel; },
  istDemo: DEMO,
  onChange(cb) { listeners.push(cb); cb(matrikel); },
  async login(mat, pin) {
    if (DEMO) { if (!mat || !pin) throw new Error("Bitte Matrikelnummer und PIN eingeben."); matrikel = mat; aktualisiereLeiste(); notify(); return; }
    await FB.signInWithEmailAndPassword(auth, String(mat).toLowerCase() + DOMAIN, pin);
  },
  async logout() { if (!DEMO) await FB.signOut(auth); else { matrikel = null; aktualisiereLeiste(); notify(); } },
  async save(aufgabeId, daten) {
    if (DEMO) { console.log("[DEMO speichern]", aufgabeId, daten); return "demo"; }
    if (!matrikel) return false;
    const ref = FB.doc(db, "ergebnisse", matrikel + "__" + aufgabeId);
    await FB.setDoc(ref, { matrikel, aufgabeId, ...daten, letzteAktivitaet: FB.serverTimestamp() }, { merge: true });
    return true;
  }
};

/* ---------------------------------------------------------- Login-Leiste */
const STYLE = `
.pa-bar{position:fixed;top:12px;right:14px;z-index:9999;font-family:"Avenir Next","Avenir","Segoe UI",system-ui,sans-serif}
.pa-pill{display:flex;align-items:center;gap:10px;background:#2e7d5b;color:#fff;border-radius:24px;padding:7px 8px 7px 14px;box-shadow:0 2px 8px rgba(0,0,0,.18);font-size:.86rem}
.pa-pill .pa-name{font-weight:600;white-space:nowrap}
.pa-pill button{background:rgba(255,255,255,.18);color:#fff;border:1px solid rgba(255,255,255,.5);border-radius:16px;padding:5px 12px;cursor:pointer;font-size:.82rem;font-weight:600}
.pa-pill button:hover{background:rgba(255,255,255,.3)}
.pa-form{margin-top:8px;background:#fff;border:1px solid #dfe5e8;border-radius:12px;box-shadow:0 6px 20px rgba(0,0,0,.16);padding:14px;width:230px}
.pa-form.pa-hidden{display:none}
.pa-form label{display:block;font-size:.74rem;color:#5b6770;font-weight:600;margin:6px 0 3px}
.pa-form input{width:100%;padding:8px 10px;border:1.5px solid #dfe5e8;border-radius:8px;font-size:.92rem}
.pa-form input:focus{outline:none;border-color:#2e7d5b}
.pa-form .pa-go{width:100%;margin-top:10px;background:#2e7d5b;color:#fff;border:0;border-radius:8px;padding:9px;font-weight:600;cursor:pointer}
.pa-form .pa-err{color:#c0392b;font-size:.78rem;min-height:1em;margin-top:6px}
.pa-demo{font-size:.7rem;color:#7a5712;background:#fdf4e2;border:1px solid #eed9af;border-radius:7px;padding:5px 7px;margin-top:8px}
`;

function el(html) { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstChild; }

let bar, form, errBox;
function baueLeiste() {
  const st = document.createElement("style"); st.textContent = STYLE; document.head.appendChild(st);
  bar = el(`<div class="pa-bar">
    <div class="pa-pill"><span class="pa-name">Nicht angemeldet</span>
      <button class="pa-toggle">Anmelden</button></div>
    <div class="pa-form pa-hidden">
      <label>Matrikelnummer</label><input type="text" class="pa-mat" inputmode="numeric" placeholder="z. B. 100423">
      <label>PIN / Passwort</label><input type="password" class="pa-pin">
      <button class="pa-go">Anmelden</button>
      <div class="pa-err"></div>
      ${DEMO ? '<div class="pa-demo"><b>Demo-Modus.</b> Beliebige Eingabe; es wird nichts gespeichert.</div>' : ''}
    </div></div>`);
  document.body.appendChild(bar);
  form = bar.querySelector(".pa-form"); errBox = bar.querySelector(".pa-err");
  bar.querySelector(".pa-toggle").addEventListener("click", onToggle);
  bar.querySelector(".pa-go").addEventListener("click", onGo);
  bar.querySelector(".pa-pin").addEventListener("keydown", e => { if (e.key === "Enter") onGo(); });
  aktualisiereLeiste();
}
function onToggle() {
  if (matrikel) { window.PortalAuth.logout(); return; }
  form.classList.toggle("pa-hidden");
}
async function onGo() {
  errBox.textContent = "";
  const mat = bar.querySelector(".pa-mat").value.trim();
  const pin = bar.querySelector(".pa-pin").value;
  const go = bar.querySelector(".pa-go"); go.disabled = true; go.textContent = "Anmelden …";
  try { await window.PortalAuth.login(mat, pin); form.classList.add("pa-hidden"); bar.querySelector(".pa-pin").value = ""; }
  catch (err) { errBox.textContent = uebersetze(err); }
  finally { go.disabled = false; go.textContent = "Anmelden"; }
}
function uebersetze(err) {
  const c = err && err.code ? err.code : "";
  if (c.includes("invalid-credential") || c.includes("wrong-password")) return "Matrikelnummer oder PIN falsch.";
  if (c.includes("user-not-found")) return "Matrikelnummer nicht registriert.";
  if (c.includes("too-many-requests")) return "Zu viele Versuche. Später erneut.";
  return (err && err.message) || "Anmeldung fehlgeschlagen.";
}
function aktualisiereLeiste() {
  if (!bar) return;
  const name = bar.querySelector(".pa-name"), tog = bar.querySelector(".pa-toggle");
  if (matrikel) { name.textContent = "Matrikel " + matrikel + (DEMO ? " · Demo" : ""); tog.textContent = "Abmelden"; }
  else { name.textContent = DEMO ? "Nicht angemeldet · Demo" : "Nicht angemeldet"; tog.textContent = "Anmelden"; }
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", baueLeiste);
else baueLeiste();
