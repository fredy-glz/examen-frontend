import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListUsersPageComponent } from './pages/list-users-page/list-users-page.component';
import { NewUserPageComponent } from './pages/new-user-page/new-user-page.component';

const routes: Routes = [
  {
    path: '',
    component: ListUsersPageComponent,
    data: { breadcrumb: { alias: 'Usuarios' } },
  },
  {
    path: 'new-user',
    component: NewUserPageComponent,
    data: { breadcrumb: { alias: 'Nuevo usuario' } },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
