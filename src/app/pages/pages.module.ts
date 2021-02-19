import { NgModule } from '@angular/core';
import {NbCardModule, NbMenuModule} from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import {StorageModule} from './storage/storage.module';
import { BrbComponent } from './brb/brb.component';
import {AdministrationModule} from "./administration/administration.module";

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    MiscellaneousModule,
    StorageModule,
    NbCardModule,
    AdministrationModule
  ],
  declarations: [
    PagesComponent,
    BrbComponent,
  ],
})
export class PagesModule {
}
