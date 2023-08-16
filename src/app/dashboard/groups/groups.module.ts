import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbModule } from 'xng-breadcrumb';

import { GroupsRoutingModule } from './groups-routing.module';
import { ListGroupsPageComponent } from './pages/list-groups-page/list-groups-page.component';
import { MaterialModule } from '../../material/material.module';
import { NewGroupPageComponent } from './pages/new-group-page/new-group-page.component';

@NgModule({
  declarations: [ListGroupsPageComponent, NewGroupPageComponent],
  imports: [
    ReactiveFormsModule,
    GroupsRoutingModule,
    CommonModule,
    MaterialModule,
    BreadcrumbModule,
  ],
})
export class GroupsModule {}
