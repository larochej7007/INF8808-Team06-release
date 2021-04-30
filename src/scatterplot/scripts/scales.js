/**
 * Defines the color scale used to determine the color of the circle markers.
 *
 * The color of each circle is determined based on wether or the country has taken measures against CO2 Emissions
 *
 * @param {object} data The data to be displayed
 * @returns {*} The ordinal scale used to determine the color
 */
 export function setColorScale () {
  const Scale = d3.scaleOrdinal()
    .domain([0, 1, 2])
    .range(['red', 'green', 'black'])

  return Scale
}

/**
 * Defines the log scale used to position the center of the circles in X.
 *
 * @param {number} width The width of the graph
 * @param {object} data The data to be used
 * @returns {*} The linear scale in X
 */
export function setXScale (width, data) {
  const max = d3.max(data , function (d) {
    return parseFloat(d.PerCapita)
  })

  const min = d3.min(data, function (d) {
    return parseFloat(d.PerCapita)
  })
  const Scale = d3.scaleLog()
    .domain([min, max ])
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
const max = d3.max(data , function (d) {
  return parseFloat(d.percentTotalEmissions)
})

const min = d3.min(data, function (d) {
  return parseFloat(d.percentTotalEmissions)
})
const Scale = d3.scaleLog()
  .domain([min, max])
  .range([height, 0])

return Scale
}
