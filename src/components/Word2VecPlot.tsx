import React, { useEffect, useRef } from 'react'
import Plotly from 'plotly.js-dist-min'
import { WordEmbedding } from '@/simulators/Word2Vec'

interface Word2VecPlotProps {
  embeddings: WordEmbedding[]
  selectedWords: string[]
  height?: number | string
}

export const Word2VecPlot: React.FC<Word2VecPlotProps> = ({ embeddings, selectedWords, height = 400 }) => {
  const plotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!plotRef.current) return

    const traces: any[] = []

    // Background unselected words
    const unselected = embeddings.filter(e => !selectedWords.includes(e.word))
    if (unselected.length > 0) {
      traces.push({
        x: unselected.map(e => e.x),
        y: unselected.map(e => e.y),
        text: unselected.map(e => e.word),
        mode: 'markers+text',
        textposition: 'top center',
        type: 'scatter',
        marker: { size: 8, color: '#94a3b8', opacity: 0.5 },
        hoverinfo: 'text'
      })
    }

    // Selected words
    const selected = selectedWords.map(sw => embeddings.find(e => e.word === sw)).filter(Boolean) as WordEmbedding[]
    if (selected.length > 0) {
      traces.push({
        x: selected.map(e => e.x),
        y: selected.map(e => e.y),
        text: selected.map(e => `<b>${e.word}</b>`),
        mode: 'markers+text',
        textposition: 'top center',
        type: 'scatter',
        marker: { size: 14, color: '#a855f7', line: { color: 'white', width: 2 } },
        hoverinfo: 'text'
      })
    }

    // Vector operations if 2 or 3 words are selected
    if (selected.length >= 2) {
      // Draw arrow from 1st to 2nd
      traces.push({
        x: [selected[0].x, selected[1].x],
        y: [selected[0].y, selected[1].y],
        mode: 'lines',
        line: { color: '#ef4444', width: 2, dash: 'dot' },
        hoverinfo: 'none'
      })
    }
    
    if (selected.length === 3) {
      // Draw hypothetical 4th point based on vector math (e.g. A - B + C)
      // Like King - Man + Woman = Queen
      // Let's do: Point 1 - Point 2 + Point 3
      const targetX = selected[0].x - selected[1].x + selected[2].x;
      const targetY = selected[0].y - selected[1].y + selected[2].y;
      
      traces.push({
        x: [selected[2].x, targetX],
        y: [selected[2].y, targetY],
        mode: 'lines',
        line: { color: '#10b981', width: 2, dash: 'dot' },
        hoverinfo: 'none'
      });

      traces.push({
        x: [targetX],
        y: [targetY],
        text: ['<b>Result</b>'],
        mode: 'markers+text',
        textposition: 'bottom right',
        marker: { size: 14, color: '#10b981', symbol: 'star', line: { color: 'white', width: 2 } },
        hoverinfo: 'text'
      });
    }

    const layout: any = {
      margin: { l: 40, r: 40, t: 40, b: 40 },
      paper_bgcolor: '#fff',
      plot_bgcolor: '#f8fafc',
      font: { family: 'Quicksand, sans-serif', size: 12, color: '#374151' },
      xaxis: { title: 'Dimension 1', gridcolor: '#e2e8f0', zeroline: true, zerolinecolor: '#cbd5e1' },
      yaxis: { title: 'Dimension 2', gridcolor: '#e2e8f0', zeroline: true, zerolinecolor: '#cbd5e1' },
      hovermode: 'closest',
      showlegend: false
    }

    Plotly.newPlot(plotRef.current, traces, layout, { 
      displayModeBar: true, 
      responsive: true,
      modeBarButtonsToRemove: ['lasso2d', 'select2d', 'autoScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian'],
      displaylogo: false
    })

    return () => {
      if (plotRef.current) Plotly.purge(plotRef.current)
    }
  }, [embeddings, selectedWords])

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
