import {NavbarProps} from '../types/navbar.props';

export const getNavbarRoutes = () : NavbarProps[] => {
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
        }
    ]
}
