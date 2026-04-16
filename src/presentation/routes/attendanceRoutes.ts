import { Router } from "express";
import { attendanceController } from "../../main/controllers.di";
import { protect } from "../middlewares/protect";
import { isGymApproved } from "../middlewares/gymApproval";
import { isSubscriptionActive } from "../middlewares/gymSubscription";
import { ROLES } from "../../constants/roles.constants";


const router = Router();

router.post("/mark", protect([ROLES.TRAINER, ROLES.CLIENT]), isSubscriptionActive, attendanceController.markAttendance.bind(attendanceController));
router.post("/mark-manual", protect([ROLES.GYM]), isGymApproved, isSubscriptionActive, attendanceController.markManualAttendance.bind(attendanceController));
router.get("/report", protect([ROLES.GYM]), isSubscriptionActive, attendanceController.getDailyReport.bind(attendanceController));
router.get("/today", protect([]), isSubscriptionActive, attendanceController.getTodayAttendance.bind(attendanceController));
router.get("/yearly-count", protect([]), isSubscriptionActive, attendanceController.getYearlyAttendanceCount.bind(attendanceController));


export default router;



