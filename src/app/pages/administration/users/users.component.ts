import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {NbAccessChecker} from '@nebular/security';
import {NbAuthService} from '@nebular/auth';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {NbGlobalPhysicalPosition, NbToastrConfig, NbToastrService, NbWindowService} from '@nebular/theme';
import {LocalDataSource, Ng2SmartTableComponent} from "ng2-smart-table";
import {LangChangeEvent, TranslateService} from "@ngx-translate/core";
import {SeoService} from "../../../@core/utils";
import Swal from 'sweetalert2';

@Component({
  selector: 'ngx-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  addUserForm: FormGroup;
  config: NbToastrConfig;
  translate: TranslateService;

  settings: any;

  source: LocalDataSource = new LocalDataSource();
  // source: ServerDataSource;

  @ViewChild('table') table: Ng2SmartTableComponent;

  constructor(private fb: FormBuilder, private http: HttpClient, private toastr: NbToastrService, translate: TranslateService, private windowService: NbWindowService) {
    this.addUserForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      picture: ['', Validators.required],
      profile: [[], Validators.required]
    });
    this.config = new NbToastrConfig({
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      destroyByClick: true,
      duration: 10000,
      icon: {
        icon: 'shopping-cart-outline',
        pack: 'eva',
        status: 'danger',
      },
    });
    this.translate = translate;
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.initTable();
    });
    this.initTable();
    this.getUser();
  }

  ngOnInit(): void {

  }

  addUser() {
    if(
      this.addUserForm.get('name').value === '' ||
      this.addUserForm.get('email').value === '' ||
      this.addUserForm.get('profile').value === ''
    ){
      Swal.fire(
        'Es ist ein Fehler aufgetreten!',
        'Es wurden nicht alle Felder ausgefüllt!',
        'error'
      )
      // this.toastr.danger('Es wurden nicht alle Felder ausgefüllt!', 'Es ist ein Fehler aufgetreten!', this.config);
      return;
    }

    Swal.fire({
      title: 'Sind Sie sich sicher?',
      text: 'Hiermit legen Sie einen neuen Benutzer an!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ja',
      cancelButtonText: 'Abbrechen'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.post(environment.backend + 'api/v1/user', this.addUserForm.value).toPromise().then(
          result => { // Success
            Swal.fire(
              ':)',
              'Der Benutzer wurde hinzugefügt',
              'success'
            )
            // this.toastr.success('Benutzer wurde hinzugefügt', ':)');
            this.getUser();
          })
          .catch(
            error => { // Something went wrong
              Swal.fire(
                'Fehler beim Anlegen',
                error.error,
                'error'
              )
              // this.toastr.danger(error.error, 'Es ist ein Fehler aufgetreten!', this.config);
            })
        ;
      }
    })

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
        name: {
          title: this.translate.instant('manage.user.name'),
          type: 'string'
        },
        email: {
          title: this.translate.instant('manage.user.mail'),
          type: 'string'
        },
        profile: {
          title: this.translate.instant('manage.user.department'),
          type: 'string'
        },
      },
    };
  }

  getUser(){
    this.http.get(environment.backend + 'api/v1/user').toPromise().then((data:any) => {
      this.source.load(data);
      console.log(data);
    });
  }
}
