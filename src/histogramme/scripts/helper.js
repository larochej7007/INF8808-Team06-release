
/**
 * Generates the SVG element g which will contain the data visualisation.
 *
 * @param {object} margin The desired margins around the graph
 * @returns {*} The d3 Selection for the created g element
 */
export function generateG (margin) {
  return d3.select('#barchart')
    .select('svg')
    .append('g')
    .attr('id', 'graph-g-barchart')
    .attr('transform',
      'translate(' + margin.left + ',' + margin.top + ')')
}

/**
 * Appends an SVG g element which will contain the y axis.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */
export function appendAxes (g) {
  g.append('g')
    .attr('class', 'x-axis-barchart')

  g.append('g')
    .attr('class', 'y-axis-barchart')

}
/**
 * Appends the labels for the the y axis and the title of the graph.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */
export function appendGraphLabels (g, x, y) {
  g.append('text')
    .text('Emissions of CO2 (millions of kilotonnes)')
    .attr('class', 'y axis-text')
    .attr('transform', 'rotate(-90)')
    .attr('fill', 'gray')
    .attr('font-size', 12)

  var temp = y + 50
  g.append('text')
    .text('Year')
    .attr('class', 'x axis-text')
    .attr('transform', 'translate(' + x + ',' + temp +')')
    .attr('fill', 'gray')
    .attr('font-size', 12)

  g.append('text')
    .text('Global CO2 emissions and temperature variations in °C per year ')
    .attr('class', 'title')
    .attr('fill', 'black')
  
  g.append('text')
    .text("The year of reference is currently 1960")
    .attr('class', 'subtitle')


}

/**
 * Sets the size of the SVG canvas containing the graph.
 *
 * @param {number} width The desired width
 * @param {number} height The desired height
 */
export function setCanvasSize (width, height) {
  d3.select('#barchart').select('svg')
    .attr('width', width)
    .attr('height', height)
}

/**
 * Positions the x axis label, y axis label and title label on the graph.
 *
 * @param {number} width The width of the graph
 * @param {number} height The height of the graph
 */
export function positionLabels (width, height) {
  d3.select('.y.axis-text')
    .attr('x', -50)
    .attr('y', height/2)

  d3.select('.title')
    .attr('x', width / 2)
    .attr('y', -35)

  d3.select('.subtitle')
    .attr('text-anchor', 'middle')
    .attr('x', width / 2)
    .attr('y', 0)
}


/**
 * Draws the x axis at the bottom of the plot.
 *
 * @param {*} xScale The scale to use for the x axis
 * @param {number} height The height of the graph
 */
export function drawXAxis (xScale, height) {
  d3.select('.x-axis-barchart')
    .attr('transform', 'translate(0, ' + height + ')')
    .call(d3.axisBottom(xScale).tickValues(xScale.domain().filter(function(d,i) {
      return !(i%2)
    })))

  d3.select('.x-axis-barchart')
  .selectAll('text')
  .attr('transform', 'translate(-12,20)rotate(-90)')
      
}

/**
 * Draws the y axis at the left of the plot.
 *
 * @param {*} yScale The scale to use for the y axis
 */
export function drawYAxis (yScale) {
  d3.select('.y-axis-barchart')
  .call(d3.axisLeft(yScale).ticks(5).tickFormat(x => x/1000000))
}

export function appendGrid (g) {
  g.append('g')
    .attr('class', 'grid')
    .style("stroke-dasharray",("1,1"))
}

export function appendBars(g, data) {
  g.selectAll('bar')
  .data(data)
  .enter()
  .append('rect')
  .attr('class', 'bar')
}
