import { createSession } from "react-router-dom";
import { account, ID, functions, OAuthProvider } from "./appwrite";

const origin = window.location.origin;
const authService = {
    async checkEmailAvailablity({ email }) {
        const promise = functions.createExecution(
            "68b6cc08000bd310c82e",
            JSON.stringify({ email }),
        );

        return promise
            .then((response) => ({
                message: JSON.parse(response.responseBody).message,
                success: JSON.parse(response.responseBody).success,
            }))
            .catch((error) => ({
                message: error.message,
                success: false,
                data: error,
            }));
    },

    async register({ email, password, fullname }) {
        const promise = account.create(ID.unique(), email, password, fullname);

        return promise
            .then((response) => ({
                message: "Register successfully",
                success: true,
                data: response,
            }))
            .catch((error) => ({
                message: error.message,
                success: false,
                data: error,
            }));
    },

    async login({ email, password }) {
        const promise = account.createEmailPasswordSession(email, password);

        return promise
            .then((response) => ({
                message: "Login successfully",
                success: true,
                data: response,
            }))
            .catch((error) => ({
                message: error.message,
                success: false,
                data: error,
            }));
    },

    async sendVerificationLink() {
        const promise = account.createVerification(`${origin}/auth/verify-email/`);

        return promise
            .then((response) => ({
                message: "Verification link sent",
                success: true,
                data: response,
            }))
            .catch((error) => ({
                message: error.message,
                success: false,
                data: error,
            }));
    },

    async verifyEmail({ userId, secret }) {
        const promise = account.updateVerification(userId, secret);

        return promise
            .then((response) => ({
                message: "Email verified",
                success: true,
                data: response,
            }))
            .catch((error) => ({
                message: error.message,
                success: false,
                data: error,
            }));
    },

    //Preffered method for OAuth as we can bypass CORS error here for secure browsers like firefox and brave
    googleTokenLogin() {
        account.createOAuth2Token(
            OAuthProvider.Google,
            `${origin}/auth/oauth`,
            `${origin}/auth/login`,
        );
    },
    googleLogin() {
        account.createOAuth2Session(
            OAuthProvider.Google,
            `${origin}/auth/oauth`,
            `${origin}/auth/login`,
        );
    },

    async createSession({ userId, secret }) {
        const promise = account.createSession(userId, secret);

        return promise
            .then((response) => ({
                message: "Session created",
                success: true,
                data: response,
            }))
            .catch((error) => ({
                message: error.message,
                success: false,
                data: error,
            }));
    },

    async isLoggedIn() {
        const promise = account.get();

        return promise
            .then((response) => ({
                message: "User is logged in",
                success: true,
                data: response,
            }))
            .catch((error) => ({
                message: error.message,
                success: false,
                data: error,
            }));
    },

    async logout() {
        const promise = account.deleteSession("current");

        return promise
            .then((response) => ({
                message: "Logout successfully",
                success: true,
                data: response,
            }))
            .catch((error) => ({
                message: error.message,
                success: false,
                data: error,
            }));
    },

    async requestResetPassword({ email }) {
        const promise = account.createRecovery(email, `${origin}/auth/reset-password/`);

        return promise
            .then((response) => ({
                message: "Reset password request sent",
                success: true,
                data: response,
            }))
            .catch((error) => ({
                message: error.message,
                success: false,
                data: error,
            }));
    },

    async resetPassword({ userId, secret, newPassword }) {
        const promise = account.updateRecovery(userId, secret, newPassword);

        return promise
            .then((response) => ({
                message: "Password reset successfully",
                success: true,
                data: response,
            }))
            .catch((error) => ({
                message: error.message,
                success: false,
                data: error,
            }));
    },
};

export default authService;
