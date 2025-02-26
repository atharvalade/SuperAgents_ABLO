export interface IInpaintingRequest {
    imageUrl: string;
    maskUrl: string;
    numPixelsToGrowMask: number;
    numSamples: number;
    prompt: string;
}
