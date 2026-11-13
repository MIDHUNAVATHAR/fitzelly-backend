import "./config/env.config";
import { connectDB } from "./shared/database/connectDB";
import { AutomatedExpiryCronService } from "./shared/services/AutomatedExpiryCronService";
import { logger } from "./shared/logger/logger";

async function runCronService() {
    try {
        await connectDB();
        logger.info("Cron Service connected to database");

        const cronService = new AutomatedExpiryCronService();
        cronService.init();

        logger.info("Cron Service is running and scheduled.");
    } catch (error) {
        logger.error("Failed to start cron service: ", { error });
        process.exit(1);
    }
}

void runCronService();
