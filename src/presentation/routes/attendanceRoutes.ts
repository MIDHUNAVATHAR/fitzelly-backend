import { Router } from "express";
import { attendanceController } from "../../main/controllers.di";
import { protect } from "../middlewares/protect";


const router = Router();

router.post("/mark", protect([]), attendanceController.markAttendance.bind(attendanceController));
router.post("/mark-manual", protect(["gym"]), attendanceController.markManualAttendance.bind(attendanceController));
router.get("/report", protect(["gym"]), attendanceController.getDailyReport.bind(attendanceController));
router.get("/today", protect([]), attendanceController.getTodayAttendance.bind(attendanceController));


export default router;


