import { useEffect, useState } from "react";
import { data, Link, useNavigate, useParams } from "react-router-dom";
import {
    LoginForm,
    RegisterForm,
    ForgotPasswordForm,
    CheckEmailPage,
    ResetPasswordForm,
} from "../components/AuthComponents";
import GoogleLoginButton from "../components/AuthComponents/GoogleLoginButton";
const AuthPage = () => {
    const { authType } = useParams();
    const navigate = useNavigate();

    let formComponent = <></>;
    let heading = "Oops! Wrong Route";

    let isValidAuthType = true;

    if (authType === "login") {
        formComponent = <LoginForm />;
        heading = "Sign in to Health-Social-App";
    } else if (authType === "register") {
        formComponent = <RegisterForm />;
        heading = "Welcome to Health-Social-App";
    } else if (authType === "forgot-password") {
        formComponent = <ForgotPasswordForm />;
        heading = "Enter your email to reset password";
    } else if (authType === "check-email") {
        formComponent = <CheckEmailPage />;
        heading = "Check your email";
    } else if (authType === "reset-password") {
        formComponent = <ResetPasswordForm />;
        heading = "Reset your password";
    } else {
        isValidAuthType = false;
    }

    useEffect(() => {
        if (!isValidAuthType) {
            navigate("/auth/login");
        }
    }, [authType]);

    return (
        <div id="AuthPageContainer" className="min-h-screen flex items-center justify-center">
            <div id="AuthPageFormContainer" className="w-fit flex flex-col items-center gap-4">
                {/* Title */}
                <h1 className="text-4xl font-bold text-center border-b-2 pb-2">{heading}</h1>

                <div className="w-sm flex flex-col items-center gap-4">
                    {/* Google Sign-in */}
                    {authType === "login" ||
                        (authType === "register" && (
                            <>
                                <GoogleLoginButton />
                                <p className="text-center text-gray-500">or</p>
                            </>
                        ))}
                    {formComponent}
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
