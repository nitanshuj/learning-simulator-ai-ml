import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { ModelCard } from '../components/ModelCard'
import { models } from '../data/models'

export const MLConceptsPage: React.FC = () => {
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = React.useState('All Models')
  const [searchQuery, setSearchQuery] = React.useState('')

  const filters = [
    'All Models', 
    'Supervised Learning', 
    'Unsupervised Learning', 
    'Regression', 
    'Classification', 
    'Clustering', 
    'Dimensionality Reduction',
    'NLP'
  ]

  const filteredModels = models.filter(model => {
    const matchesSearch = model.title.toLowerCase().includes(searchQuery.toLowerCase())
    if (activeFilter === 'All Models') return matchesSearch
    
    return matchesSearch && (model.categories as any).includes(activeFilter)
  })

  return (
    <div className="min-h-screen bg-[#fafbfc] font-sans">
      <Navbar />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-12 relative overflow-hidden">
          {/* Abstract Doodles */}
          <div className="absolute top-40 left-10 opacity-20 pointer-events-none">
            <svg width="120" height="120" viewBox="0 0 120 120" className="text-blue-600">
              <circle cx="20" cy="20" r="4" fill="currentColor" />
              <circle cx="50" cy="40" r="4" fill="currentColor" />
              <circle cx="30" cy="70" r="4" fill="currentColor" />
              <circle cx="80" cy="20" r="4" fill="currentColor" />
              <line x1="20" y1="20" x2="80" y2="20" stroke="currentColor" strokeWidth="1" strokeDasharray="4" />
            </svg>
          </div>
          <div className="absolute top-40 right-10 opacity-20 pointer-events-none">
            <svg width="150" height="150" viewBox="0 0 120 120" className="text-emerald-600">
              <path d="M60 20 L30 80 L90 80 Z" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="60" cy="20" r="5" fill="white" stroke="currentColor" strokeWidth="2" />
              <circle cx="30" cy="80" r="5" fill="white" stroke="currentColor" strokeWidth="2" />
              <circle cx="90" cy="80" r="5" fill="white" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>

          <div className="container-wide text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 tracking-tight">
              Machine Learning <span className="font-hand text-blue-600 relative inline-block">Concepts
                <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 100 8" preserveAspectRatio="none">
                  <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
              </span>
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-8 leading-relaxed font-medium">
              Explore ML models with simple explanations and interactive simulations.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative group">
              <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input 
                type="text" 
                placeholder="Search models or concepts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-14 pl-14 pr-6 bg-white border border-slate-200 rounded-2xl text-base shadow-sm group-hover:shadow-md focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-slate-300"
              />
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="pb-8">
          <div className="container-wide">
            <div className="flex flex-wrap justify-center gap-2">
              {filters.map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                    activeFilter === filter 
                      ? 'bg-slate-900 text-white shadow-xl shadow-slate-200' 
                      : 'bg-white text-slate-500 border border-slate-100 hover:border-blue-200 hover:text-blue-600'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Model Grid */}
        <section className="pb-20">
          <div className="container-wide">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredModels.map(model => (
                <ModelCard 
                  key={model.id} 
                  model={model} 
                  onClick={(id) => {
                    const routes: Record<string, string> = {
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
                    }
                    if (routes[id]) navigate(routes[id])
                  }}
                />
              ))}
            </div>
            
            {filteredModels.length === 0 && (
              <div className="text-center py-20">
                <p className="text-slate-400 text-lg">No models found matching your search.</p>
              </div>
            )}
          </div>
        </section>

        {/* Bottom Banner */}
        <section className="container-wide mb-12">
          <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-2xl flex items-center justify-center space-x-3 text-indigo-700">
            <span className="text-xl">🚀</span>
            <span className="font-bold text-sm">More models coming soon! Stay tuned and keep learning.</span>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}
