import React from 'react'

export interface PresetOption {
  id: string
  name: string
  description: string
}

interface PresetButtonsProps {
  presets: PresetOption[]
  onSelect: (presetId: string) => void
  selectedId?: string
}

// Color mapping for different preset types
const getPresetColor = (id: string): { bg: string; border: string; icon: string } => {
  const colorMap: Record<string, { bg: string; border: string; icon: string }> = {
    'good-fit': {
      bg: 'bg-green-50',
      border: 'border-green-300',
      icon: '✓',
    },
    'poor-fit': {
      bg: 'bg-red-50',
      border: 'border-red-300',
      icon: '✗',
    },
    'overfit': {
      bg: 'bg-orange-50',
      border: 'border-orange-300',
      icon: '⤴',
    },
    'underfit': {
      bg: 'bg-blue-50',
      border: 'border-blue-300',
      icon: '⤓',
    },
    'horizontal': {
      bg: 'bg-purple-50',
      border: 'border-purple-300',
      icon: '—',
    },
  }

  return (
    colorMap[id] || { bg: 'bg-gray-50', border: 'border-gray-300', icon: '◯' }
  )
}

export const PresetButtons: React.FC<PresetButtonsProps> = ({
  presets,
  onSelect,
  selectedId,
}) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
        {presets.map((preset) => {
          const { bg, border, icon } = getPresetColor(preset.id)
          const isSelected = selectedId === preset.id

          return (
            <button
              key={preset.id}
              onClick={() => onSelect(preset.id)}
              className={`
                relative p-4 rounded-lg border-2 transition-all transform hover:scale-105
                ${
                  isSelected
                    ? `${bg} ${border} shadow-lg scale-105 ring-2 ring-offset-2 ring-blue-400`
                    : `${bg} ${border} hover:shadow-md cursor-pointer`
                }
              `}
              title={preset.description}
            >
              {/* Status Badge */}
              <div
                className={`
                  absolute -top-3 -right-3 w-8 h-8 rounded-full border-2 border-white shadow-md
                  flex items-center justify-center text-lg font-bold
                  ${bg}
                `}
              >
                {icon}
              </div>

              {/* Preset Name */}
              <h3 className="font-semibold text-gray-900 text-sm mb-2">
                {preset.name}
              </h3>

              {/* Description */}
              <p className="text-xs text-gray-600 line-clamp-3 mb-3 leading-snug">
                {preset.description}
              </p>

              {/* Selection Indicator */}
              {isSelected && (
                <div className="flex items-center justify-center gap-1 text-xs font-semibold text-blue-600">
                  <span className="inline-block w-2 h-2 bg-blue-600 rounded-full"></span>
                  Selected
                </div>
              )}

              {/* Hover Indicator */}
              {!isSelected && (
                <div className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  Click to use
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Quick Info */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-gray-700">
          💡 <strong>Tip:</strong> Click a preset to instantly set those parameters. 
          Then use the sliders to fine-tune or click the training buttons to optimize automatically.
        </p>
      </div>
    </div>
  )
}

