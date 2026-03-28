import { Response, NextFunction } from "express";
import { IGetDailyAttendanceReportUseCase } from "../../../application/IUseCases/attendance/IGetDailyAttendanceReportUseCase";
import { IGetTodayAttendanceUseCase } from "../../../application/IUseCases/attendance/IGetTodayAttendanceUseCase";
import { IMarkAttendanceUseCase } from "../../../application/IUseCases/attendance/IMarkAttendanceUseCase";
import { IMarkManualAttendanceUseCase } from "../../../application/IUseCases/attendance/IMarkManualAttendanceUseCase";
import { IGetYearlyAttendanceCountUseCase } from "../../../application/IUseCases/attendance/IGetYearlyAttendanceCountUseCase";
import { AuthRequest } from "../../middlewares/protect";
import { HttpStatus, ResponseStatus } from "../../../constants/statusCodes.constants";


export class AttendanceController {
    constructor(
        private _markAttendanceUseCase: IMarkAttendanceUseCase,
        private _getTodayAttendanceUseCase: IGetTodayAttendanceUseCase,
        private _getDailyAttendanceReportUseCase: IGetDailyAttendanceReportUseCase,
        private _markManualAttendanceUseCase: IMarkManualAttendanceUseCase,
        private _getYearlyAttendanceCountUseCase: IGetYearlyAttendanceCountUseCase
    ) { };

    async markAttendance(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const user = req.user!;
            const { action, gymId, latitude, longitude } = req.body;

            /**
             * determine usertype from the role in token;
             */
            const userType = user.role === "trainer" ? "TRAINER" : "CLIENT";

            const result = await this._markAttendanceUseCase.execute({
                userId: user.id!,
                gymId: gymId,
                userType: userType,
                action: action,
                latitude,
                longitude,
            })

            return res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: `Attendance ${action === "CHECK_IN" ? "check-in" : "check-out"} successfull`,
                data: result
            })

        } catch (error) {
            next(error)
        }
    }

    async getTodayAttendance(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const user = req.user!;
            const result = await this._getTodayAttendanceUseCase.execute(user?.id);

            return res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: "Attendance fetched successfully",
                data: result
            })

        } catch (error) {
            next(error)
        }
    }

    async getDailyReport(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const gym = req.user!;

            const { date, userType } = req.query;
            const reportDate = date ? new Date(date as string) : new Date();

            const result = await this._getDailyAttendanceReportUseCase.execute(
                gym.id,
                reportDate,
                userType as "CLIENT" | "TRAINER"
            )

            return res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: "Daily report fetched successfully",
                data: {
                    report: result,
                    gymId: gym.id
                }
            })
        } catch (error) {
            next(error)
        }
    }

    /**
     * gym mark attendance of client and trainer
     */
    async markManualAttendance(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const gym = req.user!;
            const result = await this._markManualAttendanceUseCase.execute({
                ...req.body,
                gymId: gym.id
            })

            return res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: "Attendance marked successfully",
                data: result
            })
        } catch (error) {
            next(error);
        }
    }

    /*
    *get the total attendance of client/trainer in the whole year
    */
    async getYearlyAttendanceCount(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const user = req.user!;
            const year = req.query.year ? parseInt(req.query.year as string) : new Date().getFullYear();

            const result = await this._getYearlyAttendanceCountUseCase.execute(user.id, year);

            return res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: "Yearly attendance count fetched successfully",
                data: result
            });
        } catch (error) {
            next(error);
        }
    }
}