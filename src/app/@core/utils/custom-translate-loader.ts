import {TranslateLoader} from "@ngx-translate/core";
import {Observable} from "rxjs/Observable";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {catchError} from "rxjs/operators";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";

export class CustomTranslateLoader implements TranslateLoader {
  contentHeader = new HttpHeaders({
    'Content-Type': 'text/plain',
    /*'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
  */});

  constructor(private httpClient: HttpClient) {}
  getTranslation(lang: string): Observable<any> {
    const apiAddress = environment.backend + `api/v1/resources/i18n/${lang}.json`;
    if(lang==='keys'){
      return this.httpClient.get(environment.backend + 'api/v1/resources/i18n/keys.json');
    }
    return this.httpClient.get(apiAddress/*, { headers: this.contentHeader }*/)
      .pipe(
        catchError(_ => this.httpClient.get(`/api/v1/resources/i18n/de.json`, {headers: this.contentHeader}) //Failsafe 1: load default language
          .pipe(
            catchError(_ => new TranslateHttpLoader(this.httpClient, './assets/i18n/', '.json').getTranslation(lang)) //Failsafe 2: load backup language if backend fails
          )
        )
      );
  }
}
