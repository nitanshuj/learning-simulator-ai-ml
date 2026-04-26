import React, { useState } from 'react'
import {
  SimulatorView,
  Button,
  PresetButtons,
  Quiz,
} from '../components'
import { useSimulator } from '../hooks'
import type { ControlItem, PresetOption, QuizQuestion } from '../components'

/**
 * Example simulator page demonstrating component usage and state management
 */
export const DemoSimulatorPage: React.FC = () => {
  const simulator = useSimulator()
  const [showQuiz, setShowQuiz] = useState(false)

  // Example controls for a linear regression simulator
  const controls: ControlItem[] = [
    {
      id: 'slope',
      label: 'Slope (m)',
      type: 'slider',
      value: simulator.state.params['slope'] || 1,
      min: -5,
      max: 5,
      step: 0.1,
      unit: '',
      description: 'Adjust the slope of the line',
    },
    {
      id: 'intercept',
      label: 'Intercept (b)',
      type: 'slider',
      value: simulator.state.params['intercept'] || 0,
      min: -10,
      max: 10,
      step: 0.1,
      unit: '',
      description: 'Adjust the y-intercept of the line',
    },
    {
      id: 'run',
      label: '▶ Run Simulation',
      type: 'button',
      description: 'Run the simulator with current parameters',
    },
  ]

  const presets: PresetOption[] = [
    {
      id: 'good-fit',
      name: 'Good Fit',
      description: 'Line fits the data well, low loss',
    },
    {
      id: 'poor-fit',
      name: 'Poor Fit',
      description: 'Line does not fit the data well, high loss',
    },
    {
      id: 'overfit',
      name: 'Overfitting',
      description: 'Line overfits to training data',
    },
  ]

  const quizQuestions: QuizQuestion[] = [
    {
      id: 'q1',
      question: 'What does the slope parameter control?',
      options: [
        'The steepness of the line',
        'The color of the line',
        'The speed of computation',
        'The amount of data',
      ],
      correct: 0,
      explanation:
        'The slope parameter controls the steepness of the line. In y = mx + b, m is the slope.',
    },
    {
      id: 'q2',
      question: 'What is the intercept in the equation y = mx + b?',
      options: [
        'The slope of the line',
        'Where the line crosses the y-axis',
        'The loss value',
        'The number of iterations',
      ],
      correct: 1,
      explanation:
        'The intercept (b) is where the line crosses the y-axis. It represents the value of y when x = 0.',
    },
  ]

  const handleSliderChange = (id: string, value: number) => {
    simulator.setParam(id, value)
  }

  const handleAction = (actionId: string) => {
    if (actionId === 'run') {
      simulator.run()
    }
  }

  const handlePresetSelect = (presetId: string) => {
    // Load preset logic
    const presetMap: Record<string, Record<string, number>> = {
      'good-fit': { slope: 2, intercept: 1 },
      'poor-fit': { slope: 0.5, intercept: 5 },
      overfit: { slope: 3.5, intercept: -2 },
    }
    simulator.loadPreset({
      id: presetId,
      name: presetId,
      description: '',
      lessonId: 'linear-regression',
      params: presetMap[presetId] || {},
      expectedBehavior: '',
      tags: [],
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 py-8">
      <div className="container mx-auto px-4">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-primary-900 mb-2">
            Linear Regression Simulator
          </h1>
          <p className="text-gray-700">
            Interactive demonstration of how linear regression fits data
          </p>
        </header>

        {!showQuiz ? (
          <>
            <SimulatorView
              title="Linear Regression"
              explanation="Adjust the slope and intercept to fit a line through the data points. The loss value shows how well the line fits the data—lower loss is better!"
              keyPoints={[
                'y = mx + b is the equation of a line',
                'm (slope) controls the steepness',
                'b (intercept) is where the line crosses the y-axis',
                'Loss measures how well the line fits the data',
              ]}
              controls={controls}
              onSliderChange={handleSliderChange}
              onAction={handleAction}
              loss={0.234}
              accuracy={0.85}
              vizTitle="Data and Fitted Line"
            />

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
                  <PresetButtons
                    presets={presets}
                    onSelect={handlePresetSelect}
                  />

                  <hr className="my-4" />

                  <div className="space-y-2">
                    <Button
                      variant="secondary"
                      onClick={() => simulator.reset()}
                      className="w-full"
                    >
                      Reset All
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => simulator.undo()}
                      className="w-full"
                    >
                      Undo
                    </Button>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Current Parameters
                  </h3>
                  <div className="bg-gray-50 p-4 rounded font-mono text-sm space-y-2">
                    {Object.entries(simulator.state.params).length > 0 ? (
                      Object.entries(simulator.state.params).map(
                        ([key, value]) => (
                          <div key={key}>
                            <span className="text-primary-600 font-bold">
                              {key}:
                            </span>{' '}
                            <span className="text-gray-700">
                              {typeof value === 'number' ? value.toFixed(3) : String(value)}
                            </span>
                          </div>
                        ),
                      )
                    ) : (
                      <div className="text-gray-500">No parameters set yet</div>
                    )}
                  </div>

                  <div className="mt-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                      Simulation Results
                    </h3>
                    <div className="space-y-2">
                      <div>
                        <span className="font-semibold text-gray-700">Loss:</span>{' '}
                        <span className="text-primary-600">
                          {simulator.state.results.loss.toFixed(4)}
                        </span>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">
                          Predictions:
                        </span>{' '}
                        <span className="text-gray-600">
                          {simulator.state.results.predictions.length} values
                        </span>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">Status:</span>{' '}
                        <span
                          className={
                            simulator.state.isRunning
                              ? 'text-warning-600'
                              : 'text-success-600'
                          }
                        >
                          {simulator.state.isRunning ? 'Running...' : 'Ready'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Button
                variant="primary"
                size="lg"
                onClick={() => setShowQuiz(true)}
                className="w-full lg:w-auto"
              >
                Take the Quiz →
              </Button>
            </div>
          </>
        ) : (
          <div className="max-w-2xl mx-auto">
            <div className="mb-4">
              <Button
                variant="outline"
                onClick={() => setShowQuiz(false)}
              >
                ← Back to Simulator
              </Button>
            </div>
            <Quiz questions={quizQuestions} onComplete={() => setShowQuiz(false)} />
          </div>
        )}
      </div>
    </div>
  )
}

export default DemoSimulatorPage
