import * as linechart from './../../linechart/linechart.js'
/**
 * Sets up an event handler for when the mouse enters\leaves the squares and when a square is clicked
 *
 * @param {*} yScale The yScale to be used when placing the text in the square
 * @param {Function} rectSelected The function to call to set the mode to "selected" on the square
 * @param {Function} rectUnselected The function to call to remove "selected" mode from the square
 * @param {Function} selectTicks The function to call to set the mode to "selected" on the ticks
 * @param {Function} unselectTicks The function to call to remove "selected" mode from the ticks
 * @param {number} margin The margins of the graph
 * @param {number} width The width of the graph
 */
var hoveredTick = ''
var selectedTick = ''

export function setRectHandler(
  yScale,
  selectTick,
  unselectTick,
  hoverTicks,
  unhoverTicks,
  width
) {
  d3.selectAll(".year-count-g")
    .on("mouseover", function (d) {
      hoverTicks(
        d.Country,
        yScale,
        width
      );
    })
    .on("mouseout", function (d) {
      unhoverTicks();
    });


  d3.selectAll(".year-count-rect")
    .on("click", d => {
      linechart.clearLineChart()
      unselectTick()
      linechart.GetLineChart (d.Country)
      selectTick(
        d.Country,
        yScale,
        width)
    })
}

/**
 * Make the hovered country set in a rect and make the tick text bold.
 *
 * @param {string} name The name of the country hovered
 * @param {*} yScale The yScale to be used when placing the text in the square
 * @param {number} width The width of the graph
 */
export function hoverTicks(name, yScale, width) {
  hoveredTick = name;
  d3.selectAll(".y-axis-heatmap .tick text")
    .filter(function (d) {
      return d === name;
    })
    .attr("font-weight", "bold");

  d3.select("#graph-g-heatmap")
    .append('rect')
    .attr('id', 'hoveredLine')
    .attr('y', function() {
      if(name == "Global-land") {
        return yScale.range()[0] + 2 * yScale.bandwidth()
      }
      return yScale(name)
    })
    .attr('x', 0)
    .attr('width', width)
    .attr('height', function() {
      return yScale.bandwidth()
    })
    .attr('stroke', 'black')
    .attr('stroke-width', '3')
    .attr('fill', 'none')
}


/**
 * Make the clicked\selected country set in a rect and make the tick text bold.
 *
 * @param {string} name The name of the country clicked
 * @param {*} yScale The yScale to be used when placing the text in the square
 * @param {number} width The width of the graph
 */
export function selectTicks(name, yScale, width) {
  selectedTick = name; 
  d3.selectAll(".y-axis-heatmap .tick text")
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
        return yScale.bandwidth()
      })
      .attr('stroke', 'black')
      .attr('stroke-width', '3')
      .attr('fill', 'none')
}

/**
 * Returns the font weight of the previously hovered tick to normal.
 */
export function unhoverTicks() {
  d3.selectAll(".x-axis-heatmap .tick text").filter(function(d) { return this.innerHTML != selectedTick; }).attr("font-weight", "normal");
  d3.selectAll(".y-axis-heatmap .tick text").filter(function(d) { return this.innerHTML != selectedTick; }).attr("font-weight", "normal");

  d3.select("#hoveredLine").remove();


}


/**
 * Returns the font weight of the previously selected tick to normal.
 */
export function unselectTicks() {
  d3.selectAll(".x-axis-heatmap .tick text").filter(function(d) { return this.innerHTML != hoveredTick; }).attr("font-weight", "normal");
  d3.selectAll(".y-axis-heatmap .tick text").filter(function(d) { return this.innerHTML != hoveredTick; }).attr("font-weight", "normal");

  d3.select("#selectedLine").remove();
}
