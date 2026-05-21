import React from 'react'
import { Link } from 'react-router-dom'

interface NextTopicBarProps {
  nextTopic: {
    title: string
    route: string
  } | null
  currentPath?: {
    title: string
    stepN: number
    totalSteps: number
    route: string
  }
}

export const NextTopicBar: React.FC<NextTopicBarProps> = ({ nextTopic, currentPath }) => {
  if (!nextTopic && !currentPath) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 shadow-lg px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-7xl mx-auto rounded-t-3xl md:left-[18rem]">
      <div className="flex items-center space-x-3">
        {currentPath ? (
          <div>
            <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest block">
              Active Path: {currentPath.title}
            </span>
            <span className="text-sm font-bold text-slate-700">
              Step {currentPath.stepN} of {currentPath.totalSteps}
            </span>
            <div className="w-32 h-1.5 bg-slate-100 rounded-full mt-1 overflow-hidden">
              <div 
                className="bg-indigo-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${(currentPath.stepN / currentPath.totalSteps) * 100}%` }}
              />
            </div>
          </div>
        ) : (
          <div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
              Recommended Next
            </span>
            <span className="text-sm font-semibold text-slate-500">
              Continue your visualization journey
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
        {currentPath && (
          <Link
            to={currentPath.route}
            className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
          >
            View Roadmap
          </Link>
        )}
        {nextTopic ? (
          <Link
            to={nextTopic.route}
            className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold shadow-md hover:bg-slate-800 transition-all flex items-center space-x-2 w-full sm:w-auto justify-center"
          >
            <span>Next: {nextTopic.title}</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        ) : (
          <span className="px-6 py-2.5 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-black uppercase tracking-wider">
            🎉 Path Completed!
          </span>
        )}
      </div>
    </div>
  )
}
