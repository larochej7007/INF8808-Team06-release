/**
 * Sets the domain and range of the X scale.
 *
 * @param {*} scale The x scale
 * @param {object[]} data The data to be used
 * @param {number} width The width of the graph
 */
export function UpdateXScale (scale, data, width) {

  var Year = []

  data.forEach(function (d) { Year.push(d.Year)})

  scale.domain(Year)
        .range([0, width])
}

/**
 * Sets the domain and range of the Y scale.
 *
 * @param {*} scale The Y scale
 * @param {object[]} data The data to be used
 * @param {number} height The height of the graph
 */
export function UpdateYScale (scale, data, height) {

   var Emission = []

  data.forEach(function (d) { Emission.push(parseFloat(d.emission))})

  scale.domain([d3.max(Emission), 0])
        .range([0, height])
}

/**
 * Draws the bars
 *
 * @param {*} yScale The graph's y scale
 * @param {*} xScale The graph's x scale
 * @param {object[]} data The data to be used
 * @param {number} height The height of the graph
 * @param {*} colorScale The color scale for the bars
 */
export function UpdateBars (yScale, xScale, data, height, colorScale) {

  d3.select('#graph-g-barchart')
  .selectAll('.bar')
  .attr('x', function (d) { return xScale(d.Year)})
  .attr('y', function (d) { return yScale(d.emission)})
  .attr('width', xScale.bandwidth())
  .attr('height', function (d) { return height - yScale(d.emission) })
  .attr('fill', function (d) { return colorScale(d.variation)})
  .attr('stroke', 'black')
  .on("click", function (d) {
    ChangeReference(d, data, xScale, yScale, colorScale, height)
  }) 
}

/**
 * Sets the domain and range of the color scale.
 *
 * @param {object[]} data The data to be used
 * @param {*} colorScale The color scale for the bars
 */
export function setColorScaleDomain (colorScale, data) {

  const arrondi = 1000
  var absolute_variations = []
  // We search the maximum variation which has occured between each year during the period so that we won't have to update the scale for each transition
  for (var i = 0; i < data.length; i++){
    var reference = data[i].variation
    data.forEach(function (d) { 
      d.variation = Math.round((d.variation - reference) * arrondi ) / arrondi
      absolute_variations.push(d.variation)
    })
  }
  // We use 1960 as the year reference
  var reference = data[0].variation
  var reference_year = data[0].Year
  data.forEach(function (d) { 
    d.variation = Math.round((d.variation - reference) * arrondi ) / arrondi
    d.reference_year = reference_year})
  // On cherche le maximum en valeur absolue
  var max_variation = Math.ceil(d3.max(absolute_variations))
  // L'échelle allant du rouge vers le bleu, il faut donc mettre les variations positives d'abord. 
  // De plus, on prend en valeur absolue la même variation pour le min et le max afin d'être centré en 0 qui aura une couleur blanche

  colorScale.domain([max_variation,-max_variation])

}

/**
 * Sets the domain and range of the color scale.
 *
 * @param {number} width The width of the graph
 * @param {*} yScale The graph's y scale
 */
export function UpdateGrid (width, yScale) {

  d3.select('.grid')
  		.call(d3.axisLeft(yScale).ticks(5)
            .tickSize(-width)
            .tickFormat("")
         )
      .lower()

  d3.select('.grid').selectAll('line')
      .style({ 'stroke': 'black', 'fill': 'none', 'stroke-width': '1px'});
}


/**
 * Change the year of reference.
 *
 * @param {object} d The data associated to the clicked element
 * @param {object[]} data The data to be used
 * @param {*} xScale The graph's x scale
 * @param {*} yScale The graph's y scale
 * @param {*} colorScale The color scale for the bars
* @param {number} height The height of the graph
 */
export function ChangeReference (d, data, xScale, yScale, colorScale, height) {

  const arrondi = 1000
  const transition_duration = 1000
  var new_reference = d.variation
  var new_reference_year = d.Year
  data.forEach(function (d1) {
    d1.variation = Math.round((d1.variation - new_reference) * arrondi ) / arrondi 
    d1.reference_year = new_reference_year})

  UpdateYScale (yScale, data, height)
  setSubtitleText(d.Year)

  d3.select('#graph-g-barchart')
  .selectAll('.bar')
  .data(data)
  .transition()
  .duration(transition_duration)
  .attr('x', function (d1) { return xScale(d1.Year)})
  .attr('y', function (d1) { return yScale(d1.emission)})
  .attr('width', xScale.bandwidth())
  .attr('height', function (d1) { return height - yScale(d1.emission) })
  .attr('fill', function (d1) { return colorScale(d1.variation)})
}

/**
 * Change the year of reference in the subtitle.
 *
 * @param {number} year The current year of reference
 */
export function setSubtitleText (year) {

  d3.select('.subtitle')
    .text("The year of reference is currently " + year)
}

/**
 * Display the information when the bar is hovered and emphazise the stroke width.
 *
 * @param {*} tip The tooltip containing the information of the hovered element
 */
export function setRectangleHoverHandler (tip) {
  d3.selectAll('.bar')
    .on('mouseover', function(d) { 
      tip.show(d, this)
      d3.select(this).attr('stroke-width',3)})

    .on('mouseout', function(d) {
      tip.hide(d, this)
      d3.select(this).attr('stroke-width',1)})

}