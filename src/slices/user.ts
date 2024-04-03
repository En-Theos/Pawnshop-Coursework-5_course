import { createSlice } from "@reduxjs/toolkit"

const initialState: {
    id: number,
    name: string,
    email: string,
    isActivated: boolean
} = {
    id: 0, 
    name: "",
    email: "", 
    isActivated: false
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setData: (state, action) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.isActivated = action.payload.isActivated;
        },

        clearData: (state) => {
            state.id = 0;
            state.name = "";
            state.email = ""; 
            state.isActivated = false;
        }
    }
});

const { reducer, actions } = userSlice;

export default reducer;

export const {
    setData,
    clearData
} = actions