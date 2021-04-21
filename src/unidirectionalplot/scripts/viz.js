
/**
 * Positions the x axis label and y axis label.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 * @param {number} width The width of the graph
 * @param {number} height The height of the graph
 */
export function positionLabels (g, width, height) {

  g.select('.y.axis-text')
    .attr('x', -50)
    .attr('y', height / 2)
}

/**
 * Draws the circles on the graph.
 *
 * @param {object} data The data to bind to
 * @param {*} rScale The scale for the circles' radius
 * @param {*} colorScale The scale for the circles' color
 */
export function drawCircles (dataByYear, xScale, yScale ) {
  

  d3.select('#graphe')
  .selectAll('circle')
  .attr('cx', function (d) { return xScale(d.Index) })
  .attr('cy', function (d) { return yScale(d.PIB) })
  .attr('class', 'pib')
  .attr('r', '10px')
  .attr('opacity', 0.7)
  .attr('stroke', 'white')
}

/**
 * Sets up the hover event handler. The tooltip should show on on hover.
 *
 * @param {*} tip The tooltip
 */
export function setCircleHoverHandler (tip) {
  d3.selectAll('.pib')
    .on('mouseover.tip', tip.show)
    .on('mouseover', function (d) { 
      tip.show(d, this)
    })
    .on('mouseout', function (d) { 
      tip.hide(d, this)
    })
}

