import React from 'react'
import { Card } from './Card'

interface VisualizationProps {
  title: string
  loss?: number
  accuracy?: number
  children?: React.ReactNode
  className?: string
}

export const Visualization: React.FC<VisualizationProps> = ({
  title,
  loss,
  accuracy,
  children,
  className = '',
}) => {
  return (
    <Card className={`flex flex-col h-full ${className}`}>
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-900 mb-3">{title}</h3>

        <div className="grid grid-cols-2 gap-4 mb-4">
          {loss !== undefined && (
            <div className="bg-danger-50 p-4 rounded-lg border border-danger-200">
              <p className="text-xs text-gray-600 font-semibold mb-1">Loss</p>
              <p className="text-2xl font-bold text-danger-600">
                {loss.toFixed(4)}
              </p>
            </div>
          )}

          {accuracy !== undefined && (
            <div className="bg-success-50 p-4 rounded-lg border border-success-200">
              <p className="text-xs text-gray-600 font-semibold mb-1">
                Accuracy
              </p>
              <p className="text-2xl font-bold text-success-600">
                {(accuracy * 100).toFixed(2)}%
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center min-h-96">
        {children || (
          <div className="text-center text-gray-400">
            <p className="text-lg font-semibold mb-2">📊 Visualization Placeholder</p>
            <p className="text-sm">
              Interactive plot will render here during simulation
            </p>
          </div>
        )}
      </div>
    </Card>
  )
}
