import { Component, isDevMode } from '@angular/core';
import {Router} from '@angular/router';
import {MatCard} from '@angular/material/card';

@Component({
  selector: 'app-server-error',
    imports: [
        MatCard
    ],
  templateUrl: './server-error.component.html',
  styleUrl: './server-error.component.scss'
})
export class ServerErrorComponent {
    error?: any;
    devMode: boolean = isDevMode();

    constructor(private router: Router) {
        const navigation = this.router.getCurrentNavigation();
        console.log(navigation?.extras.state?.['error']);
        this.error = navigation?.extras.state?.['error'];
    }
}
