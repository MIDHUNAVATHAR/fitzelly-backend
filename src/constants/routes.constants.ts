
export const GYM_ROUTE = {
    INITIATE_SIGNUP: "/api/gym/auth/signup/initiate",
    COMPLETE_SINGUP: "/api/gym/auth/signup/complete",
    LOGIN: "/api/gym/auth/login",
    INITIATE_FORGOTPASSWORD: "/api/gym/auth/forgot-password/initiate",
    COMPLETE_FORGOTPASSWORD: "/api/gym/auth/forgot-password/verify",
    RESET_PASSWORD: "/api/gym/auth/resetPassword",

    GYM_PROFILE: "/api/gym/profile",
    GYM_LOGO: "/api/gym/profile/logo",
    GYM_CERTIFICATE: "/api/gym/profile/certificate",
    DELETE_GYM_CERTIFICATE: "/api/gym/profile/certificate/delete",

    ADD_CLIENT: "/api/gym/client",
    GET_CLIENTS: "/api/gym/clients",
    CLIENT_BY_ID: "/api/gym/client/:id",
    CLIENT_INVITE: "/api/gym/client/:id/send-welcome",

    ADD_TRAINER: "/api/gym/trainer",
    GET_TRAINERS: "/api/gym/trainers",
    TRAINER_BY_ID: "/api/gym/trainers/:id",
    TRAINER_INVITE: "/api/gym/trainers/:id/send-welcome",

    ADD_PLAN: "/api/gym/plan",
    GET_PLANS: "/api/gym/plans",
    UPDATE_PLAN: "/api/gym/plan/:planId",
    DELETE_PLAN: "/api/gym/plan/:planId",

    ADD_MEMBERSHIP: "/api/gym/membership",
    GET_MEMBERSHIPS: "/api/gym/memberships",
    MEMBERSHIP_BY_ID: "/api/gym/membership/:id",

    ADD_PAYMENT: "/api/gym/membership/:membershipId/payment",
    GET_PAYMENTS: "/api/gym/payments",
    PAYMENT_BY_ID: "/api/gym/payment/:paymentId",

    ADD_EQUIPMENT: "/api/gym/equipment",
    GET_EQUIPMENTS: "/api/gym/equipments",
    EQUIPMENT_BY_ID: "/api/gym/equipment/:equipmentId",

    ADD_ENQUIRY: "/api/gym/enquiry",
    GET_ENQUIRIES: "/api/gym/enquiries",
    ENQUIRY_BY_ID: "/api/gym/enquiry/:id",

    ADD_EXPENSE: "/api/gym/expense",
    GET_EXPENSES: "/api/gym/expenses",
    EXPENSE_BY_ID: "/api/gym/expense/:id",

    ADD_TRAINER_PAYOUT: "/api/gym/trainer-payout",
    GET_TRAINER_PAYOUTS: "/api/gym/trainer-payouts",
    TRAINER_PAYOUT_BY_ID: "/api/gym/trainer-payout/:id",

    GET_ANALYTICS: "/api/gym/analytics",
    GET_DASHBOARD: "/api/gym/dashboard",

    NOTIFICATIONS_UNREAD: "/api/gym/notifications/unread",
    NOTIFICATIONS_READ: "/api/gym/notifications/read",
    MARK_NOTIFICATION_READ: "/api/gym/notifications/:id/read",
    MARK_ALL_NOTIFICATIONS_READ: "/api/gym/notifications/read-all"
}

export const CREATE_PASSWORD_ROUTE = "/api/auth/create-password";

export const REFRESH_ROUTE = {
    REFRESH: "/api/auth/refresh-token"
}

export const LOGOUT_ROUTE = {
    LOGOUT: "/api/auth/logout"
}

export const CLIENT_ROUTES = {
    LOGIN: "/api/client/auth/login",
    INITIATE_FORGOTPASSWORD: "/api/client/auth/forgot-password/initiate",
    COMPLETE_FORGOTPASSWORD: "/api/client/auth/forgot-password/verify",
    RESET_PASSWORD: "/api/client/auth/resetPassword",

    CLIENT_PROFILE: "/api/client/profile",
    CLIENT_PROFILE_IMAGE: "/api/client/profile/image",
    CLIENT_MEMBERSHIP_LATEST: "/api/client/membership/latest",
    CLIENT_GYM_DETAILS: "/api/client/gym-details",
    CLIENT_TRAINER_VIEW: "/api/client/trainer/:trainerId",
    CLIENT_WORKOUT_PLAN: "/api/client/workout-plan",
    CLIENT_WORKOUT_PROGRESS: "/api/client/workout-progress",
    CLIENT_WORKOUT_STREAK: "/api/client/workout-streak",
}

export const TRAINER_ROUTES = {
    LOGIN: "/api/trainer/auth/login",
    INITIATE_FORGOTPASSWORD: "/api/trainer/auth/forgot-password/initiate",
    COMPLETE_FORGOTPASSWORD: "/api/trainer/auth/forgot-password/verify",
    RESET_PASSWORD: "/api/trainer/auth/resetPassword",

    TRAINER_PROFILE: "/api/trainer/profile",
    TRAINER_PROFILE_IMAGE: "/api/trainer/profile/image",
    TRAINER_GYM_DETAILS: "/api/trainer/gym-details",
    TRAINER_CLIENTS: "/api/trainer/clients",
    TRAINER_CLIENT_VIEW: "/api/trainer/clients/:id",
    TRAINER_WORKOUT_PLAN: "/api/trainer/workout-plan/:clientId",

    // Workout Library & Templates
    ADD_EXERCISE: "/api/trainer/workout-library",
    GET_EXERCISES: "/api/trainer/workout-library",
    UPDATE_EXERCISE: "/api/trainer/workout-library/:id",
    DELETE_EXERCISE: "/api/trainer/workout-library/:id",

    ADD_TEMPLATE: "/api/trainer/workout-template",
    GET_TEMPLATES: "/api/trainer/workout-template",
    DELETE_TEMPLATE: "/api/trainer/workout-template/:id",
    ASSIGN_TEMPLATE: "/api/trainer/workout-template/assign",
    TRAINER_EARNINGS: "/api/trainer/earnings",
}

export const SUPER_ADMIN_ROUTES = {
    LOGIN: "/api/super-admin/auth/login",
    INITIATE_FORGOTPASSWORD: "/api/super-admin/auth/forgot-password/initiate",
    COMPLETE_FORGOTPASSWORD: "/api/super-admin/auth/forgot-password/verify",
    RESET_PASSWORD: "/api/super-admin/auth/resetPassword",

    SUPER_ADMIN_PROFILE: "/api/super-admin/profile",
    SUPER_ADMIN_LOGO: "/api/super-admin/profile/logo",
    SUPER_ADMIN_GYMS: "/api/super-admin/gyms",
    GYM_BY_ID: "/api/super-admin/gyms/:gymId",
    APPROVE_GYM: "/api/super-admin/gyms/:gymId/approve",
    WORKOUT_LIBRARY: "/api/super-admin/workout-library",
    WORKOUT_LIBRARY_BY_ID: "/api/super-admin/workout-library/:id"
}

export const GOOGLE_ROUTE = {
    INITIATE_GOOGLELOGIN: "/api/auth/google",
    GOOGLE_CALLBACK: "/api/auth/google/callback"
}

