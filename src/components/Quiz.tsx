import React, { useState } from 'react'

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correct: number
  explanation: string
}

interface QuizProps {
  title?: string
  questions: QuizQuestion[]
  onComplete?: (score: number, total: number) => void
}

type AnswerState = 'unanswered' | 'wrong' | 'correct'

export const Quiz: React.FC<QuizProps> = ({ title, questions, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answerState, setAnswerState] = useState<AnswerState>('unanswered')
  const [wrongAttempts, setWrongAttempts] = useState<Set<number>>(new Set())
  const [score, setScore] = useState(0)
  const [completed, setCompleted] = useState(false)

  const q = questions[currentIndex]

  function handleSelect(idx: number) {
    // Don't allow re-selecting if correct or if already tried this option
    if (answerState === 'correct') return
    if (wrongAttempts.has(idx)) return
    setSelected(idx)
    setAnswerState('unanswered')
  }

  function handleSubmit() {
    if (selected === null || answerState === 'correct') return

    if (selected === q.correct) {
      setAnswerState('correct')
      // Only count as correct if first try
      if (wrongAttempts.size === 0) setScore(s => s + 1)
    } else {
      setAnswerState('wrong')
      setWrongAttempts(prev => new Set(prev).add(selected))
    }
  }

  function handleNext() {
    if (currentIndex + 1 >= questions.length) {
      setCompleted(true)
      onComplete?.(score + (wrongAttempts.size === 0 ? 0 : 0), questions.length)
      return
    }
    setCurrentIndex(i => i + 1)
    setSelected(null)
    setAnswerState('unanswered')
    setWrongAttempts(new Set())
  }

  function handleRestart() {
    setCurrentIndex(0)
    setSelected(null)
    setAnswerState('unanswered')
    setWrongAttempts(new Set())
    setScore(0)
    setCompleted(false)
  }

  function getOptionStyle(idx: number) {
    const isSelected = selected === idx
    const isWrong = wrongAttempts.has(idx)
    const isCorrect = answerState === 'correct' && idx === q.correct

    if (isCorrect) {
      return 'border-emerald-400 bg-emerald-50 text-emerald-800'
    }
    if (isWrong) {
      return 'border-red-300 bg-red-50 text-red-700 opacity-60 cursor-not-allowed'
    }
    if (isSelected && answerState === 'wrong') {
      return 'border-red-400 bg-red-50 text-red-800 animate-shake'
    }
    if (isSelected) {
      return 'border-blue-400 bg-blue-50 text-blue-800'
    }
    if (wrongAttempts.has(idx)) {
      return 'border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed opacity-50'
    }
    return 'border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50 cursor-pointer'
  }

  function getOptionIcon(idx: number) {
    if (answerState === 'correct' && idx === q.correct) return '✓'
    if (wrongAttempts.has(idx)) return '✗'
    if (selected === idx && answerState === 'wrong') return '✗'
    return String.fromCharCode(65 + idx) // A, B, C, D
  }

  function getOptionIconStyle(idx: number) {
    if (answerState === 'correct' && idx === q.correct) return 'bg-emerald-500 text-white'
    if (wrongAttempts.has(idx) || (selected === idx && answerState === 'wrong')) return 'bg-red-400 text-white'
    if (selected === idx) return 'bg-blue-500 text-white'
    return 'bg-slate-100 text-slate-500'
  }

  // ── Completed Screen ──
  if (completed) {
    const pct = Math.round((score / questions.length) * 100)
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center">
        <div className="text-6xl mb-4">{pct === 100 ? '🏆' : pct >= 70 ? '🎉' : '📚'}</div>
        <h3 className="text-2xl font-bold text-slate-800 mb-2">Quiz Complete!</h3>
        <p className="text-slate-500 mb-6">You got {score} out of {questions.length} on first try</p>
        <div className="relative h-3 bg-slate-100 rounded-full mb-6 overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 rounded-full transition-all duration-1000"
            style={{
              width: `${pct}%`,
              background: pct === 100 ? '#10b981' : pct >= 70 ? '#3b82f6' : '#f59e0b',
            }}
          />
        </div>
        <p className="text-slate-600 text-sm mb-6">
          {pct === 100
            ? 'Perfect score! You really understand this concept.'
            : pct >= 70
            ? 'Great work! Review the ones you missed and try again.'
            : 'Keep practising! Re-read the explanations and retake.'}
        </p>
        <button
          onClick={handleRestart}
          className="px-6 py-3 rounded-full bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition-colors"
        >
          Retake Quiz
        </button>
      </div>
    )
  }

  // ── Question Screen ──
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-5 pb-4 border-b border-slate-100">
        {title && <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">{title}</p>}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-500">
            Question {currentIndex + 1} of {questions.length}
          </span>
          <span className="text-sm font-bold text-slate-700">
            Score: {score}/{questions.length}
          </span>
        </div>
        {/* Progress bar */}
        <div className="mt-3 h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="px-6 pt-5 pb-2">
        <h3 className="text-base font-bold text-slate-800 leading-snug mb-1">{q.question}</h3>
        {wrongAttempts.size > 0 && answerState !== 'correct' && (
          <p className="text-xs text-amber-600 font-medium mt-1">
            ❗ Try again — {wrongAttempts.size} wrong attempt{wrongAttempts.size > 1 ? 's' : ''} so far
          </p>
        )}
      </div>

      {/* Options */}
      <div className="px-6 pb-4 space-y-2.5">
        {q.options.map((opt, idx) => {
          const isDisabled = wrongAttempts.has(idx) || answerState === 'correct'
          return (
            <button
              key={idx}
              onClick={() => !isDisabled && handleSelect(idx)}
              disabled={isDisabled && !(answerState === 'correct' && idx === q.correct)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all duration-150 text-left ${getOptionStyle(idx)}`}
            >
              <span className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center flex-shrink-0 transition-colors ${getOptionIconStyle(idx)}`}>
                {getOptionIcon(idx)}
              </span>
              <span className="text-sm font-medium leading-snug">{opt}</span>
            </button>
          )
        })}
      </div>

      {/* Explanation — shown after correct */}
      {answerState === 'correct' && (
        <div className="mx-6 mb-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
          <div className="flex items-start gap-2">
            <span className="text-emerald-500 text-lg leading-none">💡</span>
            <div>
              <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">Explanation</p>
              <p className="text-sm text-emerald-800 leading-relaxed">{q.explanation}</p>
            </div>
          </div>
        </div>
      )}

      {/* Wrong shake feedback */}
      {answerState === 'wrong' && (
        <div className="mx-6 mb-4 p-3 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-sm text-red-700 font-medium">
            ❌ Not quite — try another option!
          </p>
        </div>
      )}

      {/* Footer */}
      <div className="px-6 pb-5 flex justify-end gap-3">
        {answerState !== 'correct' && (
          <button
            onClick={handleSubmit}
            disabled={selected === null}
            className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
              selected === null
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
            }`}
          >
            Submit Answer
          </button>
        )}
        {answerState === 'correct' && (
          <button
            onClick={handleNext}
            className="px-5 py-2.5 rounded-full text-sm font-bold bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm transition-all"
          >
            {currentIndex + 1 >= questions.length ? 'See Results 🏆' : 'Next Question →'}
          </button>
        )}
      </div>
    </div>
  )
}
