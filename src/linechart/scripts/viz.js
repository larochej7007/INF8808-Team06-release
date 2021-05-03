import { range, svg } from 'd3'
import d3Legend, { legendColor } from 'd3-svg-legend'

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

export function drawLines(data, xScale, yScale, svgGraph) {
  
      svgGraph.selectAll(".intervalLine")
        .data(data)
        .join('line')  
        .attr("class", "intervalLine")
        .style("stroke", "#b863b2")
        .style("stroke-width", 2)
        .attr("stroke-dasharray", 2)
        .attr("x1", d => { return xScale(d.Year) } )
        .attr("y1", d => { return yScale(d.Min) })
        .attr("x2", d => { return xScale(d.Year) })
        .attr("y2", d => { return yScale(d.Max) })

      svgGraph.selectAll(".maxLine").remove()
      svgGraph.append("path")
        .datum(data)
        .attr("class", "maxLine")
        .style("fill", "none")
        .attr("stroke", "#d40b20")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
          .x(function(d) { return xScale(d.Year) })
          .y(function(d) { return yScale(d.Max)})
        );

      svgGraph.selectAll(".minLine").remove()
      svgGraph.append("path")
        .datum(data) 
        .attr("class", "minLine")
        .attr("fill", "none")
        .attr("stroke", "#0c31d2")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
          .x(function(d) { return xScale(d.Year) })
          .y(function(d) { return yScale(d.Min)})
        );

      svgGraph.selectAll(".avgLine").remove()
      svgGraph.append("path")
        .datum(data) 
        .attr("class", "avgLine")
        .attr("fill", "none")
        .attr("stroke", "#000000")
        .attr("opacity", "1")
        .attr("stroke-width", 1)
        .attr("d", d3.line()
          .x(function(d) { return xScale(d.Year) })
          .y(function(d) { return  yScale(d.AVG)})
        );
}

export function drawLegend(graphSize, marginVertical, svgGraph) { 
  // Legend stuff
  const legendScale = d3.scaleOrdinal()
  .domain([0, 1, 2])
  .range(['#d40b20', 'black', '#0c31d2'])

  var padding = graphSize.width / 2 - 65 // On rajoute 15 pour ne pas avoir d'overlapping avec les données de 2015 et la légende
  svgGraph.select("#legend-linechart")
    .attr('transform', 'translate(' + padding + ',' + (graphSize.height + 0.5 * marginVertical) + ')') // Le -10 permet de relever un peu la légende
    
  var legend = d3Legend.legendColor()
    .shape('line')
    .cells(3)
    .labels(['Maximum', 'Average', 'Minimum'])
    .scale(legendScale)
    .orient("horizontal")
    .labelWrap(40)
    .shapeWidth(40)
    .shapePadding(20);


  svgGraph.select("#legend-linechart")
    .attr('transform', 'translate(' + padding + ',' + (graphSize.height + 0.5 * marginVertical) + ')') // Le -10 permet de relever un peu la légende
    .call(legend)
}
