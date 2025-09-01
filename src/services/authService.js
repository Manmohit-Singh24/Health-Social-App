import { account, ID } from "./appwrite";

const host = window.location.host;

const authService = {
    async register({ email, password, fullname, name }) {
        const promise = account.create(ID.unique(), email, password, fullname, name);
        let res;
        promise.then(
            function (response) {
                res = {
                    message: "Register successfully",
                    success: true,
                    data: response,
                };
            },
            function (error) {
                res = {
                    message: error.message,
                    success: false,
                    data: error,
                };
            },
        );
        return res;
    },

    async login({ email, password }) {
        const promise = account.createEmailPasswordSession(email, password);

        let res;
        promise.then(
            function (response) {
                res = {
                    message: "Login successfully",
                    success: true,
                    data: response,
                };
            },
            function (error) {
                res = {
                    message: error.message,
                    success: false,
                    data: error,
                };
            },
        );
        return res;
    },

    async isLoggedIn() {
        const promise = account.get();

        let res;
        promise.then(
            function (response) {
                res = {
                    message: "User is logged in",
                    success: true,
                    data: response,
                };
            },
            function (error) {
                res = {
                    message: error.message,
                    success: false,
                    data: error,
                };
            },
        );
        return res;
    },

    async logout() {
        const promise = account.deleteSession("current");

        let res;
        promise.then(
            function (response) {
                res = {
                    message: "Logout successfully",
                    success: true,
                    data: response,
                };
            },
            function (error) {
                res = {
                    message: error.message,
                    success: false,
                    data: error,
                };
            },
        );
        return res;
    },

    async requestResetPassword({ email }) {
        const promise = account.createRecovery(email, `https://${host}/auth/resete-password/`);

        let res;
        promise.then(
            function (response) {
                res = {
                    message: "Reset password successfully",
                    success: true,
                    data: response,
                };
            },
            function (error) {
                res = {
                    message: error.message,
                    success: false,
                    data: error,
                };
            },
        );
        return res;
    },

    async resetPassword({ userId, secret, newPassword }) {
        const promise = account.updateRecovery(userId, secret, newPassword);

        let res;
        promise.then(
            function (response) {
                res = {
                    message: "Reset password successfully",
                    success: true,
                    data: response,
                };
            },
            function (error) {
                res = {
                    message: error.message,
                    success: false,
                    data: error,
                };
            },
        );
        return res;
    },
};

export default authService;
