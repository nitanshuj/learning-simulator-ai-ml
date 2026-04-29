import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'

export const LetsLearnPage: React.FC = () => {
  const navigate = useNavigate()
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  // Interactive Particle System for the "pretty" background/element
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

  const learningPaths = [
    {
      title: 'Data Science Concepts',
      description: 'Explore the foundational concepts of Data Science, from data preprocessing to advanced analytics.',
      icon: (
        <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      path: '/data-science-concepts',
      color: 'from-blue-500/10 to-indigo-500/10 border-blue-200 hover:border-blue-500 hover:shadow-blue-500/10',
      active: true,
    },
    {
      title: 'ML Models',
      description: 'Master classical Machine Learning algorithms through hands-on interactive visualizations.',
      icon: (
        <svg className="w-8 h-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      path: '/ml-models',
      color: 'from-purple-500/10 to-pink-500/10 border-purple-200 hover:border-purple-500 hover:shadow-purple-500/10',
      active: true,
    },
    {
      title: 'AI Concepts',
      description: 'Explore the fundamental mechanics of Artificial Intelligence, Search, and heuristics.',
      icon: (
        <svg className="w-8 h-8 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      path: '/ai-concepts',
      color: 'from-teal-500/10 to-emerald-500/10 border-teal-200 hover:border-teal-500 hover:shadow-teal-500/10',
      active: false,
    },
    {
      title: 'Roadmaps',
      description: 'Follow guided, step-by-step pathways curated for different skill levels.',
      icon: (
        <svg className="w-8 h-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      ),
      path: '/roadmaps',
      color: 'from-amber-500/10 to-orange-500/10 border-amber-200 hover:border-amber-500 hover:shadow-amber-500/10',
      active: false,
    },
  ]

  return (
    <div className="min-h-screen bg-[#fafbfc] font-sans flex flex-col overflow-x-hidden">
      <Navbar />

      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden flex items-center justify-center">
          {/* Canvas for the pretty interactive effect */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
          />

          <div className="container-wide text-center relative z-10">
            {/* Badge */}
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-blue-50 text-blue-600 border border-blue-100 mb-6 animate-pulse">
              🚀 Interactive Learning Reimagined
            </span>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-800 mb-6 tracking-tight">
              Master AI & ML <br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-500 bg-clip-text text-transparent">
                Completely Visually
              </span>
            </h1>

            <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
              Demystify complex algorithms. Experience how models think through hands-on, sandbox environments that make abstract math intuitive.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => navigate('/ml-models')}
                className="px-8 py-4 bg-slate-900 text-white rounded-2xl text-base font-bold shadow-xl shadow-slate-200 hover:bg-slate-800 hover:shadow-slate-300 transform hover:-translate-y-0.5 transition-all flex items-center justify-center space-x-2"
              >
                <span>Start Learning</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* Learning Paths Section */}
        <section className="py-16 bg-slate-50/50 border-t border-slate-100">
          <div className="container-wide">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight mb-4">
                Choose Your Pathway
              </h2>
              <p className="text-slate-500 max-w-xl mx-auto text-base">
                Select your area of focus and embark on an experiential journey.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {learningPaths.map((path) => (
                <div
                  key={path.title}
                  onClick={() => path.active && navigate(path.path)}
                  className={`group relative p-6 bg-gradient-to-br rounded-3xl border shadow-sm transition-all duration-300 ease-out flex flex-col justify-between h-64 ${
                    path.color
                  } ${
                    path.active
                      ? 'cursor-pointer hover:shadow-xl hover:-translate-y-1'
                      : 'opacity-70 border-slate-200'
                  }`}
                >
                  <div>
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 group-hover:scale-110 transition-transform duration-300">
                      {path.icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mt-6 mb-2 tracking-tight">
                      {path.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {path.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    {path.active ? (
                      <span className="text-xs font-bold text-slate-700 flex items-center group-hover:text-blue-600 transition-colors">
                        <span>Explore modules</span>
                        <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-slate-400 bg-slate-200/50 px-2.5 py-1 rounded-full">
                        Coming Soon
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="py-20 container-wide">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-100">
                🔮
              </div>
              <h4 className="text-lg font-bold text-slate-800 mb-2">Simulate in Real-Time</h4>
              <p className="text-sm text-slate-500 leading-relaxed">Adjust parameters and see models respond instantly with live re-renders.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-teal-100">
                🧩
              </div>
              <h4 className="text-lg font-bold text-slate-800 mb-2">Zero Math Overhead</h4>
              <p className="text-sm text-slate-500 leading-relaxed">We break formulas down into intuitive visual steps that stick with you.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-purple-100">
                🚀
              </div>
              <h4 className="text-lg font-bold text-slate-800 mb-2">Gamified Testing</h4>
              <p className="text-sm text-slate-500 leading-relaxed">Take quizzes to test your visual intuition, directly after learning.</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
