import mongoose from 'mongoose';
import { IPayment } from '../types/IPayment';
import paymentSchema from '../schemas/PaymentSchema';

export const PaymentModel = mongoose.model<IPayment>('Payment', paymentSchema);