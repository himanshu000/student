import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { NavRoutingModule } from './nav-routing.module';
import { NavComponent } from './nav.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ViewStudentComponent } from '../dashboard/view-student/view-student.component';
import { AddStudentComponent } from '../dashboard/add-student/add-student.component';
import { EditStudentComponent } from '../dashboard/edit-student/edit-student.component';


@NgModule({
  declarations: [
    NavComponent,
    DashboardComponent,
    ViewStudentComponent,
    AddStudentComponent,
    EditStudentComponent
  ],
  imports: [
    SharedModule,
    NavRoutingModule
  ]
})
export class NavModule { }
