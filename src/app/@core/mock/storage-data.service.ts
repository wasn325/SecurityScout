import {StorageData} from '../data/storage-data';
import {Injectable} from '@angular/core';

@Injectable()
export class StorageDataService extends StorageData {

  data = [
    {
      id: 1,
      name: 'Test',
      description: 'Ein Test Produkt',
      stored: 50,
    },
    {
      id: 2,
      name: 'Test',
      description: 'Ein Test Produkt',
      stored: 0,
    },
    {
      id: 3,
      name: 'Test',
      description: 'Ein Test Produkt',
      stored: 1200,
    },
    {
      id: 4,
      name: 'Test',
      description: 'Ein Test Produkt',
      stored: 40,
    },
    {
      id: 5,
      name: 'Test',
      description: 'Ein Test Produkt',
      stored: 20,
    },
    {
      id: 6,
      name: 'Test',
      description: 'Ein Test Produkt',
      stored: 300,
    },
    {
      id: 7,
      name: 'Cola Master 3000',
      description: 'Siehe Name',
      stored: 1,
    },
  ];

  getData() {
    return this.data;
  }
}

// tslint:disable-next-line:quotemark
