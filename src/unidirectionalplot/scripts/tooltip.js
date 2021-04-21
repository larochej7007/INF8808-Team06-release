/**
 
 *
 * @param {object} d The data associated to the hovered element
 * @returns {string} The tooltip contents
 */
export function getContents (d) {
  return  "<span style='font-weight:bold'> Region : </span> <span style='font-weight:normal'>" + d.Pays + '</span> <br>' +
   
    
     ' </span><br><bold>PIB: : </bold><span class="tooltip-value">' +d.PIB  +'$ (USD)'
    
}
