import {Component, inject, OnInit} from '@angular/core';
import {Product} from '../../shared/models/product';
import {ShopService} from '../../core/services/shop.service';
import {ProductItemComponent} from '../product-item/product-item.component';
import {MatDialog} from '@angular/material/dialog';
import {FiltersDialogComponent} from './filters-dialog/filters-dialog.component';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatBadge} from '@angular/material/badge';
import {sortConfig} from '../../shared/config/sortConfig';
import {SortingOption} from '../../shared/types/sortingOption';
import {MatMenu, MatMenuTrigger} from '@angular/material/menu';
import {MatListOption, MatSelectionList, MatSelectionListChange} from '@angular/material/list';
import {first} from '../../../extensions/firstElementArrayExtension';
import {ShopParams} from '../../shared/models/shopParams';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-shop',
    imports: [
        ProductItemComponent,
        MatButton,
        MatIcon,
        MatBadge,
        MatMenuTrigger,
        MatMenu,
        MatSelectionList,
        MatListOption
    ],
    templateUrl: './shop.component.html',
    styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {
    products: Product[] = [];
    filtersCount: number | undefined;
    sortOptions: SortingOption[] = [];
    shopParams: ShopParams = new ShopParams();

    private shopService = inject(ShopService);
    private dialogService = inject(MatDialog);
    private toaster = inject(ToastrService);

    ngOnInit(): void {
        this.initializeShop();
    }

    initializeShop(): void {
        this.sortOptions = sortConfig();
        this.shopService.getBrands();
        this.shopService.getTypes();
        this.getProducts();
    }

    getProducts() : void {
        this.shopService.getProducts(this.shopParams)
            .subscribe(
                {
                    next: response => this.products = response.data,
                    error: err => console.log(err.message),
                }
            )
    }

    onSortChange(event: MatSelectionListChange): void {
        let selectedOption: MatListOption | undefined = first(event.options);

        if (selectedOption) {
            this.shopParams.sort = selectedOption.value;
            this.getProducts();
        }
    }

    openFiltersDialog(): void {
        const dialogRef = this.dialogService.open(FiltersDialogComponent, {
            width: '500px',
            data: {
                selectedBrands: this.shopParams.brands,
                selectedTypes: this.shopParams.types,
            }
        })
        dialogRef.afterClosed().subscribe({
            next: result => {
                this.resetFilters();
                if (result) {
                    this.shopParams.types = result.selectedTypes;
                    this.shopParams.brands = result.selectedBrands;
                    this.filtersCount = result.filtersCount;
                }

                this.getProducts();
            }
        })
    }

    isSelectedSort(): number | undefined {
        if (this.shopParams.sort !== undefined) {
            return 1;
        }
        return;
    }

    private resetFilters(): void {
        this.shopParams.brands = [];
        this.shopParams.types = [];
        this.filtersCount = undefined;
    }
}
