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
 * Initializes the SVG rectangle for the legend.
 */
export function initLegendBar() {
  const svg = d3.select(".heatmap-svg");
  svg.append("rect").attr("class", "legend bar");
}

/**
 *  Initializes the group for the legend's axis.
 */
export function initLegendAxis() {
  const svg = d3.select(".heatmap-svg");
  svg.append("g").attr("class", "legend axis");
}

/**
 * Draws the legend to the left of the graphic.
 *
 * @param {number} x The x position of the legend
 * @param {number} y The y position of the legend
 * @param {number} height The height of the legend
 * @param {number} width The width of the legend
 * @param {string} fill The fill of the legend
 * @param {*} colorScale The color scale represented by the legend
 */
export function draw(x, y, height, width, positiveFill, negativeFill, positiveColorScale, negativeColorScale) {

  if(d3.select(".positiveLegend").empty()) {
    d3.select(".legend.axis")
    .append("rect")
    .attr('class', 'positiveLegend')
  }

  if(d3.select(".negativeLegend").empty()) {
    d3.select(".legend.axis")
    .append("rect")
    .attr('class', 'negativeLegend')
  }

  d3.select(".positiveLegend")
    .attr("fill", positiveFill)
    .attr("x", x + width/2)
    .attr("y", y)
    .attr("height", height)
    .attr("width", width/4);

  d3.select(".negativeLegend")
    .attr("fill", negativeFill)
    .attr("x", x + width/4)
    .attr("y", y)
    .attr("height", height)
    .attr("width", width/4);

    var scale = (positiveColorScale.domain())
    var legendPositiveColorScale = d3.scaleLinear()
    .range([0, width/4])
    .domain([scale[0], scale[1]]);

  d3.select(".positiveValuesLegend").remove()

  d3.select(".legend.axis")
    .append("g")
    .attr('class', 'positiveValuesLegend')
    .attr("transform", "translate(" + (x + width/2) + ", " + y + ")")
    .call(
      d3
        .axisTop(legendPositiveColorScale)
        .ticks(6)
        .tickFormat(x => `${x}°C`)
    );

  scale = (negativeColorScale.domain())
  var legendNegativeColorScale = d3
    .scaleLinear()
    .range([width/4, 0])
    .domain([scale[1], scale[0]]);

  d3.select(".negativeValuesLegend").remove()
  d3.select(".legend.axis")
    .append("g")
    .attr('class', 'negativeValuesLegend')
    .attr("transform", "translate(" + (x + width/4) + ", " + y + ")")
    .call(
      d3
        .axisTop(legendNegativeColorScale)
        .ticks(6)
        .tickFormat(x => `${x}°C`)
    );
}