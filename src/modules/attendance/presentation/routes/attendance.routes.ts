import { Router } from "express";
import { ATTENDANCE_ROUTES } from "../../../../shared/constants/routes.constants";
import { ROLES } from "../../../../shared/constants/roles.constants";
import { protect } from "../../../../shared/middleware/protect";
import { isGymApproved } from "../../../../shared/middleware/gymApproval";
import { isSubscriptionActive } from "../../../../shared/middleware/gymSubscription";
import { AttendanceController } from "../controllers/AttendanceController";

export interface AttendanceRouteControllers {
    attendanceController: AttendanceController;
}

export function createAttendanceRouter(controllers: AttendanceRouteControllers): Router {
    const router = Router();
    const { attendanceController } = controllers;

    router.post(ATTENDANCE_ROUTES.MARK, protect([ROLES.TRAINER, ROLES.CLIENT]), isSubscriptionActive, attendanceController.markAttendance.bind(attendanceController));
    router.post(ATTENDANCE_ROUTES.MARK_MANUAL, protect([ROLES.GYM]), isGymApproved, isSubscriptionActive, attendanceController.markManualAttendance.bind(attendanceController));
    router.get(ATTENDANCE_ROUTES.REPORT, protect([ROLES.GYM]), isSubscriptionActive, attendanceController.getDailyReport.bind(attendanceController));
    router.get(ATTENDANCE_ROUTES.TODAY, protect([ROLES.CLIENT, ROLES.TRAINER]), isSubscriptionActive, attendanceController.getTodayAttendance.bind(attendanceController));
    router.get(ATTENDANCE_ROUTES.YEARLY_COUNT, protect([ROLES.TRAINER]), isSubscriptionActive, attendanceController.getYearlyAttendanceCount.bind(attendanceController));

    return router;
}
