import {AbstractControl, ValidatorFn} from '@angular/forms';

export function passwordMatchValidator(controlName: string, matchingControlName: string, errorName?: string): ValidatorFn | null {
    return (abstractControl: AbstractControl) => {
        const control = abstractControl.get(controlName);
        const matchingControl = abstractControl.get(matchingControlName);

        if (matchingControl!.errors && !matchingControl!.errors?.['confirmedValidator']) {
            return null;
        }

        if (control!.value !== matchingControl!.value) {
            const error = { confirmedValidator:  errorName};
            matchingControl!.setErrors(error);
            return error;
        } else {
            matchingControl!.setErrors(null);
            return null;
        }
    }
}
