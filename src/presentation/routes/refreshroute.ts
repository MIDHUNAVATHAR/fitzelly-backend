import { Router } from "express";
import { REFRESH_ROUTE } from "../../constants/routes.constants";
import { tokenRefreshController } from "../../main/di";


const router = Router();

router.get(REFRESH_ROUTE.REFRESH, tokenRefreshController.refreshToken.bind(tokenRefreshController));


export default router; 