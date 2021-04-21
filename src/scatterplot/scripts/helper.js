
import * as scales from './scales.js'

/**
 * Generates the SVG element g which will contain the data visualisation.
 *
 * @param {object} margin The desired margins around the graph
 * @returns {*} The d3 Selection for the created g element
 */
export function generateG (margin) {

  d3.select('.scatterplot-svg').attr('transform', 'translate(0,200)')

  return d3.select('#scatterplot')
    .select('svg')
    .append('g')
    .attr('id', 'graph-g-scatterplot')
    .attr('transform',
      'translate(' + margin.left + ',' + margin.top + ')')
}

/**
 * Sets the size of the SVG canvas containing the graph.
 *
 * @param {number} width The desired width
 * @param {number} height The desired height
 */
export function setCanvasSize (width, height) {
  d3.select('#scatterplot').select('svg')
    .attr('width', width)
    .attr('height', height)
}

/**
 * Appends an SVG g element which will contain the axes.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */
export function appendAxes (g) {
  g.append('g')
    .attr('class', 'x-axis-scatterplot')

  g.append('g')
    .attr('class', 'y-axis-scatterplot')
}

/**
 * Appends the labels for the the y axis and the title of the graph.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */
export function appendGraphLabels (g) {
  g.append('text')
    .text('% Of Total C02 Emissions')
    .attr('class', 'y axis-text')
    .attr('transform', 'rotate(-90)')
    .attr('font-size', 12)

  g.append('text')
    .text('CO2 emissions per capita (metric tons)')
    .attr('class', 'x axis-text')
    .attr('font-size', 12)
}

/**
 * Places the graph's title.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */
export function placeTitle (g) {
  g.append('text')
    .attr('class', 'title-scatterplot')
    .attr('x', 0)
    .attr('y', -20)
    .attr('font-size', 14)
}

/**
 * Draws the X axis at the bottom of the diagram.
 *
 * @param {*} xScale The scale to use to draw the axis
 * @param {number} height The height of the graphic
 */
export function drawXAxis (xScale, height) {
  d3.select('.x-axis-scatterplot')
    .attr('transform', 'translate( 0, ' + height + ')')
    .call(d3.axisBottom(xScale).tickSizeOuter(0).tickArguments([5, '~s']))
}

/**
 * Draws the Y axis to the left of the diagram.
 *
 * @param {*} yScale The scale to use to draw the axis
 */
export function drawYAxis (yScale) {
  d3.select('.y-axis-scatterplot')
    .call(d3.axisLeft(yScale).tickSizeOuter(0).tickArguments([5, '.0r']))
}

/**
 * @param data
 */
export function GroupByYear (data) {
  var dataGrouped = d3.nest()
    .key(function (d) { return d.Annees })
    .entries(data)

  return (dataGrouped)
}

/**
 * @param data
 */
export function GroupByCountry (data) {
  var dataGrouped = d3.nest()
    .key(function (d) { return d.Pays })
    .entries(data)
  return (dataGrouped)
}

/**
 * Draws the button to toggle the display year.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 * @param {number} width The width of the graph, used to place the button
 */
export function drawButton1 (g, width) {
  const button = g.append('g')
    .attr('class', 'button')
    .attr('id', 'button1')
    .attr('transform', 'translate(' + (width+50) + ', 250)')
    .attr('width', 130)
    .attr('height', 25)

  button.append('rect')
    .attr('width', 130)
    .attr('height', 30)
    .attr('fill', '#f4f6f4')
    .on('mouseenter', function () {
      d3.select(this).attr('stroke', '#362023')
    })
    .on('mouseleave', function () {
      d3.select(this).attr('stroke', '#f4f6f4')
    })

  button.append('text')
    .attr('x', 65)
    .attr('y', 15)
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'middle')
    .attr('class', 'button-text')
    .text('Charger le pays selectionné')
    .attr('font-size', '10px')
    .attr('fill', '#362023')
}

/**
 * @param g
 * @param width
 */
export function drawButton2 (g, width) {
  const button = g.append('g')
    .attr('class', 'button')
    .attr('id', 'button2')
    .attr('transform', 'translate(' + (width+50) + ', 300)')
    .attr('width', 130)
    .attr('height', 25)

  button.append('rect')
    .attr('width', 130)
    .attr('height', 30)
    .attr('fill', '#f4f6f4')
    .on('mouseenter', function () {
      d3.select(this).attr('stroke', '#362023')
    })
    .on('mouseleave', function () {
      d3.select(this).attr('stroke', '#f4f6f4')
    })

  button.append('text')
    .attr('x', 65)
    .attr('y', 15)
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'middle')
    .attr('class', 'button-text')
    .text('Reset')
    .attr('font-size', '10px')
    .attr('fill', '#362023')
}

/**
 * @param g
 * @param width
 */
 export function drawButton3 (g, width) {
  const button = g.append('g')
    .attr('class', 'button')
    .attr('id', 'button3')
    .attr('transform', 'translate(' + (width+50) + ', 350)')
    .attr('width', 130)
    .attr('height', 25)

  button.append('rect')
    .attr('width', 130)
    .attr('height', 30)
    .attr('fill', '#f4f6f4')
    .on('mouseenter', function () {
      d3.select(this).attr('stroke', '#362023')
    })
    .on('mouseleave', function () {
      d3.select(this).attr('stroke', '#f4f6f4')
    })

  button.append('text')
    .attr('x', 65)
    .attr('y', 15)
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'middle')
    .attr('class', 'button-text')
    .text('2010')
    .attr('font-size', '10px')
    .attr('fill', '#362023')
}

/**
 * @param dataByYear
 * @param dataByCountry
 * @param year
 * @param mode
 * @param Index
 */
export function mode (dataByYear, dataByCountry, year, mode, Index) {
  if (mode == 0) {
    var decalage = year - 1960
    return (dataByYear[decalage].values)
  }
  if (mode == 1) {
    return (dataByCountry[Index].values)
  }
}
