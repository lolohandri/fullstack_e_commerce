import {inject, Injectable} from '@angular/core';
import {CartService} from './cart.service';
import {Observable, of} from 'rxjs';
import {Cart} from '../../shared/models/cart';

@Injectable({
  providedIn: 'root'
})
export class InitService {
    private cartService: CartService = inject(CartService);

    init(): Observable<Cart> | Observable<null>{
        const cartId = localStorage.getItem("cart_id");
        return cartId ? this.cartService.getCart(cartId)
            : of(null);
    }
}
