import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { AuthPage, HomePage, ErrorPage } from "./pages";
import { Provider } from "react-redux";
import { store } from "./store/store.js";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
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
        <Provider Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </StrictMode>,
);
