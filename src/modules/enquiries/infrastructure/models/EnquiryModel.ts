import { model } from "mongoose";
import { EnquirySchema } from "../../../../shared/database/mongoose/schemas/EnquirySchema";
import { IEnquiryDocument } from "../../../../shared/database/mongoose/types/IEnquiryDocument";

export const EnquiryModel = model<IEnquiryDocument>("Enquiry", EnquirySchema);
