import { GymsListResponseDTO } from "../dtos/GetAllGymsDTO";


export interface IGetAllGymsUseCase {
    execute(page: number, limit: number, search: string, status?: string): Promise<GymsListResponseDTO>
}