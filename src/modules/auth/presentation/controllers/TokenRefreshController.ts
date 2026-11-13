import { Request, Response, NextFunction } from "express";
import { ITokenRefreshUseCase } from "../../application/interfaces/ITokenRefreshUseCase";
import { HttpStatus, ResponseStatus } from "../../../../shared/constants/statusCodes.constants";
import { ResponseMessage } from "../../../../shared/constants/response.constants";
import { ISessionRepository } from "../../domain/repositories/ISessionRepository";
import { ITokenService } from "../../../../shared/services/ITokenService";
import { logger } from "../../../../shared/logger/logger";

export class TokenRefreshController {
    constructor(
        private _tokenRefreshUseCase: ITokenRefreshUseCase,
        private _sessionRepository?: ISessionRepository,
        private _tokenService?: ITokenService
    ) { }

    async refreshToken(req: Request, res: Response, next: NextFunction) {
        try {
            const refreshToken: string = req.cookies.refreshToken;
            const result = await this._tokenRefreshUseCase.execute({ refreshToken });
            res.status(HttpStatus.OK).json({
                status: ResponseStatus.SUCCESS,
                message: ResponseMessage.TOKEN_REFRESH_SUCCESS,
                data: { accessToken: result.accessToken, user: result.user }
            });
        } catch (error) {
            next(error);
        }
    }

    async logout(req: Request, res: Response, _next: NextFunction) {
        try {
            const refreshToken = req.cookies.refreshToken;
            if (refreshToken && this._tokenService && this._sessionRepository) {
                const decoded = this._tokenService.verifyRefreshToken(refreshToken);
                if (decoded && decoded.sessionId) {
                    await this._sessionRepository.revoke(decoded.sessionId);
                }
            }
        } catch (error) {
            logger.error("Error revoking session during logout:", error);
        }

        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/",
        });

        return res.status(HttpStatus.OK).json({
            status: "success",
            message: ResponseMessage.LOGOUT_SUCCESS,
        });
    }
}