import {Guid} from 'guid-typescript';

export interface Product {
    id: Guid;
    name: string;
    description: string;
    price: number;
    type: string;
    brand: string;
    quantityInStock: number;
    pictureUrl: string;
}
