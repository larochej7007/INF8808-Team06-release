/**
 * Sets the domain and range of the X scale.
 *
 * @param {*} scale The x scale
 * @param {object[]} data The data to be used
 * @param {number} width The width of the graph
 */
export function UpdateXScale (scale, data, width) {
  // TODO : Set the domain and range of the groups' x scale
  var Year = []

  data.forEach(function (d) { Year.push(d.Year)})

  scale.domain(Year)
        .range([0, width-150])
}

/**
 * Sets the domain and range of the Y scale.
 *
 * @param {*} scale The Y scale
 * @param {object[]} data The data to be used
 * @param {number} height The height of the graph
 */
export function UpdateYScale (scale, data, height) {
  // TODO : Set the domain and range of the graph's y scale
   var Emission = []

  data.forEach(function (d) { Emission.push(parseFloat(d.emission))})

  scale.domain([d3.max(Emission), 0])
        .range([0, height])
}

/**
 * Draws the bars inside the groups
 *
 * @param {*} y The graph's y scale
 * @param {*} xSubgroup The x scale to use to position the rectangles in the groups
 * @param {string[]} players The names of the players, each corresponding to a bar in each group
 * @param {number} height The height of the graph
 * @param {*} color The color scale for the bars
 * @param {*} tip The tooltip to show when each bar is hovered and hide when it's not
 */
export function UpdateBars (yScale, xScale, data, height, colorScale) {
  // TODO : Draw the bars

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


export function setColorScaleDomain (colorScale, data) {
  // TODO : Set domain of color scale
  var absolute_variations = []
  // We search the maximum variation which has occured between each year during the period so that we won't have to update the scale for each transition
  for (var i = 0; i < data.length; i++){
    var reference = data[i].variation
    data.forEach(function (d) { 
      d.variation = Math.round((d.variation - reference) * 1000 ) / 1000
      absolute_variations.push(d.variation)
    })
  }
  // We use 1960 as the year reference
  var reference = data[0].variation
  var reference_year = data[0].Year
  data.forEach(function (d) { 
    d.variation = Math.round((d.variation - reference) * 1000 ) / 1000
    d.reference_year = reference_year})
  // On cherche le maximum en valeur absolue
  var max_variation = Math.ceil(d3.max(absolute_variations))
  // L'échelle allant du rouge vers le bleu, il faut donc mettre les variations positives d'abord. 
  // De plus, on prend en valeur absolue la même variation pour le min et le max afin d'être centré en 0 qui aura une couleur blanche

  colorScale.domain([max_variation,-max_variation]) 

}


export function UpdateGrid (width, yScale) {
  // TODO : Set domain of color scale
  d3.select('.grid')
  		.call(d3.axisLeft(yScale).ticks(3)
            .tickSize(-width+150)
            .tickFormat("")
         )
      .raise()

  d3.select('.grid').selectAll('line')
      .style({ 'stroke': 'black', 'fill': 'none', 'stroke-width': '1px'});

}

export function ChangeReference (d, data, xScale, yScale, colorScale, height) {
  var new_reference = d.variation
  var new_reference_year = d.Year
  data.forEach(function (d1) {
    d1.variation = Math.round((d1.variation - new_reference) * 1000 ) / 1000 
    d1.reference_year = new_reference_year})

  UpdateYScale (yScale, data, height)
  setSubtitleText(d.Year)

  d3.select('#graph-g-barchart')
  .selectAll('.bar')
  .data(data)
  .transition()
  .attr('x', function (d1) { return xScale(d1.Year)})
  .attr('y', function (d1) { return yScale(d1.emission)})
  .attr('width', xScale.bandwidth())
  .attr('height', function (d1) { return height - yScale(d1.emission) })
  .attr('fill', function (d1) { return colorScale(d1.variation)})
}

export function setSubtitleText (year) {
  // TODO : Set the title
  d3.select('.subtitle')
    .text("The year of reference is currently " + year)
}

export function setRectangleHoverHandler (tip) {
  d3.selectAll('.bar')
    .on('mouseover', function(d) { 
      tip.show(d, this)
      d3.select(this).attr('stroke-width',3)})

    .on('mouseout', function(d) {
      tip.hide(d, this)
      d3.select(this).attr('stroke-width',1)})

}