import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
    email: string,
    uid:string,
    displayName: string
}

const initialState: UserState = {
    displayName: '',
    email: '',
    uid:''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        setCurrentUser : (state, action: PayloadAction<UserState>) => {
            state.displayName = action.payload.displayName
            state.email = action.payload.email
            state.uid = action.payload.uid
        },
        logoutUser : (state) => {
            state.displayName = ''
            state.email = ''
            state.uid = ''
        },
    }
})

export const { logoutUser, setCurrentUser} = userSlice.actions

export default userSlice.reducer