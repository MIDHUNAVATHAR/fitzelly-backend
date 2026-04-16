export interface MarkAttendanceRequestDTO {
    userId: string;
    gymId: string;
    userType: 'CLIENT' | 'TRAINER';
    action: 'CHECK_IN' | 'CHECK_OUT';
    latitude?: number;
    longitude?: number;
}

export interface AttendanceResponseDTO {
    id: string;
    userId: string;
    date: string;
    logs: {
        checkIn: string;
        checkOut?: string;
    }[];
    status: string;
    userType: string;
}

export interface DailyAttendanceReportDTO {
    userId: string;
    fullName: string;
    clientId?: string;
    checkIn?: string;
    checkOut?: string;
    status: 'PRESENT' | 'ABSENT' | 'PENDING';
    userType: 'CLIENT' | 'TRAINER';
    logs?: {
        checkIn: Date;
        checkOut?: Date;
    }[];
}

export interface MarkManualAttendanceRequestDTO {
    userId: string;
    gymId: string;
    date: string;
    status: 'PRESENT' | 'ABSENT';
    userType: 'CLIENT' | 'TRAINER';
}
