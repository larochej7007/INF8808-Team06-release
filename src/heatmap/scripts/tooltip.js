/**
 * Defines the contents of the tooltip.
 *
 * @param {object} d The data associated to the hovered element
 * @returns {string} The tooltip contents
 */
export function getContents (d) {
  return '<span> Country : </span><span class="tooltip-value">' +
    d["Country"] + '</span><br><br><bold>Year:  </bold><span class="tooltip-value">' +
    d.Year + '</span><br><bold>Avg. ΔT:  </bold><span class="tooltip-value">' +
    d.annual_anomaly + ' (°C)</span></span>'
}
