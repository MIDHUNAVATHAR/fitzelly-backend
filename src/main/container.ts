import { JwtService } from "../shared/services/JwtService";
import { PasswordHasher } from "../shared/services/PasswordHasher";
import { GoogleAuthService } from "../shared/services/GoogleAuthService";
import { QueuedMailService } from "../shared/services/QueuedMailService";
import { S3Service } from "../shared/services/S3Service";
import { SocketService } from "../shared/services/SocketService";
import { StripeService } from "../shared/services/StripeService";

// Shared Repositories
import { GymRepository } from "../modules/gyms/infrastructure/repositories/GymRepository";
import { ClientRepository } from "../modules/clients/infrastructure/repositories/ClientRepository";
import { TrainerRepository } from "../modules/trainers/infrastructure/repositories/TrainerRepository";
import { SuperAdminRepository } from "../modules/analytics/infrastructure/repositories/SuperAdminRepository";
import { SubscriptionRepository } from "../modules/subscriptions/infrastructure/repositories/SubscriptionRepository";
import { SubscriptionPlanRepository } from "../modules/subscriptions/infrastructure/repositories/SubscriptionPlanRepository";
import { PaymentRepository } from "../modules/payments/infrastructure/repositories/PaymentRepository";
import { MembershipRepository } from "../modules/memberships/infrastructure/repositories/MembershipRepository";
import { PlanRepository } from "../modules/memberships/infrastructure/repositories/PlanRepository";
import { OtpRepository } from "../modules/auth/infrastructure/repositories/OtpRepository";
import { SessionRepository } from "../modules/auth/infrastructure/repositories/SessionRepository";
import { NotificationRepository } from "../modules/notifications/infrastructure/repositories/NotificationRepository";

// Use cases needed across boundaries
import { SendWelcomeEmailUseCase } from "../modules/auth/application/use-cases/SendWelcomeEmailUseCase";

// Module Initializers
import { initAuthModule } from "../modules/auth";
import { initGymsModule } from "../modules/gyms";
import { initClientsModule } from "../modules/clients";
import { initTrainersModule } from "../modules/trainers";
import { initMembershipsModule } from "../modules/memberships";
import { initPaymentsModule } from "../modules/payments";
import { initEquipmentsModule } from "../modules/equipments";
import { initWorkoutsModule } from "../modules/workouts";
import { initHealthTrackingModule } from "../modules/health-tracking";
import { initAttendanceModule } from "../modules/attendance";
import { initEnquiriesModule } from "../modules/enquiries";
import { initCommunicationsModule } from "../modules/communications";
import { initNotificationsModule } from "../modules/notifications";
import { initSubscriptionsModule } from "../modules/subscriptions";
import { initAnalyticsModule } from "../modules/analytics";

export interface AppContainer {
    services: {
        jwtService: JwtService;
        passwordHasher: PasswordHasher;
        googleAuthService: GoogleAuthService;
        mailService: QueuedMailService;
        s3Service: S3Service;
        socketService: SocketService;
        paymentService: StripeService;
    };
    modules: {
        auth: ReturnType<typeof initAuthModule>;
        gyms: ReturnType<typeof initGymsModule>;
        clients: ReturnType<typeof initClientsModule>;
        trainers: ReturnType<typeof initTrainersModule>;
        memberships: ReturnType<typeof initMembershipsModule>;
        payments: ReturnType<typeof initPaymentsModule>;
        equipments: ReturnType<typeof initEquipmentsModule>;
        workouts: ReturnType<typeof initWorkoutsModule>;
        healthTracking: ReturnType<typeof initHealthTrackingModule>;
        attendance: ReturnType<typeof initAttendanceModule>;
        enquiries: ReturnType<typeof initEnquiriesModule>;
        communications: ReturnType<typeof initCommunicationsModule>;
        notifications: ReturnType<typeof initNotificationsModule>;
        subscriptions: ReturnType<typeof initSubscriptionsModule>;
        analytics: ReturnType<typeof initAnalyticsModule>;
    };
}

