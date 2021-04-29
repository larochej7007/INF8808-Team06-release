
/**
 * Generates the SVG element g which will contain the data visualisation.
 *
 * @param {object} margin The desired margins around the graph
 * @returns {*} The d3 Selection for the created g element
 */
export function generateG (margin) {
  return d3.select('#unidirectplot')
    .select('svg')
    .append('g')
    .attr('id', 'graph-g')
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
  d3.select('.unidirectplot-svg')
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
    .attr('class', 'y-axis-unidirectionalplot')
  
    g.append('g')
    .attr('class', 'x-axis-unidirectionalplot')
}
/**
 * Appends the labels for the the y axis and the title of the graph.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */
export function appendGraphLabels (g) {
  g.append('text')
    .text(' PIB USD$')
    .attr('class', 'y axis-text-unidirectionalplot')
    .attr('transform', 'rotate(-90)')
    .attr('font-size', 12)

}


/**
 * Draws the Y axis to the left of the diagram.
 *
 * @param {*} yScale The scale to use to draw the axis
 */
export function drawYAxis (yScale) {
  d3.select('.y-axis-unidirectplot')
    .call(d3.axisLeft(yScale).tickSizeOuter(0).tickArguments([5, '.0r']))
}

export function drawXAxis (xScale, height) {
  d3.select('.x-axis-unidirectplot')
    .attr('transform', 'translate( 0, ' + height + ')')
    .call(d3.axisBottom(xScale).tickSizeOuter(0).tickArguments([5, '~s']))
}

export function GroupByYear (data) {
  var dataGrouped = d3.nest()
    .key(function (d) { return d.Annees })
    .entries(data)

  return (dataGrouped)
}


/**
 * Places the graph's title.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */
export function placeTitle (g) {
  g.append('text')
    .attr('class', 'unidirectplot-title')
    .attr('x', 0)
    .attr('y', -20)
    .attr('font-size', 14)
}

export function groupebyYear (data) {
  return d3.nest().key(function (d) { return d.Year })
  .entries(data)
}

export function groupebyRegion (data) {
  return d3.nest().key(function (d) { return d.Pays })
  .entries(data)
}

export function groupebyMesure (data) {
  return d3.nest().key(function (d) { return d.Mesure })
  .entries(data)
}

/**
 * Draws the button to toggle the display year.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 * @param {number} year The year to display
 * @param {number} width The width of the graph, used to place the button
 */
export function drawButton (g, year, width) {
  const button = g.append('g')
    .attr('class', 'button')
    .attr('transform', 'translate(' + width + ', 140)')
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
    .attr('y', 15)
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'middle')
    .attr('class', 'button-text')
    .text('See ' + year + ' dataset')
    .attr('font-size', '10px')
    .attr('fill', '#362023')
}


