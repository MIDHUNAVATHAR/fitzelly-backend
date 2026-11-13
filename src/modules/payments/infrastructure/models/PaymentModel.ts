import mongoose from 'mongoose';
import { IPayment } from "../../../../shared/database/mongoose/types/IPayment";
import paymentSchema from "../../../../shared/database/mongoose/schemas/PaymentSchema";

export const PaymentModel = mongoose.model<IPayment>('Payment', paymentSchema);