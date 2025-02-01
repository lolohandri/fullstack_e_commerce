import {ApplicationConfig, ErrorHandler, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {provideToastr} from 'ngx-toastr';
import {provideAnimations} from '@angular/platform-browser/animations';
import {AppErrorHandler} from '../appErrorHandler';
import {errorInterceptor} from './core/interceptors/error.interceptor';
import {loadingInterceptor} from './core/interceptors/loading.interceptor';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({eventCoalescing: true}),
        provideRouter(routes),
        provideAnimationsAsync(),
        provideHttpClient(withInterceptors([errorInterceptor, loadingInterceptor])),
        provideAnimations(),
        provideToastr({
            closeButton: true,
            positionClass: 'toast-bottom-center',
            progressBar: true,
            timeOut: 4000,
            preventDuplicates: true,
            toastClass: 'ngx-toastr custom-toast'
        }),
        {
            provide: ErrorHandler,
            useClass: AppErrorHandler
        }
    ]
};
