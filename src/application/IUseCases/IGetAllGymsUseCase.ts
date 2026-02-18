import { GymsListResponseDTO } from "../dtos/GetAllGymsDTO"


export interface IGetAllGymsUseCase {
    execute(page: number, limit: number, search: string): Promise<GymsListResponseDTO>
}