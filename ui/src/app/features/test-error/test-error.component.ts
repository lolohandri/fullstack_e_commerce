import {Component, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatButton} from '@angular/material/button';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-test-error',
    imports: [
        MatButton
    ],
  templateUrl: './test-error.component.html',
  styleUrl: './test-error.component.scss'
})
export class TestErrorComponent {
    apiUrl = `${environment.baseApiUrl}/${environment.errorsController}`;
    httpClient = inject(HttpClient);
    validationErrors?: string[];

    get404Error() {
        this.httpClient.get(this.apiUrl + '/notfound').subscribe({
            next: response => console.log(response),
            error: error => console.log(error)
        });
    }
    get400Error() {
        this.httpClient.get(this.apiUrl + '/badrequest').subscribe({
            next: response => console.log(response),
            error: error => console.log(error)
        });
    }
    get401Error() {
        this.httpClient.get(this.apiUrl + '/unauthorized').subscribe({
            next: response => console.log(response),
            error: error => console.log(error)
        });
    }
    get500Error() {
        this.httpClient.get(this.apiUrl + '/internalerror').subscribe({
            next: response => console.log(response),
            error: error => console.log(error)
        });
    }
    get400ValidationError() {
        this.httpClient.post(this.apiUrl + '/validationerror', {}).subscribe({
            next: response => console.log(response),
            error: error => this.validationErrors = error
        });
    }
}
