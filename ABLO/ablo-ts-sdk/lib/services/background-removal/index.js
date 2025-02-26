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
exports.BackgroundRemoverService = void 0;
class BackgroundRemoverService {
    constructor(axios) {
        this.axios = axios;
        /**
         * Removes the background from an image by URL.
         * @param imageUrl - The URL of the image to remove the background from.
         * @returns
         */
        this.byUrl = (imageUrl) => __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.axios.post('/background-removal/remove-background-by-url', {
                imageUrl,
            });
            return { imageUrl: data.image, creditsRemaining: data.creditsRemaining };
        });
        /**
         * Removes the background from an image file.
         * @param imageFile - The image file to remove the background from.
         * @returns
         */
        this.byFile = (imageFile) => __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.axios.post('/background-removal/remove-background-by-image', {
                imageFile,
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return { imageUrl: data.image, creditsRemaining: data.creditsRemaining };
        });
    }
}
exports.BackgroundRemoverService = BackgroundRemoverService;
