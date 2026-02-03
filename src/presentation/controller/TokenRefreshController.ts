import { Request, Response, NextFunction } from "express";
import { ITokenRefreshUseCase } from "../../application/IUseCases/ITokenRefreshUseCase";
import { HttpStatus, ResponseStatus } from "../../constants/statusCodes.constants";


export class TokenRefreshController {
    constructor(
        private _tokenRefreshUseCase: ITokenRefreshUseCase
    ) { }

    async refreshToken(req: Request, res: Response, next: NextFunction) {
        try {
            const refreshToken: string = req.cookies.refreshToken;
            const result = await this._tokenRefreshUseCase.execute({ refreshToken });

            res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: "token refresh successfull",
                data: { accessToken: result.accessToken, user: result.user }
            })
        } catch (error) {
            next(error);
        }
    }
}