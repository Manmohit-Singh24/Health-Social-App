import { Client, Users, Query } from "node-appwrite";

export default async ({ req, res, log }) => {
    try {
        // Initialize SDK
        const client = new Client()
            .setEndpoint("https://cloud.appwrite.io/v1")
            .setProject(process.env.APPWRITE_PROJECT_ID)
            .setKey(process.env.APPWRITE_API_KEY);

        const users = new Users(client);

        // Parse email from request body
        const { email } = JSON.parse(req.body || "{}");

        if (!email) {
            return res.json({ success: false, error: "Email is required" }, 400);
        }

        // Search for user by email
        const found = await users.list([Query.equal("email", email)]);

        if (found.total > 0) {
            return res.json({ exists: true });
        } else {
            return res.json({ exists: false });
        }
    } catch (error) {
        log(error);
        return res.json({ success: false, error: error.message }, 500);
    }
};
