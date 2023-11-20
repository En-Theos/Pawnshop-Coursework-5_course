import { createSlice, createEntityAdapter } from "@reduxjs/toolkit"

import { IDataLots } from "./interfaces";
import { RootState } from "../store/store";

const lotsAdapter = createEntityAdapter<IDataLots>();

const heroesSlice = createSlice({
    name: "lots",
    initialState: lotsAdapter.getInitialState({
        lotsStatus: 'idle'
    }),
    reducers: {
        lotsFetching: state => { state.lotsStatus = 'loading' },
        lotsFetched: (state, action) => {
            lotsAdapter.setAll(state, action.payload);
            state.lotsStatus = 'idle';
        },
        lotsFetchingError: state => { state.lotsStatus = 'error' },
        lotsUpdate: (state, action) => {
            lotsAdapter.updateOne(state, action.payload);
            state.lotsStatus = 'idle';
        },
    }
});

const { reducer, actions } = heroesSlice;

export default reducer;

export const { selectAll } = lotsAdapter.getSelectors<RootState>(state => state.lots)

export const {
    lotsFetching,
    lotsFetched,
    lotsFetchingError,
    lotsUpdate
} = actions