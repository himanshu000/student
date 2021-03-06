import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NavComponent } from './nav.component';
import { AuthGuard } from '../services/auth.guard';
import { DashboardComponent } from '../dashboard/dashboard.component';


const routes: Routes = [
  {
    path: 'dashboard',
    component: NavComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent }
    ]
  },
  {path: '**', redirectTo: 'dashboard'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavRoutingModule { }
