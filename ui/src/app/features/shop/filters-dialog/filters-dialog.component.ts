import {Component, inject} from '@angular/core';
import {ShopService} from '../../../core/services/shop.service';
import {MatDivider} from '@angular/material/divider';
import {MatListOption, MatSelectionList} from '@angular/material/list';
import {MatButton} from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';

@Component({
    selector: 'app-filters-dialog',
    imports: [
        MatDivider,
        MatSelectionList,
        MatListOption,
        MatButton,
        FormsModule
    ],
    templateUrl: './filters-dialog.component.html',
    styleUrl: './filters-dialog.component.scss'
})
export class FiltersDialogComponent {
    shopService: ShopService = inject(ShopService);
    private dialogRef: MatDialogRef<any> = inject(MatDialogRef<FiltersDialogComponent>);
    data = inject(MAT_DIALOG_DATA);

    selectedBrands: string[] = this.data.selectedBrands;
    selectedTypes: string[] = this.data.selectedTypes;
    filtersCount: number | undefined;

    applyFilters(): void {
        this.dialogRef.close({
            selectedTypes: this.selectedTypes,
            selectedBrands: this.selectedBrands,
            filtersCount: this.getFiltersCount()
        });
    }

    resetFilters(): void {
        this.dialogRef.close(undefined);
    }

    private getFiltersCount(): number {
        return this.selectedTypes.length + this.selectedBrands.length;
    }
}
