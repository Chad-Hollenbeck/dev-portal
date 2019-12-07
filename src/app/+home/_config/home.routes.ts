import { HomeComponent } from '../home.component';
import { AuthGuard } from '@app/+auth/auth.guard';

export const HOME_ROUTES = [
  {path: '' , component: HomeComponent, canActivate: [AuthGuard]}
]

export const homeRouteNames = {
  HOME: ''
}
