const JUNE = 6;
/**
 * Gets the names of the countries.
 *
 * @param {object[]} data The data to analyze
 * @returns {string[]} The names of the countries in the data set
 */
export function getCountryNames(data) {
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
 * @param {number[2]} timeRangeLimits The time range limits to filter for (inclusive)
 * @returns {object[]} The filtered data
 */
export function filterYears(data, timeRangeLimits) {
  return data.filter(d => {return (timeRangeLimits[0] <= d.Year 
                                   && timeRangeLimits[1] >= d.Year
                                   && JUNE == d.Month)})
}

/**
 * Calculate the avg temp variation for each countries in the dataset
 *
 * @param {object[]} data The datas containing the values for every countries
 * @param {string[]} countries The names of the countries
 * @returns {object[]} The array of country object containing the name of the 
 * country and the AVG temp variation
 */
function calculateCountryAVG(data, countries) {
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

  return countriesWithAVG
}

/**
 * Order the countries name list by AVG temperature variation
 *
 * @param {object[]} data The datas containing the values for every countries
 * @param {string[]} countries The names of the countries
 * @returns {string[]} The names of the countries ordered by Avg temp. variaton
 */
export function orderCountriesByAVG(data, countries) {
  var countriesWithAVG = calculateCountryAVG(data, countries)

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
 * For the heat map, fills empty values with n/a
 *
 * @param {object[]} data The datas set to process
 * @param {string[]} countries The names of the countries
 * @param {number[1]} timeRangeLimits The limits of the time range
 * @param {Function} range A utilitary function that could be useful to get the range of years
 * @returns {object[]} The data set with a new n/a value for missing years
 */
 export function fillMissingData(data, countries, timeRangeLimits, range) {
  const yearRange = range(timeRangeLimits[0], timeRangeLimits[1]);
  var result = data.slice();

  countries.forEach(function (country) {
    var countryLines = data.filter(function (dataline) {
      return dataline["Country"] == country;
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