/**
 * Appends the labels for the the x and y axis and for the subtitle of the graph.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */
 export function appendGraphLabels (g) {
  g.append('text')
    .text('Year')
    .attr('class', 'x axis-text-heatmap')
    .attr('fill', 'gray')
    .attr('font-size', 12)
}

/**
 * Positions the x axis label, y axis label and subtitle label on the graph.
 *
 * @param {number} x The x position
 * @param {number} y The y position
 * @param {number} y The y offset
 */
 export function positionLabels (x, y, offset) {
  
  d3.select('.x.axis-text-heatmap')
  .attr('x', x/2)
  .attr('y', y + offset)
}

/**
 * Generates the SVG element g which will contain the data visualisation.
 *
 * @param {object} margin The desired margins around the graph
 * @returns {*} The d3 Selection for the created g element
 */
export function generateG (margin) {
  return d3.select('#heatmap')
    .select('svg')
    .append('g')
    .attr('id', 'graph-g-heatmap')
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
  d3.select('#heatmap').select('svg')
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
    .attr('class', 'x-axis-heatmap')

  g.append('g')
    .attr('class', 'y-axis-heatmap')
}
