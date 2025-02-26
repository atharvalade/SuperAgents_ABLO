import { IImageGenerationRequest } from "../../interfaces/image-generation-request.interface";

export interface IImageMakerRequest extends IImageGenerationRequest {
  freeText: string;
  shouldApplyBadWordGuard?: string;
  ipInfringementErrorThreshold?: string;
}
