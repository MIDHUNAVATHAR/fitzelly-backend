import { CreateWorkoutTemplateDTO, WorkoutTemplateResponseDTO } from "../../dtos/workout-template/WorkoutTemplateDTO";

export interface IWorkoutTemplateUseCase {
    createTemplate(data: CreateWorkoutTemplateDTO): Promise<WorkoutTemplateResponseDTO>;
    getTemplatesByTrainerId(trainerId: string): Promise<WorkoutTemplateResponseDTO[]>;
    getTemplatesByGymId(gymId: string): Promise<WorkoutTemplateResponseDTO[]>;
    deleteTemplate(id: string): Promise<boolean>;
    assignTemplateToClient(templateId: string, clientId: string, trainerId: string, gymId: string, weekStartDate: Date, notes?: string): Promise<any>;
}
