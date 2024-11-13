import type { FirebaseApp }          from 'firebase/app';
import type { Auth }                 from 'firebase/auth';
import { createContext } from 'react';

export interface FirebaseContextInterface {
    app: FirebaseApp;
    auth: Auth;
    // db: Firestore
    // storage: FirebaseStorage
}

const initialCtxValue: FirebaseContextInterface = {
    app: {} as FirebaseApp,
    auth: {} as Auth
};

export const FirebaseCtx = createContext<FirebaseContextInterface>(initialCtxValue);