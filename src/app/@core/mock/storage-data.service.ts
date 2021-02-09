import {StorageData} from '../data/storage-data';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable()
export class StorageDataService extends StorageData {

  constructor(private http: HttpClient) {
    super();
  }

  getData(): Promise<any> {
    return this.http.get(environment.backend + 'api/v1/storage').toPromise();
  }
}
