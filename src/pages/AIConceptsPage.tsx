import React from 'react'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { Card } from '../components/Card'
import { useNavigate } from 'react-router-dom'

interface AIConcept {
  id: string
  title: string
  description: string
  categories: string[]
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  estimatedTime: string
  keyConcepts: string[]
  icon: string
}

export const AIConceptsPage: React.FC = () => {
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = React.useState('All')
  const [searchQuery, setSearchQuery] = React.useState('')

  const concepts: AIConcept[] = [
    {
      id: 'transformers',
      title: 'Transformers',
      description: 'The foundational deep learning architecture that powers modern GenAI. Uses self-attention to process sequence data efficiently.',
      categories: ['Deep Learning', 'Generative AI'],
      difficulty: 'Advanced',
      estimatedTime: '15-20 minutes',
      keyConcepts: ['Self-Attention', 'Positional Encoding', 'Multi-Head Attention', 'Encoder-Decoder'],
      icon: '🤖',
    },
    {
      id: 'llm',
      title: 'Large Language Models (LLM)',
      description: 'Massive neural networks trained on vast text datasets to predict next words, understand context, and generate human-like text.',
      categories: ['Generative AI', 'NLP'],
      difficulty: 'Intermediate',
      estimatedTime: '10-15 minutes',
      keyConcepts: ['Pre-training', 'Fine-tuning', 'Tokens', 'Context Windows'],
      icon: '🗣️',
    },
    {
      id: 'rag',
      title: 'Retrieval Augmented Generation (RAG)',
      description: 'Enhances Large Language Models by injecting facts retrieved from local/private documents before producing answers.',
      categories: ['NLP', 'Generative AI'],
      difficulty: 'Intermediate',
      estimatedTime: '15 minutes',
      keyConcepts: ['Document Chunking', 'Semantic Search', 'Prompt Injection', 'Knowledge Injection'],
      icon: '📚',
    },
    {
      id: 'prompt-engineering',
      title: 'Prompt Engineering',
      description: 'The precise practice of authoring input text to command Large Language Models safely and optimally.',
      categories: ['Generative AI'],
      difficulty: 'Beginner',
      estimatedTime: '10 minutes',
      keyConcepts: ['Chain-of-Thought', 'Zero-Shot', 'Few-Shot Prompting', 'System Prompts'],
      icon: '✍️',
    },
    {
      id: 'vector-databases',
      title: 'Vector Databases',
      description: 'Scalable data structures designed to house complex multi-dimensional embeddings representing high-level semantic ideas.',
      categories: ['Infrastructure', 'Generative AI'],
      difficulty: 'Intermediate',
      estimatedTime: '12 minutes',
      keyConcepts: ['Embeddings', 'Cosine Similarity', 'Indexing Algorithms', 'Similarity Search'],
      icon: '🗄️',
    },
  ]

  const filters = ['All', 'Generative AI', 'Deep Learning', 'NLP', 'Infrastructure']

  const filteredConcepts = concepts.filter((concept) => {
    const matchesSearch = concept.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         concept.description.toLowerCase().includes(searchQuery.toLowerCase())
    if (activeFilter === 'All') return matchesSearch
    return matchesSearch && concept.categories.includes(activeFilter)
  })

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Generative AI': return 'bg-purple-50 text-purple-600 border border-purple-100'
      case 'Deep Learning': return 'bg-rose-50 text-rose-600 border border-rose-100'
      case 'NLP': return 'bg-teal-50 text-teal-600 border border-teal-100'
      case 'Infrastructure': return 'bg-blue-50 text-blue-600 border border-blue-100'
      default: return 'bg-slate-50 text-slate-600 border border-slate-100'
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-emerald-600 bg-emerald-50'
      case 'Intermediate': return 'text-amber-600 bg-amber-50'
      case 'Advanced': return 'text-rose-600 bg-rose-50'
      default: return 'text-slate-600 bg-slate-50'
    }
  }

  return (
    <div className="min-h-screen bg-[#fafbfc] font-sans flex flex-col justify-between">
      <Navbar />

      <main className="flex-grow pt-28 pb-16">
        <section className="container-wide text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 tracking-tight mb-4">
            AI Concepts
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-8 font-medium">
            Discover the building blocks of Large Language Models and Modern Generative AI.
          </p>

          {/* Search bar */}
          <div className="max-w-xl mx-auto relative group">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search concepts, architectures..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 pl-12 pr-6 bg-white border border-slate-200 rounded-2xl text-base shadow-sm group-hover:shadow-md focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
            />
          </div>
        </section>

        {/* Filter buttons */}
        <section className="container-wide mb-10">
          <div className="flex flex-wrap justify-center gap-2">
            {filters.map((filter) => (
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
        </section>

        {/* Cards Grid */}
        <section className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredConcepts.map((concept) => (
              <Card
                key={concept.id}
                onClick={() => {
                  if (concept.id === 'transformers') navigate('/transformers')
                  if (concept.id === 'rag') navigate('/rag')
                }}
                className={`group p-0 overflow-hidden border-slate-100 bg-white hover:shadow-lg transition-all duration-300 ${
                  (concept.id === 'transformers' || concept.id === 'rag') ? 'cursor-pointer hover:border-indigo-300' : 'opacity-90'
                }`}
              >
                <div className="flex flex-col sm:flex-row h-full">
                  {/* Icon section */}
                  <div className="w-full sm:w-32 flex items-center justify-center bg-slate-50/50 border-b sm:border-b-0 sm:border-r border-slate-100 group-hover:bg-white transition-colors duration-300 min-h-[120px]">
                    <div className="text-4xl transform group-hover:scale-110 transition-transform duration-300">
                      {concept.icon}
                    </div>
                  </div>

                  {/* Content section */}
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-slate-800">
                          {concept.title}
                        </h3>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${getDifficultyColor(concept.difficulty)}`}>
                          {concept.difficulty}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 mb-4 leading-relaxed">
                        {concept.description}
                      </p>
                    </div>

                    <div>
                      <div className="mb-3">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                          Key Concepts:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {concept.keyConcepts.map((kc) => (
                            <span key={kc} className="text-[10px] bg-slate-50 text-slate-500 px-1.5 py-0.5 rounded border border-slate-200/50">
                              {kc}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-slate-100/60 mt-auto">
                        <div className="flex gap-1.5">
                          {concept.categories.map((cat) => (
                            <span
                              key={cat}
                              className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${getCategoryColor(cat)}`}
                            >
                              {cat}
                            </span>
                          ))}
                        </div>
                        <span className="text-xs text-slate-400 flex items-center">
                          ⏱️ {concept.estimatedTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredConcepts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-slate-400 text-lg">No AI concepts found matching your criteria.</p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}
