import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Navbar, Footer } from '@/components'
import { tracks } from '@/data/tracks'
import { models } from '@/data/models'

export const TracksPage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#fafbfc] font-sans flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          
          {/* Hero Section */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-black bg-blue-50 text-blue-600 border border-blue-100 uppercase tracking-wider">
              Structured Curriculum
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight">
              Learning Tracks
            </h1>
            <p className="text-slate-500 font-medium text-lg leading-relaxed">
              Master machine learning step-by-step. Select a track to explore visual lessons and interactive sandboxes designed to build intuitive understanding.
            </p>
          </div>

          {/* Tracks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tracks.map((track) => {
              const trackTopics = models.filter((m) => m.track === track.id)
              const activeCount = trackTopics.filter((t) => t.status === 'Active').length
              const totalCount = trackTopics.length

              return (
                <div
                  key={track.id}
                  onClick={() => navigate(`/tracks/${track.id}`)}
                  className={`group relative p-6 bg-gradient-to-br rounded-3xl border shadow-sm transition-all duration-300 ease-out cursor-pointer hover:shadow-xl hover:-translate-y-1 bg-white ${track.borderColor}`}
                >
                  <div className="flex flex-col justify-between h-72">
                    <div>
                      {/* Icon Container */}
                      <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 group-hover:scale-110 transition-transform duration-300 text-3xl">
                        {track.icon}
                      </div>

                      {/* Header */}
                      <h3 className="text-xl font-bold text-slate-800 mt-6 mb-2 tracking-tight">
                        {track.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-sm text-slate-500 leading-relaxed font-medium line-clamp-3">
                        {track.description}
                      </p>
                    </div>

                    {/* Bottom Metadata */}
                    <div className="space-y-4">
                      {/* Progress Bar (Simulated / Visual Only) */}
                      <div>
                        <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                          <span>Progress</span>
                          <span>{activeCount} / {totalCount} Completed</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="bg-slate-900 h-full rounded-full transition-all duration-300"
                            style={{ width: `${(activeCount / totalCount) * 100}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-50">
                        <span className="font-bold text-slate-400 uppercase tracking-wider">
                          {track.difficultyRange}
                        </span>
                        <span className="font-bold text-slate-700 flex items-center group-hover:text-blue-600 transition-colors">
                          <span>View Topics</span>
                          <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}
