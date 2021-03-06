/**
 * Positions the x axis label and y axis label.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 * @param {number} width The width of the graph
 * @param {number} height The height of the graph
 */
 export function positionLabels (g, width, height) {
  // TODO : Position axis labels
  g.select(".y.axis-text")
    .attr('y', height/2)
    .attr('x', -50)

  g.select(".x.axis-text")
  .attr('x', width/2)
  .attr('y', height+50)

}

/**
 * Draws the circles on the graph.
 *
 * @param {object} data The data to bind to
 * @param {*} rScale The scale for the circles' radius
 * @param {*} colorScale The scale for the circles' color
 */
export function drawCircles (data, xScale, yScale) {
  // TODO : Draw the bubble chart's circles
  // Each circle's size depends on its population
  // and each circle's color depends on its continent.
  // The fill opacity of each circle is 70%
  // The outline of the circles is white

  var data = data['values']
  d3.select('#graph-g-unidirectplot')
  .selectAll('.dot-unidirectplot')
  .data(data)
  .enter()
  .append('circle')
  .attr('class', 'dot-unidirectplot')
  .attr('cx', function (d) { return xScale(d.Mesures) })
  .attr('cy', function (d) { return  yScale(d.temperature) })
  .attr('fill', 'black')
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
  // TODO : Set hover handler. The tooltip shows on
  // hover and the opacity goes up to 100% (from 70%)
  d3.selectAll('.dot-unidirectplot')

    .on('mouseover', function(d) { // Lorsque l'élément est survolé, on change l'opacité et on affiche le tooltip
      tip.show(d, this)
      d3.select(this).attr('opacity', 1)
      d3.select(this).attr('stroke', '#362023')})

    .on('mouseout', function(d) { // Lorsque l'élément n'est plus survolé, l'opacité revient à la normale et le tooltip disparait
      tip.hide(d, this)
      d3.select(this).attr('opacity', 0.7)
      d3.select(this).attr('stroke', '#f4f6f4')})
}

/**
 * Updates the position of the circles based on their bound data. The position
 * transitions gradually.
 *
 * @param {*} xScale The x scale used to position the circles
 * @param {*} yScale The y scale used to position the circles
 * @param {number} transitionDuration The duration of the transition
 */
export function moveCircles (xScale, yScale, transitionDuration) {
  // TODO : Set up the transition and place the circle centers
  // in x and y according to their GDP and CO2 respectively
  d3.selectAll('.dot-unidirectplot')
    .transition() // On réalise la transition pour tous les cercles de classe dot
    .duration(transitionDuration)
    .attr('cx', function (d) {  return xScale(d.Mesures )})
    .attr('cy', function (d) { return yScale(d.temperature)})
    .attr('fill', 'black')
}

/**
 * Update the title of the graph.
 *
 * @param {number} year The currently displayed year
 */
export function setTitleText (year) {
  // TODO : Set the title
  d3.select('#title-unidirectplot')
    .text("Data for year : " + year)
}

export function drawCirclesCountry (data, annee, xScale, yScale) {
  // TODO : Draw the bubble chart's circles
  // Each circle's size depends on its population
  // and each circle's color depends on its continent.
  // The fill opacity of each circle is 70%
  // The outline of the circles is white

  const OpacityScale = d3.scaleLinear().domain([1960,2016]).range([0.15,1])

  d3.select('#graph-g-unidirectplot')
  .selectAll('.dot-unidirectplot')
  .data(data)
  .enter()
  .append('circle')
  .attr('class', 'dot-unidirectplot')
  .attr('cx', function (d) { return xScale(d.Mesures ) })
  .attr('y5', function (d) { return yScale(d.temperature) })
  .attr('fill', 'black')
  .attr('r', '10px')
  .attr('opacity', function (d) { if (parseInt(d.Annees) == annee) { return 0.7 } else { return 0 } })

  d3.selectAll('.dot-unidirectplot')
  .transition()
  .duration(1000)
  .attr('opacity', function (d) { return OpacityScale(d.Annees) })
  .attr('stroke', 'white')
}

export function setCircleHoverHandlerCountry (tip) {
  // TODO : Set hover handler. The tooltip shows on
  // hover and the opacity goes up to 100% (from 70%)
  d3.selectAll('.dot-unidirectplot')

    .on('mouseover', function(d) { // Lorsque l'élément est survolé, on change l'opacité et on affiche le tooltip
      tip.show(d, this)
      d3.select(this).attr('stroke', '#362023')})

    .on('mouseout', function(d) { // Lorsque l'élément n'est plus survolé, l'opacité revient à la normale et le tooltip disparait
      tip.hide(d, this)
      d3.select(this).attr('stroke', '#f4f6f4')})

}
