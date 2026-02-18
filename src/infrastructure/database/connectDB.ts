import mongoose from "mongoose";
import { seedSuperAdmin } from "./superAdminSeed";


export async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        console.log("mongodb connected");
        await seedSuperAdmin();
    } catch {
        console.error("mongodb connection failed");
        process.exit(1);
    }
}