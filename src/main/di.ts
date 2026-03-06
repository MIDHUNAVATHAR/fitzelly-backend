/* --------------- Repositories (infrastructure) ---------------- */
import { GymRepository } from "../infrastructure/repositories/GymRepository";
import { SuperAdminRepository } from "../infrastructure/repositories/SuperAdminRepository";
import { OtpRepository } from "../infrastructure/repositories/OtpRepository";
import { ClientRepository } from "../infrastructure/repositories/ClientRepository";
import { TrainerRepository } from "../infrastructure/repositories/TrainerRepository";
import { MembershipRepository } from "../infrastructure/repositories/MembershipRepository";
import { PaymentRepository } from "../infrastructure/repositories/PaymentRepository";
import { PlanRepository } from "../infrastructure/repositories/PlanRepository";
import { EquipmentRepository } from "../infrastructure/repositories/EquipmentRepository";
import { SubscriptionRepository } from "../infrastructure/repositories/SubscriptionRepository";

/* ------------------- services (infrastructure) ---------------- */
import { MailService } from "../infrastructure/services/MailService";
import { PasswordHasher } from "../infrastructure/services/PasswordHasher";
import { JwtService } from "../infrastructure/services/JwtService";
import { GoogleAuthService } from "../infrastructure/services/GoogleAuthService";
import { S3Service } from "../infrastructure/services/S3Service";


/* ------------------- utilitities (infrastructure) ---------------- */
import { GetRepoByUserType } from "../infrastructure/adaptors/GetRepoByUserType";



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
import { GetGymProfileUseCase } from "../application/usecases/GetGymProfileUseCase";
import { UpdateGymProfileUseCase } from "../application/usecases/UpdateGymProfileUseCase";
import { UpdateGymLogoUseCase } from "../application/usecases/UpdateGymLogoUseCase";


/**
 * gym client usecases
 */
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



/**
 * superadmin profile usecases
 */

import { GetSuperAdminProfileUseCase } from "../application/usecases/GetSuperAdminProfileUseCase";
import { UpdateSuperAdminProfileUseCase } from "../application/usecases/UpdateSuperAdminProfileUseCase";
import { UpdateSuperAdminLogoUseCase } from "../application/usecases/UpdateSuperAdminLogoUseCase";

/**
 * superadmin gyms usecases
 */
import { GetAllGymsUseCase } from "../application/usecases/GetAllGymsUseCase";
import { GetGymByIdUseCase } from "../application/usecases/GetGymByIdUseCase";
import { UpdateGymStatusUseCase } from "../application/usecases/UpdateGymStatusUseCase";
import { ApproveGymUseCase } from "../application/usecases/ApproveGymUseCase";



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




import { ClientAuthController } from "../presentation/controller/auth/ClientAuthController";
import { ClientProfileController } from "../presentation/controller/client/ClientProfileController";


import { TrainerAuthController } from "../presentation/controller/auth/TrainerAuthController";
import { TrainerProfileController } from "../presentation/controller/trainer/TrainerProfileController";

import { SuperAdminProfileController } from "../presentation/controller/super-admin/SuperAdminProfileController";
import { SuperAdminGymsController } from "../presentation/controller/super-admin/SuperAdminGymsController";




/* ------------------- Instantiate Repositories ---------------- */
const gymRepository = new GymRepository();
const otpRepository = new OtpRepository();
const superAdminRepository = new SuperAdminRepository();
const clientRepository = new ClientRepository();
const trainerRepository = new TrainerRepository();
const membershipRepository = new MembershipRepository();
const paymentRepository = new PaymentRepository();
const planRepository = new PlanRepository();
const equipmentRepository = new EquipmentRepository();
const subscriptionRepository = new SubscriptionRepository();


/* ------------------- Instantiate services ---------------- */
const emailService = new MailService();
const passwordHasher = new PasswordHasher();
const jwtService = new JwtService();
const googleAuthService = new GoogleAuthService();
const s3Service = new S3Service();


/* ------------------- Instantiate usecases ---------------- */
/**
 * auth usecase instances
 */
const tokenRefreshUseCase = new TokenRefreshUseCase(jwtService, gymRepository, superAdminRepository, clientRepository, trainerRepository);

const initiateGoogleAuthUseCase = new InitiateGoogleAuthUseCase(googleAuthService);
const googleAuthUseCase = new GoogleAuthUseCase(gymRepository, clientRepository, trainerRepository, jwtService, googleAuthService);

const gymLoginUseCase = new GymLoginUseCase(gymRepository, passwordHasher, jwtService);
const initiateSignupUseCase = new InitiateSignupUseCase(gymRepository, otpRepository, emailService)
const completeSignupUseCase = new CompleteSignupUseCase(gymRepository, otpRepository, passwordHasher)
const gymInitiateForgotpassUseCase = new GymInitiateForgotpassUseCase(gymRepository, otpRepository, emailService)
const gymCompleteForgotpassUseCase = new GymCompleteForgotpassUseCase(otpRepository);
const gymResetPasswordUseCase = new GymResetPasswordUseCase(gymRepository, passwordHasher, otpRepository);

