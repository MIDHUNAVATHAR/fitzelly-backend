import { Router } from "express";
import { attendanceController } from "../../main/controllers.di";
import { protect } from "../middlewares/protect";
import { isGymApproved } from "../middlewares/gymApproval";
import { isSubscriptionActive } from "../middlewares/gymSubscription";
import { ROLES } from "../../constants/roles.constants";
import { ATTENDANCE_ROUTES } from "../../constants/routes.constants";


const router = Router();

router.post(ATTENDANCE_ROUTES.MARK, protect([ROLES.TRAINER, ROLES.CLIENT]), isSubscriptionActive, attendanceController.markAttendance.bind(attendanceController));
router.post(ATTENDANCE_ROUTES.MARK_MANUAL, protect([ROLES.GYM]), isGymApproved, isSubscriptionActive, attendanceController.markManualAttendance.bind(attendanceController));
router.get(ATTENDANCE_ROUTES.REPORT, protect([ROLES.GYM]), isSubscriptionActive, attendanceController.getDailyReport.bind(attendanceController));
router.get(ATTENDANCE_ROUTES.TODAY, protect([ROLES.CLIENT,ROLES.TRAINER]), isSubscriptionActive, attendanceController.getTodayAttendance.bind(attendanceController));
router.get(ATTENDANCE_ROUTES.YEARLY_COUNT, protect([ROLES.TRAINER]), isSubscriptionActive, attendanceController.getYearlyAttendanceCount.bind(attendanceController));


export default router;




