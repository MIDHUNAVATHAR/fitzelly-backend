export interface ForgotPasswordRequestDTO {
    email: string;
}

export interface CompleteForgotPasswordRequestDTO extends ForgotPasswordRequestDTO {
    otp: string;
}

export interface ResetPasswordRequestDTO extends CompleteForgotPasswordRequestDTO {
    password: string;
}