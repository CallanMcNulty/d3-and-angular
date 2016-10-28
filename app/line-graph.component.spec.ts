/* tslint:disable:no-unused-variable */
import { LineGraphComponent } from './line-graph.component';
import { DoseResponseDataService } from './dose-response-data.service';
import { MockDoseResponseDataService } from './mock-dose-response-data.service';
import * as d3 from 'd3';
import { TestBed }      from '@angular/core/testing';

import { By }           from '@angular/platform-browser';

////////  SPECS  /////////////

describe('LineGraphComponent', function () {
  var fixture: any;
  var component: any;
  beforeEach((done: any) => {
    TestBed.configureTestingModule({declarations: [LineGraphComponent], providers: [DoseResponseDataService]});
    TestBed.overrideComponent(LineGraphComponent, {
      set: {
        providers: [
          { provide: DoseResponseDataService, useClass: MockDoseResponseDataService }
        ]
      }
    });
    fixture = TestBed.createComponent(LineGraphComponent);
    component = fixture.componentInstance
    component.ngOnInit();
    setTimeout(function(){
      done();
    }, 200);
  });

  it('should instantiate component', () => {
    expect(component instanceof LineGraphComponent).toBe(true, 'should create LineGraphComponent');
  });

  it('should have an svg', () => {
    let svg = d3.select('svg').node();
    expect(svg).not.toBeNull();
  });

  it('should have an axis', () => {
    let axis = d3.select('.axis').node();
    expect(axis).not.toBeNull();
  });

  it("should have lines for each dataset", () => {
    let allIn = true;
    for(var i=0; i<7; i++) {
      if(d3.select(".series"+i+"-line").node()===null) {
        allIn = false;
      }
    }
    expect(allIn).toBe(true);
  });

});
