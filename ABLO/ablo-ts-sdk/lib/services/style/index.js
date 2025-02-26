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
exports.StyleService = void 0;
class StyleService {
    constructor(axios) {
        this.axios = axios;
        /**
         * Retrieves all custom styles.
         * @returns A Promise that resolves to an array of styles.
         */
        this.getCustom = () => __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.axios.get(`/${StyleService.ENTITY}/${StyleService.CUSTOM}`);
            return data;
        });
        /**
         * Retrieves all styles based on the provided template ID and pinned status.
         * @param templateId - Optional. The ID of the template to filter styles by.
         * @param isPinned - Optional. A boolean indicating if only pinned styles should be retrieved.
         * @returns A Promise that resolves to an array of styles.
         */
        this.getAll = (templateId, isPinned) => __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.axios.get(`/${StyleService.ENTITY}${templateId ? `?templateId=${templateId}` : ''}${isPinned ? `&isPinned=${isPinned}` : ''}`);
            return data;
        });
    }
}
exports.StyleService = StyleService;
StyleService.ENTITY = 'styles';
StyleService.CUSTOM = 'custom';
