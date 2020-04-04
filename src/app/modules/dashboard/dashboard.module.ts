import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManagebookingComponent } from './managebooking/managebooking.component';
import { AddbookingComponent } from './addbooking/addbooking.component';
import { SharedModule } from '@shared/shared.module';
import { DatePipe } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ],
  declarations: [DashboardComponent, ManagebookingComponent, AddbookingComponent],
  entryComponents: [AddbookingComponent,ManagebookingComponent],
  providers:[DatePipe]
})
export class DashboardModule { }
