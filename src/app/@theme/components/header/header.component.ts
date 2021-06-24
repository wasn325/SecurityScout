import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {
  NbActionComponent,
  NbMediaBreakpointsService,
  NbMenuService,
  NbSidebarService,
  NbThemeService
} from '@nebular/theme';

import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { RippleService } from '../../../@core/utils/ripple.service';
import {NbAuthJWTToken, NbAuthService} from '@nebular/auth';
import {LangChangeEvent, TranslateService} from "@ngx-translate/core";
import {createViewChild} from "@angular/compiler/src/core";
import {SocketProvider} from "../../../@core/data/socket-provider";
import {SocketProviderImplService} from "../../../@core/mock/socket-provider-impl.service";

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  public readonly materialTheme$: Observable<boolean>;
  userPictureOnly: boolean = false;
  user: any;
  @ViewChild('bell') bell: NbActionComponent
  @ViewChild('mail') mail: NbActionComponent

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
    {
      value: 'material-light',
      name: 'Material Light',
    },
    {
      value: 'material-dark',
      name: 'Material Dark',
    },
  ];

  languages = [
    {
      name: 'Deutsch',
      value: 'de',
    },
    {
      name: 'English',
      value: 'en',
    },
    {
      name: 'Keys',
      value: 'keys',
    }
  ]

  notifications: { name: string, title: string }[] = [];
  messages: { name: string, title: string }[] = [];

  currentTheme = 'default';

  currentLanguage = 'de';

  userMenu = [ { title: 'Profile' }, { title: 'Log out',  link: '/auth/logout'} ];

  public constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private userSeyrvice: UserData,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private rippleService: RippleService,
    private authService: NbAuthService,
    private translate: TranslateService,/*
    private socketClient: SocketProviderImplService*/
  ) {
    this.materialTheme$ = this.themeService.onThemeChange()
      .pipe(map(theme => {
        const themeName: string = theme?.name || '';
        return themeName.startsWith('material');
      }));
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentLanguage = event.lang;
      console.log(event.lang);
    });
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {

        if (token.isValid()) {
          this.user = token.getPayload();
        }

      });
    /*this.socketClient.subscribe('notifications', function (data) {
      console.log(data.body);
    })*/
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;

    /*this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: any) => this.user = users.admin);*/

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => {
        this.currentTheme = themeName;
        this.rippleService.toggle(themeName?.startsWith('material'));
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  changeLanguage(languageName: string){
    this.translate.use(languageName);
    this.newNotification();
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  newNotification(){
    this.notifications.push({ name: 'TestMessage', title: 'Test' });
    this.messages.push({ name: 'TestMessage', title: 'Fabian Frischmann' });
    this.messages.push({ name: 'Hilfe', title: 'Weinfurtner Martin' });
  }
}
