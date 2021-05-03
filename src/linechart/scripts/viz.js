import { range, svg } from 'd3'

/**
 * Sets the domain and range of the X scale.
 *
 * @param {*} scale The x scale
* @param {number[2]} timeRangeLimits The time range limits to filter for (inclusive)
 * @param {number} width The width of the graph
 */
export function updateXScale (scale, timeRangeLimits, width) {
  scale.domain([timeRangeLimits[0], timeRangeLimits[1]]).range([0, width])
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

export function initHoverItems(g) {
    // Create the line that travels along the mouse
    g.append('line')
      .attr("class", "focusLine")
      .style("fill", "none")
      .attr("stroke", "black")
      .style("opacity", 0)

    // Create the text that travels along the mouse    
    g.append('text')
      .attr("class", "focusText")
      .style("opacity", 0)
      .attr("text-anchor", "left")
      .attr("alignment-baseline", "middle")

    g.append('rect')
      .attr("class", "focusRect")
      .style("fill", "none")
}

export function initLegend(g) {
  // Init legend
  g.append('g')
    .attr('id', 'legend-linechart')
}

export function drawXAxis(xScale, graphSize, svgGraph) {
    // Add scales to axis
    var x_axis = d3.axisBottom(xScale)
      .ticks(24)
      .tickFormat((y) => `${y}`);

    svgGraph
      .select(".x-axis-linechart")
      .attr("transform", "translate(" + 0 + " ," + (graphSize.height) + ")")
      .call(x_axis)
}

export function drawYAxis(yScale, graphSize, svgGraph) {
      
  var y_axis = d3.axisLeft()
    .scale(yScale)
    .tickSize(4)
    .tickSize(-graphSize.width)
    .tickFormat((y) => `${y}°C`);

  svgGraph
    .select(".y-axis-linechart")
    .call(y_axis);

  svgGraph.selectAll(".y-axis-linechart .tick line")
    .style("visibility", "visible")
    .style("stroke-dasharray", "1 1")
    .style("stroke",'#CCCCCC')
    .filter(d => { return d == 0 })
    .style("visibility", "visible")
    .style("stroke-dasharray", "none")
    .style("stroke",'#000000');
}

