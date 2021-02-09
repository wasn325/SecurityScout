import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StorageRoutingModule} from './storage-routing.module';
import { OverviewComponent } from './overview/overview.component';
import {
    NbActionsModule,
    NbButtonModule,
    NbCardModule,
    NbCheckboxModule,
    NbDatepickerModule,
    NbIconModule, NbInputModule, NbProgressBarModule, NbRadioModule, NbSelectModule, NbUserModule,
} from '@nebular/theme';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import { AddComponent } from './add/add.component';
import {StorageComponent} from './storage.component';
import {FormsModule as ngFormsModule, ReactiveFormsModule} from '@angular/forms';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';
import {NbSecurityModule} from '@nebular/security';

@NgModule({
  declarations: [StorageComponent, OverviewComponent, AddComponent, DetailsComponent, EditComponent],
    imports: [
        CommonModule,
        StorageRoutingModule,
        NbCardModule,
        Ng2SmartTableModule,
        NbActionsModule,
        NbButtonModule,
        NbCheckboxModule,
        NbDatepickerModule, NbIconModule,
        NbInputModule,
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
        NbIconModule,
        ngFormsModule, NbSecurityModule,
        ReactiveFormsModule, NbProgressBarModule,
    ],
  exports: [
    OverviewComponent,
    AddComponent,
  ],
})
export class StorageModule { }
