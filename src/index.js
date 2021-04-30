'use strict'

import * as heatmap from './heatmap/heatmap.js'
import * as histogramme from './histogramme/histogramme.js'
import * as scatterplot from './scatterplot/scatterplot.js'
import * as linechart from './linechart/linechart.js'
import * as uniplot from './unidirectionalplot/unidirectionalplot.js'


(function (d3) {
  heatmap.GetHeatmap()
  histogramme.GetHistogram()
  scatterplot.GetScatterPlot()
  linechart.GetLineChart("Global-land")
  uniplot.getUniPlot()
})(d3)
