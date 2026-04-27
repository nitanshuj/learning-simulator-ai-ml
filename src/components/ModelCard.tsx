
import React from 'react'
import { Card } from './Card'
import { ModelData, Category } from '@/data/models'

interface ModelCardProps {
  model: ModelData
  isFeatured?: boolean
  onClick?: (id: string) => void
}

export const ModelCard: React.FC<ModelCardProps> = ({ model, onClick }) => {
  const getCategoryColor = (category: Category) => {
    switch (category) {
      case 'Regression': return 'bg-blue-50 text-blue-600'
      case 'Classification': return 'bg-emerald-50 text-emerald-600'
      case 'Clustering': return 'bg-amber-50 text-amber-600'
      case 'Dimensionality Reduction': return 'bg-indigo-50 text-indigo-600'
      case 'Supervised Learning': return 'bg-slate-100 text-slate-600'
      case 'Unsupervised Learning': return 'bg-slate-100 text-slate-600'
      case 'NLP': return 'bg-purple-50 text-purple-600'
      default: return 'bg-slate-50 text-slate-600'
    }
  }

  const isComingSoon = model.status === 'Coming Soon'

  return (
    <Card
      hover
      className={`group cursor-pointer p-0 overflow-hidden border-slate-100 sm:h-52 ${isComingSoon ? 'opacity-75' : ''}`}
      onClick={() => !isComingSoon && onClick?.(model.id)}
    >
      <div className="flex flex-col sm:flex-row h-full">
        {/* Icon Section - Left side on desktop */}
        <div className={`w-full sm:w-32 flex items-center justify-center bg-slate-50/50 border-b sm:border-b-0 sm:border-r border-slate-100 relative group-hover:bg-white transition-colors duration-300 min-h-[120px]`}>
          <div className="text-4xl transform group-hover:scale-110 transition-transform duration-300 z-10">
            {model.icon}
          </div>
          {/* Subtle patterns */}
          <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
            <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full border border-current" />
            <div className="absolute -bottom-6 -right-6 w-20 h-20 rounded-full border-2 border-current" />
          </div>
        </div>

        {/* Content Section - Right side */}
        <div className="flex-1 p-5 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                {model.title}
              </h4>
              {isComingSoon && (
                <span className="text-[9px] font-black bg-slate-100 text-slate-400 px-1.5 py-0.5 rounded uppercase tracking-tighter">
                  Coming Soon
                </span>
              )}
            </div>
            <p className="text-sm text-slate-500 leading-snug line-clamp-2 mb-3">
              {model.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-auto">
            {model.categories.map((cat) => (
              <span
                key={cat}
                className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${getCategoryColor(cat)}`}
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}
