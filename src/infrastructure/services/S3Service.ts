import { IS3Service, IS3UploadFile } from "../../domain/services/IS3Service";
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { logger } from "../logger/logger";
import { ServiceUnavailableError } from "../../domain/errors/ServiceUnavailableError";


export class S3Service implements IS3Service {
    private _s3: S3Client | null = null;
    private _bucketName: string = '';
    private _region: string = '';

    private getClient(): S3Client {
        if (!this._s3) {
            this._region = process.env.AWS_REGION!;
            this._bucketName = process.env.AWS_BUCKET_NAME!;

            this._s3 = new S3Client({
                region: this._region,
                credentials: {
                    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
                    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
                }
            });
        }
        return this._s3;
    }

    async uploadFile(file: IS3UploadFile, folder = "gym-logos"): Promise<string> {
        try {
            const client = this.getClient();

            const fileName = `${folder}/${Date.now()}-${file.originalname}`;
            const isAttachment = folder === "chat-attachments";

            const command = new PutObjectCommand({
                Bucket: this._bucketName,
                Key: fileName,
                Body: file.buffer,
                ContentType: file.mimetype,
                ContentDisposition: isAttachment ? `attachment; filename="${file.originalname}"` : undefined
            });

            await client.send(command);

            return `https://${this._bucketName}.s3.${this._region}.amazonaws.com/${fileName}`;
        } catch (error) {
            logger.error("S3 UPLOAD ERROR:", error);
            throw new ServiceUnavailableError("File Storage");
        }
    }

    async deleteFile(fileUrl: string): Promise<void> {
        const client = this.getClient();

        // Extract key from URL
        const key = fileUrl.split(".amazonaws.com/")[1];

        const command = new DeleteObjectCommand({
            Bucket: this._bucketName,
            Key: key,
        });

        await client.send(command);
    }

}
