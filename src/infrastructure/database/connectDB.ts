import mongoose from "mongoose";
import { seedSuperAdmin } from "./superAdminSeed";


export async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        console.log("mongodb connected");
        await seedSuperAdmin();
    } catch (error) {
        console.error("mongodb connection failed", error);
        process.exit(1);
    }
}

