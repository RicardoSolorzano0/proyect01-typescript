import type { PayloadAction }   from '@reduxjs/toolkit';
import { createSlice }          from '@reduxjs/toolkit';

export interface PaginationState {
    page: number | null;
}

const initialState: PaginationState = {
    page: 1
};

const paginationSlice = createSlice({
    initialState,
    name: 'pagination',
    reducers: {
        setPage: (state, action: PayloadAction<number | null>) => {
            state.page = action.payload;
        }
    }
});

export const { setPage } = paginationSlice.actions;

const paginationReducer = paginationSlice.reducer;
export default paginationReducer;
