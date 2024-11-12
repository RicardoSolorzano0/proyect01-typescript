import type { FirebaseApp }          from 'firebase/app';
import type { Auth }                 from 'firebase/auth';
import { createContext, useContext } from 'react';

interface FirebaseContextInterface {
    app: FirebaseApp
    auth: Auth
    // db: Firestore
    // storage: FirebaseStorage
}

const initialCtxValue: FirebaseContextInterface = {
    app: {} as FirebaseApp,
    auth: {} as Auth
};

export const FirebaseCtx = createContext<FirebaseContextInterface>(initialCtxValue);
export const useFirebaseContext = () => useContext(FirebaseCtx);