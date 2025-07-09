import {Component, Input} from '@angular/core';
import {NgxSkeletonLoaderComponent} from 'ngx-skeleton-loader';

@Component({
    selector: 'app-shop-skeleton',
    imports: [
        NgxSkeletonLoaderComponent
    ],
    templateUrl: './shop-skeleton.component.html',
    styleUrl: './shop-skeleton.component.scss'
})
export class ShopSkeletonComponent {
    @Input() productsCount: number = 5;
}
