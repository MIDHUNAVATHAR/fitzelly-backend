import { Enquiry } from "../../domain/entities/Enquiry";
import { IEnquiryRepository } from "../../domain/repositories/IEnquiryRepository";
import { EnquiryModel } from "../database/mongoose/models/EnquiryModel";
import { IEnquiryDocument } from "../database/mongoose/types/IEnquiryDocument";
import { BaseRepository } from "./BaseRepository";
import { EnquiryMapper } from "../mapper/EnquiryMapper";


export class EnquiryRepository extends BaseRepository<Enquiry, IEnquiryDocument> implements IEnquiryRepository {
    constructor() {
        super(EnquiryModel);
    }

    protected toEntity(doc: IEnquiryDocument): Enquiry {
        return EnquiryMapper.toEntity(doc);
    }

    protected toDocument(entity: Enquiry): Partial<IEnquiryDocument> {
        return EnquiryMapper.toDocument(entity);
    }

    async getEnquiriesByGymId(
        gymId: string,
        skip: number,
        limit: number,
        search?: string,
        startDate?: Date,
        endDate?: Date
    ): Promise<{ enquiries: Enquiry[]; totalCount: number }> {
        
       const query = {
            gymId,
            isDeleted: false,
            ...(search && {
                $or: [
                    { fullName: { $regex: search, $options: "i" } },
                    { phoneNumber: { $regex: search, $options: "i" } },
                    { email: { $regex: search, $options: "i" } }
                ]
            }),
            ...((startDate || endDate) ? {
                date: {
                    ...(startDate && { $gte: new Date(new Date(startDate).setHours(0, 0, 0, 0)) }),
                    ...(endDate && { $lte: new Date(new Date(endDate).setHours(23, 59, 59, 999)) })
                }
            } : {})
        };


        const [docs, totalCount] = await Promise.all([
            this.model.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).exec(),
            this.model.countDocuments(query).exec()
        ]);

        return {
            enquiries: docs.map(doc => this.toEntity(doc)),
            totalCount
        };
    }

    async deleteEnquiry(id: string): Promise<boolean> {
        const result = await this.model.findByIdAndUpdate(id, { $set: { isDeleted: true } });
        return !!result;
    }
}


