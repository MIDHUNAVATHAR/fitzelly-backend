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
                const { type, payload } = job.data;
                console.log(`[Worker] Processing job ${job.id} of type ${type}`);

                switch (type) {
                    case "OTP":
                        await mailService.sendOtp(payload.to, payload.otp);
                        break;
                    case "WELCOME_INVITE":
                        await mailService.sendWelcomeInvite(
                            payload.email,
                            payload.inviteLink, // Fixed typo: was inviteLint
                            payload.gymName,
                            payload.userName
                        );
                        break;
                    default:
                        console.error(`[Worker] Unknown job type: ${type}`)
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