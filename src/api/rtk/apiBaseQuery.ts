import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const {VITE_BASE_URL} = import.meta.env;

// aqui pueden estar configuraciones de la api como tokens, autenticacion header y configuraciones adicionales
// en caso de necesitar otro backend deberia de crearse uno nuevo
export const apiBaseQuery = fetchBaseQuery({ baseUrl:VITE_BASE_URL});