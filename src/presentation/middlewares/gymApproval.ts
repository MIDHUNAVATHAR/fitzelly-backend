import { Response, NextFunction } from "express";
import { AuthRequest } from "./protect";
import { GymModel } from "../../infrastructure/database/mongoose/models/GymModel";
import { HttpStatus, ResponseStatus } from "../../constants/statusCodes.constants";
import { ROLES } from "../../constants/roles.constants";

export const isGymApproved = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const user = req.user;
        
        // Only check for gym role
        if (!user || user.role !== ROLES.GYM) {
            return next();
        }

        const gym = await GymModel.findById(user.id);
        
        if (!gym) {
            return res.status(HttpStatus.NOT_FOUND).json({
                status: ResponseStatus.FAIL,
                message: "Gym not found"
            });
        }

        if (gym.approvalStatus !== "Approved") {
            return res.status(HttpStatus.FORBIDDEN).json({
                status: ResponseStatus.FAIL,
                message: "currently you are not approved , you unable to access this feature."
            });
        }

        next();
    } catch (error) {
        next(error);
    }
};
