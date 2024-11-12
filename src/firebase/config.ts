import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";

const {
    VITE_API_KEY,
    VITE_AUTH_DOMAIN,
    VITE_PROJECT_ID,
    VITE_STORAGE_BUCKET,
    VITE_MESSAGING_SENDERID,
    VITE_APP_ID,
    VITE_MEASUREMENT_ID
} = import.meta.env

const firebaseConfig = {
    apiKey: VITE_API_KEY,
    authDomain: VITE_AUTH_DOMAIN,
    projectId: VITE_PROJECT_ID,
    storageBucket: VITE_STORAGE_BUCKET,
    messagingSenderId: VITE_MESSAGING_SENDERID,
    appId: VITE_APP_ID,
    measurementId: VITE_MEASUREMENT_ID
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const FirebaseAuth = getAuth(FirebaseApp);
connectAuthEmulator(FirebaseAuth, "http://127.0.0.1:9099");