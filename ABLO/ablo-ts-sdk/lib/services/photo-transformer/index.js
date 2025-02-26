"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhotoTransformerService = void 0;
class PhotoTransformerService {
    constructor(axios, storageService) {
        this.axios = axios;
        this.storageService = storageService;
        /**
         * Transforms an image file to an image.
         * @param params - The parameters for the image transformation.
         * @param contentType - The content type of the image.
         * @param referenceImageContentType - The content type of the reference image.
         * @returns A Promise that resolves to the transformed image.
         */
        this.fromFile = (params, contentType) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            // First get signed upload url
            const { data: { url: uploadUrl }, } = yield this.axios.post('/storage/upload', { contentType });
            // Upload image to signed url
            yield this.axios.put(uploadUrl, params.imageFile, {
                headers: { 'Content-Type': contentType },
            });
            // Handle reference image
            let referenceImageUrl;
            if (params.referenceImageFile &&
                params.referenceImageFile instanceof File) {
                const referenceImageContentType = (_a = params.referenceImageFile) === null || _a === void 0 ? void 0 : _a.type;
                referenceImageUrl = yield this.storageService.uploadBlob(params.referenceImageFile, referenceImageContentType);
                delete params.referenceImageFile;
            }
            // Run photo transformer
            const response = yield this.fromUrl({
                styleId: params.styleId,
                ipAdapterScale: params.ipAdapterScale,
                samples: params.samples,
                shouldBypassCache: params.shouldBypassCache,
                imageUrl: uploadUrl.split('?')[0],
                referenceImageUrl,
            });
            return response;
        });
        /**
         * Transforms an image from a URL to an image.
         * @param params - The parameters for the image transformation.
         * @returns A Promise that resolves to the transformed image.
         */
        this.fromUrl = (params) => __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.axios.post('/photo-transformer', params);
            return data;
        });
        /**
         * Edits/inpaints the image based on the mask and provided prompt.
         * @param params - The parameters for the image generation.
         * @returns A Promise that resolves to the generated images.
         */
        this.inpaint = (params) => __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.axios.post('/photo-transformer/inpaint', params);
            return data;
        });
    }
}
exports.PhotoTransformerService = PhotoTransformerService;
