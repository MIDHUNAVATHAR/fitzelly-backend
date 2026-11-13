import { OtpRepository } from "./infrastructure/repositories/OtpRepository";
import { SessionRepository } from "./infrastructure/repositories/SessionRepository";

import { InitiateSignupUseCase } from "./application/use-cases/InitiateSignupUseCase";
import { CompleteSignupUseCase } from "./application/use-cases/CompleteSignupUseCase";
import { GymLoginUseCase } from "./application/use-cases/GymLoginUseCase";
import { GymInitiateForgotpassUseCase } from "./application/use-cases/GymInitiateForgotpassUseCase";
import { GymCompleteForgotpassUseCase } from "./application/use-cases/GymCompleteForgotpassUseCase";
import { GymResetPasswordUseCase } from "./application/use-cases/GymResetPasswordUseCase";

import { ClientLoginUseCase } from "./application/use-cases/ClientLoginUseCase";
import { ClientInitiateForgotpassUseCase } from "./application/use-cases/ClientInitiateForgotpassUseCase";
import { ClientForgotpassUseCase } from "./application/use-cases/ClientCompleteForgotpassUseCase";
import { ClientResetPasswordUseCase } from "./application/use-cases/ClientResetPasswordUseCase";

import { TrainerLoginUseCase } from "./application/use-cases/TrainerLoginUseCase";
import { TrainerInitiateForgotpassUseCase } from "./application/use-cases/TrainerInitiateForgotpassUseCase";
import { TrainerCompleteForgotpassUseCase } from "./application/use-cases/TrainerCompleteForgotpassUseCase";
import { TrainerResetPasswordUseCase } from "./application/use-cases/TrainerResetPasswordUseCase";

import { SuperAdminLoginUseCase } from "./application/use-cases/SuperAdminLoginUseCase";
import { SuperAdminInitiateForgotpassUseCase } from "./application/use-cases/SuperAdminInitiateForgotpassUseCase";
import { SuperAdminCompleteForgotpassUseCase } from "./application/use-cases/SuperAdminCompleteForgotpassUseCase";
import { SuperAdminResetPasswordUseCase } from "./application/use-cases/SuperAdminResetPasswordUseCase";

import { GoogleAuthUseCase } from "./application/use-cases/GoogleAuthUseCase";
import { InitiateGoogleAuthUseCase } from "./application/use-cases/InitiateGoogleAuthUseCase";
import { TokenRefreshUseCase } from "./application/use-cases/TokenRefreshUseCase";
import { CreatePasswordUseCase } from "./application/use-cases/CreatePasswordUseCase";
import { SendWelcomeEmailUseCase } from "./application/use-cases/SendWelcomeEmailUseCase";
import { GetActiveSessionsUseCase, RevokeSessionUseCase } from "./application/use-cases/SessionUseCases";

import { GymAuthenticationController } from "./presentation/controllers/GymAuthenticationController";
import { ClientAuthController } from "./presentation/controllers/ClientAuthController";
import { TrainerAuthController } from "./presentation/controllers/TrainerAuthController";
import { SuperAdminAuthenticationController } from "./presentation/controllers/SuperAdminAuthenticationController";
import { GoogleAuthController } from "./presentation/controllers/GoogleAuthController";
import { TokenRefreshController } from "./presentation/controllers/TokenRefreshController";
import { InviteController } from "./presentation/controllers/InviteController";
import { SecurityController } from "./presentation/controllers/SecurityController";
import { createAuthRouter, AuthRouteControllers } from "./presentation/routes/auth.routes";

import { IGymRepository } from "../gyms/domain/repositories/IGymRepository";
import { IClientRepository } from "../clients/domain/repositories/IClientRepository";
import { ITrainerRepository } from "../trainers/domain/repositories/ITrainerRepository";
import { ISuperAdminRepository } from "../analytics/domain/repositories/ISuperAdminRepository";
import { ITokenService } from "./domain/services/ITokenService";
import { IPasswordHasher } from "./domain/services/IPasswordHasher";
import { IGoogleAuthService } from "./domain/services/IGoogleAuthService";
import { IEmailService } from "../../shared/services/IEmailService";

export interface AuthModuleDependencies {
    gymRepository: IGymRepository;
    clientRepository: IClientRepository;
    trainerRepository: ITrainerRepository;
    superAdminRepository: ISuperAdminRepository;
    jwtService: ITokenService;
    passwordHasher: IPasswordHasher;
    emailService: IEmailService;
    googleAuthService: IGoogleAuthService;
    sessionRepository?: SessionRepository;
    otpRepository?: OtpRepository;
}

