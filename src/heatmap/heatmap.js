import * as helper from './scripts/helper.js'
import * as preproc from './scripts/preprocess.js'
import * as viz from './scripts/viz.js'
import * as legend from './scripts/legend.js'
import * as hover from './scripts/hover.js'
import * as util from './scripts/util.js'
import * as tooltip from './scripts/tooltip.js'

import * as d3Chromatic from 'd3-scale-chromatic'
import d3Tip from 'd3-tip'

/**
 * @file This file handle the temperature variation heatmap visualisation
 * @author Jonathan Laroche
 * @version v1.0.0
 */


export function getHeatmap() {
  let bounds
  let svgSize
  let graphSize

  const TIME_RANGE_LIMITS = [1900, 2020]
  const margin = { top: 100, right: 200, bottom: 100, left: 100 }

  const xScale = d3.scaleLinear()
  const yScale = d3.scaleBand()

  const positiveColorScale = d3.scaleSequential(d3Chromatic.interpolateReds)
  const negativeColorScale = d3.scaleSequential(t => d3Chromatic.interpolateBlues(1- t))


  d3.csv('./temperature_variation_data.csv', d3.autoType).then(function (data) {
    var countryNames = preproc.getCountryNames(data)
    data = preproc.filterYears(data, TIME_RANGE_LIMITS)
    countryNames = preproc.orderCountriesByAVG(data, countryNames)
    data = preproc.fillMissingData(data, countryNames, TIME_RANGE_LIMITS, util.range)

    viz.setColorScaleDomain(data, positiveColorScale, negativeColorScale)

    legend.initGradient(positiveColorScale, negativeColorScale)
    legend.initLegendAxis()

    const g = helper.generateG(margin)
    viz.appendRects(data)
    helper.appendAxes(g)

    setSizing()
    build()

    const tip = d3Tip().attr('class', 'd3-tip').html(function (d) { return tooltip.getContents(d) })
    g.call(tip)
    viz.setRectHoverTooltipHandler(tip)

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

    function addGlobalLandSummary() {
      d3.select('#heatmap')
        .select('svg')
        .select(".y-axis-heatmap")
        .append('text')
        .attr('x', 9 )
        .attr('y', yScale.range()[0] + 2.5 * yScale.bandwidth() + 4 )
        .attr('fill', 'currentColor')
        .attr('font-size', 'larger')
        .text("Global-land")
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
      addGlobalLandSummary()

      hover.setRectHandler(yScale, 
        hover.selectTicks, 
        hover.unselectTicks,  
        hover.hoverTicks, 
        hover.unhoverTicks, 
        graphSize.width + xScale(1901))
      
      var legendWidth = graphSize.width / 2;
      legend.draw(margin.left + graphSize.width/2, 
        margin.top/2,
        legendWidth, 
        'url(#positiveGradient)',
        'url(#negativeGradient)', 
        positiveColorScale, 
        negativeColorScale)
    }

    window.addEventListener('resize', () => {
      setSizing()
      build()
    })
  })
}

