import { createSlice } from "@reduxjs/toolkit";

type TInitialState = {
    page: number,
    limit: number,
    total: number,
    totalPage: number,
    isLoading: boolean,
    expand: boolean,
}

const initialState: TInitialState = {
    page: 1,
    limit: 10,
    total: 0,
    totalPage: 0,
    isLoading: false,
    expand: false
};

const paginationSlice = createSlice({
    name: "pagination",
    initialState,
    reducers: {
        setPage: (state, action) => {
            const page = action.payload;
            if (page == "...") {
                state.expand = true
            } else {
                state.expand = false
                state.page = page
            }
        },
        setLimit: (state, action) => {
            const totalPage = Math.ceil(state.total / action.payload)
            if (state.page >= totalPage) {
                // state.page = totalPage // forward to last page
                state.page = 1 // forward to first page
            }
            state.limit = action.payload;
        },
        setTotalPage: (state, action) => {
            const { totalPage, total } = action.payload
            state.totalPage = totalPage;
            state.total = total;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});
export const { setPage, setLimit, setTotalPage, setIsLoading } = paginationSlice.actions;

export default paginationSlice.reducer;
