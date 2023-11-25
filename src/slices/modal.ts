import { createSlice } from "@reduxjs/toolkit"

const initialState: {
    show: boolean,
    idData: number,
    ifViews: boolean
} = {
    show: false,
    idData: -1,
    ifViews: true
}

const heroesSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        showModal: state => {state.show = true},
        hideModal: state => {state.show = false},
        setIdData: (state, action) => {
            state.idData = action.payload
        },
        trueIfViews: state => {
            state.ifViews = true;
        },
        falseIfViews: state => {
            state.ifViews = false;
        }
    }
});

const { reducer, actions } = heroesSlice;

export default reducer;

export const {
    showModal,
    hideModal,
    setIdData,
    trueIfViews,
    falseIfViews
} = actions