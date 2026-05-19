import mongoose from "mongoose";
import { seedSuperAdmin } from "./superAdminSeed";
import { logger } from "../logger/logger";


export async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        logger.info("mongodb connected");
        await seedSuperAdmin();
    } catch (error) {
        logger.error("mongodb connection failed", {error});
        process.exit(1);
    }
}

