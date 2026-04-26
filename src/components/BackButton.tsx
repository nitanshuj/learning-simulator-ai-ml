import React from 'react'
import { useNavigate } from 'react-router-dom'

export const BackButton: React.FC = () => {
  const navigate = useNavigate()
  return (
    <button
      onClick={() => navigate('/')}
      className="fixed top-20 left-4 z-40 flex items-center gap-2 bg-white border border-slate-200 text-slate-600 text-sm font-bold px-3 py-2 rounded-full shadow-sm hover:bg-slate-50 hover:text-blue-600 transition-all"
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      Models
    </button>
  )
}
