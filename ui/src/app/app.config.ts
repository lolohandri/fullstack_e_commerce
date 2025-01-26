import {ApplicationConfig, ErrorHandler, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideHttpClient} from '@angular/common/http';
import {provideToastr} from 'ngx-toastr';
import {provideAnimations} from '@angular/platform-browser/animations';
import {AppErrorHandler} from '../appErrorHandler';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({eventCoalescing: true}),
        provideRouter(routes),
        provideAnimationsAsync(),
        provideHttpClient(),
        provideAnimations(),
        provideToastr({
            timeOut: 3000,
            positionClass: 'toast-top-center',
            preventDuplicates: true,
            closeButton: true
        }),
        {
            provide: ErrorHandler,
            useClass: AppErrorHandler
        }
    ]
};
