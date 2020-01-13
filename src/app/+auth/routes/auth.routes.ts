import { LoginComponent } from '../+login/login.component';
import { LogoutComponent } from '../+logout/logout.component';
import { authRouteNames } from './auth.routes.names';

export const AUTH_ROUTES = [
  {path:'', component: LoginComponent},
  {path: authRouteNames.LOGOUT, component: LogoutComponent}
]
