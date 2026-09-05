import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAi_D3ESFwcrcDgFTylCVlkYRK534sdP54",
  authDomain: "jungwon-homepage.firebaseapp.com",
  projectId: "jungwon-homepage",
  storageBucket: "jungwon-homepage.firebasestorage.app",
  messagingSenderId: "594080834053",
  appId: "1:594080834053:web:c5596b4e9a2dec5f82326c",
  measurementId: "G-1C07PNB61R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();
