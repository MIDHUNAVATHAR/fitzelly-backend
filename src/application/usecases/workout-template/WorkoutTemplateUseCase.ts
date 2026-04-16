import { IWorkoutTemplateUseCase } from "../../IUseCases/workout-template/IWorkoutTemplateUseCase";
import { IWorkoutTemplateRepository } from "../../../domain/repositories/IWorkoutTemplateRepository";
import { IExerciseRepository } from "../../../domain/repositories/IExerciseRepository";
import { IWorkoutPlanRepository } from "../../../domain/repositories/IWorkoutPlanRepository";
import { CreateWorkoutTemplateDTO, WorkoutTemplateResponseDTO } from "../../dtos/workout-template/WorkoutTemplateDTO";
import { WorkoutTemplate } from "../../../domain/entities/WorkoutTemplate";
import { WorkoutPlan, IDayPlan, IExercise } from "../../../domain/entities/WorkoutPlan";
import { NotFoundError } from "../../errors/AppError";

export class WorkoutTemplateUseCase implements IWorkoutTemplateUseCase {

    constructor(
        private _templateRepository: IWorkoutTemplateRepository,
        private _exerciseRepository: IExerciseRepository,
        private _workoutPlanRepository: IWorkoutPlanRepository
    ) { }

    async createTemplate(data: CreateWorkoutTemplateDTO): Promise<WorkoutTemplateResponseDTO> {
        const template = new WorkoutTemplate(
            "",
            data.gymId,
            data.trainerId,
            data.name,
            data.days
        );

        const saved = await this._templateRepository.create(template);
        return this.getTemplateById(saved.id);
    }

    async getTemplatesByTrainerId(trainerId: string): Promise<WorkoutTemplateResponseDTO[]> {
        const templates = await this._templateRepository.findByTrainerId(trainerId);
        return Promise.all(templates.map(t => this.mapToDTO(t)));
    }

    async getTemplatesByGymId(gymId: string): Promise<WorkoutTemplateResponseDTO[]> {
        const templates = await this._templateRepository.findByGymId(gymId);
        return Promise.all(templates.map(t => this.mapToDTO(t)));
    }

    async deleteTemplate(id: string): Promise<boolean> {
        return await this._templateRepository.delete(id);
    }

    async assignTemplateToClient(templateId: string, clientId: string, trainerId: string, gymId: string, weekStartDate: Date, notes?: string): Promise<WorkoutPlan> {
        const template = await this._templateRepository.findById(templateId);
        if (!template) throw new NotFoundError("Template");

        const gymExercises = await this._exerciseRepository.findByGymId(gymId);
        const exercisesMap = new Map(gymExercises.map(ex => [ex.id, ex]));

        const weeklyPlan: IDayPlan[] = template.days.map(d => {
            const exercises: IExercise[] = d.exerciseIds
                .map(id => exercisesMap.get(id))
                .filter(ex => !!ex)
                .map(ex => ({
                    id: ex!.id,
                    name: ex!.name,
                    description: ex!.instructions,
                    reps: ex!.reps,
                    sets: ex!.sets,
                    videoUrl: ex!.videoUrl
                }));

            return {
                day: d.day,
                exercises
            };
        });

        const newPlan = new WorkoutPlan(
            "",
            clientId,
            trainerId,
            gymId,
            weeklyPlan,
            weekStartDate,
            notes || `Plan from template: ${template.name}`
        );

        const existingPlan = await this._workoutPlanRepository.findByClientIdAndWeekStart(clientId, weekStartDate);
        if (existingPlan) {
            const planToUpdate = new WorkoutPlan(
                existingPlan.id,
                clientId,
                trainerId,
                gymId,
                weeklyPlan,
                weekStartDate,
                notes || `Plan from template: ${template.name} (Updated)`
            );
            return await this._workoutPlanRepository.update(planToUpdate);
        } else {
            return await this._workoutPlanRepository.save(newPlan);
        }
    }

    private async getTemplateById(id: string): Promise<WorkoutTemplateResponseDTO> {
        const template = await this._templateRepository.findById(id);
        if (!template) throw new NotFoundError("Template");
        return this.mapToDTO(template);
    }

    private async mapToDTO(t: WorkoutTemplate): Promise<WorkoutTemplateResponseDTO> {
        const allGymExercises = await this._exerciseRepository.findByGymId(t.gymId);
        const exercisesMap = new Map(allGymExercises.map(ex => [ex.id, ex]));

        return {
            id: t.id,
            gymId: t.gymId,
            trainerId: t.trainerId,
            name: t.name,
            days: t.days.map(d => ({
                day: d.day,
                exercises: d.exerciseIds
                    .map(id => exercisesMap.get(id))
                    .filter(ex => !!ex)
                    .map(ex => ({
                        id: ex!.id,
                        name: ex!.name,
                        description: ex!.instructions,
                        reps: ex!.reps,
                        sets: ex!.sets,
                        videoUrl: ex!.videoUrl
                    }))
            })),
            createdAt: t.createdAt
        };
    }
}
