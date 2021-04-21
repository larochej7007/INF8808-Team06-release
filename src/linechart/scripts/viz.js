import { range, svg } from 'd3'

/**
 * Sets the domain and range of the X scale.
 *
 * @param {*} scale The x scale
 * @param {object[]} data The data to be used
 * @param {number} width The width of the graph
 */
export function updateXScale (scale, data, width) {
  // TODO : Set the domain and range of the groups' x scale
 
  scale.domain([data["Min"], data["Max"]]).range([0, width])
}

/**
 * Sets the domain and range of the Y scale.
 *
 * @param {*} scale The Y scale
 * @param {object[]} data The data to be used
 * @param {number} height The height of the graph
 * @param {number} margin The margin of the graph
 */
export function updateYScale (scale, data, height, margin) {
  // TODO : Set the domain and range of the graph's y scale
  var min=1000, max=-1000; 
  // Look for min ans max of the monthly_anomalies
  data.forEach(function(d) {
    if(min > d["monthly_anomaly"])
      min =  d["monthly_anomaly"];
    if(max < d["monthly_anomaly"])
      max =  d["monthly_anomaly"];
  });

 
  
  scale.domain([max+margin, min-margin]).range([0, height])
  
}



