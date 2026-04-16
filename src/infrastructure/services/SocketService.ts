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

            socket.on("join", async (room: string) => {
                await socket.join(room);
                console.log(`[Socket] User ${socket.id} joined room: ${room}`);
            });

            // Messaging
            socket.on("SEND_MESSAGE", (data) => {
                const { receiverId } = data;
                console.log(`[Socket] Sending message to room 'user_${receiverId}'`);
                // Emit to the specific user's room
                socket.to(`user_${receiverId}`).emit("RECEIVE_MESSAGE", data);
            });

            // Read Receipts & Delivery Status
            socket.on("MESSAGE_DELIVERED", (data) => {
                // When user B receives user A's message, user B emits this. It routes back to user A.
                const { senderId, messageId } = data;
                socket.to(`user_${senderId}`).emit("MESSAGE_DELIVERED", { messageId });
            });

            socket.on("MESSAGE_SEEN", (data) => {
                // When user B opens the chat and sees user A's message.
                const { senderId, messageId, conversationId } = data;
                socket.to(`user_${senderId}`).emit("MESSAGE_SEEN", { messageId, conversationId });
            });

            // Typing Indicators
            socket.on("TYPING_START", (data) => {
                const { receiverId, conversationId } = data;
                socket.to(`user_${receiverId}`).emit("TYPING_START", { conversationId });
            });

            socket.on("TYPING_STOP", (data) => {
                const { receiverId, conversationId } = data;
                socket.to(`user_${receiverId}`).emit("TYPING_STOP", { conversationId });
            });

            // WebRTC Signaling
            socket.on("CALL_USER", (data) => {
                const { to, offer, from, callerName, callType } = data;
                socket.to(`user_${to}`).emit("INCOMING_CALL", { from, offer, callerName, callType });
            });

            socket.on("ANSWER_CALL", (data) => {
                const { to, answer } = data;
                socket.to(`user_${to}`).emit("CALL_ACCEPTED", { answer });
            });

            socket.on("ICE_CANDIDATE", (data) => {
                const { to, candidate } = data;
                socket.to(`user_${to}`).emit("RECEIVE_ICE_CANDIDATE", { candidate });
            });

            socket.on("END_CALL", (data) => {
                const { to } = data;
                socket.to(`user_${to}`).emit("CALL_ENDED");
            });

            socket.on("CALL_FAILED", (data) => {
                const { to, reason } = data;
                socket.to(`user_${to}`).emit("CALL_FAILED", { reason });
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




