import { AxiosInstance } from 'axios';
import { ILedgerPeriod } from './ledger-period.interface';
export declare class LedgerService {
    private readonly axios;
    private static readonly ENTITY;
    private static readonly CREDITS_USAGE_THIS_MONTH;
    private static readonly CREDITS_USAGE_BY_MONTH;
    constructor(axios: AxiosInstance);
    /**
     * Retrieves the credits usage by month.
     * @returns A Promise that resolves to an array of ledger periods.
     */
    creditsUsageByMonth(): Promise<ILedgerPeriod[]>;
    /**
     * Retrieves the credits usage for the current month.
     * @returns A Promise that resolves to the ledger period for the current month.
     */
    creditsUsageThisMonth(): Promise<ILedgerPeriod>;
}
