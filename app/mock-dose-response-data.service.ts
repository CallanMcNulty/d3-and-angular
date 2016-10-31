import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class MockDoseResponseDataService {
  private request: string;
  constructor() {
    this.request = 'mock-data.json';
  }

  setRequest(newRequest: string) {
    this.request = newRequest;
  }

  getData() {
    return new Observable(function(o: any){
      o.next(
        { json: function(){return this.content; },
          content: {
            title: 'Test Data',
            data:
            [
              {name: 'test-data-0', unit: 'lea', refMin: 0, refMax: 20,
                values: [['10/12/16', 30], ['10/11/16', 23], ['10/13/16', 15], ['10/14/16', 15], ['10/15/16', 20], ['10/16/16', 23]]},
              {name: 'test-data-1', unit: 'drachm', refMin: 20, refMax: 40,
                values: [['10/13/16', 2], ['10/14/16', 12], ['10/15/16', 27]]},
              {name: 'test-data-2', unit: 'ftm', refMin: 100, refMax: 800,
                values: [['10/13/16', 500], ['10/14/16', 550], ['10/18/16', 600]]},
              {name: 'test-data-3', unit: 't', refMin: 500, refMax: 800,
                values: [['10/13/16', 500], ['10/14/16', 550], ['10/18/16', 600]]},
              {name: 'test-data-4', unit: 'pt', refMin: 2, refMax: 40,
                values: [['10/13/16', 2.01], ['10/14/16', 12.6], ['10/15/16', 27.15]]},
              {name: 'test-data-5', unit: 'fl oz', refMin: 10, refMax: 20,
                values: [['10/11/16', 15], ['10/14/16', 15], ['10/18/16', 20], ['10/16/16', 23]]},
              {name: 'test-data-6', unit: 'lbs', refMin: 30, refMax: 50,
                values: [['10/11/16', 30], ['10/16/16', 32]]}
            ]
          }
        }
      );
    });

  }
}
