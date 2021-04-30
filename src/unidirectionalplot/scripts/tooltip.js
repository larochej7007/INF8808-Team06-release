/**
 * @param d
 */
 export function ouinon (d) {
  var sortie
  if (d.Mesures <= 5) {
    
    sortie = 'No'
  } else {
    sortie = 'Yes'
  }
  return sortie
}

/**
 * Defines the contents of the tooltip. See CSS for tooltip styling. The tooltip
 * features the country name, population, GDP, and CO2 emissions, preceded
 * by a label and followed by units where applicable.
 *
 * @param {object} d The data associated to the hovered element
 * @returns {string} The tooltip contents
 */
export function getContents (d) {
  // TODO : Generate tooltip contents
  var Mesuress = ouinon(d)

  // On définit un à un tous les éléments composant le tooltip
  var country = "<span style='font-weight:bold'> Country : </span> <span style='font-weight:normal'>" + d.Pays + '</span> <br>'
  var Variation = "<span style='font-weight:bold'> Annual Variation : </span> <span style='font-weight:normal'>" + d.temperature + '°C </span> <br>'
  var CurrentYear = "<span style='font-weight:bold'> Year : </span> <span style='font-weight:normal'>" + d.Annees + '</span> <br>'
  var Mesures = "<span style='font-weight:bold'> Mesures : </span> <span style='font-weight:normal'>" + Mesuress + '</span> <br>'
  var YearImplementation = "<span style='font-weight:bold'> Year of Measures implementation : </span> <span style='font-weight:normal'>" + d["Date de mise en place"] + '</span> <br>'
  if (d["Date de mise en place"] == 0) { return country + Variation  + CurrentYear + Mesures}
  else { return country + Variation  + CurrentYear + Mesures + YearImplementation}
}
