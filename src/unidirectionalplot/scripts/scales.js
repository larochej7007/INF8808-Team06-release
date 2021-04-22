

/**
 * Defines the log scale used to position the center of the circles in Y.
 *
 * @param {number} height The height of the graph
 * @param {object} data The data to be used
 * @returns {*} The linear scale in Y
 */
export function setYScale (height, data) {
  const max = 9000
  
  const min =0
  const Scale = d3.scaleLog()
    .domain([min, max])
    .range([height, 0])
  return Scale
}
export function setXScale (width, data) {
  const max = 6
  
  const min = 0
  const Scale = d3.scaleLog()
    .domain([min, max])
    .range([width, 0])
  return Scale
}