const clientLoginUseCase = new ClientLoginUseCase(clientRepository, passwordHasher, jwtService);
const clientInitiateForgotpassUseCase = new ClientInitiateForgotpassUseCase(clientRepository, otpRepository, emailService)
const clientCompleteForgotpassUseCase = new ClientForgotpassUseCase(otpRepository);
const clientResetPasswordUseCase = new ClientResetPasswordUseCase(clientRepository, passwordHasher, otpRepository)

const trainerLoginUseCase = new TrainerLoginUseCase(trainerRepository, passwordHasher, jwtService);
const trainerInitiateForgotpassUseCase = new TrainerInitiateForgotpassUseCase(trainerRepository, otpRepository, emailService)
const trainerCompleteForgotpassUseCase = new TrainerCompleteForgotpassUseCase(otpRepository)
const trainerResetPasswordUseCase = new TrainerResetPasswordUseCase(trainerRepository, passwordHasher, otpRepository);

const superAdminLoginUseCase = new SuperAdminLoginUseCase(superAdminRepository, passwordHasher, jwtService)
const superAdminInitiateForgotpassUseCase = new SuperAdminInitiateForgotpassUseCase(superAdminRepository, otpRepository, emailService)
const superAdminCompleteForgotpassUseCase = new SuperAdminCompleteForgotpassUseCase(otpRepository);
const superAdminResetPasswordUseCase = new SuperAdminResetPasswordUseCase(superAdminRepository, otpRepository, passwordHasher);

const getRepoByUserType = new GetRepoByUserType(clientRepository, trainerRepository);
const sendWelcomeEmailUseCase = new SendWelcomeEmailUseCase(getRepoByUserType, gymRepository, otpRepository, emailService)
const createPasswordUseCase = new CreatePasswordUseCase(getRepoByUserType, otpRepository, passwordHasher)

/**
 * gym profile usecase instances
 */
const getGymProfileUseCase = new GetGymProfileUseCase(gymRepository, subscriptionRepository);
const updateGymProfileUseCase = new UpdateGymProfileUseCase(gymRepository);
const updateGymLogoUseCase = new UpdateGymLogoUseCase(gymRepository, s3Service);

/**
 * gym client usecase instances
 */
const addClientUseCase = new AddClientUseCase(clientRepository);
const getClientsUseCase = new GetClientsUseCase(clientRepository, membershipRepository);
const getClienByIdUseCase = new GetClientByIdUseCase(clientRepository, membershipRepository, paymentRepository)
const updateClientByGymUseCase = new UpdateClientByGymUseCase(clientRepository)
const deleteClientUseCase = new DeleteClientUseCase(clientRepository);

/**
 * gym trainer usecase instances 
 */
const addTrainerUseCase = new AddTrainerUseCase(trainerRepository, s3Service);
const getTrainersUseCase = new GetTrainersUseCase(trainerRepository);
const getTrainerbyIdUseCase = new GetTrainerByIdUseCase(trainerRepository);
const updateTrainerUseCase = new UpdateTrainerUseCase(trainerRepository, s3Service);
const deleteTrainerUseCase = new DeleteTrainerUseCase(trainerRepository)

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
export const deleteMembershipUseCase = new DeleteMembershipUseCase(membershipRepository,paymentRepository);
export const addPaymentUseCase = new AddPaymentUseCase(paymentRepository, membershipRepository);
export const updatePaymentUseCase = new UpdatePaymentUseCase(paymentRepository);
export const deletePaymentUseCase = new DeletePaymentUseCase(paymentRepository);


//gym equipment usecases
const addEquipmentUseCase = new AddEquipmentUseCase(equipmentRepository, s3Service);
const getEquipmentsUseCase = new GetEquipmentsUseCase(equipmentRepository)
const updateEquipmentUseCase = new UpdateEquipmentUseCase(equipmentRepository, s3Service)
const deleteEquipmentUseCase = new DeleteEquipmentUseCase(equipmentRepository)




//client profile usecases
const getClientProfileWithMembershipUseCase = new GetClientProfileWithMembershipUseCase(clientRepository, membershipRepository, paymentRepository)
const updateClientProfileUseCase = new UpdateClientProfileUseCase(clientRepository);
const updateClientProfileImageUseCase = new UpdateClientProfileImageUseCase(clientRepository, s3Service);
const getClientGymDetailsUseCase = new GetClientGymDetailsUseCase(clientRepository, gymRepository);

