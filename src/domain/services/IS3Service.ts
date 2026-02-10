export interface IS3UploadFile {
    originalname: string;
    buffer: Buffer;
    mimetype: string;
    size?: number;
}

export interface IS3Service {
    uploadFile(file: IS3UploadFile, folder?: string): Promise<string>;
    deleteFile(fileUrl: string): Promise<void>;
}