
/**
 * Give array containing a range from start to end
 *
 * @param {number} start The start of the range
 * @param {number[]} end The end of the range
 * @returns {number[]} The array containing the value in the range
 */
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
