import { AUTH_ROUTES } from './+auth/routes/auth.routes';
import { Layout2Component } from './core/layout-2/layout-2.component';
import { LayoutBlankComponent } from './core/layout-blank/layout-blank.component';
import { USER_ROUTES } from './+users/routes/users.routes';
import { appRouteNames } from './app.routes.names';
import { authRouteNames } from './+auth/routes/auth.routes.names';
import { Projects_Routes } from './+projects/routes/projects.routes';
import { PROFILE_ROUTES } from './+profile/routes/profile.routes';
import { TOOLS_ROUTES } from './+tools/routes/tools.routes';




export const APP_ROUTES: any = [
  {
    path: '',
    component: Layout2Component,
    pathMatch: 'full',
    children: [
      { path: '', children: PROFILE_ROUTES },
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
    path: appRouteNames.PROFILE,
    component: Layout2Component,
    children: [
      { path: '', children: PROFILE_ROUTES }
    ]
  },
  {
    path: appRouteNames.TOOLS,
    component: Layout2Component,
    children: [
      { path: '', children: TOOLS_ROUTES }
    ]
  }
];
