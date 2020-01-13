import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './+login/login.component';
import { LogoutComponent } from './+logout/logout.component';

@NgModule({
  declarations: [LoginComponent,
    LogoutComponent,
  ],
  imports: [
    CommonModule,
    // RouterModule.forChild(LOGIN_ROUTES)
  ],
  exports: []
})
export class AuthModule { }
