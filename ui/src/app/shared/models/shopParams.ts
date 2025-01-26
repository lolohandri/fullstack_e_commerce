import {SortOption} from '../enums/sortOption';

export class ShopParams {
    brands: string[] = [];
    types: string[] = [];
    sort: SortOption | undefined;
    pageNumber: number = 1;
    pageSize: number = 10;
    search: string = '';
}
