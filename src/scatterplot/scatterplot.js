'use strict'

import * as helper from './scripts/helper.js'
import * as scales from './scripts/scales.js'
import * as viz from './scripts/viz.js'
import * as tooltip from './scripts/tooltip.js'
import * as legend from './scripts/legend.js'
import * as preprocess from './scripts/preprocess.js'

import d3Tip from 'd3-tip'

/**
 * @file This file is the entry-point for the the code for the Scatterplot visualisation 
 * @author Team6
 * @version v1.0.0
 */

export function GetScatterPlot() {
  // Creation of the margins on the svg for the graph
  const margin = {
    top: 75,
    right: 200,
    bottom: 100,
    left: 80
  }

// Initialization of the variables
  let currentYear = 1960
  let previousYear = 2016
  let interval

  let svgSize, graphSize, bounds

  setSizing()
  helper.translate(graphSize.width)

  // Generation of the margin on the svg
  const g = helper.generateG(margin)

  // Initialization of the tooltip
  const tip = d3Tip().attr('class', 'd3-tip').html(function (d) { return tooltip.getContents(d) })
  
  // Call of the tooltip
  g.call(tip)

  // Generation of the axes, the labelsn, the grid, the buttons and the title on the graph
  helper.appendAxes(g)
  helper.appendGraphLabels(g)
  helper.appendGrid(g)
  helper.placeTitle(g, graphSize.width)

  viz.positionLabels(g, graphSize.width, graphSize.height)

  helper.drawButton1(g, currentYear === 1960 ? 2016 : 1960, graphSize.width) // The years have to be set up manually
  helper.drawButton2(g, graphSize.width)
  helper.drawButton3(g, graphSize.width)
  helper.drawButton5(g, graphSize.width)
  helper.drawButton6(g, graphSize.width)
  helper.drawButton7(g, graphSize.width)

  // Importation of the data 
  d3.csv('./DataFinal.csv').then((data) => {

    // These variables contain the data grouped by country and grouped by year respectively
    var DataByCountry = preprocess.GroupByCountry(data)
    var DataByYear = preprocess.GroupByYear(data)

    //Initialization of SomeVariable
    const MaxYear = preprocess.MaxYear(data)
    const MinYear = preprocess.MinYear(data)

    // Calling of the scales
    const colorScale = scales.setColorScale()
    const xScale = scales.setXScale(graphSize.width, data)
    const yScale = scales.setYScale(graphSize.height, data)

    // Updating of the axes and the grid based on the date through the use of the scales
    viz.UpdateXGrid(graphSize.height, xScale)
    viz.UpdateYGrid(graphSize.width, yScale)

    helper.drawXAxis(xScale, graphSize.height)
    helper.drawYAxis(yScale)

    // Drawing of the legend
    legend.drawLegend(colorScale, g, graphSize.width)

    // Drawing of the graph (proper)
    build(DataByYear, 0, currentYear, xScale, yScale)

    // Functions that handle the use of the buttons
    setClickHandler1()
    setClickHandler2()
    setClickHandler3()
    setClickHandler4()
    setClickHandler6()
    setClickHandler7()
    setClickHandler8()

    // Function that handle the tooltip
    viz.setCircleHoverHandler(tip)

    /**
     *   Sets up the click handler for the button "See ... dataset".
     */
    function setClickHandler1 () {
      d3.select('#button1')
        .on('click', () => {
          currentYear = previousYear
          previousYear = (previousYear === MaxYear ? MinYear : MaxYear)
          build(DataByYear, 1000, currentYear, xScale, yScale)
          d3.select('#button1').select('.button-text').text('See ' + previousYear + ' dataset')
        }
        )
    }

    /**
     *   Sets up the click handler for the button "Year -1".
     */
    function setClickHandler2 () {
      d3.select('#button2')
        .on('click', () => {
          if (currentYear !== MinYear) {
            currentYear = currentYear - 1
            build(DataByYear, 500, currentYear, xScale, yScale)}
          if (currentYear === MinYear) { 
            d3.select('#button1').select('.button-text').text('See ' + MaxYear + '  dataset')
            previousYear = MaxYear }
        }
        )
    }

    /**
     *   Sets up the click handler for the button "Year +1".
     */
    function setClickHandler3 () {
      d3.select('#button3')
        .on('click', () => {
          if (currentYear !== MaxYear) {
            currentYear = currentYear + 1
            build(DataByYear, 500, currentYear, xScale, yScale)}
          if (currentYear === MaxYear) { 
            d3.select('#button1').select('.button-text').text('See ' + MinYear + ' dataset')
            previousYear = MinYear }
        }
        )
    }

    /**
     *   Sets up the click handler for the countries.
     */
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

    /**
     *   Sets up the click handler for the "Reset"
     */
    function setClickHandler5 () {
      d3.select('#button4')
        .on('click', () => {

          helper.drawButton1(g, MinYear, graphSize.width)
          helper.drawButton2(g, graphSize.width)
          helper.drawButton3(g, graphSize.width)
          helper.drawButton5(g, graphSize.width)
          helper.drawButton6(g, graphSize.width)
          helper.drawButton7(g, graphSize.width)
          helper.HideButton4(g)

          d3.select('#graph-g-scatterplot')
          .selectAll('.dot')
          .remove()

          currentYear = MinYear
          build(DataByYear, 1000, currentYear, xScale, yScale)
          d3.select('#button1').select('.button-text').text('See ' + MaxYear + ' dataset')
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

    /**
     *   Sets up the click handler for the button "Year -10".
     */
    function setClickHandler6 () {
      d3.select('#button5')
        .on('click', () => {
          if (currentYear >= MinYear + 10) {
            currentYear = currentYear - 10
            build(DataByYear, 500, currentYear, xScale, yScale)}
          else { currentYear = MinYear
            build(DataByYear, 500, currentYear, xScale, yScale)}
          if (currentYear === MinYear) { 
            d3.select('#button1').select('.button-text').text('See ' + MaxYear + ' dataset')
            previousYear = MaxYear }
        }
        )
    }

    /**
     *   Sets up the click handler for the button "Year +10".
     */
    function setClickHandler7 () {
      d3.select('#button6')
        .on('click', () => {
          if (currentYear <= MaxYear - 10) {
            currentYear = currentYear + 10
            build(DataByYear, 500, currentYear, xScale, yScale)}
          else { currentYear = MaxYear
            build(DataByYear, 500, currentYear, xScale, yScale)}
          if (currentYear === MaxYear) { 
            d3.select('#button1').select('.button-text').text('See ' + MinYear + ' dataset1')
            previousYear = MinYear }
        }
        )
    }
    
     /**
     *   Sets up the click handler for the button "Animation".
     */   
    function setClickHandler8 () {
      d3.select('#button7')
        .on('click', () => {
          interval = setInterval(function(d){ build(DataByYear, 200, currentYear, xScale, yScale)
            currentYear += 1
            if (currentYear == MaxYear + 1) { currentYear = MaxYear
                                      clearInterval(interval)}} , 200)
          d3.select('#button1').select('.button-text').text('See ' + MinYear + ' dataset')
          previousYear = MinYear
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
   * @param {*} xScale The x scale for the graph
   * @param {*} yScale The y scale for the graph
   */
  function build (data, transitionDuration, year, xScale, yScale) {
    viz.drawCircles(data[year-1960], xScale, yScale) // The - '...' (here 1960) has to be set up manually to correspond to the earliest year
    viz.moveCircles(xScale, yScale, transitionDuration)
    viz.setTitleText(year)
  }
}
