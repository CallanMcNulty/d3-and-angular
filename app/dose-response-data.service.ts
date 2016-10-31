import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

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
