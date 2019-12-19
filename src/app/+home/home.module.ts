import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './+home/home.component';
import { RouterModule } from '@angular/router';
import { ProjectsModule } from '@app/+projects/projects.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule,
    ProjectsModule
  ],
  exports: []
})
export class HomeModule { }
