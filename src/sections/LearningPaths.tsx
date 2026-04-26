import React from 'react'
import { Card } from '../components/Card'
import { Button } from '../components/Button'

export const LearningPaths: React.FC = () => {
  const paths = [
    {
      level: "Level 1: Beginner",
      title: "Foundations of ML",
      models: ["Linear Regression", "Logistic Regression", "Basic Neural Networks"],
      color: "blue"
    },
    {
      level: "Level 2: Intermediate",
      title: "Deep Learning Mastery",
      models: ["Gradient Descent Optimization", "Backpropagation", "Convolutional Neural Networks"],
      color: "indigo"
    },
    {
      level: "Level 3: Advanced",
      title: "Modern AI Frontiers",
      models: ["Generative Adversarial Networks", "Transformers & Attention", "Reinforcement Learning"],
      color: "purple"
    }
  ]

  return (
    <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl -ml-48 -mb-48" />

      <div className="max-w-7xl mx-auto px-lg sm:px-2xl lg:px-4xl relative z-10">
        <div className="text-center mb-4xl">
          <h2 className="text-h2 mb-lg">Guided Learning Paths</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Don't know where to start? Follow our structured pathways designed for every skill level.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-xl">
          {paths.map((path, index) => (
            <Card key={index} className="bg-slate-800 border border-slate-700 p-xl flex flex-col group hover:border-blue-500/50 transition-colors">
              <span className="text-sm font-semibold text-blue-400 mb-sm uppercase tracking-widest">{path.level}</span>
              <h3 className="text-h4 mb-xl">{path.title}</h3>
              
              <ul className="space-y-lg mb-2xl flex-1">
                {path.models.map((model, i) => (
                  <li key={i} className="flex items-center gap-md text-slate-300">
                    <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-[10px] font-bold group-hover:bg-blue-600 transition-colors">
                      {i + 1}
                    </div>
                    {model}
                  </li>
                ))}
              </ul>
              
              <Button fullWidth variant="secondary" className="group-hover:bg-blue-600 transition-colors">
                Start Path →
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
