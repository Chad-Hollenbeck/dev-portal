import { UsersListComponent } from '../+users-list/users-list.component';
import { UserDetailsComponent } from '../+user-details/user-details.component';
import { userRouteNames } from './users.routes.names';


export const USER_ROUTES = [
  {path: '', component: UsersListComponent},
  {path: userRouteNames.DETAILS, component: UserDetailsComponent}
]
