
/* ------------------- controllers (presentation) ---------------- */
import { InviteController } from "../presentation/controller/auth/InviteController";

import { GymAuthenticationController } from "../presentation/controller/auth/GymAuthenticationController";
import { SuperAdminAuthenticationController } from "../presentation/controller/auth/SuperAdminAuthenticationController";
import { TokenRefreshController } from "../presentation/controller/auth/TokenRefreshController";
import { GoogleAuthController } from "../presentation/controller/auth/GoogleAuthController";
import { GymProfileController } from "../presentation/controller/gym/GymProfileController";
import { GymClientController } from "../presentation/controller/gym/GymClientController";
import { GymTrainerController } from "../presentation/controller/gym/GymTrainerController";
import { GymPlanController } from "../presentation/controller/gym/GymPlanController";
import { GymMembershipController } from "../presentation/controller/gym/GymMembershipController";
import { GymEquipmentController } from "../presentation/controller/gym/GymEquipmentController";
import { GymAnalyticsController } from "../presentation/controller/gym/GymAnalyticsController";
import { EnquiryController } from "../presentation/controller/gym/EnquiryController";
import { ExpenseController } from "../presentation/controller/gym/ExpenseController";
import { TrainerPayoutController } from "../presentation/controller/gym/TrainerPayoutController";
import { DashboardController } from "../presentation/controller/gym/DashboardController";


import { ClientAuthController } from "../presentation/controller/auth/ClientAuthController";
import { ClientProfileController } from "../presentation/controller/client/ClientProfileController";

import { TrainerAuthController } from "../presentation/controller/auth/TrainerAuthController";
import { TrainerProfileController } from "../presentation/controller/trainer/TrainerProfileController";

import { SuperAdminProfileController } from "../presentation/controller/super-admin/SuperAdminProfileController";
import { SuperAdminGymsController } from "../presentation/controller/super-admin/SuperAdminGymsController";
import { WorkoutLibraryController } from "../presentation/controller/workout-library/WorkoutLibraryController";
import { WorkoutTemplateController } from "../presentation/controller/workout-template/WorkoutTemplateController";

import { AttendanceController } from "../presentation/controller/attendance/AttendanceController";
import { TrainerWorkoutPlanController } from "../presentation/controller/trainer/TrainerWorkoutPlanController";
import { ClientWorkoutPlanController } from "../presentation/controller/client/ClientWorkoutPlanController";
import { EquipmentBookingController } from "../presentation/controller/equipment-booking/EquipmentBookingController";
import { NotificationController } from "../presentation/controller/notification/NotificationController";


