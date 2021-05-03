'use strict'

import * as preproc from './scripts/preprocess.js'
import * as viz from './scripts/viz.js'
import * as helper from './scripts/helper.js'

import d3Tip from 'd3-tip'
import d3Legend, { legendColor } from 'd3-svg-legend'

/**
 * @file This file is the entry-point for the the code for linechart viz
 * @author Jonathan Laroche
 * @version v1.0.0
 */

export function clearLineChart() {
  d3.select("#linechart").html("");
}

var selectedData = {}

export function GetLineChart (countryName) {
 
  let bounds
  let svgSize
  let graphSize

  const margin = 40;
  const marginVertical = 2 * margin;
  const TIME_RANGE_LIMITS = [1900, 2020]

  d3.select("#linechart")
    .append('svg').attr('class', 'linechart-svg')
    .attr('style', 'font:12px sans-serif');

   var svg = d3.select(".linechart-svg");
   var svgGraph = svg.append('g').attr("class", "linechart-g");

  const xScale = d3.scaleLinear()
  const yScale = d3.scaleLinear()

  d3.csv('./temperature_variation_data.csv').then(function (data) {
    
    data = data.filter((d) => {
      return d.Country == countryName
    })

    data = preproc.summarizeData(data, TIME_RANGE_LIMITS)
    
    setSizing();
    svgGraph.attr("transform", "translate(" + margin + " ," + marginVertical + ")")
    viz.setGraphTitle(svg, countryName)
    viz.appendAxes(svgGraph)
    viz.initHoverItems(svgGraph)
    viz.initLegend(svgGraph)

    build()

    /**
     *   This function builds the graph.
     */
    function build () {
      viz.updateXScale(xScale, 1900, 2020, graphSize.width)
      viz.updateYScale(yScale, data, graphSize.height)

      // Add scales to axis
      var x_axis = d3.axisBottom(xScale)
        .ticks(24)
        .tickFormat((y) => `${y}`);

      svgGraph
        .select(".x-axis-linechart")
        .attr("transform", "translate(" + 0 + " ," + (graphSize.height) + ")")
        .call(x_axis)

      var y_axis = d3.axisLeft()
        .scale(yScale)
        .tickSize(4)
        .tickSize(-graphSize.width)
        .tickFormat((y) => `${y}°C`);

      svgGraph
        .select(".y-axis-linechart")
        .call(y_axis);

      svgGraph.selectAll(".y-axis-linechart .tick line")
        .style("visibility", "visible")
        .style("stroke-dasharray", "1 1")
        .style("stroke",'#CCCCCC')
        .filter(d => { return d == 0 })
        .style("visibility", "visible")
        .style("stroke-dasharray", "none")
        .style("stroke",'#000000');

          // Add the line
      svgGraph.selectAll(".intervalLine")
        .data(data)
        .join('line')  
        .attr("class", "intervalLine")
        .style("stroke", "#b863b2")
        .style("stroke-width", 2)
        .attr("stroke-dasharray", 2)
        .attr("x1", d => { return xScale(d.Year) } )
        .attr("y1", d => { return yScale(d.Min) })
        .attr("x2", d => { return xScale(d.Year) })
        .attr("y2", d => { return yScale(d.Max) })

      svgGraph.selectAll(".maxLine").remove()
      svgGraph.append("path")
        .datum(data)
        .attr("class", "maxLine")
        .style("fill", "none")
        .attr("stroke", "#d40b20")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
          .x(function(d) { return xScale(d.Year) })
          .y(function(d) { return yScale(d.Max)})
        );

      svgGraph.selectAll(".minLine").remove()
      svgGraph.append("path")
        .datum(data) 
        .attr("class", "minLine")
        .attr("fill", "none")
        .attr("stroke", "#0c31d2")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
          .x(function(d) { return xScale(d.Year) })
          .y(function(d) { return yScale(d.Min)})
        );

      svgGraph.selectAll(".avgLine").remove()
      svgGraph.append("path")
        .datum(data) 
        .attr("class", "avgLine")
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

      // Create the circle that travels along the curve of chart
      var focus = svgGraph.select(".focusLine")
      var focusText = svgGraph.select(".focusText")

      // Create a rect on top of the svg area: this rectangle recovers mouse position
      svgGraph
        .select(".focusRect")
        .style("pointer-events", "all")
        .attr('width', graphSize.width + 10)
        .attr('height', graphSize.height)
        .on('mouseover', mouseover)
        .on('mousemove', mousemove)
        .on('mouseout', mouseout);

      // Legend stuff
      const legendScale = d3.scaleOrdinal()
      .domain([0, 1, 2])
      .range(['#d40b20', 'black', '#0c31d2'])

      var padding = graphSize.width / 2 - 65 // On rajoute 15 pour ne pas avoir d'overlapping avec les données de 2015 et la légende
      svgGraph.select("#legend-linechart")
        .attr('transform', 'translate(' + padding + ',' + (graphSize.height + 0.5 * marginVertical) + ')') // Le -10 permet de relever un peu la légende
    
      var legend = d3Legend.legendColor()
        .shape('line')
        .cells(3)
        .labels(['Maximum', 'Average', 'Minimum'])
        .scale(legendScale)
        .orient("horizontal")
        .labelWrap(40)
        .shapeWidth(40)
        .shapePadding(20);


      svgGraph.select("#legend-linechart")
        .attr('transform', 'translate(' + padding + ',' + (graphSize.height + 0.5 * marginVertical) + ')') // Le -10 permet de relever un peu la légende
        .call(legend)
      
      function mouseout() {
        focus.style("opacity", 0)
        focusText.style("opacity", 0)
      }

      // What happens when the mouse move -> show the annotations at the right positions.
      function mouseover() {
        focus.style("opacity", 1)
        focusText.style("opacity",1)
      }

      function mousemove() {
        // recover coordinate we need
        console.log(d3.mouse(this)[0])
        var x0 = xScale.invert(d3.mouse(this)[0]);
        console.log(x0)
        var i = bisect(data, x0, 1) - 1;
        selectedData = data[i]
        focus
          .attr("x1", xScale(selectedData.Year))
          .attr("y1", yScale.range()[0])
          .attr("x2", xScale(selectedData.Year))
          .attr("y2", yScale.range()[1])

        focusText
          .attr("x", xScale(selectedData.Year) - 35)
          .attr("y", -40)
          .html("")
          .append("tspan")
          .html("Year: " + selectedData.Year)

        focusText
          .append("tspan")
          .attr("x", xScale(selectedData.Year) - 35)
          .attr("dy", 12)
          .html("Max: " + selectedData.Max + "°C")

        focusText
          .append("tspan")
          .attr("dy", 12)
          .attr("x", xScale(selectedData.Year) - 35)
          .html("Avg: " + selectedData.AVG  + "°C")

        focusText
          .append("tspan")
          .attr("dy", 12)
          .attr("x", xScale(selectedData.Year) - 35)
          .html("Min: " + selectedData.Min  + "°C")
        }
      }


    /**
     *   This function handles the graph's sizing.
     */
    function setSizing () {
      bounds = d3.select('#linechart').node().getBoundingClientRect()

      svgSize = {
        width: bounds.width,
        height: bounds.height
      }

      graphSize = {
        width: svgSize.width - 2*margin,
        height: svgSize.height - 2*marginVertical
      }

      helper.setCanvasSize(svgSize.width, svgSize.height)
    }

    window.addEventListener('resize', () => {
      setSizing()
      build()
    })
  })
}

