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
 */
export function updateYScale (scale, data, height) {
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

/**
 * Set the viz title
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 * @param {string} countryName The name of the country being shown in the viz
 */
export function setGraphTitle(g, countryName) {
  g.append('text')
  .text("Details for selection: " + countryName)
  .attr("x", 0)
  .attr("y", 0)
  .attr("text-anchor", "start")
  .attr("dominant-baseline", "hanging")
  .attr("style", "font-family: Times New Roman; font-size: 24; stroke: #000000; fill: #000000;")
}

/**
 * Set the container of the hover content
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */
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

    // The rect used to register the mouse movements
    g.append('rect')
      .attr("class", "focusRect")
      .style("fill", "none")
}

/**
 * Set the container of the legend content
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */
export function initLegend(g) {
  g.append('g')
    .attr('id', 'legend-linechart')
}

/**
 *  Draws the X axis at the bottom of the diagram.
 *
 *  @param {*} xScale The scale to use to draw the axis
 *  @param {*} graphSize The size of the graph
 *  @param {*} svgGraph The d3 Selection of the graph's g SVG element
 */
export function drawXAxis(xScale, graphSize, svgGraph) {
    var x_axis = d3.axisBottom(xScale)
      .ticks(24)
      .tickFormat((y) => `${y}`);

    svgGraph
      .select(".x-axis-linechart")
      .attr("transform", "translate(" + 0 + " ," + (graphSize.height) + ")")
      .call(x_axis)
}

/**
 *  Draws the Y axis at the left of the diagram.
 *
 *  @param {*} yScale The scale to use to draw the axis
 *  @param {*} graphSize The size of the graph
 *  @param {*} svgGraph The d3 Selection of the graph's g SVG element
 */
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

/**
 *  Draws the lines of the chart.
 *
 *  @param {*} data The dataset
 *  @param {*} xScale The scale to use for the x axis
 *  @param {*} yScale The scale to use for the y axis
 *  @param {*} svgGraph The d3 Selection of the graph's g SVG element
 */
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

/**
 *  Draws the legend of the chart
 *
 *  @param {*} graphSize The size of the graph
 *  @param {number} marginVertical The vertical margin of the graph
 *  @param {*} svgGraph The d3 Selection of the graph's g SVG element
 */
export function drawLegend(graphSize, marginVertical, svgGraph) {
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
    
/**
 *  Handler for when the mouse quit the chart area
 *
 *  @param {*} focusText Selection of the hover text
 *  @param {*} focusLine Selection of the hover line
 */  
function mouseout(focusText, focusLine) {
  focusLine.style("opacity", 0)
  focusText.style("opacity", 0)
}


/**
 *  Handler for when the mouse enter the chart area
 *
 *  @param {*} focusText Selection of the hover text
 *  @param {*} focusLine Selection of the hover line
 */  
function mouseover(focusText, focusLine) {
  focusLine.style("opacity", 1)
  focusText.style("opacity", 1)
}


/**
 *  Handler for when the mouse move on the chart area
 *
 *  @param {*} focdatausText The dataset
 *  @param {number} xPosition The x coordinate of the mouse
 *  @param {*} xScale The scale used for the x axis
 *  @param {*} yScale The scale used for the y axis
 *  @param {function} bisect The function used to get the data closest to the mouse position
 *  @param {*} focusText Selection of the hover text
 *  @param {*} focusLine Selection of the hover line
 */  
function mousemove(data, xPosition, xScale, yScale, bisect, focusText, focusLine) {
  // recover coordinate we need
  var x0 = xScale.invert(xPosition);
  var i = bisect(data, x0, 1) - 1;
  var selectedData = data[i]
  focusLine
    .attr("x1", xScale(selectedData.Year))
    .attr("y1", yScale.range()[0])
    .attr("x2", xScale(selectedData.Year))
    .attr("y2", yScale.range()[1])

  focusText
    .attr("x", xScale(selectedData.Year) - 35)
    .attr("y", -40)
    .html("")
    .append("tspan")
    .html("Year: " + selectedData.Year)

  focusText
    .append("tspan")
    .attr("x", xScale(selectedData.Year) - 35)
    .attr("dy", 12)
    .html("Max: " + selectedData.Max + "°C")

  focusText
    .append("tspan")
    .attr("dy", 12)
    .attr("x", xScale(selectedData.Year) - 35)
    .html("Avg: " + selectedData.AVG  + "°C")

  focusText
    .append("tspan")
    .attr("dy", 12)
    .attr("x", xScale(selectedData.Year) - 35)
    .html("Min: " + selectedData.Min  + "°C")
}


/**
 *  Set the handler for the mouse events of the chart
 *
 *  @param {*} focdatausText The dataset
 *  @param {number} xPosition The x coordinate of the mouse
 *  @param {*} xScale The scale used for the x axis
 *  @param {*} yScale The scale used for the y axis
 *  @param {function} bisect The function used to get the data closest to the mouse position
 *  @param {*} svgGraph The d3 Selection of the graph's g SVG element
 */  
export function setHoverHandler(data, xScale, yScale, graphSize, bisect, svgGraph) {
  // Create the circle that travels along the curve of chart
  var focusLine = svgGraph.select(".focusLine")
  var focusText = svgGraph.select(".focusText")
  
  // Create a rect on top of the svg area: this rectangle recovers mouse position
  svgGraph
    .select(".focusRect")
    .style("pointer-events", "all")
    .attr('width', graphSize.width + 10)
    .attr('height', graphSize.height)
    .on('mouseover', () => { mouseover(focusText, focusLine) })
    .on('mousemove', function(){
      mousemove(data, d3.mouse(this)[0], xScale, yScale, bisect, focusText, focusLine) })
    .on('mouseout', () => { mouseout(focusText, focusLine) });
}
