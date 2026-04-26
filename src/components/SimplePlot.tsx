import React, { useMemo } from 'react'

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

/**
 * Simple SVG-based 2D plot (fallback if Plotly fails)
 * Uses scales to fit data to visible canvas
 */
export const SimplePlot: React.FC<SimplePlotProps> = ({
  title,
  xData,
  yData,
  predictions,
  loss,
  r2,
  xLabel = 'X',
  yLabel = 'Y',
  width = '100%',
  height = 400,
}) => {
  const canvasWidth = 600
  const canvasHeight = 400
  const marginLeft = 60
  const marginBottom = 50
  const marginTop = 40
  const marginRight = 40

  const plotWidth = canvasWidth - marginLeft - marginRight
  const plotHeight = canvasHeight - marginTop - marginBottom

  // Calculate scales
  const scales = useMemo(() => {
    if (xData.length === 0) {
      return { xMin: 0, xMax: 10, yMin: 0, yMax: 10, xScale: 1, yScale: 1 }
    }

    const xMin = Math.min(...xData)
    const xMax = Math.max(...xData)
    const yMin = Math.min(...yData, ...(predictions || []))
    const yMax = Math.max(...yData, ...(predictions || []))

    const padding = 0.1
    const xRange = xMax - xMin || 1
    const yRange = yMax - yMin || 1

    return {
      xMin: xMin - xRange * padding,
      xMax: xMax + xRange * padding,
      yMin: yMin - yRange * padding,
      yMax: yMax + yRange * padding,
      xScale: plotWidth / ((xMax + xRange * padding) - (xMin - xRange * padding)),
      yScale: plotHeight / ((yMax + yRange * padding) - (yMin - yRange * padding)),
    }
  }, [xData, yData, predictions])

  const toCanvasX = (x: number) =>
    marginLeft + (x - scales.xMin) * scales.xScale

  const toCanvasY = (y: number) =>
    marginTop + plotHeight - (y - scales.yMin) * scales.yScale

  // Determine color for metrics
  const lossColor = !loss
    ? '#666'
    : loss < 0.1
      ? '#10b981'
      : loss < 0.5
        ? '#f59e0b'
        : '#ef4444'

  return (
    <div
      style={{
        width,
        height: typeof height === 'number' ? `${height}px` : height,
        borderRadius: '0.5rem',
        overflow: 'hidden',
        border: '1px solid #e5e7eb',
        backgroundColor: '#fff',
        padding: '16px',
      }}
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>

      {/* Metrics display */}
      <div className="flex gap-4 mb-4 text-sm">
        {loss !== undefined && (
          <div
            style={{
              backgroundColor: lossColor,
              color: '#fff',
              padding: '4px 8px',
              borderRadius: '4px',
            }}
          >
            MSE: {loss.toFixed(4)}
          </div>
        )}
        {r2 !== undefined && (
          <div
            style={{
              backgroundColor: r2 > 0.9 ? '#10b981' : r2 > 0.7 ? '#f59e0b' : '#ef4444',
              color: '#fff',
              padding: '4px 8px',
              borderRadius: '4px',
            }}
          >
            R²: {r2.toFixed(4)}
          </div>
        )}
      </div>

      {/* SVG Plot */}
      <svg width={canvasWidth} height={canvasHeight} style={{ border: '1px solid #e5e7eb' }}>
        {/* Background */}
        <rect width={canvasWidth} height={canvasHeight} fill="#fafafa" />

        {/* Grid lines */}
        <g stroke="#e5e7eb" strokeWidth="1">
          {/* Vertical grid lines */}
          {Array.from({ length: 5 }).map((_, i) => {
            const x =
              marginLeft +
              (i / 4) * plotWidth
            return (
              <line key={`vgrid-${i}`} x1={x} y1={marginTop} x2={x} y2={marginTop + plotHeight} />
            )
          })}
          {/* Horizontal grid lines */}
          {Array.from({ length: 5 }).map((_, i) => {
            const y =
              marginTop +
              (i / 4) * plotHeight
            return (
              <line key={`hgrid-${i}`} x1={marginLeft} y1={y} x2={marginLeft + plotWidth} y2={y} />
            )
          })}
        </g>

        {/* Axes */}
        <g stroke="#374151" strokeWidth="2">
          <line x1={marginLeft} y1={marginTop + plotHeight} x2={marginLeft + plotWidth} y2={marginTop + plotHeight} />
          <line x1={marginLeft} y1={marginTop} x2={marginLeft} y2={marginTop + plotHeight} />
        </g>

        {/* Axis labels */}
        <text
          x={canvasWidth / 2}
          y={canvasHeight - 5}
          textAnchor="middle"
          fill="#374151"
          fontSize="12"
        >
          {xLabel}
        </text>
        <text
          x={20}
          y={canvasHeight / 2}
          textAnchor="middle"
          fill="#374151"
          fontSize="12"
          transform={`rotate(-90 20 ${canvasHeight / 2})`}
        >
          {yLabel}
        </text>

        {/* Data points (blue) */}
        <g fill="#3b82f6" opacity="0.7">
          {xData.map((x, i) => (
            <circle
              key={`data-${i}`}
              cx={toCanvasX(x)}
              cy={toCanvasY(yData[i])}
              r="4"
            />
          ))}
        </g>

        {/* Fitted line (red) */}
        {predictions && predictions.length > 0 && (
          <g stroke="#ef4444" strokeWidth="2" fill="none">
            <polyline
              points={xData
                .map((x, i) => `${toCanvasX(x)},${toCanvasY(predictions[i])}`)
                .join(' ')}
            />
          </g>
        )}
      </svg>

      {/* Legend */}
      <div className="mt-4 flex gap-6 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500" />
          <span>Data Points</span>
        </div>
        {predictions && (
          <div className="flex items-center gap-2">
            <div className="w-3 h-1 bg-red-500" />
            <span>Fitted Line</span>
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * Loss history chart
 */
export const SimpleLossChart: React.FC<{
  iterations: number[]
  losses: number[]
  title?: string
}> = ({ iterations, losses, title = 'Training Loss' }) => {
  const canvasWidth = 600
  const canvasHeight = 300
  const marginLeft = 50
  const marginBottom = 40
  const marginTop = 30
  const marginRight = 30

  const plotWidth = canvasWidth - marginLeft - marginRight
  const plotHeight = canvasHeight - marginTop - marginBottom

  if (losses.length === 0) {
    return <div>No data to display</div>
  }

  const maxIter = Math.max(...iterations)
  const maxLoss = Math.max(...losses)
  const minLoss = Math.min(...losses)

  const xScale = plotWidth / (maxIter || 1)
  const yScale = plotHeight / (maxLoss - minLoss + maxLoss * 0.1)

  const toCanvasX = (x: number) => marginLeft + x * xScale
  const toCanvasY = (y: number) =>
    marginTop + plotHeight - ((y - minLoss) * yScale)

  return (
    <div
      style={{
        width: '100%',
        borderRadius: '0.5rem',
        overflow: 'hidden',
        border: '1px solid #e5e7eb',
        backgroundColor: '#fff',
        padding: '16px',
      }}
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>

      <svg width={canvasWidth} height={canvasHeight} style={{ border: '1px solid #e5e7eb' }}>
        <rect width={canvasWidth} height={canvasHeight} fill="#fafafa" />

        {/* Axes */}
        <g stroke="#374151" strokeWidth="2">
          <line x1={marginLeft} y1={marginTop + plotHeight} x2={marginLeft + plotWidth} y2={marginTop + plotHeight} />
          <line x1={marginLeft} y1={marginTop} x2={marginLeft} y2={marginTop + plotHeight} />
        </g>

        {/* Loss line */}
        <g stroke="#3b82f6" strokeWidth="2" fill="none">
          <polyline
            points={iterations
              .map((x, i) => `${toCanvasX(x)},${toCanvasY(losses[i])}`)
              .join(' ')}
          />
        </g>

        {/* Fill under line */}
        <g fill="#3b82f6" opacity="0.1">
          <polygon
            points={`${marginLeft},${marginTop + plotHeight} ${iterations
              .map((x, i) => `${toCanvasX(x)},${toCanvasY(losses[i])}`)
              .join(' ')} ${marginLeft + plotWidth},${marginTop + plotHeight}`}
          />
        </g>

        {/* Axis labels */}
        <text
          x={canvasWidth / 2}
          y={canvasHeight - 5}
          textAnchor="middle"
          fill="#374151"
          fontSize="12"
        >
          Iteration
        </text>
        <text
          x={15}
          y={canvasHeight / 2}
          textAnchor="middle"
          fill="#374151"
          fontSize="12"
          transform={`rotate(-90 15 ${canvasHeight / 2})`}
        >
          Loss
        </text>
      </svg>
    </div>
  )
}
