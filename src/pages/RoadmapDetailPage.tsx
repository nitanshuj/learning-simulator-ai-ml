import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { Navbar, Footer, BackButton } from '@/components'
import { getRoadmapById, roadmaps } from '@/data/roadmaps'
import { AIEngineerChecklist } from '@/components/roadmaps/AIEngineerChecklist'
import { RoleRoadmapView } from '@/components/roadmaps/RoleRoadmapView'

export const RoadmapDetailPage: React.FC = () => {
  const { roadmapId } = useParams<{ roadmapId: string }>()
  const roadmap = getRoadmapById(roadmapId || '')

  if (!roadmap) {
    return (
      <div className="min-h-screen bg-[#fafbfc] font-sans flex flex-col">
        <Navbar />
        <main className="flex-grow pt-28 pb-20 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-6">
            <span className="text-5xl mb-4 block">🗺️</span>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Roadmap Not Found</h2>
            <p className="text-sm text-slate-500 mb-6">
              The requested career roadmap does not exist or has moved.
            </p>
            <Link
              to="/roadmaps"
              className="px-6 py-3 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-md hover:bg-blue-700 transition-colors inline-block"
            >
              Browse All Roadmaps
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // Other roadmaps for quick navigation
  const otherRoadmaps = roadmaps.filter((r) => r.id !== roadmap.id)

  return (
    <div className="min-h-screen bg-[#fafbfc] font-sans flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Back Navigation */}
          <div className="flex items-center justify-between">
            <BackButton />
            <Link
              to="/roadmaps"
              className="text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors flex items-center space-x-1"
            >
              <span>View all {roadmaps.length} Roadmaps</span>
              <span>→</span>
            </Link>
          </div>

          {/* Hero Banner for this Specific Roadmap */}
          <div
            className={`bg-gradient-to-r ${roadmap.gradient} text-white rounded-none p-6 sm:p-10 shadow-lg relative overflow-hidden border border-black/10`}
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-none blur-3xl pointer-events-none" />
            <div className="relative z-10 space-y-4 max-w-4xl">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-3xl bg-white/20 p-2.5 rounded-none backdrop-blur-sm border border-white/20">
                  {roadmap.icon}
                </span>
                <span className="text-xs font-black bg-white/20 px-3 py-1 rounded-none uppercase tracking-wider border border-white/20">
                  {roadmap.badge}
                </span>
                <span className="text-xs font-bold bg-black/20 px-3 py-1 rounded-none border border-white/10">
                  ⏱️ {roadmap.estimatedMonths}
                </span>
                <span className="text-xs font-bold bg-black/20 px-3 py-1 rounded-none border border-white/10">
                  🎯 {roadmap.difficulty}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                {roadmap.title}
              </h1>
              <p className="text-indigo-100 font-medium text-base sm:text-lg leading-relaxed">
                {roadmap.description}
              </p>

              <div className="pt-2 flex flex-wrap gap-2 items-center text-xs">
                <span className="font-bold text-white/80 mr-1">Primary Tools:</span>
                {roadmap.primaryStack.map((tech) => (
                  <span
                    key={tech}
                    className="bg-white/15 border border-white/20 px-2.5 py-1 rounded-lg font-semibold"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Roadmap Content: Interactive Checklist or Stage-based View */}
          <div className="pt-2">
            {roadmap.categories ? (
              <AIEngineerChecklist
                categories={roadmap.categories}
                citation={roadmap.authorCitation}
                storageKey={`vizlearn-${roadmap.id}-checklist-v1`}
              />
            ) : (
              roadmap.stages && <RoleRoadmapView roadmap={roadmap} />
            )}
          </div>

          {/* Other Roadmaps Quick Links */}
          <div className="mt-20 pt-12 border-t border-slate-200 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-800">
                  Explore Other Career Roadmaps
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Looking for a different specialty? Check out our other curated role roadmaps.
                </p>
              </div>
              <Link
                to="/roadmaps"
                className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
              >
                All Roadmaps →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {otherRoadmaps.map((other) => (
                <Link
                  key={other.id}
                  to={`/roadmaps/${other.id}`}
                  className="p-5 bg-white border-2 border-slate-200 hover:border-slate-900 hover:shadow-lg rounded-none transition-all duration-200 group flex flex-col justify-between relative overflow-hidden"
                >
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${other.gradient}`} />
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl bg-slate-50 p-2 rounded-none border border-slate-200 group-hover:scale-105 transition-transform">
                        {other.icon}
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {other.title}
                        </h4>
                        <span className="text-[10px] text-slate-500 font-semibold block">
                          ⏱️ {other.estimatedMonths}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-medium">
                      {other.subtitle}
                    </p>
                  </div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700 group-hover:text-blue-600 mt-4 block">
                    View Roadmap →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
