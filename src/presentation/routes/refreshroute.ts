import { Router } from "express";
import { REFRESH_ROUTE, LOGOUT_ROUTE } from "../../constants/routes.constants";
import { tokenRefreshController } from "../../main/di";



const router = Router();

router.get(REFRESH_ROUTE.REFRESH, tokenRefreshController.refreshToken.bind(tokenRefreshController));

router.post(LOGOUT_ROUTE.LOGOUT, (req, res) => {
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