
/**
 * Generates the SVG element g which will contain the data visualisation.
 *
 * @param {object} margin The desired margins around the graph
 * @returns {*} The d3 Selection for the created g element
 */
 export function generateG (margin) {
  return d3.select('#unidirectplot')
    .select('svg')
    .append('g')
    .attr('id', 'graph-g-unidirectplot')
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
  d3.select('#unidirectplot').select('svg')
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
    .attr('class', 'x-axis-unidirectplot')

  g.append('g')
    .attr('class', 'y-axis-unidirectplot')
}
/**
 * Appends the labels for the the y axis and the title of the graph.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */
export function appendGraphLabels (g) {
  g.append('text')
    .text('Variation Temperature')
    .attr('class', 'y axis-text')
    .attr('transform', 'rotate(-90)')
    .attr('font-size', 12)
  
  g.append('text')
  .text(' ')
  .attr('class', 'x axis-text')
  .attr('transform', 'rotate(-90)')
  .attr('font-size', 12)

}

/**
 * Draws the X axis at the bottom of the diagram.
 *
 * @param {*} xScale The scale to use to draw the axis
 * @param {number} height The height of the graphic
 */
export function drawXAxis (xScale, height) {
  d3.select('.x-axis-unidirectplot')
    .attr('transform', 'translate( 0, ' + height + ')')
    .call(d3.axisBottom(xScale).tickSizeOuter(0).tickArguments([5, '.0r']))
}

/**
 * Draws the Y axis to the left of the diagram.
 *
 * @param {*} yScale The scale to use to draw the axis
 */
export function drawYAxis (yScale) {
  d3.select('.y-axis-unidirectplot')
    .call(d3.axisLeft(yScale).tickSizeOuter(0).tickArguments([5, '.0r']))
}

/**
 * Places the graph's title.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */
export function placeTitle (g) {
  g.append('text')
    .attr('id', 'title-unidirectplot')
    .attr('x', 0)
    .attr('y', -20)
    .attr('font-size', 14)
}

/**
 * Draws the button to toggle the display year.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 * @param {number} year The year to display
 * @param {number} width The width of the graph, used to place the button
 */
export function drawButton1 (g, year, width) {
  const button = g.append('g')
    .attr('class', 'button')
    .attr('id', 'button1-unidirectplot')
    .attr('transform', 'translate(' + (width + 20) + ', 140)')
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
 * @param g
 * @param width
 */
 export function drawButton2 (g, width) {
  const button = g.append('g')
    .attr('class', 'button')
    .attr('id', 'button2-unidirectplot')
    .attr('transform', 'translate(' + (width + 20) + ', 180)')
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
    .text('Previous year')
    .attr('font-size', '10px')
    .attr('fill', '#362023')
}

/**
 * @param g
 * @param width
 */
 export function drawButton3 (g, width) {
  const button = g.append('g')
    .attr('class', 'button')
    .attr('id', 'button3-unidirectplot')
    .attr('transform', 'translate(' + (width + 100) + ', 180)')
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
    .text('Next year')
    .attr('font-size', '10px')
    .attr('fill', '#362023')
}

/**
 * @param g
 * @param width
 */
 export function drawButton5 (g, width) {
  const button = g.append('g')
    .attr('class', 'button')
    .attr('id', 'button5-unidirectplot')
    .attr('transform', 'translate(' + (20 + width) + ', 220)')
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
    .text('Jump 10 years backward')
    .attr('font-size', '10px')
    .attr('fill', '#362023')
}

/**
 * @param g
 * @param width
 */
 export function drawButton6 (g, width) {
  const button = g.append('g')
    .attr('class', 'button')
    .attr('id', 'button6-unidirectplot')
    .attr('transform', 'translate(' + (20 + width) + ', 260)')
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
    .text('Jump 10 years forward')
    .attr('font-size', '10px')
    .attr('fill', '#362023')
}

/**
 * @param g
 * @param width
 */
 export function drawButton7 (g, width) {
  const button = g.append('g')
    .attr('class', 'button')
    .attr('id', 'button7-unidirectplot')
    .attr('transform', 'translate(' + (20 + width) + ', 300)')
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

export function HideButton1(g) {
  g.select('#button1-unidirectplot').remove()
}

export function HideButton2(g) {
  g.select('#button2-unidirectplot').remove()
}

export function HideButton3(g) {
  g.select('#button3-unidirectplot').remove()
}

export function HideButton4(g) {
  g.select('#button4-unidirectplot').remove()
}

export function HideButton5(g) {
  g.select('#button5-unidirectplot').remove()
}
export function HideButton6(g) {
  g.select('#button6-unidirectplot').remove()
}
export function HideButton7(g) {
  g.select('#button7-unidirectplot').remove()
}