export function createContainer(): AppContainer {
    // 1. Shared Infrastructure Services
    const jwtService = new JwtService();
    const passwordHasher = new PasswordHasher();
    const googleAuthService = new GoogleAuthService();
    const mailService = new QueuedMailService();
    const s3Service = new S3Service();
    const socketService = new SocketService();
    const paymentService = new StripeService();

    // 2. Canonical Single Repository Instances for Cross-Domain Boundaries
    const gymRepository = new GymRepository();
    const clientRepository = new ClientRepository();
    const trainerRepository = new TrainerRepository();
    const superAdminRepository = new SuperAdminRepository();
    const subscriptionRepository = new SubscriptionRepository();
    const subscriptionPlanRepository = new SubscriptionPlanRepository();
    const paymentRepository = new PaymentRepository();
    const membershipRepository = new MembershipRepository();
    const planRepository = new PlanRepository();
    const otpRepository = new OtpRepository();
    const sessionRepository = new SessionRepository();
    const notificationRepository = new NotificationRepository();

    // 3. Shared Cross-Domain Use Cases
    const sendWelcomeEmailUseCase = new SendWelcomeEmailUseCase(
        clientRepository,
        trainerRepository,
        gymRepository,
        otpRepository,
        mailService
    );

    // 4. Notifications Module
    const notifications = initNotificationsModule({
        socketService,
        notificationRepository,
    });

    // 5. Analytics Module
    const analytics = initAnalyticsModule({
        s3Service,
        superAdminRepository,
    });

    // 6. Subscriptions Module
    const subscriptions = initSubscriptionsModule({
        paymentService,
        gymRepository,
        subscriptionRepository,
        subscriptionPlanRepository,
    });

    // 7. Payments Module
    const payments = initPaymentsModule({
        trainerRepository,
        paymentRepository,
    });

    // 8. Gyms Module
    const gyms = initGymsModule({
        s3Service,
        emailService: mailService,
        subscriptionRepository,
        superAdminRepository,
        addNotificationUseCase: notifications.useCases.addNotificationUseCase,
        gymRepository,
    });

    // 9. Memberships Module
    const memberships = initMembershipsModule({
        paymentRepository,
        clientRepository,
        trainerRepository,
        planRepository,
        membershipRepository,
    });

    // 10. Clients Module
    const clients = initClientsModule({
        gymRepository,
        trainerRepository,
        membershipRepository,
        paymentRepository,
        s3Service,
        sendWelcomeEmailUseCase,
        clientRepository,
    });

    // 11. Trainers Module
    const trainers = initTrainersModule({
        gymRepository,
        clientRepository,
        s3Service,
        sendWelcomeEmailUseCase,
        getClientByIdUseCase: clients.useCases.getClientByIdUseCase,
        trainerRepository,
    });

    // 12. Auth Module
    const auth = initAuthModule({
        gymRepository,
        clientRepository,
        trainerRepository,
        superAdminRepository,
        jwtService,
        passwordHasher,
        googleAuthService,
        emailService: mailService,
        sessionRepository,
        otpRepository,
    });

    // 13. Equipments Module
    const equipments = initEquipmentsModule({
        s3Service,
        clientRepository,
        addNotificationUseCase: notifications.useCases.addNotificationUseCase,
    });

    // 14. Workouts Module
    const workouts = initWorkoutsModule({
        trainerRepository,
    });

    // 15. Health Tracking Module
    const healthTracking = initHealthTrackingModule();

    // 16. Attendance Module
    const attendance = initAttendanceModule({
        gymRepository,
        membershipRepository,
        clientRepository,
        trainerRepository,
        socketService,
    });

    // 17. Enquiries Module
    const enquiries = initEnquiriesModule();

    // 18. Communications Module
    const communications = initCommunicationsModule({
        s3Service,
    });

    return {
        services: {
            jwtService,
            passwordHasher,
            googleAuthService,
            mailService,
            s3Service,
            socketService,
            paymentService,
        },
        modules: {
            auth,
            gyms,
            clients,
            trainers,
            memberships,
            payments,
            equipments,
            workouts,
            healthTracking,
            attendance,
            enquiries,
            communications,
            notifications,
            subscriptions,
            analytics,
        },
    };
}
