import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';

import { LineGraphComponent } from './line-graph.component';
import { AppComponent }  from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule
  ],
  declarations: [ AppComponent, LineGraphComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
