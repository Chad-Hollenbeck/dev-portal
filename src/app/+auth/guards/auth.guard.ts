import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AppRoutingService } from '@app/app-routing.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router, private appRoutes: AppRoutingService) {
  }


  canActivate(): boolean {

    const user = this.auth.getUser();

    if (!user) {
      this.router.navigateByUrl(this.appRoutes.routes.auth.login);
      return false;
    }

    return true;
  }
}
