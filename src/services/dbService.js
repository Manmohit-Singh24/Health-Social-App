import { databases, ID, config, Query } from "./appwrite";

const dbService = {
    async checkUsernameAvailability({ username }) {
        const promise = databases.listRows(config.databaseID, "profiles", [
            Query.equal("username", username),
        ]);

        return promise
            .then((response) => ({
                message: "Username checked",
                success: true,
                data: response,
            }))
            .catch((error) => ({
                message: error.message,
                success: false,
                data: error,
            }));
    },

    async addProfileData(data) {
        const promise = databases.createRow(config.databaseID, "profiles", ID.unique(), data);

        return promise
            .then((response) => ({
                message: "Username added",
                success: true,
                data: response,
            }))
            .catch((error) => ({
                message: error.message,
                success: false,
                data: error,
            }));
    },

    async getProfileData({ userId }) {
        const promise = databases.listRows(config.databaseID, "profiles", [
            Query.equal("userId", userId),
        ]);

        return promise
            .then((response) => ({
                message: "Successfully made request",
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

export default dbService;
