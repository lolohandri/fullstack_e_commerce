import {FormInputPropsType} from '../types/form-input-props.type';

export const getRegisterFormProps = (): FormInputPropsType[] => {
    return [
        {
            controlName: 'firstName',
            label: 'First name',
            placeholder: 'John',
            type: 'text',
            errorMessages: {
                required: 'First name is required',
            }
        },
        {
            controlName: 'lastName',
            label: 'Last name',
            placeholder: 'Doe',
            type: 'text',
            errorMessages: {
                required: 'Last name is required',
            }
        },
        {
            controlName: 'email',
            label: 'Email',
            placeholder: 'johndoe@example.com',
            type: 'email',
            errorMessages: {
                required: 'Email is required',
                email: 'Not a valid email address',
            }
        },
        {
            controlName: 'password',
            label: 'Password',
            placeholder: '******',
            type: 'password',
            errorMessages: {
                required: 'Password is required',
            }
        },
        {
            controlName: 'confirmPassword',
            label: 'Submit password',
            placeholder: '******',
            type: 'password',
            errorMessages: {
                required: "Confirm password is required",
                confirmedValidator: 'Passwords do not match'
            }
        }
    ];
};
