import { IImageGenerationRequest } from '../../interfaces/image-generation-request.interface';
export interface IImageUrlToImageRequest extends IImageGenerationRequest {
    imageUrl: string;
}
