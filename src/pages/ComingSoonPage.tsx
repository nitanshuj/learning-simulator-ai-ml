import React from 'react'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'

interface ComingSoonPageProps {
  title: string
}

export const ComingSoonPage: React.FC<ComingSoonPageProps> = ({ title }) => {
  return (
    <div className="min-h-screen bg-[#fafbfc] font-sans flex flex-col justify-between">
      <Navbar />
      
      <main className="flex-grow pt-32 flex items-center justify-center">
        <div className="container-wide text-center">
          <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-indigo-100 text-3xl">
            🛠️
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 tracking-tight">
            {title}
          </h1>
          <p className="text-lg text-slate-500 max-w-md mx-auto mb-8 leading-relaxed font-medium">
            We are hard at work building immersive, visual walkthroughs for this path. Stay tuned!
          </p>
          <div className="max-w-xs mx-auto border-t border-slate-100 pt-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Under Construction
            </span>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
