import { useEffect } from "react";
import authService from "../../services/authService";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthData } from "../../store/Features/authSlice";
import { useSearchParams } from "react-router-dom";
import { VscLoading } from "react-icons/vsc";
import dbService from "../../services/dbService";

const OAuth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [searchParams] = useSearchParams();
    const userId = searchParams.get("userId");
    const secret = searchParams.get("secret");

    useEffect(() => {
        (async () => {
            const tokenRes = await authService.createSession({ userId, secret });

            if (tokenRes.success) {
                const resCheckLogin = await authService.isLoggedIn();

                if (resCheckLogin.success) {
                    const { email, name, $id: userId } = resCheckLogin.data;

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

                            toast.success("Logged In From Google");
                            navigate("/");
                        } else {
                            toast.warning("Please Complete Your Profile");
                            navigate("/auth/edit-profile");
                        }
                    } else {
                        toast.error(resUserData.message);
                        navigate("/auth/login");
                    }
                } else {
                    toast.error(resCheckLogin.message);
                    navigate("/auth/login");
                }
            } else {
                toast.error(tokenRes.message);
                navigate("/auth/login");
            }
        })();
    }, []);

    return <VscLoading className="animate-spin" />;
};

export default OAuth;
