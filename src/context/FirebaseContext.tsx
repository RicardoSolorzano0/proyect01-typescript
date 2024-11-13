import { useContext } from 'react';
import { FirebaseCtx } from './FirebaseCtx';

export const useFirebaseContext = () => useContext(FirebaseCtx);