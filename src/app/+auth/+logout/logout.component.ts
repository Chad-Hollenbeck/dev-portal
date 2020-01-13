import { Component} from '@angular/core';
import { AppService } from '@app/app.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { authRouteNames } from '../routes/auth.routes.names';
import { appRouteNames } from '@app/app.routes.names';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: []
})
export class LogoutComponent{

  constructor(private appService: AppService, private authService: AuthService, private router: Router) {
    this.appService.pageTitle = 'Logout';

    this.authService.logout().then(
      () => {
        this.router.navigate([appRouteNames.AUTH, authRouteNames.LOGIN]);
      }
    );

  }
}
