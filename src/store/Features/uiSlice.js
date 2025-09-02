import { createSlice } from "@reduxjs/toolkit";

const UISlice = createSlice({
    name: "AuthData",
    initialState: {
        Theme : "light",
    },
    reducers: {
        setTheme: (state, action) => {
            state.Theme = action.payload.theme
        },
        toogleTheme: (state) => {
            state.Theme = state.Theme === "light" ? "dark" : "light"
        },
    },
});

export const { setTheme, toogleTheme } = UISlice.actions;
export default UISlice.reducer;
