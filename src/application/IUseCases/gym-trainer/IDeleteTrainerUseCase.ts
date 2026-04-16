export interface IDeleteTrainerUseCase {
    execute(trainerId: string, gymId: string): Promise<void>
}