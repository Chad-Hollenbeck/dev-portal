import { Component, Input, HostBinding } from '@angular/core';
import { AppService } from '../../app.service';
import { LayoutService } from '../layout.service';
import { AuthService } from '@app/+auth/auth.service';
import { Router } from '@angular/router';
import { appRouteNames } from '@app/app.routes.names';
import { authRouteNames } from '@app/+auth/config/auth.routes.names';

@Component({
  selector: 'app-layout-navbar',
  templateUrl: './layout-navbar.component.html',
  styles: [':host { display: block; }']
})
export class LayoutNavbarComponent {
  isExpanded = false;
  isRTL: boolean;
  currentAuthUser: firebase.User;

  @Input() sidenavToggle = true;

  @HostBinding('class.layout-navbar') hostClassMain = true;

  constructor(private appService: AppService, private layoutService: LayoutService, private authService: AuthService, private router: Router) {
    this.isRTL = appService.isRTL;

    this.authService.getUserAccount().subscribe(
      (user) => {
        this.currentAuthUser = user;
      }
    )
  }

  currentBg() {
    return `bg-${this.appService.layoutNavbarBg}`;
  }

  toggleSidenav() {
    this.layoutService.toggleCollapsed();
  }

  logout(){
    this.authService.logout();
    this.router.navigate([appRouteNames.AUTH, authRouteNames.LOGIN]);
  }
}
