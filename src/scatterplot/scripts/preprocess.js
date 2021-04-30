/**
 * Group the data by year
 * 
 * @param data
 */
 export function GroupByYear (data) {
    var dataGrouped = d3.nest()
      .key(function (d) { return d.Annees })
      .entries(data)
  
    return (dataGrouped)
  }
  
  /**
   * Group the data by country
   * 
   * @param data
   */
  export function GroupByCountry (data) {
    var dataGrouped = d3.nest()
      .key(function (d) { return d.Pays })
      .entries(data)
      
    return (dataGrouped)
  }

/**
 * Return the latest year to set the scales
 * 
 * @param {*} data 
 * @returns 
 */
export function MaxYear(data) {
  const max = d3.max(data, function (d) {
    return parseFloat(d.Annees)
  })
  
  return(max)
}

/**
 * Return the earliest year to set the scales
 * 
 * @param {*} data 
 * @returns 
 */
 export function MinYear(data) {
  const min = d3.min(data, function (d) {
    return parseFloat(d.Annees)
  })
  
  return(min)
}