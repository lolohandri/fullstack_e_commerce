import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AccountService} from '../services/account.service';
import {map, of} from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
    const accountService: AccountService = inject(AccountService);
    const router: Router = inject(Router);

    if (accountService.currentUser()) {
        return of(true);
    } else {
        return accountService.getAuthState().pipe(
        map(auth => {
                if (auth.isAuthenticated) {
                    return true;
                } else {
                    router.navigate(['/account/login'], {
                        queryParams: {
                            returnUrl: state.url
                        }
                    });
                    return false;
                }
            })
        );
    }
};
