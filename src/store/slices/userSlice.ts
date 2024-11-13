import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
    displayName: string;
    email: string;
    uid: string;
}

const initialState: UserState = {
    displayName: '',
    email: '',
    uid: ''
};

export const userSlice = createSlice({
    initialState,
    name: 'user',
    reducers: {
        logoutUser: state => {
            state.displayName = '';
            state.email = '';
            state.uid = '';
        },
        setCurrentUser: (state, action: PayloadAction<UserState>) => {
            state.displayName = action.payload.displayName;
            state.email = action.payload.email;
            state.uid = action.payload.uid;
        }
    }
});

export const { logoutUser, setCurrentUser } = userSlice.actions;

export default userSlice.reducer;