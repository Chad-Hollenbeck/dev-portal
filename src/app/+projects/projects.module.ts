import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// **************************************************
// Components & Services
import { ProjectCardComponent } from './+project-card/project-card.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProjectListComponent } from './+project-list/project-list.component';

@NgModule({
  declarations: [ProjectCardComponent,
    ProjectListComponent,
  ],
  imports: [
    CommonModule,
    NgbModule
  ],
  exports: [
    ProjectListComponent,
    ProjectCardComponent
  ],
  providers: []
})
export class ProjectsModule { }
