import mongoose from "mongoose";
import { logger } from "../logger/logger"
import { seedSuperAdmin } from "./superAdminSeed";


export async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        logger.info("mongodb connected");
        await seedSuperAdmin();
    } catch {
        logger.error("mongodb connection failed");
        process.exit(1);
    }
}