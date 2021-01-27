import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NbAccessChecker} from '@nebular/security';
import {NbAuthService} from '@nebular/auth';

@Component({
  selector: 'ngx-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {

  constructor(private router: Router, public accessTest: NbAuthService) {
  }

  ngOnInit(): void {
  }

}
