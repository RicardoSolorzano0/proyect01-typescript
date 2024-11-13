import type { Auth } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseAuth } from './config';

type LoginParams = {
    email: string;
    password: string;
};

export const loginWithEmailPassword = async (auth: Auth, { email, password }: LoginParams) => {
    try {
        const resp = await signInWithEmailAndPassword(auth, email, password);

        const { displayName, uid } = resp.user;

        // const idTokeResult = await resp.user.getIdTokenResult();

        // // {
        // //     admin: true,
        // //     editor: false,
        // //     viewer: false
        // // }

        // idTokeResult.claims['admin'] // true
        // idTokeResult.claims['editor'] // false
        // idTokeResult.claims['viewer'] // false
        
        return {
            displayName,
            email,
            ok: true,
            uid
        };
    } catch (error) {
        const parsedError = error as { error: string; };

        return {
            errorMessage: parsedError.error, 
            ok: false
        };
    }
};

export const logoutFirebase = async () => {
    return await FirebaseAuth.signOut();
};