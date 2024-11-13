import { initializeApp } from 'firebase/app';
import { 
    connectAuthEmulator,
    getAuth } from 'firebase/auth';

const {
    VITE_API_KEY,
    VITE_APP_ID,
    VITE_AUTH_DOMAIN,
    VITE_MEASUREMENT_ID,
    VITE_MESSAGING_SENDER_ID,
    VITE_PROJECT_ID,
    VITE_STORAGE_BUCKET
} = import.meta.env;

const firebaseConfig = {
    apiKey: VITE_API_KEY,
    appId: VITE_APP_ID,
    authDomain: VITE_AUTH_DOMAIN,
    measurementId: VITE_MEASUREMENT_ID,
    messagingSenderId: VITE_MESSAGING_SENDER_ID,
    projectId: VITE_PROJECT_ID,
    storageBucket: VITE_STORAGE_BUCKET
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const FirebaseAuth = getAuth(FirebaseApp);
connectAuthEmulator(FirebaseAuth, 'http://127.0.0.1:9099');