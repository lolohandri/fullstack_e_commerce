import {SortOption} from '../enums/sortOption';
import {SortingOptionType} from '../types/sorting-option.type';

export const sortConfig = (): SortingOptionType[] => {
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
