import { Auth, signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseAuth } from "./config";

type LoginParams = {
    email: string;
    password: string;
}

export const loginWithEmailPassword = async (auth: Auth, {email, password}:LoginParams) => {
    try{
        const resp = await signInWithEmailAndPassword(auth, email, password);

        const {uid, displayName } = resp.user

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
            ok: true,
            email,
            displayName,
            uid,
        }
    }catch(error){
        const parsedError = error as { error: string };

        return {
            ok:false, 
            errorMessage: parsedError.error
        }
    }
}

export const logoutFirebase = async () => {
    return await FirebaseAuth.signOut();
}