import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NbAccessChecker} from '@nebular/security';
import {NbAuthService} from '@nebular/auth';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {NbGlobalPhysicalPosition, NbToastrConfig, NbToastrService} from '@nebular/theme';

@Component({
  selector: 'ngx-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent {

  form: FormGroup;
  working: boolean = false;
  success: boolean = false;
  error: boolean = false;
  errors: Array<String> = [];

  config: NbToastrConfig;

  // Loading bar
  value = 0;

  setValue(newValue) {
    this.value = Math.min(Math.max(newValue, 0), 100);
  }
  // ---

  constructor(private router: Router, public accessTest: NbAuthService,
              public fb: FormBuilder, private http: HttpClient, private toastr: NbToastrService) {
    this.form = this.fb.group({
      nr: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      stored: ['', Validators.required],
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
  }

  submitForm() {
    this.working = true;
    this.setValue(1);
    // console.log(this.form.value);
    if (
      this.form.get('nr').value === '' ||
      this.form.get('name').value === '' ||
      this.form.get('description').value === '' ||
      this.form.get('stored').value === ''
    ) {
      this.setValue(10);
      /*if (this.form.get('nr').value === '') this.errors.push('Artikelnummer darf nicht leer sein!');
      if (this.form.get('name').value === '') this.errors.push('Wie soll das Produkt heißen?');
      if (this.form.get('description').value === '') this.errors.push('Erzähl mir doch etwas über das Produkt :)');
      if (this.form.get('stored').value === '') this.errors.push('Wie viel Stück haben wir davon im Lager?');*/

      // this.error = true;
      this.toastr.danger('Es wurden nicht alle Felder ausgefüllt!', 'Es ist ein Fehler aufgetreten!', this.config);
      /*setTimeout(() => { // Reset Message
        // this.error = false;
        this.errors = [];
      }, 20000);*/
      this.working = false;
      this.setValue(0);
      return;
    }
    this.setValue(90);
    this.http.post(environment.backend + 'api/v1/storage', this.form.value).toPromise().then(
      result => { // Success
        this.setValue(100);
        this.toastr.success('Artikel wurde hinzugefügt', ':)');
        this.working = false;
        this.setValue(0);
        /*this.success = true;
        setTimeout(() => { // Reset Message
          this.success = false;
        }, 5000);*/
      })
      .catch(
        error => { // Something went wrong
          this.toastr.danger(error.error, 'Es ist ein Fehler aufgetreten!', this.config);
          /*this.errors.push(error.error);
          this.error = true;
          setTimeout(() => { // Reset Message
            this.error = false;
            this.errors = [];
          }, 5000);*/
        })
    ;

  }
}
