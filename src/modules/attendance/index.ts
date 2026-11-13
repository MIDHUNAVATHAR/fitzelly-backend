import { AttendanceRepository } from "./infrastructure/repositories/AttendanceRepository";

import { MarkAttendenceUseCase } from "./application/use-cases/MarkAttendanceUseCase";
import { MarkManualAttendanceUseCase } from "./application/use-cases/MarkManualAttendanceUseCase";
import { GetDailyAttendanceReportUseCase } from "./application/use-cases/GetDailyAttendanceReportUseCase";
import { GetTodayAttendanceUseCase } from "./application/use-cases/GetTodayAttendanceUseCase";
import { GetYearlyAttendanceCountUseCase } from "./application/use-cases/GetYearlyAttendanceCountUseCase";

import { AttendanceController } from "./presentation/controllers/AttendanceController";
import { createAttendanceRouter } from "./presentation/routes/attendance.routes";

import { IGymRepository } from "../gyms/domain/repositories/IGymRepository";
import { IMembershipRepository } from "../memberships/domain/repositories/IMembershipRepository";
import { IClientRepository } from "../clients/domain/repositories/IClientRepository";
import { ITrainerRepository } from "../trainers/domain/repositories/ITrainerRepository";
import { ISocketService } from "../../shared/services/ISocketService";

export interface AttendanceModuleDependencies {
    gymRepository: IGymRepository;
    membershipRepository: IMembershipRepository;
    clientRepository: IClientRepository;
    trainerRepository: ITrainerRepository;
    socketService: ISocketService;
    attendanceRepository?: AttendanceRepository;
}

export function initAttendanceModule(deps: AttendanceModuleDependencies) {
    const attendanceRepository = deps.attendanceRepository ?? new AttendanceRepository();

    const markAttendanceUseCase = new MarkAttendenceUseCase(
        attendanceRepository,
        deps.gymRepository,
        deps.socketService,
        deps.membershipRepository
    );

    const markManualAttendanceUseCase = new MarkManualAttendanceUseCase(
        attendanceRepository,
        deps.socketService,
        deps.membershipRepository
    );

    const getDailyAttendanceReportUseCase = new GetDailyAttendanceReportUseCase(
        attendanceRepository,
        deps.clientRepository,
        deps.trainerRepository
    );
    const getTodayAttendanceUseCase = new GetTodayAttendanceUseCase(attendanceRepository);
    const getYearlyAttendanceCountUseCase = new GetYearlyAttendanceCountUseCase(attendanceRepository);

    const attendanceController = new AttendanceController(
        markAttendanceUseCase,
        getTodayAttendanceUseCase,
        getDailyAttendanceReportUseCase,
        markManualAttendanceUseCase,
        getYearlyAttendanceCountUseCase
    );

    const router = createAttendanceRouter({ attendanceController });

    return {
        router,
        repositories: { attendanceRepository },
        controllers: { attendanceController },
        useCases: {
            markAttendanceUseCase,
            markManualAttendanceUseCase,
            getDailyAttendanceReportUseCase,
            getTodayAttendanceUseCase,
            getYearlyAttendanceCountUseCase,
        },
    };
}
