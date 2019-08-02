import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { NavRoutingModule } from './nav-routing.module';
import { NavComponent } from './nav.component';
import { DashboardComponent } from '../dashboard/dashboard.component';


@NgModule({
  declarations: [
    NavComponent,
    DashboardComponent
  ],
  imports: [
    SharedModule,
    NavRoutingModule
  ]
})
export class NavModule { }
