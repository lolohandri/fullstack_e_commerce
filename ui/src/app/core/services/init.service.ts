import {inject, Injectable} from '@angular/core';
import {CartService} from './cart.service';
import {forkJoin, of, switchMap} from 'rxjs';
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

        const user$ = this.accountService.getAuthState().pipe(
            switchMap(auth => {
                if (auth.isAuthenticated) {
                    return this.accountService.getUserInfo();
                } else {
                    return of(null);
                }
            })
        );

        return forkJoin({
            cart: cart$,
            user: user$
        });
    }
}
