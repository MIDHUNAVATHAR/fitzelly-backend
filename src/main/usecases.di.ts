
/* ------------------- usecases (application) ---------------- */
/**
 * auth usecases
 */
import { CreatePasswordUseCase } from "../application/usecases/auth/CreatePasswordUseCase";

import { TokenRefreshUseCase } from "../application/usecases/auth/TokenRefreshUseCase";

import { InitiateGoogleAuthUseCase } from "../application/usecases/auth/InitiateGoogleAuthUseCase";
import { GoogleAuthUseCase } from "../application/usecases/auth/GoogleAuthUseCase";

import { InitiateSignupUseCase } from "../application/usecases/auth/InitiateSignupUseCase";
import { CompleteSignupUseCase } from "../application/usecases/auth/CompleteSignupUseCase";
import { GymLoginUseCase } from "../application/usecases/auth/GymLoginUseCase";
import { GymInitiateForgotpassUseCase } from "../application/usecases/auth/GymInitiateForgotpassUseCase";
import { GymCompleteForgotpassUseCase } from "../application/usecases/auth/GymCompleteForgotpassUseCase";
import { GymResetPasswordUseCase } from "../application/usecases/auth/GymResetPasswordUseCase";

import { ClientLoginUseCase } from "../application/usecases/auth/ClientLoginUseCase";
import { ClientInitiateForgotpassUseCase } from "../application/usecases/auth/ClientInitiateForgotpassUseCase";
import { ClientForgotpassUseCase } from "../application/usecases/auth/ClientCompleteForgotpassUseCase";
import { ClientResetPasswordUseCase } from "../application/usecases/auth/ClientResetPasswordUseCase";

import { GetClientProfileWithMembershipUseCase } from "../application/usecases/client-profile/GetClientProfileWithMembershipUseCase";
import { UpdateClientProfileUseCase } from "../application/usecases/client-profile/UpdateClientProfileUseCase";
import { UpdateClientProfileImageUseCase } from "../application/usecases/client-profile/UpdateClientProfileImageUseCase";
import { GetClientGymDetailsUseCase } from "../application/usecases/client-profile/GetClientGymDetailsUseCase";


import { TrainerLoginUseCase } from "../application/usecases/auth/TrainerLoginUseCase";
import { TrainerInitiateForgotpassUseCase } from "../application/usecases/auth/TrainerInitiateForgotpassUseCase";
import { TrainerCompleteForgotpassUseCase } from "../application/usecases/auth/TrainerCompleteForgotpassUseCase";
import { TrainerResetPasswordUseCase } from "../application/usecases/auth/TrainerResetPasswordUseCase";

import { SuperAdminLoginUseCase } from "../application/usecases/auth/SuperAdminLoginUseCase";
import { SuperAdminInitiateForgotpassUseCase } from "../application/usecases/auth/SuperAdminInitiateForgotpassUseCase";
import { SuperAdminCompleteForgotpassUseCase } from "../application/usecases/auth/SuperAdminCompleteForgotpassUseCase";
import { SuperAdminResetPasswordUseCase } from "../application/usecases/auth/SuperAdminResetPasswordUseCase";


/**
 * utility usecases
 */
import { SendWelcomeEmailUseCase } from "../application/usecases/invite/SendWelcomeEmailUseCase";


/**
 * gym profile usecases
 */
import { GetGymProfileUseCase } from "../application/usecases/gym-profile/GetGymProfileUseCase";
import { UpdateGymProfileUseCase } from "../application/usecases/gym-profile/UpdateGymProfileUseCase";
import { UpdateGymLogoUseCase } from "../application/usecases/gym-profile/UpdateGymLogoUseCase";
import { UploadGymCertificateUseCase } from "../application/usecases/gym-profile/UploadGymCertificateUseCase";
import { DeleteGymCertificateUseCase } from "../application/usecases/gym-profile/DeleteGymCertificateUseCase";


import { GetGymDashboardUseCase } from "../application/usecases/gym-dashboard/GetGymDashboardUseCase";
import { AddClientUseCase } from "../application/usecases/gym-clients/AddClientUseCase";
import { GetClientByIdUseCase } from "../application/usecases/gym-clients/GetClientByIdUseCase";
import { UpdateClientByGymUseCase } from "../application/usecases/gym-clients/UpdateClientByGymUseCase";
import { GetClientsUseCase } from "../application/usecases/gym-clients/GetClientsUseCase";
import { DeleteClientUseCase } from "../application/usecases/gym-clients/DeleteClientUseCase";


