import { Request, Response, NextFunction } from "express";
import { HttpStatus, ResponseStatus } from "../../constants/statusCodes.constants";

import { IInitiateSignupUseCase } from "../../application/IUseCases/IInitiateSignupUseCase";
import { ICompleteSignupUseCase } from "../../application/IUseCases/ICompleteSignupUseCase";
import { ILoginUseCase } from "../../application/IUseCases/ILoginUseCase";
import { IInitiateForgotPasswordUseCase } from "../../application/IUseCases/IInitiateForgotpassUseCase";
import { ICompleteForgotpassUseCase } from "../../application/IUseCases/ICompleteForgotpassUseCase";
import { IResetPasswordUseCase } from "../../application/IUseCases/IResetPasswordUseCase";


export class GymAuthenticationController {
    constructor(
        private _initiateSignupUseCase: IInitiateSignupUseCase,
        private _completeSignupUseCase: ICompleteSignupUseCase,
        private _gymLoginUseCase: ILoginUseCase,
        private _gymInitiateForgotPasswordUseCase: IInitiateForgotPasswordUseCase,
        private _gymCompleteForgotPasswordUseCase: ICompleteForgotpassUseCase,
        private _gymResetPasswordUseCase: IResetPasswordUseCase,
    ) { }

    async initiateSignUp(req: Request, res: Response, next: NextFunction) {
        try {
            const { email } = req.body;
            await this._initiateSignupUseCase.execute({ email });

            res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: "OTP send to mail successfully"
            })
        } catch (error) {
            next(error);
        }
    }

    async completeSignUp(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, otp, password } = req.body;
            await this._completeSignupUseCase.execute({ email, otp, password });

            res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: "Gym registration successfull"
            })
        } catch (error) {
            next(error)
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const data = await this._gymLoginUseCase.execute({ email, password });

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
            await this._gymInitiateForgotPasswordUseCase.execute({ email });

            res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: "Forgot password OTP sent successfully"
            });
        } catch (error) {
            next(error);
        }
    }

    async completeForgotPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, otp } = req.body;
            await this._gymCompleteForgotPasswordUseCase.execute({ email, otp });

            res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: "OTP verification success"
            });
        } catch (error) {
            next(error);
        }
    }

    async resetPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, otp, password } = req.body;
            await this._gymResetPasswordUseCase.execute({ email, otp, password });

            res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: "Password reset successful"
            });
        } catch (error) {
            next(error);
        }
    }


}