/* --------------- Repositories (infrastructure) ---------------- */
import { GymRepositoryImpl } from "../infrastructure/repositories/GymRepositoryImpl";
import { SuperAdminRepositoryImpl } from "../infrastructure/repositories/SuperAdminRepository";
import { OtpRepositoryImpl } from "../infrastructure/repositories/OtpRepositoryImpl";


/* ------------------- services (infrastructure) ---------------- */
import { MailServiceImpl } from "../infrastructure/services/MailServiceImpl"
import { PasswordHasherImpl } from "../infrastructure/services/PasswordHasherImpl";
import { JwtServiceImpl } from "../infrastructure/services/JwtServiceImpl";
import { GoogleAuthServiceImpl } from "../infrastructure/services/GoogleAuthServiceImpl";
import { S3Service } from "../infrastructure/services/S3Service";


/* ------------------- usecases (application) ---------------- */
import { InitiateSignupUseCase } from "../application/usecases/InitiateSignupUseCase";
import { CompleteSignupUseCase } from "../application/usecases/CompleteSignupUseCase";
import { GymLoginUseCase } from "../application/usecases/GymLoginUseCase";
import { TokenRefreshUseCase } from "../application/usecases/TokenRefreshUseCase";
import { GymInitiateForgotpassUseCase } from "../application/usecases/GymInitiateForgotpassUseCase";
import { GymCompleteForgotpassUseCase } from "../application/usecases/GymCompleteForgotpassUseCase";
import { GymResetPasswordUseCase } from "../application/usecases/GymResetPasswordUseCase";
import { InitiateGoogleAuthUseCase } from "../application/usecases/InitiateGoogleAuthUseCase";
import { GoogleAuthUseCase } from "../application/usecases/GoogleAuthUseCase";
//gym
import { GetGymProfileUseCase } from "../application/usecases/GetGymProfileUseCase";
import { UpdateGymProfileUseCase } from "../application/usecases/UpdateGymProfileUseCase";
import { UpdateGymLogoUseCase } from "../application/usecases/UpdateGymLogoUseCase";

//super-admin
import { SuperAdminInitiateForgotpassUseCase } from "../application/usecases/SuperAdminInitiateForgotpassUseCase";
import { SuperAdminCompleteForgotpassUseCase } from "../application/usecases/SuperAdminCompleteForgotpassUseCase";
import { SuperAdminResetPasswordUseCase } from "../application/usecases/SuperAdminResetPasswordUseCase";
import { SuperAdminLoginUseCase } from "../application/usecases/SuperAdminLoginUseCase";
import { GetSuperAdminProfileUseCase } from "../application/usecases/GetSuperAdminProfileUseCase";
import { UpdateSuperAdminProfileUseCase } from "../application/usecases/UpdateSuperAdminProfileUseCase";
import { UpdateSuperAdminLogoUseCase } from "../application/usecases/UpdateSuperAdminLogoUseCase";


/* ------------------- controllers (presentation) ---------------- */
import { GymAuthenticationController } from "../presentation/controller/GymAuthenticationController";
import { SuperAdminAuthenticationController } from "../presentation/controller/SuperAdminAuthenticationController";
import { TokenRefreshController } from "../presentation/controller/TokenRefreshController";
import { GoogleAuthController } from "../presentation/controller/GoogleAuthController";
//gym
import { GymProfileController } from "../presentation/controller/GymProfileController";

//superAdmin
import { SuperAdminProfileController } from "../presentation/controller/SuperAdminProfileController";



/* ------------------- Instantiate Repositories ---------------- */
const gymRepository = new GymRepositoryImpl();
const otpRepository = new OtpRepositoryImpl();
const superAdminRepository = new SuperAdminRepositoryImpl();


/* ------------------- Instantiate services ---------------- */
const emailService = new MailServiceImpl();
const passwordHasher = new PasswordHasherImpl();
const jwtService = new JwtServiceImpl();
const googleAuthService = new GoogleAuthServiceImpl();
const s3Service = new S3Service();


/* ------------------- Instantiate usecases ---------------- */
const initiateSignupUseCase = new InitiateSignupUseCase(gymRepository, otpRepository, emailService)
const completeSignupUseCase = new CompleteSignupUseCase(gymRepository, otpRepository, passwordHasher)
const gymLoginUseCase = new GymLoginUseCase(gymRepository, passwordHasher, jwtService);
const superAdminLoginUseCase = new SuperAdminLoginUseCase(superAdminRepository, passwordHasher, jwtService)
const tokenRefreshUseCase = new TokenRefreshUseCase(jwtService, gymRepository, superAdminRepository);
const gymInitiateForgotpassUseCase = new GymInitiateForgotpassUseCase(gymRepository, otpRepository, emailService)
const superAdminInitiateForgotpassUseCase = new SuperAdminInitiateForgotpassUseCase(superAdminRepository, otpRepository, emailService)
const gymCompleteForgotpassUseCase = new GymCompleteForgotpassUseCase(otpRepository);
const superAdminCompleteForgotpassUseCase = new SuperAdminCompleteForgotpassUseCase(otpRepository);
const gymResetPasswordUseCase = new GymResetPasswordUseCase(gymRepository, passwordHasher, otpRepository);
const superAdminResetPasswordUseCase = new SuperAdminResetPasswordUseCase(superAdminRepository, otpRepository, passwordHasher);
const initiateGoogleAuthUseCase = new InitiateGoogleAuthUseCase(googleAuthService);
const googleAuthUseCase = new GoogleAuthUseCase(gymRepository, jwtService, googleAuthService);
//gym
const getGymProfileUseCase = new GetGymProfileUseCase(gymRepository);
const updateGymProfileUseCase = new UpdateGymProfileUseCase(gymRepository);
const updateGymLogoUseCase = new UpdateGymLogoUseCase(gymRepository, s3Service);

//superadmin
const getSuperAdminProfileUseCase = new GetSuperAdminProfileUseCase(superAdminRepository);
const updateSuperAdminProfileUseCase = new UpdateSuperAdminProfileUseCase(superAdminRepository);
const updateSuperAdminLogoUseCase = new UpdateSuperAdminLogoUseCase(superAdminRepository,s3Service); 


/* ------------------- Instantiate controllers ---------------- */
export const gymAuthenticationController = new GymAuthenticationController(initiateSignupUseCase, completeSignupUseCase, gymLoginUseCase, gymInitiateForgotpassUseCase, gymCompleteForgotpassUseCase, gymResetPasswordUseCase);
export const tokenRefreshController = new TokenRefreshController(tokenRefreshUseCase);
export const googleAuthController = new GoogleAuthController(googleAuthUseCase, initiateGoogleAuthUseCase);
export const superAdminAuthenticationController = new SuperAdminAuthenticationController(superAdminLoginUseCase, superAdminInitiateForgotpassUseCase, superAdminCompleteForgotpassUseCase, superAdminResetPasswordUseCase)
export const gymProfileController = new GymProfileController(getGymProfileUseCase, updateGymProfileUseCase, updateGymLogoUseCase, s3Service);
export const superAdminProfileController = new SuperAdminProfileController(getSuperAdminProfileUseCase,updateSuperAdminProfileUseCase,updateSuperAdminLogoUseCase); 