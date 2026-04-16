export interface PlanDTO {
    id: string;
    gymId: string;
    planName: string;
    planType: 'DAY_BASED' | 'CATEGORY_BASED';
    validity: number;
    price: number;
    windowPeriod?: number;
    description?: string;
    isDeleted: boolean;
}

export interface CreatePlanDTO {
    gymId: string;
    planName: string;
    planType: 'DAY_BASED' | 'CATEGORY_BASED';
    validity: number;
    price: number;
    windowPeriod?: number;
    description?: string;
}

export interface UpdatePlanDTO {
    planName: string;
    planType: 'DAY_BASED' | 'CATEGORY_BASED';
    validity?: number;
    price?: number;
    windowPeriod?: number;
    description?: string;
}
