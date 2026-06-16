import { Router } from "express";
import { REFRESH_ROUTE, LOGOUT_ROUTE } from "../../constants/routes.constants";
import { tokenRefreshController } from "../../main/controllers.di";
import { sessionRepository } from "../../main/repositories.di";
import { jwtService } from "../../main/services.di";
import { logger } from "../../infrastructure/logger/logger";
import { ResponseMessage } from "../../constants/response.constants";


const router = Router();

router.get(REFRESH_ROUTE.REFRESH, tokenRefreshController.refreshToken.bind(tokenRefreshController));

router.post(LOGOUT_ROUTE.LOGOUT, async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (refreshToken) {
            const decoded = jwtService.verifyRefreshToken(refreshToken);
            if (decoded && decoded.sessionId) {
                await sessionRepository.revoke(decoded.sessionId);
            }
        }
    } catch (error) {
        logger.error("Error revoking session during logout:", error);
    }

    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/"
    });

    return res.status(200).json({
        status: "success",
        message: ResponseMessage.LOGOUT_SUCCESS,
    });
})


export default router; 