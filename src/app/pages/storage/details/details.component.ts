import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StorageData} from '../../../@core/data/storage-data';
import Swal from "sweetalert2";

@Component({
  selector: 'ngx-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private service: StorageData) {
  }

  id: number;

  data: any;

  ngOnInit(): void {
    if (this.route.snapshot.params['id'] != null) {
      this.id = this.route.snapshot.params['id'];
      this.data = this.service.getData()[this.id - 1];
    }
    if(this.id==null || this.data == null){
      Swal.fire(
        'Es ist ein Fehler aufgetreten!',
        'Kein Artikel gefunden oder keine ID angegeben!',
        'error'
      ).then((result) => {
        this.router.navigate(['/pages/storage/overview']);
      });
    }
  }

}
