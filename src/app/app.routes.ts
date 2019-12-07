import { AUTH_ROUTES } from './+auth/config/auth.routes';
import { Layout2Component } from './core/layout-2/layout-2.component';
import { LayoutBlankComponent } from './core/layout-blank/layout-blank.component';
import { USER_ROUTES } from './+users/_config/users.routes';
import { HOME_ROUTES } from './+home/_config/home.routes';
import { appRouteNames } from './app.routes.names';
import { authRouteNames } from './+auth/config/auth.routes.names';
import { userRouteNames } from './+users/_config/users.routes.names';

const MENU_ITEM_TYPES = {
  HEADER: 'header',
  ROUTE: 'route',
  DIVIDER: 'divider',
  SUBMENU: 'submenu'
}

export const APP_ROUTES = [
  {
    path: '',
    component: Layout2Component,
    pathMatch: 'full',
    children: [
      { path: '', children: HOME_ROUTES },
    ]
  },
  {
    path: appRouteNames.AUTH,
    component: LayoutBlankComponent,
    children: [
      { path: authRouteNames.LOGIN, children: AUTH_ROUTES }
    ]
  },
  {
    path: appRouteNames.USERS,
    component: Layout2Component,
    children: [
      { path: '', children: USER_ROUTES }
    ]
  },
];

export const APP_MENU = [
  { type: MENU_ITEM_TYPES.HEADER, text: 'NAVIGATION' },
  // HOME
  { type: MENU_ITEM_TYPES.ROUTE, text: 'Home', uri: '/', icon: 'fas fa-home', activeUriSegment: '/' },

  // USERS
  { type: MENU_ITEM_TYPES.ROUTE, text: 'Users', icon: 'fas fa-user', uri: appRouteNames.USERS, activeUriSegment: appRouteNames.USERS }
]
