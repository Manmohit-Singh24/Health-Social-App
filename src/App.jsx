import { Outlet } from "react-router-dom";
import { useSelector , useDispatch } from "react-redux";
import { setAuthData } from "./store/Features/authSlice";
import { useEffect } from "react";
import authService from "./services/authService";
import { Toaster } from "sonner";
const App = () => {
    const dispatch = useDispatch();
    const theme = useSelector((state) => state.UIData.Theme);

    useEffect(() => {
        (async () => {
            const res = await authService.isLoggedIn();
            if (res.success) {
                dispatch(setAuthData({ ...res.data, isLogedIn: true }));
            }
        })();
    });

    return (
        <div className={`AppContainer ${theme} bg-background w-screen h-screen p-3`}>
            <Toaster position="top-left" />
            <Outlet />
        </div>
    );
};

export default App;
