
import React, { useEffect, useRef } from 'react'
import Plotly from 'plotly.js-dist-min'
import { ClassificationData } from '@/simulators'

interface ClassificationPlotProps {
  data: ClassificationData
  predictProb: (x1: number, x2: number) => number
  boundaryLine?: { x1: number[], x2: number[] }
  title?: string
  width?: number | string
  height?: number | string
  showHeatmap?: boolean
  isMultiClass?: boolean
}

const CLASS_COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899']

export const ClassificationPlot: React.FC<ClassificationPlotProps> = ({
  data,
  predictProb,
  boundaryLine,
  title = 'Classification Decision Boundary',
  width = '100%',
  height = 500,
  showHeatmap = true,
  isMultiClass = false
}) => {
  const plotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!plotRef.current) return

    // Generate grid for heatmap
    const xRange = [-5, 5]
    const yRange = [-5, 5]
    const steps = isMultiClass ? 80 : 50 // Better resolution for trees
    
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

    const uniqueClasses = Array.from(new Set(data.y)).sort((a, b) => a - b)
    
    // Discrete colorscale for multi-class or continuous for probability
    let colorscale: any[] = []
    if (isMultiClass) {
      // For multi-class, we want discrete steps in the colorscale
      uniqueClasses.forEach((c) => {
        const color = CLASS_COLORS[c % CLASS_COLORS.length]
        // Convert hex to rgba with alpha
        const r = parseInt(color.slice(1, 3), 16)
        const g = parseInt(color.slice(3, 5), 16)
        const b = parseInt(color.slice(5, 7), 16)
        const rgba = `rgba(${r}, ${g}, ${b}, 0.15)`
        
        const start = c / (Math.max(...uniqueClasses) + 1)
        const end = (c + 1) / (Math.max(...uniqueClasses) + 1)
        colorscale.push([start, rgba])
        colorscale.push([end, rgba])
      })
    } else {
      colorscale = [
        [0, 'rgba(59, 130, 246, 0.2)'],
        [0.5, 'rgba(255, 255, 255, 0)'],
        [1, 'rgba(239, 68, 68, 0.2)']
      ]
    }

    // Heatmap trace
    const heatmapTrace = showHeatmap ? {
      z: zValues,
      x: xValues,
      y: yValues,
      type: 'heatmap' as const,
      colorscale,
      showscale: false,
      hoverinfo: 'skip',
      zmin: isMultiClass ? 0 : undefined,
      zmax: isMultiClass ? Math.max(...uniqueClasses) : undefined
    } : null

    // Scatter traces for each class
    const scatterTraces = uniqueClasses.map(c => ({
      x: data.x1.filter((_, i) => data.y[i] === c),
      y: data.x2.filter((_, i) => data.y[i] === c),
      mode: 'markers',
      type: 'scatter' as const,
      name: `Class ${c}`,
      marker: {
        size: 9,
        color: CLASS_COLORS[c % CLASS_COLORS.length],
        line: { color: 'white', width: 1.5 }
      }
    }))

    // Decision boundary line (mostly for Logistic Regression)
    const boundaryTrace = boundaryLine && boundaryLine.x1.length > 0 ? {
      x: boundaryLine.x1,
      y: boundaryLine.x2,
      mode: 'lines',
      type: 'scatter' as const,
      name: 'Decision Boundary',
      line: {
        color: '#1e293b',
        width: 3,
        dash: 'dash'
      }
    } : null

    const traces: any[] = []
    if (heatmapTrace) traces.push(heatmapTrace)
    scatterTraces.forEach(t => traces.push(t))
    if (boundaryTrace) traces.push(boundaryTrace)

    const layout = {
      title: {
        text: title,
        font: { size: 16, color: '#1e293b', weight: 'bold' }
      },
      xaxis: { 
        title: 'Feature X1', 
        range: xRange, 
        gridcolor: '#f1f5f9',
        zerolinecolor: '#e2e8f0'
      },
      yaxis: { 
        title: 'Feature X2', 
        range: yRange, 
        gridcolor: '#f1f5f9',
        zerolinecolor: '#e2e8f0'
      },
      margin: { l: 50, r: 30, t: 50, b: 50 },
      paper_bgcolor: '#fff',
      plot_bgcolor: '#fff',
      font: { family: 'Inter, system-ui, sans-serif' },
      showlegend: true,
      legend: {
        x: 1,
        y: 1,
        xanchor: 'right' as const,
        yanchor: 'top' as const,
        bgcolor: 'rgba(255, 255, 255, 0.9)',
        bordercolor: '#e2e8f0',
        borderwidth: 1
      },
      hovermode: 'closest' as const
    }

    const config = {
      responsive: true,
      displayModeBar: false,
    }

    Plotly.newPlot(plotRef.current, traces, layout, config)

    return () => {
      if (plotRef.current) {
        Plotly.purge(plotRef.current)
      }
    }
  }, [data, predictProb, boundaryLine, title, showHeatmap, isMultiClass])

  return (
    <div
      ref={plotRef}
      className="rounded-xl overflow-hidden border border-slate-200 bg-white"
      style={{
        width,
        height: typeof height === 'number' ? `${height}px` : height,
      }}
    />
  )
}
