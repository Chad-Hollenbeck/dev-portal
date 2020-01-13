import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsModule } from '@app/+projects/projects.module';

// **************************************************
// Components & Services
import { ProfileIndexComponent } from './+profile-index/profile-index.component';

@NgModule({
  declarations: [
    ProfileIndexComponent,
  ],
  imports: [
    CommonModule,
    ProjectsModule
  ],
  providers: []
})
export class ProfileModule { }