import {
    tokenRefreshUseCase,
    createPasswordUseCase,
    googleAuthUseCase,
    initiateGoogleAuthUseCase,
    initiateSignupUseCase,
    completeSignupUseCase,
    gymLoginUseCase,
    gymInitiateForgotpassUseCase,
    gymCompleteForgotpassUseCase,
    gymResetPasswordUseCase,

    clientLoginUseCase,
    clientInitiateForgotpassUseCase,
    clientCompleteForgotpassUseCase,
    clientResetPasswordUseCase,

    trainerLoginUseCase,
    trainerInitiateForgotpassUseCase,
    trainerCompleteForgotpassUseCase,
    trainerResetPasswordUseCase,

    superAdminLoginUseCase,
    superAdminInitiateForgotpassUseCase,
    superAdminCompleteForgotpassUseCase,
    superAdminResetPasswordUseCase,

    getGymProfileUseCase,
    updateGymProfileUseCase,
    updateGymLogoUseCase,
    uploadGymCertificateUseCase,
    deleteGymCertificateUseCase,

    getSuperAdminProfileUseCase,
    updateSuperAdminProfileUseCase,
    updateSuperAdminLogoUseCase,

    getAllGymsUseCase,
    getGymByIdUseCase,
    // updateGymStatusUseCase,
    approveGymUseCase,

    addClientUseCase,
    getClientsUseCase,
    getClienByIdUseCase,
    updateClientByGymUseCase,
    deleteClientUseCase,
    sendWelcomeEmailUseCase,

    addTrainerUseCase,
    getTrainersUseCase,
    getTrainerbyIdUseCase,
    updateTrainerUseCase,
    deleteTrainerUseCase,

    addPlanUseCase,
    getPlansUseCase,
    updatePlanUseCase,
    deletePlanUseCase,

    addMembershipUseCase,
    getMembershipsUseCase,
    getMembershipByIdUseCase,
    updateMembershipUseCase,
    deleteMembershipUseCase,
    addPaymentUseCase,
    updatePaymentUseCase,
    deletePaymentUseCase,
    getPaymentCollectionUseCase,
    getGymAnalyticsUseCase,
    getGymDashboardUseCase,

    addEquipmentUseCase,
    getEquipmentsUseCase,
    updateEquipmentUseCase,
    deleteEquipmentUseCase,

    getClientProfileWithMembershipUseCase,
    updateClientProfileUseCase,
    updateClientProfileImageUseCase,
    getClientGymDetailsUseCase,
    getClientAssignedTrainerUseCase,

    getTrainerProfileUseCase,
    updateTrainerProfileUseCase,
    updateTrainerProfileImageUseCase,
    getTrainerGymDetailsUseCase,
    getAssignedClientsUseCase,

    markAttendanceUseCase,
    getTodayAttendanceUseCase,
    getDailyAttendanceReportUseCase,
    markManualAttendanceUseCase,
    getYearlyAttendanceCountUseCase,
    createOrUpdateWorkoutPlanUseCase,
    getWorkoutPlanByClientIdUseCase,
    trackWorkoutProgressUseCase,
    getWorkoutProgressUseCase,
    getWorkoutStreakUseCase,

    addEnquiryUseCase,
    getEnquiriesUseCase,
    updateEnquiryUseCase,
    deleteEnquiryUseCase,

    addExpenseUseCase,
    getExpensesUseCase,
    updateExpenseUseCase,
    deleteExpenseUseCase,

    workoutLibraryUseCase,
    workoutTemplateUseCase,

    addTrainerPayoutUseCase,
    getTrainerPayoutsUseCase,
    updateTrainerPayoutUseCase,
    deleteTrainerPayoutUseCase,
    getTrainerEarningsUseCase,
    createEquipmentBookingUseCase,
    getAvailableSlotsUseCase,
    getClientBookingsUseCase,
    cancelEquipmentBookingUseCase,
    getNotificationsUseCase,
    markNotificationUseCase
} from "./usecases.di";
import { trainerRepository } from "./repositories.di";







/* ------------------- Instantiate controllers ---------------- */
/**
 * auth controller instances
 */
export const tokenRefreshController = new TokenRefreshController(tokenRefreshUseCase);

export const inviteController = new InviteController(createPasswordUseCase);

export const googleAuthController = new GoogleAuthController(googleAuthUseCase, initiateGoogleAuthUseCase);

export const gymAuthenticationController = new GymAuthenticationController(
    initiateSignupUseCase,
    completeSignupUseCase,
    gymLoginUseCase,
    gymInitiateForgotpassUseCase,
    gymCompleteForgotpassUseCase,
    gymResetPasswordUseCase);

export const clientAuthController = new ClientAuthController(
    clientLoginUseCase,
    clientInitiateForgotpassUseCase,
    clientCompleteForgotpassUseCase,
    clientResetPasswordUseCase);

export const trainerAuthController = new TrainerAuthController(
    trainerLoginUseCase,
    trainerInitiateForgotpassUseCase,
    trainerCompleteForgotpassUseCase,
    trainerResetPasswordUseCase);

export const superAdminAuthenticationController = new SuperAdminAuthenticationController(
    superAdminLoginUseCase,
    superAdminInitiateForgotpassUseCase,
    superAdminCompleteForgotpassUseCase,
    superAdminResetPasswordUseCase)



/**
 * 
 */
export const gymProfileController = new GymProfileController(
    getGymProfileUseCase,
    updateGymProfileUseCase,
    updateGymLogoUseCase,
    uploadGymCertificateUseCase,
    deleteGymCertificateUseCase,
);
export const superAdminProfileController = new SuperAdminProfileController(
    getSuperAdminProfileUseCase,
    updateSuperAdminProfileUseCase,
    updateSuperAdminLogoUseCase);
