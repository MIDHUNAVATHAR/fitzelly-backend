import { Response, NextFunction } from "express";
import { AuthRequest } from "./protect";
import { GymModel } from "../../infrastructure/database/mongoose/models/GymModel";
import { HttpStatus, ResponseStatus } from "../../constants/statusCodes.constants";
import { ROLES } from "../../constants/roles.constants";
import { ResponseMessage,APPROVAL_STATUS } from "../../constants/response.constants";


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
                message: ResponseMessage.GYM_NOT_FOUND
            });
        }

        if (gym.approvalStatus !== APPROVAL_STATUS.APPROVED) {
            return res.status(HttpStatus.FORBIDDEN).json({
                status: ResponseStatus.FAIL,
                message: ResponseMessage.GYM_NOT_APPROVED
            });
        }

        next();
    } catch (error) {
        next(error);
    }
};
