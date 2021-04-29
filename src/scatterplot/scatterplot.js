'use strict'

import * as helper from './scripts/helper.js'
import * as scales from './scripts/scales.js'
import * as viz from './scripts/viz.js'
import * as tooltip from './scripts/tooltip.js'
import * as legend from './scripts/legend.js'
import * as preprocess from './scripts/preprocess.js'

import d3Tip from 'd3-tip'

/**
 * @file This file is the entry-point for the the code for TP4 for the course INF8808.
 * @author Olivia Gélinas
 * @version v1.0.0
 */

export function GetScatterPlot() {
  const margin = {
    top: 75,
    right: 200,
    bottom: 100,
    left: 80
  }

  let currentYear = 1960
  let previousYear = 2016
  let interval

  let svgSize, graphSize, bounds

  setSizing()

  const g = helper.generateG(margin)

  const tip = d3Tip().attr('class', 'd3-tip').html(function (d) { return tooltip.getContents(d) })
  g.call(tip)

  helper.appendAxes(g)
  helper.appendGraphLabels(g)
  helper.appendGrid(g)
  helper.placeTitle(g, graphSize.width)

  viz.positionLabels(g, graphSize.width, graphSize.height)

  helper.drawButton1(g, currentYear === 1960 ? 2016 : 1960, graphSize.width)
  helper.drawButton2(g, graphSize.width)
  helper.drawButton3(g, graphSize.width)
  helper.drawButton5(g, graphSize.width)
  helper.drawButton6(g, graphSize.width)
  helper.drawButton7(g, graphSize.width)

  d3.csv('./DataFinal.csv').then((data) => {

    var DataByCountry = preprocess.GroupByCountry(data)
    var DataByYear = preprocess.GroupByYear(data)

    const colorScale = scales.setColorScale()
    const xScale = scales.setXScale(graphSize.width, data)
    const yScale = scales.setYScale(graphSize.height, data)

    viz.UpdateXGrid(graphSize.height, xScale)
    viz.UpdateYGrid(graphSize.width, yScale)

    helper.drawXAxis(xScale, graphSize.height)
    helper.drawYAxis(yScale)

    legend.drawLegend(colorScale, g, graphSize.width)

    build(DataByYear, 0, currentYear, xScale, yScale)

    setClickHandler1()
    setClickHandler2()
    setClickHandler3()
    setClickHandler4()
    setClickHandler6()
    setClickHandler7()
    setClickHandler8()

    viz.setCircleHoverHandler(tip)

    /**
     *   Sets up the click handler for the button.
     */
    function setClickHandler1 () {
      d3.select('#button1')
        .on('click', () => {
          currentYear = previousYear
          previousYear = (previousYear === 2016 ? 1960 : 2016)
          build(DataByYear, 1000, currentYear, xScale, yScale)
          d3.select('#button1').select('.button-text').text('See ' + previousYear + ' dataset')
        }
        )
    }

    function setClickHandler2 () {
      d3.select('#button2')
        .on('click', () => {
          if (currentYear !== 1960) {
            currentYear = currentYear - 1
            build(DataByYear, 500, currentYear, xScale, yScale)}
          if (currentYear === 1960) { 
            d3.select('#button1').select('.button-text').text('See 2016 dataset') 
            previousYear = 2016 }
        }
        )
    }

    function setClickHandler3 () {
      d3.select('#button3')
        .on('click', () => {
          if (currentYear !== 2016) {
            currentYear = currentYear + 1
            build(DataByYear, 500, currentYear, xScale, yScale)}
          if (currentYear === 2016) { 
            d3.select('#button1').select('.button-text').text('See 1960 dataset')
            previousYear = 1960 }
        }
        )
    }

    function setClickHandler4 () {
      d3.selectAll('.dot')
        .on('click', (d) => {

          helper.HideButton1(g)
          helper.HideButton2(g)
          helper.HideButton3(g)
          helper.HideButton5(g)
          helper.HideButton6(g)
          helper.HideButton7(g)
          helper.drawButton4(g, graphSize.width)

          var DataCountry
          for (var i=0; i < DataByCountry.length; i++){ 
            if (DataByCountry[i].key === d.Pays) {
              DataCountry = DataByCountry[i].values
            }
          }

          d3.select('#graph-g-scatterplot')
          .selectAll('.dot')
          .transition()
          .duration(1000)
          .attr('opacity', function (d1) { if (d1.Pays == d.Pays) { return 0.7} else { return 0}})
          .on("end", function (d) {  
                    d3.select('#graph-g-scatterplot')
                    .selectAll('.dot')
                    .filter(function (d1) {return d1.Pays != d.Pays})
                    .remove()
                    viz.drawCirclesCountry(DataCountry, currentYear, xScale, yScale)
                    viz.setCircleHoverHandlerCountry(tip)});
          
          d3.select('#title-scatterplot').text("Every years for " + d.Pays)
          setClickHandler5()
        })
  }

    function setClickHandler5 () {
      d3.select('#button4')
        .on('click', () => {

          helper.drawButton1(g, 1960, graphSize.width)
          helper.drawButton2(g, graphSize.width)
          helper.drawButton3(g, graphSize.width)
          helper.drawButton5(g, graphSize.width)
          helper.drawButton6(g, graphSize.width)
          helper.drawButton7(g, graphSize.width)
          helper.HideButton4(g)

          d3.select('#graph-g-scatterplot')
          .selectAll('.dot')
          .remove()

          currentYear = 1960
          build(DataByYear, 1000, currentYear, xScale, yScale)
          d3.select('#button1').select('.button-text').text('See 2016 dataset')
          viz.setCircleHoverHandler(tip)
          setClickHandler1()
          setClickHandler2()
          setClickHandler3()
          setClickHandler4()
          setClickHandler6()
          setClickHandler7()
          setClickHandler8()
        }
        )
    }

    function setClickHandler6 () {
      d3.select('#button5')
        .on('click', () => {
          if (currentYear >= 1970) {
            currentYear = currentYear - 10
            build(DataByYear, 500, currentYear, xScale, yScale)}
          else { currentYear = 1960
            build(DataByYear, 500, currentYear, xScale, yScale)}
          if (currentYear === 1960) { 
            d3.select('#button1').select('.button-text').text('See 2016 dataset')
            previousYear = 2016 }
        }
        )
    }

    function setClickHandler7 () {
      d3.select('#button6')
        .on('click', () => {
          if (currentYear <= 2006) {
            currentYear = currentYear + 10
            build(DataByYear, 500, currentYear, xScale, yScale)}
          else { currentYear = 2016
            build(DataByYear, 500, currentYear, xScale, yScale)}
          if (currentYear === 2016) { 
            d3.select('#button1').select('.button-text').text('See 1960 dataset')
            previousYear = 1960 }
        }
        )
    }
    function setClickHandler8 () {
      d3.select('#button7')
        .on('click', () => {
          interval = setInterval(function(d){ build(DataByYear, 200, currentYear, xScale, yScale)
            currentYear += 1
            if (currentYear == 2017) { currentYear = 2016
                                      clearInterval(interval)}} , 200)
          d3.select('#button1').select('.button-text').text('See 1960 dataset')
          previousYear = 1960
        }
        )
    }
  })

  /**
   *   This function handles the graph's sizing.
   */
  function setSizing () {
    bounds = d3.select('#scatterplot').node().getBoundingClientRect()
    svgSize = {
      width: bounds.width - margin.left,
      height: 700
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
   * @param {number} transitionDuration The duration of the transition while placing the circles
   * @param {number} year The year to be displayed
   * @param {*} rScale The scale for the circles' radius
   * @param {*} colorScale The scale for the circles' color
   * @param {*} xScale The x scale for the graph
   * @param {*} yScale The y scale for the graph
   */
  function build (data, transitionDuration, year, xScale, yScale) {
    viz.drawCircles(data[year-1960], xScale, yScale)
    viz.moveCircles(xScale, yScale, transitionDuration)
    viz.setTitleText(year)
  }
}
