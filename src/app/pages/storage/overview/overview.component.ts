import {Component, ViewChild} from '@angular/core';
import {LocalDataSource, Ng2SmartTableComponent} from 'ng2-smart-table';
import {StorageData} from '../../../@core/data/storage-data';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {NbGlobalPhysicalPosition, NbToastrConfig, NbToastrService} from '@nebular/theme';

@Component({
  selector: 'ngx-storage-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent {

  settings = {
    actions: {
      mode: window.external,
      add: false,
      edit: false,
      delete: false,
    },
    columns: {
      nr: {
        title: 'Artikel Nr.',
        type: 'number',
        sortDirection: 'asc',
        width: '5%'
      },
      name: {
        title: 'Name',
        type: 'string',
        width: '20%'
      },
      sap_name: {
        title: 'SAP',
        type: 'string',
        width: '10%'
      },
      description: {
        title: 'Beschreibung',
        type: 'string'
      },
      stored: {
        title: 'Lagerbestand',
        type: 'number',
        width: '10%'
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  // source: ServerDataSource;

  @ViewChild('table') table: Ng2SmartTableComponent;

  router: Router;

  constructor(private service: StorageData, private routerModule: Router, private http: HttpClient,
              private toastr: NbToastrService) {

    this.service.getData().then((data) => {
        this.source.load(data);
      },
      (error) => {
        toastr.danger('Lager konnte nicht geladen werden!', 'Fehler', new NbToastrConfig({
          position: NbGlobalPhysicalPosition.TOP_RIGHT,
          destroyByClick: true,
          duration: 10000,
          icon: {
            icon: 'activity-outline',
            pack: 'eva',
            status: 'danger',
          },
        }));
      });
    // this.source = new ServerDataSource(http, {endPoint: environment.backend + 'api/v1/storage'});
    this.router = routerModule;
  }

  public edit(event) {
    this.router.navigate(['/pages/storage/edit?id=x']);
  }

}
