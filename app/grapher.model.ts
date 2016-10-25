import * as d3 from 'd3';
import * as d3Axis from 'd3-axis';
import * as d3Scale from 'd3-scale';
import * as d3TimeFormat from 'd3-time-format';

export class grapher {
  linify(points: Array<any>): Array<Object> {
    points.sort(function(a: any, b: any) {
      if(a[0] < b[0]) {
        return -1;
      }
      if(b[0] < a[0]) {
        return 1;
      }
      return 0;
    });
    var lines: Array<Object> = [];
    for(var i=0; i<points.length-1; i++) {
      lines.push({p1:points[i],p2:points[i+1]});
    }
    return lines;
  }

  findMaxMin(data: Array<Array<any>>, isMax: boolean, isX: boolean) {
    var soFar = isMax ? -Infinity : Infinity;
    for(var i=0; i<data.length; i++) {
      if(typeof data[i][0] === "object") {
        var val: any = this.findMaxMin(data[i], isMax, isX);
      } else {
        var val = isX ? data[i][0] : data[i][1];
      }
      if(isMax ? val > soFar : val < soFar) {
        soFar = val;
      }
    }
    return soFar;
  }

   transformData(data: Array<any>) {
    var transformedData: Array<Array<any>> = [];
    for(var i=0; i<data.length; i++) {
      var dataset = data[i];
      var ratio = 900/(dataset.refMax-dataset.refMin);
      var offset = 900-(dataset.refMax*ratio);
      transformedData.push([]);
      for(var j=0; j<dataset.values.length; j++) {
        var transformedPoint: Array<any> = [];
        var point = dataset.values[j];
        transformedPoint[0] = Date.parse(point[0]);
        transformedPoint[1] = point[1]*ratio + offset;
        transformedPoint[2] = point[1];
        transformedData[i].push(transformedPoint);
      }
    }
    return transformedData;
  }

  lineGraph(svg: any, data: any) {
    var metaData: Array<any> = [];
    for(var i=0; i<data.length; i++) {
      metaData.push({name:data[i].name, unit:data[i].unit, refMin:data[i].refMin, refMax:data[i].refMax});
    }
    data = this.transformData(data);
    var h = svg.style("height");
    var w = svg.style("width");
    h = parseFloat(h);
    w = parseFloat(w);
    var padding = 25;
    var paddingLarge = 85;
    var minX: any = this.findMaxMin(data, false, true);
    var maxX: any = this.findMaxMin(data, true, true);
    var xInnerPadding = (maxX - minX)/10;
    maxX += xInnerPadding;
    minX -= xInnerPadding;
    var minY = Math.min(0,this.findMaxMin(data, false, false));
    var maxY = Math.max(900,this.findMaxMin(data, true, false));
    var yInnerPadding = (maxY - minY)/10;
    maxY += yInnerPadding;
    minY -= yInnerPadding;

    var yScale = d3Scale.scaleLinear()
      .domain([minY, maxY])
      .range([h-paddingLarge, padding])

    var xTimeScale = d3Scale.scaleTime()
      .domain([minX, maxX])
      .range([padding, w-padding])
    var numberOfDays = (maxX - minX) / 86400000 + 1;
    var xAxis = d3Axis.axisBottom(xTimeScale)
      .tickFormat(d3TimeFormat.timeFormat("%m-%d-%y"));
    var horizGuide = svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0,"+(h-paddingLarge)+")");
    xAxis(horizGuide);

    var graph = svg.append("g");

    //background
    graph.append("rect")
      .attr("x", xTimeScale(minX)-1)
      .attr("y", yScale(maxY))
      .attr("width", xTimeScale(maxX)-padding+2)
      .attr("height", yScale(minY)-yScale(maxY))
      .attr("class", "out-of-range")
    graph.append("rect")
      .attr("x", xTimeScale(minX))
      .attr("y", yScale(900))
      .attr("width", xTimeScale(maxX)-padding)
      .attr("height", yScale(0)-yScale(900))
      .attr("class", "in-range")

    //legend init
    var legendPadding = 25;
    var legendLineLength = 50;
    var legendPointWidth = 6;
    var labelX = padding+legendPadding;
    var legend = graph.append("g");
    var legendBack = legend.append("rect")
      .attr("x", padding)
      .attr("y", h-paddingLarge+padding)
      .attr("width", w-2*padding)
      .attr("height", 50)
      .style("fill", "#ddd")
      .style("stroke", "black")

