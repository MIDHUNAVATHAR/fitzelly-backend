import { Request, Response, NextFunction } from "express";
import { IGoogleAuthUseCase } from "../../../application/IUseCases/auth/IGoogleAuthUseCase";
import { IInitiateGoogleAuthUseCase } from "../../../application/IUseCases/auth/IInitiateGoogleAuthUseCase";
import { logger } from "../../../infrastructure/logger/logger";


export class GoogleAuthController {
    constructor(
        private _googleAuthUseCase: IGoogleAuthUseCase,
        private _initiateGoogleAuthUseCase: IInitiateGoogleAuthUseCase
    ) { }

    async initiateGoogleLogin(req: Request, res: Response, next: NextFunction) {
        try {
            const { role, mode } = req.query;

            const autherizedUrl = this._initiateGoogleAuthUseCase.execute(role as string, mode as string);
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
                await this._googleAuthUseCase.execute(code as string, role as string, mode as "login" | "signup");
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                path: "/",
                maxAge: Number(process.env.REFRESH_MAX_AGE) * 1000
            })


            //redirect to dashboard
            res.redirect(`${process.env.FRONTEND_URL}/${role}/dashboard`)
        } catch (error) {

            logger.error("google auth error ",{error})
            if (error instanceof Error) {
                return res.redirect(`${process.env.FRONTEND_URL}/?error=${error.message}`);
            }
            next(error)
        }
    }
}