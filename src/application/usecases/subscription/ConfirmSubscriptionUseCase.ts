import { IConfirmSubscriptionUseCase } from "../../IUseCases/subscription/IConfirmSubscriptionUseCase";
import { IPaymentService } from "../../../domain/services/IPaymentService";
import { AppError } from "../../errors/AppError";
import { HttpStatus } from "../../../constants/statusCodes.constants";

export class ConfirmSubscriptionUseCase implements IConfirmSubscriptionUseCase {
    constructor(private _paymentService: IPaymentService) {}

    async execute(sessionId: string): Promise<void> {
        const isPaid = await this._paymentService.verifyPaymentStatus(sessionId);
        if (!isPaid) {
            throw new AppError("Payment not completed", HttpStatus.BAD_REQUEST);
        }
    }
}