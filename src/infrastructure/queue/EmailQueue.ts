import { Queue } from "bullmq";
import { redisConnection } from "../database/RedisConnection";

export const EMAIL_QUEUE_NAME = "fitzelly_email_queue";

export const emailQueue = new Queue(EMAIL_QUEUE_NAME, {
    connection: redisConnection
})

export interface EmailJobData {
    type: "OTP" | "WELCOME_INVITE",
    payload:any
}