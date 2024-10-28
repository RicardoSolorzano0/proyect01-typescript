// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
//import type { Pokemon } from './types'

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query<any, string>({
      query: (name) => `pokemon/${name}`,
    }),
    getAllPokemon: builder.query<any, number>({
      query: (limit) => `pokemon?limit=${limit}`,
    }),
    getPokemonByType: builder.query<any, string>({
      query: (name) => `pokemon/${name}`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { 
  useGetPokemonByNameQuery,
  useGetAllPokemonQuery,
  useGetPokemonByTypeQuery,
  //creandolo con lazy para el momento que nosotros necesitemos que se dispare en un momento determinado
  useLazyGetPokemonByNameQuery,
} = pokemonApi