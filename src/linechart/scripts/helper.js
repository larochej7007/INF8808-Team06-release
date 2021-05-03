/**
 * Appends the labels for the the y axis and the title of the graph.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */
export function appendGraphLabels (g) {
  g.append('text')
    .text('ΔT')
    .attr('class', 'y-axis-linechart-text')
    .attr('fill', '#898989')
    .attr('font-size', 12)

  g.append('text')
    .text('Year')
    .attr('class', 'x-axis-linechart-text')
    .attr('fill', '#898989')
}

/**
 * Sets the size of the SVG canvas containing the graph.
 *
 * @param {number} width The desired width
 * @param {number} height The desired height
 */
export function setCanvasSize (width, height) {
  d3.select('#linechart').select('svg')
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
  d3.select('.y-axis-linechart-text')
    .attr('x', -60)
    .attr('y', height/2)

  d3.select('.x-axis-linechart-text')
    .attr('x', width / 2)
    .attr('y', height + 40 )
}
