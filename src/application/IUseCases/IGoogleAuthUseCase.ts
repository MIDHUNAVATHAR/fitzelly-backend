export interface IGoogleAuthUseCase {
    execute(code: string, role: string, mode: "login" | "signup"):
        Promise<{ refreshToken: string }>;
}