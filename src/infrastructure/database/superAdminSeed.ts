import { logger } from "../logger/logger";
import { SuperAdminModel } from "./mongoose/models/SuperAdminModel";
import bcrypt from "bcryptjs";
import { ROLES } from "../../constants/roles.constants";


export const seedSuperAdmin = async () => {
    try {
        const adminExists = await SuperAdminModel.findOne({ role: ROLES.SUPERADMIN });
        if (!adminExists) {
            const hashedPassword = await bcrypt.hash(process.env.DEFAULT_PASSWORD!, 10);

            await SuperAdminModel.create({
                email: process.env.SUPER_ADMIN_EMAIL,
                password: hashedPassword,
                role: ROLES.SUPERADMIN
            })
            logger.info("super admin created successfully");
        }

    } catch (error) {
        logger.error("Error seeding super admin", error);
        process.exit(1);
    }
}