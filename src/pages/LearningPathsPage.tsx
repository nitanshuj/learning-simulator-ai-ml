import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Navbar, Footer } from '@/components'
import { learningPaths } from '@/data/learningPaths'

export const LearningPathsPage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#fafbfc] font-sans flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-black bg-indigo-50 text-indigo-600 border border-indigo-100 uppercase tracking-wider animate-pulse">
              🚀 Guided Roadmaps
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight">
              Guided Learning Paths
            </h1>
            <p className="text-slate-500 font-medium text-lg leading-relaxed">
              Step-by-step tracks curated for different skill levels and domains. Learn the theories, run visual simulators, and build a portfolio mini-project at the end.
            </p>
          </div>

          {/* Paths Column/Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {learningPaths.map((path) => (
              <div
                key={path.id}
                onClick={() => navigate(`/learning-paths/${path.id}`)}
                className="group bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-xl hover:border-indigo-300 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between"
              >
                {/* Top Section with Gradient Header */}
                <div>
                  <div className={`bg-gradient-to-r ${path.gradient} p-6 text-white flex items-center justify-between`}>
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl bg-white/20 p-2 rounded-2xl backdrop-blur-sm">
                        {path.icon}
                      </span>
                      <div>
                        <h3 className="text-xl font-bold tracking-tight">{path.title}</h3>
                        <span className="text-[10px] font-black text-indigo-100 uppercase tracking-widest block mt-0.5">
                          Guided Path
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-bold bg-white/10 px-3 py-1 rounded-full border border-white/20">
                      {path.estimatedHours} Hours
                    </span>
                  </div>

                  <div className="p-6 space-y-6">
                    {/* Goal */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                        Our Target Goal
                      </span>
                      <p className="text-sm text-slate-600 font-semibold leading-relaxed">
                        {path.goal}
                      </p>
                    </div>

                    {/* Topics summary */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                        Syllabus Highlights ({path.topics.length} Topics)
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {path.topics.slice(0, 5).map((topic) => (
                          <span
                            key={topic.topicId}
                            className="text-xs bg-slate-50 text-slate-600 border border-slate-100 px-2 py-0.5 rounded-md font-medium"
                          >
                            {topic.title}
                          </span>
                        ))}
                        {path.topics.length > 5 && (
                          <span className="text-xs text-slate-400 font-bold px-2 py-0.5">
                            +{path.topics.length - 5} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Mini Project Preview */}
                    <div className="p-4 bg-indigo-50/30 border border-indigo-100/50 rounded-2xl space-y-2">
                      <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest block">
                        🎓 End-of-Path Mini-Project
                      </span>
                      <h4 className="text-xs font-bold text-slate-800">{path.miniProject.title}</h4>
                      <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                        {path.miniProject.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer bar */}
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-400 uppercase tracking-wider">
                    Required Prereq: {path.prerequisiteLevel}
                  </span>
                  <span className="font-bold text-indigo-600 flex items-center group-hover:translate-x-1 transition-transform">
                    <span>Start Path</span>
                    <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}
