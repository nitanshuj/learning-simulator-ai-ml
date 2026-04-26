import React from 'react'
import { Card } from './Card'
import { Slider } from './Slider'
import { Button } from './Button'

export interface ControlItem {
  id: string
  label: string
  type: 'slider' | 'button'
  value?: number
  min?: number
  max?: number
  step?: number
  unit?: string
  description?: string
  onClick?: () => void
}

interface ControlPanelProps {
  controls: ControlItem[]
  onSliderChange: (id: string, value: number) => void
  onAction?: (actionId: string) => void
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  controls,
  onSliderChange,
  onAction,
}) => {
  return (
    <Card className="space-y-6">
      <h3 className="text-lg font-bold text-gray-900">Parameters</h3>

      <div className="space-y-6">
        {controls.map((control) => {
          if (control.type === 'slider') {
            return (
              <div key={control.id}>
                <Slider
                  label={control.label}
                  value={control.value || 0}
                  min={control.min || 0}
                  max={control.max || 1}
                  step={control.step || 0.01}
                  unit={control.unit}
                  description={control.description}
                  onChange={(val) => onSliderChange(control.id, val)}
                />
              </div>
            )
          }

          if (control.type === 'button') {
            return (
              <Button
                key={control.id}
                variant="secondary"
                size="md"
                onClick={() => onAction?.(control.id)}
                className="w-full"
              >
                {control.label}
              </Button>
            )
          }

          return null
        })}
      </div>
    </Card>
  )
}
