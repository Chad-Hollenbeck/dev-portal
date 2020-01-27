import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { ClipboardModule } from 'ngx-clipboard';
// **************************************************
// Components & Services

import { ClassMapperComponent } from './+class-mapper/class-mapper.component';

@NgModule({
  declarations: [  ClassMapperComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ClipboardModule
  ],
  providers: []
})
export class ToolsModule { }