//trainer profile usecases
const getTrainerProfileUseCase = new GetTrainerProfileUseCase(trainerRepository)
const updateTrainerProfileUseCase = new UpdateTrainerProfileUseCase(trainerRepository)
const updateTrainerProfileImageUseCase = new UpdateTrainerProfileImageUseCase(trainerRepository, s3Service)
const getTrainerGymDetailsUseCase = new GetTrainerGymDetailsUseCase(trainerRepository, gymRepository)
const getAssignedClientsUseCase = new GetAssignedClientsUseCase(clientRepository)

//const getClienByIdUseCase = new GetClientByIdUseCase(clientRepository, membershipRepository, paymentRepository)



/**
 * super-admin profile usecase instances
 */
const getSuperAdminProfileUseCase = new GetSuperAdminProfileUseCase(superAdminRepository);
const updateSuperAdminProfileUseCase = new UpdateSuperAdminProfileUseCase(superAdminRepository);
const updateSuperAdminLogoUseCase = new UpdateSuperAdminLogoUseCase(superAdminRepository, s3Service);

/**
 * super-admin gym usecase instances
 */
const getAllGymsUseCase = new GetAllGymsUseCase(gymRepository, subscriptionRepository);
const getGymByIdUseCase = new GetGymByIdUseCase(gymRepository, subscriptionRepository);
const updateGymStatusUseCase = new UpdateGymStatusUseCase(gymRepository);
const approveGymUseCase = new ApproveGymUseCase(gymRepository, superAdminRepository, subscriptionRepository);




/* ------------------- Instantiate controllers ---------------- */
/**
 * auth controller instances
 */
export const tokenRefreshController = new TokenRefreshController(tokenRefreshUseCase);

export const inviteController = new InviteController(createPasswordUseCase);

export const googleAuthController = new GoogleAuthController(googleAuthUseCase, initiateGoogleAuthUseCase);

export const gymAuthenticationController = new GymAuthenticationController(initiateSignupUseCase, completeSignupUseCase, gymLoginUseCase, gymInitiateForgotpassUseCase, gymCompleteForgotpassUseCase, gymResetPasswordUseCase);

export const clientAuthController = new ClientAuthController(clientLoginUseCase, clientInitiateForgotpassUseCase, clientCompleteForgotpassUseCase, clientResetPasswordUseCase);

export const trainerAuthController = new TrainerAuthController(trainerLoginUseCase, trainerInitiateForgotpassUseCase, trainerCompleteForgotpassUseCase, trainerResetPasswordUseCase);

export const superAdminAuthenticationController = new SuperAdminAuthenticationController(superAdminLoginUseCase, superAdminInitiateForgotpassUseCase, superAdminCompleteForgotpassUseCase, superAdminResetPasswordUseCase)

/**
 * 
 */
export const gymProfileController = new GymProfileController(getGymProfileUseCase, updateGymProfileUseCase, updateGymLogoUseCase, s3Service);
export const superAdminProfileController = new SuperAdminProfileController(getSuperAdminProfileUseCase, updateSuperAdminProfileUseCase, updateSuperAdminLogoUseCase);
export const superAdminGymsController = new SuperAdminGymsController(getAllGymsUseCase, getGymByIdUseCase, updateGymStatusUseCase, approveGymUseCase);
export const gymClientController = new GymClientController(addClientUseCase, getClientsUseCase, getClienByIdUseCase, updateClientByGymUseCase, deleteClientUseCase, sendWelcomeEmailUseCase);
export const gymTrainerController = new GymTrainerController(addTrainerUseCase, getTrainersUseCase, getTrainerbyIdUseCase, updateTrainerUseCase, deleteTrainerUseCase, sendWelcomeEmailUseCase);
export const gymPlanController = new GymPlanController(addPlanUseCase, getPlansUseCase, updatePlanUseCase, deletePlanUseCase);

export const gymMembershipController = new GymMembershipController(
    addMembershipUseCase,
    getMembershipsUseCase,
    getMembershipByIdUseCase,
    updateMembershipUseCase,
    deleteMembershipUseCase,
    addPaymentUseCase,
    updatePaymentUseCase,
    deletePaymentUseCase
);


export const gymEquipmentController = new GymEquipmentController(
    addEquipmentUseCase,
    getEquipmentsUseCase,
    updateEquipmentUseCase,
    deleteEquipmentUseCase
);


//client 
export const clientProfileController = new ClientProfileController(getClientProfileWithMembershipUseCase, updateClientProfileUseCase, updateClientProfileImageUseCase, getClientGymDetailsUseCase);

//trainer
export const trainerProfileController = new TrainerProfileController(getTrainerProfileUseCase, updateTrainerProfileUseCase, updateTrainerProfileImageUseCase, getTrainerGymDetailsUseCase, getAssignedClientsUseCase, getClienByIdUseCase);
