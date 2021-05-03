'use strict'

import * as preproc from './scripts/preprocess.js'
import * as viz from './scripts/viz.js'
import * as helper from './scripts/helper.js'

/**
 * @file This file is the entry-point for the the code for linechart viz
 * @author Jonathan Laroche
 * @version v1.0.0
 */

export function clearLineChart() {
  d3.select("#linechart").html("");
}

export function GetLineChart (countryName) {
 
  let bounds
  let svgSize
  let graphSize

  const margin = 80;
  const marginVertical = margin;
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
    
    // bisect used for the hover
    var bisect = d3.bisector(function(d) { return d.Year; }).left;

    viz.initHoverItems(svgGraph)
    viz.initLegend(svgGraph)

    helper.appendGraphLabels(svgGraph)

    build()

    /**
     *   This function builds the graph.
     */
    function build () {
      viz.updateXScale(xScale, TIME_RANGE_LIMITS, graphSize.width)
      viz.updateYScale(yScale, data, graphSize.height)

      viz.drawXAxis(xScale, graphSize, svgGraph)
      viz.drawYAxis(yScale, graphSize, svgGraph)
      helper.positionLabels(graphSize.width, graphSize.height)

      viz.drawLines(data, xScale, yScale, svgGraph)
      
      viz.drawLegend(graphSize, marginVertical, svgGraph)
      viz.setHoverHandler(data, xScale, yScale, graphSize, bisect, svgGraph)
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

