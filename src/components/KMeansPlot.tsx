import React, { useEffect, useRef } from 'react'
import Plotly from 'plotly.js-dist-min'
import { KMeansPoint, KMeansCentroid } from '@/simulators/KMeans'

const CLUSTER_COLORS = [
  '#3b82f6', // blue
  '#ef4444', // red
  '#10b981', // emerald
  '#f59e0b', // amber
  '#8b5cf6', // purple
  '#ec4899', // pink
  '#14b8a6', // teal
  '#f97316', // orange
]

interface KMeansPlotProps {
  points: KMeansPoint[]
  centroids: KMeansCentroid[]
  width?: number | string
  height?: number | string
}

export const KMeansPlot: React.FC<KMeansPlotProps> = ({
  points,
  centroids,
  width = '100%',
  height = 500,
}) => {
  const plotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!plotRef.current) return

    const traces: any[] = []
    const k = centroids.length

    // One trace per cluster for data points
    for (let c = 0; c < k; c++) {
      const clusterPoints = points.filter(p => p.cluster === c)
      const unassigned = points.filter(p => p.cluster === -1)

      if (c === 0 && unassigned.length > 0) {
        traces.push({
          x: unassigned.map(p => p.x),
          y: unassigned.map(p => p.y),
          mode: 'markers',
          type: 'scatter',
          name: 'Unassigned',
          marker: { size: 7, color: '#94a3b8', opacity: 0.6 },
          showlegend: true,
        })
      }

      if (clusterPoints.length > 0) {
        traces.push({
          x: clusterPoints.map(p => p.x),
          y: clusterPoints.map(p => p.y),
          mode: 'markers',
          type: 'scatter',
          name: `Cluster ${c + 1}`,
          marker: {
            size: 7,
            color: CLUSTER_COLORS[c % CLUSTER_COLORS.length],
            opacity: 0.75,
            line: { color: 'white', width: 0.5 },
          },
        })
      }
    }

    // Centroid markers (stars)
    traces.push({
      x: centroids.map(c => c.x),
      y: centroids.map(c => c.y),
      mode: 'markers',
      type: 'scatter',
      name: 'Centroids',
      marker: {
        size: 18,
        symbol: 'star',
        color: centroids.map(c => CLUSTER_COLORS[c.cluster % CLUSTER_COLORS.length]),
        line: { color: '#1e293b', width: 2 },
      },
    })

    const layout: any = {
      margin: { l: 40, r: 20, t: 20, b: 40 },
      paper_bgcolor: '#fff',
      plot_bgcolor: '#f8fafc',
      font: { family: 'Quicksand, sans-serif', size: 12, color: '#374151' },
      showlegend: true,
      legend: { orientation: 'h', y: -0.12 },
      xaxis: { gridcolor: '#e2e8f0', zeroline: false },
      yaxis: { gridcolor: '#e2e8f0', zeroline: false, scaleanchor: 'x' },
      hovermode: 'closest',
    }

    const config = {
      responsive: true,
      displayModeBar: false,
    }

    Plotly.newPlot(plotRef.current, traces, layout, config)

    return () => {
      if (plotRef.current) Plotly.purge(plotRef.current)
    }
  }, [points, centroids])

  return (
    <div
      ref={plotRef}
      style={{
        width,
        height: typeof height === 'number' ? `${height}px` : height,
        borderRadius: '0.75rem',
        overflow: 'hidden',
        border: '1px solid #e2e8f0',
        backgroundColor: '#fff',
      }}
    />
  )
}
