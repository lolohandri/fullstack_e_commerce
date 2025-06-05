import {Component, inject, signal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle
} from '@angular/material/expansion';
import {CartService} from '../../../core/services/cart.service';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-order-summary',
    imports: [
        RouterLink,
        MatButton,
        MatFormField,
        MatInput,
        MatLabel,
        MatAccordion,
        MatExpansionPanel,
        MatExpansionPanelTitle,
        MatExpansionPanelHeader,
        CurrencyPipe
    ],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.scss'
})
export class OrderSummaryComponent {
    readonly panelOpenState = signal(false);

    cartService: CartService = inject(CartService);
}
