import { Response, NextFunction } from "express";
import { ICreateEquipmentBookingUseCase } from "../../../application/IUseCases/equipment-booking/ICreateEquipmentBookingUseCase";
import { IGetAvailableSlotsUseCase } from "../../../application/IUseCases/equipment-booking/IGetAvailableSlotsUseCase";
import { IGetClientBookingsUseCase } from "../../../application/IUseCases/equipment-booking/IGetClientBookingsUseCase";
import { ICancelEquipmentBookingUseCase } from "../../../application/usecases/equipment-booking/CancelEquipmentBookingUseCase";

import { AuthRequest } from "../../middlewares/protect";
import { HttpStatus, ResponseStatus } from "../../../constants/statusCodes.constants";
import { ResponseMessage } from "../../../constants/response.constants";

export class EquipmentBookingController {
    constructor(
        private _createBookingUseCase: ICreateEquipmentBookingUseCase,
        private _getAvailableSlotsUseCase: IGetAvailableSlotsUseCase,
        private _getClientBookingsUseCase: IGetClientBookingsUseCase,
        private _cancelBookingUseCase: ICancelEquipmentBookingUseCase
    ) { }

    async createBooking(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const user = req.user!;
            const { gymId, equipmentId, date, startTime } = req.body;

            const result = await this._createBookingUseCase.execute({
                clientId: user.id,
                gymId,
                equipmentId,
                date: new Date(date),
                startTime
            });

            return res.status(HttpStatus.CREATED).json({
                status: ResponseStatus.SUCCESS,
                message: ResponseMessage.EQUIPMENT_BOOKED_SUCCESS,
                data: result
            });
        } catch (error) {
            next(error);
        }
    }

    async getAvailableSlots(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { equipmentId, date } = req.query;
            const result = await this._getAvailableSlotsUseCase.execute(
                equipmentId as string,
                new Date(date as string)
            );

            return res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: ResponseMessage.AVAILABLE_SLOTS_FETCH_SUCCESS,
                data: result
            });
        } catch (error) {
            next(error);
        }
    }

    async getClientBookings(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const user = req.user!;
            const result = await this._getClientBookingsUseCase.execute(user.id);

            return res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: ResponseMessage.CLIENT_BOOKINGS_FETCH_SUCCESS,
                data: result
            });
        } catch (error) {
            next(error);
        }
    }

    async cancelBooking(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const user = req.user!;
            const { bookingId } = req.params;

            await this._cancelBookingUseCase.execute(bookingId as string, user.id);

            return res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: ResponseMessage.BOOKING_CANCELLED_SUCCESS
            });
        } catch (error) {
            next(error);
        }
    }
}
