import { projectsRouteNames } from './projects.routes.names';

import { ProjectCardComponent } from '../+project-card/project-card.component';
import { ProjectListComponent } from '../+project-list/project-list.component';
export const Projects_Routes = [
  {path: projectsRouteNames.PROJECT_CARD, component: ProjectCardComponent},
  {path: projectsRouteNames.PROJECT_LIST, component: ProjectListComponent},
]
