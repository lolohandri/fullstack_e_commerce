import {Component, inject, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from './layout/header/header.component';
import {Product} from './shared/models/product';
import {ShopService} from './core/services/shop.service';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, HeaderComponent],
    templateUrl: './app.component.html',
    standalone: true,
    styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
    title = 'ui';
    products: Product[] = [];

    private shopService = inject(ShopService);

    ngOnInit(): void {
        this.shopService.getProducts()
            .subscribe(
                {
                    next: response => {
                        this.products = response.data
                    },
                    error: err => console.log(err.message),
                    complete: () => console.log('complete')
                }
            )
    }

}
