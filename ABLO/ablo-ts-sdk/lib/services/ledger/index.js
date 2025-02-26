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
exports.LedgerService = void 0;
class LedgerService {
    constructor(axios) {
        this.axios = axios;
    }
    /**
     * Retrieves the credits usage by month.
     * @returns A Promise that resolves to an array of ledger periods.
     */
    creditsUsageByMonth() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.axios.get(`/${LedgerService.ENTITY}/${LedgerService.CREDITS_USAGE_BY_MONTH}`);
            return data;
        });
    }
    /**
     * Retrieves the credits usage for the current month.
     * @returns A Promise that resolves to the ledger period for the current month.
     */
    creditsUsageThisMonth() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.axios.get(`/${LedgerService.ENTITY}/${LedgerService.CREDITS_USAGE_THIS_MONTH}`);
            return data;
        });
    }
}
exports.LedgerService = LedgerService;
LedgerService.ENTITY = `ledger`;
LedgerService.CREDITS_USAGE_THIS_MONTH = 'credits-usage-this-month';
LedgerService.CREDITS_USAGE_BY_MONTH = 'credits-usage-by-month';
