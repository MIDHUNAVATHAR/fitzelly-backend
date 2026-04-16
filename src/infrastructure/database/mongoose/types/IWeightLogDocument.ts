import { Document } from "mongoose";

export interface IWeightLogDocument extends Document {
    clientId: string;
    weight: number;
    height: number;
    bmi: number;
    date: Date;
}
