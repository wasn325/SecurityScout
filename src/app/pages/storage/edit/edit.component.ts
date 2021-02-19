import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NbToastrService} from '@nebular/theme';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {constructorParametersDownlevelTransform} from '@angular/compiler-cli';

@Component({
  selector: 'ngx-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  searchForm: FormGroup;
  editForm: FormGroup;
  item: {};

  constructor(public fb: FormBuilder, private toastr: NbToastrService, private http: HttpClient) {
    this.searchForm = this.fb.group({
      nr: ['', Validators.required],
    });
    this.editForm = this.fb.group({
      nr: ['', Validators.required],
      name: ['', Validators.required],
      sap_name: ['', Validators.required],
      description: ['', Validators.required],
      stored: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  searchItem() {
    if (this.searchForm.get('nr').value === '') {
      this.toastr.danger('Artikel Nummer darf nicht leer sein!', 'EIn Fehler ist aufgetreten');
      return;
    }
    this.http.get(environment.backend + 'api/v1/storage/' + this.searchForm.get('nr').value).subscribe((data: any) => {
        this.item = data;
        this.setupItem();
      },
      error => { // Something went wrong
        this.toastr.danger(error.error, 'Es ist ein Fehler aufgetreten!');
        this.item = null;
        this.setupItem();
      })
    ;
  }

  setupItem() {
    this.editForm.setValue(this.item);
  }

  editItem() {
    if (
      this.editForm.get('nr').value === '' ||
      this.editForm.get('name').value === '' ||
      this.editForm.get('description').value === '' ||
      this.editForm.get('stored').value === ''
    ) {
      this.toastr.danger('Es wurden nicht alle Felder ausgefüllt!', 'Es ist ein Fehler aufgetreten!');
      return;
    }
    this.http.patch(environment.backend + 'api/v1/storage/' + this.searchForm.get('nr').value, this.editForm.value)
      .subscribe(() => {
          this.item = {};
          this.toastr.success('Artikel wurde bearbeitet', ':)');
      },
      /*(error) => {
        this.toastr.danger(error.error, 'Es ist ein Fehler aufgetreten!');
      }*/);
  }
}
