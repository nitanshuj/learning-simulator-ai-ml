import React from 'react'
import { Button } from '../components/Button'

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-indigo-100/50 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-lg sm:px-2xl lg:px-4xl text-center">
        <div className="inline-block px-md py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-semibold mb-lg animate-fadeIn">
          Now Available: Neural Network Fundamentals 🧠
        </div>
        
        <h1 className="text-h1 md:text-[64px] text-slate-900 leading-tight mb-xl max-w-4xl mx-auto">
          Learn Machine Learning Through <br className="hidden md:block" />
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Interactive Visualizations
          </span>
        </h1>
        
        <p className="text-xl text-slate-600 mb-2xl max-w-2xl mx-auto leading-relaxed">
          Understand how ML algorithms work by adjusting parameters and seeing results in real-time. No black boxes, just intuition.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-lg">
          <Button size="lg" className="px-10 h-14 text-lg">
            Start Learning
          </Button>
          <Button variant="outline" size="lg" className="px-10 h-14 text-lg">
            View All Models →
          </Button>
        </div>

        <div className="mt-2xl flex items-center justify-center gap-xl text-slate-400">
          <div className="flex -space-x-sm">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                <img src={`https://i.pravatar.cc/150?u=${i}`} alt="User" />
              </div>
            ))}
          </div>
          <p className="text-sm font-medium">
            <span className="text-slate-900 font-bold">10,000+</span> students already learning
          </p>
        </div>
      </div>
    </section>
  )
}
