import { AxiosInstance } from 'axios';
import { IFontMakerRequest } from './font-maker-request.interface';
import { IImageGenerationResponse } from '../../interfaces/image-generation-response.interface';
import { StorageService } from '../storage';
export declare class FontMakerService {
    private readonly axios;
    private readonly storageService;
    constructor(axios: AxiosInstance, storageService: StorageService);
    /**
     * Generates a FontMaker image based on the provided request.
     * @param params - The parameters for the image generation.
     * @returns A Promise that resolves to the generated Fontmaker image.
     */
    run: (params: IFontMakerRequest) => Promise<IImageGenerationResponse>;
}
