import "./config/env.config";
import { connectDB } from "./infrastructure/database/connectDB";
import { AutomatedExpiryCronService } from "./infrastructure/services/AutomatedExpiryCronService";
import { logger } from "./infrastructure/logger/logger";


async function runCronService() {
    try {
        await connectDB();
        logger.info("Cron Service connected to database");

        const cronService = new AutomatedExpiryCronService();
        cronService.init();

        logger.info("Cron Service is running and scheduled.")
    } catch (error) {
        logger.error("Failed to start cron service: ",{ error});
        process.exit(1);
    }
}

void runCronService(); 