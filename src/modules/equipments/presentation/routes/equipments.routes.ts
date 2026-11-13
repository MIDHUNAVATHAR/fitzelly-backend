import { Router } from "express";
import multer from "multer";
import { GYM_ROUTE, EQUIPMENT_BOOKING_ROUTES } from "../../../../shared/constants/routes.constants";
import { ROLES } from "../../../../shared/constants/roles.constants";
import { protect } from "../../../../shared/middleware/protect";
import { isGymApproved } from "../../../../shared/middleware/gymApproval";
import { isSubscriptionActive } from "../../../../shared/middleware/gymSubscription";
import { GymEquipmentController } from "../controllers/GymEquipmentController";
import { EquipmentBookingController } from "../controllers/EquipmentBookingController";

const upload = multer();

export interface EquipmentsRouteControllers {
    gymEquipmentController: GymEquipmentController;
    equipmentBookingController: EquipmentBookingController;
}

export function createEquipmentsRouter(controllers: EquipmentsRouteControllers): Router {
    const router = Router();
    const { gymEquipmentController, equipmentBookingController } = controllers;

    // Gym Equipment Catalog
    router.post(GYM_ROUTE.ADD_EQUIPMENT, protect([ROLES.GYM]), isGymApproved, isSubscriptionActive, upload.single("image"), gymEquipmentController.addEquipment.bind(gymEquipmentController));
    router.get(GYM_ROUTE.GET_EQUIPMENTS, protect([ROLES.GYM, ROLES.CLIENT, ROLES.TRAINER]), gymEquipmentController.getEquipments.bind(gymEquipmentController));
    router.put(GYM_ROUTE.EQUIPMENT_BY_ID, protect([ROLES.GYM]), isGymApproved, isSubscriptionActive, upload.single("image"), gymEquipmentController.updateEquipment.bind(gymEquipmentController));
    router.delete(GYM_ROUTE.EQUIPMENT_BY_ID, protect([ROLES.GYM]), isGymApproved, isSubscriptionActive, gymEquipmentController.deleteEquipment.bind(gymEquipmentController));

    // Equipment Booking
    router.post(EQUIPMENT_BOOKING_ROUTES.BOOK, protect([ROLES.CLIENT]), equipmentBookingController.createBooking.bind(equipmentBookingController));
    router.get(EQUIPMENT_BOOKING_ROUTES.SLOTS, protect([ROLES.CLIENT]), equipmentBookingController.getAvailableSlots.bind(equipmentBookingController));
    router.get(EQUIPMENT_BOOKING_ROUTES.MY_BOOKINGS, protect([ROLES.CLIENT]), equipmentBookingController.getClientBookings.bind(equipmentBookingController));
    router.patch(EQUIPMENT_BOOKING_ROUTES.CANCEL_BOOKING, protect([ROLES.CLIENT]), equipmentBookingController.cancelBooking.bind(equipmentBookingController));

    return router;
}