/**
 * gym trainer usecases
 */
import { AddTrainerUseCase } from "../application/usecases/gym-trainer/AddTrainerUseCase";
import { GetTrainerByIdUseCase } from "../application/usecases/gym-trainer/GetTrainerByIdUseCase";
import { UpdateTrainerUseCase } from "../application/usecases/gym-trainer/UpdateTrainerUseCase";
import { DeleteTrainerUseCase } from "../application/usecases/gym-trainer/DeleteTrainerUseCase";
import { GetTrainersUseCase } from "../application/usecases/gym-trainer/GetTrainersUseCase";

//gym plan usecases
import { AddPlanUseCase } from "../application/usecases/gym-plans/AddPlanUseCase";
import { GetPlansUseCase } from "../application/usecases/gym-plans/GetPlansUseCase";
import { UpdatePlanUseCase } from "../application/usecases/gym-plans/UpdatePlanUseCase";
import { DeletePlanUseCase } from "../application/usecases/gym-plans/DeletePlanUseCase";

//gym membershup usecases
import { AddMembershipUseCase } from "../application/usecases/gym-memberships/AddMembershipUseCase";
import { GetMembershipsUseCase } from "../application/usecases/gym-memberships/GetMembershipsUseCase";
import { GetMembershipByIdUseCase } from "../application/usecases/gym-memberships/GetMembershipByIdUseCase";
import { UpdateMembershipUseCase } from "../application/usecases/gym-memberships/UpdateMembershipUseCase";
import { DeleteMembershipUseCase } from "../application/usecases/gym-memberships/DeleteMembershipUseCase";
import { AddPaymentUseCase } from "../application/usecases/gym-memberships/AddPaymentUseCase";
import { UpdatePaymentUseCase } from "../application/usecases/gym-memberships/UpdatePaymentUseCase";
import { DeletePaymentUseCase } from "../application/usecases/gym-memberships/DeletePaymentUseCase";
import { GetPaymentCollectionUseCase } from "../application/usecases/gym-memberships/GetPaymentCollectionUseCase";

//gym equipment usecases
import { GetEquipmentsUseCase } from "../application/usecases/gym-equipments/GetEquipmentsUseCase";
import { AddEquipmentUseCase } from "../application/usecases/gym-equipments/AddEquipmentUseCase";
import { UpdateEquipmentUseCase } from "../application/usecases/gym-equipments/UpdateEquipmentUseCase";
import { DeleteEquipmentUseCase } from "../application/usecases/gym-equipments/DeleteEquipmentUseCase";


//trainer profile
import { GetTrainerProfileUseCase } from "../application/usecases/trainer-profile/GetTrainerProfileUseCase"
import { UpdateTrainerProfileUseCase } from "../application/usecases/trainer-profile/UpdateTrainerProfileUseCase";
import { UpdateTrainerProfileImageUseCase } from "../application/usecases/trainer-profile/UpdateTrainerProfileImageUseCase";
import { GetTrainerGymDetailsUseCase } from "../application/usecases/trainer-profile/GetTrainerGymDetailsUseCase";
import { GetAssignedClientsUseCase } from "../application/usecases/trainer-assigned-clients/GetAssignedClientsUseCase";


//client profile
import { GetClientAssignedTrainerUseCase } from "../application/usecases/client-profile/GetClientAssignedTrainerUseCase";


/**
 * superadmin profile usecases
 */

import { GetSuperAdminProfileUseCase } from "../application/usecases/superAdmin-profile/GetSuperAdminProfileUseCase";
import { UpdateSuperAdminProfileUseCase } from "../application/usecases/superAdmin-profile/UpdateSuperAdminProfileUseCase";
import { UpdateSuperAdminLogoUseCase } from "../application/usecases/superAdmin-profile/UpdateSuperAdminLogoUseCase";

/**
 * superadmin gyms usecases
 */
