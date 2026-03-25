import { ISocketService } from "../../domain/services/ISocketService";
import { Server as SocketServer } from "socket.io";
import { Server as HttpServer } from "http";

export class SocketService implements ISocketService {
    private static _io: SocketServer | null = null;

    public static init(server: HttpServer): SocketServer {

        this._io = new SocketServer(server, {
            cors: {
                origin: (origin, callback) => {
                    // Allow all ngrok-free.dev subdomains and local origins
                    if (!origin || origin.includes("localhost") || origin.includes("ngrok-free.dev")) {
                        callback(null, true);
                    } else {
                        callback(new Error("Not allowed by CORS"));
                    }
                },
                methods: ["GET", "POST"],
                credentials: true
            }
        });

        this._io.on("connection", (socket) => {
            console.log("A user connected:", socket.id);

            socket.on("join-gym", (gymId: string) => {
                socket.join(`gym_${gymId}`);
                console.log(`User joined room: gym_${gymId}`);
            });

            socket.on("disconnect", () => {
                console.log("A user disconnected");
            });
        });

        return this._io;
    }

    public static get io(): SocketServer {
        if (!this._io) {
            throw new Error("Socket.io not initialized");
        }
        return this._io;
    }

    public emitToGym(gymId: string, event: string, data: unknown): void {
        if (SocketService._io) {
            SocketService._io.to(`gym_${gymId}`).emit(event, data);
        }
    }
}




