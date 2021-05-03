/**
 * Generate global variables usefull for the following functions
 * 
 * @param {*} width 
 */

 export function translate(width) {
  window.translate1=width+20
  window.translate2=width+100
}

/**
 * Generates the SVG element g which will contain the data visualisation.
 *
 * @param {object} margin The desired margins around the graph
 * @returns {*} The d3 Selection for the created g element
 */
export function generateG (margin) {
  return d3.select('#scatterplot')
    .select('svg')
    .append('g')
    .attr('id', 'graph-g-scatterplot')
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
  d3.select('#scatterplot').select('svg')
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
    .attr('class', 'x-axis-scatterplot')

  g.append('g')
    .attr('class', 'y-axis-scatterplot')
}
/**
 * Appends the labels for the the y axis and the title of the graph.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */
export function appendGraphLabels (g) {
  g.append('text')
    .text('% Of Total C02 Emissions')
    .attr('class', 'y axis-text')
    .attr('font-size', 12)

  g.append('text')
    .text('CO2 emissions per capita (metric tons)')
    .attr('class', 'x axis-text')
    .attr('font-size', 12)
}

/**
 * Draws the X axis at the bottom of the diagram.
 *
 * @param {*} xScale The scale to use to draw the axis
 * @param {number} height The height of the graphic
 */
export function drawXAxis (xScale, height) {
  d3.select('.x-axis-scatterplot')
    .attr('transform', 'translate( 0, ' + height + ')')
    .call(d3.axisBottom(xScale).tickSizeOuter(0).tickArguments([5, '.0r']))
}

/**
 * Draws the Y axis to the left of the diagram.
 *
 * @param {*} yScale The scale to use to draw the axis
 */
export function drawYAxis (yScale) {
  d3.select('.y-axis-scatterplot')
    .call(d3.axisLeft(yScale).tickSizeOuter(0).tickArguments([5, '.0r']))
}

/**
 * Places the graph's title.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */
export function placeTitle (g) {
  g.append('text')
    .attr('id', 'title-scatterplot')
    .attr('x', 0)
    .attr('y', -20)
    .attr('font-size', 14)
}

/**
 * Draws the button "See .. dataset"
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 * @param {number} year The year to display
 */
export function drawButton1 (g, year) {
  const button = g.append('g')
    .attr('class', 'button')
    .attr('id', 'button1')
    .attr('transform', 'translate(' + translate1 + ', 450)')
    .attr('width', 150)
    .attr('height', 30)

  button.append('rect')
    .attr('width', 150)
    .attr('height', 30)
    .attr('fill', '#f4f6f4')
    .on('mouseenter', function () {
      d3.select(this).attr('stroke', '#362023')
    })
    .on('mouseleave', function () {
      d3.select(this).attr('stroke', '#f4f6f4')
    })

  button.append('text')
    .attr('x', 75)
    .attr('y', 15)
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'middle')
    .attr('class', 'button-text')
    .text('See ' + year + ' dataset')
    .attr('font-size', '10px')
    .attr('fill', '#362023')
}

/**
 * Draws the button "-1 Years"
 * 
 * @param g
 */
 export function drawButton2 (g) {
  const button = g.append('g')
    .attr('class', 'button')
    .attr('id', 'button2')
    .attr('transform', 'translate(' + translate1 + ', 280)')
    .attr('width', 70)
    .attr('height', 30)

  button.append('rect')
    .attr('width', 70)
    .attr('height', 30)
    .attr('fill', '#f4f6f4')
    .on('mouseenter', function () {
      d3.select(this).attr('stroke', '#362023')
    })
    .on('mouseleave', function () {
      d3.select(this).attr('stroke', '#f4f6f4')
    })

  button.append('text')
    .attr('x', 35)
    .attr('y', 15)
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'middle')
    .attr('class', 'button-text')
    .text('-1 Year')
    .attr('font-size', '10px')
    .attr('fill', '#362023')
}

/**
 * Draws the button "+1 Years"
 * 
 * @param g
 */
 export function drawButton3 (g) {
  const button = g.append('g')
    .attr('class', 'button')
    .attr('id', 'button3')
    .attr('transform', 'translate(' + translate2 + ', 280)')
    .attr('width', 70)
    .attr('height', 30)

  button.append('rect')
    .attr('width', 70)
    .attr('height', 30)
    .attr('fill', '#f4f6f4')
    .on('mouseenter', function () {
      d3.select(this).attr('stroke', '#362023')
    })
    .on('mouseleave', function () {
      d3.select(this).attr('stroke', '#f4f6f4')
    })

  button.append('text')
    .attr('x', 35)
    .attr('y', 15)
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'middle')
    .attr('class', 'button-text')
    .text('+1 Year')
    .attr('font-size', '10px')
    .attr('fill', '#362023')
}

