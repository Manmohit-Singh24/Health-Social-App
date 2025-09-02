import { Client, Users, Query } from 'node-appwrite';

// This Appwrite function will be executed every time your function is triggered
export default async ({ req, res, log, error }) => {

    const client = new Client()
        .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT)
        .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
        .setKey(process.env.APPWRITE_API_KEY);

    const users = new Users(client);

    try {
        const { email } = JSON.parse(req.body || "{}");
        if (!email) {
            return res.json({ success: false, error: "Email is required" }, 400);
        }

        const found = await users.list([Query.equal("email", email)]);

        if (found.total > 0) {
            return res. json({ message: "Email is already in use",  success: true }, 200);
        } else {
            return res.json({ message: "Email is available", success: false }, 200);
        }

    } catch (err) {
        error(error);
        return res.json({ success: false, error: error.message }, 500);
    }
};
