import { model } from "mongoose";
import { EnquirySchema } from "../schemas/EnquirySchema";
import { IEnquiryDocument } from "../types/IEnquiryDocument";

export const EnquiryModel = model<IEnquiryDocument>("Enquiry", EnquirySchema);
