import { AxiosInstance } from 'axios';
export declare class StorageService {
    private readonly axios;
    constructor(axios: AxiosInstance);
    /**
     * Uploads an image from a base64 string to the storage service.
     * @param image - The base64 encoded image.
     * @param contentType - The content type of the image.
     * @returns A Promise that resolves to the URL of the uploaded image.
     */
    uploadBase64: (image: string, contentType: string) => Promise<string>;
    /**
     * Uploads an image to the storage service.
     * @param image - The image to be uploaded.
     * @param contentType - The content type of the image.
     * @returns A Promise that resolves to the URL of the uploaded image.
     */
    uploadBlob: (image: File | ArrayBuffer | string, contentType: string) => Promise<string>;
    /**
     * Retrieves a signed URL for uploading an image to the storage service.
     * @param contentType - The content type of the image.
     * @returns A Promise that resolves to the signed URL.
     */
    getSignedUrl: (contentType: string) => Promise<string>;
    /**
     * Uploads an image to the storage service.
     * @param url - The URL to upload the image to.
     * @param image - The image to be uploaded.
     * @param contentType - The content type of the image.
     * @returns A Promise that resolves to the URL of the uploaded image.
     */
    upload: (url: string, image: File | ArrayBuffer | string, contentType: string) => Promise<string>;
}
