/**
 * Sets up an event handler for when the mouse enters and leaves the squares
 * in the heatmap. When the square is hovered, it enters the "selected" state.
 *
 * The tick labels for the year and neighborhood corresponding to the square appear
 * in bold.
 *
 * @param {*} xScale The xScale to be used when placing the text in the square
 * @param {*} yScale The yScale to be used when placing the text in the square
 * @param {Function} rectSelected The function to call to set the mode to "selected" on the square
 * @param {Function} rectUnselected The function to call to remove "selected" mode from the square
 * @param {Function} selectTicks The function to call to set the mode to "selected" on the ticks
 * @param {Function} unselectTicks The function to call to remove "selected" mode from the ticks
 */
export function setRectHandler(
  xScale,
  yScale,
  rectSelected,
  rectUnselected,
  selectTicks,
  unselectTicks,
  margin,
  width
) {
  d3.selectAll(".year-count-g")
    .on("mouseover", function (d) {
      rectSelected(d3.select(this), xScale, yScale);
      selectTicks(
        d3.select(this).data()[0].country,
        yScale,
        margin,
        width
      );
    })
    .on("mouseout", function (d) {
      rectUnselected(d3.select(this));
      unselectTicks();
    });
}

/**
 * The function to be called when one or many rectangles are in "selected" state,
 * meaning they are being hovered or the tick label for their neighborhood
 * or year is hovered.
 *
 * The text representing the number of trees associated to the rectangle
 * is displayed in the center of the rectangle and their opacity is lowered to 75%.
 *
 * @param {*} element The selection of rectangles in "selected" state
 * @param {*} xScale The xScale to be used when placing the text in the square
 * @param {*} yScale The yScale to be used when placing the text in the square
 */
export function rectSelected(element, xScale, yScale) {
  //var color = "black";
  //if (element.data()[0].Counts >= 1000) {
  //  color = "white";
  //}
//
  //element.select(".year-count-rect").attr("opacity", "0.75");
//
  //element
  //  .append("text")
  //  .text(element.data()[0].Counts)
  //  .attr("class", "selectionText")
  //  .attr(
  //    "x",
  //    xScale(element.data()[0].Plantation_Year) + xScale.bandwidth() / 2
  //  )
  //  .attr(
  //    "y",
  //    yScale(element.data()[0].Arrond_Nom) + yScale.bandwidth() / 2 + 2
  //  )
  //  .attr("dominant-baseline", "middle")
  //  .attr("text-anchor", "middle")
  //  .attr("fill", color)
  //  .style("pointer-events", "none");
}

/**
 * The function to be called when the rectangle or group
 * of rectangles is no longer in "selected state".
 *
 * The text indicating the number of trees is removed and
 * the opacity returns to 100%.
 *
 * @param {*} element The selection of rectangles in "selected" state
 */
export function rectUnselected(element) {
  //element.select(".year-count-rect").attr("opacity", "1");
  //element.select(".selectionText").remove();
}

/**
 * Makes the font weight of the ticks texts with the given name and year bold.
 *
 * @param {string} name The name of the neighborhood associated with the tick text to make bold
 * @param {number} year The year associated with the tick text to make bold
 */
export function selectTicks(name, yScale, margin, width) {
  d3.selectAll(".y-axis-heatmap .tick")
    .filter(function (d) {
      return d === name;
    })
    .attr("font-weight", "bold");

    d3.select("#graph-g-heatmap")
      .append('rect')
      .attr('id', 'selectedLine')
      .attr('y', function() {
        if(name == "Global-land") {
          return yScale.range()[0] + 2 * yScale.bandwidth()
        }
        return yScale(name)
      })
      .attr('x', 0)
      .attr('width', width)
      .attr('height', function() {
        if(name == "Global-land") {
          return 4 * yScale.bandwidth()
        }
        return yScale.bandwidth()
      })
      .attr('stroke', 'black')
      .attr('stroke-width', '3')
      .attr('fill', 'none')
}

/**
 * Returns the font weight of all ticks to normal.
 */
export function unselectTicks() {
  d3.selectAll(".x-axis-heatmap .tick").attr("font-weight", "normal");

  d3.selectAll(".y-axis-heatmap .tick").attr("font-weight", "normal");

  d3.select("#selectedLine").remove();


}
