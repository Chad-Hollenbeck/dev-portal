import { UserDetailsComponent } from '../+user-details/user-details.component';
import { userRouteNames } from './users.routes.names';


export const USER_ROUTES = [
  {path: userRouteNames.DETAILS, component: UserDetailsComponent}
]
