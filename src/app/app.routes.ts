import { AUTH_ROUTES } from './+auth/routes/auth.routes';
import { Layout2Component } from './core/layout-2/layout-2.component';
import { LayoutBlankComponent } from './core/layout-blank/layout-blank.component';
import { USER_ROUTES } from './+users/routes/users.routes';
import { HOME_ROUTES } from './+home/routes/home.routes';
import { appRouteNames } from './app.routes.names';
import { authRouteNames } from './+auth/routes/auth.routes.names';
import { Projects_Routes } from './+projects/routes/projects.routes';
import { PROFILE_ROUTES } from './+profile/routes/profile.routes';


const MENU_ITEM_TYPES = {
  HEADER: 'header',
  ROUTE: 'route',
  DIVIDER: 'divider',
  SUBMENU: 'submenu'
}

export const APP_ROUTES: any = [
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
  {
    path: appRouteNames.PROJECTS,
    component: Layout2Component,
    children: [
      { path: '', children: Projects_Routes }
    ]
  },
  {
    path: appRouteNames.PROFILE,
    component: Layout2Component,
    children: [
      { path: '', children: PROFILE_ROUTES }
    ]
  }
];

export const APP_MENU = [
  { type: MENU_ITEM_TYPES.HEADER, text: 'NAVIGATION', restricted: true },

  // HOME
  { type: MENU_ITEM_TYPES.ROUTE, text: 'Home', uri: '/', icon: 'fas fa-home', activeUriSegment: '/', restricted: false },

  // USERS
  { type: MENU_ITEM_TYPES.ROUTE, text: 'Users', icon: 'fas fa-user', uri: appRouteNames.USERS, activeUriSegment: appRouteNames.USERS, restricted: true}
]
