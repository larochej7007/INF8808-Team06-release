'use strict'

import * as preproc from './scripts/preprocess.js'
import * as viz from './scripts/viz.js'
import * as helper from './scripts/helper.js'

import d3Tip from 'd3-tip'
import d3Legend, { legendColor } from 'd3-svg-legend'
import { style } from 'd3-selection'

/**
 * @file This file is the entry-point for the the code for TP2 for the course INF8808.
 
 * @version v1.0.0
 */

export function clearLineChart() {
  d3.select("#linechart").html("");
}

var selectedData = {}

export function GetLineChart (countryName) {
 
  console.log(countryName)
  let bounds
  let svgSize
  let graphSize
  

  d3.select("#linechart")
    .append('svg').attr('class', 'linechart-svg')
    .attr('style', 'font:12px sans-serif');

   var svg = d3.select(".linechart-svg");
   var margin = 30;
   var marginVerticalBottom = 2 * margin;

  const xScale = d3.scaleLinear()
  const yScale = d3.scaleLinear()

  var minmax =  new Array, dataset, data2;
  const tip = d3Tip().attr('class', 'd3-tip').html(function (d) { return tooltip.getContents(d) })

  d3.select('.linechart-svg').call(tip)
  d3.csv('./data.csv').then(function (data) {
    
    data = data.filter((d) => {
      return d.Country == countryName
    })

    data = preproc.sumarizeYears(data, 1900, 2020)

    //console.log(data.slice())
    //data = preproc.minMaxMonthlyAnn(data)

    
    
    setSizing(); 
    viz.updateXScale(xScale, 1900, 2020, graphSize.width, margin)
    viz.updateYScale(yScale, data, graphSize.height, margin)
    
    svg.append('text')
      .text("Data for: " + countryName)
      .attr("x", 0)
      .attr("y", 0)
      .attr("text-anchor", "start")
      .attr("dominant-baseline", "hanging")
      .attr("style", "font-family: Times New Roman; font-size: 24; stroke: #000000; fill: #000000;")

    // Add scales to axis
    var x_axis = d3.axisBottom(xScale)
                   .ticks(24)
                   .tickFormat((y) => `${y}`);

    svg.append("g")
      .attr("class", "x-axis-linechart")
      .attr("transform", "translate(" + margin + " ," + (graphSize.height) + ")")
      .call(x_axis)
      
    var y_axis = d3.axisLeft()
                  .scale(yScale)
                  .tickSize(4)
                  .ticks(24)
                  .tickSize(-graphSize.width)
                  .tickFormat((y) => `${y}`);

    svg.append("g")
       .attr("transform", "translate(" + margin + ", " + margin + ")")
       .call(y_axis);
        
    // Add the line
    data.forEach(function(d) {
      svg.append('line')  
      .style("stroke", "#b863b2")
      .style("stroke-width", 2)
      .attr("stroke-dasharray", 2)
      .attr("transform", "translate(" + margin + ", "+ margin + ")")
      .attr("x1",xScale(d.Year) )
      .attr("y1", yScale(d.Min))
      .attr("x2", xScale(d.Year))
      .attr("y2",  yScale(d.Max))
    });

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

    svg.append("path")
      .datum(data)
      .attr("class", ids)
      .attr("transform", "translate(" + margin + ", "+ margin + ")")
      .attr("fill", "none")
      .attr("stroke", "#000000")
      .attr("opacity", "1")
      .attr("stroke-width", 1)
      .attr("d", d3.line()
        .x(function(d) { return xScale(d.Year) })
        .y(function(d) { return  yScale(d.AVG)})
      );

      // Add X axis --> it is a date format
    var bisect = d3.bisector(function(d) { return d.Year; }).left;
    var x = d3.scaleLinear()
      .domain([1900,2020])
      .range([ margin, graphSize.width + margin]);

    // Create the circle that travels along the curve of chart
    var focus = svg
      .append('g')
      .append('line')
        .style("fill", "none")
        .attr("stroke", "black")
        .style("opacity", 0)

    var focusText = svg
      .append('g')
      .append('text')
      .style("opacity", 0)
      .attr("text-anchor", "left")
      .attr("alignment-baseline", "middle")

    // Create a rect on top of the svg area: this rectangle recovers mouse position
    svg
      .append('rect')
      .style("fill", "none")
      .style("pointer-events", "all")
      .attr('width', graphSize.width)
      .attr('height', graphSize.height)
      .attr('x', margin)
      .attr('y', margin)
      .on('mouseover', mouseover)
      .on('mousemove', mousemove)
      .on('mouseout', mouseout);

      // Legend stuff
      const scale = d3.scaleOrdinal()
      .domain([0, 1, 2])
      .range(['#d40b20', 'black', '#0c31d2'])

      var padding = graphSize.width / 2 - 65 // On rajoute 15 pour ne pas avoir d'overlapping avec les données de 2015 et la légende
      svg.append('g')
        .attr('id', 'legend-linechart')
        .attr('transform', 'translate(' + padding + ',' + (graphSize.height + 1.5 * margin) + ')') // Le -10 permet de relever un peu la légende
    
      var legend = d3Legend.legendColor()
        .shape('line')
        .cells(3)
        .labels(['Maximum', 'Average', 'Minimum'])
        .scale(scale)
        .orient("horizontal")
        .labelWrap(40)
        .shapeWidth(40)
        .shapePadding(20);
    
    
      svg.select('#legend-linechart')
        .call(legend)


    // What happens when the mouse move -> show the annotations at the right positions.
    function mouseover() {
      focus.style("opacity", 1)
      focusText.style("opacity",1)
    }

    function mousemove() {
      // recover coordinate we need
      console.log(d3.mouse(this)[0])
      var x0 = xScale.invert(d3.mouse(this)[0] - margin);
      console.log(x0)
      var i = bisect(data, x0, 1) - 1;
      selectedData = data[i]
      focus
        .attr("x1", xScale(selectedData.Year) + margin)
        .attr("y1", yScale.range()[0] + margin)
        .attr("x2", xScale(selectedData.Year) + margin)
        .attr("y2", yScale.range()[1]  + margin)
        
      focusText
        .html("Year:" + selectedData.Year + "- Max:" + selectedData.Max + "  -  " + "Min:" + selectedData.Min + "  -  " + "AVG:" + selectedData.AVG)
        .attr("x", xScale(selectedData.Year)+5)
        .attr("y", 20)
      }
    function mouseout() {
      focus.style("opacity", 0)
      focusText.style("opacity", 0)
    }


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
        height: svgSize.height - 1 * margin - marginVerticalBottom
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

