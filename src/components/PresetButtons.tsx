import React from 'react'
import { Button } from './Button'

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

export const PresetButtons: React.FC<PresetButtonsProps> = ({
  presets,
  onSelect,
  selectedId,
}) => {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-bold text-gray-900 mb-3">📋 Presets</h4>
      <div className="grid grid-cols-1 gap-2">
        {presets.map((preset) => (
          <div key={preset.id}>
            <Button
              variant={selectedId === preset.id ? 'primary' : 'outline'}
              size="sm"
              onClick={() => onSelect(preset.id)}
              className="w-full text-left"
              title={preset.description}
            >
              {preset.name}
            </Button>
            <p className="text-xs text-gray-500 ml-2 mt-1 line-clamp-2">
              {preset.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
