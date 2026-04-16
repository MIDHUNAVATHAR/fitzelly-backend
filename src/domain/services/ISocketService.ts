export interface ISocketService {
    emitToGym(gymId: string, event: string, data: unknown): void;
    emitToRole(role: string, event: string, data: unknown): void;
}