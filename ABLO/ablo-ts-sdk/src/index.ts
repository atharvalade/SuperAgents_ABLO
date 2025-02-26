import { IAbloOptions } from './interfaces/ablo-options.interface'
import axios, { AxiosInstance } from 'axios'
import { StorageService } from './services/storage'
import { FontMakerService } from './services/font-maker'
import { ImageMakerService } from './services/image-maker'
import { PhotoTransformerService } from './services/photo-transformer'
import { UpscaleService } from './services/upscale'
import { BackgroundRemoverService } from './services/background-removal'
import { StyleService } from './services/style'
import { LedgerService } from './services/ledger'
import { BillableActionService } from './services/billable-action'

export class Ablo {
  private axios: AxiosInstance

  public readonly billableActions: BillableActionService
  public readonly storage: StorageService
  public readonly photoTransformer: PhotoTransformerService
  public readonly imageMaker: ImageMakerService
  public readonly fontMaker: FontMakerService
  public readonly upscale: UpscaleService
  public readonly removeBackground: BackgroundRemoverService
  public readonly styles: StyleService
  public readonly ledger: LedgerService

  constructor(apiKey: string, options: IAbloOptions = {}) {
    this.axios = axios.create({
      baseURL: options.baseUrl || 'https://api.ablo.ai',
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json',
      },
    })

    this.billableActions = new BillableActionService(this.axios)
    this.storage = new StorageService(this.axios)
    this.photoTransformer = new PhotoTransformerService(
      this.axios,
      this.storage
    )
    this.imageMaker = new ImageMakerService(this.axios, this.storage)
    this.fontMaker = new FontMakerService(this.axios, this.storage)
    this.upscale = new UpscaleService(this.axios)
    this.removeBackground = new BackgroundRemoverService(this.axios)
    this.styles = new StyleService(this.axios)
    this.ledger = new LedgerService(this.axios)
  }
}

export * from './interfaces/ablo-options.interface'
export * from './interfaces/ablo-image.interface'
export * from './interfaces/image-generation-request.interface'
export * from './interfaces/image-generation-response.interface'
export * from './interfaces/single-image-generation-response.interface'
export * from './services/background-removal/background-removal-response.interface'
export * from './services/billable-action/billable-action.interface'
export * from './services/font-maker/font-maker-request.interface'
export * from './services/image-maker/image-maker-request.interface'
export * from './services/ledger/ledger-period.interface'
export * from './services/photo-transformer/image-file-to-image-request.interface'
export * from './services/photo-transformer/image-url-to-image-request.interface'
export * from './services/photo-transformer/inpainting-request.interface'
export * from './services/style/style.interface'
export * from './services/style/create-custom-style-request.interface'
