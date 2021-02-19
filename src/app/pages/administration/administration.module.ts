import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdministrationRoutingModule} from "./administration-routing.module";
import { UsersComponent } from './users/users.component';
import {NbCardModule} from "@nebular/theme";



@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    NbCardModule
  ]
})
export class AdministrationModule { }
