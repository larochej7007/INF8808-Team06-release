'use strict'

import * as helper from './scripts/helper.js'
import * as scales from './scripts/scales.js'
import * as viz from './scripts/viz.js'
import * as tooltip from './scripts/tooltip.js'


import d3Tip from 'd3-tip'

/**
 * @file This file is the entry-point for the the code for TP4 for the course INF8808.
 * @author Olivia Gélinas
 * @version v1.0.0
 */

export function getUniPlot () {
  const margin = {
    top: 75,
    right: 200,
    bottom: 100,
    left: 80
  }

  let currentYear = 2000

  let svgSize, graphSize

  setSizing()

  const g = helper.generateG(margin)

  const tip = d3Tip().attr('class', 'd3-tip').html(function (d) { return tooltip.getContents(d) })
  g.call(tip)

  helper.appendAxes(g)
  helper.appendGraphLabels(g)
  //helper.placeTitle(g, graphSize.width)

  //helper.drawButton(g, currentYear, graphSize.width)
  viz.positionLabels(g, graphSize.width, graphSize.height)
  helper.placeTitle(g, graphSize.width)
/*
  // Time slider
  var slider = sliderHorizontal()
    .min(1940)
    .max(2020)
    .width(800)
    .ticks(6)
    .default(1960)
  

  var s = d3.select('.unidirectplot-svg')
  .append('svg')
  .attr('class', 'slider')
  .attr('width', '1200')
  .attr('height', '100')
  .append('g')
  .attr('transform', 'translate( 100,30)')
  s.call(slider)
  
*/
d3.csv('./DataFinal.csv').then((data) => {
  // Add the path using this helper function
  g.append('rect')
    .attr('x', 100)
    .attr('y', 50)
    .attr('width', 250)
    .attr('height', 400)
    .attr('stroke', 'black')
    .attr('fill', '#32CD32');

  g.append('rect')
  .attr('x', 400)
  .attr('y', 50)
  .attr('width', 250)
  .attr('height', 400)
  .attr('stroke', 'black')
  .attr('fill', '#FF0000');
  
  console.log(data)
  var dataByYear = helper.GroupByYear(data)
  console.log(dataByYear)
  data =dataByYear[currentYear-1960].values
  console.log(data)
  const xScale = scales.setXScale(graphSize.width, data)
  const yScale = scales.setYScale(graphSize.height, data)


  helper.drawYAxis(yScale)
  helper.drawXAxis(xScale,graphSize.width)


  build(data, xScale, yScale)

  viz.setCircleHoverHandler(tip)

})
  

  //helper.drawButton(g, currentYear, graphSize.width)

  /**
   *   This function handles the graph's sizing.
   */
  function setSizing () {
    svgSize = {
      width: 1000,
      height: 600
    }

    graphSize = {
      width: svgSize.width - margin.right - margin.left,
      height: svgSize.height - margin.bottom - margin.top
    }

    helper.setCanvasSize(svgSize.width, svgSize.height)
  }

  /**
   * This function builds the graph.
   *
   * @param {object} data The data to be used
   * @param {*} xScale The x scale for the graph
   * @param {*} yScale The y scale for the graph
   */
  function build (data, xScale, yScale) {
    viz.drawCircles(data,xScale,yScale, tip)
    viz.setTitleText(currentYear)
  }
}
