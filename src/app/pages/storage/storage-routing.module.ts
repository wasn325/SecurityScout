import {RouterModule, Routes} from '@angular/router';
import {FormsComponent} from '../forms/forms.component';
import {FormInputsComponent} from '../forms/form-inputs/form-inputs.component';
import {FormLayoutsComponent} from '../forms/form-layouts/form-layouts.component';
import {ButtonsComponent} from '../forms/buttons/buttons.component';
import {DatepickerComponent} from '../forms/datepicker/datepicker.component';
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

