import { Response, NextFunction } from "express";
import { ICreateEquipmentBookingUseCase } from "../../../application/usecases/equipment-booking/ICreateEquipmentBookingUseCase";
import { IGetAvailableSlotsUseCase } from "../../../application/usecases/equipment-booking/IGetAvailableSlotsUseCase";
import { IGetClientBookingsUseCase } from "../../../application/usecases/equipment-booking/IGetClientBookingsUseCase";
import { ICancelEquipmentBookingUseCase } from "../../../application/usecases/equipment-booking/CancelEquipmentBookingUseCase";
import { EquipmentBookingMapper } from "../../../application/mapper/EquipmentBookingMapper";
import { AuthRequest } from "../../middlewares/protect";
import { HttpStatus, ResponseStatus } from "../../../constants/statusCodes.constants";

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
                message: "Equipment booked successfully",
                data: EquipmentBookingMapper.toDTO(result)
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
                message: "Available slots fetched successfully",
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
                message: "Client bookings fetched successfully",
                data: EquipmentBookingMapper.toDTOs(result)
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
                message: "Booking cancelled successfully"
            });
        } catch (error) {
            next(error);
        }
    }
}
