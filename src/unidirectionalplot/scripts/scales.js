
/**
 * Defines the log scale used to position the center of the circles in X.
 *
 * @param {number} width The width of the graph
 * @param {object} data The data to be used
 * @returns {*} The linear scale in X
 */
export function setXScale (width, data) {
  return d3.scaleLog()
    .domain([0, 10 ])
    .range([0, width])
}

/**
 * Defines the log scale used to position the center of the circles in Y.
 *
 * @param {number} height The height of the graph
 * @param {object} data The data to be used
 * @returns {*} The linear scale in Y
 */
export function setYScale (height, data) {
  const max = d3.max(data , function (d) {
    return parseFloat(d.PIB)
  })
  
  const min = d3.min(data, function (d) {
    return parseFloat(d.PIB)
  })
  const Scale = d3.scaleLog()
    .domain([min, max])
    .range([height, 0])
  return Scale
}
