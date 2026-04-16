import { Queue } from "bullmq";
import { redisConnection } from "../database/RedisConnection";

export const EMAIL_QUEUE_NAME = "fitzelly_email_queue";

export const emailQueue = new Queue(EMAIL_QUEUE_NAME, {
    connection: redisConnection
})

export type EmailJobData = 
  | { type: "OTP"; payload: { to: string; otp: string } }
  | { type: "WELCOME_INVITE"; payload: { email: string; inviteLink: string; gymName: string; userName: string } }
  | { type: "MEMBERSHIP_REMINDER"; payload: { to: string; clientName: string; expiryDate: string; planName: string } }
  | { type: "MEMBERSHIP_EXPIRED"; payload: { to: string; clientName: string; planName: string } };