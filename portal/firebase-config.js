/* =====================================================================
   Zentrale Firebase-Konfiguration für das Matheportal.
   Nur EINMAL pflegen — alle Seiten/Module lesen window.FIREBASE_CONFIG.

   Trage hier die Werte aus deinem Firebase-Projekt ein
   (Firebase Console → Projekteinstellungen → Web-App → SDK-Konfiguration).
   Solange "DEIN_API_KEY" stehen bleibt, läuft alles im DEMO-Modus
   (kein echter Login, keine Speicherung) — ideal zum Testen.
===================================================================== */
window.FIREBASE_CONFIG = {
  apiKey: "AIzaSyCRWRvDOL9bJmz0WjSXzr0ovHcLjDSGaRY",
  authDomain: "matheportaluebung.firebaseapp.com",
  projectId: "matheportaluebung",
  storageBucket: "matheportaluebung.firebasestorage.app",
  messagingSenderId: "657292868421",
  appId: "1:657292868421:web:2586b992fc27d4b6b69c2c"
};

/* Interne Login-Domain für Matrikelnummern (kein echter Mailversand). */
window.PORTAL_EMAIL_DOMAIN = "@schueler.matheportal.local";
