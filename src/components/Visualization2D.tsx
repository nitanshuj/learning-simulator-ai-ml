import React, { useEffect, useRef } from 'react'
import Plotly from 'plotly.js-dist-min'

export interface VisualizationProps {
  title: string
  xData: number[]
  yData: number[]
  predictions?: number[]
  loss?: number
  r2?: number
  residuals?: number[]
  showResiduals?: boolean
  xLabel?: string
  yLabel?: string
  width?: number | string
  height?: number | string
}

/**
 * 2D Visualization Component using Plotly.js
 * Displays scatter plot with fitted line, optional residuals, and metrics
 */
export const Visualization2D: React.FC<VisualizationProps> = ({
  title,
  xData,
  yData,
  predictions,
  loss,
  r2,
  residuals,
  showResiduals = false,
  xLabel = 'X',
  yLabel = 'Y',
  width = '100%',
  height = 400,
}) => {
  const plotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!plotRef.current) return

    // Data points scatter plot
    const dataPoints = {
      x: xData,
      y: yData,
      mode: 'markers',
      type: 'scatter' as const,
      name: 'Data',
      marker: {
        size: 8,
        color: '#3b82f6', // blue-500
        opacity: 0.7,
      },
    }

    // Fitted line
    const fittedLine = predictions
      ? {
          x: xData,
          y: predictions,
          mode: 'lines',
          type: 'scatter' as const,
          name: 'Fitted Line',
          line: {
            color: '#ef4444', // red-500
            width: 3,
          },
        }
      : null

    // Residuals (vertical lines from points to fitted line)
    const residualLines = showResiduals && predictions && residuals
      ? {
          x: (() => {
            const x: (number | null)[] = []
            for (let i = 0; i < xData.length; i++) {
              x.push(xData[i])
              x.push(xData[i])
              x.push(null)
            }
            return x
          })(),
          y: (() => {
            const y: (number | null)[] = []
            for (let i = 0; i < yData.length; i++) {
              y.push(yData[i])
              y.push(predictions[i])
              y.push(null)
            }
            return y
          })(),
          mode: 'lines',
          type: 'scatter' as const,
          name: 'Residuals',
          line: {
            color: '#fbbf24', // amber-400
            width: 1,
            dash: 'dash' as const,
          },
          hoverinfo: 'skip' as const,
        }
      : null

    // Build traces
    const traces: any[] = [dataPoints]
    if (fittedLine) traces.push(fittedLine)
    if (residualLines) traces.push(residualLines)

    // Color-code metrics
    const lossColor = !loss ? '#666'
      : loss < 0.1 ? '#10b981' // green - excellent
      : loss < 0.5 ? '#f59e0b' // amber - good
      : '#ef4444' // red - poor

    const layoutAnnotations: any[] = []

    // Add metric annotations
    if (loss !== undefined) {
      layoutAnnotations.push({
        text: `MSE: ${loss.toFixed(4)}`,
        x: 0.02,
        y: 0.98,
        xref: 'paper',
        yref: 'paper',
        showarrow: false,
        bgcolor: lossColor,
        opacity: 0.8,
        font: { color: '#fff', size: 12 },
        align: 'left',
      })
    }

    if (r2 !== undefined) {
      layoutAnnotations.push({
        text: `R²: ${r2.toFixed(4)}`,
        x: 0.02,
        y: 0.88,
        xref: 'paper',
        yref: 'paper',
        showarrow: false,
        bgcolor: r2 > 0.9 ? '#10b981'
          : r2 > 0.7 ? '#f59e0b'
          : '#ef4444',
        opacity: 0.8,
        font: { color: '#fff', size: 12 },
        align: 'left',
      })
    }

    const layout = {
      title: {
        text: title,
        font: { size: 18, color: '#1f2937' },
      },
      xaxis: {
        title: xLabel,
        gridcolor: '#e5e7eb',
        zeroline: true,
      },
      yaxis: {
        title: yLabel,
        gridcolor: '#e5e7eb',
        zeroline: true,
      },
      hovermode: 'closest' as const,
      plot_bgcolor: '#fafafa',
      paper_bgcolor: '#fff',
      font: { family: 'system-ui, sans-serif', size: 12, color: '#374151' },
      showlegend: true,
      legend: {
        x: 0.98,
        y: 0.02,
        xanchor: 'right' as const,
        yanchor: 'bottom' as const,
        bgcolor: 'rgba(255, 255, 255, 0.8)',
        bordercolor: '#d1d5db',
        borderwidth: 1,
      },
      annotations: layoutAnnotations,
      margin: { l: 60, r: 40, t: 60, b: 60 },
    }

    const config = {
      responsive: true,
      displayModeBar: true,
      displaylogo: false,
      modeBarButtonsToRemove: ['lasso2d', 'select2d'],
    }

    Plotly.newPlot(plotRef.current, traces, layout, config)

    // Cleanup on unmount
    return () => {
      if (plotRef.current) {
        Plotly.purge(plotRef.current)
      }
    }
  }, [
    xData,
    yData,
    predictions,
    loss,
    r2,
    residuals,
    showResiduals,
    title,
    xLabel,
    yLabel,
  ])

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

