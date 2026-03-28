import { Response, NextFunction } from "express";
import { ROLES } from "../../../constants/roles.constants";
import { AuthRequest } from "../../middlewares/protect";
import { HttpStatus, ResponseStatus } from "../../../constants/statusCodes.constants";
import { ResponseMessage } from "../../../constants/response.constants";

import { IAddEquipmentUseCase } from "../../../application/IUseCases/gym-equipment/IAddEquipmentUseCase";
import { IGetEquipmentsUseCase } from "../../../application/IUseCases/gym-equipment/IGetEquipmentsUseCase";
import { IUpdateEquipmentUseCase } from "../../../application/IUseCases/gym-equipment/IUpdateEquipmentUseCase";
import { IDeleteEquipmentUseCase } from "../../../application/IUseCases/gym-equipment/IDeleteEquipmentUseCase";



export class GymEquipmentController {
    constructor(
        private _addEquipmentUseCase: IAddEquipmentUseCase,
        private _getEquipmentsUseCase: IGetEquipmentsUseCase,
        private _updateEquipmentUseCase: IUpdateEquipmentUseCase,
        private _deleteEquipmentUseCase: IDeleteEquipmentUseCase
    ) { }

    async addEquipment(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const gymId = req.user!.id;
            const data = { ...req.body };

            if (typeof data.availableDays === "string") data.availableDays = JSON.parse(data.availableDays);
            if (typeof data.allowedPlans === "string") data.allowedPlans = JSON.parse(data.allowedPlans);

            if (typeof data.capacity === "string") data.capacity = parseInt(data.capacity);
            if (typeof data.slotIntervalMinutes === "string") data.slotIntervalMinutes = parseInt(data.slotIntervalMinutes);

            if (typeof data.isActive === "string") {
                data.isActive = data.isActive === "true";
            }

            const file = req.file;

            const newEquipment = await this._addEquipmentUseCase.execute({ ...data, gymId }, file);

            return res.status(HttpStatus.CREATED).json({
                status: ResponseStatus.SUCCESS,
                message: "Equipment added successfully",
                data: newEquipment
            });
        } catch (error) {
            next(error);
        }
    }

    async getEquipments(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const queryGymId = req.query.gymId as string;
            const gymId = queryGymId || (req.user?.role === ROLES.GYM ? req.user.id : (req.user?.gymId || req.user?.id || ""));
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const search = req.query.search as string;

            const result = await this._getEquipmentsUseCase.execute(gymId, page, limit, search);

            return res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: ResponseMessage.DATA_RETRIVE_SUCCESS,
                data: result
            });
        } catch (error) {
            next(error);
        }
    }

    async updateEquipment(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const gymId = req.user!.id;
            const id = req.params.equipmentId as string;
            const data = { ...req.body };
            if (typeof data.availableDays === "string") data.availableDays = JSON.parse(data.availableDays);
            if (typeof data.allowedPlans === "string") data.allowedPlans = JSON.parse(data.allowedPlans);

            if (typeof data.capacity === "string") data.capacity = parseInt(data.capacity);
            if (typeof data.slotIntervalMinutes === "string") data.slotIntervalMinutes = parseInt(data.slotIntervalMinutes);

            if (typeof data.isActive === "string") {
                data.isActive = data.isActive === "true";
            }

            const file = req.file;

            const updatedEquipment = await this._updateEquipmentUseCase.execute({ ...data, gymId, id }, file);

            return res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: ResponseMessage.DATA_UPDATE_SUCCESS,
                data: updatedEquipment
            });
        } catch (error) {
            next(error);
        }
    }

    async deleteEquipment(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const gymId = req.user!.id;
            const id = req.params.equipmentId as string;

            await this._deleteEquipmentUseCase.execute(id, gymId);

            return res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: "Equipment deleted successfully",
                data: null
            });
        } catch (error) {
            next(error);
        }
    }
}

