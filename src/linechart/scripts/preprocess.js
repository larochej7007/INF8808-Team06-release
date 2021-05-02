
/**
 * Browse the source data, retains data only for years greater than 1900. 
 * For each year, all the monthly anomalies as well as the Min and Max are shown.
 *
 * 
 *
 * @param {object[]} data The dataset with unsanitized names
 * @returns [ object{"Min":null , "Max":null , "Data":null, "Years":null} ] The dataset madeup
 */
export function strictData (data) {
  
    var dataset = new Array;
    var values = {"Min":null , "Max":null , "Data":null, "Years":null};
    var YEARS = [], y=0;

  data.forEach(function (d) {
  if(d["Year"]>=1900){
    dataset.push(d)
  //We retrieve all the different years from our dataset
    if(d["Year"] > y){
      YEARS.push(d["Year"]);
      y=d["Year"];
    }
  }
  })
   values["Min"]= d3.min(YEARS);
   values["Max"]= d3.max(YEARS);
   values["Years"]= YEARS;
   values["Data"] = dataset;
  return values;
}

export function range (start, stop) {
  const res = []
  for (var i = start; i <= stop; i++) {
    res.push(i)
  }
  return res
}

/**
 * Filters the data by the given years.
 *
 * @param {object[]} data The data to filter
 * @param {number[2]} timeRangeLimits The time range limits to filter for (inclusive)
 * @returns {object[]} The filtered data
 */
function filterYears(data, timeRangeLimits) {
  return data.filter(d => {return (timeRangeLimits[0] <= d.Year 
                                   && timeRangeLimits[1] >= d.Year)})
}

/**
 * Find the max value for the specified year
 * @param {object[]} data The dataset
 * @param {object[]} year The year to find the max value
 * @returns  {object[]} The summarized data
 */
function findAnnualMaxValue(data, year) {
  return d3.max((data.filter((d) => {return year == parseInt(d.Year)})), (d) => parseFloat(d.monthly_anomaly))
}

/**
 * Find the min value for the specified year
 * @param {object[]} data The dataset
 * @param {object[]} year The year to find the min value
 * @returns  {object[]} The summarized data
 */
function findAnnualMinValue(data, year) {
  return d3.min(data.filter((d) => {return  year == parseInt(d.Year)}), (d) => parseFloat(d.monthly_anomaly))
}

/**
 * Summarize the data between the specified time interval
 * @param {object[]} data The dataset
 * @param {object[]} timeRangeLimits The limits of the time interval to filter from the dataset
 * @returns  {object[]} The summarized data
 */
export function summarizeData(data, timeRangeLimits) {
  var filteredData = filterYears(data, timeRangeLimits);

  var sumarizedData = {}
  range(timeRangeLimits[0], timeRangeLimits[1]).forEach(currentYear => {
    var currentSummary = {}
    var avgValue = filteredData.find((d) => {return (currentYear == parseInt(d.Year) && d.Month == 6)})

    if(avgValue != undefined) {
      currentSummary.Year = currentYear

      currentSummary.AVG = parseFloat(avgValue.annual_anomaly)
      currentSummary.Max = findAnnualMaxValue(filteredData, currentYear)
      currentSummary.Min = findAnnualMinValue(filteredData, currentYear)

      sumarizedData[currentYear] = currentSummary
    }

  })

  return Object.values(sumarizedData)
}
/**
 * construct MINMAX, the data easily representable in the graph 
 * specifying for each year the min and the max of temperature anomalies.
 * @param {object[]} data The dataset
 * @param {object[]} years The years of the dataset
 * @param {object[]} MINMAX null 
 * @returns  [ { "Year": null, "min":null , "max":null, "values":[] } ]
 */
export function minMaxMonthlyAnn(data,  years, MINMAX) {
  


}


  


