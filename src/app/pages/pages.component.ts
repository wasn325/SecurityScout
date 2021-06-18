import {Component, OnInit} from '@angular/core';

import {NbAccessChecker} from '@nebular/security';
import {NbMenuItem} from '@nebular/theme';
import {LangChangeEvent, TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit {

  menu: NbMenuItem[];
  translate: TranslateService;

  constructor(private accessChecker: NbAccessChecker, translate: TranslateService) {
    this.translate = translate;
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.initMenu();
    });
  }

  ngOnInit() {
    this.initMenu();
    this.authMenuItems();
  }

  authMenuItems() {
    this.menu.forEach(item => {
      this.authMenuItem(item);
    });
  }

  authMenuItem(menuItem: NbMenuItem) {
    if (menuItem.data != null) {
      if (menuItem.data && menuItem.data['permission'] && menuItem.data['resource']) {
        this.accessChecker.isGranted(menuItem.data['permission'], menuItem.data['resource']).subscribe(granted => {
          menuItem.hidden = !granted;
        });
      } else {
        menuItem.hidden = true;
      }
    } else {
      menuItem.hidden = false;
    }
    if (!menuItem.hidden && menuItem.children != null) {
      menuItem.children.forEach(item => {
        if (item.data && item.data['permission'] && item.data['resource']) {
          this.accessChecker.isGranted(item.data['permission'], item.data['resource']).subscribe(granted => {
            item.hidden = !granted;
          });
        } else {
          // if child item do not config any `data.permission` and `data.resource` just inherit parent item's config
          item.hidden = menuItem.hidden;
        }
      });
    }
  }

  initMenu() {
    this.menu = [
      {
        title: this.translate.instant('menu.item.dashboard'),
        icon: 'shopping-cart-outline',
        link: '/pages/dashboard',
        home: true,
      },
      {
        title: this.translate.instant('menu.item.storage'),
        group: true,
      },
      {
        title: this.translate.instant('menu.item.storage'),
        icon: 'archive-outline',
        expanded: true,
        children: [
          {
            title: this.translate.instant('menu.item.overview'),
            icon: 'eye-outline',
            link: '/pages/storage/overview',
            data: {
              permission: 'view',
              resource: 'storage',
            },
          },
          {
            title: this.translate.instant('menu.item.add'),
            icon: 'plus-circle-outline',
            link: '/pages/storage/add',
            data: {
              permission: 'create',
              resource: 'storage',
            },
          },
          {
            title: this.translate.instant('menu.item.edit.general'),
            icon: 'edit-outline',
            link: '/pages/storage/edit',
            data: {
              permission: 'edit',
              resource: 'storage',
            },
          },
          {
            title: this.translate.instant('menu.item.edit.items'),
            icon: 'edit-outline',
            link: '/pages/storage/edit/stored',
            data: {
              permission: 'edit',
              resource: 'storage',
            },
          },
        ],
      },
      {
        title: this.translate.instant('menu.item.administrative'),
        group: true,
        data: {
          permission: 'view',
          resource: 'admin',
        },
      },
      {
        title: this.translate.instant('menu.item.user'),
        icon: 'people-outline',
        link: '/pages/admin/user',
        data: {
          permission: 'edit',
          resource: 'user',
        },
      }
  ]
  }

}
