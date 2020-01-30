import { NgModule } from '@angular/core';
import { UserDetailsComponent } from './+user-details/user-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [UserDetailsComponent],
  imports: [
    SharedModule, FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  exports: []
})
export class UsersModule { }