import { GetAllGymsUseCase } from "../application/usecases/superAdmin-gym/GetAllGymsUseCase";
import { GetGymByIdUseCase } from "../application/usecases/gym-profile/GetGymByIdUseCase";
// import { UpdateGymStatusUseCase } from "../application/usecases/superAdmin-gym/UpdateGymStatusUseCase";
import { ApproveGymUseCase } from "../application/usecases/superAdmin-gym/ApproveGymUseCase";
import { RejectGymUseCase } from "../application/usecases/superAdmin-gym/RejectGymUseCase";


//attendance usecases
import { MarkAttendenceUseCase } from "../application/usecases/attendance/MarkAttendanceUseCase";
import { GetTodayAttendanceUseCase } from "../application/usecases/attendance/GetTodayAttendanceUseCase";
import { GetDailyAttendanceReportUseCase } from "../application/usecases/attendance/GetDailyAttendanceReportUseCase";
import { MarkManualAttendanceUseCase } from "../application/usecases/attendance/MarkManualAttendanceUseCase";
import { GetYearlyAttendanceCountUseCase } from "../application/usecases/attendance/GetYearlyAttendanceCountUseCase";


//workout plan usecases
import { CreateOrUpdateWorkoutPlanUseCase } from "../application/usecases/workout-plan/CreateOrUpdateWorkoutPlanUseCase";
import { GetWorkoutPlanByClientIdUseCase } from "../application/usecases/workout-plan/GetWorkoutPlanByClientIdUseCase";
import { TrackWorkoutProgressUseCase } from "../application/usecases/workout-plan/TrackWorkoutProgressUseCase";
import { GetWorkoutProgressUseCase } from "../application/usecases/workout-plan/GetWorkoutProgressUseCase";
import { GetWorkoutStreakUseCase } from "../application/usecases/workout-plan/GetWorkoutStreakUseCase";

//enquiry usecases
import { AddEnquiryUseCase, GetEnquiriesUseCase, UpdateEnquiryUseCase, DeleteEnquiryUseCase } from "../application/usecases/enquiry/EnquiryUseCases";

//expense usecases
import { AddExpenseUseCase, GetExpensesUseCase, UpdateExpenseUseCase, DeleteExpenseUseCase } from "../application/usecases/expense/ExpenseUseCases";

// analytics usecases
import { GetGymAnalyticsUseCase } from "../application/usecases/gym-analytics/GetGymAnalyticsUseCase";

//trainer payout usecases
import { AddTrainerPayoutUseCase, GetTrainerPayoutsUseCase, UpdateTrainerPayoutUseCase, DeleteTrainerPayoutUseCase, GetTrainerEarningsUseCase } from "../application/usecases/trainer-payout/TrainerPayoutUseCases";

//workout library and template usecases
import { WorkoutLibraryUseCase } from "../application/usecases/workout-library/WorkoutLibraryUseCase";
import { WorkoutTemplateUseCase } from "../application/usecases/workout-template/WorkoutTemplateUseCase";



import { CreateEquipmentBookingUseCase } from "../application/usecases/equipment-booking/CreateEquipmentBookingUseCase";
import { GetAvailableSlotsUseCase } from "../application/usecases/equipment-booking/GetAvailableSlotsUseCase";
import { GetClientBookingsUseCase } from "../application/usecases/equipment-booking/GetClientBookingsUseCase";
import { CancelEquipmentBookingUseCase } from "../application/usecases/equipment-booking/CancelEquipmentBookingUseCase";
import { ReApplyGymUseCase } from "../application/usecases/gym-profile/ReApplyGymUseCase";

//notification usecases
import { AddNotificationUseCase, GetNotificationsUseCase, MarkNotificationUseCase } from "../application/usecases/notification/NotificationUseCases";



import { gymRepository } from "./repositories.di";
import { superAdminRepository } from "./repositories.di";
import { clientRepository } from "./repositories.di";
import { trainerRepository } from "./repositories.di";
import { otpRepository } from "./repositories.di";
import { subscriptionRepository } from "./repositories.di";
import { membershipRepository } from "./repositories.di";
import { paymentRepository } from "./repositories.di";
import { planRepository } from "./repositories.di";
import { equipmentRepository } from "./repositories.di";
import { attendanceRepository } from "./repositories.di";
import { workoutPlanRepository } from "./repositories.di";
import { workoutLogRepository } from "./repositories.di";
import { enquiryRepository } from "./repositories.di";
import { expenseRepository } from "./repositories.di";
import { exerciseRepository, workoutTemplateRepository, trainerPayoutRepository, equipmentBookingRepository, analyticsRepository, notificationRepository } from "./repositories.di";



