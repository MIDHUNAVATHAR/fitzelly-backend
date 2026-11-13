import { Request, Response, NextFunction } from "express";
import { ITrainerLoginUseCase } from "../../application/interfaces/ITrainerLoginUseCase";
import { IInitiateForgotPasswordUseCase } from "../../application/interfaces/IInitiateForgotpassUseCase";
import { ICompleteForgotpassUseCase } from "../../application/interfaces/ICompleteForgotpassUseCase";
import { IResetPasswordUseCase } from "../../application/interfaces/IResetPasswordUseCase";
import { HttpStatus, ResponseStatus } from "../../../../shared/constants/statusCodes.constants";
import { ResponseMessage } from "../../../../shared/constants/response.constants";

export class TrainerAuthController {
    constructor(
        private _trainerLoginUseCase: ITrainerLoginUseCase,
        private _trainerInitiateForgotPasswordUseCase: IInitiateForgotPasswordUseCase,
        private _trainerCompleteForgotPasswordUseCase: ICompleteForgotpassUseCase,
        private _trainerResetPasswordUseCase: IResetPasswordUseCase
    ) { }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password, device, browser, os, ip } = req.body;
            const result = await this._trainerLoginUseCase.execute({ email, password, device, browser, os, ip });

            res.cookie("refreshToken", result.refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                path: "/",
                maxAge: Number(process.env.REFRESH_MAX_AGE) * 1000
            });

            res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: ResponseMessage.LOGIN_SUCCESS,
                data: {
                    accessToken: result.accessToken,
                    email: result.trainer.email,
                    role: result.trainer.role,
                    id: result.trainer.id
                }
            });
        } catch (error) {
            next(error);
        }
    }

    async initiateForgotPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { email } = req.body;
            await this._trainerInitiateForgotPasswordUseCase.execute({ email });

            res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: ResponseMessage.OTP_SEND_SUCCESS
            });
        } catch (error) {
            next(error);
        }
    }

    async completeForgotPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, otp } = req.body;
            await this._trainerCompleteForgotPasswordUseCase.execute({ email, otp });

            res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: ResponseMessage.OTP_VERIFY_SUCCESS
            });
        } catch (error) {
            next(error);
        }
    }

    async resetPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, otp, password } = req.body;
            await this._trainerResetPasswordUseCase.execute({ email, otp, password });

            res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: ResponseMessage.PASSWORD_RESET_SUCCESS
            });
        } catch (error) {
            next(error);
        }
    }
}