    //datasets
    for(var i=0; i<data.length; i++) {
      var dataSetName = metaData[i].name;
      var dataSetUnit = metaData[i].unit;
      var datasetMin = metaData[i].refMin;
      var datasetMax = metaData[i].refMax;
      //legend
      var labelText = legend.append("text")
        .attr("x", labelX)
        .attr("y", h-padding)
        .text(dataSetName+" ("+dataSetUnit+")");
      var textWidth = labelText.node().getComputedTextLength();
      legend.append("line")
        .attr("x1", labelX)
        .attr("x2", labelX + textWidth)
        .attr("y1", h-paddingLarge+padding+padding/2)
        .attr("y2", h-paddingLarge+padding+padding/2)
        .attr("class", "series"+Math.min(i,6)+"-line series-line");
      legend.append("rect")
        .attr("width", legendPointWidth)
        .attr("height", legendPointWidth)
        .attr("x", labelX + textWidth/2 - legendPointWidth/2)
        .attr("y", h-paddingLarge+padding+padding/2-(legendPointWidth/2))
        .attr("class", "series"+Math.min(i,6)+"-point series-point")
      labelX = labelX + textWidth + legendPadding;

      //trendlines
      var lineData = this.linify(data[i]);
      var pointWidth = 6;
      var tooltipWidth = 60;
      var tooltipHeight = 30;
      var tooltipTailHeight = 10;
      var tooltipPadding = 6;
      var trendLine = graph.append("g")
        .attr("name", dataSetName)
        .attr("unit", dataSetUnit)
        .attr("refMin", datasetMin)
        .attr("refMax", datasetMax)
      trendLine.selectAll("line")
          .data(lineData)
        .enter().append("line")
          .attr("x1", function(d: any){return xTimeScale(d.p1[0])})
          .attr("y1", function(d: any){return yScale(d.p1[1])})
          .attr("x2", function(d: any){return xTimeScale(d.p2[0])})
          .attr("y2", function(d: any){return yScale(d.p2[1])})
          .attr("class", "series"+Math.min(i,6)+"-line series-line");

      trendLine.selectAll("rect")
          .data(data[i])
        .enter().append("rect")
          .attr("width", pointWidth)
          .attr("height", pointWidth)
          .attr("x", function(d: any) {return xTimeScale(d[0])-(pointWidth/2)})
          .attr("y", function(d: any) {return yScale(d[1])-(pointWidth/2)})
          .attr("class", "series"+Math.min(i,6)+"-point series-point")
          .on("mouseover", function(d: any) {
            d3.select("."+d3.select(this.parentNode).attr("name"))
              .attr("id", "highlighted");
            var tooltip = d3.select(this.parentNode.parentNode)
              .append("g")
                .attr("class", "value-tooltip tooltip-unlocked");
            var minTip = d3.select(this.parentNode.parentNode)
              .append("g")
                .attr("class", "value-tooltip tooltip-unlocked");
            var maxTip = d3.select(this.parentNode.parentNode)
              .append("g")
                .attr("class", "value-tooltip tooltip-unlocked");
            tooltip.append("rect")
              .attr("x", xTimeScale(d[0])-(tooltipWidth/2))
              .attr("y", yScale(d[1])-(tooltipHeight+tooltipTailHeight))
              .attr("width", tooltipWidth)
              .attr("height", tooltipHeight)
              .attr("rx", tooltipHeight/4)
              .attr("ry", tooltipHeight/4);
            minTip.append("rect")
              .attr("x", 0)
              .attr("y", yScale(0)-tooltipHeight/2)
              .attr("width", tooltipWidth)
              .attr("height", tooltipHeight)
              .attr("rx", tooltipHeight/4)
              .attr("ry", tooltipHeight/4);
            maxTip.append("rect")
              .attr("x", 0)
              .attr("y", yScale(900)-tooltipHeight/2)
              .attr("width", tooltipWidth)
              .attr("height", tooltipHeight)
              .attr("rx", tooltipHeight/4)
              .attr("ry", tooltipHeight/4);
            tooltip.append("polygon")
              .attr("points", xTimeScale(d[0])+","+(yScale(d[1])-(pointWidth/2))+" "+(xTimeScale(d[0])-5)+","+(yScale(d[1])-tooltipTailHeight-1)+" "+(xTimeScale(d[0])+5)+","+(yScale(d[1])-tooltipTailHeight-1))
            tooltip.append("text")
              .attr("x", xTimeScale(d[0])-(tooltipWidth/2)+tooltipPadding)
              .attr("y", yScale(d[1])-(tooltipHeight+tooltipTailHeight)/2)
              .text(d[2]+" "+d3.select(this.parentNode).attr("unit"));
            minTip.append("text")
              .attr("x", tooltipPadding)
              .attr("y", yScale(0)+tooltipPadding)
              .text(d3.select(this.parentNode).attr("refMin")+" "+d3.select(this.parentNode).attr("unit"));
            maxTip.append("text")
              .attr("x", tooltipPadding)
              .attr("y", yScale(900)+tooltipPadding)
              .text(d3.select(this.parentNode).attr("refMax")+" "+d3.select(this.parentNode).attr("unit"));
            d3.selectAll(".value-tooltip").each(function(){
              var tt = d3.select(this);
              var tooltipLabel = tt.select("text");
              var node: SVGTSpanElement = <SVGTSpanElement>tooltipLabel.node();
              var tooltipLabelWidth = node.getComputedTextLength();
              var rec = tt.select("rect")
                .attr("width", Math.max(tooltipLabelWidth+(2*tooltipPadding), tooltipWidth/2+2*tooltipPadding) );
              var tooltipX = parseFloat(rec.attr("x"));
              if(tooltipX+tooltipLabelWidth+tooltipPadding*2 > w ) {
                var overflow = (tooltipX+tooltipLabelWidth+tooltipPadding*2) - w;
                rec.attr("x", tooltipX-overflow);
                tooltipLabel.attr("x", tooltipX-overflow+tooltipPadding);
              }
              var tooltipY = parseFloat(rec.attr("y"));
              if(tooltipY < 0) {
                rec.attr("y", 0);
                tooltipLabel.attr("y", parseFloat(tooltipLabel.attr("y"))-tooltipY);
              }
            });
          })
          .on("mouseout", function() {
            if(d3.select(this).attr("class").indexOf("tooltip-locked") === -1) {
              var tts = d3.select(this.parentNode.parentNode)
                .selectAll(".tooltip-unlocked")
                .remove();
            }
            d3.select("#highlighted").attr("id", null);
          })
          .on("click", function(d: any){
            var pts = xTimeScale(d[0])+","+(yScale(d[1])-(pointWidth/2))+" "+(xTimeScale(d[0])-5)+","+(yScale(d[1])-tooltipTailHeight-1)+" "+(xTimeScale(d[0])+5)+","+(yScale(d[1])-tooltipTailHeight-1);
            var tail = d3.select(this.parentNode.parentNode).selectAll("polygon[points='"+pts+"']");
            if(tail.node()===null){return;}
            var tt = d3.select(tail.node().parentNode);
            var ttclass = tt.attr("class");
            if(ttclass.indexOf("tooltip-locked") !== -1) {
              tt.remove();
            } else {
              tt.attr("class", ttclass.replace("tooltip-unlocked", "tooltip-locked"));
            }
          });
    }
    //legend finish
    var legendWidth = labelX-legendPadding;
    var desiredLegendWidth = w-padding*2
    if(legendWidth > desiredLegendWidth) {
      var legendRatio = desiredLegendWidth/legendWidth;
      legend.selectAll("text").each(function(){
        var select = d3.select(this);
        var selectX = parseFloat(select.attr("x"));
        var node: SVGTSpanElement = <SVGTSpanElement>select.node();
        var selectLength = node.getComputedTextLength();
        select.attr("textLength", selectLength*legendRatio);
        select.attr("lengthAdjust", "spacingAndGlyphs");
        select.attr("x", selectX*legendRatio+padding*(1-legendRatio));
      });
      legend.selectAll("rect").each(function(){
        var select = d3.select(this);
        var selectX = parseFloat(select.attr("x"));
        select.attr("x", selectX*legendRatio+padding*(1-legendRatio))
      });
      legend.selectAll("line").each(function(){
        var select = d3.select(this);
        var selectX1 = parseFloat(select.attr("x1"));
        var selectX2 = parseFloat(select.attr("x2"));
        select.attr("x1", (selectX1)*legendRatio+padding*(1-legendRatio));
        select.attr("x2", (selectX1+(selectX2-selectX1))*legendRatio+padding*(1-legendRatio));
      });
      legendBack.attr("width", desiredLegendWidth);
    } else {
      legendBack.attr("width", legendWidth);
    }
  }
}
