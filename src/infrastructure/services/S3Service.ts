import { IS3Service,S3UploadFile } from "../../domain/services/IS3Service";
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

export class S3Service implements IS3Service {
    private s3: S3Client | null = null;
    private bucketName: string = '';
    private region: string = '';

    private getClient(): S3Client {
        if (!this.s3) {
            this.region = process.env.AWS_REGION!;
            this.bucketName = process.env.AWS_BUCKET_NAME!;

            this.s3 = new S3Client({
                region: this.region,
                credentials: {
                    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
                    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
                }
            });
        }
        return this.s3;
    }

    async uploadFile(file: S3UploadFile, folder = "gym-logos"): Promise<string> {
        try {
            const client = this.getClient();

            const fileName = `${folder}/${Date.now()}-${file.originalname}`;

            const command = new PutObjectCommand({
                Bucket: this.bucketName,
                Key: fileName,
                Body: file.buffer,
                ContentType: file.mimetype,
            });

            await client.send(command);

            return `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${fileName}`;
        } catch (error) {
            console.error("S3 UPLOAD ERROR:", error);
            throw error;
        }
    }

    async deleteFile(fileUrl: string): Promise<void> {
        const client = this.getClient();

        // Extract key from URL
        const key = fileUrl.split(".amazonaws.com/")[1];

        const command = new DeleteObjectCommand({
            Bucket: this.bucketName,
            Key: key,
        });

        await client.send(command);
    }

}
