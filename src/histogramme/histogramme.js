import * as preproc from './scripts/preprocess.js'
import * as viz from './scripts/viz.js'
import * as helper from './scripts/helper.js'
import * as legend from './scripts/legend.js'
import * as tooltip from './scripts/tooltip.js'

import d3Tip from 'd3-tip'
import * as d3Chromatic from 'd3-scale-chromatic'


export function GetHistogram() {
  const margin = { top: 80, right: 0, bottom: 80, left: 90 }

  let bounds
  let svgSize
  let graphSize

  const xScale = d3.scaleBand()
  const yScale = d3.scaleLinear()
  const colorScale = d3.scaleSequential(d3Chromatic.interpolateRdBu)



  Promise.all([
    d3.csv('./CO2.csv'),
    d3.csv("./Var_temp.csv"),
  ]).then(function (files) {
    var Emissions = preproc.GetEmissions(files[0])
    var Variations = preproc.GetVariations(files[1])

    var data = preproc.MergeData(Emissions, Variations)

    const g = helper.generateG(margin)

    viz.setColorScaleDomain(colorScale, data)
    legend.initGradient(colorScale)
    legend.initLegendBar()
    legend.initLegendAxis()
    

    setSizing()

    helper.appendAxes(g)
    helper.appendBars(g, data)
    helper.appendGrid(g)
    helper.appendGraphLabels(g, graphSize.width/2, graphSize.height)

    build()

    const tip = d3Tip().attr('class', 'd3-tip').html(function (d) { return tooltip.getContents(d) })
    g.call(tip)

    viz.setRectangleHoverHandler (tip)

    /**
     *   This function handles the graph's sizing.
     */
    function setSizing () {
      bounds = d3.select('#barchart').node().getBoundingClientRect()

      svgSize = {
        width: bounds.width,
        height: 550
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
      viz.UpdateXScale(xScale, data, graphSize.width)
      viz.UpdateYScale(yScale, data, graphSize.height)

      helper.drawXAxis(xScale, graphSize.height)
      helper.drawYAxis(yScale)

      helper.positionLabels(graphSize.width, graphSize.height)

      viz.UpdateBars(yScale, xScale, data, graphSize.height, colorScale)

      viz.UpdateGrid(graphSize.width, yScale)

      legend.draw(graphSize.width, margin.top + 5, graphSize.height - 10, 15, 'url(#gradient)', colorScale)
    }

    window.addEventListener('resize', () => {
      setSizing()
      build()
    })
  })
}