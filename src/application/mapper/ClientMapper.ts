import { AddClientRequestDTO, GetClientResponseDTO } from "../dtos/ClientDTO";
import { Client } from "../../domain/entities/Client";

export class ClientMapper {

    static toAddClientEntity(dto: AddClientRequestDTO) {
        return new Client(
            "",
            dto.gymId,
            dto.email,
            null,
            null,
            dto.fullName,
            dto.phoneNumber,
            dto.dateOfBirth ? new Date(dto.dateOfBirth) : null,
            dto.emergencyContact || null,
            dto.contactPerson || null,
            null,
            "Pending",
            false,
            new Date(),
            false
        )
    }

    static toGetClientResponseDTO(client: Client): GetClientResponseDTO {
        return {
            id: client.id!,
            fullName: client.fullName,
            email: client.email,
            phoneNumber: client.phoneNumber,
            membershipStatus: client.membershipStatus,
            profileUrl: client.profileUrl,
            currentPlan: client.currentPlan,
            joinedDate: client.joinedDate.toISOString(),
            dateOfBirth: client.dateOfBirth?.toISOString() ?? null,
            emergencyContact: client.emergencyContact ?? null,
            contactPerson: client.contactPerson ?? null,
            isEmailVerified:client.isEmailVerified
        }
    }
}