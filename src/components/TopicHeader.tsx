import React from 'react'
import { Link } from 'react-router-dom'


interface Prerequisite {
  id: string
  title: string
  route: string
}

interface PathInfo {
  id: string
  title: string
  route: string
}

interface TopicHeaderProps {
  title: string
  trackTitle: string
  trackRoute: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  estimatedTime: string
  prerequisites: Prerequisite[]
  paths: PathInfo[]
}

export const TopicHeader: React.FC<TopicHeaderProps> = ({
  title,
  trackTitle,
  trackRoute,
  difficulty,
  estimatedTime,
  prerequisites,
  paths,
}) => {
  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Beginner':
        return 'bg-blue-50 text-blue-700 border-blue-100'
      case 'Intermediate':
        return 'bg-amber-50 text-amber-700 border-amber-100'
      case 'Advanced':
        return 'bg-rose-50 text-rose-700 border-rose-100'
      default:
        return 'bg-slate-50 text-slate-700 border-slate-100'
    }
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-sm relative overflow-hidden mb-8">
      {/* Decorative backdrop glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-500/5 to-indigo-500/5 rounded-full pointer-events-none filter blur-2xl" />

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative z-10">
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400">
            <Link to="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link to={trackRoute} className="hover:text-blue-600 transition-colors">
              {trackTitle}
            </Link>
            <span>/</span>
            <span className="text-slate-600">{title}</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
            {title}
          </h1>

          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`text-xs font-bold px-3 py-1 rounded-full border ${getDifficultyColor(
                difficulty
              )}`}
            >
              {difficulty}
            </span>
            <span className="text-xs font-semibold bg-slate-50 text-slate-600 border border-slate-100 px-3 py-1 rounded-full flex items-center space-x-1">
              <span>⏱️</span>
              <span>{estimatedTime}</span>
            </span>
          </div>
        </div>

        {/* Prerequisites and Path Context */}
        <div className="flex flex-col sm:flex-row gap-6 md:text-right">
          {prerequisites.length > 0 && (
            <div className="space-y-2">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                Prerequisites
              </span>
              <div className="flex flex-wrap gap-2 md:justify-end">
                {prerequisites.map((prereq) => (
                  <Link
                    key={prereq.id}
                    to={prereq.route}
                    className="text-xs font-semibold bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-600 border border-slate-100 hover:border-blue-100 px-2.5 py-1 rounded-lg transition-all"
                  >
                    {prereq.title}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {paths.length > 0 && (
            <div className="space-y-2">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                Part of Guided Paths
              </span>
              <div className="flex flex-wrap gap-2 md:justify-end">
                {paths.map((p) => (
                  <Link
                    key={p.id}
                    to={p.route}
                    className="text-xs font-bold bg-indigo-50/50 hover:bg-indigo-50 text-indigo-600 border border-indigo-100/50 px-2.5 py-1 rounded-lg transition-all"
                  >
                    {p.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
