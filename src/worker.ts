import "./config/env.config";
import { connectDB } from "./infrastructure/database/connectDB";
import { EmailWorker } from "./infrastructure/queue/EmailWorker";

async function runWorker() {
    try {
        await connectDB();
        console.log("Background Worker Service connected to database");
        new EmailWorker();
        console.log("Background Worker Service is running.");

    } catch (error) {
        console.error("Failed to start Worker Service:", error);
        process.exit(1);
    }
}

runWorker()