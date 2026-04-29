import React from 'react'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#fafbfc] font-sans flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 pb-24 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Hero Section */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-16">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-5xl font-extrabold text-slate-800 mb-4 tracking-tight">About</h1>
              <div className="w-16 h-1.5 bg-blue-600 rounded-full mb-6 flex">
                <div className="w-10 h-full bg-blue-600 rounded-l-full"></div>
                <div className="w-2 h-full bg-blue-600 rounded-full ml-1"></div>
              </div>
              <p className="text-lg text-slate-500 max-w-md leading-relaxed">
                Learn more about the person behind Viz Learn and the mission of this platform.
              </p>
            </div>
            <div className="md:w-1/2 flex justify-end relative">
              {/* Decorative Brain Graphic */}
              <div className="absolute inset-0 bg-blue-50/50 rounded-[4rem] transform rotate-3 scale-105 -z-10"></div>
              <div className="bg-white p-12 rounded-[3rem] shadow-sm border border-blue-50/50 relative">
                {/* Abstract dot pattern */}
                <div className="absolute -top-4 -left-4 w-20 h-20 opacity-20 text-slate-400">
                  <svg width="100%" height="100%" fill="none" viewBox="0 0 100 100">
                    <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                      <circle cx="2" cy="2" r="2" fill="currentColor"></circle>
                    </pattern>
                    <rect x="0" y="0" width="100" height="100" fill="url(#dots)"></rect>
                  </svg>
                </div>
                <svg className="w-32 h-32 text-blue-600 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.48Z" />
                  <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.48Z" />
                </svg>
              </div>
            </div>
          </div>

          {/* About Me Section */}
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 mb-10 relative overflow-hidden">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-2xl">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800">About Me</h2>
                <div className="w-10 h-1 bg-blue-600 rounded-full mt-1"></div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-12">
              <div className="lg:w-1/2 space-y-6">
                <p className="text-slate-600 text-[1.05rem] leading-relaxed">
                  I'm <strong className="text-slate-800">Nitanshu Joshi</strong>, a Data Scientist passionate about building intelligent systems that solve real-world problems.
                </p>
                <p className="text-slate-600 text-[1.05rem] leading-relaxed">
                  With 2 years of experience in developing scalable machine learning solutions, I specialize in recommendation systems and predictive models that drive user growth and retention.
                </p>
                <p className="text-slate-600 text-[1.05rem] leading-relaxed">
                  I enjoy turning raw data into meaningful insights and believe in the power of data to fuel better decisions.
                </p>

                {/* Social Links */}
                <div className="flex flex-wrap gap-3 pt-4">
                  <a href="https://www.linkedin.com/in/nitanshu-joshi-ds/" target="_blank" rel="noreferrer" className="flex items-center space-x-2 px-4 py-2 border border-slate-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all text-sm font-semibold text-slate-700 group">
                    <svg className="w-5 h-5 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    <span>LinkedIn</span>
                    <svg className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  </a>
                  <a href="https://medium.com/@nitanshuj138" target="_blank" rel="noreferrer" className="flex items-center space-x-2 px-4 py-2 border border-slate-200 rounded-xl hover:border-slate-300 hover:bg-slate-50 transition-all text-sm font-semibold text-slate-700 group">
                    <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M4.144 14.88c-2.28 0-4.144-1.856-4.144-4.128S1.864 6.64 4.144 6.64c2.28 0 4.144 1.856 4.144 4.128s-1.864 4.112-4.144 4.112zM12.96 14.368c-1.888 0-3.44-1.632-3.44-3.616s1.552-3.616 3.44-3.616 3.44 1.632 3.44 3.616-1.552 3.616-3.44 3.616zM19.456 13.92c-.896 0-1.616-1.424-1.616-3.168s.72-3.168 1.616-3.168 1.616 1.424 1.616 3.168-.72 3.168-1.616 3.168z"/></svg>
                    <span>Medium</span>
                    <svg className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  </a>
                  <a href="https://github.com/nitanshuj" target="_blank" rel="noreferrer" className="flex items-center space-x-2 px-4 py-2 border border-slate-200 rounded-xl hover:border-slate-300 hover:bg-slate-50 transition-all text-sm font-semibold text-slate-700 group">
                    <svg className="w-5 h-5 text-slate-800" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    <span>GitHub</span>
                    <svg className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  </a>
                </div>
              </div>
              
              {/* Profile Illustration */}
              <div className="lg:w-1/2 relative flex items-center justify-center">
                <div className="absolute inset-0 bg-blue-50/60 rounded-3xl transform rotate-6 scale-90"></div>
                <div className="relative w-full max-w-[340px] bg-white rounded-xl shadow-lg border border-slate-200 p-6 z-10">
                  <div className="flex space-x-2 mb-6 border-b border-slate-100 pb-4">
                    <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                    <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                    <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                      <svg className="w-10 h-10 text-blue-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                    </div>
                    <div className="space-y-3 w-full">
                      <div className="h-2.5 bg-blue-600 rounded w-1/2"></div>
                      <div className="h-2 bg-slate-200 rounded w-full"></div>
                      <div className="h-2 bg-slate-200 rounded w-4/5"></div>
                      <div className="h-2 bg-slate-200 rounded w-3/4"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* About This Website Section */}
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 mb-10 relative overflow-hidden">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-2xl">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800">About This Website</h2>
                <div className="w-10 h-1 bg-blue-600 rounded-full mt-1"></div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-12">
              <div className="lg:w-1/2 space-y-6">
                <p className="text-slate-600 text-[1.05rem] leading-relaxed">
                  <strong className="text-slate-800">Viz Learn</strong> is a free educational platform for anyone who wants to learn Machine Learning, Data Science, and AI Concepts—including modern topics like LLMs and RAG.
                </p>
                <p className="text-slate-600 text-[1.05rem] leading-relaxed">
                  The goal is to bridge the gap between complex theoretical concepts and practical intuition.
                </p>
                <p className="text-slate-600 text-[1.05rem] leading-relaxed">
                  Through interactive visualizations and real-time simulators, learners can build a deeper understanding of how algorithms work—without getting overwhelmed by initial complexity.
                </p>
              </div>

              {/* Website Illustration */}
              <div className="lg:w-1/2 relative flex items-center justify-center mt-8 lg:mt-0">
                <div className="absolute inset-0 bg-blue-50/60 rounded-full blur-3xl transform scale-110 opacity-70"></div>
                <div className="relative w-full max-w-[380px] z-10">
                  {/* Dashboard UI mock */}
                  <div className="bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden relative">
                    {/* Header */}
                    <div className="bg-slate-800 h-6 w-full flex items-center px-3 space-x-1.5">
                      <div className="w-2 h-2 rounded-full bg-rose-400"></div>
                      <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                      <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                    </div>
                    {/* Body */}
                    <div className="p-4 grid grid-cols-2 gap-4">
                      <div className="col-span-2 border border-slate-100 rounded-lg p-3 h-24 flex items-center justify-center relative overflow-hidden">
                        <svg className="w-full h-full text-blue-400 opacity-60" viewBox="0 0 100 40" preserveAspectRatio="none">
                          <path d="M0,30 Q10,10 20,20 T40,25 T60,15 T80,30 T100,10 L100,40 L0,40 Z" fill="currentColor" fillOpacity="0.2" />
                          <path d="M0,30 Q10,10 20,20 T40,25 T60,15 T80,30 T100,10" fill="none" stroke="currentColor" strokeWidth="2" />
                        </svg>
                      </div>
                      <div className="border border-slate-100 rounded-lg p-3 h-24 flex items-end justify-center space-x-2">
                        <div className="w-4 bg-slate-300 rounded-t h-1/3"></div>
                        <div className="w-4 bg-blue-400 rounded-t h-2/3"></div>
                        <div className="w-4 bg-blue-600 rounded-t h-full"></div>
                      </div>
                      <div className="border border-slate-100 rounded-lg p-3 h-24 flex items-center justify-center">
                        <svg className="w-16 h-16 text-blue-600" viewBox="0 0 36 36">
                          <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e2e8f0" strokeWidth="6" />
                          <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831" fill="none" stroke="currentColor" strokeWidth="6" strokeDasharray="75, 100" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating Graduation Cap */}
                  <div className="absolute -bottom-6 -right-4 w-28 h-28 transform rotate-12 drop-shadow-xl z-20 text-slate-900">
                    <svg viewBox="0 0 100 100" fill="currentColor">
                      <path d="M50 20L10 40L50 60L90 40L50 20Z" />
                      <path d="M25 47.5V70C25 70 50 85 50 85C50 85 75 70 75 70V47.5" fill="none" stroke="currentColor" strokeWidth="8" strokeLinejoin="round" />
                      <path d="M90 40V70" stroke="currentColor" strokeWidth="4" />
                      <circle cx="90" cy="75" r="4" className="text-blue-600" fill="currentColor" />
                    </svg>
                  </div>

                  {/* Floating card */}
                  <div className="absolute -bottom-4 -left-8 bg-blue-100 rounded-xl p-3 shadow-lg border border-blue-200 z-20 w-32">
                    <div className="h-2 bg-blue-600 rounded w-3/4 mb-2"></div>
                    <div className="h-1.5 bg-blue-300 rounded w-full mb-1"></div>
                    <div className="h-1.5 bg-blue-300 rounded w-4/5"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mission Section */}
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
            <div className="flex flex-col items-center mb-10 text-center">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-2xl mb-4">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Mission</h2>
              <div className="w-10 h-1 bg-blue-600 rounded-full mb-6"></div>
              <p className="text-xl font-medium text-slate-800 max-w-2xl leading-relaxed">
                Empower learners to truly understand Machine Learning and Data Science through visual, interactive, and intuitive learning experiences.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-4">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-4 border border-blue-100">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">Visual First</h3>
                <p className="text-sm text-slate-500 leading-relaxed">We believe in learning by seeing how things work.</p>
              </div>

              <div className="flex flex-col items-center text-center p-4">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-4 border border-blue-100">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">Hands-On</h3>
                <p className="text-sm text-slate-500 leading-relaxed">Learn interactively with real-time simulations.</p>
              </div>

              <div className="flex flex-col items-center text-center p-4">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-4 border border-blue-100">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">For Everyone</h3>
                <p className="text-sm text-slate-500 leading-relaxed">From beginners to advanced learners, everyone is welcome.</p>
              </div>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  )
}
