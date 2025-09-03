import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
    name: "AuthData",
    initialState: {
        username: undefined,
        email: undefined,
        name : undefined,
        profilePic: undefined,
        userId : undefined,
        isLogedIn: false,
    },
    reducers: {
        setAuthData: (state, action) => {
            let data = action.payload;
            for (let key in data) state[key] = data[key];
        },
    },
});

export const { setAuthData } = AuthSlice.actions;
export default AuthSlice.reducer;