export function initAuthModule(deps: AuthModuleDependencies) {
    const otpRepository = deps.otpRepository ?? new OtpRepository();
    const sessionRepository = deps.sessionRepository ?? new SessionRepository();

    // Use cases
    const initiateSignupUseCase = new InitiateSignupUseCase(deps.gymRepository, otpRepository, deps.emailService);
    const completeSignupUseCase = new CompleteSignupUseCase(deps.gymRepository, otpRepository, deps.passwordHasher);
    const gymLoginUseCase = new GymLoginUseCase(deps.gymRepository, deps.passwordHasher, deps.jwtService, sessionRepository);
    const gymInitiateForgotpassUseCase = new GymInitiateForgotpassUseCase(deps.gymRepository, otpRepository, deps.emailService);
    const gymCompleteForgotpassUseCase = new GymCompleteForgotpassUseCase(otpRepository);
    const gymResetPasswordUseCase = new GymResetPasswordUseCase(deps.gymRepository, deps.passwordHasher, otpRepository);

    const clientLoginUseCase = new ClientLoginUseCase(deps.clientRepository, deps.passwordHasher, deps.jwtService, sessionRepository);
    const clientInitiateForgotpassUseCase = new ClientInitiateForgotpassUseCase(deps.clientRepository, otpRepository, deps.emailService);
    const clientCompleteForgotpassUseCase = new ClientForgotpassUseCase(otpRepository);
    const clientResetPasswordUseCase = new ClientResetPasswordUseCase(deps.clientRepository, deps.passwordHasher, otpRepository);

    const trainerLoginUseCase = new TrainerLoginUseCase(deps.trainerRepository, deps.passwordHasher, deps.jwtService, sessionRepository);
    const trainerInitiateForgotpassUseCase = new TrainerInitiateForgotpassUseCase(deps.trainerRepository, otpRepository, deps.emailService);
    const trainerCompleteForgotpassUseCase = new TrainerCompleteForgotpassUseCase(otpRepository);
    const trainerResetPasswordUseCase = new TrainerResetPasswordUseCase(deps.trainerRepository, deps.passwordHasher, otpRepository);

    const superAdminLoginUseCase = new SuperAdminLoginUseCase(deps.superAdminRepository, deps.passwordHasher, deps.jwtService, sessionRepository);
    const superAdminInitiateForgotpassUseCase = new SuperAdminInitiateForgotpassUseCase(deps.superAdminRepository, otpRepository, deps.emailService);
    const superAdminCompleteForgotpassUseCase = new SuperAdminCompleteForgotpassUseCase(otpRepository);
    const superAdminResetPasswordUseCase = new SuperAdminResetPasswordUseCase(deps.superAdminRepository, otpRepository, deps.passwordHasher);

    const googleAuthUseCase = new GoogleAuthUseCase(deps.gymRepository, deps.clientRepository, deps.trainerRepository, deps.jwtService, deps.googleAuthService, sessionRepository);
    const initiateGoogleAuthUseCase = new InitiateGoogleAuthUseCase(deps.googleAuthService);
    const tokenRefreshUseCase = new TokenRefreshUseCase(deps.jwtService, deps.gymRepository, deps.superAdminRepository, deps.clientRepository, deps.trainerRepository, sessionRepository);
    const createPasswordUseCase = new CreatePasswordUseCase(deps.clientRepository, deps.trainerRepository, otpRepository, deps.passwordHasher);
    const sendWelcomeEmailUseCase = new SendWelcomeEmailUseCase(
        deps.clientRepository,
        deps.trainerRepository,
        deps.gymRepository,
        otpRepository,
        deps.emailService
    );

    const getActiveSessionsUseCase = new GetActiveSessionsUseCase(sessionRepository);
    const revokeSessionUseCase = new RevokeSessionUseCase(sessionRepository);

    // Controllers
    const gymAuthController = new GymAuthenticationController(
        initiateSignupUseCase,
        completeSignupUseCase,
        gymLoginUseCase,
        gymInitiateForgotpassUseCase,
        gymCompleteForgotpassUseCase,
        gymResetPasswordUseCase
    );

    const clientAuthController = new ClientAuthController(
        clientLoginUseCase,
        clientInitiateForgotpassUseCase,
        clientCompleteForgotpassUseCase,
        clientResetPasswordUseCase
    );

    const trainerAuthController = new TrainerAuthController(
        trainerLoginUseCase,
        trainerInitiateForgotpassUseCase,
        trainerCompleteForgotpassUseCase,
        trainerResetPasswordUseCase
    );

    const superAdminAuthController = new SuperAdminAuthenticationController(
        superAdminLoginUseCase,
        superAdminInitiateForgotpassUseCase,
        superAdminCompleteForgotpassUseCase,
        superAdminResetPasswordUseCase
    );

    const googleAuthController = new GoogleAuthController(googleAuthUseCase, initiateGoogleAuthUseCase);
    const tokenRefreshController = new TokenRefreshController(tokenRefreshUseCase, sessionRepository, deps.jwtService);
    const inviteController = new InviteController(createPasswordUseCase);
    const securityController = new SecurityController(getActiveSessionsUseCase, revokeSessionUseCase);

    const controllers: AuthRouteControllers = {
        gymAuthController,
        clientAuthController,
        trainerAuthController,
        superAdminAuthController,
        googleAuthController,
        tokenRefreshController,
        inviteController,
        securityController,
    };

    const router = createAuthRouter(controllers);

    return {
        router,
        controllers,
        repositories: {
            otpRepository,
            sessionRepository,
        },
        useCases: {
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
            googleAuthUseCase,
            initiateGoogleAuthUseCase,
            tokenRefreshUseCase,
            createPasswordUseCase,
            sendWelcomeEmailUseCase,
            getActiveSessionsUseCase,
            revokeSessionUseCase,
        },
    };
}
