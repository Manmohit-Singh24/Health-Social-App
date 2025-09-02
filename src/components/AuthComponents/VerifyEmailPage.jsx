import authService from "../../services/authService";
import { Button } from "../ui";
import { useSearchParams, useNavigate } from "react-router";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { VscLoading } from "react-icons/vsc";
import { useSelector } from "react-redux";

const VerifyEmailPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [backendError, setBackendError] = useState("");

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const userId = searchParams.get("userId");
    const secret = searchParams.get("secret");

    const isLoggedIn = useSelector((state) => state.AuthData.isLoggedIn);

    const onSubmit = async () => {
        setIsLoading(true);
        const res = await authService.verifyEmail({ userId, secret });
        if (res.success) {
            toast.success("Email verified");
            setSearchParams({});
            navigate("/");
        } else {
            setBackendError(res.message);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!isLoggedIn || !userId || !secret) navigate("/auth/login");
        (async () => await onSubmit())();
    });

    return (
        <div>
            <Button type="submit" className="w-full mt-2" onClick={onSubmit}>
                {isLoading ? (
                    <>
                        <VscLoading className="animate-spin" />
                        Please wait
                    </>
                ) : (
                    "Verify Email"
                )}
            </Button>

            {backendError && (
                <p className="text-center text-sm text-red-500 mt-4">{backendError}</p>
            )}
        </div>
    );
};

export default VerifyEmailPage;
