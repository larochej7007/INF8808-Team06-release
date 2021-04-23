'use strict'

import * as preproc from './scripts/preprocess.js'
import * as viz from './scripts/viz.js'
import * as helper from './scripts/helper.js'

import d3Tip from 'd3-tip'

/**
 * @file This file is the entry-point for the the code for TP2 for the course INF8808.
 
 * @version v1.0.0
 */

export function GetLineChart () {
 

  let bounds
  let svgSize
  let graphSize

   var svg = d3.select(".linechart-svg");
   var margin = 10;
   var padding= 10;
   var width = 1200;
   var height = 550;
   svg.attr("width", width + 2 * margin);
   svg.attr("height", height + 2 * margin);

  const xScale = d3.scaleLinear()
 
  const yScale = d3.scaleLinear()
  var minmax =  new Array, dataset, data2;
  const tip = d3Tip().attr('class', 'd3-tip').html(function (d) { return tooltip.getContents(d) })
  var Months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

var ordinalScale = d3.scaleOrdinal()
  .domain(Months)
  .range(['black', 'white']);

  d3.select('.linechart-svg').call(tip)

  d3.csv('./datafile.csv').then(function (data) {
   
    dataset = preproc.strictData(data);   //  ann>1900
    minmax = preproc.minMaxMonthlyAnn(dataset["Data"],dataset["Years"], minmax)
    setSizing(); 
    viz.updateXScale(xScale, dataset, width)
    viz.updateYScale(yScale, dataset["Data"], height, margin)
    
    // Add scales to axis
    var x_axis = d3.axisBottom()
                   .scale(xScale)
                    
                    .tickSize(4)
                    ;
    svg.append("g")
      .attr("transform",  "translate( 30 ,"+ height + ")")
      .call(x_axis)
      
    var y_axis = d3.axisLeft()
                  .scale(yScale)
                  .tickSize(4);
                  ;
    svg.append("g")
       .attr("transform", "translate(30, 0)")
       .call(y_axis);

   
        
    // Add the line
    
    svg.append("path")
      .datum(minmax)
      .attr("class", ids)
      .style("fill", "none")
      .attr("stroke", "#d40b20")
      .attr("stroke-width", 1.5)
    
       .attr("d", d3.line()
        .x(function(d) { return 30 + xScale(d["Year"]) })
        .y(function(d) { return yScale(d["max"]) -margin })
      );

    svg.append("path")
      .datum(minmax)
       .attr("class", ids)
      .attr("fill", "none")
      .attr("stroke", "#0c31d2")
      .attr("stroke-width", 1.5)
     
      .attr("d", d3.line()
        .x(function(d) { return 30 + xScale(d["Year"]) })
        .y(function(d) { return  yScale(d["min"]) -margin})
      );

      minmax.forEach(function(d) {
        svg.append('line')  
        .style("stroke", "#b863b2")
        .style("stroke-width", 2)
          .attr("stroke-dasharray", 2)
        .attr("x1",30 + xScale(d["Year"]) )
        .attr("y1", yScale(d["min"]) -margin)
        .attr("x2", 30 + xScale(d["Year"]) )
        .attr("y2",  yScale(d["max"]) -margin )
      });
    /**
     *   This function handles the graph's sizing.
     */
    function setSizing () {
      bounds = d3.select('svg').node().getBoundingClientRect()

      svgSize = {
        width: width,
        height: height
      }

      graphSize = {
        width: svgSize.width - margin,
        height: svgSize.height - margin
      }

      helper.setCanvasSize(svgSize.width, svgSize.height)
    }

    const ids = function () {
      return "line-"+id++;
    }

    

    window.addEventListener('resize', () => {
      setSizing()
     
    })
  })
}

