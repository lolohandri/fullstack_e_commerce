import {ErrorHandler, Inject, Injectable, Injector} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class AppErrorHandler extends ErrorHandler {

    constructor(@Inject(Injector) private injector: Injector) {
        super();
    }

    private get toastrService(): ToastrService {
        return this.injector.get(ToastrService);
    }

    public override handleError(error: any): void {
        console.error(error);
        this.toastrService.error(
            error.name,
            error.statusText
        );
    }
}
