import { color } from 'd3'
import d3Legend, { legendColor } from 'd3-svg-legend'

/**
 * Draws the legend.
 *
 * @param {*} colorScale The color scale to use
 * @param {*} g The d3 Selection of the graph's g SVG element
 * @param {number} width The width of the graph, used to place the legend
 */
export function drawLegend (colorScale, g, width) {
  var padding = width + 15
  g.append('g')
    .attr('id', 'legend-scatterplot')
    .attr('transform', 'translate(' + padding + ',' + -10 + ')')

  var legend = d3Legend.legendColor()
    .shape('circle')
    .title('Legend')
    .cells(3)
    .labels(['No measure taken', 'Measure taken', 'World'])
    .scale(colorScale)


  g.select('#legend-scatterplot')
    .call(legend)
}
