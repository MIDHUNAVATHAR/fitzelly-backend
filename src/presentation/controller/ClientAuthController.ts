import { Request, Response, NextFunction } from "express";
import { IClientLoginUseCase } from "../../application/IUseCases/auth/IClientLoginUseCase";
import { IInitiateForgotPasswordUseCase } from "../../application/IUseCases/IInitiateForgotpassUseCase";
import { ICompleteForgotpassUseCase } from "../../application/IUseCases/ICompleteForgotpassUseCase";
import { IResetPasswordUseCase } from "../../application/IUseCases/IResetPasswordUseCase";
import { HttpStatus, ResponseStatus } from "../../constants/statusCodes.constants";
import { ResponseMessage } from "../../constants/response.constants";

export class ClientAuthController {
    constructor(
        private clientLoginUseCase: IClientLoginUseCase,
        private _clientInitiateForgotPasswordUseCase: IInitiateForgotPasswordUseCase,
        private _clientCompleteForgotPasswordUseCase: ICompleteForgotpassUseCase,
        private _clientResetPasswordUseCase: IResetPasswordUseCase
    ) { }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            console.log(email,password); 
            const result = await this.clientLoginUseCase.execute({ email, password });

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
                    email: result.client.email,
                    role: result.client.role,
                    id: result.client.id
                }
            });
        } catch (error) {
            next(error);
        }
    }

    async initiateForgotPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { email } = req.body;
            await this._clientInitiateForgotPasswordUseCase.execute({ email });

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
            await this._clientCompleteForgotPasswordUseCase.execute({ email, otp });

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
            await this._clientResetPasswordUseCase.execute({ email, otp, password });

            res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: ResponseMessage.PASSWORD_RESET_SUCCESS
            });
        } catch (error) {
            next(error);
        }
    }
}
