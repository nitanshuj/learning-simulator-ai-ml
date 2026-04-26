import React from 'react'

interface PillProps {
  children: React.ReactNode
  color?: string
  className?: string
}

export const Pill: React.FC<PillProps> = ({
  children,
  color = 'blue',
  className = '',
}) => {
  // Map category colors to Tailwind classes if possible, or use inline styles for dynamic colors
  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
    purple: 'bg-purple-50 text-purple-600 border-purple-100',
    indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    teal: 'bg-teal-50 text-teal-600 border-teal-100',
    pink: 'bg-pink-50 text-pink-600 border-pink-100',
    orange: 'bg-orange-50 text-orange-600 border-orange-100',
    red: 'bg-red-50 text-red-600 border-red-100',
  }

  const selectedClass = colorClasses[color] || colorClasses.blue

  return (
    <span className={`px-3 py-1 border rounded-full text-label font-semibold ${selectedClass} ${className}`}>
      {children}
    </span>
  )
}
