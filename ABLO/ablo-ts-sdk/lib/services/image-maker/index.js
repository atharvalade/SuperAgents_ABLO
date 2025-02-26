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
exports.ImageMakerService = void 0;
class ImageMakerService {
    constructor(axios, storageService) {
        this.axios = axios;
        this.storageService = storageService;
        /**
         * Generates an image based on the provided text.
         * @param params - The parameters for the image generation.
         * @returns A Promise that resolves to the generated image.
         */
        this.run = (params) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            // Handle reference image
            if (params.referenceImageFile &&
                params.referenceImageFile instanceof File) {
                const referenceImageContentType = (_a = params.referenceImageFile) === null || _a === void 0 ? void 0 : _a.type;
                params.referenceImageUrl = yield this.storageService.uploadBlob(params.referenceImageFile, referenceImageContentType);
                delete params.referenceImageFile;
            }
            const { data } = yield this.axios.post('/image-maker', params, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return data;
        });
    }
}
exports.ImageMakerService = ImageMakerService;
