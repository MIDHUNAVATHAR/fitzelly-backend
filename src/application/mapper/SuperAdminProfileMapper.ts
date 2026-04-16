
import { SuperAdmin } from "../../domain/entities/SuperAdmin";
import { SuperAdminProfileDTO } from "../dtos/superAd-profile/SuperAdminProfileDTO";

export class SuperAdminProfileMapper {
    static toDTO(superAdmin: SuperAdmin): SuperAdminProfileDTO {
        return {
            logoUrl: superAdmin.logoUrl,
            appName: superAdmin.appName,
            caption: superAdmin.caption,
            email: superAdmin.email,
            description: superAdmin.description,
            contactEmail: superAdmin.contactEmail,
            phoneNumber: superAdmin.phoneNumber,
            trialDays: superAdmin.trialDays
        }
    }
    static toEntity(superAdminData: SuperAdminProfileDTO): SuperAdmin {
        return new SuperAdmin(
            "",
            "",
            "",
            "",
            superAdminData.logoUrl,
            superAdminData.appName,
            superAdminData.caption,
            superAdminData.contactEmail,
            superAdminData.phoneNumber,
            superAdminData.description,
            superAdminData.trialDays || 28
        )
    }
}

