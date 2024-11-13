import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { userAppApi } from '@/api/rtk/userApp.api';
import { pokemonApi } from '@/api/services/pokemon';
import counterReducer from '@/store/slices/counterSlice';
import paginationReducer from '@/store/slices/paginationSlice';
import userReducer from '@/store/slices/userSlice';

export const store = configureStore({
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
            .concat(pokemonApi.middleware)
        // .concat(userTypesApi.middleware)
        // .concat(userApi.middleware),
            .concat(userAppApi.middleware),
    reducer: {
        counter: counterReducer,
        pagination: paginationReducer,
        [pokemonApi.reducerPath]: pokemonApi.reducer,
        user: userReducer,
        // [userTypesApi.reducerPath]: userTypesApi.reducer,
        // [userApi.reducerPath]: userApi.reducer
        [userAppApi.reducerPath]: userAppApi.reducer
    }
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;