/**
 * Gets the names of the neighborhoods.
 *
 * @param {object[]} data The data to analyze
 * @returns {string[]} The names of the neighorhoods in the data set
 */
export function getNeighborhoodNames(data) {
  var names = new Set();
  data.forEach(function (d) {
    if(d["Country"] != "Global-land")
    {
      names.add(d.Country);
    }
  });
  return Array.from(names.values());
}

/**
 * Filters the data by the given years.
 *
 * @param {object[]} data The data to filter
 * @param {number} start The start year (inclusive)
 * @param {number} end The end year (inclusive)
 * @returns {object[]} The filtered data
 */
export function filterYears(data, start, end) {
  var result = [];
  data.forEach(function (currentDataLine) {
    var currentYear = currentDataLine.Year;
    var currentMonth = currentDataLine.Month;
    if ((start <= currentYear && end >= currentYear) && (currentMonth == 6) ) {
    //if ((start <= currentYear && end >= currentYear) ) {
      currentDataLine.country = currentDataLine["Country"].charAt(0).toUpperCase() + currentDataLine["Country"].slice(1)
      result.push(currentDataLine);
    }
  });

  return result;
}

/**
 * Summarizes how any trees were planted each year in each neighborhood.
 *
 * @param {object[]} data The data set to use
 * @returns {object[]} A table of objects with keys 'Arrond_Nom', 'Plantation_Year' and 'Counts', containing
 * the name of the neighborhood, the year and the number of trees that were planted
 */
export function summarizeYearlyCounts(data) {
  const nTreeForArrondYearMap = new Map();
  data.forEach(function (dataline) {
    const year = dataline.Year;
    const key = dataline.Arrond_Nom + year;
    if (nTreeForArrondYearMap.has(key)) {
      var countObject = nTreeForArrondYearMap.get(key);
      countObject.Counts += 1;
      nTreeForArrondYearMap.set(key, countObject);

      return;
    }

    var countObject = Object();
    countObject.Arrond_Nom = dataline.Arrond_Nom;
    countObject.Plantation_Year = year;
    countObject.Counts = 1;
    nTreeForArrondYearMap.set(key, countObject);

    return;
  });

  const result = [];
  var countsArray = Array.from(nTreeForArrondYearMap.entries());
  countsArray.forEach(function (count) {
    result.push(count[1]);
  });

  return result;
}

/**
 * For the heat map, fills empty values with zeros where a year is missing for a neighborhood because
 * no trees were planted or the data was not entered that year.
 *
 * @param {object[]} data The datas set to process
 * @param {string[]} neighborhoods The names of the neighborhoods
 * @param {number} start The start year (inclusive)
 * @param {number} end The end year (inclusive)
 * @param {Function} range A utilitary function that could be useful to get the range of years
 * @returns {object[]} The data set with a new object for missing year and neighborhood combinations,
 * where the values for 'Counts' is 0
 */
export function orderByAVG(data, countries) {
  var countriesWithAVG = []

  countries.forEach((country) => {
    var AVG = 0.0
    var countryValues = data.filter(function (dataline) {
      return dataline.Country === country;
    });

    countryValues.forEach((line) => {
      AVG += line.annual_anomaly
    })

    AVG = AVG / countryValues.length

    countriesWithAVG.push({Country: country, AVG: AVG})
  })

  countriesWithAVG.sort((country1, country2) => {

    if(country1.AVG > country2.AVG) {
      return 1
    } else if(country1.AVG == country2.AVG) {

      return 0
    }

    return -1;
  })
  return countriesWithAVG.map(x => x.Country)
}

/**
 * For the heat map, fills empty values with zeros where a year is missing for a neighborhood because
 * no trees were planted or the data was not entered that year.
 *
 * @param {object[]} data The datas set to process
 * @param {string[]} neighborhoods The names of the neighborhoods
 * @param {number} start The start year (inclusive)
 * @param {number} end The end year (inclusive)
 * @param {Function} range A utilitary function that could be useful to get the range of years
 * @returns {object[]} The data set with a new object for missing year and neighborhood combinations,
 * where the values for 'Counts' is 0
 */
 export function fillMissingData(data, neighborhoods, start, end, range) {
  const yearRange = range(start, end);
  var result = data.slice();

  neighborhoods.forEach(function (country) {
    var countryLines = data.filter(function (dataline) {
      return dataline["Country"].charAt(0).toUpperCase() + dataline["Country"].slice(1)=== country;
    });

    var missingYears = new Set(yearRange.slice());
    countryLines.forEach(function (yearCounts) {
      missingYears.delete(yearCounts.Year);
    });

    missingYears.forEach(function (year) {
      result.push({ Country: country, Year: year, annual_anomaly: "n/a" });
    });
  });

  return result;
}