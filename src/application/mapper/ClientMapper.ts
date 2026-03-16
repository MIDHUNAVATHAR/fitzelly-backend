import { AddClientRequestDTO, GetClientResponseDTO } from "../dtos/gym-client/ClientDTO";
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
            false,
            new Date(),
            false,
            dto.clientId || null,
            dto.height || null,
            dto.weight || null,
            dto.gender || null
        )
    }

    static toGetClientResponseDTO(
        client: Client,
        membershipDetails?: {
            currentPlan: string | null;
            membershipStatus: string | null;
            planType?: 'DAY_BASED' | 'CATEGORY_BASED' | null;
            daysLeft?: number | null;
            startDate?: string | null;
            expiryDate?: string | null;
            assignedTrainer?: string | null;
            paymentStatus?: 'PAID' | 'PARTIAL' | 'UNPAID' | null;
            payments?: { date: string, amount: number }[];
        }
    ): GetClientResponseDTO {
        return {
            id: client.id!,
            fullName: client.fullName,
            email: client.email,
            phoneNumber: client.phoneNumber,
            membershipStatus: membershipDetails?.membershipStatus || null,
            profileUrl: client.profileUrl,
            currentPlan: membershipDetails?.currentPlan || null,
            planType: membershipDetails?.planType,
            daysLeft: membershipDetails?.daysLeft,
            startDate: membershipDetails?.startDate,
            expiryDate: membershipDetails?.expiryDate,
            assignedTrainer: membershipDetails?.assignedTrainer,
            paymentStatus: membershipDetails?.paymentStatus,
            payments: membershipDetails?.payments,
            joinedDate: client.joinedDate.toISOString(),
            dateOfBirth: client.dateOfBirth ? `${client.dateOfBirth.getFullYear()}-${String(client.dateOfBirth.getMonth() + 1).padStart(2, '0')}-${String(client.dateOfBirth.getDate()).padStart(2, '0')}` : null,
            emergencyContact: client.emergencyContact ?? null,
            contactPerson: client.contactPerson ?? null,
            isEmailVerified: client.isEmailVerified,
            clientId: client.clientId ?? undefined,
            height: client.height ?? undefined,
            weight: client.weight ?? undefined,
            gender: client.gender ?? undefined
        };
    }
}