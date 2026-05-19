import { Router } from "express";
import { equipmentBookingController } from "../../main/controllers.di";
import { protect } from "../middlewares/protect";
import { ROLES } from "../../constants/roles.constants";
import { EQUIPMENT_BOOKING_ROUTES } from "../../constants/routes.constants";

const router = Router();

router.post(EQUIPMENT_BOOKING_ROUTES.BOOK, protect([ROLES.CLIENT]), equipmentBookingController.createBooking.bind(equipmentBookingController));
router.get(EQUIPMENT_BOOKING_ROUTES.SLOTS, protect([ROLES.CLIENT]), equipmentBookingController.getAvailableSlots.bind(equipmentBookingController));
router.get(EQUIPMENT_BOOKING_ROUTES.MY_BOOKINGS, protect([ROLES.CLIENT]), equipmentBookingController.getClientBookings.bind(equipmentBookingController));
router.patch(EQUIPMENT_BOOKING_ROUTES.CANCEL_BOOKING, protect([ROLES.CLIENT]), equipmentBookingController.cancelBooking.bind(equipmentBookingController));

export default router;
