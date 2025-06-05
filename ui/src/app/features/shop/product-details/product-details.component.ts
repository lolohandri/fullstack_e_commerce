import {Component, inject, OnInit} from '@angular/core';
import {ShopService} from '../../../core/services/shop.service';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../../../shared/models/product';
import {Guid} from 'guid-typescript';
import {CurrencyPipe} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatDivider} from '@angular/material/divider';
import {CartService} from '../../../core/services/cart.service';
import {FormsModule} from '@angular/forms';

@Component({
    selector: 'app-product-details',
    imports: [
        CurrencyPipe,
        MatButton,
        MatIcon,
        MatFormField,
        MatLabel,
        MatInput,
        MatDivider,
        FormsModule
    ],
    templateUrl: './product-details.component.html',
    styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
    private shopService: ShopService = inject(ShopService);
    private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
    private cartService: CartService = inject(CartService);
    product?: Product;
    quantityInCart: number = 0;
    quantity: number = 1;

    ngOnInit(): void {
        this.loadProduct();
    }

    loadProduct(): void {
        const routeId = this.activatedRoute.snapshot.paramMap.get('id');

        if (!routeId) {
            return;
        }

        const id = Guid.parse(routeId);

        this.shopService.getProduct(id).subscribe({
            next: product => {
                this.product = product;
                this.updateQuantityInCart();
            },
            error: error => {
                throw error
            }
        })
    }

    updateCart(): void {
        if(!this.product) return;
        if(this.quantity > this.quantityInCart){
            const itemsToAdd = this.quantity - this.quantityInCart;
            this.quantityInCart += itemsToAdd;

            this.cartService.addItemToCart(this.product, itemsToAdd);
        } else{
            const itemsToRemove = this.quantityInCart - this.quantity;
            this.quantityInCart -= itemsToRemove;
            this.cartService.removeItemFromCart(this.product.id.toString(), itemsToRemove);
        }

    }

    updateQuantityInCart(): void {
        this.quantityInCart = this.cartService.cart()?.cartItems.find(x => x.productId === this.product?.id.toString())?.quantity || 0;
        this.quantity = this.quantityInCart || 1;
    }

    getButtonText(): string {
        return this.quantityInCart > 0 ? 'Update cart' : 'Add to cart';
    }
}