import { jwtService } from "./services.di";
import { googleAuthService } from "./services.di";
import { passwordHasher } from "./services.di";
import { emailService } from "./services.di";
import { s3Service } from "./services.di";
import { socketService } from "./services.di";








/* ------------------- Instantiate usecases ---------------- */
/**
 * auth usecase instances
 */
export const tokenRefreshUseCase = new TokenRefreshUseCase(jwtService, gymRepository, superAdminRepository, clientRepository, trainerRepository);

export const initiateGoogleAuthUseCase = new InitiateGoogleAuthUseCase(googleAuthService);
export const googleAuthUseCase = new GoogleAuthUseCase(gymRepository, clientRepository, trainerRepository, jwtService, googleAuthService);

export const gymLoginUseCase = new GymLoginUseCase(gymRepository, passwordHasher, jwtService);
export const initiateSignupUseCase = new InitiateSignupUseCase(gymRepository, otpRepository, emailService)
export const completeSignupUseCase = new CompleteSignupUseCase(gymRepository, otpRepository, passwordHasher)
export const gymInitiateForgotpassUseCase = new GymInitiateForgotpassUseCase(gymRepository, otpRepository, emailService)
export const gymCompleteForgotpassUseCase = new GymCompleteForgotpassUseCase(otpRepository);
export const gymResetPasswordUseCase = new GymResetPasswordUseCase(gymRepository, passwordHasher, otpRepository);

export const clientLoginUseCase = new ClientLoginUseCase(clientRepository, passwordHasher, jwtService);
export const clientInitiateForgotpassUseCase = new ClientInitiateForgotpassUseCase(clientRepository, otpRepository, emailService)
export const clientCompleteForgotpassUseCase = new ClientForgotpassUseCase(otpRepository);
export const clientResetPasswordUseCase = new ClientResetPasswordUseCase(clientRepository, passwordHasher, otpRepository)

export const trainerLoginUseCase = new TrainerLoginUseCase(trainerRepository, passwordHasher, jwtService);
export const trainerInitiateForgotpassUseCase = new TrainerInitiateForgotpassUseCase(trainerRepository, otpRepository, emailService)
export const trainerCompleteForgotpassUseCase = new TrainerCompleteForgotpassUseCase(otpRepository)
export const trainerResetPasswordUseCase = new TrainerResetPasswordUseCase(trainerRepository, passwordHasher, otpRepository);

export const superAdminLoginUseCase = new SuperAdminLoginUseCase(superAdminRepository, passwordHasher, jwtService)
export const superAdminInitiateForgotpassUseCase = new SuperAdminInitiateForgotpassUseCase(superAdminRepository, otpRepository, emailService)
export const superAdminCompleteForgotpassUseCase = new SuperAdminCompleteForgotpassUseCase(otpRepository);
export const superAdminResetPasswordUseCase = new SuperAdminResetPasswordUseCase(superAdminRepository, otpRepository, passwordHasher);

export const sendWelcomeEmailUseCase = new SendWelcomeEmailUseCase(clientRepository, trainerRepository, gymRepository, otpRepository, emailService)
export const createPasswordUseCase = new CreatePasswordUseCase(clientRepository, trainerRepository, otpRepository, passwordHasher)

/**
 * gym profile usecase instances
 */
export const getGymProfileUseCase = new GetGymProfileUseCase(gymRepository, subscriptionRepository);
export const updateGymProfileUseCase = new UpdateGymProfileUseCase(gymRepository);
export const updateGymLogoUseCase = new UpdateGymLogoUseCase(gymRepository, s3Service);
export const uploadGymCertificateUseCase = new UploadGymCertificateUseCase(gymRepository, s3Service);
export const deleteGymCertificateUseCase = new DeleteGymCertificateUseCase(gymRepository, s3Service);

export const getGymAnalyticsUseCase = new GetGymAnalyticsUseCase(analyticsRepository);
export const getGymDashboardUseCase = new GetGymDashboardUseCase(analyticsRepository);

/**
 * gym client usecase instances
 */
