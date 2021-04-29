
/**
 * Positions the x axis label and y axis label.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 * @param {number} width The width of the graph
 * @param {number} height The height of the graph
 */
export function positionLabels (g, width, height) {
  console.log(height)
  
  d3.select('.y.axis-text-unidirectionalplot')
    .attr('x', -50)
    .attr('y', height /2)
}

/**
 * Draws the circles on the graph.
 
 * @param {object} data The data to bind to
 * @param {*} rScale The scale for the circles' radius
 * @param {*} colorScale The scale for the circles' color
 */
export function drawCircles (data ) {
  d3.select('#graph-g-unidirectionalplot')
  .selectAll('circle')
  .data(data)
  .enter()
  .append('circle')
  .attr('class', 'dot-unidirectionalplot')
  .transition()
  .duration(500)
  .attr('cx', function (d) { return xScale(d.Mesures) })
  .attr('cy', function (d) { return yScale(d.PerCapita) })
  .attr('fill', '#000000' )
  .attr('r', '10px')
  .attr('stroke', 'white')
}


/**
 * Sets up the hover event handler. The tooltip should show on on hover.
 *
 * @param {*} tip The tooltip
 */
export function setCircleHoverHandler (tip) {
  d3.selectAll('.dot-unidirectionalplot')
    .on('mouseover.opacity', function () {
      d3.select(this)
        .style('opacity', '1')
    }).on('mouseover.tip', tip.show)
    .on('mouseout.opacity', function () {
      d3.select(this)
        .style('opacity', '0.7')
    }).on('mouseout.tip', tip.hide)
}

export function setTitleText (year) {
  d3.select('.unidirectplot-title')
    .text('Data for year : ' + year)
}

