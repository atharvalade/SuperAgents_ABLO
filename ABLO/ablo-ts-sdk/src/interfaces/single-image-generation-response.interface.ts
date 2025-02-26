import { IAbloImage } from "./ablo-image.interface";

export interface ISingleImageGenerationResponse {
  image: IAbloImage;
  riskScore?: number;
  creditsRemaining?: number;
}
