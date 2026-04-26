import React from 'react'
import { Card } from './Card'
import { Badge } from './Badge'
import { Pill } from './Pill'
import { Button } from './Button'
import { ModelData } from '@/data/models'

interface ModelCardProps {
  model: ModelData
  isFeatured?: boolean
  onClick?: (id: string) => void
}

export const ModelCard: React.FC<ModelCardProps> = ({ model, onClick }) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Regression': return 'bg-blue-50 text-blue-600'
      case 'Classification': return 'bg-emerald-50 text-emerald-600'
      case 'Clustering': return 'bg-amber-50 text-amber-600'
      case 'Dimensionality Reduction': return 'bg-indigo-50 text-indigo-600'
      default: return 'bg-slate-50 text-slate-600'
    }
  }

  const categoryStyle = getCategoryColor(model.category)

  return (
    <Card 
      hover 
      className="h-full flex flex-col p-0 overflow-hidden group cursor-pointer"
      onClick={() => model.status !== 'Coming Soon' && onClick?.(model.id)}
    >
      {/* Illustration Area */}
      <div className={`h-32 flex items-center justify-center ${categoryStyle.split(' ')[0]} border-b border-divider relative`}>
        <div className="text-5xl transform group-hover:scale-110 transition-transform duration-300">
          {model.icon}
        </div>
        {/* Simple doodle-like background elements */}
        <div className="absolute top-2 left-2 w-4 h-4 rounded-full border border-current opacity-20" />
        <div className="absolute bottom-4 right-6 w-8 h-8 rounded-full border-2 border-current opacity-10" />
        <div className="absolute top-4 right-4 w-6 h-1 bg-current opacity-10 rounded-full rotate-45" />
      </div>
      
      <div className="p-xl space-y-md flex-1 flex flex-col">
        <h4 className="text-h4 font-bold text-slate-800">{model.title}</h4>
        <p className="text-sm text-slate-600 leading-relaxed flex-1">
          {model.description}
        </p>
        
        <div className="pt-md flex items-center justify-between">
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${categoryStyle}`}>
            {model.category}
          </span>
          {model.status === 'Coming Soon' && (
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider italic">
              Coming Soon
            </span>
          )}
        </div>
      </div>
    </Card>
  )
}
