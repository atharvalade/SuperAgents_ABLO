import { AxiosInstance } from 'axios'
import { StorageService } from '../storage'
import { IImageUrlToImageRequest } from './image-url-to-image-request.interface'
import { IImageFileToImageRequest } from './image-file-to-image-request.interface'
import { IImageGenerationResponse } from '../../interfaces/image-generation-response.interface'
import { IInpaintingRequest } from './inpainting-request.interface'

export class PhotoTransformerService {
  constructor(
    private readonly axios: AxiosInstance,
    private readonly storageService: StorageService
  ) {}

  /**
   * Transforms an image file to an image.
   * @param params - The parameters for the image transformation.
   * @param contentType - The content type of the image.
   * @param referenceImageContentType - The content type of the reference image.
   * @returns A Promise that resolves to the transformed image.
   */
  fromFile = async (
    params: IImageFileToImageRequest,
    contentType: string
  ): Promise<IImageGenerationResponse> => {
    // First get signed upload url
    const {
      data: { url: uploadUrl },
    } = await this.axios.post('/storage/upload', { contentType })

    // Upload image to signed url
    await this.axios.put(uploadUrl, params.imageFile, {
      headers: { 'Content-Type': contentType },
    })

    // Handle reference image
    let referenceImageUrl
    if (
      params.referenceImageFile &&
      params.referenceImageFile instanceof File
    ) {
      const referenceImageContentType = params.referenceImageFile?.type
      referenceImageUrl = await this.storageService.uploadBlob(
        params.referenceImageFile,
        referenceImageContentType
      )
      delete params.referenceImageFile
    }

    // Run photo transformer
    const response = await this.fromUrl({
      styleId: params.styleId,
      ipAdapterScale: params.ipAdapterScale,
      samples: params.samples,
      shouldBypassCache: params.shouldBypassCache,
      imageUrl: uploadUrl.split('?')[0],
      referenceImageUrl,
    })

    return response
  }

  /**
   * Transforms an image from a URL to an image.
   * @param params - The parameters for the image transformation.
   * @returns A Promise that resolves to the transformed image.
   */
  fromUrl = async (
    params: IImageUrlToImageRequest
  ): Promise<IImageGenerationResponse> => {
    const { data } = await this.axios.post('/photo-transformer', params)

    return data
  }

  /**
   * Edits/inpaints the image based on the mask and provided prompt.
   * @param params - The parameters for the image generation.
   * @returns A Promise that resolves to the generated images.
   */
  inpaint = async (
    params: IInpaintingRequest
  ): Promise<IImageGenerationResponse> => {
    const { data } = await this.axios.post('/photo-transformer/inpaint', params)
    return data
  }
}
