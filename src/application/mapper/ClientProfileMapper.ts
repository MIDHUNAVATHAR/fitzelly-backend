import { Client } from "../../domain/entities/Client";
import { ClientProfileDTO } from "../dtos/client-profile/ClientProfileDTO";


export class ClientProfileMapper {
    static toDTO(client: Client): ClientProfileDTO {
        return {
           id: client.id,
            gymId: client.gymId,
            fullName: client.fullName,
            email: client.email,
            phoneNumber: client.phoneNumber,
            emergencyContact: client.emergencyContact,
            contactPerson: client.contactPerson,
            dateOfBirth: client.dateOfBirth ? client.dateOfBirth.toISOString() : null,
            profileUrl: client.profileUrl,
            joinedDate: client.joinedDate ? client.joinedDate.toISOString() : undefined,
            isEmailVerified :client.isEmailVerified,
            height: client.height,
            weight: client.weight,
            gender: client.gender
        };
    }
}
