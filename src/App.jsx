import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAuthData } from "./store/Features/authSlice";
import { useEffect, useState } from "react";
import authService from "./services/authService";
import dbService from "./services/dbService";
import { toast, Toaster } from "sonner";
import { VscLoading } from "react-icons/vsc";

const App = () => {
    const dispatch = useDispatch();
    const theme = useSelector((state) => state.UIData.Theme);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        (async () => {
            const res = await authService.isLoggedIn();

            if (res.success) {
                const { email, name, $id: userId } = res.data;

                dispatch(
                    setAuthData({
                        email,
                        name,
                        userId,
                        isLogedIn: true,
                    }),
                );

                const resUserData = await dbService.getProfileData({ userId });

                if (resUserData.success) {
                    if (resUserData.data.total > 0) {
                        dispatch(
                            setAuthData({
                                username: resUserData.data.rows[0].username,
                            }),
                        );
                        setIsLoading(false);
                    } else {
                        toast.warning("Please Complete Your Profile");
                        setIsLoading(false);
                    }
                } else setIsLoading(false);
            } else setIsLoading(false);
        })();
    }, []);

    return (
        <div className={`AppContainer ${theme} bg-background w-screen h-screen p-3`}>
            {isLoading ? (
                <div className="flex items-center justify-center h-screen">
                    <VscLoading className="animate-spin size-50" />
                </div>
            ) : (
                <>
                    <Toaster position="top-left" />
                    <Outlet />
                </>
            )}
        </div>
    );
};

export default App;
