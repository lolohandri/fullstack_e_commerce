import {computed, inject, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Cart, CartItem} from '../../shared/models/cart';
import {map, Observable, Subscription} from 'rxjs';
import {Product} from '../../shared/models/product';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    baseUrl: string = environment.baseApiUrl + environment.cartController;

    private http: HttpClient = inject(HttpClient);

    cart: WritableSignal<Cart | null> = signal<Cart | null>(null);
    itemsCount: Signal<number | undefined> = computed(() => {
        return this.cart()?.cartItems.reduce((sum, item) => sum + item.quantity, 0);
    });
    totals = computed(() => {
        const cart = this.cart();
        if(!cart) {
            return null;
        }

        const subTotal = cart.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const shipping = 0;
        const discount = 0;

        return {
            subTotal,
            shipping,
            discount,
            total: subTotal + shipping - discount
        };
    });

    getCart(id: string): Observable<Cart> {
        return this.http.get<Cart>(this.baseUrl + `?cartId=${id}`)
            .pipe(
                map(cart => {
                    this.cart.set(cart);
                    return cart;
                })
            );
    }

    updateCart(cart: Cart): Subscription {
        return this.http.post<Cart>(this.baseUrl, cart)
            .subscribe({
                next: cart => this.cart.set(cart),
            });
    }

    addItemToCart(item: CartItem | Product, quantity: number = 1): void {
        const cart: Cart = this.cart() ?? this.createCart();

        if (this.isProduct(item)) {
            item = this.mapProductToCartItem(item);
        }

        cart.cartItems = this.addOrUpdateItem(cart.cartItems, item, quantity);
        this.updateCart(cart);
    }

    removeItemFromCart(id: string, quantity: number = 1) {
        const cart = this.cart();
        if(!cart) return;

        const index = cart.cartItems.findIndex(x => x.productId === id);
        if(index !== -1){
            if(cart.cartItems[index].quantity > quantity){
                cart.cartItems[index].quantity -= quantity;
            }else{
                cart.cartItems.splice(index, 1);
            }

            if(cart.cartItems.length === 0){
                this.deleteCart();
            } else {
                this.updateCart(cart);
            }
        }
    }

    private addOrUpdateItem(items: CartItem[], item: CartItem, quantity: number): CartItem[] {
        const index = items.findIndex(x => x.productId == item.productId);

        if (index === -1) {
            item.quantity = quantity;
            items.push(item);
        } else {
            items[index].quantity += quantity;
        }

        return items;
    }

    private mapProductToCartItem(item: Product): CartItem {
        return {
            productId: item.id.toString(),
            productName: item.name,
            brand: item.brand,
            pictureUrl: item.pictureUrl,
            price: item.price,
            quantity: 0,
            type: item.type
        };
    }

    private isProduct(item: CartItem | Product): item is Product {
        return (item as Product).id !== undefined;
    }

    private createCart(): Cart {
        const cart = new Cart();
        localStorage.setItem('cart_id', cart.id.toString());

        return cart;
    }

    private deleteCart() {
        this.http.delete(this.baseUrl + '?cartId=' + this.cart()?.id).subscribe({
            next: () => {
                localStorage.removeItem('cart_id');
                this.cart.set(null);
            }
        });
    }
}
