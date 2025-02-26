import { AxiosInstance } from 'axios';
import { IBackgroundRemovalResponse } from './background-removal-response.interface';
export declare class BackgroundRemoverService {
    private readonly axios;
    constructor(axios: AxiosInstance);
    /**
     * Removes the background from an image by URL.
     * @param imageUrl - The URL of the image to remove the background from.
     * @returns
     */
    byUrl: (imageUrl: string) => Promise<IBackgroundRemovalResponse>;
    /**
     * Removes the background from an image file.
     * @param imageFile - The image file to remove the background from.
     * @returns
     */
    byFile: (imageFile: string) => Promise<IBackgroundRemovalResponse>;
}
