import * as helper from './scripts/helper.js'
import * as preproc from './scripts/preprocess.js'
import * as viz from './scripts/viz.js'
import * as legend from './scripts/legend.js'
import * as hover from './scripts/hover.js'
import * as util from './scripts/util.js'
import * as tooltip from './scripts/tooltip.js'

import * as d3Chromatic from 'd3-scale-chromatic'
import d3Tip from 'd3-tip'
import { color } from 'd3-color'

/**
 * @file This file is the entry-point for the the code for TP3 for the course INF8808.
 * @author Olivia Gélinas
 * @version v1.0.0
 */


export function GetHeatmap() {
  let bounds
  let svgSize
  let graphSize

  const margin = { top: 100, right: 200, bottom: 200, left: 100 }

  const xScale = d3.scaleLinear()
  const yScale = d3.scaleBand()

  //const colorScale = d3.scaleDiverging(t => d3.interpolateRdBu(1 - t))
  const positiveColorScale = d3.scaleSequential(d3Chromatic.interpolateReds)
  const negativeColorScale = d3.scaleSequential(t => d3Chromatic.interpolateBlues(1- t))


  d3.csv('./data.csv', d3.autoType).then(function (data) {
    var countryNames = preproc.getNeighborhoodNames(data)
    data = preproc.filterYears(data, 1900, 2020)
    var result = preproc.orderByAVG(data, countryNames)
    data = result[0]
    var countrySummary = result[1]
    var countryNames = result[2]

    //console.log(data.slice())
    //console.log(countryNames)
    //data = 
    data = preproc.fillMissingData(data, countrySummary, 1900, 2020, util.range)

    viz.setColorScaleDomain(positiveColorScale, negativeColorScale, data)

    var assembled = preproc.assembleRegionData(countrySummary)


    legend.initGradient(positiveColorScale, negativeColorScale)
    legend.initLegendBar()
    legend.initLegendAxis()

    const g = helper.generateG(margin)
    viz.appendRects(data)
    helper.appendAxes(g)

    setSizing()
    build()

    const tip = d3Tip().attr('class', 'd3-tip').html(function (d) { return tooltip.getContents(d) })
    g.call(tip)
    viz.setCircleHoverHandler(tip)

    /**
     *   This function handles the graph's sizing.
     */
    function setSizing () {
      bounds = d3.select('#heatmap').node().getBoundingClientRect()

      svgSize = {
        width: bounds.width,
        height: bounds.height
      }

      graphSize = {
        width: svgSize.width - margin.right - margin.left,
        height: svgSize.height - margin.bottom - margin.top
      }

      helper.setCanvasSize(svgSize.width, svgSize.height)
    }

    /**
     *   This function builds the graph.
     */
    function build () {
      viz.updateXScale(xScale, data, graphSize.width, util.range)
      viz.updateYScale(yScale, countryNames, graphSize.height)

      viz.drawXAxis(xScale, graphSize.height, yScale)
      viz.drawYAxis(yScale, xScale, (graphSize.width + xScale(1901)), margin)

      viz.positionXTicks(graphSize.height, yScale, xScale)

      viz.updateRects(xScale, yScale, positiveColorScale, negativeColorScale, graphSize.width)
      d3.select('#heatmap')
        .select('svg')
        .select(".y-axis-heatmap")
        .append('text')
        .attr('x', 9 )
        .attr('y', yScale.range()[0] + 4 * yScale.bandwidth() + 4)
        .attr('fill', 'currentColor')
        .attr('font-size', 'larger')
        .text("Global-land")


      hover.setRectHandler(xScale, yScale, hover.rectSelected, hover.rectUnselected, hover.selectTicks, hover.unselectTicks, margin, graphSize.width + xScale(1901))

      legend.draw(margin.left, margin.top/2, 15, (graphSize.width + xScale(1901)), 'url(#positiveGradient)','url(#negativeGradient)', positiveColorScale, negativeColorScale)
    }

    window.addEventListener('resize', () => {
      setSizing()
      build()
    })
  })
}

