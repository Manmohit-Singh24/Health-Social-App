import { Client, Account, TablesDB, Storage, Functions } from "appwrite";

export const config = {
    appwriteURL: String(import.meta.env.VITE_APPWRITE_ENDPOINT),
    projectID: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    databaseID: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    databaseID: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    bucketID: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
};

export { ID, OAuthProvider , Query } from "appwrite";

export const client = new Client();
client.setEndpoint(config.appwriteURL).setProject(config.projectID);

export const account = new Account(client);

export const databases = new TablesDB(client);

export const bucket = new Storage(client);

export const functions = new Functions(client);