/**
 * Draws the button "Reset"
 * 
 * @param g
 */
 export function drawButton4 (g) {
  const button = g.append('g')
    .attr('class', 'button')
    .attr('id', 'button4')
    .attr('transform', 'translate(' + translate1 + ', 120)')
    .attr('width', 150)
    .attr('height', 30)

  button.append('rect')
    .attr('width', 150)
    .attr('height', 30)
    .attr('fill', '#f4f6f4')
    .on('mouseenter', function () {
      d3.select(this).attr('stroke', '#362023')
    })
    .on('mouseleave', function () {
      d3.select(this).attr('stroke', '#f4f6f4')
    })

  button.append('text')
    .attr('x', 75)
    .attr('y', 15)
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'middle')
    .attr('class', 'button-text')
    .text('Reset')
    .attr('font-size', '10px')
    .attr('fill', '#362023')
}

/**
 * Draws the button "- 10 Years"
 * 
 * @param g
 */
 export function drawButton5 (g) {
  const button = g.append('g')
    .attr('class', 'button')
    .attr('id', 'button5')
    .attr('transform', 'translate(' + translate1 + ', 320)')
    .attr('width', 70)
    .attr('height', 30)

  button.append('rect')
    .attr('width', 70)
    .attr('height', 30)
    .attr('fill', '#f4f6f4')
    .on('mouseenter', function () {
      d3.select(this).attr('stroke', '#362023')
    })
    .on('mouseleave', function () {
      d3.select(this).attr('stroke', '#f4f6f4')
    })

  button.append('text')
    .attr('x', 35)
    .attr('y', 15)
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'middle')
    .attr('class', 'button-text')
    .text('-10 Years')
    .attr('font-size', '10px')
    .attr('fill', '#362023')
}

/**
 * Draws the button "+ 10 Years"
 * 
 * @param g
 */
 export function drawButton6 (g) {
  const button = g.append('g')
    .attr('class', 'button')
    .attr('id', 'button6')
    .attr('transform', 'translate(' + translate2 + ', 320)')
    .attr('width', 70)
    .attr('height', 30)

  button.append('rect')
    .attr('width', 70)
    .attr('height', 30)
    .attr('fill', '#f4f6f4')
    .on('mouseenter', function () {
      d3.select(this).attr('stroke', '#362023')
    })
    .on('mouseleave', function () {
      d3.select(this).attr('stroke', '#f4f6f4')
    })

  button.append('text')
    .attr('x', 35)
    .attr('y', 15)
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'middle')
    .attr('class', 'button-text')
    .text('+10 Years')
    .attr('font-size', '10px')
    .attr('fill', '#362023')
}

/**
 * Draws the button "Animation"
 * 
 * @param g
 */
 export function drawButton7 (g) {
  const button = g.append('g')
    .attr('class', 'button')
    .attr('id', 'button7')
    .attr('transform', 'translate(' + translate1 + ', 120)')
    .attr('width', 150)
    .attr('height', 30)

  button.append('rect')
    .attr('width', 150)
    .attr('height', 30)
    .attr('fill', '#f4f6f4')
    .on('mouseenter', function () {
      d3.select(this).attr('stroke', '#362023')
    })
    .on('mouseleave', function () {
      d3.select(this).attr('stroke', '#f4f6f4')
    })

  button.append('text')
    .attr('x', 75)
    .attr('y', 15)
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'middle')
    .attr('class', 'button-text')
    .text('Animation')
    .attr('font-size', '10px')
    .attr('fill', '#362023')
}

/**
 * Remove the button "See .. dataset"
 * 
 * @param {*} g 
 */
export function HideButton1(g) {
  g.select('#button1').remove()
}

/**
 * Remove the button "-1 Year"
 * 
 * @param {*} g 
 */
export function HideButton2(g) {
  g.select('#button2').remove()
}

/**
 * Remove the button "+1 Year"
 * 
 * @param {*} g 
 */
export function HideButton3(g) {
  g.select('#button3').remove()
}

/**
 * Remove the button "Reset"
 * 
 * @param {*} g 
 */
export function HideButton4(g) {
  g.select('#button4').remove()
}

/**
 * Remove the button "-10 Years"
 * 
 * @param {*} g 
 */
export function HideButton5(g) {
  g.select('#button5').remove()
}

/**
 * Remove the button "+10 Years"
 * 
 * @param {*} g 
 */
export function HideButton6(g) {
  g.select('#button6').remove()
}

/**
 * Remove the button "Animation"
 * 
 * @param {*} g 
 */
export function HideButton7(g) {
  g.select('#button7').remove()
}

/**
 * Draws the grid on the graph
 * 
 * @param {*} g 
 */
export function appendGrid (g) {
  g.append('g')
    .attr('class', 'grid')
    .attr('id', 'gridx')
    .style("stroke-dasharray",("1,1"))

  g.append('g')
  .attr('class', 'grid')
  .attr('id', 'gridy')
  .style("stroke-dasharray",("1,1"))
}