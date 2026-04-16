import { Router } from "express";
import { REFRESH_ROUTE, LOGOUT_ROUTE } from "../../constants/routes.constants";
import { tokenRefreshController } from "../../main/controllers.di";
import { sessionRepository } from "../../main/repositories.di";
import { jwtService } from "../../main/services.di";



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
        console.error("Error revoking session during logout:", error);
    }

    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/"
    });

    return res.status(200).json({
        status: "success",
        message: "Logged out successfully",
    });
})


export default router; 