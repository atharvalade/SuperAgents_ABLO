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
exports.UpscaleService = void 0;
class UpscaleService {
    constructor(axios) {
        this.axios = axios;
        /**
         * Upscales an image from a given URL to a specified scale.
         * @param imageUrl - The URL of the image to be upscaled.
         * @param scale - The scale factor for upscaling the image.
         * @returns
         */
        this.fromUrl = (imageUrl, scale) => __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.axios.post('/upscale', {
                imageUrl,
                scale,
            });
            return { imageUrl: data.image };
        });
        /**
         * Upscales an image file to a specified scale.
         * @param imageFile - The image file to be upscaled.
         * @param scale - The scale factor for upscaling the image.
         * @returns
         */
        this.fromFile = (imageFile, scale) => __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.axios.post('/upscale/file', {
                image: imageFile,
                scale,
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return { imageUrl: data.image };
        });
    }
}
exports.UpscaleService = UpscaleService;
