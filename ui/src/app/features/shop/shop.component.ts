import {Component, HostListener, inject, OnInit} from '@angular/core';
import {Product} from '../../shared/models/product';
import {ShopService} from '../../core/services/shop.service';
import {ProductItemComponent} from '../product-item/product-item.component';
import {MatDialog} from '@angular/material/dialog';
import {FiltersDialogComponent} from './filters-dialog/filters-dialog.component';
import {MatButton, MatFabButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatBadge} from '@angular/material/badge';
import {sortConfig} from '../../shared/config/sort.config';
import {SortingOptionType} from '../../shared/types/sorting-option.type';
import {MatMenu, MatMenuTrigger} from '@angular/material/menu';
import {MatListOption, MatSelectionList, MatSelectionListChange} from '@angular/material/list';
import {first} from '../../../extensions/firstElementArrayExtension';
import {ShopParams} from '../../shared/models/shopParams';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {Pagination} from '../../shared/models/pagination';
import {FormsModule} from '@angular/forms';
import {BusyService} from '../../core/services/busy.service';

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
        MatListOption,
        MatPaginator,
        MatFabButton,
        FormsModule,
        MatIconButton
    ],
    templateUrl: './shop.component.html',
    styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {
    products?: Pagination<Product>;
    filtersCount?: number;
    sortOptions: SortingOptionType[] = [];
    shopParams: ShopParams = new ShopParams();
    pageSizeOptions: number[] = [5, 10, 15, 20];
    showGoTopButton = false;

    private shopService = inject(ShopService);
    private dialogService = inject(MatDialog);
    busyService = inject(BusyService);

    ngOnInit(): void {
        this.initializeShop();
    }

    initializeShop(): void {
        this.sortOptions = sortConfig();
        this.shopService.getBrands();
        this.shopService.getTypes();
        this.getProducts();
    }

    getProducts(): void {
        this.shopService.getProducts(this.shopParams)
            .subscribe(
                {
                    next: response => {
                        this.products = response;
                    },
                    error: err => {
                        throw err;
                    }
                }
            )
    }

    onSearchChange(): void {
        console.log(this.shopParams.search);
        this.shopParams.pageNumber = 1;
        this.getProducts();
    }

    handlePageEvent(event: PageEvent): void {
        this.shopParams.pageNumber = event.pageIndex + 1;
        this.shopParams.pageSize = event.pageSize;
        this.getProducts();
    }

    onSortChange(event: MatSelectionListChange): void {
        let selectedOption: MatListOption | undefined = first(event.options);

        if (selectedOption) {
            this.shopParams.sort = selectedOption.value;
            this.shopParams.pageNumber = 1;
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
                    this.shopParams.pageNumber = 1;
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

    @HostListener('window:scroll', [])
    onScroll(): void {
        this.showGoTopButton = window.scrollY > 100;
    }

    scrollToTop(): void {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    private resetFilters(): void {
        this.shopParams.brands = [];
        this.shopParams.types = [];
        this.filtersCount = undefined;
        this.shopParams.pageNumber = 1;
    }
}
