/**
 * Initializes the gradient for the scale passed by parameter
 *
 * @param {string} gradientId The color scale used
 * @param {*} scale The color scale used
 */
function addGradientDef(gradientId, scale, defs) {
  const positiveGradient = defs
    .append("linearGradient")
    .attr("id", gradientId)
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", 1)
    .attr("y2", 0);

    positiveGradient
    .selectAll("stop")
    .data(
      scale.ticks().map((tick, i, nodes) => ({
        offset: `${100 * (i / nodes.length)}%`,
        color: scale(tick),
      }))
    )
    .join("stop")
    .attr("offset", (d) => d.offset)
    .attr("stop-color", (d) => d.color);
}

/**
 * Initializes the definition for the gradient to use with the
 * given colorScale.
 *
 * @param {*} positiveColorScale The color scale used in the positive temperature varitation
 * @param {*} negativeColorScale The color scale used in the negative temperature varitation
 */
export function initGradient(positiveColorScale, negativeColorScale) {
  const svg = d3.select(".heatmap-svg");

  const defs = svg.append("defs");
  addGradientDef("positiveGradient", positiveColorScale, defs)
  addGradientDef("negativeGradient", negativeColorScale, defs)
}

/**
 * Initializes the SVG rectangles for the legend.
 */
export function initLegendBar() {
  const legendAxis = d3.select(".heatmap-svg")
    .select(".legend.axis");

  legendAxis.append("rect")
    .attr('class', 'positiveLegend')

  legendAxis.append("rect")
    .attr('class', 'negativeLegend')
}

/**
 *  Initializes the group for the legend's axis.
 */
export function initLegendAxis() {
  const svg = d3.select(".heatmap-svg");
  svg.append("g").attr("class", "legend axis");
  initLegendBar()
}

/**
 * Update a legend rect.
 * @param {string} selector Selector used to find the rect
 * @param {string} fill The fill of the legend
 * @param {number} x The x position of the legend
 * @param {number} y The y position of the legend
 * @param {number} height The height of the legend
 * @param {number} width The width of the legend
 * @param {*} colorScale The color scale represented by the legend
 */
function updateLegendRect(selector, fill, x, y, height, width) {
  d3.select(selector)
  .attr("fill", fill)
  .attr("x", x)
  .attr("y", y)
  .attr("height", height)
  .attr("width", width/2);
}

/**
 * Update a legend axe.
 * @param {string} selector Selector used to find the rect
 * @param {number} x The x position of the legend
 * @param {number} y The y position of the legend
 * @param {*} colorScale The color scale represented by the legend
 */
function updateLegendScale(selector, x, y, width, colorScale) {
  var scale = (colorScale.domain())
  var legendScale = d3.scaleLinear()
    .range([0, width/2])
    .domain([scale[0], scale[1]]);

  d3.select(selector).remove()

  d3.select(".legend.axis")
    .append("g")
    .attr('class', selector.slice(1))
    .attr("transform", "translate(" + x + ", " + y + ")")
    .call(
      d3
        .axisTop(legendScale)
        .ticks(6)
        .tickFormat(x => `${x}°C`)
    );
}

/**
 * Draws the legend to the top of the graphic.
 *
 * @param {number} x The x position of the legend
 * @param {number} y The y position of the legend
 * @param {number} height The height of the legend
 * @param {number} width The width of the legend
 * @param {string} positiveFill The fill of the positive part of the legend
 * @param {string} negativeFill The fill of the negative part of the legend
 * @param {*} positiveColorScale The color scale for the positive value represented by the legend
 * @param {*} negativeColorScale The color scale for the negative value represented by the legend
 */
export function draw(x, y, height, width, positiveFill, negativeFill, positiveColorScale, negativeColorScale) {
  updateLegendRect(".positiveLegend", positiveFill, x, y, height, width)
  updateLegendRect(".negativeLegend", negativeFill, x - width/2, y, height, width)

  updateLegendScale(".positiveValuesLegend", x, y, width, positiveColorScale)
  updateLegendScale(".negativeValuesLegend", x - width/2, y, width, negativeColorScale)
}