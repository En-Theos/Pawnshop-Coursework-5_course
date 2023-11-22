import { createSlice } from "@reduxjs/toolkit"

const initialState: {
    show: boolean,
    idData: number
} = {
    show: false,
    idData: -1
}

const heroesSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        showModal: state => {state.show = true},
        hideModal: state => {state.show = false},
        setIdData: (state, action) => {
            state.idData = action.payload
        }
    }
});

const { reducer, actions } = heroesSlice;

export default reducer;

export const {
    showModal,
    hideModal,
    setIdData
} = actions