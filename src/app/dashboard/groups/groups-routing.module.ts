import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListGroupsPageComponent } from './pages/list-groups-page/list-groups-page.component';
import { NewGroupPageComponent } from './pages/new-group-page/new-group-page.component';

const routes: Routes = [
  {
    path: '',
    component: ListGroupsPageComponent,
    data: { breadcrumb: { alias: 'Grupos' } },
  },
  {
    path: 'new-group',
    component: NewGroupPageComponent,
    data: { breadcrumb: { alias: 'Nuevo grupo' } },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupsRoutingModule {}
