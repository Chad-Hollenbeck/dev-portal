import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './+login/login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    // RouterModule.forChild(LOGIN_ROUTES)
  ],
  exports: []
})
export class AuthModule { }
