import {SortOption} from '../enums/sortOption';
import {SortingOption} from '../types/sorting.option';

export const sortConfig = (): SortingOption[] => {
    return [
        {
            name: 'Price: Low-High',
            value: SortOption.priceAsc
        },
        {
            name: 'Price: High-Low',
            value: SortOption.priceDesc
        },
        {
            name: 'Alphabetical',
            value: undefined
        }
    ];
}
