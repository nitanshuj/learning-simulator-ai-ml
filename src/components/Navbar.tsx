import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from './Button'

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-divider">
      <div className="max-w-7xl mx-auto px-lg sm:px-2xl lg:px-4xl">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <div className="text-blue-600">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.48Z"/>
                  <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.48Z"/>
                </svg>
              </div>
              <div>
                <span className="text-xl font-bold text-slate-800 block leading-none">
                  Viz Learn
                </span>
                <span className="text-[10px] text-slate-500 font-medium">
                  Learn ML Visually
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-lg">
            <a href="#" className="text-blue-600 font-semibold border-b-2 border-blue-600 px-1 py-1">Models</a>
            <a href="#" className="text-slate-600 hover:text-blue-600 font-semibold transition-colors">Roadmap</a>
            <a href="#" className="text-slate-600 hover:text-blue-600 font-semibold transition-colors">About</a>
            <a href="#" className="text-slate-600 hover:text-blue-600 font-semibold transition-colors">Resources</a>
            
            <button className="flex items-center space-x-2 bg-white border border-divider px-3 py-1.5 rounded-md hover:bg-slate-50 transition-all shadow-sm">
              <span className="text-amber-400 text-lg">★</span>
              <span className="text-sm font-bold text-slate-700">Favorites</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-600 hover:text-blue-600 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-divider animate-fadeIn">
          <div className="px-lg pt-sm pb-xl space-y-sm">
            <a href="#" className="block px-md py-sm text-base font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-md">Home</a>
            <a href="#" className="block px-md py-sm text-base font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-md">About</a>
            <a href="#models" className="block px-md py-sm text-base font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-md">Models</a>
            <a href="#" className="block px-md py-sm text-base font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-md">Documentation</a>
            <div className="pt-sm">
              <Button fullWidth>Get Started</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
