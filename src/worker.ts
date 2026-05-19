import "./config/env.config";
import { connectDB } from "./infrastructure/database/connectDB";
import { logger } from "./infrastructure/logger/logger";
import { EmailWorker } from "./infrastructure/queue/EmailWorker";


async function runWorker() {
    try {
        await connectDB();
        console.log("Background Worker Service connected to database");
        new EmailWorker();
        logger.info("Background Worker Service is running.");
  
    } catch (error) {
        logger.error("Failed to start Worker Service:", {error});
        process.exit(1);
    }
}

runWorker().catch(error => {
    logger.error("Worker process failed:", {error});
    process.exit(1);
});