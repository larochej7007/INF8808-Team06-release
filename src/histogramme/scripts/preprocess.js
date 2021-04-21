
/**
 * Get the CO2 emissions on the world scale on the 1960-2016 period. Change the structure to an array containing 1 object for each year
 *
 * @param {object[]} data The dataset with the CO2 emissions from all over the world 
 * @returns {object[]} The array containing the world CO2 emissions for the period
 */
export function GetEmissions (data) {
  var temp
  var Emissions = [] 


  data.forEach(function (d) {if (d["Country Name"] == "World") { temp = d}})

  var key_names = Object.keys(temp)

  for (var i = 4; i < key_names.length; i++) {
    var Year = key_names[i].slice(0,4)
    if (Year <= 2016){
      Emissions.push({Year:Year, emission:temp[key_names[i].toString()]})
    }
  }

  return Emissions
}

/**
 * Get the annual temperature variations between 1960 and 2016 included. 1960 must be taken as the reference so the variation in this year is 0 and the other year are "scaled" 
 * We must choose the value of June because it represents the mean with the past 6 months and next 6 months (actually the mean over the year from January to December)
 *
 * @param {object[]} data The dataset with the global temperature variations since 1750
 * @returns {object[]} The array containing the temperature variations for the period
 */

export function GetVariations (data) {
  var Variations = []
  data.forEach(function (d) { if (d["Month"] == 6 & d["Year"] >= 1960 & d["Year"] <= 2016) { Variations.push({Year:d.Year, variation:parseFloat(d.annual_anomaly)})}})
  return Variations
}

/**
 * Merge the Emissions and Variations data into a single array
 *
 * @param {object[]} Emissions The array containing the CO2 emissions for the period 1960-2016
 * @param {object[]} Variations The array containing the temperature variations for the period 1960-2016
 * @returns {object[]} The array containing both the CO2 emissions and the temperature variations for the period
 */

export function MergeData(Emissions, Variations) {

  for (var i = 0; i < Emissions.length; i++) {
    Emissions[i]["variation"] = Variations[i].variation
  }

  return Emissions
}
