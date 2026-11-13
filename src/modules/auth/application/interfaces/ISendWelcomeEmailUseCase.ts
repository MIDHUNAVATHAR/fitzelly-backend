
export interface ISendWelcomeEmailUseCase {
    execute(params: { userId: string; gymId: string; role: "client" | "trainer" }): Promise<void>
}
