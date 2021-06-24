import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MAT_RIPPLE_GLOBAL_OPTIONS} from '@angular/material/core';
import {NbAuthJWTInterceptor, NbAuthJWTToken, NbAuthModule, NbPasswordAuthStrategy} from '@nebular/auth';
import {NbRoleProvider, NbSecurityModule} from '@nebular/security';
import {of as observableOf} from 'rxjs';

import {throwIfAlreadyLoaded} from './module-import-guard';
import {AnalyticsService, LayoutService, PlayerService, SeoService, StateService} from './utils';
import {UserData} from './data/users';
import {ElectricityData} from './data/electricity';
import {SmartTableData} from './data/smart-table';
import {UserActivityData} from './data/user-activity';
import {OrdersChartData} from './data/orders-chart';
import {ProfitChartData} from './data/profit-chart';
import {TrafficListData} from './data/traffic-list';
import {EarningData} from './data/earning';
import {OrdersProfitChartData} from './data/orders-profit-chart';
import {TrafficBarData} from './data/traffic-bar';
import {ProfitBarAnimationChartData} from './data/profit-bar-animation-chart';
import {TemperatureHumidityData} from './data/temperature-humidity';
import {SolarData} from './data/solar';
import {TrafficChartData} from './data/traffic-chart';
import {StatsBarData} from './data/stats-bar';
import {CountryOrderData} from './data/country-order';
import {StatsProgressBarData} from './data/stats-progress-bar';
import {VisitorsAnalyticsData} from './data/visitors-analytics';
import {SecurityCamerasData} from './data/security-cameras';

import {UserService} from './mock/users.service';
import {ElectricityService} from './mock/electricity.service';
import {SmartTableService} from './mock/smart-table.service';
import {UserActivityService} from './mock/user-activity.service';
import {OrdersChartService} from './mock/orders-chart.service';
import {ProfitChartService} from './mock/profit-chart.service';
import {TrafficListService} from './mock/traffic-list.service';
import {EarningService} from './mock/earning.service';
import {OrdersProfitChartService} from './mock/orders-profit-chart.service';
import {TrafficBarService} from './mock/traffic-bar.service';
import {ProfitBarAnimationChartService} from './mock/profit-bar-animation-chart.service';
import {TemperatureHumidityService} from './mock/temperature-humidity.service';
import {SolarService} from './mock/solar.service';
import {TrafficChartService} from './mock/traffic-chart.service';
import {StatsBarService} from './mock/stats-bar.service';
import {CountryOrderService} from './mock/country-order.service';
import {StatsProgressBarService} from './mock/stats-progress-bar.service';
import {VisitorsAnalyticsService} from './mock/visitors-analytics.service';
import {SecurityCamerasService} from './mock/security-cameras.service';
import {RippleService} from './utils/ripple.service';
import {MockDataModule} from './mock/mock-data.module';
import {StorageData} from './data/storage-data';
import {StorageDataService} from './mock/storage-data.service';
import {environment} from '../../environments/environment';
import {AuthGuard} from './guardians/auth.guard';
import {RoleProvider} from './providers/role.provider';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptor} from './providers/token.interceptor';
import {SocketProvider} from "./data/socket-provider";
import {SocketProviderImplService} from "./mock/socket-provider-impl.service";

const socialLinks = [];

const DATA_SERVICES = [
  {provide: UserData, useClass: UserService},
  {provide: ElectricityData, useClass: ElectricityService},
  {provide: SmartTableData, useClass: SmartTableService},
  {provide: UserActivityData, useClass: UserActivityService},
  {provide: OrdersChartData, useClass: OrdersChartService},
  {provide: ProfitChartData, useClass: ProfitChartService},
  {provide: TrafficListData, useClass: TrafficListService},
  {provide: EarningData, useClass: EarningService},
  {provide: OrdersProfitChartData, useClass: OrdersProfitChartService},
  {provide: TrafficBarData, useClass: TrafficBarService},
  {provide: ProfitBarAnimationChartData, useClass: ProfitBarAnimationChartService},
  {provide: TemperatureHumidityData, useClass: TemperatureHumidityService},
  {provide: SolarData, useClass: SolarService},
  {provide: TrafficChartData, useClass: TrafficChartService},
  {provide: StatsBarData, useClass: StatsBarService},
  {provide: CountryOrderData, useClass: CountryOrderService},
  {provide: StatsProgressBarData, useClass: StatsProgressBarService},
  {provide: VisitorsAnalyticsData, useClass: VisitorsAnalyticsService},
  {provide: SecurityCamerasData, useClass: SecurityCamerasService},
  {provide: StorageData, useClass: StorageDataService},
  {provide: MAT_RIPPLE_GLOBAL_OPTIONS, useExisting: RippleService},
  {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
  {provide: SocketProvider, useClass: SocketProviderImplService}
];

export const NB_CORE_PROVIDERS = [
  ...MockDataModule.forRoot().providers,
  ...DATA_SERVICES,
  ...NbAuthModule.forRoot({

    strategies: [
      NbPasswordAuthStrategy.setup({
        name: 'email',
        baseEndpoint: environment.backend,
        login: {
          endpoint: 'api/auth/login',
          method: 'post',
          redirect: {
            success: '/pages/dashboard',
            failure: null, // stay on the same page
          },
        },
        register: false,
        logout: {
          endpoint: 'api/auth/logout',
          method: 'post',
          redirect: {
            success: '/',
            failure: null, // stay on the same page
          },
        },
        requestPass: false,
        resetPass: false,
        refreshToken: {
          endpoint: 'api/auth/refresh',
          method: 'post',
          requireValidToken: true,
          redirect: {
            success: '/pages/dashboard',
            failure: '/',
          },
          defaultErrors: ['Something went wrong, please try again.'],
          defaultMessages: ['Your token has been successfully refreshed.'],
        },
        token: {
          class: NbAuthJWTToken,
          key: 'token',
        },
      }),
    ],
    forms: {
      login: {
        socialLinks: socialLinks,
      },
      register: {
        socialLinks: socialLinks,
      },
    },
  }).providers,

  // Roles have to be lowercase!!!
  NbSecurityModule.forRoot({
    accessControl: {
      guest: {},
      admin: {
        view: '*',
        edit: '*',
        create: '*',
      },
      super_admin: {
        view: '*',
        edit: '*',
        create: '*',
        delete: '*',
      },
      buy: {
        view: 'storage',
        create: 'storage',
        edit: 'storage',
      },
      sell: {
        view: 'storage',
        edit: 'storage',
      },
      marketing: {
      view: 'storage',
      },
      billing: {
      view: 'storage',
      },
    },
  }).providers,

  {
    provide: NbRoleProvider, useClass: RoleProvider,
  },
  AnalyticsService,
  LayoutService,
  PlayerService,
  SeoService,
  StateService,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    NbAuthModule,
  ],
  declarations: [],
  providers: [
    AuthGuard,
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    };
  }
}
