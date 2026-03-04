import { GymsListResponseDTO } from "../../dtos/superAd-gym-listing/GetAllGymsDTO"


export interface IGetAllGymsUseCase {
    execute(page: number, limit: number, search: string): Promise<GymsListResponseDTO>
}