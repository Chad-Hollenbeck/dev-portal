import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { LoadingSpinnerComponent } from './spinners/loading-spinner/loading-spinner.component';
import { PageHeaderComponent } from './page-header/page-header.component';




@NgModule({
  declarations: [LoadingSpinnerComponent, PageHeaderComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [LoadingSpinnerComponent, PageHeaderComponent]
})
export class SharedModule { }
