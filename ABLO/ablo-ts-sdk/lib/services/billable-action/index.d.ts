import { AxiosInstance } from 'axios';
import { IBillableAction } from './billable-action.interface';
export declare class BillableActionService {
    private readonly axios;
    private static ENTITY;
    constructor(axios: AxiosInstance);
    getAll: () => Promise<IBillableAction[]>;
}
