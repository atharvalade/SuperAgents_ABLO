import { IAbloImage } from "./ablo-image.interface";

export interface IImageGenerationResponse {
  images: IAbloImage[];
  riskScore?: number;
  creditsRemaining?: number;
}
