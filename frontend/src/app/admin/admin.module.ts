import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ListComponent } from './list.component';
import { LayoutComponent } from './layout.component';
import { AddEditComponent } from './add-edit.component'



@NgModule({
  declarations: [ListComponent, LayoutComponent,AddEditComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