export const addClientUseCase = new AddClientUseCase(clientRepository);
export const getClientsUseCase = new GetClientsUseCase(clientRepository, membershipRepository);
export const getClienByIdUseCase = new GetClientByIdUseCase(clientRepository, membershipRepository, paymentRepository)
export const updateClientByGymUseCase = new UpdateClientByGymUseCase(clientRepository)
export const deleteClientUseCase = new DeleteClientUseCase(clientRepository);

/**
 * gym trainer usecase instances 
 */
export const addTrainerUseCase = new AddTrainerUseCase(trainerRepository, s3Service);
export const getTrainersUseCase = new GetTrainersUseCase(trainerRepository);
export const getTrainerbyIdUseCase = new GetTrainerByIdUseCase(trainerRepository);
export const updateTrainerUseCase = new UpdateTrainerUseCase(trainerRepository, s3Service);
export const deleteTrainerUseCase = new DeleteTrainerUseCase(trainerRepository)

//gym plan usecases
export const addPlanUseCase = new AddPlanUseCase(planRepository);
export const getPlansUseCase = new GetPlansUseCase(planRepository);
export const updatePlanUseCase = new UpdatePlanUseCase(planRepository);
export const deletePlanUseCase = new DeletePlanUseCase(planRepository);

//gym membership usecases
export const addMembershipUseCase = new AddMembershipUseCase(membershipRepository, planRepository, clientRepository, trainerRepository);
export const getMembershipsUseCase = new GetMembershipsUseCase(membershipRepository, paymentRepository, planRepository);
export const getMembershipByIdUseCase = new GetMembershipByIdUseCase(membershipRepository, paymentRepository, planRepository);
export const updateMembershipUseCase = new UpdateMembershipUseCase(membershipRepository, planRepository, trainerRepository);
export const deleteMembershipUseCase = new DeleteMembershipUseCase(membershipRepository, paymentRepository);
export const addPaymentUseCase = new AddPaymentUseCase(paymentRepository, membershipRepository);
export const updatePaymentUseCase = new UpdatePaymentUseCase(paymentRepository);
export const deletePaymentUseCase = new DeletePaymentUseCase(paymentRepository);
export const getPaymentCollectionUseCase = new GetPaymentCollectionUseCase(paymentRepository);


//gym equipment usecases
export const addEquipmentUseCase = new AddEquipmentUseCase(equipmentRepository, s3Service);
export const getEquipmentsUseCase = new GetEquipmentsUseCase(equipmentRepository)
export const updateEquipmentUseCase = new UpdateEquipmentUseCase(equipmentRepository, s3Service)
export const deleteEquipmentUseCase = new DeleteEquipmentUseCase(equipmentRepository)




//client profile usecases
export const getClientProfileWithMembershipUseCase = new GetClientProfileWithMembershipUseCase(clientRepository, membershipRepository, paymentRepository)
export const updateClientProfileUseCase = new UpdateClientProfileUseCase(clientRepository);
export const updateClientProfileImageUseCase = new UpdateClientProfileImageUseCase(clientRepository, s3Service);
export const getClientGymDetailsUseCase = new GetClientGymDetailsUseCase(clientRepository, gymRepository);
export const getClientAssignedTrainerUseCase = new GetClientAssignedTrainerUseCase(clientRepository, trainerRepository);


//trainer profile usecases
export const getTrainerProfileUseCase = new GetTrainerProfileUseCase(trainerRepository)
export const updateTrainerProfileUseCase = new UpdateTrainerProfileUseCase(trainerRepository)
export const updateTrainerProfileImageUseCase = new UpdateTrainerProfileImageUseCase(trainerRepository, s3Service)
export const getTrainerGymDetailsUseCase = new GetTrainerGymDetailsUseCase(trainerRepository, gymRepository)
export const getAssignedClientsUseCase = new GetAssignedClientsUseCase(clientRepository)



/**
 * super-admin profile usecase instances
 */
export const getSuperAdminProfileUseCase = new GetSuperAdminProfileUseCase(superAdminRepository);
export const updateSuperAdminProfileUseCase = new UpdateSuperAdminProfileUseCase(superAdminRepository);
export const updateSuperAdminLogoUseCase = new UpdateSuperAdminLogoUseCase(superAdminRepository, s3Service);

/**
 * super-admin gym usecase instances
 */
