import React, { useState } from 'react'
import { Card } from './Card'
import { Button } from './Button'

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correct: number
  explanation: string
}

interface QuizProps {
  questions: QuizQuestion[]
  onComplete?: (score: number) => void
}

export const Quiz: React.FC<QuizProps> = ({ questions, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [completed, setCompleted] = useState(false)

  const currentQuestion = questions[currentIndex]

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return

    if (selectedAnswer === currentQuestion.correct) {
      setScore(score + 1)
    }

    setShowExplanation(true)
  }

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      setCompleted(true)
      onComplete?.(score + (selectedAnswer === currentQuestion.correct ? 1 : 0))
    }
  }

  const finalScore =
    score + (selectedAnswer === currentQuestion.correct && showExplanation ? 1 : 0)

  if (completed) {
    return (
      <Card className="text-center">
        <h2 className="text-2xl font-bold text-primary-900 mb-4">Quiz Complete!</h2>
        <div className="mb-6">
          <p className="text-6xl font-bold text-primary-500 mb-2">{finalScore}/{questions.length}</p>
          <p className="text-lg text-gray-700">
            {((finalScore / questions.length) * 100).toFixed(0)}%
          </p>
        </div>
        <p className="text-gray-600 mb-6">
          {finalScore === questions.length
            ? '🎉 Perfect score! You understand this concept well.'
            : '✓ Good effort! Review the concepts and try again.'}
        </p>
        <Button
          variant="primary"
          onClick={() => {
            setCurrentIndex(0)
            setSelectedAnswer(null)
            setShowExplanation(false)
            setScore(0)
            setCompleted(false)
          }}
        >
          Retake Quiz
        </Button>
      </Card>
    )
  }

  return (
    <Card>
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Question {currentIndex + 1} of {questions.length}
        </p>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div
            className="bg-primary-500 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${((currentIndex + 1) / questions.length) * 100}%`,
            }}
          />
        </div>
      </div>

      <h3 className="text-lg font-bold text-gray-900 mb-4">
        {currentQuestion.question}
      </h3>

      <div className="space-y-3 mb-6">
        {currentQuestion.options.map((option, idx) => {
          const isCorrect = idx === currentQuestion.correct
          const isSelected = selectedAnswer === idx
          const isWrong = isSelected && !isCorrect && showExplanation

          let bgColor = 'bg-white border-gray-300'
          if (showExplanation) {
            if (isCorrect) bgColor = 'bg-success-50 border-success-500'
            if (isWrong) bgColor = 'bg-danger-50 border-danger-500'
            if (isSelected && isCorrect) bgColor = 'bg-success-50 border-success-500'
          } else if (isSelected) {
            bgColor = 'bg-primary-50 border-primary-500'
          }

          return (
            <button
              key={idx}
              onClick={() => !showExplanation && setSelectedAnswer(idx)}
              disabled={showExplanation}
              className={`w-full p-4 text-left border-2 rounded-lg transition ${
                showExplanation ? 'cursor-not-allowed' : 'cursor-pointer hover:border-primary-400'
              } ${bgColor}`}
            >
              <div className="flex items-center">
                <div
                  className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                    isSelected
                      ? 'border-primary-500 bg-primary-500'
                      : 'border-gray-300'
                  }`}
                >
                  {isSelected && <span className="text-white font-bold">✓</span>}
                </div>
                <span className="font-medium text-gray-900">{option}</span>
              </div>
            </button>
          )
        })}
      </div>

      {showExplanation && (
        <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
          <p className="text-sm font-semibold text-blue-900 mb-2">Explanation:</p>
          <p className="text-sm text-blue-800">{currentQuestion.explanation}</p>
        </div>
      )}

      <div className="flex gap-4">
        {!showExplanation ? (
          <Button
            variant="primary"
            onClick={handleSubmitAnswer}
            disabled={selectedAnswer === null}
            className="flex-1"
          >
            Submit Answer
          </Button>
        ) : (
          <Button variant="secondary" onClick={handleNext} className="flex-1">
            {currentIndex + 1 === questions.length ? 'See Results' : 'Next Question'}
          </Button>
        )}
      </div>
    </Card>
  )
}
