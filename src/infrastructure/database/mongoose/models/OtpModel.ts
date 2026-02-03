import { model } from "mongoose";
import { OtpSchema } from "../schemas/OtpSchema";
import { IOtpDocument } from "../types/IOtpDocument";

export const OtpModel = model<IOtpDocument>("Otp", OtpSchema)