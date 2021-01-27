import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {StorageData} from '../../../@core/data/storage-data';

@Component({
  selector: 'ngx-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {

  constructor(private router: ActivatedRoute, private service: StorageData) {
  }

  id: number;

  data: any;

  ngOnInit(): void {
    if (this.router.snapshot.params['id'] != null) {
      this.id = this.router.snapshot.params['id'];
      this.data = this.service.getData()[this.id - 1];
    }
  }

}
