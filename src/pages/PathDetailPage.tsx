import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Navbar, Footer, BackButton } from '@/components'
import { getPathById } from '@/data/learningPaths'
import { models } from '@/data/models'

export const PathDetailPage: React.FC = () => {
  const { pathId } = useParams<{ pathId: string }>()
  const navigate = useNavigate()
  const path = getPathById(pathId as any)

  // Track checked steps in local state, saving to localStorage
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({})

  useEffect(() => {
    if (path) {
      const stored = localStorage.getItem(`path-progress-${path.id}`)
      if (stored) {
        setCompletedSteps(JSON.parse(stored))
      }
    }
  }, [path])

  if (!path) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800">Learning Path not found</h2>
          <Link to="/learning-paths" className="text-blue-600 hover:underline mt-4 inline-block">Back to Paths</Link>
        </div>
      </div>
    )
  }

  const toggleStep = (topicId: string, e: React.MouseEvent) => {
    e.stopPropagation() // prevent navigating
    const updated = {
      ...completedSteps,
      [topicId]: !completedSteps[topicId]
    }
    setCompletedSteps(updated)
    localStorage.setItem(`path-progress-${path.id}`, JSON.stringify(updated))
  }

  const completedCount = path.topics.filter(t => completedSteps[t.topicId]).length
  const progressPercent = Math.round((completedCount / path.topics.length) * 100)

  return (
    <div className="min-h-screen bg-[#fafbfc] font-sans flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-6 sm:px-8">
          <BackButton />

          {/* Header Card */}
          <div className={`mt-6 bg-gradient-to-r ${path.gradient} text-white rounded-3xl p-8 shadow-sm relative overflow-hidden mb-12`}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full pointer-events-none filter blur-2xl" />
            <div className="relative z-10 space-y-4">
              <div className="flex items-center space-x-3">
                <span className="text-4xl bg-white/20 p-2 rounded-2xl">{path.icon}</span>
                <span className="text-[10px] font-black bg-white/20 text-white px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Path Roadmap
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                {path.title}
              </h1>
              <p className="text-indigo-100 font-medium text-base md:text-lg max-w-3xl leading-relaxed">
                {path.goal}
              </p>

              {/* Progress Tracker */}
              <div className="pt-4 max-w-md">
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2">
                  <span>Path Completion</span>
                  <span>{completedCount} / {path.topics.length} Completed ({progressPercent}%)</span>
                </div>
                <div className="w-full h-2.5 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className="bg-white h-full rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Roadmap list */}
            <div className="lg:col-span-7 space-y-8">
              <h2 className="text-xl font-bold text-slate-800">Your Learning Steps</h2>

              <div className="relative pl-6 border-l-2 border-slate-200 space-y-8">
                {path.topics.map((step, idx) => {
                  const topicData = models.find(m => m.id === step.topicId)
                  const isChecked = !!completedSteps[step.topicId]
                  const difficulty = topicData?.difficulty || 'Beginner'
                  const isSimulator = topicData?.isSimulator

                  return (
                    <div 
                      key={step.topicId}
                      onClick={() => navigate(step.route)}
                      className="relative group bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm hover:border-indigo-300 hover:shadow-md cursor-pointer transition-all duration-300 flex items-start gap-4"
                    >
                      {/* Step Number Badge */}
                      <span className="absolute -left-[2.1rem] top-5 flex items-center justify-center w-8 h-8 rounded-full border-2 border-slate-200 bg-white text-xs font-black text-slate-500 group-hover:border-indigo-400 group-hover:text-indigo-500 transition-colors">
                        {idx + 1}
                      </span>

                      {/* Checkbox */}
                      <div 
                        onClick={(e) => toggleStep(step.topicId, e)}
                        className={`mt-1 flex items-center justify-center w-5 h-5 rounded-md border-2 transition-all cursor-pointer ${
                          isChecked 
                            ? 'bg-indigo-500 border-indigo-500 text-white' 
                            : 'border-slate-300 group-hover:border-indigo-400'
                        }`}
                      >
                        {isChecked && (
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>

                      {/* Content */}
                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                            {step.title}
                          </h3>
                          {isSimulator && (
                            <span className="text-[8px] font-black bg-emerald-50 text-emerald-600 border border-emerald-100 px-1.5 py-0.5 rounded uppercase tracking-wider">
                              Interactive
                            </span>
                          )}
                        </div>
                        {topicData && (
                          <p className="text-xs text-slate-500 font-medium leading-relaxed">
                            {topicData.description}
                          </p>
                        )}

                        <div className="flex items-center space-x-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider pt-1">
                          <span>{difficulty}</span>
                          <span>•</span>
                          <span>{topicData?.estimatedTime || '10 mins'}</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Mini project section */}
            <div className="lg:col-span-5 space-y-6">
              <h2 className="text-xl font-bold text-slate-800">Final Milestone Project</h2>

              <div className="bg-indigo-50/40 border border-indigo-100 p-6 rounded-3xl shadow-sm space-y-4">
                <div className="flex items-center space-x-2">
                  <span className="text-3xl">🎓</span>
                  <div>
                    <h3 className="font-extrabold text-slate-800">{path.miniProject.title}</h3>
                    <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest block">
                      Hands-on Deliverable
                    </span>
                  </div>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  {path.miniProject.description}
                </p>

                <div className="bg-white p-4 rounded-2xl border border-indigo-100/50 space-y-1.5">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                    What you will produce:
                  </span>
                  <p className="text-xs text-slate-700 font-semibold leading-relaxed">
                    {path.miniProject.deliverable}
                  </p>
                </div>

                <div className="text-[10px] text-slate-400 font-semibold italic text-center pt-2">
                  Complete all steps above to unlock final instructions!
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}
