import {Component, inject} from '@angular/core';
import {MatBadge} from '@angular/material/badge';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {NavbarProps} from '../../shared/types/navbar.props';
import {getNavbarRoutes} from '../../shared/config/navbar.config';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {BusyService} from '../../core/services/busy.service';
import {MatProgressBar} from '@angular/material/progress-bar';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        MatBadge,
        MatIcon,
        MatButton,
        RouterLink,
        RouterLinkActive,
        MatProgressBar
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
    navbarProps: NavbarProps[] = getNavbarRoutes();
    busyService: BusyService = inject(BusyService);
}
