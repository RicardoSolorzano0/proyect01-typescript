/* eslint-disable @typescript-eslint/no-explicit-any */
// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
//import type { Pokemon } from './types'

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
    endpoints: builder => ({
        getAllPokemon: builder.query<any, number>({
            query: limit => `pokemon?limit=${limit}`
        }),
        getPokemonByName: builder.query<any, string>({
            query: name => `pokemon/${name}`
        }),
        getPokemonByType: builder.query<any, string>({
            query: name => `pokemon/${name}`
        })
    }),
    reducerPath: 'pokemonApi'
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { 
    useGetAllPokemonQuery,
    useGetPokemonByNameQuery,
    useGetPokemonByTypeQuery,
    //creandolo con lazy para el momento que nosotros necesitemos que se dispare en un momento determinado
    useLazyGetPokemonByNameQuery
} = pokemonApi;