
import { IBaseRepository } from "./IBaseRepository";
import { Enquiry } from "../entities/Enquiry";

export interface IEnquiryRepository extends IBaseRepository<Enquiry> {
    getEnquiriesByGymId(
        gymId: string,
        skip: number,
        limit: number,
        search?: string,
        startDate?: Date,
        endDate?: Date
    ): Promise<{
        enquiries: Enquiry[],
        totalCount: number
    }>;
    deleteEnquiry(id: string): Promise<boolean>;
}