export const getAllGymsUseCase = new GetAllGymsUseCase(gymRepository, subscriptionRepository);
export const getGymByIdUseCase = new GetGymByIdUseCase(gymRepository, subscriptionRepository);
// export const updateGymStatusUseCase = new UpdateGymStatusUseCase(gymRepository);
export const approveGymUseCase = new ApproveGymUseCase(gymRepository, superAdminRepository, subscriptionRepository);
export const rejectGymUseCase = new RejectGymUseCase(gymRepository);


//attendance usecases
export const markAttendanceUseCase = new MarkAttendenceUseCase(attendanceRepository, gymRepository, socketService, membershipRepository);
export const markManualAttendanceUseCase = new MarkManualAttendanceUseCase(attendanceRepository, socketService, membershipRepository);
export const getTodayAttendanceUseCase = new GetTodayAttendanceUseCase(attendanceRepository);
export const getDailyAttendanceReportUseCase = new GetDailyAttendanceReportUseCase(attendanceRepository, clientRepository, trainerRepository);
export const getYearlyAttendanceCountUseCase = new GetYearlyAttendanceCountUseCase(attendanceRepository);


//workout plan usecases
export const getWorkoutPlanByClientIdUseCase = new GetWorkoutPlanByClientIdUseCase(workoutPlanRepository, trainerRepository);
export const trackWorkoutProgressUseCase = new TrackWorkoutProgressUseCase(workoutLogRepository);
export const getWorkoutProgressUseCase = new GetWorkoutProgressUseCase(workoutLogRepository);
export const getWorkoutStreakUseCase = new GetWorkoutStreakUseCase(workoutLogRepository);
export const createOrUpdateWorkoutPlanUseCase = new CreateOrUpdateWorkoutPlanUseCase(workoutPlanRepository);

//enquiry usecases
export const addEnquiryUseCase = new AddEnquiryUseCase(enquiryRepository);
export const getEnquiriesUseCase = new GetEnquiriesUseCase(enquiryRepository);
export const updateEnquiryUseCase = new UpdateEnquiryUseCase(enquiryRepository);
export const deleteEnquiryUseCase = new DeleteEnquiryUseCase(enquiryRepository);

//expense usecases
export const addExpenseUseCase = new AddExpenseUseCase(expenseRepository);
export const getExpensesUseCase = new GetExpensesUseCase(expenseRepository);
export const updateExpenseUseCase = new UpdateExpenseUseCase(expenseRepository);
export const deleteExpenseUseCase = new DeleteExpenseUseCase(expenseRepository);

//trainer payout usecases
export const addTrainerPayoutUseCase = new AddTrainerPayoutUseCase(trainerPayoutRepository);
export const getTrainerPayoutsUseCase = new GetTrainerPayoutsUseCase(trainerPayoutRepository, trainerRepository);
export const updateTrainerPayoutUseCase = new UpdateTrainerPayoutUseCase(trainerPayoutRepository);
export const deleteTrainerPayoutUseCase = new DeleteTrainerPayoutUseCase(trainerPayoutRepository);
export const getTrainerEarningsUseCase = new GetTrainerEarningsUseCase(trainerPayoutRepository);

export const workoutLibraryUseCase = new WorkoutLibraryUseCase(exerciseRepository);
export const workoutTemplateUseCase = new WorkoutTemplateUseCase(workoutTemplateRepository, exerciseRepository, workoutPlanRepository);

export const addNotificationUseCase = new AddNotificationUseCase(notificationRepository, socketService);
export const getNotificationsUseCase = new GetNotificationsUseCase(notificationRepository);
export const markNotificationUseCase = new MarkNotificationUseCase(notificationRepository);

export const createEquipmentBookingUseCase = new CreateEquipmentBookingUseCase(equipmentBookingRepository, equipmentRepository, clientRepository, addNotificationUseCase);
export const getAvailableSlotsUseCase = new GetAvailableSlotsUseCase(equipmentRepository, equipmentBookingRepository);
export const getClientBookingsUseCase = new GetClientBookingsUseCase(equipmentBookingRepository);
export const cancelEquipmentBookingUseCase = new CancelEquipmentBookingUseCase(equipmentBookingRepository);
export const reApplyGymUseCase = new ReApplyGymUseCase(gymRepository, addNotificationUseCase);