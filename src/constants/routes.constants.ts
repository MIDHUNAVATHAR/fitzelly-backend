
export const GYM_ROUTE = {
    INITIATE_SIGNUP: "/api/gym/auth/signup/initiate",
    COMPLETE_SINGUP: "/api/gym/auth/signup/complete",
    LOGIN: "/api/gym/auth/login",
    INITIATE_FORGOTPASSWORD: "/api/gym/auth/forgot-password/initiate",
    COMPLETE_FORGOTPASSWORD: "/api/gym/auth/forgot-password/verify",
    RESET_PASSWORD: "/api/gym/auth/resetPassword",

    GYM_PROFILE: "/api/gym/profile",
    GYM_LOGO: "/api/gym/profile/logo"
}


export const REFRESH_ROUTE = {
    REFRESH: "/api/auth/refresh-token"
}

export const SUPER_ADMIN_ROUTES = {
    LOGIN: "/api/super-admin/auth/login",
    INITIATE_FORGOTPASSWORD: "/api/super-admin/auth/forgot-password/initiate",
    COMPLETE_FORGOTPASSWORD: "/api/super-admin/auth/forgot-password/verify",
    RESET_PASSWORD: "/api/super-admin/auth/resetPassword"
}

export const GOOGLE_ROUTE = {
    INITIATE_GOOGLELOGIN: "/api/auth/google",
    GOOGLE_CALLBACK: "/api/auth/google/callback"
}