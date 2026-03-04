import { Request, Response, NextFunction } from "express";
import { ITokenRefreshUseCase } from "../../../application/IUseCases/auth/ITokenRefreshUseCase";
import { HttpStatus, ResponseStatus } from "../../../constants/statusCodes.constants";
import { ResponseMessage } from "../../../constants/response.constants";


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
                message: ResponseMessage.TOKEN_REFRESH_SUCCESS,
                data: { accessToken: result.accessToken, user: result.user }
            })
        } catch (error) {
            next(error);
        }
    }
}