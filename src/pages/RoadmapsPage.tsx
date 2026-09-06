import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Navbar, Footer } from '@/components'
import { roadmaps } from '@/data/roadmaps'

export const RoadmapsPage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#fafbfc] font-sans flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Header Section */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-black bg-blue-50 text-blue-600 border border-blue-100 uppercase tracking-wider">
              🗺️ Industry Role Roadmaps
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-800 tracking-tight">
              AI & Machine Learning{' '}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-500 bg-clip-text text-transparent">
                Career Roadmaps
              </span>
            </h1>
            <p className="text-slate-500 font-medium text-base sm:text-lg leading-relaxed">
              Step-by-step career blueprints and technical skill checklists for today's most in-demand AI engineering and data science roles. Select a role below to view its complete roadmap.
            </p>
          </div>

          {/* 2x2 Roles Cards Grid with Sharp Rectangular Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {roadmaps.map((r) => {
              const skillsCount = r.categories
                ? r.categories.reduce((acc, c) => acc + c.items.length, 0)
                : (r.stages || []).reduce((acc, s) => acc + s.skills.length, 0)

              const stagesCount = r.categories ? r.categories.length : (r.stages ? r.stages.length : 0)

              return (
                <div
                  key={r.id}
                  onClick={() => navigate(`/roadmaps/${r.id}`)}
                  className="group bg-white border-2 border-slate-200 hover:border-slate-900 rounded-none p-8 shadow-xs hover:shadow-xl transition-all duration-200 cursor-pointer flex flex-col justify-between relative overflow-hidden"
                >
                  {/* Subtle top accent line */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${r.gradient}`} />

                  <div className="space-y-6">
                    {/* Header: Icon, Badge & Duration */}
                    <div className="flex items-start justify-between">
                      <div className="w-14 h-14 bg-slate-50 border border-slate-200 rounded-none flex items-center justify-center text-3xl group-hover:scale-105 transition-transform duration-200">
                        {r.icon}
                      </div>
                      <div className="flex flex-col items-end space-y-1.5">
                        <span className="text-[10px] font-black uppercase tracking-wider bg-slate-900 text-white px-2.5 py-1 rounded-none">
                          {r.badge}
                        </span>
                        <span className="text-xs font-semibold text-slate-500">
                          ⏱️ {r.estimatedMonths}
                        </span>
                      </div>
                    </div>

                    {/* Title & Subtitle */}
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight">
                        {r.title}
                      </h2>
                      <p className="text-xs font-bold text-indigo-600 uppercase tracking-wide mt-1">
                        {r.subtitle}
                      </p>
                      <p className="text-sm text-slate-600 leading-relaxed font-medium mt-3">
                        {r.description}
                      </p>
                    </div>

                    {/* Metrics / Overview */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-none">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
                          {r.categories ? 'Skill Checklist' : 'Milestones'}
                        </span>
                        <span className="text-sm font-bold text-slate-900">
                          {r.categories ? `${skillsCount} Verified Skills` : `${stagesCount} Core Stages`}
                        </span>
                      </div>
                      <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-none">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
                          Level
                        </span>
                        <span className="text-xs font-bold text-slate-900 line-clamp-1">
                          {r.difficulty}
                        </span>
                      </div>
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">
                        Primary Stack
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {r.primaryStack.slice(0, 5).map((tech) => (
                          <span
                            key={tech}
                            className="text-[11px] font-semibold bg-slate-100 border border-slate-200 text-slate-700 px-2 py-0.5 rounded-none"
                          >
                            {tech}
                          </span>
                        ))}
                        {r.primaryStack.length > 5 && (
                          <span className="text-[10px] font-bold text-slate-500 px-1 py-0.5">
                            +{r.primaryStack.length - 5} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Link */}
                  <div className="pt-6 mt-6 border-t border-slate-200 flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700 group-hover:text-blue-600 transition-colors flex items-center space-x-1">
                      <span>Explore Roadmap</span>
                      <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                    <span className="w-8 h-8 rounded-none border border-slate-300 group-hover:border-slate-900 group-hover:bg-slate-900 group-hover:text-white flex items-center justify-center transition-all duration-200 text-slate-600">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Role Comparison Section */}
          <div className="mt-16 bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-12 shadow-sm space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                Career Guidance
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
                Comparing the AI & ML Roles
              </h2>
              <p className="text-sm text-slate-500 font-medium">
                Not sure which path aligns with your background and goals? Here is a high-level comparison.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 text-[11px] uppercase tracking-wider">
                    <th className="py-3 px-4 font-black">Role</th>
                    <th className="py-3 px-4 font-black">Primary Focus</th>
                    <th className="py-3 px-4 font-black">Core Artifacts</th>
                    <th className="py-3 px-4 font-black">Key Differentiator</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-600">
                  <tr className="hover:bg-slate-50/60 transition-colors cursor-pointer" onClick={() => navigate('/roadmaps/ai-engineer')}>
                    <td className="py-4 px-4 font-bold text-slate-800 flex items-center space-x-2">
                      <span>🤖</span>
                      <span className="text-blue-600">AI Engineer</span>
                    </td>
                    <td className="py-4 px-4">LLM applications, RAG pipelines, and Agent workflows</td>
                    <td className="py-4 px-4">Production LLM services, tool integrations, evaluations</td>
                    <td className="py-4 px-4 text-xs font-semibold text-slate-500">Fast application layer iteration & prompt/context engineering</td>
                  </tr>
                  <tr className="hover:bg-slate-50/60 transition-colors cursor-pointer" onClick={() => navigate('/roadmaps/ml-engineer')}>
                    <td className="py-4 px-4 font-bold text-slate-800 flex items-center space-x-2">
                      <span>🏋️</span>
                      <span className="text-indigo-600">ML Engineer</span>
                    </td>
                    <td className="py-4 px-4">Training, tuning, and serving classical & deep learning models</td>
                    <td className="py-4 px-4">Model checkpoints, latency-optimized serving, MLOps</td>
                    <td className="py-4 px-4 text-xs font-semibold text-slate-500">Model training loops, feature engineering, distributed compute</td>
                  </tr>
                  <tr className="hover:bg-slate-50/60 transition-colors cursor-pointer" onClick={() => navigate('/roadmaps/data-scientist')}>
                    <td className="py-4 px-4 font-bold text-slate-800 flex items-center space-x-2">
                      <span>📊</span>
                      <span className="text-emerald-600">Data Scientist</span>
                    </td>
                    <td className="py-4 px-4">Statistical experimentation, predictive analysis, and causal impact</td>
                    <td className="py-4 px-4">A/B test readouts, decision models, executive memos</td>
                    <td className="py-4 px-4 text-xs font-semibold text-slate-500">Business intuition, scientific rigor, and stakeholder storytelling</td>
                  </tr>
                  <tr className="hover:bg-slate-50/60 transition-colors cursor-pointer" onClick={() => navigate('/roadmaps/forward-deployed-engineer')}>
                    <td className="py-4 px-4 font-bold text-slate-800 flex items-center space-x-2">
                      <span>💼</span>
                      <span className="text-amber-600">Forward Deployed Engineer</span>
                    </td>
                    <td className="py-4 px-4">Client discovery, rapid 0-to-1 PoC development, enterprise integrations</td>
                    <td className="py-4 px-4">Client custom AI solutions, security compliance, air-gapped deploys</td>
                    <td className="py-4 px-4 text-xs font-semibold text-slate-500">Direct client-facing engineering, high velocity, legacy integration</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
