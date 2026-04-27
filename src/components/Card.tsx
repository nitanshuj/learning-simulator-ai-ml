
import React from 'react'

interface CardProps {
  children: React.ReactNode
  title?: string
  className?: string
  hover?: boolean
  onClick?: () => void
  headerAction?: React.ReactNode
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  className = '',
  hover = false,
  onClick,
  headerAction
}) => {
  const baseClass = 'bg-white rounded-2xl shadow-sm border border-slate-200 transition-all duration-300 ease-out overflow-hidden'
  const hoverClass = hover ? 'hover:shadow-md hover:-translate-y-0.5 hover:border-blue-200 cursor-pointer' : ''

  return (
    <div className={`flex flex-col ${baseClass} ${hoverClass} ${className}`} onClick={onClick}>
      {title && (
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between shrink-0">
          <h3 className="text-lg font-bold text-slate-800 tracking-tight">{title}</h3>
          {headerAction && (
            <div className="flex items-center">
              {headerAction}
            </div>
          )}
        </div>
      )}
      <div className={`flex-1 ${className.includes('p-0') ? 'p-0' : 'p-6'} h-full`}>
        {children}
      </div>
    </div>
  )
}
