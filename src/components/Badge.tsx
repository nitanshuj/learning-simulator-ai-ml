import React from 'react'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'emerald' | 'amber' | 'rose' | 'sky' | 'indigo' | 'slate'
  className?: string
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'slate',
  className = '',
}) => {
  const variantClasses = {
    emerald: 'bg-emerald-100 text-emerald-700',
    amber: 'bg-amber-100 text-amber-700',
    rose: 'bg-rose-100 text-rose-700',
    sky: 'bg-sky-100 text-sky-700',
    indigo: 'bg-indigo-100 text-indigo-700',
    slate: 'bg-slate-100 text-slate-700',
  }

  return (
    <span className={`px-2 py-0.5 rounded-full text-label font-medium ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  )
}
