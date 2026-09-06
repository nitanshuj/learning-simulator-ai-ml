import React, { useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { tracks } from '@/data/tracks'
import { learningPaths } from '@/data/learningPaths'
import { roadmaps } from '@/data/roadmaps'

export const LetsLearnPage: React.FC = () => {
  const navigate = useNavigate()
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  // Interactive Particle System for the pretty background
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = canvas.offsetWidth)
    let height = (canvas.height = canvas.offsetHeight)

    // Handle resize
    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = canvas.offsetWidth
      height = canvas.height = canvas.offsetHeight
    }
    window.addEventListener('resize', handleResize)

    // Particle class
    class Particle {
      x: number
      y: number
      vx: number
      vy: number
      radius: number
      color: string

      constructor() {
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.vx = (Math.random() - 0.5) * 0.8
        this.vy = (Math.random() - 0.5) * 0.8
        this.radius = Math.random() * 2 + 1
        const colors = ['#3b82f6', '#6366f1', '#14b8a6', '#f59e0b']
        this.color = colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        this.x += this.vx
        this.y += this.vy

        if (this.x < 0 || this.x > width) this.vx = -this.vx
        if (this.y < 0 || this.y > height) this.vy = -this.vy
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
      }
    }

    const particles: Particle[] = Array.from({ length: 60 }, () => new Particle())

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i]
        p1.update()
        p1.draw()

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(99, 102, 241, ${1 - distance / 100})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#fafbfc] font-sans flex flex-col overflow-x-hidden">
      <Navbar />

      <main className="flex-grow pt-24">
        
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 overflow-hidden flex items-center justify-center">
          {/* Canvas for the pretty interactive effect */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
          />

          <div className="max-w-5xl mx-auto text-center px-6 relative z-10">
            {/* Badge */}
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-black bg-blue-50 text-blue-600 border border-blue-100 mb-6 animate-pulse">
              🚀 Interactive Learning Reimagined
            </span>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-800 mb-6 tracking-tight leading-none">
              Master AI & ML <br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-500 bg-clip-text text-transparent">
                Completely Visually
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
              Demystify complex algorithms. Experience how models think through hands-on, sandbox environments that make abstract math intuitive.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => navigate('/roadmaps')}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl text-base font-bold shadow-xl shadow-blue-500/20 hover:from-blue-700 hover:to-indigo-700 transform hover:-translate-y-0.5 transition-all flex items-center justify-center space-x-2"
              >
                <span>Role Roadmaps</span>
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-black">New</span>
              </button>

              <button
                onClick={() => navigate('/tracks')}
                className="px-8 py-4 bg-slate-900 text-white rounded-2xl text-base font-bold shadow-xl shadow-slate-200 hover:bg-slate-800 hover:shadow-slate-300 transform hover:-translate-y-0.5 transition-all flex items-center justify-center space-x-2"
              >
                <span>Explore Tracks</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>

              <button
                onClick={() => navigate('/learning-paths')}
                className="px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-2xl text-base font-bold shadow-sm hover:bg-slate-50 transform hover:-translate-y-0.5 transition-all flex items-center justify-center"
              >
                Guided paths
              </button>
            </div>
          </div>
        </section>

        {/* Tracks Grid Section */}
        <section className="py-16 bg-slate-50/50 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight mb-3">
                Learning Tracks
              </h2>
              <p className="text-slate-500 max-w-xl mx-auto text-sm md:text-base font-medium">
                Choose a domain and go from fundamentals to deploying production model checkpoints.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tracks.slice(0, 4).map((track) => (
                <div
                  key={track.id}
                  onClick={() => navigate(`/tracks/${track.id}`)}
                  className="group relative p-6 bg-white border border-slate-200/80 rounded-3xl shadow-sm hover:shadow-lg hover:border-indigo-300 transition-all duration-300 cursor-pointer flex flex-col justify-between h-60"
                >
                  <div>
                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-2xl border border-slate-100 group-hover:scale-105 transition-transform">
                      {track.icon}
                    </div>
                    <h3 className="text-base font-bold text-slate-800 mt-5 mb-1.5 tracking-tight group-hover:text-indigo-600 transition-colors">
                      {track.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium line-clamp-3">
                      {track.description}
                    </p>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 group-hover:text-indigo-500 transition-colors flex items-center">
                    <span>View track</span>
                    <svg className="w-3.5 h-3.5 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                to="/tracks"
                className="inline-flex items-center text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors space-x-1"
              >
                <span>View all 7 Learning Tracks</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Guided Learning Paths Section */}
        <section className="py-20 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Info text */}
              <div className="lg:col-span-5 space-y-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black bg-indigo-50 text-indigo-600 uppercase tracking-wider">
                  Curated Syllabi
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight leading-tight">
                  Guided Roadmaps for Every Skill Level
                </h2>
                <p className="text-slate-500 font-medium text-sm md:text-base leading-relaxed">
                  Don't know where to start? Our curated paths take you from beginner concepts through intermediate model fitting up to deploying state-of-the-art LLMs.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => navigate('/learning-paths')}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-md hover:bg-indigo-700 transition-colors"
                  >
                    View All Guided Paths
                  </button>
                </div>
              </div>

              {/* Path Cards list preview */}
              <div className="lg:col-span-7 space-y-4">
                {learningPaths.slice(0, 3).map((path) => (
                  <div
                    key={path.id}
                    onClick={() => navigate(`/learning-paths/${path.id}`)}
                    className="p-5 bg-white border border-slate-200/80 hover:border-indigo-300 hover:shadow-md rounded-2xl flex items-center justify-between gap-6 cursor-pointer transition-all"
                  >
                    <div className="flex items-center space-x-4">
                      <span className="text-3xl bg-slate-50 p-2.5 rounded-xl">{path.icon}</span>
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm md:text-base">{path.title}</h4>
                        <p className="text-xs text-slate-500 font-medium line-clamp-1">{path.goal}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-slate-400 bg-slate-50 border border-slate-100 px-3 py-1 rounded-lg">
                      {path.estimatedHours}h
                    </span>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* Industry Role Roadmaps Section */}
        <section className="py-20 bg-slate-50/50 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black bg-blue-50 text-blue-600 uppercase tracking-wider mb-2">
                  🗺️ Career Blueprints
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
                  Industry Role Roadmaps
                </h2>
                <p className="text-slate-500 font-medium text-sm md:text-base mt-1">
                  Targeted skill checklists, milestones, and hands-on tracks for today's AI & ML careers.
                </p>
              </div>
              <Link
                to="/roadmaps"
                className="inline-flex items-center text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors space-x-1 shrink-0"
              >
                <span>Explore all 4 roadmaps</span>
                <span>→</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {roadmaps.map((r) => (
                <div
                  key={r.id}
                  onClick={() => navigate(`/roadmaps/${r.id}`)}
                  className="group bg-white border-2 border-slate-200 hover:border-slate-900 p-7 rounded-none shadow-xs hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between relative overflow-hidden"
                >
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${r.gradient}`} />
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl bg-slate-50 p-2.5 rounded-none group-hover:scale-105 transition-transform border border-slate-200">
                        {r.icon}
                      </span>
                      <span className="text-[10px] font-black uppercase tracking-wider bg-slate-900 text-white px-2.5 py-1 rounded-none">
                        {r.estimatedMonths}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1">
                        {r.title}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-medium">
                        {r.subtitle}
                      </p>
                    </div>
                  </div>
                  <div className="pt-4 mt-4 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-slate-700 group-hover:text-blue-600 transition-colors uppercase tracking-wider">
                    <span>View Roadmap</span>
                    <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="py-20 border-t border-slate-100 max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-100 text-xl">
                🔮
              </div>
              <h4 className="text-lg font-bold text-slate-800 mb-2">Simulate in Real-Time</h4>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">
                Adjust parameters and see models respond instantly with live re-renders.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-teal-100 text-xl">
                🧩
              </div>
              <h4 className="text-lg font-bold text-slate-800 mb-2">Zero Math Overhead</h4>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">
                We break formulas down into intuitive visual steps that stick with you.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-purple-100 text-xl">
                🚀
              </div>
              <h4 className="text-lg font-bold text-slate-800 mb-2">Gamified Testing</h4>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">
                Take quizzes to test your visual intuition, directly after learning.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
