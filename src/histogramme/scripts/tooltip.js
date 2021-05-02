/**
 * Defines the contents of the tooltip.
 *
 * @param {object} d The data associated to the hovered element
 * @returns {string} The tooltip contents
 */
export function getContents (d) {

  var Year = "<span> Year : </span> <span style='font-weight:normal'> " + d.Year + "</span><br><br>"
  var Emission = "<span> CO2 Emissions : </span> <span style='font-weight:normal'>" + Math.round(d.emission/100000) /10 + " millions of kilotonnes</span> <br><br>"
  var Variation = "<span> Mean annual variation with " + d.reference_year + ": </span> <span style='font-weight:normal'>" + d.variation + "°C</span>"
  
  return Year + Emission + Variation
}
