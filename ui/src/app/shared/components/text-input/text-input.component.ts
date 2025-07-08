import {Component, Input, Self} from '@angular/core';
import {ControlValueAccessor, FormControl, NgControl, ReactiveFormsModule} from '@angular/forms';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-text-input',
    imports: [
        MatError,
        MatFormField,
        MatInput,
        MatLabel,
        ReactiveFormsModule
    ],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss'
})
export class TextInputComponent implements ControlValueAccessor {
    @Input() label: string = "";
    @Input() placeholder: string = "";
    @Input() type: string = "text";
    @Input() errorMessages?: { [key: string]: string };

    constructor(@Self() public controlDir: NgControl) {
        this.controlDir.valueAccessor = this;
    }

    writeValue(obj: any): void { }
    registerOnChange(fn: any): void { }
    registerOnTouched(fn: any): void { }

    get control() {
        return this.controlDir.control as FormControl;
    }

    get errorToShow(): string | null {
        if (!this.control || !(this.control.dirty || this.control.touched)) return null;

        for (const key of Object.keys(this.errorMessages || {})) {
            if (this.control.hasError(key)) return this.errorMessages?.[key] ?? null;
        }
        return null;
    }
}
