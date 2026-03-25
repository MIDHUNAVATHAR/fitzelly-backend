import { Router } from "express";
import { equipmentBookingController } from "../../main/controllers.di";
import { protect } from "../middlewares/protect";

const router = Router();

router.post("/book", protect(["client"]), equipmentBookingController.createBooking.bind(equipmentBookingController));
router.get("/slots", protect(["client"]), equipmentBookingController.getAvailableSlots.bind(equipmentBookingController));
router.get("/my-bookings", protect(["client"]), equipmentBookingController.getClientBookings.bind(equipmentBookingController));
router.patch("/cancel/:bookingId", protect(["client"]), equipmentBookingController.cancelBooking.bind(equipmentBookingController));

export default router;
