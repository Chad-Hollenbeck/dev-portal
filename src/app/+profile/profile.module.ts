import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// **************************************************
// Components & Services
import { ProfileIndexComponent } from './+profile-index/profile-index.component';

@NgModule({
  declarations: [  
    ProfileIndexComponent,
  ],
  imports: [
    CommonModule
  ],
  providers: []
})
export class ProfileModule { }
