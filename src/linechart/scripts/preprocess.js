
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

function filterYears(data, timeRangeLimits) {
  var result = [];
  data.forEach(function (currentDataLine) {
    var currentYear = currentDataLine.Year;

    if ((timeRangeLimits[0] <= currentYear 
        && timeRangeLimits[1] >= currentYear)) {
      currentDataLine.Country = currentDataLine["Country"]
      result.push(currentDataLine);
    }
  });

  return result
}


export function sumarizeData(data, timeRangeLimits) {
  var result = filterYears(data, timeRangeLimits);

  var sumarizedResult = {}
  range(timeRangeLimits[0], timeRangeLimits[1]).forEach(yearLine => {
    var currentSummary = {}
    
    var avgValue = result.filter((d) => {return (yearLine == parseInt(d.Year) && d.Month == 6)})[0]
    if(avgValue != undefined) {
      currentSummary.AVG = parseFloat(avgValue.annual_anomaly)
      currentSummary.Year = yearLine
      currentSummary.Max = d3.max((result.filter((d) => {return yearLine == parseInt(d.Year)})), (d) => parseFloat(d.monthly_anomaly))
      currentSummary.Min = d3.min(result.filter((d) => {return  yearLine == parseInt(d.Year)}), (d) => parseFloat(d.monthly_anomaly))
      sumarizedResult[yearLine] = currentSummary
    }

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


  


