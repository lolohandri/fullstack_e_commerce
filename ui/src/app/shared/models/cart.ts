import {Guid} from 'guid-typescript';

export interface ICart{
    id: string;
    cartItems: CartItem[];
}

export interface CartItem {
    productId: string;
    productName: string;
    price: number;
    quantity: number;
    pictureUrl: string;
    brand: string;
    type: string;
}

export class Cart implements ICart {
    id = Guid.create().toString();
    cartItems: CartItem[] = [];
}
