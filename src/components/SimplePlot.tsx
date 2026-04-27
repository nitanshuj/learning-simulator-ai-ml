
import React, { useEffect, useRef } from 'react'
import Plotly from 'plotly.js-dist-min'

export interface SimplePlotProps {
  title: string
  xData: number[]
  yData: number[]
  predictions?: number[]
  loss?: number
  r2?: number
  xLabel?: string
  yLabel?: string
  width?: number | string
  height?: number | string
}

export const SimplePlot: React.FC<SimplePlotProps> = ({
  title,
  xData,
  yData,
  predictions,
  loss,
  r2,
  xLabel = 'X Variable',
  yLabel = 'Y Variable',
  width = '100%',
  height = 450,
}) => {
  const plotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!plotRef.current) return

    const data: any[] = [
      {
        x: xData,
        y: yData,
        mode: 'markers',
        type: 'scatter',
        name: 'Data Points',
        marker: { 
          color: '#3b82f6', 
          size: 8,
          opacity: 0.7,
          line: { color: '#2563eb', width: 1 }
        },
        hovertemplate: 'X: %{x:.2f}<br>Y: %{y:.2f}<extra></extra>'
      }
    ]

    if (predictions && predictions.length > 0) {
      data.push({
        x: xData,
        y: predictions,
        mode: 'lines',
        type: 'scatter',
        name: 'Fitted Line',
        line: { color: '#ef4444', width: 3 },
        hovertemplate: 'Pred: %{y:.2f}<extra></extra>'
      })
    }

    const layout: any = {
      title: {
        text: title,
        font: { size: 16, color: '#1e293b', family: 'Inter, sans-serif' }
      },
      margin: { l: 60, r: 30, t: 60, b: 60 },
      paper_bgcolor: 'rgba(0,0,0,0)',
      plot_bgcolor: '#f8fafc',
      showlegend: true,
      legend: { orientation: 'h', y: -0.2 },
      xaxis: {
        title: { text: xLabel, font: { size: 12, color: '#64748b' } },
        gridcolor: '#e2e8f0',
        zerolinecolor: '#94a3b8'
      },
      yaxis: {
        title: { text: yLabel, font: { size: 12, color: '#64748b' } },
        gridcolor: '#e2e8f0',
        zerolinecolor: '#94a3b8'
      },
      hovermode: 'closest',
      dragmode: 'zoom'
    }

    const config = {
      responsive: true,
      displaylogo: false,
      modeBarButtonsToRemove: ['select2d', 'lasso2d']
    }

    Plotly.newPlot(plotRef.current, data, layout, config)

    return () => {
      if (plotRef.current) Plotly.purge(plotRef.current)
    }
  }, [xData, yData, predictions, title, xLabel, yLabel])

  return (
    <div className="relative group">
      {/* Metric Overlays */}
      <div className="absolute top-4 left-4 z-10 flex gap-2 pointer-events-none">
        {loss !== undefined && (
          <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg border border-slate-200 shadow-sm">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-2">MSE</span>
            <span className={`text-sm font-black ${loss < 0.5 ? 'text-emerald-500' : 'text-amber-500'}`}>
              {loss.toFixed(4)}
            </span>
          </div>
        )}
        {r2 !== undefined && (
          <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg border border-slate-200 shadow-sm">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-2">R²</span>
            <span className={`text-sm font-black ${r2 > 0.8 ? 'text-emerald-500' : 'text-blue-600'}`}>
              {r2.toFixed(4)}
            </span>
          </div>
        )}
      </div>

      <div 
        ref={plotRef} 
        style={{ width, height: typeof height === 'number' ? `${height}px` : height }}
        className="rounded-xl overflow-hidden border border-slate-200 bg-white"
      />

      <div className="absolute bottom-2 right-4 text-[9px] font-bold text-slate-400 uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">
        Scroll to Zoom • Drag to Pan
      </div>
    </div>
  )
}

export const SimpleLossChart: React.FC<{
  iterations: number[]
  losses: number[]
  title?: string
}> = ({ iterations, losses, title = 'Training Loss Evolution' }) => {
  const plotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!plotRef.current || losses.length === 0) return

    const data: any[] = [{
      x: iterations,
      y: losses,
      mode: 'lines',
      type: 'scatter',
      fill: 'tozeroy',
      fillcolor: 'rgba(59, 130, 246, 0.1)',
      line: { color: '#3b82f6', width: 2 },
      name: 'Loss'
    }]

    const layout: any = {
      title: {
        text: title,
        font: { size: 14, color: '#1e293b', family: 'Inter, sans-serif' }
      },
      margin: { l: 50, r: 20, t: 40, b: 40 },
      paper_bgcolor: 'rgba(0,0,0,0)',
      plot_bgcolor: '#f8fafc',
      xaxis: {
        title: { text: 'Iteration', font: { size: 10, color: '#64748b' } },
        gridcolor: '#f1f5f9'
      },
      yaxis: {
        title: { text: 'Loss', font: { size: 10, color: '#64748b' } },
        gridcolor: '#f1f5f9'
      },
      dragmode: 'zoom'
    }

    const config = {
      responsive: true,
      displayModeBar: false
    }

    Plotly.newPlot(plotRef.current, data, layout, config)

    return () => {
      if (plotRef.current) Plotly.purge(plotRef.current)
    }
  }, [iterations, losses, title])

  return (
    <div 
      ref={plotRef} 
      style={{ width: '100%', height: '300px' }}
      className="rounded-xl overflow-hidden border border-slate-100 bg-white"
    />
  )
}
