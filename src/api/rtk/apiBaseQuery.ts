import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import * as firebase      from 'firebase/auth';

const {VITE_BASE_URL} = import.meta.env;

// aqui pueden estar configuraciones de la api como tokens, autenticacion header y configuraciones adicionales
// en caso de necesitar otro backend deberia de crearse uno nuevo
export const apiBaseQuery = fetchBaseQuery({ 
    baseUrl:VITE_BASE_URL,
    prepareHeaders: async (headers) => {
        headers.set('Accept', 'application/json');

        const token = await firebase.getAuth().currentUser?.getIdToken();

        if (token !== null) {
            headers.set('Authorization', `Bearer ${ token }`);
        }

        return headers;
    },
});