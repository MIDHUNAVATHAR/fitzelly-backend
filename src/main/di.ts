/* --------------- Repositories (infrastructure) ---------------- */
import { GymRepositoryImpl } from "../infrastructure/repositories/GymRepositoryImpl";
import { SuperAdminRepositoryImpl } from "../infrastructure/repositories/SuperAdminRepository";
import { OtpRepositoryImpl } from "../infrastructure/repositories/OtpRepositoryImpl";


/* ------------------- services (infrastructure) ---------------- */
import { MailServiceImpl } from "../infrastructure/services/MailServiceImpl"
import { PasswordHasherImpl } from "../infrastructure/services/PasswordHasherImpl";
import { JwtServiceImpl } from "../infrastructure/services/JwtServiceImpl";
import { GoogleAuthServiceImpl } from "../infrastructure/services/GoogleAuthServiceImpl";


/* ------------------- usecases (application) ---------------- */
import { InitiateSignupUseCase } from "../application/usecases/InitiateSignupUseCase";
import { CompleteSignupUseCase } from "../application/usecases/CompleteSignupUseCase";
import { GymLoginUseCase } from "../application/usecases/GymLoginUseCase";
import { SuperAdminLoginUseCase } from "../application/usecases/SuperAdminLoginUseCase";
import { TokenRefreshUseCase } from "../application/usecases/TokenRefreshUseCase";
import { GymInitiateForgotpassUseCase } from "../application/usecases/GymInitiateForgotpassUseCase";
import { SuperAdminInitiateForgotpassUseCase } from "../application/usecases/SuperAdminInitiateForgotpassUseCase";
import { GymCompleteForgotpassUseCase } from "../application/usecases/GymCompleteForgotpassUseCase";
import { SuperAdminCompleteForgotpassUseCase } from "../application/usecases/SuperAdminCompleteForgotpassUseCase";
import { GymResetPasswordUseCase } from "../application/usecases/GymResetPasswordUseCase";
import { SuperAdminResetPasswordUseCase } from "../application/usecases/SuperAdminResetPasswordUseCase";
import { InitiateGoogleAuthUseCase } from "../application/usecases/InitiateGoogleAuthUseCase";
import { GoogleAuthUseCase } from "../application/usecases/GoogleAuthUseCase";


/* ------------------- controllers (presentation) ---------------- */
import { GymAuthenticationController } from "../presentation/controller/GymAuthenticationController.ts";
import { SuperAdminAuthenticationController } from "../presentation/controller/SuperAdminAuthenticationController";
import { TokenRefreshController } from "../presentation/controller/TokenRefreshController";
import { GoogleAuthController } from "../presentation/controller/GoogleAuthController";





/* ------------------- Instantiate Repositories ---------------- */
const gymRepository = new GymRepositoryImpl();
const otpRepository = new OtpRepositoryImpl();
const superAdminRespository = new SuperAdminRepositoryImpl();


/* ------------------- Instantiate services ---------------- */
const emailService = new MailServiceImpl();
const passwordHasher = new PasswordHasherImpl();
const jwtService = new JwtServiceImpl();
const googleAuthService = new GoogleAuthServiceImpl();


/* ------------------- Instantiate usecases ---------------- */
export const initiateSignupUseCase = new InitiateSignupUseCase(gymRepository, otpRepository, emailService)
export const completeSignupUseCase = new CompleteSignupUseCase(gymRepository, otpRepository, passwordHasher)
export const gymLoginUseCase = new GymLoginUseCase(gymRepository, passwordHasher, jwtService);
export const superAdminLoginUseCase = new SuperAdminLoginUseCase(superAdminRespository, passwordHasher, jwtService)
export const tokenRefreshUseCase = new TokenRefreshUseCase(jwtService, gymRepository);
export const gymInitiateForgotpassUseCase = new GymInitiateForgotpassUseCase(gymRepository, otpRepository, emailService)
export const superAdminInitiateForgotpassUseCase = new SuperAdminInitiateForgotpassUseCase(superAdminRespository, otpRepository, emailService)
export const gymCompleteForgotpassUseCase = new GymCompleteForgotpassUseCase(otpRepository);
export const superAdminCompleteForgotpassUseCase = new SuperAdminCompleteForgotpassUseCase(otpRepository)
export const gymResetPasswordUseCase = new GymResetPasswordUseCase(gymRepository, passwordHasher, otpRepository)
export const superAdminResetPasswordUseCase = new SuperAdminResetPasswordUseCase(superAdminRespository, otpRepository, passwordHasher)
export const initiateGoogleAuthUseCase = new InitiateGoogleAuthUseCase(googleAuthService);
export const googleAuthUseCase = new GoogleAuthUseCase(gymRepository, jwtService, googleAuthService)



/* ------------------- Instantiate controllers ---------------- */
export const gymAuthenticationController = new GymAuthenticationController(initiateSignupUseCase, completeSignupUseCase, gymLoginUseCase, gymInitiateForgotpassUseCase, gymCompleteForgotpassUseCase, gymResetPasswordUseCase);
export const tokenRefreshController = new TokenRefreshController(tokenRefreshUseCase);
export const googleAuthController = new GoogleAuthController(googleAuthUseCase, initiateGoogleAuthUseCase);
export const superAdminAuthenticationController=new SuperAdminAuthenticationController(superAdminLoginUseCase,superAdminInitiateForgotpassUseCase,superAdminCompleteForgotpassUseCase,superAdminResetPasswordUseCase)