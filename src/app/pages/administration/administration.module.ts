import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdministrationRoutingModule} from "./administration-routing.module";
import {UsersComponent} from './users/users.component';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule, NbIconModule,
  NbInputModule, NbRadioModule, NbSelectModule, NbUserModule
} from "@nebular/theme";
import {ReactiveFormsModule} from "@angular/forms";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    NbCardModule,
    ReactiveFormsModule,
    NbInputModule,
    NbActionsModule,
    NbButtonModule,
    NbCheckboxModule,
    NbDatepickerModule, NbIconModule,
    NbRadioModule,
    NbSelectModule,
    NbUserModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    NbSelectModule,
    NbIconModule, Ng2SmartTableModule,
    TranslateModule,

  ]
})
export class AdministrationModule {
}
