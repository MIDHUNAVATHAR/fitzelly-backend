import { Request, Response, NextFunction } from "express";
import { HttpStatus, ResponseStatus } from "../../constants/statusCodes.constants";
import { ILoginUseCase } from "../../application/IUseCases/ILoginUseCase";
import { IInitiateForgotPasswordUseCase } from "../../application/IUseCases/IInitiateForgotpassUseCase";
import { ICompleteForgotpassUseCase } from "../../application/IUseCases/ICompleteForgotpassUseCase";
import { IResetPasswordUseCase } from "../../application/IUseCases/IResetPasswordUseCase";
import { logger } from "../../infrastructure/logger/logger";



export class SuperAdminAuthenticationController {
    constructor(
        private _superAdminLoginUseCase: ILoginUseCase,
        private _superAdminInitiateForgotpassUseCase: IInitiateForgotPasswordUseCase,
        private _superAdminCompleteForgotpassUseCase: ICompleteForgotpassUseCase,
        private _superAdminResetPasswordUseCase: IResetPasswordUseCase
    ) { }


    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const data = await this._superAdminLoginUseCase.execute({ email, password });

            res.cookie("refreshToken", data.refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "none",
                maxAge: 7 * 24 * 60 * 60 * 1000
            })

            res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: "login successfull",
                data: {
                    accessToken: data.accessToken, email: data.email, role: data.role, id: data.id
                }
            })
        } catch (error) {
            next(error)
        }
    }


    async initiateForgotPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { email } = req.body;
            await this._superAdminInitiateForgotpassUseCase.execute({ email });

            res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: "Forgot password otp send successfully"
            })
        } catch (error) {
            next(error)
        }
    }

    async completeForgotPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, otp } = req.body;
            await this._superAdminCompleteForgotpassUseCase.execute({ email, otp });

            res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: "OTP verification success"
            })
        } catch (error) {
            next(error)
        }
    }

    //need zod validation -frontend send empy fields,in req. backend return success. 
    async resetPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, otp, password } = req.body;
            logger.debug(password)
            await this._superAdminResetPasswordUseCase.execute({ email, otp, password });

            res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: "Password reset successfull"
            })
        } catch (error) {
            next(error)
        }
    }
}