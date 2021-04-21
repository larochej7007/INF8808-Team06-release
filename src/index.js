'use strict'

import * as heatmap from './heatmap/heatmap.js'
import * as histogramme from './histogramme/histogramme.js'
import * as scatterplot from './scatterplot/scatterplot.js'


(function (d3) {
  heatmap.GetHeatmap()
  histogramme.GetHistogram()
  scatterplot.GetScatterPlot()
})(d3)
