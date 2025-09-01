import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import {AuthPage , HomePage} from "./pages";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/auth",
                element: <AuthPage />,
                children: [
                    {
                        path: "/auth/:authType",
                        element: <AuthPage />,
                    },
                ],
            },
            {
                path: "/",
                element: <HomePage />,
            },
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);
