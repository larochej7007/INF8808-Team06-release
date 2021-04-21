/**
 * Defines the contents of the tooltip.
 *
 * @param {object} d The data associated to the hovered element
 * @returns {string} The tooltip contents
 */
export function getContents (d) {
  /* TODO : Define and return the tooltip contents including :
      + A title stating the hovered element's group, with:
        - Font family: Grenze Gotish
        - Font size: 24px
        - Font weigth: normal
      + A bold label for the player name followed
        by the hovered elements's player's name
      + A bold label for the player's line count
        followed by the number of lines
  */

  var Year = "<span> Year : </span> <span style='font-weight:normal'> " + d.Year + "</span><br><br>"
  var Emission = "<span> CO2 Emissions : </span> <span style='font-weight:normal'>" + Math.round(d.emission/100000) /10 + " millions of kilotonnes</span> <br><br>"
  var Variation = "<span> Mean annual variation with " + d.reference_year + ": </span> <span style='font-weight:normal'>" + d.variation + "°C</span>"
  return Year + Emission + Variation
}
