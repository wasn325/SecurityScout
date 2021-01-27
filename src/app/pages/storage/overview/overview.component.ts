import {Component, ViewChild} from '@angular/core';
import {LocalDataSource, Ng2SmartTableComponent} from 'ng2-smart-table';
import {StorageData} from '../../../@core/data/storage-data';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-storage-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent {

  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    columns: {
      id: {
        title: 'Artikel Nr.',
        type: 'number',
        width: '15%',
      },
      name: {
        title: 'Name',
        type: 'string',
        width: '20%',
      },
      description: {
        title: 'Beschreibung',
        type: 'string',
      },
      stored: {
        title: 'Lagerbestand',
        type: 'number',
        width: '15%',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  @ViewChild('table') table: Ng2SmartTableComponent;

  router: Router;

  constructor(private service: StorageData, private routerModule: Router) {
    const data = this.service.getData();
    this.source.load(data);
    this.router = routerModule;
  }


}
