import { Request, Response, NextFunction } from "express";
import { HttpStatus, ResponseStatus } from "../../constants/statusCodes.constants";
import { ResponseMessage } from "../../constants/response.constants";
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
                message: ResponseMessage.OTP_SEND_SUCCESS

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
                message: ResponseMessage.SIGNUP_SUCCESS
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
                secure: true,
                sameSite: "none",
                maxAge: Number(process.env.REFRESH_MAX_AGE) * 1000  //in milliseconds
            })

            res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: ResponseMessage.LOGIN_SUCCESS,
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
                message: ResponseMessage.OTP_SEND_SUCCESS
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
                message: ResponseMessage.OTP_VERIFY_SUCCESS
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
                message: ResponseMessage.PASSWORD_RESET_SUCCESS
            });
        } catch (error) {
            next(error);
        }
    }


}