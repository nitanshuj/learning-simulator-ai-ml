import React from 'react'
import { Card } from '../components/Card'

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: "📊",
      title: "Choose a Model",
      description: "Select from our library of curated machine learning algorithms, from basic regression to deep learning."
    },
    {
      icon: "🎮",
      title: "Interact & Explore",
      description: "Adjust hyperparameters, change data points, and see how the model responds in real-time."
    },
    {
      icon: "💡",
      title: "Understand Concepts",
      description: "Dive deep into the math and theory behind the visualizations with integrated lessons."
    }
  ]

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-lg sm:px-2xl lg:px-4xl">
        <div className="text-center mb-4xl">
          <h2 className="text-h2 text-slate-900 mb-lg">How It Works</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Our platform simplifies complex ML concepts through a three-step interactive journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-xl relative">
          {/* Connector lines (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-[20%] right-[20%] h-0.5 bg-blue-100 -z-0" />
          
          {steps.map((step, index) => (
            <Card key={index} className="text-center relative z-10 border-none shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-16 h-16 bg-white shadow-md rounded-full flex items-center justify-center text-3xl mx-auto mb-lg border border-blue-50">
                {step.icon}
              </div>
              <h3 className="text-h4 text-slate-900 mb-md">{step.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {step.description}
              </p>
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                {index + 1}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
