
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
    .attr('fill', 'gray')
    .attr('font-size', 12)

  g.append('text')
    .text('CO2 emissions per capita (metric tons)')
    .attr('class', 'x axis-text')
    .attr('fill', 'gray')
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
    .attr('x', -20)
    .attr('y', -20)
    .attr('font-size', 20)
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
    .attr('id', 'button1')
    .attr('transform', 'translate(' + (width + 20) + ', 450)')
    .attr('width', 150)
    .attr('height', 30)

  button.append('rect')
    .attr('width', 150)
    .attr('height',32)
    .attr('fill', '#4b4b4b')

  button.append('rect')
    .attr('width', 150)
    .attr('height', 30)
    .attr('fill', '#c4c6c4')
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
    .attr('font-size', '16px')
    .attr('fill', '#0c0a0a')
}

/**
 * @param g
 * @param width
 */
 export function drawButton2 (g, width) {
  const button = g.append('g')
    .attr('class', 'button')
    .attr('id', 'button2')
    .attr('transform', 'translate(' + (width + 20) + ', 280)')
    .attr('width', 70)
    .attr('height', 30)

  button.append('rect')
    .attr('width', 70)
    .attr('height',32)
    .attr('fill', '#4b4b4b')

  button.append('rect')
    .attr('width', 70)
    .attr('height', 30)
    .attr('fill', '#c4c6c4')
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
    .attr('font-size', '15px')
    .attr('fill', '#362023')
}

/**
 * @param g
 * @param width
 */
 export function drawButton3 (g, width) {
  const button = g.append('g')
    .attr('class', 'button')
    .attr('id', 'button3')
    .attr('transform', 'translate(' + (width + 100) + ', 280)')
    .attr('width', 70)
    .attr('height', 30)

  button.append('rect')
    .attr('width', 70)
    .attr('height',32)
    .attr('fill', '#4b4b4b')  
    
  button.append('rect')
    .attr('width', 70)
    .attr('height', 30)
    .attr('fill', '#c4c6c4')
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
    .attr('font-size', '15px')
    .attr('fill', '#362023')
}

/**
 * @param g
 * @param width
 */
 export function drawButton4 (g, width) {
  const button = g.append('g')
    .attr('class', 'button')
    .attr('id', 'button4')
    .attr('transform', 'translate(' + (20 + width) + ', 120)')
    .attr('width', 150)
    .attr('height', 30)

  button.append('rect')
    .attr('width', 150)
    .attr('height',32)
    .attr('fill', '#4b4b4b')

  button.append('rect')
    .attr('width', 150)
    .attr('height', 30)
    .attr('fill', '#c4c6c4')
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
    .attr('font-size', '16px')
    .attr('fill', '#362023')
}

/**
 * @param g
 * @param width
 */
 export function drawButton5 (g, width) {
  const button = g.append('g')
    .attr('class', 'button')
    .attr('id', 'button5')
    .attr('transform', 'translate(' + (20 + width) + ', 320)')
    .attr('width', 70)
    .attr('height', 30)

  button.append('rect')
    .attr('width', 70)
    .attr('height',32)
    .attr('fill', '#4b4b4b')

  button.append('rect')
    .attr('width', 70)
    .attr('height', 30)
    .attr('fill', '#c4c6c4')
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
    .attr('font-size', '15px')
    .attr('fill', '#362023')
}

/**
 * @param g
 * @param width
 */
 export function drawButton6 (g, width) {
  const button = g.append('g')
    .attr('class', 'button')
    .attr('id', 'button6')
    .attr('transform', 'translate(' + (100 + width) + ', 320)')
    .attr('width', 70)
    .attr('height', 30)

  button.append('rect')
    .attr('width', 70)
    .attr('height',32)
    .attr('fill', '#4b4b4b')

  button.append('rect')
    .attr('width', 70)
    .attr('height', 30)
    .attr('fill', '#c4c6c4')
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
    .attr('font-size', '15px')
    .attr('fill', '#362023')
}

/**
 * @param g
 * @param width
 */
 export function drawButton7 (g, width) {
  const button = g.append('g')
    .attr('class', 'button')
    .attr('id', 'button7')
    .attr('transform', 'translate(' + (20 + width) + ', 120)')
    .attr('width', 150)
    .attr('height', 30)

  button.append('rect')
    .attr('width', 150)
    .attr('height',32)
    .attr('fill', '#4b4b4b')    

  button.append('rect')
    .attr('width', 150)
    .attr('height', 30)
    .attr('fill', '#c4c6c4')
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
    .attr('font-size', '16px')
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