export const superAdminGymsController = new SuperAdminGymsController(
    getAllGymsUseCase,
    getGymByIdUseCase,
    // updateGymStatusUseCase,
    approveGymUseCase);
export const gymClientController = new GymClientController(
    addClientUseCase,
    getClientsUseCase,
    getClienByIdUseCase,
    updateClientByGymUseCase,
    deleteClientUseCase,
    sendWelcomeEmailUseCase);
export const gymTrainerController = new GymTrainerController(
    addTrainerUseCase,
    getTrainersUseCase,
    getTrainerbyIdUseCase,
    updateTrainerUseCase,
    deleteTrainerUseCase,
    sendWelcomeEmailUseCase);
export const gymPlanController = new GymPlanController(
    addPlanUseCase,
    getPlansUseCase,
    updatePlanUseCase,
    deletePlanUseCase);

export const gymMembershipController = new GymMembershipController(
    addMembershipUseCase,
    getMembershipsUseCase,
    getMembershipByIdUseCase,
    updateMembershipUseCase,
    deleteMembershipUseCase,
    addPaymentUseCase,
    updatePaymentUseCase,
    deletePaymentUseCase,
    getPaymentCollectionUseCase
);


// gym equipment
export const gymEquipmentController = new GymEquipmentController(
    addEquipmentUseCase,
    getEquipmentsUseCase,
    updateEquipmentUseCase,
    deleteEquipmentUseCase
);

// gym analytics
export const gymAnalyticsController = new GymAnalyticsController(getGymAnalyticsUseCase);

// gym dashboard
export const dashboardController = new DashboardController(getGymDashboardUseCase);

//client
export const clientProfileController = new ClientProfileController(
    getClientProfileWithMembershipUseCase,
    updateClientProfileUseCase,
    updateClientProfileImageUseCase,
    getClientGymDetailsUseCase,
    getClientAssignedTrainerUseCase);

//trainer
export const trainerProfileController = new TrainerProfileController(
    getTrainerProfileUseCase,
    updateTrainerProfileUseCase,
    updateTrainerProfileImageUseCase,
    getTrainerGymDetailsUseCase,
    getAssignedClientsUseCase,
    getClienByIdUseCase);


//attendance
export const attendanceController = new AttendanceController(
    markAttendanceUseCase,
    getTodayAttendanceUseCase,
    getDailyAttendanceReportUseCase,
    markManualAttendanceUseCase,
    getYearlyAttendanceCountUseCase);


// export const trainerWorkoutPlanController = new TrainerWorkoutPlanController(createOrUpdateWorkoutPlanUseCase, getWorkoutPlanByClientIdUseCase, trainerRepository);
export const trainerWorkoutPlanController = new TrainerWorkoutPlanController(
    createOrUpdateWorkoutPlanUseCase,
    getWorkoutPlanByClientIdUseCase,
    trainerRepository
)

export const clientWorkoutPlanController = new ClientWorkoutPlanController(
    getWorkoutPlanByClientIdUseCase,
    trackWorkoutProgressUseCase,
    getWorkoutProgressUseCase,
    getWorkoutStreakUseCase);


export const enquiryController = new EnquiryController(
    addEnquiryUseCase,
    getEnquiriesUseCase,
    updateEnquiryUseCase,
    deleteEnquiryUseCase
);


export const expenseController = new ExpenseController(
    addExpenseUseCase,
    getExpensesUseCase,
    updateExpenseUseCase,
    deleteExpenseUseCase
);

export const trainerPayoutController = new TrainerPayoutController(
    addTrainerPayoutUseCase,
    getTrainerPayoutsUseCase,
    updateTrainerPayoutUseCase,
    deleteTrainerPayoutUseCase,
    getTrainerEarningsUseCase
);

export const workoutLibraryController = new WorkoutLibraryController(workoutLibraryUseCase, trainerRepository);
export const workoutTemplateController = new WorkoutTemplateController(workoutTemplateUseCase);
export const equipmentBookingController = new EquipmentBookingController(
    createEquipmentBookingUseCase,
    getAvailableSlotsUseCase,
    getClientBookingsUseCase,
    cancelEquipmentBookingUseCase
);

export const notificationController = new NotificationController(
    getNotificationsUseCase,
    markNotificationUseCase
);

