import { IClientRepository } from "../../../domain/repositories/IClientRepository";
import { AddClientRequestDTO } from "../../dtos/gym-client/ClientDTO";
import { IAddClientUseCase } from "../../IUseCases/gym-client/IAddClientUseCase";
import { ConflictError, BadRequestError } from "../../errors/AppError";
import { ClientMapper } from "../../mapper/ClientMapper";
import { validateAge } from "../../utils/validation.util";

export class AddClientUseCase implements IAddClientUseCase {
    constructor(
        private _clientRepository: IClientRepository
    ) { }

    async execute(clientDate: AddClientRequestDTO): Promise<void> {
        const { fullName, email, phoneNumber, dateOfBirth } = clientDate;

        if (!fullName?.trim()) throw new BadRequestError("Full name is required");
        if (!email?.trim()) throw new BadRequestError("Email is required");
        if (!phoneNumber?.trim()) throw new BadRequestError("Phone number is required");
        if (!dateOfBirth) throw new BadRequestError("Date of birth is required");

        if (dateOfBirth) {
            const ageValidation = validateAge(dateOfBirth);
            if (!ageValidation.isValid) {
                throw new BadRequestError(ageValidation.message);
            }
        }

        const verifiedClient = await this._clientRepository.findVerifiedByEmail(email);

        if (verifiedClient) {
            throw new ConflictError("Client with this email is already exists");
        }

        const clientEntity = ClientMapper.toAddClientEntity(clientDate);
        await this._clientRepository.create(clientEntity);
    }
}