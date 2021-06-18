import {Component, ViewChild} from '@angular/core';
import {LocalDataSource, Ng2SmartTableComponent} from 'ng2-smart-table';
import {StorageData} from '../../../@core/data/storage-data';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {NbGlobalPhysicalPosition, NbToastrConfig, NbToastrService} from '@nebular/theme';
import {LangChangeEvent, TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'ngx-storage-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent {

  settings: any;

  source: LocalDataSource = new LocalDataSource();
  // source: ServerDataSource;

  @ViewChild('table') table: Ng2SmartTableComponent;

  router: Router;
  private translate: TranslateService;

  constructor(private service: StorageData, private routerModule: Router, private http: HttpClient,
              private toastr: NbToastrService, translate: TranslateService) {

    this.translate = translate;
    this.initTable();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.initTable();
    });
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

  initTable() {
    this.settings = {
      pager: {
        display: true,
        perPage: 15
      },
      actions: {
        mode: window.external,
        add: false,
        edit: false,
        delete: false,
      },
      columns: {
        nr: {
          title: 'Nr.',
          type: 'number',
          sortDirection: 'asc',
          width: '5%'
        },
        name: {
          title: this.translate.instant('article.name'),
          type: 'string',
          width: '20%'
        },
        sap_name: {
          title: this.translate.instant('article.sap'),
          type: 'string',
          width: '10%'
        },
        description: {
          title: this.translate.instant('article.description'),
          type: 'string'
        },
        stored: {
          title: this.translate.instant('article.stock'),
          type: 'number',
          width: '10%'
        },
      },
    };
  }

}
