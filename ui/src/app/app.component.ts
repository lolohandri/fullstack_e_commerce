import {Component, inject, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from './layout/header/header.component';
import {HttpClient} from '@angular/common/http';
import {data} from 'autoprefixer';
import {Product} from './shared/models/product';
import {Pagination} from './shared/models/pagination';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, HeaderComponent],
    templateUrl: './app.component.html',
    standalone: true,
    styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
    title = 'ui';
    baseUrl = "http://localhost:5000/api/";
    products: Product[] = [];

    private http = inject(HttpClient);

    ngOnInit(): void {
        this.http.get<Pagination<Product>>(this.baseUrl + 'products', {
            headers: {
                "Content-Type": "application/json"
            }
        })
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
