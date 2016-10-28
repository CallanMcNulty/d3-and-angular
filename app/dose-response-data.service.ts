import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class DoseResponseDataService {
  private request: string;
  constructor(private http: Http) {
    this.request = 'mock-data.json';
  }

  setRequest(newRequest: string) {
    this.request = newRequest;
  }

  getData() {
    return this.http.get(this.request);

  }
}
