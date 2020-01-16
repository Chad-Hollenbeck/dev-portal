import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// **************************************************
// Components & Services
import { ProjectCardComponent } from './+project-card/project-card.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProjectListComponent } from './+project-list/project-list.component';
import { ProjectService } from './services/project.firestore.service';

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
  providers: [ProjectService]
})
export class ProjectsModule { }
