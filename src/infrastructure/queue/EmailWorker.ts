import { Worker, Job } from "bullmq";
import { EMAIL_QUEUE_NAME, EmailJobData } from "./EmailQueue";
import { redisConnection } from "../database/RedisConnection";
import { MailService } from "../services/MailService";


const mailService = new MailService();

export class EmailWorker {
    private worker: Worker;

    constructor() {
        this.worker = new Worker(
            EMAIL_QUEUE_NAME,
            async (job: Job<EmailJobData>) => {
                console.log(`[Worker] Processing job ${job.id} of type ${job.data.type}`);

                switch (job.data.type) {
                    case "OTP":
                        await mailService.sendOtp(job.data.payload.to, job.data.payload.otp);
                        break;
                    case "WELCOME_INVITE":
                        await mailService.sendWelcomeInvite(
                            job.data.payload.email,
                            job.data.payload.inviteLink,
                            job.data.payload.gymName,
                            job.data.payload.userName
                        );
                        break;
                    case "MEMBERSHIP_REMINDER":
                        await mailService.sendMembershipExpiryReminder(
                            job.data.payload.to,
                            job.data.payload.clientName,
                            job.data.payload.expiryDate,
                            job.data.payload.planName
                        );
                        break;
                    case "MEMBERSHIP_EXPIRED":
                        await mailService.sendMembershipExpiredNotification(
                            job.data.payload.to,
                            job.data.payload.clientName,
                            job.data.payload.planName
                        );
                        break;
                    default:
                        // @ts-expect-error - type is never here if all cases handled
                        console.error(`[Worker] Unknown job type: ${job.data.type}`)
                }

            },
            { 
                connection: redisConnection,
                concurrency: 5 // Process 5 emails at a time to improve speed
            }
        );

        this.worker.on("completed", (job) => {
            console.log(`[Worker] Job ${job.id} completed!`);
        })

        this.worker.on('failed', (job, err) => {
            console.error(`[Worker] Job ${job?.id} failed with error: ${err.message}`);
        });

        console.log(`[Worker] Email worker started and listening on ${EMAIL_QUEUE_NAME}`);

    }

    async close() {
        await this.worker.close();
    }
}