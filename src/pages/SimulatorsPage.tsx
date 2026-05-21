import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Navbar, Footer } from '@/components'
import { models } from '@/data/models'

export const SimulatorsPage: React.FC = () => {
  const navigate = useNavigate()

  // Get active models that are scenario simulators
  const simulatorModels = models.filter((m) => m.isSimulator && m.status === 'Active')

  // Scenario teasers map
  const teasers: Record<string, { scenario: string; coreQuestion: string }> = {
    'missing-data': {
      scenario: 'You are a data scientist at a hospital. Patient records are missing crucial lab values, making your models fail.',
      coreQuestion: 'Which imputation strategy restores the highest model performance?'
    },
    'class-imbalance': {
      scenario: 'Your credit card fraud detection system flags zero fraudulent charges, despite high standard accuracy.',
      coreQuestion: 'How does SMOTE resampling and threshold tuning impact fraud detection rates?'
    },
    'decision-tree': {
      scenario: 'You are building a customer churn model and must choose between a simple tree or a complex forest.',
      coreQuestion: 'How does depth, tree count, and data noise control overfitting?'
    },
    'eval-metrics': {
      scenario: 'You are deploying a cancer screening classifier and must balance false positives vs false negatives.',
      coreQuestion: 'How do you optimize thresholds to prioritize recall or precision?'
    },
    'prompt-engineering': {
      scenario: 'Your support chat bot keeps providing generic or hallucinated answers to customer queries.',
      coreQuestion: 'How do context, tone, and examples shape LLM responses?'
    },
    'rag': {
      scenario: 'Your documentation assistant generates false statements because retrieval isn\'t grounded properly.',
      coreQuestion: 'How do chunk size, overlap, and top-k retrieval affect grounding?'
    },
    'drift-monitoring': {
      scenario: 'Your model\'s predictive accuracy collapsed from 94% to 71% three months after initial deployment.',
      coreQuestion: 'How does gradual or sudden feature drift affect model performance over time?'
    }
  }

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

  return (
    <div className="min-h-screen bg-[#fafbfc] font-sans flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-black bg-emerald-50 text-emerald-600 border border-emerald-100 uppercase tracking-wider animate-pulse">
              🎮 Scenario Playgrounds
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight">
              Scenario-Based Simulators
            </h1>
            <p className="text-slate-500 font-medium text-lg leading-relaxed">
              Step into the shoes of a real-world engineer. Run experiments, adjust interactive controls, and see the immediate consequences in charts, metrics, and outputs.
            </p>
          </div>

          {/* Grid of simulators */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {simulatorModels.map((model) => {
              const meta = teasers[model.id] || {
                scenario: model.description,
                coreQuestion: 'What happens when we adjust hyperparameters?'
              }

              return (
                <div
                  key={model.id}
                  onClick={() => navigate(model.simulatorRoute || `/modules/${model.id}`)}
                  className="group bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-xl hover:border-emerald-400 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between h-[360px]"
                >
                  <div className="p-6 space-y-4">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <span className="text-3xl bg-slate-50 p-2 rounded-2xl">{model.icon}</span>
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded border ${getDifficultyColor(model.difficulty)}`}>
                        {model.difficulty}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-800 tracking-tight group-hover:text-emerald-600 transition-colors">
                      {model.title} Simulator
                    </h3>

                    {/* Situation */}
                    <p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-3">
                      {meta.scenario}
                    </p>

                    {/* Core Question callout */}
                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3.5 space-y-1">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">
                        Core Question:
                      </span>
                      <p className="text-[11px] text-slate-700 font-bold leading-normal italic">
                        "{meta.coreQuestion}"
                      </p>
                    </div>
                  </div>

                  {/* CTA Footer */}
                  <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-400 uppercase tracking-wider">
                      Est. Effort: {model.estimatedTime}
                    </span>
                    <span className="font-bold text-emerald-600 flex items-center group-hover:translate-x-1 transition-transform">
                      <span>Launch Sandbox</span>
                      <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
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
