import { Request, Response, NextFunction } from "express";
import { IGoogleAuthUseCase } from "../../application/IUseCases/IGoogleAuthUseCase";
import { IInitiateGoogleAuthUseCase } from "../../application/IUseCases/IInitiateGoogleAuthUseCase";
import { logger } from "../../infrastructure/logger/logger";


export class GoogleAuthController {
    constructor(
        private googleAuthUseCase: IGoogleAuthUseCase,
        private initiateGoogleAuthUseCase: IInitiateGoogleAuthUseCase
    ) { }

    async initiateGoogleLogin(req: Request, res: Response, next: NextFunction) {
        try {
            const { role, mode } = req.query;

            const autherizedUrl = this.initiateGoogleAuthUseCase.execute(role as string, mode as string);
            logger.debug(autherizedUrl);

            res.redirect(autherizedUrl);
        } catch (error) {
            if (error instanceof Error) {
                return res.redirect(`${process.env.FRONTEND_URL}/?error=${error.message}`);
            }
            next(error)
        }
    }

    async handleGoogleCallback(req: Request, res: Response, next: NextFunction) {
        try {
            const { code, state } = req.query;
            const { role, mode } = JSON.parse(state as string);

            const { refreshToken } =
                await this.googleAuthUseCase.execute(code as string, role as string, mode as "login" | "signup");

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "none",
                maxAge: 7 * 24 * 60 * 60 * 1000 //7 d
            })


            //redirect to dashboard
            res.redirect(`${process.env.FRONTEND_URL}/${role}/dashboard`)
        } catch (error) {
            if (error instanceof Error) {
                return res.redirect(`${process.env.FRONTEND_URL}/?error=${error.message}`);
            }
            next(error)
        }
    }
}