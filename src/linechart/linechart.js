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
   var margin = 30;
   //var padding= 30;
   //var width = 1200;
   //var height = 550;
   //svg.attr("width", width);
   //svg.attr("height", height);

  const xScale = d3.scaleLinear()
  const yScale = d3.scaleLinear()

  var minmax =  new Array, dataset, data2;
  const tip = d3Tip().attr('class', 'd3-tip').html(function (d) { return tooltip.getContents(d) })

  d3.select('.linechart-svg').call(tip)
  d3.csv('./data.csv').then(function (data) {
    
    data = data.filter((d) => {
      return d.Country == "Canada"
    })

    data = preproc.sumarizeYears(data, 1900, 2020)

    //console.log(data.slice())
    //data = preproc.minMaxMonthlyAnn(data)
    
    setSizing(); 
    viz.updateXScale(xScale, 1900, 2020, graphSize.width, margin)
    viz.updateYScale(yScale, data, graphSize.height, margin)
    
    // Add scales to axis
    var x_axis = d3.axisBottom()
                   .scale(xScale)
                   .tickSize(4);

    svg.append("g")
      .attr("transform", "translate(" + margin + " ," + (graphSize.height + margin) + ")")
      .call(x_axis)
      
    var y_axis = d3.axisLeft()
                  .scale(yScale)
                  .tickSize(4);

    svg.append("g")
       .attr("transform", "translate(" + margin + ", " + margin + ")")
       .call(y_axis);
        
    // Add the line
    svg.append("path")
      .datum(data)
      .attr("class", ids)
      .attr("transform", "translate(" + margin + ", "+ margin + ")")
      .style("fill", "none")
      .attr("stroke", "#d40b20")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return xScale(d.Year) })
        .y(function(d) { return yScale(d.Max)})
      );

    svg.append("path")
      .datum(data)
      .attr("class", ids)
      .attr("transform", "translate(" + margin + ", "+ margin + ")")
      .attr("fill", "none")
      .attr("stroke", "#0c31d2")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return xScale(d.Year) })
        .y(function(d) { return  yScale(d.Min)})
      );

      data.forEach(function(d) {
        svg.append('line')  
        .style("stroke", "#bbbbbb")
        .style("stroke-width", 2)
        .attr("stroke-dasharray", 2)
        .attr("transform", "translate(" + margin + ", "+ margin + ")")
        .attr("x1",xScale(d.Year) )
        .attr("y1", yScale(d.Min))
        .attr("x2", xScale(d.Year))
        .attr("y2",  yScale(d.Max))
      });
    /**
     *   This function handles the graph's sizing.
     */
    function setSizing () {
      bounds = d3.select('svg').node().getBoundingClientRect()

      svgSize = {
        width: bounds.width,
        height: bounds.height / 2
      }

      graphSize = {
        width: svgSize.width - 2*margin,
        height: svgSize.height - 2*margin
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

