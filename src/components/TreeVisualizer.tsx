
import React, { useState } from 'react'
import { DecisionTreeNode } from '@/simulators'

interface TreeVisualizerProps {
  node: DecisionTreeNode | null
  width?: number
  height?: number
}

const NODE_RADIUS = 22
const VERTICAL_SPACING = 80
const CLASS_COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899']

export const TreeVisualizer: React.FC<TreeVisualizerProps> = ({ 
  node, 
  width = 2000, // Very wide by default to accommodate large trees
  height = 600 
}) => {
  const [zoom, setZoom] = useState(1)

  if (!node) return (
    <div className="flex items-center justify-center h-64 bg-slate-50 rounded-xl text-slate-400 italic border-2 border-dashed border-slate-200">
      No tree trained yet
    </div>
  )

  const renderNode = (
    curr: DecisionTreeNode, 
    x: number, 
    y: number, 
    xOffset: number
  ): React.ReactNode => {
    const isLeaf = curr.isLeaf
    const nodeColor = isLeaf ? (CLASS_COLORS[curr.prediction!] || '#94a3b8') : '#fff'
    
    return (
      <g key={curr.id}>
        {/* Edges to children */}
        {!isLeaf && curr.left && (
          <>
            <line 
              x1={x} y1={y} 
              x2={x - xOffset} y2={y + VERTICAL_SPACING} 
              stroke="#cbd5e1" strokeWidth="2" 
            />
            {renderNode(curr.left, x - xOffset, y + VERTICAL_SPACING, xOffset / 1.8)}
          </>
        )}
        {!isLeaf && curr.right && (
          <>
            <line 
              x1={x} y1={y} 
              x2={x + xOffset} y2={y + VERTICAL_SPACING} 
              stroke="#cbd5e1" strokeWidth="2" 
            />
            {renderNode(curr.right, x + xOffset, y + VERTICAL_SPACING, xOffset / 1.8)}
          </>
        )}

        {/* Node Circle */}
        <circle 
          cx={x} cy={y} r={NODE_RADIUS} 
          fill={nodeColor} 
          stroke={isLeaf ? nodeColor : '#64748b'} 
          strokeWidth="2"
          className="transition-all duration-300"
        />

        {/* Node Text */}
        <text 
          x={x} y={y} 
          textAnchor="middle" dy=".3em" 
          fill={isLeaf ? '#fff' : '#1e293b'} 
          fontSize="10px" fontWeight="800"
          className="pointer-events-none select-none"
        >
          {isLeaf ? `C${curr.prediction}` : `X${curr.featureIndex! + 1}`}
        </text>

        {/* Split Info / Gini Info */}
        <text x={x} y={y + NODE_RADIUS + 15} textAnchor="middle" fontSize="9px" fontWeight="600" fill={isLeaf ? '#64748b' : '#334155'}>
          {!isLeaf ? `≤ ${curr.threshold?.toFixed(2)}` : `G: ${curr.gini.toFixed(2)}`}
        </text>

        {/* Sample Count */}
        <text x={x} y={y - NODE_RADIUS - 8} textAnchor="middle" fontSize="8px" fill="#94a3b8" fontWeight="bold">
          n={curr.samples}
        </text>
      </g>
    )
  }

  return (
    <div className="relative bg-white rounded-xl border border-slate-200 shadow-inner overflow-hidden w-full">
      {/* Zoom Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
        <button 
          onClick={() => setZoom(prev => Math.min(prev + 0.1, 2))}
          className="w-8 h-8 bg-white border border-slate-200 rounded-lg shadow-sm flex items-center justify-center hover:bg-slate-50 font-bold"
        >
          +
        </button>
        <button 
          onClick={() => setZoom(prev => Math.max(prev - 0.1, 0.2))}
          className="w-8 h-8 bg-white border border-slate-200 rounded-lg shadow-sm flex items-center justify-center hover:bg-slate-50 font-bold"
        >
          −
        </button>
        <button 
          onClick={() => setZoom(1)}
          className="w-8 h-8 bg-white border border-slate-200 rounded-lg shadow-sm flex items-center justify-center hover:bg-slate-50 text-[10px] font-bold"
        >
          1x
        </button>
      </div>

      <div className="overflow-x-auto overflow-y-hidden cursor-grab active:cursor-grabbing p-10 min-h-[450px]">
        <div style={{ transform: `scale(${zoom})`, transformOrigin: 'top center', transition: 'transform 0.2s ease-out', width: 'max-content', margin: '0 auto' }}>
          <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
            {renderNode(node, width / 2, 40, width / 4.5)}
          </svg>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-slate-50 border-t border-slate-200 p-3 flex flex-wrap justify-center gap-4 text-[9px] font-bold text-slate-500 uppercase tracking-widest">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-white border-2 border-slate-400" />
          <span>Decision</span>
        </div>
        {CLASS_COLORS.slice(0, 4).map((color, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: color }} />
            <span>Class {i}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
