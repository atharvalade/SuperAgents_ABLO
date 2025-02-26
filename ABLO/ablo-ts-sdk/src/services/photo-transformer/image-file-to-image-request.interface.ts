import { IImageGenerationRequest } from "../../interfaces/image-generation-request.interface";

export interface IImageFileToImageRequest extends IImageGenerationRequest {
  imageFile: ArrayBuffer;
}
