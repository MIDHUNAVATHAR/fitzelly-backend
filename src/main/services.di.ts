/* ------------------- services (infrastructure) ---------------- */
//import { MailService } from "../infrastructure/services/MailService";
import { QueuedMailService } from "../infrastructure/services/QueuedMailService";
import { PasswordHasher } from "../infrastructure/services/PasswordHasher";
import { JwtService } from "../infrastructure/services/JwtService";
import { GoogleAuthService } from "../infrastructure/services/GoogleAuthService";
import { S3Service } from "../infrastructure/services/S3Service";
import { SocketService } from "../infrastructure/services/SocketService";
import { StripeService } from "../infrastructure/services/StripeService";



/* ------------------- Instantiate services ---------------- */
export const emailService = new QueuedMailService();
export const passwordHasher = new PasswordHasher();
export const jwtService = new JwtService();
export const googleAuthService = new GoogleAuthService();
export const s3Service = new S3Service();
export const socketService = new SocketService();
export const stripeService = new StripeService(); 
