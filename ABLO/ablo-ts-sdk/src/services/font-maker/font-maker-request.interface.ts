import { IImageGenerationRequest } from '../../interfaces/image-generation-request.interface'

export interface IFontMakerRequest extends IImageGenerationRequest {
  text: string
}
