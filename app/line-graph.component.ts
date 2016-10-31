import { Component } from '@angular/core';
import { Grapher } from './grapher.model';
import { DoseResponseDataService } from './dose-response-data.service';
import * as d3 from 'd3';

@Component({
  selector: 'line-graph',
  providers: [DoseResponseDataService],
  template: '<h1></h1><svg id="graph"></svg>'
})
export class LineGraphComponent {
  public data: any;
  constructor(private drds: DoseResponseDataService) { }

  ngOnInit() {
    this.drawGraph();
  }

  drawGraph() {
    this.drds.getData().subscribe(function(response: any) {
      let res = response.json();
      this.data = res.data;
      d3.select('h1').text(res.title);
      let svg = d3.select('#graph');
      svg.selectAll('*').remove();
      let g = new Grapher();
      g.lineGraph(svg, this.data);
    });
  }
}
