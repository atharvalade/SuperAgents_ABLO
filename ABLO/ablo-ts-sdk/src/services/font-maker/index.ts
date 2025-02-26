import { AxiosInstance } from 'axios'
import { IFontMakerRequest } from './font-maker-request.interface'
import { IImageGenerationResponse } from '../../interfaces/image-generation-response.interface'
import { StorageService } from '../storage'

export class FontMakerService {
  constructor(
    private readonly axios: AxiosInstance,
    private readonly storageService: StorageService
  ) {}

  /**
   * Generates a FontMaker image based on the provided request.
   * @param params - The parameters for the image generation.
   * @returns A Promise that resolves to the generated Fontmaker image.
   */
  run = async (
    params: IFontMakerRequest
  ): Promise<IImageGenerationResponse> => {
    // Handle reference image
    if (
      params.referenceImageFile &&
      params.referenceImageFile instanceof File
    ) {
      const referenceImageContentType = params.referenceImageFile?.type
      params.referenceImageUrl = await this.storageService.uploadBlob(
        params.referenceImageFile,
        referenceImageContentType
      )
      delete params.referenceImageFile
    }
    const { data } = await this.axios.post('/fontmaker', params, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return data
  }
}
