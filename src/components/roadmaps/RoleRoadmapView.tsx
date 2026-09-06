import React, { useState, useEffect, useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Roadmap } from '@/data/roadmaps'

interface RoleRoadmapViewProps {
  roadmap: Roadmap
}

export const RoleRoadmapView: React.FC<RoleRoadmapViewProps> = ({ roadmap }) => {
  const stages = roadmap.stages || []
  const storageKey = `vizlearn-roadmap-${roadmap.id}-progress`

  const [checkedSkills, setCheckedSkills] = useState<Record<string, boolean>>({})
  const [isResetArmed, setIsResetArmed] = useState(false)
  const resetTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Load progress
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey)
      if (stored) {
        setCheckedSkills(JSON.parse(stored))
      } else {
        setCheckedSkills({})
      }
    } catch (e) {
      console.error('Failed to load roadmap progress', e)
    }
  }, [roadmap.id, storageKey])

  // Toggle skill
  const toggleSkill = (skillId: string) => {
    setCheckedSkills((prev) => {
      const next = { ...prev }
      if (next[skillId]) {
        delete next[skillId]
      } else {
        next[skillId] = true
      }
      try {
        localStorage.setItem(storageKey, JSON.stringify(next))
      } catch (e) {
        console.error('Failed to save roadmap progress', e)
      }
      return next
    })
  }

  // Handle reset
  const handleReset = () => {
    if (!isResetArmed) {
      setIsResetArmed(true)
      resetTimerRef.current = setTimeout(() => setIsResetArmed(false), 4000)
      return
    }

    if (resetTimerRef.current) clearTimeout(resetTimerRef.current)
    setIsResetArmed(false)
    setCheckedSkills({})
    try {
      localStorage.removeItem(storageKey)
    } catch (e) {
      console.error('Failed to clear progress', e)
    }
  }

  // Total skills in this role roadmap
  const allSkills = useMemo(() => {
    return stages.flatMap((s) => s.skills)
  }, [stages])

  const totalCount = allSkills.length
  const completedCount = allSkills.filter((s) => checkedSkills[s.id]).length
  const progressPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  return (
    <div className="space-y-10">
      {/* Sticky Progress Header */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center font-black text-sm">
              {progressPct}%
            </div>
            <div>
              <div className="text-sm font-bold text-slate-800">
                <span className="font-extrabold text-indigo-600">{completedCount}</span> of {totalCount} Competencies Completed
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {stages.length} Milestones across {roadmap.estimatedMonths}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto flex-1 max-w-md">
            <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
              <div
                className={`h-full bg-gradient-to-r ${roadmap.gradient} rounded-full transition-all duration-300`}
                style={{ width: `${progressPct}%` }}
              />
            </div>

            <button
              onClick={handleReset}
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

      {/* Overview Metadata Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200/80 p-5 rounded-2xl">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">
            Target Audience
          </span>
          <p className="text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed">
            {roadmap.targetAudience}
          </p>
        </div>

        <div className="bg-white border border-slate-200/80 p-5 rounded-2xl">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">
            Core Tech Stack
          </span>
          <div className="flex flex-wrap gap-1.5 mt-1">
            {roadmap.primaryStack.map((tech) => (
              <span
                key={tech}
                className="text-[11px] font-bold bg-slate-50 text-slate-700 border border-slate-200 px-2 py-0.5 rounded-md"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 p-5 rounded-2xl">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">
            Estimated Duration
          </span>
          <p className="text-sm font-bold text-slate-800">
            {roadmap.estimatedMonths}
          </p>
          <span className="text-[10px] text-slate-400 font-medium">Self-paced with hands-on practice</span>
        </div>
      </div>

      {/* Timeline of Stages */}
      <div className="space-y-8 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-slate-200/80 hidden sm:block" />

      <div className="space-y-8">
        {stages.map((stage) => {
          const stageTotal = stage.skills.length
          const stageDone = stage.skills.filter((s) => checkedSkills[s.id]).length
          const isStageComplete = stageDone === stageTotal && stageTotal > 0

          return (
            <div
              key={stage.id}
              className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 ${
                isStageComplete
                  ? 'bg-emerald-50/40 border-emerald-300 shadow-md shadow-emerald-50'
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                {/* Stage Header Info */}
                <div className="space-y-3 max-w-2xl">
                  <div className="flex items-center space-x-3">
                    <span
                      className={`text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider ${
                        isStageComplete
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                      }`}
                    >
                      Stage {stage.stageNumber} • {stage.duration}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-400">
                      {stageDone}/{stageTotal} Completed
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
                    {stage.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                    {stage.description}
                  </p>

                  {/* Key Milestone Box */}
                  <div className="p-4 bg-slate-50 border border-slate-200/70 rounded-2xl space-y-1 mt-2">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">
                      🎯 Milestone Project / Deliverable
                    </span>
                    <p className="text-xs font-semibold text-slate-700">
                      {stage.keyMilestone}
                    </p>
                  </div>

                  {/* Recommended Tools */}
                  <div className="pt-2 flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase mr-1">Tools:</span>
                    {stage.tools.map((tool) => (
                      <span
                        key={tool}
                        className="text-[11px] font-semibold bg-white border border-slate-200 text-slate-600 px-2.5 py-0.5 rounded-lg shadow-2xs"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stage Checklist */}
                <div className="lg:w-96 shrink-0 bg-slate-50/60 p-5 rounded-2xl border border-slate-200/80 space-y-3">
                  <span className="text-xs font-bold text-slate-700 block uppercase tracking-wider">
                    Core Competencies
                  </span>

                  <ul className="space-y-2">
                    {stage.skills.map((skill) => {
                      const isChecked = !!checkedSkills[skill.id]

                      return (
                        <li key={skill.id} className="group">
                          <label className="flex items-start gap-3 cursor-pointer p-1.5 -mx-1.5 rounded-xl hover:bg-white transition-colors">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleSkill(skill.id)}
                              className="sr-only"
                            />
                            <div
                              className={`w-4 h-4 mt-0.5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                                isChecked
                                  ? 'bg-indigo-600 border-indigo-600 text-white'
                                  : 'border-slate-300 group-hover:border-indigo-400 bg-white'
                              }`}
                            >
                              {isChecked && (
                                <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 20 20">
                                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                                </svg>
                              )}
                            </div>

                            <div className="flex-1 text-xs leading-relaxed">
                              <span
                                className={
                                  isChecked
                                    ? 'line-through text-slate-400 font-normal'
                                    : 'text-slate-700 font-medium'
                                }
                              >
                                {skill.text}
                              </span>

                              {skill.simulatorRoute && (
                                <Link
                                  to={skill.simulatorRoute}
                                  onClick={(e) => e.stopPropagation()}
                                  className="inline-flex items-center space-x-1 ml-2 text-[10px] font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 border border-indigo-100 hover:border-indigo-200 px-2 py-0.5 rounded-md transition-colors"
                                >
                                  <span>{skill.simulatorLabel || 'Sim'}</span>
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
            </div>
          )
        })}
      </div>
    </div>
  )
}
