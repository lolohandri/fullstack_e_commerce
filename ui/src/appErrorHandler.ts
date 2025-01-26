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
        this.toastrService.error(
            error.statusText,
            error.name
        );

        super.handleError(error);
    }
}
