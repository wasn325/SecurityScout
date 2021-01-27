import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-storage',
  template: `
    <router-outlet></router-outlet>
  `,
})
export class StorageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
