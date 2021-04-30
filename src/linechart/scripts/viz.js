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



