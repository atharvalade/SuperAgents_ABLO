import { StyleType } from './style.type';
export interface IStyle {
    description?: string;
    id: string;
    imageUrl: string;
    name: string;
    type?: StyleType;
    trainingStatus?: string;
}
