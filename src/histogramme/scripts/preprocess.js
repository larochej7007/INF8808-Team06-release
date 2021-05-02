
/**
 * Get the CO2 emissions on the world scale. Change the structure to an array containing 1 object for each year
 *
 * @param {object[]} data The dataset with the CO2 emissions from all over the world 
 * @returns {object[]} The array containing the world CO2 emissions for the period
 */
export function GetEmissions (data) {

  var temp
  var Emissions = []

  data.forEach(function (d) {if (d["Country Name"] == "World") { temp = d}})

  var key_names = Object.keys(temp)

  for (var i = 4; i < key_names.length; i++) { // On passe les 4 premières lignes qui ne nous intéressent pas
    var Year = key_names[i].slice(0,4) // Le slice permet de récupérer l'année
    if (temp[key_names[i].toString()] != '..'){
      Emissions.push({Year:Year, emission:temp[key_names[i].toString()]})
    }
  }
  console.log(Emissions)

  return Emissions
}

/**
 * Get the first and final years of the data
 *
 * @param {object[]} data The dataset to be used
 * @returns {object[]} The array containing the first and final years
 */
 export function GetYears (data) {

  var years = []
  years.push(parseInt(data[0].Year))
  years.push(parseInt(data[data.length-1].Year))

  return years
}

/**
 * Get the annual temperature variations. Years[0] must be taken as the reference so the variation in this year is 0 and the other year are calculated with respect to it
 * We must choose the value of June because it represents the mean with the past 6 months and next 6 months (actually the mean over the year from January to December)
 *
 * @param {object[]} data The dataset with the global temperature variations since 1750
 * @param {object[]} years The array containing the first and final years to be studied
 * @returns {object[]} The array containing the temperature variations for the period
 */

export function GetVariations (data, years) {
  var Variations = []
  data.forEach(function (d) { if (d["Month"] == 6 & d["Year"] >= years[0] & d["Year"] <= years[1]) { Variations.push({Year:d.Year, variation:parseFloat(d.annual_anomaly)})}})
  return Variations
}

/**
 * Merge the Emissions and Variations data into a single array
 *
 * @param {object[]} Emissions The array containing the CO2 emissions
 * @param {object[]} Variations The array containing the temperature variations
 * @returns {object[]} The array containing both the CO2 emissions and the temperature variations for the period
 */

export function MergeData(Emissions, Variations) {

  for (var i = 0; i < Emissions.length; i++) {
    Emissions[i]["variation"] = Variations[i].variation
  }

  return Emissions
}
