/* --------------- Repositories (infrastructure) ---------------- */
import { GymRepository } from "../infrastructure/repositories/GymRepository";
import { SuperAdminRepository } from "../infrastructure/repositories/SuperAdminRepository";
import { OtpRepository } from "../infrastructure/repositories/OtpRepository";
import { ClientRepository } from "../infrastructure/repositories/ClientRepository";
import { TrainerRepository } from "../infrastructure/repositories/TrainerRepository";


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
import { CreatePasswordUseCase } from "../application/usecases/invite/CreatePasswordUseCase";

import { TokenRefreshUseCase } from "../application/usecases/TokenRefreshUseCase";

import { InitiateGoogleAuthUseCase } from "../application/usecases/InitiateGoogleAuthUseCase";
import { GoogleAuthUseCase } from "../application/usecases/GoogleAuthUseCase";

import { InitiateSignupUseCase } from "../application/usecases/InitiateSignupUseCase";
import { CompleteSignupUseCase } from "../application/usecases/CompleteSignupUseCase";
import { GymLoginUseCase } from "../application/usecases/GymLoginUseCase";
import { GymInitiateForgotpassUseCase } from "../application/usecases/GymInitiateForgotpassUseCase";
import { GymCompleteForgotpassUseCase } from "../application/usecases/GymCompleteForgotpassUseCase";
import { GymResetPasswordUseCase } from "../application/usecases/GymResetPasswordUseCase";

import { ClientLoginUseCase } from "../application/usecases/auth/ClientLoginUseCase";
import { ClientInitiateForgotpassUseCase } from "../application/usecases/auth/ClientInitiateForgotpassUseCase";
import { ClientForgotpassUseCase } from "../application/usecases/auth/ClientCompleteForgotpassUseCase";
import { ClientResetPasswordUseCase } from "../application/usecases/auth/ClientResetPasswordUseCase";

import { TrainerLoginUseCase } from "../application/usecases/auth/TrainerLoginUseCase";
import { TrainerInitiateForgotpassUseCase } from "../application/usecases/auth/TrainerInitiateForgotpassuseCase";
import { TrainerCompleteForgotpassUseCase } from "../application/usecases/auth/TrainerCompleteForgotpassUseCase";
import { TrainerResetPasswordUseCase } from "../application/usecases/auth/TrainerResetPasswordUseCase";

import { SuperAdminLoginUseCase } from "../application/usecases/SuperAdminLoginUseCase";
import { SuperAdminInitiateForgotpassUseCase } from "../application/usecases/SuperAdminInitiateForgotpassUseCase";
import { SuperAdminCompleteForgotpassUseCase } from "../application/usecases/SuperAdminCompleteForgotpassUseCase";
import { SuperAdminResetPasswordUseCase } from "../application/usecases/SuperAdminResetPasswordUseCase";


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
import { AddClientUseCase } from "../application/usecases/client/AddClientUseCase";
import { GetClientByIdUseCase } from "../application/usecases/client/GetClientByIdUseCase";
import { UpdateClientByGymUseCase } from "../application/usecases/client/UpdateClientByGymUseCase";
import { GetClientsUseCase } from "../application/usecases/client/GetClientsUseCase";
import { DeleteClientUseCase } from "../application/usecases/client/DeleteClientUseCase";


/**
 * gym trainer usecases
 */
import { AddTrainerUseCase } from "../application/usecases/trainer/AddTrainerUseCase";
import { GetTrainerByIdUseCase } from "../application/usecases/trainer/GetTrainerByIdUseCase";
import { UpdateTrainerUseCase } from "../application/usecases/trainer/UpdateTrainerUseCase";
import { DeleteTrainerUseCase } from "../application/usecases/trainer/DeleteTrainerUseCase";
import { GetTrainersUseCase } from "../application/usecases/trainer/GetTrainersUseCase";


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




/* ------------------- controllers (presentation) ---------------- */
import { InviteController } from "../presentation/controller/InviteController";

