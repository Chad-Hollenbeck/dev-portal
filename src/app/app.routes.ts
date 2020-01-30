import { AUTH_ROUTES } from './+auth/routes/auth.routes';
import { Layout2Component } from './core/layout-2/layout-2.component';
import { LayoutBlankComponent } from './core/layout-blank/layout-blank.component';
import { USER_ROUTES } from './+users/routes/users.routes';
import { appRouteNames } from './app.routes.names';
import { authRouteNames } from './+auth/routes/auth.routes.names';
import { HOME_ROUTES } from './+home/routes/home.routes';




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
  }
];
