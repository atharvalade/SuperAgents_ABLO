import { AxiosInstance } from 'axios'
import { IBillableAction } from './billable-action.interface'

export class BillableActionService {
  private static ENTITY = 'billable-actions'

  constructor(private readonly axios: AxiosInstance) {}

  getAll = async (): Promise<IBillableAction[]> => {
    const { data } = await this.axios.get<IBillableAction[]>(`/${BillableActionService.ENTITY}`)
    return data
  }
}
