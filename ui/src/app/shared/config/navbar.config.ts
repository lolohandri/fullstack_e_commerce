import {NavbarPropsType} from '../types/navbar-props.type';

export const getNavbarRoutes = () : NavbarPropsType[] => {
    return [
        {
            routerLink: '/',
            name: 'Home'
        },
        {
            routerLink: '/shop',
            name: 'Shop'
        },
        {
            routerLink: '/contact',
            name: 'Contact'
        },
        {
            routerLink: '/test-error',
            name: 'TestError',
        }
    ]
}
