import { Button } from "../components/ui";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toogleTheme } from "../store/Features/uiSlice";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineWbSunny } from "react-icons/md";
import { setAuthData } from "../store/Features/authSlice";
import { useState } from "react";
const HomePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLogedIn = useSelector((state) => state.AuthData.isLogedIn);
    const theme = useSelector((state) => state.UIData.Theme);

    const [showLogin, setShowLogin] = useState(undefined);
    const logout = async () => {
        if (!isLogedIn) {
            navigate("/auth/login");
        }
        const res = await authService.logout();
        if (res.success) {
            navigate("/auth/login");
            dispatch(setAuthData({ isLogedIn: false }));
        }
    };

    const checkLogin = async () => {
        const res = await authService.isLoggedIn();
        if (res.success) {
            setShowLogin(`Hi ${res.data.name} , You are Logged In from ${res.data.email}`);
        } else {
            setShowLogin(`Sorry, you are not logged in`);
        }
    };

    const changeTheme = () => {
        dispatch(toogleTheme());
    };
    return (
        <div className="flex flex-col items-center justify-center h-screen gap-10">
            <h1 className="text-7xl text-foreground">HOMEPAGE</h1>
            {isLogedIn ? (
                <Button onClick={logout}>Logout</Button>
            ) : (
                <Button onClick={() => navigate("/auth/login")}> Login </Button>
            )}
            <Button onClick={changeTheme} variant={"secondary"}>
                {theme === "light" ? <MdOutlineDarkMode /> : <MdOutlineWbSunny />}
            </Button>
            <Button onClick={checkLogin}> Know if Logged In </Button>

            {showLogin && <p className="text-foreground">{showLogin}</p>}
        </div>
    );
};

export default HomePage;
