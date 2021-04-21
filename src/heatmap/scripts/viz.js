/**
 * Sets the domain of the color scale
 *
 * @param {*} colorScale The color scale used in the heatmap
 * @param {object[]} data The data to be displayed
 */
export function setColorScaleDomain(positiveColorScale, negativeColorScale, data) {
  const min = d3.min(data, function (dataline) {
    return dataline.annual_anomaly;
  });

  const max = d3.max(data, function (dataline) {
    return dataline.annual_anomaly;
  });
  

  if(Math.abs(min) >= Math.abs(max)) {
    var val = (Math.round(min * 10) / 10).toFixed(1)
    positiveColorScale.domain([0, Math.abs(val)]);
    negativeColorScale.domain([-Math.abs(val), 0]);

    return;
  }

  var val = (Math.round(max * 10) / 10).toFixed(1)
  positiveColorScale.domain([0, Math.abs(val)]);
  negativeColorScale.domain([-Math.abs(val), 0]);

}

/**
 * For each data element, appends a group 'g' to which an SVG rect is appended
 *
 * @param {object[]} data The data to use for binding
 */
export function appendRects(data) {
  d3.select("#graph-g-heatmap")
    .selectAll(".year-count-g")
    .data(data)
    .join("g")
    .attr("class", "year-count-g")
    .append("rect")
    .attr("class", "year-count-rect");
}

/**
 * Updates the domain and range of the scale for the x axis
 *
 * @param {*} xScale The scale for the x axis
 * @param {object[]} data The data to be used
 * @param {number} width The width of the diagram
 * @param {Function} range A utilitary funtion that could be useful to generate a list of numbers in a range
 */
export function updateXScale(xScale, data, width, range) {
  xScale.range([0, width]);

  const min = d3.min(data, function (dataline) {
    //return dataline.Year + (dataline.Month - 1)/12.0;
    return dataline.Year;
  });

  const max = d3.max(data, function (dataline) {
    return dataline.Year;
    //return dataline.Year + (dataline.Month - 1)/12.0;
  });

  //xScale.domain([min, max]);
  xScale.domain([min, max]);
}

/**
 * Updates the domain and range of the scale for the y axis
 *
 * @param {*} yScale The scale for the y axis
 * @param {string[]} neighborhoodNames The names of the neighborhoods
 * @param {number} height The height of the diagram
 */
export function updateYScale(yScale, neighborhoodNames, height) {
  yScale.range([height, 0]);

  yScale.domain(neighborhoodNames);
}

/**
 *  Draws the X axis at the top of the diagram.
 *
 *  @param {*} xScale The scale to use to draw the axis
 */
export function drawXAxis(xScale, height, yScale) {
  d3.select(".x-axis-heatmap")
    .call(d3.axisBottom(xScale).ticks(12).tickFormat((y) => `${y}`));

  d3.selectAll(".x-axis-heatmap .tick")
  .append('rect')
  .attr('y', -height - yScale.bandwidth() - 100)
  .attr('height', height + yScale.bandwidth() + 5 + 100)
  .attr('width', 1)
  .attr('fill', 'rgb(0, 0, 0)');
}

/**
 * Draws the Y axis to the right of the diagram.
 *
 * @param {*} yScale The scale to use to draw the axis
 * @param {number} width The width of the graphic
 */
export function drawYAxis(yScale, xScale, width, margin) {
  d3.select(".y-axis-heatmap")
    .attr("transform", "translate(" + width + ", 0)")
    .call(d3.axisRight(yScale).tickFormat((y) => `${y}`));
    d3.select(".sortIconGroup")
    .attr('transform', "translate(" + (width +  margin.left + xScale(1901)) + ", " + (margin.top - 40) + ")")

}

/**
 * Rotates the ticks on the X axis 45 degrees towards the left.
 */
export function positionXTicks(height, yScale, xScale) {
  d3.select(".x-axis-heatmap")
    .attr("transform", "translate( 0, " + (height + 100) + ")")
}

/**
 * After the rectangles have been appended, this function dictates
 * their position, size and fill color.
 *
 * @param {*} xScale The x scale used to position the rectangles
 * @param {*} yScale The y scale used to position the rectangles
 * @param {*} colorScale The color scale used to set the rectangles' colors
 */
export function updateRects(xScale, yScale, positiveColorScale, negativeColorScale, width) {
  d3.select("#graph-g-heatmap")
    .selectAll(".year-count-rect")
    .attr("x", function (d, i) {
      return xScale(d.Year);
      //return xScale(d.Year + (d.Month - 1)/12.0);
    })
    .attr("y", function (d, i) {
      if(d["Country"] == "Global-land") {
        return yScale.range()[0] + 2 * yScale.bandwidth()
      }
      return yScale(d.Country);
    })
    .attr("fill", function (d, i) {

      if(d.annual_anomaly === "n/a") {
        return "white";
      }

      if(d.annual_anomaly <= 0) {
        return negativeColorScale(d.annual_anomaly);
      }

      return positiveColorScale(d.annual_anomaly);

    })
    .attr("height", function (d, i) {
      if(d["Country"] == "Global-land") {
        return 4 * yScale.bandwidth()
      }
      return yScale.bandwidth();
    })
    .attr("width", function (d, i) {
      return width/(120);
      //return width/(120 * 12);
    });
}


/**
 * Sets up the hover event handler. The tooltip should show on on hover.
 *
 * @param {*} tip The tooltip
 */
 export function setCircleHoverHandler (tip) {
  d3.selectAll('.year-count-rect')
  .on('mouseover.tip', tip.show)
  .on('mouseout.tip', tip.hide)
}
