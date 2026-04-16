import { Router } from "express";
import { equipmentBookingController } from "../../main/controllers.di";
import { protect } from "../middlewares/protect";
import { ROLES } from "../../constants/roles.constants";

const router = Router();

router.post("/book", protect([ROLES.CLIENT]), equipmentBookingController.createBooking.bind(equipmentBookingController));
router.get("/slots", protect([ROLES.CLIENT]), equipmentBookingController.getAvailableSlots.bind(equipmentBookingController));
router.get("/my-bookings", protect([ROLES.CLIENT]), equipmentBookingController.getClientBookings.bind(equipmentBookingController));
router.patch("/cancel/:bookingId", protect([ROLES.CLIENT]), equipmentBookingController.cancelBooking.bind(equipmentBookingController));

export default router;
