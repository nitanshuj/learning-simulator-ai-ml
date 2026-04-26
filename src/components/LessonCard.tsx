import React from 'react'
import { Card } from './Card'

interface LessonCardProps {
  title: string
  explanation: string
  keyPoints: string[]
  children?: React.ReactNode
}

export const LessonCard: React.FC<LessonCardProps> = ({
  title,
  explanation,
  keyPoints,
  children,
}) => {
  return (
    <Card className="h-full flex flex-col">
      <h2 className="text-2xl font-bold text-primary-900 mb-4">{title}</h2>

      <div className="mb-6 flex-1">
        <p className="text-gray-700 leading-relaxed mb-4">{explanation}</p>

        <div className="bg-primary-50 border-l-4 border-primary-500 p-4 rounded">
          <h3 className="font-bold text-sm text-primary-900 mb-2">
            Key Points:
          </h3>
          <ul className="space-y-1">
            {keyPoints.map((point, idx) => (
              <li key={idx} className="text-sm text-gray-700">
                • {point}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {children && <div className="mt-4 border-t pt-4">{children}</div>}
    </Card>
  )
}
