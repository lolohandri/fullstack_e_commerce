import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, Subscription} from 'rxjs';
import {Product} from '../../shared/models/product';
import {Pagination} from '../../shared/models/pagination';
import {environment} from '../../../environments/environment';
import {ShopParams} from '../../shared/models/shopParams';
import {Guid} from 'guid-typescript';

@Injectable({
    providedIn: 'root'
})
export class ShopService {
    private http = inject(HttpClient);

    brands: string[] = [];
    types: string[] = [];

    getProducts(shopParams: ShopParams): Observable<Pagination<Product>> {
        let params = this.getProductHttpParams(shopParams);

        return this.http.get<Pagination<Product>>(`${environment.baseApiUrl}/api/products`, {
            headers: {
                'Content-Type': 'application/json'
            },
            params
        });
    }

    getProduct(id: Guid): Observable<Product> {
        return this.http.get<Product>(`${environment.baseApiUrl}/api/products/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    getBrands(): Subscription | undefined {
        if (this.types.length > 0) {
            return;
        }

        return this.http.get<string[]>(`${environment.baseApiUrl}/api/products/brands`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .subscribe({
                next: response => this.brands = response
            });
    }

    getTypes(): Subscription | undefined {
        if (this.types.length > 0) {
            return;
        }

        return this.http.get<string[]>(`${environment.baseApiUrl}/api/products/types`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .subscribe({
                next: response => this.types = response
            });
    }

    private getProductHttpParams(shopParams: ShopParams): HttpParams {
        let params: HttpParams = new HttpParams();

        if (shopParams.brands.length > 0) {
            params = params.append('brands', shopParams.brands.join(','));
        }
        if (shopParams.types.length > 0) {
            params = params.append('types', shopParams.types.join(','));
        }
        if (shopParams.sort !== undefined) {
            params = params.append('sort', shopParams.sort);
        }
        if (shopParams.search) {
            params = params.append('searchTerm', shopParams.search);
        }

        params = params.append('pageSize', shopParams.pageSize);
        params = params.append('pageIndex', shopParams.pageNumber);

        return params;
    }
}
