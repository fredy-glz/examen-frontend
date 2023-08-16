import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbModule, BreadcrumbService } from 'xng-breadcrumb';

import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MaterialModule } from '../material/material.module';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';

@NgModule({
  declarations: [LayoutPageComponent, BreadcrumbComponent],
  imports: [
    DashboardRoutingModule,
    CommonModule,
    MaterialModule,
    BreadcrumbModule,
  ],
  providers: [BreadcrumbService],
})
export class DashboardModule {}
