import { Component } from '@angular/core';
import { grapher } from './grapher.model';
import * as d3 from 'd3';

@Component({
  selector: 'line-graph',
  inputs: ["dataStream"],
  template: '<svg id="graph"></svg>'
})
export class LineGraphComponent {
  public data: any;
  public dataStream: any;
  ngOnInit() {
    this.dataStream.subscribe(function(response: any) {
      this.data = response.json();
      var svg = d3.select("#graph");
      var g = new grapher();
      g.lineGraph(svg, this.data);
    });
  }
}
