import {Component} from '@angular/core';
import {HeaderComponent} from './layout/header/header.component';
import {RouterOutlet} from '@angular/router';

@Component({
    selector: 'app-root',
    imports: [HeaderComponent, RouterOutlet],
    templateUrl: './app.component.html',
    standalone: true,
    styleUrl: './app.component.css'
})
export class AppComponent {
    title = 'ui';
}
