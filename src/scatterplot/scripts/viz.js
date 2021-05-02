/**
 * Generate global variables usefull for the following functions
 * 
 * @param {*} MinYear 
 * @param {*} MaxYear 
 */
 export function range(MinYear, MaxYear) {
  window.mnyear=MinYear
  window.mxyear=MaxYear
}

/**
 * Positions the x axis label and y axis label.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 * @param {number} width The width of the graph
 * @param {number} height The height of the graph
 */
export function positionLabels (g, width, height) {
  g.select(".y.axis-text")
    .attr('y', -20)
    .attr('x', 0)

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
  var data = data['values']

  d3.select('#graph-g-scatterplot')
  .selectAll('.dot')
  .data(data)
  .enter()
  .append('circle')
  .attr('class', 'dot')
  .attr('cx', function (d) { return xScale(d.PerCapita) })
  .attr('cy', function (d) { return yScale(d.percentTotalEmissions) })
  .attr('fill', function (d) { if (d.Pays == 'World') { return 'black'} 
                else if (parseInt(d["Date de mise en place"]) <= parseInt(d.Annees) && parseInt(d["Date de mise en place"])>0) { return 'green' } 
                else {return 'red'}})
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
  // Hover and the opacity goes up to 100% (from 70%)
  d3.selectAll('.dot')

    .on('mouseover', function(d) { 
      tip.show(d, this)
      d3.select(this).attr('opacity', 1)
      d3.select(this).attr('stroke', '#362023')})

    .on('mouseout', function(d) { 
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
  
  d3.selectAll('.dot')
    .transition() 
    .duration(transitionDuration)
    .attr('cx', function (d) { return xScale(d.PerCapita)})
    .attr('cy', function (d) { return yScale(d.percentTotalEmissions)})
    .attr('fill', function (d) { if (d.Pays == 'World') { return 'black'} 
                  else if (parseInt(d["Date de mise en place"]) <= parseInt(d.Annees) && parseInt(d["Date de mise en place"])>0) { return 'green' } 
                  else {return 'red'}})
}

/**
 * Show the year showed on the graph
 *
 * @param {number} year The currently displayed year
 */
export function setTitleText (year) {
 
  var xtranslate = d3.select('#scatterplot').node().getBoundingClientRect().width - 325
  console.log(xtranslate)

  d3.select('#title-scatterplot')
    .text("Data for year : " + year)
    .attr('transform','translate(' + xtranslate + ', 260)' )
}

/**
 * Draws the circles for a single country
 * 
 * @param {*} data 
 * @param {*} annee 
 * @param {*} xScale 
 * @param {*} yScale 
 */
export function drawCirclesCountry (data, annee, xScale, yScale) {

  const OpacityScale = d3.scaleLinear().domain([mnyear,mxyear]).range([0.15,1])

  d3.select('#graph-g-scatterplot')
  .selectAll('.dot')
  .data(data)
  .enter()
  .append('circle')
  .attr('class', 'dot')
  .attr('cx', function (d) { return xScale(d.PerCapita) })
  .attr('cy', function (d) { return yScale(d.percentTotalEmissions) })
  .attr('fill', function (d) { if (d.Pays == 'World') { return 'black'} 
                else if (parseInt(d["Date de mise en place"]) <= parseInt(d.Annees) && parseInt(d["Date de mise en place"])>0) { return 'green' } 
                else {return 'red'}})
  .attr('r', '10px')
  .attr('opacity', function (d) { if (parseInt(d.Annees) == annee) { return 0.7 } else { return 0 } })

  d3.selectAll('.dot')
  .transition()
  .duration(1000)
  .attr('opacity', function (d) { return OpacityScale(d.Annees) })
  .attr('stroke', 'white')
}

/**
 * Handles the tooltip
 * 
 * @param {*} tip 
 */
export function setCircleHoverHandlerCountry (tip) {
  d3.selectAll('.dot')

    .on('mouseover', function(d) { 
      tip.show(d, this)
      d3.select(this).attr('stroke', '#362023')})

    .on('mouseout', function(d) { 
      tip.hide(d, this)
      d3.select(this).attr('stroke', '#f4f6f4')})

}

/**
 * Update the grid based on the height of the graph
 * 
 * @param {*} height 
 * @param {*} xScale 
 */
export function UpdateXGrid (height, xScale) {
  d3.select('#gridx')
      .call(d3.axisTop(xScale).ticks(3)
      .tickSize(-height)
      .tickFormat("")
        )
      .lower()

  d3.select('#gridx').selectAll('line')
      .style({ 'stroke': 'black', 'fill': 'none', 'stroke-width': '1px'});

}

/**
 * Update the grid based on the width of the graph
 * 
 * @param {*} width 
 * @param {*} yScale 
 */
export function UpdateYGrid (width, yScale) {
  d3.select('#gridy')
  		.call(d3.axisLeft(yScale).ticks(4)
            .tickSize(-width)
            .tickFormat("")
         )
      .lower()

  d3.select('#gridy').selectAll('line')
      .style({ 'stroke': 'black', 'fill': 'none', 'stroke-width': '1px'});

}
