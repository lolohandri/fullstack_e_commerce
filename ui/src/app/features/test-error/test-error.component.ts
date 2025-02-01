import {Component, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-test-error',
    imports: [
        MatButton
    ],
  templateUrl: './test-error.component.html',
  styleUrl: './test-error.component.scss'
})
export class TestErrorComponent {
    baseUrl = 'http://localhost:5000/api';
    httpClient = inject(HttpClient);
    validationErrors?: string[];

    get404Error() {
        this.httpClient.get(this.baseUrl + '/errors/notfound').subscribe({
           next: response => console.log(response),
            error: error => console.log(error)
        });
    }
    get400Error() {
        this.httpClient.get(this.baseUrl + '/errors/badrequest').subscribe({
            next: response => console.log(response),
            error: error => console.log(error)
        });
    }
    get401Error() {
        this.httpClient.get(this.baseUrl + '/errors/unauthorized').subscribe({
            next: response => console.log(response),
            error: error => console.log(error)
        });
    }
    get500Error() {
        this.httpClient.get(this.baseUrl + '/errors/internalerror').subscribe({
            next: response => console.log(response),
            error: error => console.log(error)
        });
    }
    get400ValidationError() {
        this.httpClient.post(this.baseUrl + '/errors/validationerror', {}).subscribe({
            next: response => console.log(response),
            error: error => this.validationErrors = error
        });
    }
}
