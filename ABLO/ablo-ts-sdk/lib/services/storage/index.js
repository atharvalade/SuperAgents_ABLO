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
exports.StorageService = void 0;
class StorageService {
    constructor(axios) {
        this.axios = axios;
        /**
         * Uploads an image from a base64 string to the storage service.
         * @param image - The base64 encoded image.
         * @param contentType - The content type of the image.
         * @returns A Promise that resolves to the URL of the uploaded image.
         */
        this.uploadBase64 = (image, contentType) => __awaiter(this, void 0, void 0, function* () {
            const url = yield this.getSignedUrl(contentType);
            const blob = yield fetch(image).then((res) => res.blob());
            return this.upload(url, blob, contentType);
        });
        /**
         * Uploads an image to the storage service.
         * @param image - The image to be uploaded.
         * @param contentType - The content type of the image.
         * @returns A Promise that resolves to the URL of the uploaded image.
         */
        this.uploadBlob = (image, contentType) => __awaiter(this, void 0, void 0, function* () {
            const url = yield this.getSignedUrl(contentType);
            return this.upload(url, image, contentType);
        });
        /**
         * Retrieves a signed URL for uploading an image to the storage service.
         * @param contentType - The content type of the image.
         * @returns A Promise that resolves to the signed URL.
         */
        this.getSignedUrl = (contentType) => __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.axios.post('/storage/upload', { contentType });
            return data.url;
        });
        /**
         * Uploads an image to the storage service.
         * @param url - The URL to upload the image to.
         * @param image - The image to be uploaded.
         * @param contentType - The content type of the image.
         * @returns A Promise that resolves to the URL of the uploaded image.
         */
        this.upload = (url, image, contentType) => __awaiter(this, void 0, void 0, function* () {
            yield this.axios.put(url, image, {
                headers: { 'Content-Type': contentType },
            });
            return url.split('?')[0];
        });
    }
}
exports.StorageService = StorageService;
