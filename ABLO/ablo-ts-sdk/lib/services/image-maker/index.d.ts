import { AxiosInstance } from 'axios';
import { IImageMakerRequest } from './image-maker-request.interface';
import { IImageGenerationResponse } from '../../interfaces/image-generation-response.interface';
import { StorageService } from '../storage';
export declare class ImageMakerService {
    private readonly axios;
    private readonly storageService;
    constructor(axios: AxiosInstance, storageService: StorageService);
    /**
     * Generates an image based on the provided text.
     * @param params - The parameters for the image generation.
     * @returns A Promise that resolves to the generated image.
     */
    run: (params: IImageMakerRequest) => Promise<IImageGenerationResponse>;
}
