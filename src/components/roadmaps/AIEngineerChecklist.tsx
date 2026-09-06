import React, { useState, useEffect, useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import { SkillCategory, AuthorCitation } from '@/data/roadmaps'
import { MarinaWyssCitation } from './MarinaWyssCitation'

interface AIEngineerChecklistProps {
  categories: SkillCategory[]
  citation?: AuthorCitation
  storageKey?: string
}

export const AIEngineerChecklist: React.FC<AIEngineerChecklistProps> = ({
  categories,
  citation,
  storageKey,
}) => {
  const activeStorageKey = storageKey || 'vizlearn-ai-eng-checklist-v1'
  const [checkedState, setCheckedState] = useState<Record<string, boolean>>({})
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [isResetArmed, setIsResetArmed] = useState(false)
  const resetTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Load from localStorage on mount or key change
  useEffect(() => {
    try {
      const stored = localStorage.getItem(activeStorageKey)
      if (stored) {
        setCheckedState(JSON.parse(stored))
      } else {
        setCheckedState({})
      }
    } catch (e) {
      console.error('Failed to load checklist progress from localStorage', e)
    }
  }, [activeStorageKey])

  // Toggle single item
  const handleToggle = (id: string) => {
    setCheckedState((prev) => {
      const next = { ...prev }
      if (next[id]) {
        delete next[id]
      } else {
        next[id] = true
      }
      try {
        localStorage.setItem(activeStorageKey, JSON.stringify(next))
      } catch (e) {
        console.error('Failed to save checklist progress to localStorage', e)
      }
      return next
    })
  }

  // Handle armed reset
  const handleResetClick = () => {
    if (!isResetArmed) {
      setIsResetArmed(true)
      resetTimerRef.current = setTimeout(() => {
        setIsResetArmed(false)
      }, 4000)
      return
    }

    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current)
    }
    setIsResetArmed(false)
    setCheckedState({})
    try {
      localStorage.removeItem(activeStorageKey)
    } catch (e) {
      console.error('Failed to clear checklist from localStorage', e)
    }
  }

  // Total items count across categories
  const totalItemsCount = useMemo(() => {
    return categories.reduce((sum, cat) => sum + cat.items.length, 0)
  }, [categories])

  // Completed items count
  const completedCount = useMemo(() => {
    let count = 0
    categories.forEach((cat) => {
      cat.items.forEach((item) => {
        if (checkedState[item.id]) count++
      })
    })
    return count
  }, [categories, checkedState])

  const progressPct = totalItemsCount > 0 ? Math.round((completedCount / totalItemsCount) * 100) : 0

  // Filtered categories and items
  const filteredCategories = useMemo(() => {
    return categories
      .filter((cat) => selectedCategory === 'all' || cat.id === selectedCategory)
      .map((cat) => {
        const matchingItems = cat.items.filter((item) =>
          item.text.toLowerCase().includes(searchQuery.toLowerCase().trim())
        )
        return {
          ...cat,
          items: matchingItems,
        }
      })
      .filter((cat) => cat.items.length > 0)
  }, [categories, selectedCategory, searchQuery])

  return (
    <div className="space-y-8">
      {/* Sticky Progress Header */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Counts */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-sm">
              {progressPct}%
            </div>
            <div>
              <div className="text-sm font-bold text-slate-800">
                <span className="text-blue-600 font-extrabold">{completedCount}</span> of {totalItemsCount} Skills Mastered
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {progressPct === 100
                  ? '🎉 Outstanding! You have completed the entire checklist.'
                  : progressPct > 50
                  ? '🚀 Fantastic momentum! Over halfway there.'
                  : 'Track your skills as you build and study.'}
              </p>
            </div>
          </div>

          {/* Progress bar + Reset Button */}
          <div className="flex items-center gap-4 w-full sm:w-auto flex-1 max-w-md">
            <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
              <div
                className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-500 rounded-full transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>

            <button
              onClick={handleResetClick}
              type="button"
              className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors shrink-0 ${
                isResetArmed
                  ? 'bg-rose-500 text-white hover:bg-rose-600 shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800'
              }`}
            >
              {isResetArmed ? 'Clear all?' : 'Reset'}
            </button>
          </div>
        </div>
      </div>

      {/* Search & Domain Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <svg
            className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search skills (e.g. transformer, rag, docker, eval)..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
            >
              ✕
            </button>
          )}
        </div>

        {/* Category Pill selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            All Categories ({categories.length})
          </button>
          {categories.slice(0, 5).map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat.name}
            </button>
          ))}
          {categories.length > 5 && selectedCategory !== 'all' && !categories.slice(0, 5).some((c) => c.id === selectedCategory) && (
            <button
              className="px-3 py-1.5 text-xs font-bold rounded-lg bg-blue-600 text-white shadow-sm whitespace-nowrap"
            >
              {categories.find((c) => c.id === selectedCategory)?.name}
            </button>
          )}
        </div>
      </div>

      {/* Grid of Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => {
          const catTotal = category.items.length
          const catDone = category.items.filter((item) => checkedState[item.id]).length
          const isComplete = catDone === catTotal && catTotal > 0

          return (
            <div
              key={category.id}
              className={`p-6 rounded-3xl border transition-all duration-300 flex flex-col justify-between ${
                isComplete
                  ? 'bg-emerald-50/40 border-emerald-300 shadow-md shadow-emerald-50'
                  : 'bg-white border-slate-200/90 hover:border-blue-300 hover:shadow-md'
              }`}
            >
              <div>
                {/* Category Header Badge */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                      isComplete
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {category.name}
                  </span>
                  <span
                    className={`text-xs font-extrabold font-mono ${
                      isComplete ? 'text-emerald-700' : 'text-slate-400'
                    }`}
                  >
                    {catDone}/{catTotal}
                  </span>
                </div>

                {/* Skills List */}
                <ul className="space-y-2">
                  {category.items.map((item) => {
                    const isChecked = !!checkedState[item.id]

                    return (
                      <li key={item.id} className="group">
                        <label className="flex items-start gap-3 cursor-pointer p-1.5 -mx-1.5 rounded-xl hover:bg-slate-50 transition-colors">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleToggle(item.id)}
                            className="sr-only"
                          />
                          {/* Custom circular checkbox */}
                          <div
                            className={`w-4 h-4 mt-0.5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                              isChecked
                                ? 'bg-blue-600 border-blue-600 text-white'
                                : 'border-slate-300 group-hover:border-blue-400 bg-white'
                            }`}
                          >
                            {isChecked && (
                              <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 20 20">
                                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                              </svg>
                            )}
                          </div>

                          {/* Skill Text */}
                          <div className="flex-1 text-xs sm:text-sm leading-relaxed">
                            <span
                              className={`transition-colors ${
                                isChecked
                                  ? 'line-through text-slate-400 font-normal'
                                  : 'text-slate-700 font-medium'
                              }`}
                            >
                              {item.text}
                            </span>

                            {/* Optional Simulator Link */}
                            {item.simulatorRoute && (
                              <Link
                                to={item.simulatorRoute}
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center space-x-1 ml-2 text-[10px] font-bold text-blue-600 hover:text-blue-800 bg-blue-50 border border-blue-100 hover:border-blue-200 px-2 py-0.5 rounded-md transition-colors"
                              >
                                <span>{item.simulatorLabel || 'Sim'}</span>
                                <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                              </Link>
                            )}
                          </div>
                        </label>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          )
        })}
      </div>

      {filteredCategories.length === 0 && (
        <div className="text-center py-16 bg-white border border-slate-200 rounded-3xl p-8">
          <span className="text-3xl mb-2 block">🔍</span>
          <h4 className="text-base font-bold text-slate-800 mb-1">No skills match your search</h4>
          <p className="text-xs text-slate-500 mb-4">
            Try adjusting your search query or reset the category filter.
          </p>
          <button
            onClick={() => {
              setSearchQuery('')
              setSelectedCategory('all')
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Marina Wyss Citation directly below roadmap */}
      {citation && <MarinaWyssCitation citation={citation} />}
    </div>
  )
}

export const SkillsChecklist = AIEngineerChecklist
