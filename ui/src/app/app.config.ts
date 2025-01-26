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
            closeButton: true,
            positionClass: 'toast-bottom-right',
            progressBar: true,
            timeOut: 4000,
            preventDuplicates: true,
        }),
        {
            provide: ErrorHandler,
            useClass: AppErrorHandler
        }
    ]
};
