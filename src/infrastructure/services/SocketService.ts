import { ISocketService } from "../../domain/services/ISocketService";
import { Server as SocketServer } from "socket.io";
import { Server as HttpServer } from "http";
import { createAdapter } from "@socket.io/redis-adapter";
import Redis from "ioredis";


export class SocketService implements ISocketService {
    private static _io: SocketServer | null = null;

    public static init(server: HttpServer): SocketServer {

        this._io = new SocketServer(server, {
            cors: {
                origin: "*", // allow all origins
                methods: ["GET", "POST"],
                credentials: true
            }
        });

        /**
         * setup redis adaptor for clustering
         */
        const pubClient = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');
        const subClient = pubClient.duplicate();

        this._io.adapter(createAdapter(pubClient, subClient));

        console.log("Socket.io Redis Adapter initialized");


        
        this._io.on("connection", (socket) => {
            console.log("A user connected:", socket.id);

            socket.on("join", (room: string) => {
                socket.join(room);
                console.log(`User ${socket.id} joined room: ${room}`);
            });

            socket.on("disconnect", () => {
                console.log(`User ${socket.id} disconnected`);
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
            console.log(`Emitting event "${event}" to room "gym_${gymId}"`);
            SocketService._io.to(`gym_${gymId}`).emit(event, data);
        }
    }

    public emitToRole(role: string, event: string, data: unknown): void {
        if (SocketService._io) {
            console.log(`Emitting event "${event}" to rooms "role_${role}" and "${role}"`);
            SocketService._io.to(`role_${role}`).to(role).emit(event, data);
        }
    }
}




