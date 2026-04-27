import React, { useMemo } from 'react'
import { ClusterNode } from '@/simulators/HierarchicalClustering'

interface DendrogramProps {
  root: ClusterNode | null
  threshold: number
  maxDistance: number
  width?: number
  height?: number
}

export const Dendrogram: React.FC<DendrogramProps> = ({
  root,
  threshold,
  maxDistance,
  width = 600,
  height = 300,
}) => {
  const layout = useMemo(() => {
    if (!root) return null

    const nodes: Map<number, { x: number, y: number }> = new Map()
    const lines: { x1: number, y1: number, x2: number, y2: number, color: string }[] = []
    
    // First pass: assign x to leaves
    let leafCount = 0
    const assignX = (node: ClusterNode): number => {
      if (!node.children) {
        const x = (leafCount + 0.5) * (width / root.points.length)
        const y = height // Leaves at bottom
        nodes.set(node.id, { x, y })
        leafCount++
        return x
      } else {
        const x1 = assignX(node.children[0])
        const x2 = assignX(node.children[1])
        const x = (x1 + x2) / 2
        const y = height - (node.height / (maxDistance || 1)) * height
        nodes.set(node.id, { x, y })
        return x
      }
    }

    assignX(root)

    // Second pass: create lines
    const createLines = (node: ClusterNode) => {
      if (!node.children) return

      const current = nodes.get(node.id)!
      const left = nodes.get(node.children[0].id)!
      const right = nodes.get(node.children[1].id)!

      const isAboveThreshold = node.height > threshold

      // Horizontal bar
      lines.push({ 
        x1: left.x, y1: current.y, 
        x2: right.x, y2: current.y, 
        color: isAboveThreshold ? '#cbd5e1' : '#3b82f6' 
      })
      // Vertical left
      lines.push({ 
        x1: left.x, y1: current.y, 
        x2: left.x, y2: left.y, 
        color: isAboveThreshold ? '#cbd5e1' : '#3b82f6' 
      })
      // Vertical right
      lines.push({ 
        x1: right.x, y1: current.y, 
        x2: right.x, y2: right.y, 
        color: isAboveThreshold ? '#cbd5e1' : '#3b82f6' 
      })

      createLines(node.children[0])
      createLines(node.children[1])
    }

    createLines(root)
    return { nodes, lines }
  }, [root, maxDistance, threshold, width, height])

  if (!layout) return <div className="h-[300px] flex items-center justify-center text-slate-400">Processing hierarchy...</div>

  const thresholdY = height - (threshold / (maxDistance || 1)) * height

  return (
    <div className="relative bg-white p-4 rounded-2xl border border-slate-200 shadow-sm overflow-hidden group">
      <div className="mb-4 flex justify-between items-center px-2">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Cluster Dendrogram</h3>
        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-1 rounded-lg">
          Height = Distance
        </div>
      </div>
      
      <svg width={width} height={height} className="overflow-visible">
        {/* Threshold Line */}
        <line 
          x1={0} y1={thresholdY} 
          x2={width} y2={thresholdY} 
          stroke="#ef4444" 
          strokeWidth="2" 
          strokeDasharray="4 4"
          className="transition-all duration-300"
        />
        <text 
          x={5} y={thresholdY - 5} 
          className="text-[10px] font-bold fill-red-500 uppercase"
        >
          Threshold: {threshold.toFixed(2)}
        </text>

        {/* Hierarchy Lines */}
        {layout.lines.map((l, i) => (
          <line 
            key={i} 
            {...l} 
            stroke={l.color} 
            strokeWidth="1.5" 
            className="transition-all duration-500 ease-out"
          />
        ))}
      </svg>

      <div className="absolute bottom-4 right-4 text-[9px] font-bold text-slate-300 uppercase tracking-tight pointer-events-none group-hover:text-slate-400 transition-colors">
        Hierarchical Relationships
      </div>
    </div>
  )
}
