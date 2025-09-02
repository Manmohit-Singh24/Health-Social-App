import { configureStore } from "@reduxjs/toolkit";
import AuthData from "./Features/authSlice";
import UIData from "./Features/uiSlice";

export const store = configureStore({
    reducer: {
        AuthData: AuthData,
        UIData: UIData,
    },
});
