import { model } from "mongoose";
import { OtpSchema } from "../../../../shared/database/mongoose/schemas/OtpSchema";
import { IOtpDocument } from "../../../../shared/database/mongoose/types/IOtpDocument";

export const OtpModel = model<IOtpDocument>("Otp", OtpSchema);