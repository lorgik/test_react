import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface PaginationState {
    totalPages: number | null
}

const initialState: PaginationState = {
    totalPages: null,
}

const paginationSlice = createSlice({
    name: "pagination",
    initialState,
    reducers: {
        setTotalPages: (state, action: PayloadAction<number>) => {
            state.totalPages = action.payload
        },
    },
})

export const { setTotalPages } = paginationSlice.actions
export default paginationSlice.reducer
