import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, connectAuthEmulator } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyAi_D3ESFwcrcDgFTylCVlkYRK534sdP54",
  authDomain: "jungwon-homepage.firebaseapp.com",
  projectId: "jungwon-homepage",
  storageBucket: "jungwon-homepage.firebasestorage.app",
  messagingSenderId: "594080834053",
  appId: "1:594080834053:web:c5596b4e9a2dec5f82326c",
  measurementId: "G-1C07PNB61R"
};

import { initializeAppCheck, ReCaptchaEnterpriseProvider } from "firebase/app-check";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase App Check (reCAPTCHA Enterprise v3)
if (typeof window !== "undefined") {
  // Use debug token in development (localhost, local IP, or dev domains) automatically
  if (
    window.location.hostname === "localhost" || 
    window.location.hostname === "127.0.0.1" || 
    window.location.hostname.includes("dev") || 
    window.location.hostname.startsWith("192.168.") ||
    window.location.hostname.startsWith("10.") ||
    import.meta.env.DEV
  ) {
    self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
  }
  initializeAppCheck(app, {
    provider: new ReCaptchaEnterpriseProvider("6LfKpKstAAAAAF24-jBwqpq2Uv34p_u4lGZ6bFXu"),
    isTokenAutoRefreshEnabled: true,
  });
}

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();
export const functions = getFunctions(app);

if (typeof window !== "undefined" && window.location.hostname === "localhost") {
  connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
}
