import {FormInputPropsType} from '../types/form-input-props.type';

export const getLoginFormProps = (): FormInputPropsType[] => {
    return [
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
        }
    ];
};
