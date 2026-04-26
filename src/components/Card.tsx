import React from 'react'

interface CardProps {
  children: React.ReactNode
  title?: string
  className?: string
  hover?: boolean
  onClick?: () => void
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  className = '',
  hover = false,
  onClick,
}) => {
  const baseClass = 'bg-white rounded-xl shadow-sm border border-divider transition-all duration-300 ease-out overflow-hidden'
  const hoverClass = hover ? 'hover:shadow-md hover:-translate-y-0.5 hover:border-blue-200' : ''

  return (
    <div className={`${baseClass} ${hoverClass} ${className}`} onClick={onClick}>
      {title && (
        <div className="px-6 py-4 border-b border-divider bg-slate-50/50">
          <h3 className="text-lg font-bold text-slate-800">{title}</h3>
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  )
}
