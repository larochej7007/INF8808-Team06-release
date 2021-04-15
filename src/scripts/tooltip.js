/**
 * Defines the contents of the tooltip. See CSS for tooltip styling. The tooltip
 * features the country name, population, GDP, and CO2 emissions, preceded
 * by a label and followed by units where applicable.
 *
 * @param {object} d The data associated to the hovered element
 * @returns {string} The tooltip contents
 */
export function getContents (d) {
  return '<span> Country : </span><span class="tooltip-value">' +
    (d["Country"].charAt(0).toUpperCase() + d["Country"].slice(1)) + '</span><br><br><bold>Year:  </bold><span class="tooltip-value">' +
    d.Year + '</span><br><bold>Avg. ΔT:  </bold><span class="tooltip-value">' +
    d.annual_anomaly + ' (°C)</span></span>'
}
