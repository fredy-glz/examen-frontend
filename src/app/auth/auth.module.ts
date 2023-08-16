import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { MaterialModule } from '../material/material.module';

import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LayoutPageComponent, LoginPageComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
  ],
})
export class AuthModule {}
