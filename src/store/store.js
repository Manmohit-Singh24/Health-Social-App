import { configureStore } from "@reduxjs/toolkit";
import AuthData from "./Features/authSlice";

export const store = configureStore({
    reducer: {
        AuthData : AuthData
    },
});
