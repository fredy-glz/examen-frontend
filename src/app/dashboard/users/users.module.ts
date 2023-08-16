import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbModule } from 'xng-breadcrumb';

import { UsersRoutingModule } from './users-routing.module';
import { ListUsersPageComponent } from './pages/list-users-page/list-users-page.component';
import { MaterialModule } from '../../material/material.module';
import { NewUserPageComponent } from './pages/new-user-page/new-user-page.component';

@NgModule({
  declarations: [ListUsersPageComponent, NewUserPageComponent],
  imports: [
    ReactiveFormsModule,
    UsersRoutingModule,
    CommonModule,
    MaterialModule,
    BreadcrumbModule
  ],
})
export class UsersModule {}
