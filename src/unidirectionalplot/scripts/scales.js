
/**
 * Defines the log scale used to position the center of the circles in X.
 *
 * @param {number} width The width of the graph
 * @param {object} data The data to be used
 * @returns {*} The linear scale in X
 */
 export function setXScale (width, data) {
  
  const Scale = d3.scaleLinear()
    .domain([0, 20])
    .range([0, width])

  return Scale
}


/**
 * Defines the log scale used to position the center of the circles in Y.
 *
 * @param {number} height The height of the graph
 * @param {object} data The data to be used
 * @returns {*} The linear scale in Y
 */

export function setYScale (height, data) {
  // TODO : Set scale
// On récupère le % des Emissions Totales de chacune des années et chacun des pays dans un seul tableau pour en trouver le minimum et le maximum
const max = d3.max(data , function (d) {
  return parseFloat(d.temperature)
})

const min = d3.min(data, function (d) {
  return parseFloat(d.temperature)
})
const Scale = d3.scaleLinear()
  .domain([max+0.5, min-0.5])
  .range([0, height])

return Scale
}
