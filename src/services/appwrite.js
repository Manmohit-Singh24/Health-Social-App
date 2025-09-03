import { Client, Account, Databases, Storage, Functions } from "appwrite";

export const conf = {
    appwriteURL: String(import.meta.env.VITE_APPWRITE_ENDPOINT),
    projectID: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    databaseID: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    collectionID: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    bucketID: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
};

export { ID } from "appwrite";

export { OAuthProvider } from "appwrite";

export const client = new Client();
client.setEndpoint(conf.appwriteURL).setProject(conf.projectID);

export const account = new Account(client);

export const databases = new Databases(client);

export const bucket = new Storage(client);

export const functions = new Functions(client);
