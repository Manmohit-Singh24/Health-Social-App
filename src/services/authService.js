import { account, ID, functions } from "./appwrite";

const host = window.location.host;

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

    async register({ email, password, username, fullname }) {
        const promise = account.create(ID.unique(), email, password, username, fullname);

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
        const promise = account.createVerification(`http://${host}/auth/verify-email/`);

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
        const promise = account.createRecovery(email, `http://${host}/auth/reset-password/`);

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
