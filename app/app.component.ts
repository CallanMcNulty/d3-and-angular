import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';

@Component({
    selector: 'my-app',
    template: '<div class="line-graph"><line-graph [dataStream]="dataStream"></line-graph></div>'
})
export class AppComponent {
  public dataStream: any;
  constructor(private http: Http) {
    this.dataStream = this.http.get('mock-data.json');
  }
}
