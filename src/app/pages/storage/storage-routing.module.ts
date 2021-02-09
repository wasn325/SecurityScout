import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {OverviewComponent} from './overview/overview.component';
import {AddComponent} from './add/add.component';
import {StorageComponent} from './storage.component';
import {EditComponent} from './edit/edit.component';
import {DetailsComponent} from './details/details.component';

const routes: Routes = [
  {
    path: '',
    component: StorageComponent,
    children: [
      {
        path: 'overview',
        component: OverviewComponent,
      },
      {
        path: 'add',
        component: AddComponent,
      },
      {
        path: 'edit',
        component: EditComponent,
      },
      {
        path: 'details',
        component: DetailsComponent,
      },
      {
        path: 'details/:id',
        component: DetailsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class StorageRoutingModule {
}

