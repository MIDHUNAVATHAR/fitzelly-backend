import { CreateEnquiryRequestDTO, EnquiryResponseDTO, UpdateEnquiryRequestDTO } from "../../dtos/enquiry/EnquiryDTO";

export interface IAddEnquiryUseCase {
    execute(gymId: string, data: CreateEnquiryRequestDTO): Promise<EnquiryResponseDTO>;
}

export interface IGetEnquiriesUseCase {
    execute(
        gymId: string,
        page: number,
        limit: number,
        search?: string,
        startDate?: Date,
        endDate?: Date
    ): Promise<{ enquiries: EnquiryResponseDTO[]; total: number }>;
}

export interface IUpdateEnquiryUseCase {
    execute(id: string, data: UpdateEnquiryRequestDTO): Promise<EnquiryResponseDTO>;
}

export interface IDeleteEnquiryUseCase {
    execute(id: string): Promise<boolean>;
}
