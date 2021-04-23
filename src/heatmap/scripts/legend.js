import { color } from "d3-color";

/**
 * Initializes the definition for the gradient to use with the
 * given colorScale.
 *
 * @param {*} colorScale The color scale to use
 */
export function initGradient(positiveColorScale, negativeColorScale) {
  const svg = d3.select(".heatmap-svg");

  svg.attr('transform', 'translate(0,100)')

  const defs = svg.append("defs");

  const positiveGradient = defs
    .append("linearGradient")
    .attr("id", "positiveGradient")
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", 1)
    .attr("y2", 0);

    positiveGradient
    .selectAll("stop")
    .data(
      positiveColorScale.ticks().map((tick, i, nodes) => ({
        offset: `${100 * (i / nodes.length)}%`,
        color: positiveColorScale(tick),
      }))
    )
    .join("stop")
    .attr("offset", (d) => d.offset)
    .attr("stop-color", (d) => d.color);

  const negativeGradient = defs
    .append("linearGradient")
    .attr("id", "negativeGradient")
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", 1)
    .attr("y2", 0);

    negativeGradient
    .selectAll("stop")
    .data(
      negativeColorScale.ticks().map((tick, i, nodes) => ({
        offset: `${100 * (i / nodes.length)}%`,
        color: negativeColorScale(tick),
      }))
    )
    .join("stop")
    .attr("offset", (d) => d.offset)
    .attr("stop-color", (d) => d.color);
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
    .attr("width", width/2);

  d3.select(".negativeLegend")
    .attr("fill", negativeFill)
    .attr("x", x)
    .attr("y", y)
    .attr("height", height)
    .attr("width", width/2);

    var scale = (positiveColorScale.domain())
    var legendPositiveColorScale = d3.scaleLinear()
    .range([0, width/2])
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
    );

  scale = (negativeColorScale.domain())
  var legendNegativeColorScale = d3
    .scaleLinear()
    .range([width/2, 0])
    .domain([scale[1], scale[0]]);

  d3.select(".negativeValuesLegend").remove()
  d3.select(".legend.axis")
    .append("g")
    .attr('class', 'negativeValuesLegend')
    .attr("transform", "translate(" + x + ", " + y + ")")
    .call(
      d3
        .axisTop(legendNegativeColorScale)
        .ticks(6)
    );
}