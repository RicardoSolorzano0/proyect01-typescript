import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "@/store/slices/counterSlice";
import { pokemonApi } from "@/api/services/pokemon";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userAppApi } from "@/api/rtk/userApp.api";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        [pokemonApi.reducerPath]: pokemonApi.reducer,
        // [userTypesApi.reducerPath]: userTypesApi.reducer,
        // [userApi.reducerPath]: userApi.reducer
        [userAppApi.reducerPath]: userAppApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
        .concat(pokemonApi.middleware)
        // .concat(userTypesApi.middleware)
        // .concat(userApi.middleware),
        .concat(userAppApi.middleware)
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch