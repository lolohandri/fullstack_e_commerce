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

@Component({
    selector: 'app-product-details',
    imports: [
        CurrencyPipe,
        MatButton,
        MatIcon,
        MatFormField,
        MatLabel,
        MatInput,
        MatDivider
    ],
    templateUrl: './product-details.component.html',
    styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
    private shopService = inject(ShopService);
    private activatedRoute = inject(ActivatedRoute);
    product?: Product;

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
            next: product => this.product = product,
            error: error => {
                throw error
            }
        })
    }
}
