import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { ModelCard } from '../components/ModelCard'
import { models } from '../data/models'

export const HomePage: React.FC = () => {
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = React.useState('All Models')
  const [searchQuery, setSearchQuery] = React.useState('')

  const filters = [
    'All Models', 
    'Supervised Learning', 
    'Unsupervised Learning', 
    'Classification', 
    'Regression', 
    'Clustering', 
    'Dimensionality Reduction',
    'NLP'
  ]

  const filteredModels = models.filter(model => {
    const matchesSearch = model.title.toLowerCase().includes(searchQuery.toLowerCase())
    if (activeFilter === 'All Models') return matchesSearch
    
    // Simple mapping for demo
    if (activeFilter === 'Supervised Learning') {
      return matchesSearch && (model.category === 'Regression' || model.category === 'Classification')
    }
    if (activeFilter === 'Unsupervised Learning') {
      return matchesSearch && (model.category === 'Clustering' || model.category === 'Dimensionality Reduction')
    }
    
    return matchesSearch && model.category === activeFilter
  })

  return (
    <div className="min-h-screen bg-[#fafbfc] font-sans pb-20">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 relative overflow-hidden">
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
            <h1 className="text-5xl md:text-6xl font-bold text-slate-800 mb-6">
              Learn Machine Learning <span className="font-hand text-blue-600 relative">Visually
                <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 100 8" preserveAspectRatio="none">
                  <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
              </span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
              Explore ML models with simple explanations and interactive visualizations.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative group">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input 
                type="text" 
                placeholder="Search models..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-16 pl-14 pr-6 bg-white border border-divider rounded-full text-lg shadow-sm focus:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="pb-12">
          <div className="container-wide">
            <div className="flex flex-wrap justify-center gap-3">
              {filters.map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all border ${
                    activeFilter === filter 
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md' 
                      : 'bg-white text-slate-500 border-divider hover:border-blue-200 hover:text-blue-600'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Model Grid */}
        <section className="pb-24">
          <div className="container-wide">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
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
        <section className="container-wide">
          <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl flex items-center justify-center space-x-3 text-indigo-700">
            <span className="text-xl">🚀</span>
            <span className="font-bold text-sm">More models coming soon! Stay tuned and keep learning.</span>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}
