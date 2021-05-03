import { range, svg } from 'd3'

/**
 * Sets the domain and range of the X scale.
 *
 * @param {*} scale The x scale
 * @param {object[]} data The data to be used
 * @param {number} width The width of the graph
 */
export function updateXScale (scale, start, end, width) {
  scale.domain([start, end]).range([0, width])
}

/**
 * Sets the domain and range of the Y scale.
 *
 * @param {*} scale The Y scale
 * @param {object[]} data The data to be used
 * @param {number} height The height of the graph
 * @param {number} margin The margin of the graph
 */
export function updateYScale (scale, data, height) {
  // TODO : Set the domain and range of the graph's y scale
  // TODO : Set the domain and range of the groups' x scale
  var min = d3.min(data, (d) => {
    return d.Min
  })

  var max = d3.max(data, (d) => {
    return d.Max
  })

  scale.domain([max, min]).range([0, height])
  
}

/**
 * Appends an SVG g element which will contain the axes.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */
 export function appendAxes (g) {
    g.append("g")
      .attr("class", "x-axis-linechart")

    g.append("g")
      .attr("class", "y-axis-linechart")
}

export function setGraphTitle(g, countryName) {
  g.append('text')
  .text("Details for selection: " + countryName)
  .attr("x", 0)
  .attr("y", 0)
  .attr("text-anchor", "start")
  .attr("dominant-baseline", "hanging")
  .attr("style", "font-family: Times New Roman; font-size: 24; stroke: #000000; fill: #000000;")
}