import { GymAuthenticationController } from "../presentation/controller/GymAuthenticationController";
import { SuperAdminAuthenticationController } from "../presentation/controller/SuperAdminAuthenticationController";
import { TokenRefreshController } from "../presentation/controller/TokenRefreshController";
import { GoogleAuthController } from "../presentation/controller/GoogleAuthController";
import { GymProfileController } from "../presentation/controller/GymProfileController";
import { GymClientController } from "../presentation/controller/GymClientController";
import { GymTrainerController } from "../presentation/controller/GymTrainerController";

import { ClientAuthController } from "../presentation/controller/ClientAuthController";
import { TrainerAuthController } from "../presentation/controller/TrainerAuthController";
import { SuperAdminProfileController } from "../presentation/controller/SuperAdminProfileController";
import { SuperAdminGymsController } from "../presentation/controller/SuperAdminGymsController";



/* ------------------- Instantiate Repositories ---------------- */
const gymRepository = new GymRepository();
const otpRepository = new OtpRepository();
const superAdminRepository = new SuperAdminRepository();
const clientRepository = new ClientRepository();
const trainerRepository = new TrainerRepository()


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
const sendWelcomeEmailUseCase = new SendWelcomeEmailUseCase(gymRepository, otpRepository, emailService)
const createPasswordUseCase = new CreatePasswordUseCase(getRepoByUserType, otpRepository, passwordHasher)

/**
 * gym profile usecase instances
 */
const getGymProfileUseCase = new GetGymProfileUseCase(gymRepository);
const updateGymProfileUseCase = new UpdateGymProfileUseCase(gymRepository);
const updateGymLogoUseCase = new UpdateGymLogoUseCase(gymRepository, s3Service);

/**
 * gym client usecase instances
 */
const addClientUseCase = new AddClientUseCase(clientRepository);
const getClientsUseCase = new GetClientsUseCase(clientRepository);
const getClienByIdUseCase = new GetClientByIdUseCase(clientRepository)
const updateClientByGymUseCase = new UpdateClientByGymUseCase(clientRepository)
const deleteClientUseCase = new DeleteClientUseCase(clientRepository);

/**
 * gym trainer usecase instances 
 */
const addTrainerUseCase = new AddTrainerUseCase(trainerRepository);
const getTrainersUseCase = new GetTrainersUseCase(trainerRepository);
const getTrainerbyIdUseCase = new GetTrainerByIdUseCase(trainerRepository);
const updateTrainerUseCase = new UpdateTrainerUseCase(trainerRepository);
const deleteTrainerUseCase = new DeleteTrainerUseCase(trainerRepository)

/**
 * super-admin profile usecase instances
 */
const getSuperAdminProfileUseCase = new GetSuperAdminProfileUseCase(superAdminRepository);
const updateSuperAdminProfileUseCase = new UpdateSuperAdminProfileUseCase(superAdminRepository);
const updateSuperAdminLogoUseCase = new UpdateSuperAdminLogoUseCase(superAdminRepository, s3Service);

/**
 * super-admin gym usecase instances
 */
const getAllGymsUseCase = new GetAllGymsUseCase(gymRepository);
const getGymByIdUseCase = new GetGymByIdUseCase(gymRepository);
const updateGymStatusUseCase = new UpdateGymStatusUseCase(gymRepository);




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
export const superAdminGymsController = new SuperAdminGymsController(getAllGymsUseCase, getGymByIdUseCase, updateGymStatusUseCase);
export const gymClientController = new GymClientController(addClientUseCase, getClientsUseCase, getClienByIdUseCase, updateClientByGymUseCase, deleteClientUseCase, sendWelcomeEmailUseCase);
export const gymTrainerController = new GymTrainerController(addTrainerUseCase, getTrainersUseCase, getTrainerbyIdUseCase, updateTrainerUseCase, deleteTrainerUseCase, sendWelcomeEmailUseCase);

