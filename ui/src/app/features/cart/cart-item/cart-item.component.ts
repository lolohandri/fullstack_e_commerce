import {Component, inject, input, InputSignal} from '@angular/core';
import {CartItem} from '../../../shared/models/cart';
import {RouterLink} from '@angular/router';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {CurrencyPipe} from '@angular/common';
import {CartService} from '../../../core/services/cart.service';

@Component({
  selector: 'app-cart-item',
    imports: [
        RouterLink,
        MatIconButton,
        MatIcon,
        CurrencyPipe,
        MatButton
    ],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent {
    cartItem: InputSignal<CartItem> = input.required<CartItem>();
    cartService: CartService = inject(CartService);

    incrementQuantity(): void {
        this.cartService.addItemToCart(this.cartItem());
    }

    decrementQuantity(): void {
        this.cartService.removeItemFromCart(this.cartItem().productId);
    }

    deleteItemFromCart(): void {
        this.cartService.removeItemFromCart(this.cartItem().productId, this.cartItem().quantity);
    }
}
