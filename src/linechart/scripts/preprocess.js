
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



/**
 * construct MINMAX, the data easily representable in the graph 
 * specifying for each year the min and the max of temperature anomalies.
 * @param {object[]} data The dataset
 * @param {object[]} years The years of the dataset
 * @param {object[]} MINMAX null 
 * @returns  [ { "Year": null, "min":null , "max":null, "values":[] } ]
 */
export function minMaxMonthlyAnn(data,  years, MINMAX) {
var min, max, i=0,j,d, current, updated=0,y;
 var entry = { "Year":null, "min":null , "max":null };
      min=19;
      max=-10;
      entry = { "Year": null, "min":null , "max":null, "values":[] };
      data.forEach(function(d) {
          
         
          if(  years[i] == d["Year"] ){
            entry["values"].push(Number(d["monthly_anomaly"]));
             entry["Year"]= years[i];
          }else{
           
            entry["min"]=d3.min(entry["values"]);
            entry["max"]=d3.max(entry["values"]);
            entry["values"]=null;
             i++;
             MINMAX.push(entry);
            
             entry = { "Year": null, "min":null , "max":null, "values":[] };
          }        
        
      });

   return MINMAX;
  }


  


