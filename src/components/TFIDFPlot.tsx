import React, { useEffect, useRef } from 'react'
import Plotly from 'plotly.js-dist-min'

interface TFIDFPlotProps {
  points: { id: number; x: number; y: number; text: string }[]
  height?: number | string
}

export const TFIDFPlot: React.FC<TFIDFPlotProps> = ({ points, height = 400 }) => {
  const plotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!plotRef.current) return

    const trace = {
      x: points.map(p => p.x),
      y: points.map(p => p.y),
      text: points.map(p => `Doc ${p.id}: ${p.text}`),
      mode: 'markers+text',
      textposition: 'top center',
      type: 'scatter',
      marker: {
        size: 12,
        color: '#d946ef',
        line: { color: 'white', width: 2 }
      },
      hoverinfo: 'text'
    }

    const layout: any = {
      margin: { l: 40, r: 40, t: 40, b: 40 },
      paper_bgcolor: '#fff',
      plot_bgcolor: '#f8fafc',
      font: { family: 'Quicksand, sans-serif', size: 12, color: '#374151' },
      xaxis: { title: 'Component 1', gridcolor: '#e2e8f0', zeroline: true, zerolinecolor: '#cbd5e1' },
      yaxis: { title: 'Component 2', gridcolor: '#e2e8f0', zeroline: true, zerolinecolor: '#cbd5e1' },
      hovermode: 'closest',
      showlegend: false
    }

    Plotly.newPlot(plotRef.current, [trace], layout, { 
      displayModeBar: true, 
      responsive: true,
      modeBarButtonsToRemove: ['lasso2d', 'select2d', 'autoScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian'],
      displaylogo: false
    })

    return () => {
      if (plotRef.current) Plotly.purge(plotRef.current)
    }
  }, [points])

  return (
    <div
      ref={plotRef}
      style={{
        width: '100%',
        height: typeof height === 'number' ? `${height}px` : height,
        borderRadius: '0.75rem',
        overflow: 'hidden',
        border: '1px solid #e2e8f0',
        backgroundColor: '#fff',
      }}
    />
  )
}
