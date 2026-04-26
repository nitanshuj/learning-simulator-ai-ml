import React from 'react'
import { LessonCard } from './LessonCard'
import { Visualization } from './Visualization'
import { ControlPanel, ControlItem } from './ControlPanel'

interface SimulatorViewProps {
  title: string
  explanation: string
  keyPoints: string[]
  controls: ControlItem[]
  onSliderChange: (id: string, value: number) => void
  onAction?: (actionId: string) => void
  loss?: number
  accuracy?: number
  vizTitle?: string
  children?: React.ReactNode
}

export const SimulatorView: React.FC<SimulatorViewProps> = ({
  title,
  explanation,
  keyPoints,
  controls,
  onSliderChange,
  onAction,
  loss,
  accuracy,
  vizTitle = 'Visualization',
  children,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left panel: 40% */}
      <div className="lg:col-span-1">
        <LessonCard
          title={title}
          explanation={explanation}
          keyPoints={keyPoints}
        >
          <ControlPanel
            controls={controls}
            onSliderChange={onSliderChange}
            onAction={onAction}
          />
        </LessonCard>
      </div>

      {/* Right panel: 60% */}
      <div className="lg:col-span-2">
        <Visualization title={vizTitle} loss={loss} accuracy={accuracy}>
          {children}
        </Visualization>
      </div>
    </div>
  )
}
