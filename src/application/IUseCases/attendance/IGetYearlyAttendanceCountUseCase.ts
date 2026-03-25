export interface IGetYearlyAttendanceCountUseCase {
    execute(userId: string, year: number): Promise<number>;
}
