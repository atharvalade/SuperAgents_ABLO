"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ablo = void 0;
const axios_1 = require("axios");
const storage_1 = require("./services/storage");
const font_maker_1 = require("./services/font-maker");
const image_maker_1 = require("./services/image-maker");
const photo_transformer_1 = require("./services/photo-transformer");
const upscale_1 = require("./services/upscale");
const background_removal_1 = require("./services/background-removal");
const style_1 = require("./services/style");
const ledger_1 = require("./services/ledger");
const billable_action_1 = require("./services/billable-action");
class Ablo {
    constructor(apiKey, options = {}) {
        this.axios = axios_1.default.create({
            baseURL: options.baseUrl || 'https://api.ablo.ai',
            headers: {
                'x-api-key': apiKey,
                'Content-Type': 'application/json',
            },
        });
        this.billableActions = new billable_action_1.BillableActionService(this.axios);
        this.storage = new storage_1.StorageService(this.axios);
        this.photoTransformer = new photo_transformer_1.PhotoTransformerService(this.axios, this.storage);
        this.imageMaker = new image_maker_1.ImageMakerService(this.axios, this.storage);
        this.fontMaker = new font_maker_1.FontMakerService(this.axios, this.storage);
        this.upscale = new upscale_1.UpscaleService(this.axios);
        this.removeBackground = new background_removal_1.BackgroundRemoverService(this.axios);
        this.styles = new style_1.StyleService(this.axios);
        this.ledger = new ledger_1.LedgerService(this.axios);
    }
}
exports.Ablo = Ablo;
__exportStar(require("./interfaces/ablo-options.interface"), exports);
__exportStar(require("./interfaces/ablo-image.interface"), exports);
__exportStar(require("./interfaces/image-generation-request.interface"), exports);
__exportStar(require("./interfaces/image-generation-response.interface"), exports);
__exportStar(require("./interfaces/single-image-generation-response.interface"), exports);
__exportStar(require("./services/background-removal/background-removal-response.interface"), exports);
__exportStar(require("./services/billable-action/billable-action.interface"), exports);
__exportStar(require("./services/font-maker/font-maker-request.interface"), exports);
__exportStar(require("./services/image-maker/image-maker-request.interface"), exports);
__exportStar(require("./services/ledger/ledger-period.interface"), exports);
__exportStar(require("./services/photo-transformer/image-file-to-image-request.interface"), exports);
__exportStar(require("./services/photo-transformer/image-url-to-image-request.interface"), exports);
__exportStar(require("./services/photo-transformer/inpainting-request.interface"), exports);
__exportStar(require("./services/style/style.interface"), exports);
__exportStar(require("./services/style/create-custom-style-request.interface"), exports);
