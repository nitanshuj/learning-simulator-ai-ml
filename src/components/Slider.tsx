import React from 'react'

interface SliderProps {
  label: string
  value: number
  min: number
  max: number
  step?: number
  onChange: (value: number) => void
  unit?: string
  description?: string
  tooltipPosition?: 'top' | 'bottom'
}

export const Slider: React.FC<SliderProps> = ({
  label,
  value,
  min,
  max,
  step = 0.01,
  onChange,
  unit = '',
  description,
  tooltipPosition = 'top',
}) => {
  const percentage = ((value - min) / (max - min)) * 100

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <span className="text-sm font-bold text-primary-600">
          {value.toFixed(3)} {unit}
        </span>
      </div>

      <div className="relative mb-1">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
          style={{
            background: `linear-gradient(to right, #0ea5e9 0%, #0ea5e9 ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`,
          }}
        />
        <div
          className="absolute top-0 transform -translate-x-1/2 -translate-y-8 text-xs font-bold bg-primary-600 text-white px-2 py-1 rounded whitespace-nowrap"
          style={{ left: `${percentage}%` }}
        >
          {value.toFixed(2)}
        </div>
      </div>

      <div className="flex justify-between text-xs text-gray-500 mt-2">
        <span>{min}</span>
        <span>{max}</span>
      </div>

      {description && (
        <p className="text-xs text-gray-600 mt-2 italic">💡 {description}</p>
      )}
    </div>
  )
}
