import { IFontMakerRequest } from '../services/font-maker/font-maker-request.interface';
import { IImageMakerRequest } from '../services/image-maker/image-maker-request.interface';
import { IImageFileToImageRequest } from '../services/photo-transformer/image-file-to-image-request.interface';
export interface IAbloImage {
    id: string;
    url: string;
    options?: IImageMakerRequest | IImageFileToImageRequest | IFontMakerRequest;
}
