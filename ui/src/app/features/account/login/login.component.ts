import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { AccountService } from '../../../core/services/account.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatCard} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {FormInputPropsType} from '../../../shared/types/form-input-props.type';
import {getLoginFormProps} from '../../../shared/config/login-form.config';
import {TextInputComponent} from '../../../shared/components/text-input/text-input.component';

@Component({
  selector: 'app-login',
    imports: [
        MatCard,
        ReactiveFormsModule,
        MatButton,
        TextInputComponent
    ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
    private formBuilder = inject(FormBuilder);
    private accountService = inject(AccountService);
    private router = inject(Router);
    private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

    returnUrl = '/shop';
    formProperties: FormInputPropsType[] = getLoginFormProps();

    constructor() {
        const url = this.activatedRoute.snapshot.queryParams['returnUrl'];
        if (url){
            this.returnUrl = url;
        }
    }

    loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
    });

    onSubmit(){
        this.accountService.login(this.loginForm.value).subscribe({
           next: _ => {
               this.accountService.getUserInfo().subscribe();
               this.router.navigateByUrl(this.returnUrl);
           }
        });
    }
}
