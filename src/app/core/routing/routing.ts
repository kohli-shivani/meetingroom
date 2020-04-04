import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { BeforeloginComponent } from '@layouts/beforelogin/beforelogin.component';
import { AfterloginComponent } from '@layouts/afterlogin/afterlogin.component';

const routes: Routes = [
  {
    path: '',
    component: BeforeloginComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: '@modules/login/login.module#LoginModule'
      },
      {
        path: 'login',
        loadChildren: '@modules/login/login.module#LoginModule'
      }
    ]
  },
  {
    path: '',
    component: AfterloginComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: '@modules/dashboard/dashboard.module#DashboardModule',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 