import { Router } from "express";
import { attendanceController } from "../../main/controllers.di";
import { protect } from "../middlewares/protect";
import { ROLES } from "../../constants/roles.constants";


const router = Router();

router.post("/mark", protect([ROLES.TRAINER, ROLES.CLIENT]), attendanceController.markAttendance.bind(attendanceController));
router.post("/mark-manual", protect([ROLES.GYM]), attendanceController.markManualAttendance.bind(attendanceController));
router.get("/report", protect([ROLES.GYM]), attendanceController.getDailyReport.bind(attendanceController));
router.get("/today", protect([]), attendanceController.getTodayAttendance.bind(attendanceController));
router.get("/yearly-count", protect([]), attendanceController.getYearlyAttendanceCount.bind(attendanceController));


export default router;


