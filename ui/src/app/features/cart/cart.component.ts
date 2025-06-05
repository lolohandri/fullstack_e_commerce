import {Component, inject} from '@angular/core';
import {CartService} from '../../core/services/cart.service';
import {CartItemComponent} from './cart-item/cart-item.component';
import {OrderSummaryComponent} from '../../shared/components/order-summary/order-summary.component';
import {MatCard} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-cart',
    imports: [
        CartItemComponent,
        OrderSummaryComponent,
        MatCard,
        MatIcon,
        MatButton,
        RouterLink
    ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
    cartService: CartService = inject(CartService);
}
