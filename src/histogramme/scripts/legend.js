/**
 * Initializes the definition for the gradient to use with the
 * given colorScale.
 *
 * @param {*} colorScale The color scale to use
 */
 export function initGradient (colorScale) {

  const svg = d3.select('.barchart-svg')

  const defs = svg.append('defs')

  const linearGradient = defs
    .append('linearGradient')
    .attr('id', 'gradient')
    .attr('x1', 0).attr('y1', 1).attr('x2', 0).attr('y2', 0)

  linearGradient.selectAll('stop')
    .data(colorScale.ticks().map((tick, i, nodes) => (
      {
        offset: `${100 * (i / nodes.length)}%`,
        color: colorScale(tick)
      })))
    .join('stop')
    .attr('offset', d => d.offset)
    .attr('stop-color', d => d.color)

}

/**
 * Initializes the SVG rectangle for the legend.
 */
 export function initLegendBar () {

  const svg = d3.select('.barchart-svg')
  svg
    .append('rect')
    .attr('class', 'legendbar-barchart')
}

/**
 *  Initializes the group for the legend's axis.
 */
export function initLegendAxis () {
  
  const svg = d3.select('.barchart-svg')
  svg
    .append('g')
    .attr('class', 'legendaxis-barchart')
}

/**
 * Draws the legend at the top of the graphic.
 *
 * @param {number} x The x position of the legend
 * @param {number} y The y position of the legend
 * @param {number} height The height of the legend
 * @param {number} width The width of the legend
 * @param {string} fill The fill of the legend
 * @param {*} colorScale The color scale represented by the legend
 */ 
export function draw (x, y, height, width, fill, colorScale) {
  
  const offset = 30
  const Scale = d3.scaleLinear()
                  .domain([colorScale.domain()[0],colorScale.domain()[1]])
                  .range([height, 0]) 

  d3.select('.legendaxis-barchart') // On ajoute les ticks de la légende
  .attr('transform', 'translate(' + x + ',' + (y-width-offset) + ')')
  .call(d3.axisTop(Scale).ticks(5).tickFormat(x => `${x}°C`))

  d3.select('.legendbar-barchart') // On ajoute le gradient de la légende
    .attr('height', height)
    .attr('width', width)
    .attr('fill', fill)
    .attr('transform', 'translate(' + x + ',' + (y-offset) + ')rotate(-90)')

}

