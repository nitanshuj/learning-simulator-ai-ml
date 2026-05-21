import React from 'react'

interface Scenario {
  title: string
  situation: string
  userGoal: string
  coreQuestion: string
}

interface SimulatorShellProps {
  scenario: Scenario
  mode: 'Guided' | 'Explore' | 'Challenge'
  onModeChange: (mode: 'Guided' | 'Explore' | 'Challenge') => void
  controlsPanel: React.ReactNode
  resultsPanel: React.ReactNode
  explanationPanel: React.ReactNode
  challengeInstructions?: React.ReactNode
  guidedInstructions?: React.ReactNode
  challengeSuccess?: boolean
  challengeScore?: number
  challengeTarget?: string
  challengeCurrent?: string
  onRetry?: () => void
}

export const SimulatorShell: React.FC<SimulatorShellProps> = ({
  scenario,
  mode,
  onModeChange,
  controlsPanel,
  resultsPanel,
  explanationPanel,
  challengeInstructions,
  guidedInstructions,
  challengeSuccess,
  challengeScore,
  challengeTarget,
  challengeCurrent,
  onRetry,
}) => {
  return (
    <div className="space-y-6">
      {/* Mode Navigation Bar */}
      <div className="flex items-center justify-between bg-white border border-slate-200 p-2.5 rounded-2xl shadow-sm">
        <div className="flex space-x-2">
          {(['Guided', 'Explore', 'Challenge'] as const).map((m) => (
            <button
              key={m}
              onClick={() => onModeChange(m)}
              className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                mode === m
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-500 hover:text-slate-950 hover:bg-slate-50'
              }`}
            >
              {m} Mode
            </button>
          ))}
        </div>
        <div className="hidden sm:flex items-center space-x-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Interactive Simulator
          </span>
        </div>
      </div>

      {/* Main Grid: Left side (Scenario Card + Controls) | Right side (Results + Explanation) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Column (Scenario and Controls) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Scenario Card */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 rounded-3xl shadow-sm border border-slate-900/50 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full filter blur-xl pointer-events-none" />
            <div className="space-y-4">
              <span className="text-[10px] font-black bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2 py-0.5 rounded-md uppercase tracking-wider">
                Scenario Setup
              </span>
              <h2 className="text-xl font-bold tracking-tight">{scenario.title}</h2>
              <p className="text-sm text-slate-300 leading-relaxed font-medium">
                {scenario.situation}
              </p>
              
              <div className="bg-white/10 rounded-2xl p-4 border border-white/5 space-y-2">
                <span className="text-[10px] font-black text-amber-300 uppercase tracking-wider block">
                  🎯 Your Goal:
                </span>
                <p className="text-xs text-white leading-relaxed font-semibold">
                  {scenario.userGoal}
                </p>
              </div>

              {mode === 'Challenge' && challengeInstructions && (
                <div className="bg-rose-500/10 rounded-2xl p-4 border border-rose-500/20 space-y-2">
                  <span className="text-[10px] font-black text-rose-300 uppercase tracking-wider block">
                    🏆 Challenge Targets & Mode:
                  </span>
                  <div className="text-xs text-slate-200 leading-relaxed">
                    {challengeInstructions}
                  </div>
                  {challengeTarget && (
                    <div className="mt-2 grid grid-cols-2 gap-2 text-xs border-t border-white/10 pt-2 font-mono">
                      <div>Target: <span className="text-emerald-400 font-bold">{challengeTarget}</span></div>
                      <div>Current: <span className={challengeSuccess ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>{challengeCurrent}</span></div>
                    </div>
                  )}
                  {challengeScore !== undefined && (
                    <div className="mt-2 text-xs font-bold text-center">
                      {challengeSuccess ? (
                        <span className="text-emerald-400">✅ Target Met! Score: {challengeScore}/100</span>
                      ) : (
                        <span className="text-rose-400">❌ Keep adjusting controls to meet targets!</span>
                      )}
                    </div>
                  )}
                </div>
              )}

              {mode === 'Guided' && guidedInstructions && (
                <div className="bg-indigo-500/10 rounded-2xl p-4 border border-indigo-500/20 space-y-2">
                  <span className="text-[10px] font-black text-indigo-300 uppercase tracking-wider block">
                    📖 Step-by-Step Guidance:
                  </span>
                  <div className="text-xs text-slate-200 leading-relaxed">
                    {guidedInstructions}
                  </div>
                </div>
              )}
            </div>
            <div className="mt-4 pt-4 border-t border-white/5 text-[10px] font-bold text-slate-400">
              QUESTION: {scenario.coreQuestion}
            </div>
          </div>

          {/* Controls Panel */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex-1 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                Adjustable Controls
              </span>
              <div className="space-y-6">
                {controlsPanel}
              </div>
            </div>
            {mode === 'Challenge' && onRetry && (
              <button
                onClick={onRetry}
                className="mt-6 w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
              >
                Reset Challenge
              </button>
            )}
          </div>
        </div>

        {/* Right Column (Results and Explanation) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Results Panel */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex-1 flex flex-col min-h-[400px]">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 block">
              Live Outputs & Metrics
            </span>
            <div className="flex-1 flex flex-col justify-center">
              {resultsPanel}
            </div>
          </div>

          {/* Explanation Panel */}
          <div className="bg-blue-50/50 border border-blue-100 p-6 rounded-3xl shadow-sm">
            <div className="flex items-start space-x-3">
              <span className="text-xl mt-0.5">💡</span>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-blue-900">What's Happening Under The Hood?</h4>
                <div className="text-xs text-blue-700 leading-relaxed font-medium">
                  {explanationPanel}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
