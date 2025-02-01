import {HttpErrorResponse, HttpInterceptorFn, HttpStatusCode} from '@angular/common/http';
import {inject} from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';
import {catchError, throwError} from 'rxjs';
import {ToastrService} from 'ngx-toastr';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const router: Router = inject(Router);
    const toaster: ToastrService = inject(ToastrService);

    return next(req).pipe(
        catchError((err: HttpErrorResponse) => {
            if (err.status === HttpStatusCode.BadRequest) {
                if (err.error.errors) {
                    const modelStateErrors = [];
                    for (const key in err.error.errors) {
                        modelStateErrors.push(err.error.errors[key]);
                    }
                    throw modelStateErrors.flat();
                } else {
                    toaster.error(err.error.title || err.error, err.name);
                }
            }
            if (err.status === HttpStatusCode.Unauthorized) {
                toaster.error(err.error.title || err.error, err.name);
            }
            if (err.status === HttpStatusCode.NotFound) {
                router.navigateByUrl('/not-found');
            }
            if (err.status === HttpStatusCode.InternalServerError) {
                const navigationExtras: NavigationExtras = {
                    state: {
                        error: err.error
                    }
                };
                router.navigateByUrl('/server-error', navigationExtras);
            }
            return throwError(() => err);
        })
    );
};
