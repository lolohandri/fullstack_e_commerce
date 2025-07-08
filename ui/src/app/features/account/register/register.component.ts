import {Component, inject} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AccountService} from '../../../core/services/account.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {MatButton} from '@angular/material/button';
import {MatCard} from '@angular/material/card';
import {JsonPipe} from '@angular/common';
import {passwordMatchValidator} from '../../../shared/validators/password-match.validator';
import {FormInputPropsType} from '../../../shared/types/form-input-props.type';
import {getRegisterFormProps} from '../../../shared/config/register-form.config';
import {TextInputComponent} from '../../../shared/components/text-input/text-input.component';

@Component({
    selector: 'app-register',
    imports: [
        FormsModule,
        MatButton,
        MatCard,
        ReactiveFormsModule,
        JsonPipe,
        TextInputComponent
    ],
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss'
})
export class RegisterComponent {
    private formBuilder: FormBuilder = inject(FormBuilder);
    private accountService: AccountService = inject(AccountService);
    private router: Router = inject(Router);
    private toastr: ToastrService = inject(ToastrService);

    validationErrors?: string[];
    formProperties: FormInputPropsType[] = getRegisterFormProps();

    registerForm = this.formBuilder.group(
        {
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]],
            confirmPassword: ['', [Validators.required]]
        },
        {
            validators: passwordMatchValidator('password', 'confirmPassword', 'Passwords do not match')
        });

    onSubmit() {
        this.accountService.register(this.registerForm.value).subscribe({
            next: () => {
                this.toastr.success('Registered successfully!');
                this.router.navigateByUrl('/account/login');
            },
            error: errors => this.validationErrors = errors
        });
    }
}
