import {Component, inject} from '@angular/core';
import {MatBadge} from '@angular/material/badge';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {NavbarPropsType} from '../../shared/types/navbar-props.type';
import {getNavbarRoutes} from '../../shared/config/navbar.config';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {BusyService} from '../../core/services/busy.service';
import {MatProgressBar} from '@angular/material/progress-bar';
import {CartService} from '../../core/services/cart.service';
import {AccountService} from '../../core/services/account.service';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatDivider} from '@angular/material/divider';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        MatBadge,
        MatIcon,
        MatButton,
        RouterLink,
        RouterLinkActive,
        MatProgressBar,
        MatMenuTrigger,
        MatMenu,
        MatMenuItem,
        MatDivider
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
    private router: Router= inject(Router);

    navbarProps: NavbarPropsType[] = getNavbarRoutes();
    busyService: BusyService = inject(BusyService);
    cartService: CartService = inject(CartService);
    accountService: AccountService = inject(AccountService);

    logout(){
        this.accountService.logout().subscribe({
            next: () => {
                this.accountService.currentUser.set(null);
                this.router.navigateByUrl('/');
            }
        })
    }
}
