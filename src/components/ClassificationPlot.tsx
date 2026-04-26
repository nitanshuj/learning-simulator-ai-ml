import React, { useEffect, useRef } from 'react'
import Plotly from 'plotly.js-dist-min'
import { ClassificationData } from '@/simulators'

interface ClassificationPlotProps {
  data: ClassificationData
  predictProb: (x1: number, x2: number) => number
  boundaryLine: { x1: number[], x2: number[] }
  title?: string
  width?: number | string
  height?: number | string
  showHeatmap?: boolean
}

export const ClassificationPlot: React.FC<ClassificationPlotProps> = ({
  data,
  predictProb,
  boundaryLine,
  title = 'Logistic Regression Boundary',
  width = '100%',
  height = 500,
  showHeatmap = true
}) => {
  const plotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!plotRef.current) return

    // Generate grid for heatmap
    const xRange = [-5, 5]
    const yRange = [-5, 5]
    const steps = 50
    
    const xValues: number[] = []
    const yValues: number[] = []
    const zValues: number[][] = []

    for (let i = 0; i <= steps; i++) {
      xValues.push(xRange[0] + (xRange[1] - xRange[0]) * (i / steps))
      yValues.push(yRange[0] + (yRange[1] - yRange[0]) * (i / steps))
    }

    for (let j = 0; j <= steps; j++) {
      const row: number[] = []
      for (let i = 0; i <= steps; i++) {
        row.push(predictProb(xValues[i], yValues[j]))
      }
      zValues.push(row)
    }

    // Heatmap trace
    const heatmapTrace = showHeatmap ? {
      z: zValues,
      x: xValues,
      y: yValues,
      type: 'heatmap' as const,
      colorscale: [
        [0, 'rgba(59, 130, 246, 0.2)'], // Blue-500 light
        [0.5, 'rgba(255, 255, 255, 0)'],
        [1, 'rgba(239, 68, 68, 0.2)']  // Red-500 light
      ],
      showscale: false,
      hoverinfo: 'skip'
    } : null

    // Class 0 scatter
    const class0Trace = {
      x: data.x1.filter((_, i) => data.y[i] === 0),
      y: data.x2.filter((_, i) => data.y[i] === 0),
      mode: 'markers',
      type: 'scatter' as const,
      name: 'Class 0',
      marker: {
        size: 10,
        color: '#3b82f6',
        line: { color: 'white', width: 1 }
      }
    }

    // Class 1 scatter
    const class1Trace = {
      x: data.x1.filter((_, i) => data.y[i] === 1),
      y: data.x2.filter((_, i) => data.y[i] === 1),
      mode: 'markers',
      type: 'scatter' as const,
      name: 'Class 1',
      marker: {
        size: 10,
        color: '#ef4444',
        line: { color: 'white', width: 1 }
      }
    }

    // Decision boundary line
    const boundaryTrace = {
      x: boundaryLine.x1,
      y: boundaryLine.x2,
      mode: 'lines',
      type: 'scatter' as const,
      name: 'Decision Boundary',
      line: {
        color: '#1f2937',
        width: 3,
        dash: 'dash'
      }
    }

    const traces: any[] = []
    if (heatmapTrace) traces.push(heatmapTrace)
    traces.push(class0Trace)
    traces.push(class1Trace)
    traces.push(boundaryTrace)

    const layout = {
      title: {
        text: title,
        font: { size: 18, color: '#1f2937' }
      },
      xaxis: { title: 'X1', range: xRange, gridcolor: '#e5e7eb' },
      yaxis: { title: 'X2', range: yRange, gridcolor: '#e5e7eb' },
      margin: { l: 60, r: 40, t: 60, b: 60 },
      paper_bgcolor: '#fff',
      plot_bgcolor: '#fafafa',
      font: { family: 'system-ui, sans-serif' },
      showlegend: true,
      legend: {
        x: 0.98,
        y: 0.02,
        xanchor: 'right' as const,
        yanchor: 'bottom' as const,
        bgcolor: 'rgba(255, 255, 255, 0.8)'
      }
    }

    const config = {
      responsive: true,
      displayModeBar: true,
      displaylogo: false
    }

    Plotly.newPlot(plotRef.current, traces, layout, config)

    return () => {
      if (plotRef.current) {
        Plotly.purge(plotRef.current)
      }
    }
  }, [data, predictProb, boundaryLine, title, showHeatmap])

  return (
    <div
      ref={plotRef}
      style={{
        width,
        height: typeof height === 'number' ? `${height}px` : height,
        borderRadius: '0.5rem',
        overflow: 'hidden',
        border: '1px solid #e5e7eb',
        backgroundColor: '#fff',
      }}
    />
  )
}
