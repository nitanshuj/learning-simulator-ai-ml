import React from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Navbar, Footer, BackButton } from '@/components'
import { getTrackById } from '@/data/tracks'
import { models } from '@/data/models'
import { learningPaths } from '@/data/learningPaths'

export const TrackDetailPage: React.FC = () => {
  const { trackId } = useParams<{ trackId: string }>()
  const navigate = useNavigate()
  const track = getTrackById(trackId as any)

  if (!track) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800">Track not found</h2>
          <Link to="/tracks" className="text-blue-600 hover:underline mt-4 inline-block">Back to Tracks</Link>
        </div>
      </div>
    )
  }

  // Get all topics for this track
  const trackTopics = models.filter((m) => m.track === track.id)
  
  // Find related paths that reference this track's topics
  const relatedPaths = learningPaths.filter((path) =>
    path.topics.some((t) => trackTopics.some((tt) => tt.id === t.topicId))
  )

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Beginner':
        return 'bg-blue-50 text-blue-700 border-blue-100'
      case 'Intermediate':
        return 'bg-amber-50 text-amber-700 border-amber-100'
      case 'Advanced':
        return 'bg-rose-50 text-rose-700 border-rose-100'
      default:
        return 'bg-slate-50 text-slate-700 border-slate-100'
    }
  }

  const getTopicRoute = (topic: typeof trackTopics[0]) => {
    if (topic.isSimulator && topic.simulatorRoute) {
      return topic.simulatorRoute
    }
    // Fallback/standard route mapping
    const standardRoutes: Record<string, string> = {
      'linear-regression': '/linearregression',
      'gradient-descent': '/gradientdescent',
      'logistic-regression': '/logisticregression',
      'kmeans-clustering': '/kmeansclustering',
      'tf-idf': '/tf-idf',
      'word2vec': '/word2vec',
      'bag-of-words': '/bag-of-words',
      'n-grams': '/n-grams',
      'decision-tree': '/decision-tree',
      'random-forest': '/random-forest',
      'svm': '/svm',
      'knn': '/knn',
      'naive-bayes': '/naive-bayes',
      'hierarchical-clustering': '/hierarchical-clustering',
      'xgboost': '/xgboost',
      'adaboost': '/adaboost',
      'catboost': '/catboost',
      'pca': '/modules/pca',
      'transformers': '/transformers',
      'rag': '/rag'
    }
    return standardRoutes[topic.id] || `/modules/${topic.id}`
  }

  return (
    <div className="min-h-screen bg-[#fafbfc] font-sans flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <BackButton />

          {/* Track Header Card */}
          <div className="mt-6 bg-white border border-slate-200/80 rounded-3xl p-8 shadow-sm relative overflow-hidden mb-12">
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-100 rounded-full pointer-events-none filter blur-3xl opacity-50" />
            <div className="relative z-10 space-y-4">
              <div className="flex items-center space-x-3">
                <span className="text-4xl">{track.icon}</span>
                <span className="text-[10px] font-black bg-slate-100 text-slate-600 border border-slate-200/50 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Track Overview
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
                {track.title}
              </h1>
              <p className="text-slate-500 font-medium text-base md:text-lg max-w-3xl leading-relaxed">
                {track.description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Topics List */}
            <div className="lg:col-span-8 space-y-6">
              <h2 className="text-xl font-bold text-slate-800">Lessons & Simulators</h2>
              
              <div className="space-y-4">
                {trackTopics.map((topic) => {
                  const isComingSoon = topic.status === 'Coming Soon'
                  const route = getTopicRoute(topic)

                  return (
                    <div
                      key={topic.id}
                      className={`p-6 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-6 transition-all duration-300 ${
                        isComingSoon ? 'opacity-70' : 'hover:border-blue-300 hover:shadow-md'
                      }`}
                    >
                      <div className="space-y-3 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-2xl">{topic.icon}</span>
                          <h3 className="text-lg font-bold text-slate-800">
                            {topic.title}
                          </h3>
                          {topic.isSimulator && (
                            <span className="text-[9px] font-black bg-emerald-50 text-emerald-600 border border-emerald-100 px-2 py-0.5 rounded-md uppercase tracking-wider">
                              Interactive Sandbox
                            </span>
                          )}
                          {isComingSoon && (
                            <span className="text-[9px] font-black bg-slate-100 text-slate-400 px-2 py-0.5 rounded-md uppercase tracking-wider">
                              Coming Soon
                            </span>
                          )}
                        </div>

                        <p className="text-sm text-slate-500 font-medium leading-relaxed">
                          {topic.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-3 text-xs pt-1">
                          <span className={`px-2 py-0.5 rounded border font-semibold ${getDifficultyColor(topic.difficulty)}`}>
                            {topic.difficulty}
                          </span>
                          <span className="text-slate-400 font-medium flex items-center space-x-1">
                            <span>⏱️</span>
                            <span>{topic.estimatedTime}</span>
                          </span>
                          {topic.prerequisites.length > 0 && (
                            <span className="text-slate-400 font-medium">
                              Prereq: {topic.prerequisites.map(p => models.find(m => m.id === p)?.title || p).join(', ')}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {!isComingSoon ? (
                          <button
                            onClick={() => navigate(route)}
                            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-md shadow-slate-100 transition-colors w-full md:w-auto"
                          >
                            {topic.isSimulator ? 'Launch Sandbox' : 'Start Lesson'}
                          </button>
                        ) : (
                          <span className="px-5 py-2.5 bg-slate-50 text-slate-400 border border-slate-100 rounded-xl text-xs font-bold w-full md:w-auto text-center cursor-not-allowed">
                            Locked
                          </span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Right: Sidebar with related Guided Paths */}
            <div className="lg:col-span-4 space-y-6">
              <h2 className="text-xl font-bold text-slate-800">Related Paths</h2>
              
              <div className="space-y-4">
                {relatedPaths.map((path) => (
                  <div
                    key={path.id}
                    onClick={() => navigate(`/learning-paths/${path.id}`)}
                    className="p-5 bg-gradient-to-br from-white to-slate-50/50 border border-slate-200 rounded-2xl shadow-sm hover:border-indigo-300 hover:shadow-md cursor-pointer transition-all duration-300 group"
                  >
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">{path.icon}</span>
                      <div className="space-y-2">
                        <h4 className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                          {path.title}
                        </h4>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-2">
                          {path.goal}
                        </p>
                        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400 pt-1">
                          <span>{path.estimatedHours} Hours</span>
                          <span>Prereq: {path.prerequisiteLevel}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {relatedPaths.length === 0 && (
                  <p className="text-sm text-slate-400 font-medium">No active guided paths for this track.</p>
                )}
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}
