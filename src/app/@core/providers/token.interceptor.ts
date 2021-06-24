import {Injectable, Injector} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {NbAuthJWTInterceptor, NbAuthJWTToken, NbAuthService, NbAuthToken, NbTokenService} from '@nebular/auth';
import {switchMap, tap} from 'rxjs/operators';
import {Router} from "@angular/router";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private authService: NbAuthService;

  constructor(private injector: Injector, private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.authService = this.injector.get(NbAuthService);

    return this.authService.isAuthenticatedOrRefresh()
      .pipe(
      switchMap(authenticated => {
          if (authenticated) {
            return this.authService.getToken().pipe(
              switchMap((token: NbAuthToken) => {
                const JWT = `${token.getValue()}`;
                request = request.clone({
                  setHeaders: {
                    Authorization: JWT,
                  },
                });
                return next.handle(request).pipe( tap(() => {},
                  (err: any) => {
                    if (err instanceof HttpErrorResponse) {
                      if (err.status !== 401) {
                        return;
                      }
                      this.router.navigate(['auth/login']);
                    }
                  }));
              }),
            );
          } else {
            // Request is sent to server without authentication so that the client code
            // receives the 401/403 error and can act as desired ('session expired', redirect to login, aso)
            return next.handle(request).pipe( tap(() => {},
              (err: any) => {
                if (err instanceof HttpErrorResponse) {
                  if (err.status !== 401) {
                    return;
                  }
                  this.router.navigate(['auth/login']);
                }
              }));
          }
        }),
      );
  }

}