/**
 * Multi-plot comparison component
 * Useful for showing training vs test data side-by-side
 */
export const VisualizationComparison: React.FC<{
  title: string
  leftPlot: VisualizationProps
  rightPlot: VisualizationProps
}> = ({ title, leftPlot, rightPlot }) => {
  return (
    <div className="w-full">
      <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Visualization2D {...leftPlot} />
        <Visualization2D {...rightPlot} />
      </div>
    </div>
  )
}

/**
 * Loss over time visualization
 * Shows convergence and training progress
 */
export const LossVisualization: React.FC<{
  iterations: number[]
  losses: number[]
  title?: string
}> = ({ iterations, losses, title = 'Training Loss Over Time' }) => {
  const plotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!plotRef.current) return

    const trace = {
      x: iterations,
      y: losses,
      mode: 'lines',
      type: 'scatter' as const,
      name: 'Loss',
      line: {
        color: '#3b82f6', // blue
        width: 2,
      },
      fill: 'tozeroy',
      fillcolor: 'rgba(59, 130, 246, 0.1)',
    }

    const layout = {
      title: {
        text: title,
        font: { size: 16, color: '#1f2937' },
      },
      xaxis: {
        title: 'Iteration',
        gridcolor: '#e5e7eb',
      },
      yaxis: {
        title: 'Loss (MSE)',
        gridcolor: '#e5e7eb',
        type: 'log' as const,
      },
      hovermode: 'x unified' as const,
      plot_bgcolor: '#fafafa',
      paper_bgcolor: '#fff',
      font: { family: 'system-ui, sans-serif', size: 12, color: '#374151' },
      margin: { l: 60, r: 40, t: 60, b: 60 },
    }

    const config = {
      responsive: true,
      displayModeBar: true,
      displaylogo: false,
    }

    Plotly.newPlot(plotRef.current, [trace], layout, config)

    return () => {
      if (plotRef.current) {
        Plotly.purge(plotRef.current)
      }
    }
  }, [iterations, losses, title])

  return (
    <div
      ref={plotRef}
      style={{
        width: '100%',
        height: '300px',
        borderRadius: '0.5rem',
        overflow: 'hidden',
        border: '1px solid #e5e7eb',
        backgroundColor: '#fff',
      }}
    />
  )
}

/**
 * Residuals histogram visualization
 * Shows distribution of prediction errors
 */
export const ResidualsVisualization: React.FC<{
  residuals: number[]
  title?: string
}> = ({ residuals, title = 'Residuals Distribution' }) => {
  const plotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!plotRef.current) return

    const trace = {
      x: residuals,
      type: 'histogram',
      nbinsx: 20,
      marker: {
        color: '#8b5cf6', // purple
      },
      name: 'Residuals',
    }

    const layout = {
      title: {
        text: title,
        font: { size: 16, color: '#1f2937' },
      },
      xaxis: {
        title: 'Residual Value',
        gridcolor: '#e5e7eb',
      },
      yaxis: {
        title: 'Frequency',
        gridcolor: '#e5e7eb',
      },
      plot_bgcolor: '#fafafa',
      paper_bgcolor: '#fff',
      font: { family: 'system-ui, sans-serif', size: 12, color: '#374151' },
      margin: { l: 60, r: 40, t: 60, b: 60 },
    }

    const config = {
      responsive: true,
      displayModeBar: true,
      displaylogo: false,
    }

    Plotly.newPlot(plotRef.current, [trace], layout, config)

    return () => {
      if (plotRef.current) {
        Plotly.purge(plotRef.current)
      }
    }
  }, [residuals, title])

  return (
    <div
      ref={plotRef}
      style={{
        width: '100%',
        height: '300px',
        borderRadius: '0.5rem',
        overflow: 'hidden',
        border: '1px solid #e5e7eb',
        backgroundColor: '#fff',
      }}
    />
  )
}
