import { Component } from '@angular/core';
import { grapher } from './grapher.model';
import { DoseResponseDataService } from './dose-response-data.service';
import * as d3 from 'd3';

@Component({
  selector: 'line-graph',
  providers: [DoseResponseDataService],
  template: '<svg id="graph"></svg>'
})
export class LineGraphComponent {
  public data: any;
  constructor(private drds: DoseResponseDataService) { }

  ngOnInit() {
    this.drawGraph();
  }

  drawGraph() {
    this.drds.getData().subscribe(function(response: any) {
      this.data = response.json();
      var svg = d3.select("#graph");
      svg.selectAll("*").remove();
      var g = new grapher();
      g.lineGraph(svg, this.data);
    });
  }
}
