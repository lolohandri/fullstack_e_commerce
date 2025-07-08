import {inject, Injectable} from '@angular/core';
import {CartService} from './cart.service';
import {forkJoin, Observable, of} from 'rxjs';
import {AccountService} from './account.service';

@Injectable({
  providedIn: 'root'
})
export class InitService {
    private cartService: CartService = inject(CartService);
    private accountService: AccountService = inject(AccountService);

    init() {
        const cartId = localStorage.getItem("cart_id");
        const cart$ = cartId ? this.cartService.getCart(cartId) : of(null);

        // const user = this.accountService.getUserInfo();

        return forkJoin({
           cart: cart$,
           // user
        });
    }
}
