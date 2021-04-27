
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

export function sumarizeYears(data, start, end) {
  var result = [];
  data.forEach(function (currentDataLine) {
    var currentYear = currentDataLine.Year;
    var currentMonth = currentDataLine.Month;
    if ((start <= currentYear && end >= currentYear)) {
      currentDataLine.country = currentDataLine["Country"].charAt(0).toUpperCase() + currentDataLine["Country"].slice(1)
      result.push(currentDataLine);
    }
  });

  var sumarizedResult = {}
  result.forEach(yearLine => {
    var currentResult = sumarizedResult[yearLine.Year]
    var currentSummary = {}
    if(currentResult != undefined) {
      currentSummary.Year = currentResult.Year;
      currentSummary.Min = Math.min(currentResult.Min, parseFloat(yearLine.monthly_anomaly));
      currentSummary.Max = Math.max(currentResult.Max, parseFloat(yearLine.monthly_anomaly));

    } else {
      currentSummary.Year = yearLine.Year;
      currentSummary.Min = parseFloat(yearLine.monthly_anomaly);
      currentSummary.Max = parseFloat(yearLine.monthly_anomaly);
    }
    sumarizedResult[yearLine.Year] = currentSummary
  })

  Object.values(sumarizedResult).forEach(val => {
    val.AVG = d3.mean(result.filter(yearLine => { return yearLine.Year == val.Year}), d => { return d.monthly_anomaly})
  })

  return Object.values(sumarizedResult)
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


  


