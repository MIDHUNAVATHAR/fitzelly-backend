import { Enquiry } from "../../../domain/entities/Enquiry";
import { IEnquiryRepository } from "../../../domain/repositories/IEnquiryRepository";
import { CreateEnquiryRequestDTO, EnquiryResponseDTO, UpdateEnquiryRequestDTO } from "../../dtos/enquiry/EnquiryDTO";
import { IAddEnquiryUseCase, IDeleteEnquiryUseCase, IGetEnquiriesUseCase, IUpdateEnquiryUseCase } from "../../IUseCases/enquiry/IEnquiryUseCases";
import { NotFoundError } from "../../../domain/errors/NotFoundError";

export class AddEnquiryUseCase implements IAddEnquiryUseCase {

    constructor(private _enquiryRepository: IEnquiryRepository) { }

    async execute(gymId: string, data: CreateEnquiryRequestDTO): Promise<EnquiryResponseDTO> {
        const newEnquiry = new Enquiry("", gymId, data.fullName, data.phoneNumber, data.email || null);
        const created = await this._enquiryRepository.create(newEnquiry);
        return this.mapToDTO(created);
    }
    private mapToDTO(enquiry: Enquiry): EnquiryResponseDTO {
        return {
            id: enquiry.id,
            gymId: enquiry.gymId,
            fullName: enquiry.fullName,
            phoneNumber: enquiry.phoneNumber,
            email: enquiry.email,
            status: enquiry.status,
            date: enquiry.date.toISOString()
        };
    }
}

export class GetEnquiriesUseCase implements IGetEnquiriesUseCase {
    constructor(private _enquiryRepository: IEnquiryRepository) { }
    async execute(
        gymId: string,
        page: number,
        limit: number,
        search?: string,
        startDate?: Date,
        endDate?: Date
    ): Promise<{ enquiries: EnquiryResponseDTO[]; total: number }> {
        const skip = (page - 1) * limit;
        const { enquiries, totalCount } = await this._enquiryRepository.getEnquiriesByGymId(gymId, skip, limit, search, startDate, endDate);
        return {
            enquiries: enquiries.map(e => ({
                id: e.id,
                gymId: e.gymId,
                fullName: e.fullName,
                phoneNumber: e.phoneNumber,
                email: e.email,
                status: e.status,
                date: e.date.toISOString()
            })),
            total: totalCount
        };
    }
}

export class UpdateEnquiryUseCase implements IUpdateEnquiryUseCase {
    constructor(private _enquiryRepository: IEnquiryRepository) { }
    async execute(id: string, data: UpdateEnquiryRequestDTO): Promise<EnquiryResponseDTO> {
        const existing = await this._enquiryRepository.findById(id);
        if (!existing) throw new NotFoundError("Enquiry");

        const updated = new Enquiry(
            existing.id,
            existing.gymId,
            data.fullName || existing.fullName,
            data.phoneNumber || existing.phoneNumber,
            data.email !== undefined ? data.email : existing.email,
            data.status || existing.status,
            existing.date,
            existing.isDeleted
        );

        const saved = await this._enquiryRepository.update(updated);
        return {
            id: saved.id,
            gymId: saved.gymId,
            fullName: saved.fullName,
            phoneNumber: saved.phoneNumber,
            email: saved.email,
            status: saved.status,
            date: saved.date.toISOString()
        };
    }
}

export class DeleteEnquiryUseCase implements IDeleteEnquiryUseCase {
    constructor(private _enquiryRepository: IEnquiryRepository) { }
    async execute(id: string): Promise<boolean> {
        return await this._enquiryRepository.deleteEnquiry(id);
    }
}
