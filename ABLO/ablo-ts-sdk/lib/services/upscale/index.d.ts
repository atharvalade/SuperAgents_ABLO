import { AxiosInstance } from 'axios';
export declare class UpscaleService {
    private readonly axios;
    constructor(axios: AxiosInstance);
    /**
     * Upscales an image from a given URL to a specified scale.
     * @param imageUrl - The URL of the image to be upscaled.
     * @param scale - The scale factor for upscaling the image.
     * @returns
     */
    fromUrl: (imageUrl: string, scale: number) => Promise<{
        imageUrl: string;
    }>;
    /**
     * Upscales an image file to a specified scale.
     * @param imageFile - The image file to be upscaled.
     * @param scale - The scale factor for upscaling the image.
     * @returns
     */
    fromFile: (imageFile: File, scale: number) => Promise<{
        imageUrl: string;
    }>;
}
