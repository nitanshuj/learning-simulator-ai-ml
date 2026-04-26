import React, { useEffect, useRef } from 'react'
import Plotly from 'plotly.js-dist-min'
import { Point2D, CostFunctionType } from '@/simulators'

interface OptimizationPlotProps {
  currentPoint: Point2D
  path: Point2D[]
  functionType: CostFunctionType
  calculateCost: (x: number, y: number) => number
  title?: string
  width?: number | string
  height?: number | string
  viewMode?: '2d' | '3d'
}

export const OptimizationPlot: React.FC<OptimizationPlotProps> = ({
  currentPoint,
  path,
  functionType,
  calculateCost,
  title = 'Gradient Descent Path',
  width = '100%',
  height = 500,
  viewMode = '2d'
}) => {
  const plotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!plotRef.current) return

    // Generate grid for contour/surface
    const xRange = [-5, 5]
    const yRange = [-5, 5]
    const steps = 40
    
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
        row.push(calculateCost(xValues[i], yValues[j]))
      }
      zValues.push(row)
    }

    // Path trace
    const pathTrace = {
      x: path.map(p => p.x),
      y: path.map(p => p.y),
      z: path.map(p => p.z),
      mode: 'lines+markers',
      type: viewMode === '3d' ? 'scatter3d' : 'scatter',
      name: 'Optimization Path',
      line: {
        color: '#ef4444',
        width: 4
      },
      marker: {
        size: viewMode === '3d' ? 4 : 6,
        color: '#ef4444'
      }
    }

    // Current point trace
    const currentTrace = {
      x: [currentPoint.x],
      y: [currentPoint.y],
      z: [currentPoint.z],
      mode: 'markers',
      type: viewMode === '3d' ? 'scatter3d' : 'scatter',
      name: 'Current Position',
      marker: {
        size: viewMode === '3d' ? 8 : 12,
        color: '#3b82f6',
        symbol: 'diamond'
      }
    }

    // Surface/Contour trace
    const backgroundTrace: any = {
      z: zValues,
      x: xValues,
      y: yValues,
      type: viewMode === '3d' ? 'surface' : 'contour',
      showscale: false,
      colorscale: 'Viridis',
      opacity: viewMode === '3d' ? 0.8 : 1
    }

    if (viewMode === '2d') {
      backgroundTrace.contours = {
        coloring: 'heatmap',
        showlabels: true
      }
    }

    const traces = [backgroundTrace, pathTrace, currentTrace]

    const layout: any = {
      title: {
        text: title,
        font: { size: 18, color: '#1f2937' }
      },
      margin: { l: 40, r: 40, t: 60, b: 40 },
      paper_bgcolor: '#fff',
      plot_bgcolor: '#fafafa',
      font: { family: 'system-ui, sans-serif' },
      showlegend: true,
      legend: {
        orientation: 'h',
        y: -0.1
      }
    }

    if (viewMode === '3d') {
      layout.scene = {
        xaxis: { title: 'X', range: xRange },
        yaxis: { title: 'Y', range: yRange },
        zaxis: { title: 'Cost' },
        camera: {
          eye: { x: 1.5, y: 1.5, z: 1.5 }
        }
      }
    } else {
      layout.xaxis = { title: 'X', range: xRange }
      layout.yaxis = { title: 'Y', range: yRange }
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
  }, [currentPoint, path, functionType, viewMode, title, calculateCost])

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
