import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { authRouteNames } from '../routes/auth.routes.names';
import { appRouteNames } from '@app/app.routes.names';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {
  }


  canActivate(): boolean {

    const user = this.auth.getUser();

    if (!user) {
      this.router.navigate([appRouteNames.AUTH, authRouteNames.LOGIN]);
      return false;
    }

    return true;
  }
}
