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

export function MaxYear(data) {
  const max = d3.max(data, function (d) {
    return parseFloat(d.Annees)
  })
  
  console.log(max)
  return(max)
}