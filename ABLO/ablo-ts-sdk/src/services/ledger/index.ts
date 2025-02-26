import { AxiosInstance } from 'axios'
import { ILedgerPeriod } from './ledger-period.interface'

export class LedgerService {
  private static readonly ENTITY = `ledger`
  private static readonly CREDITS_USAGE_THIS_MONTH = 'credits-usage-this-month'
  private static readonly CREDITS_USAGE_BY_MONTH = 'credits-usage-by-month'

  constructor(private readonly axios: AxiosInstance) {}

  /**
   * Retrieves the credits usage by month.
   * @returns A Promise that resolves to an array of ledger periods.
   */
  async creditsUsageByMonth(): Promise<ILedgerPeriod[]> {
    const { data } = await this.axios.get<ILedgerPeriod[]>(
      `/${LedgerService.ENTITY}/${LedgerService.CREDITS_USAGE_BY_MONTH}`
    )
    return data
  }

  /**
   * Retrieves the credits usage for the current month.
   * @returns A Promise that resolves to the ledger period for the current month.
   */
  async creditsUsageThisMonth(): Promise<ILedgerPeriod> {
    const { data } = await this.axios.get<ILedgerPeriod>(
      `/${LedgerService.ENTITY}/${LedgerService.CREDITS_USAGE_THIS_MONTH}`
    )
    return data
  }
}
