import "./config/env.config";
import { connectDB } from "./infrastructure/database/connectDB";
import { AutomatedExpiryCronService } from "./infrastructure/services/AutomatedExpiryCronService";

async function runCronService() {
    try {
        await connectDB();
        console.log("Cron Service connected to database");

        const cronService = new AutomatedExpiryCronService();
        cronService.init();

        console.log("Cron Service is running and scheduled.")
    } catch (error) {
        console.error("Failed to start cron service: ", error);
        process.exit(1);
    }
}

void runCronService(); 