import React, { useState, useEffect } from 'react'
import { Navbar, Footer, BackButton, TopicHeader, SimulatorShell } from '@/components'


export const DriftMonitoringSimulator: React.FC = () => {
  const [mode, setMode] = useState<'Guided' | 'Explore' | 'Challenge'>('Guided')

  // Controls
  const [currentWeek, setCurrentWeek] = useState(1)
  const [driftType, setDriftType] = useState<'None' | 'Gradual' | 'Sudden'>('None')
  const [retrainTrigger, setRetrainTrigger] = useState<'Manual' | 'Auto'>('Manual')

  // Outputs & states
  const [accuracy, setAccuracy] = useState(0.94)
  const [psi, setPsi] = useState(0.02)
  const [accuracyHistory, setAccuracyHistory] = useState<number[]>([0.94])
  const [lastRetrained, setLastRetrained] = useState<number | null>(null)

  // Guided step tracker
  const [guidedStep, setGuidedStep] = useState(1)

  // Challenge metrics
  const [challengeSuccess, setChallengeSuccess] = useState(false)
  const [challengeScore, setChallengeScore] = useState(0)

  // Recalculate stats week-by-week
  useEffect(() => {
    let acc = 0.94
    let calculatedPsi = 0.02

    // Apply drift progression based on week
    if (driftType === 'Gradual') {
      // starts after week 10
      if (currentWeek > 10) {
        const weeksDrifting = currentWeek - 10
        calculatedPsi = Math.min(0.4, 0.02 + weeksDrifting * 0.015)
        acc = Math.max(0.70, 0.94 - weeksDrifting * 0.01)
      }
    } else if (driftType === 'Sudden') {
      // hits suddenly at week 20
      if (currentWeek >= 20) {
        calculatedPsi = 0.35
        acc = 0.68
      }
    }

    // Apply retraining impact
    if (lastRetrained !== null && currentWeek >= lastRetrained) {
      const weeksSinceRetrain = currentWeek - lastRetrained
      // retraining restores accuracy to baseline, but it might degrade again if drift continues
      acc = Math.max(0.72, 0.93 - weeksSinceRetrain * 0.005)
      calculatedPsi = Math.max(0.03, calculatedPsi - 0.28)
    }

    setAccuracy(acc)
    setPsi(calculatedPsi)

    // Build history array up to current week
    const history: number[] = []
    let tempLastRetrain: number | null = lastRetrained
    for (let w = 1; w <= currentWeek; w++) {
      let wAcc = 0.94

      if (driftType === 'Gradual' && w > 10) {
        wAcc = Math.max(0.70, 0.94 - (w - 10) * 0.01)
      } else if (driftType === 'Sudden' && w >= 20) {
        wAcc = 0.68
      }


      if (tempLastRetrain !== null && w >= tempLastRetrain) {
        wAcc = Math.max(0.72, 0.93 - (w - tempLastRetrain) * 0.005)
      }
      history.push(wAcc)
    }
    setAccuracyHistory(history)

    // Automated trigger logic
    if (retrainTrigger === 'Auto' && calculatedPsi > 0.20 && lastRetrained !== currentWeek) {
      setLastRetrained(currentWeek)
    }

    // Challenge Evaluation: run up to week 45. Average accuracy must be >= 88%
    if (mode === 'Challenge' && currentWeek >= 45) {
      const sum = history.reduce((a, b) => a + b, 0)
      const avg = sum / history.length
      const met = avg >= 0.88
      setChallengeSuccess(met)
      setChallengeScore(met ? Math.round(avg * 100) : Math.round(avg * 80))
    }

  }, [currentWeek, driftType, retrainTrigger, lastRetrained, mode])

  const triggerRetrainManual = () => {
    setLastRetrained(currentWeek)
  }

  const resetSimulator = () => {
    setCurrentWeek(1)
    setLastRetrained(null)
    setAccuracyHistory([0.94])
    setChallengeSuccess(false)
  }

  const scenario = {
    title: 'Loan Defaults Feature Drift',
    situation: 'You deployed a credit risk model. Under baseline conditions, accuracy is 94%. After several months in production, interest rates rise and younger applicants enter the market in high volumes, shifting age distributions (feature drift) and dropping model accuracy to 71%.',
    userGoal: 'Keep average accuracy >= 88% across a 45-week deployment by monitoring PSI alerts and triggering model retraining appropriately.',
    coreQuestion: 'How does Population Stability Index (PSI) alert you to retraining needs before accuracy crashes?'
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 space-y-8">
          <BackButton />

          <TopicHeader
            title="Model Drift Monitoring"
            trackTitle="Deployment & Monitoring"
            trackRoute="/tracks/deployment-and-monitoring"
            difficulty="Intermediate"
            estimatedTime="20 mins"
            prerequisites={[{ id: 'deployment-basics', title: 'Deployment Basics', route: '/modules/deployment-basics' }]}
            paths={[{ id: 'production-ai', title: 'Production AI', route: '/learning-paths/production-ai' }]}
          />

          <SimulatorShell
            scenario={scenario}
            mode={mode}
            onModeChange={(newMode) => {
              setMode(newMode)
              resetSimulator()
              if (newMode === 'Challenge') {
                setDriftType('Gradual')
              }
            }}
            challengeInstructions={
              <ul className="list-disc pl-4 space-y-1 mt-1 font-medium">
                <li>Under **Gradual Drift**, slide the **Simulate Week** up to week **45**.</li>
                <li>Monitor **PSI Alerts** and retrain when it spikes.</li>
                <li>Keep the **Average accuracy &gt;= 88%** to pass the challenge.</li>
              </ul>
            }
            challengeTarget="Avg Acc >= 88% at Week 45"
            challengeCurrent={`Avg Acc: ${(accuracyHistory.reduce((a,b)=>a+b,0)/accuracyHistory.length * 100).toFixed(0)}% (Week ${currentWeek})`}
            challengeSuccess={challengeSuccess}
            challengeScore={challengeScore}
            onRetry={resetSimulator}
            guidedInstructions={
              <div className="space-y-3 font-medium">
                {guidedStep === 1 && (
                  <>
                    <p>👋 **Step 1:** Turn on **Gradual Drift** so features shift over time, mimicking market changes.</p>
                    <button 
                      onClick={() => {
                        setDriftType('Gradual')
                        setGuidedStep(2)
                      }}
                      className="px-3 py-1 bg-indigo-600 text-white rounded text-xs font-bold"
                    >
                      Turn on Gradual Drift
                    </button>
                  </>
                )}
                {guidedStep === 2 && (
                  <>
                    <p>👍 **Step 2:** Slide **Timeline to Week 20** to let drift accumulate. Observe PSI turning red.</p>
                    <input 
                      type="range" min="1" max="45" step="1" value={currentWeek}
                      onChange={(e) => {
                        setCurrentWeek(parseInt(e.target.value))
                        if (parseInt(e.target.value) >= 20) setGuidedStep(3)
                      }}
                      className="w-full mt-1 cursor-pointer accent-indigo-600"
                    />
                  </>
                )}
                {guidedStep === 3 && (
                  <>
                    <p>🔥 **Step 3:** PSI is above 0.20, meaning features drifted significantly. Click **Retrain Model** to adapt to the new age cohort.</p>
                    <button 
                      onClick={() => {
                        triggerRetrainManual()
                        setGuidedStep(4)
                      }}
                      className="px-3 py-1 bg-indigo-600 text-white rounded text-xs font-bold"
                    >
                      Retrain Model Now
                    </button>
                  </>
                )}
                {guidedStep === 4 && (
                  <p>🎉 Excellent! Accuracy recovered to 93%! You learned how tracking the **PSI** lets you preemptively retrain before prediction accuracy crashes!</p>
                )}
              </div>
            }
            controlsPanel={
              <div className="space-y-6 font-medium">
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-wider">Simulate Timeline</label>
                    <span className="text-sm font-bold text-slate-800">Week {currentWeek}</span>
                  </div>
                  <input
                    type="range" min="1" max="45" step="1"
                    value={currentWeek}
                    onChange={(e) => setCurrentWeek(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-slate-800"
                  />
                </div>

                <div>
                  <label className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-2">Drift Type</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['None', 'Gradual', 'Sudden'] as const).map((d) => (
                      <button
                        key={d}
                        onClick={() => {
                          setDriftType(d)
                          resetSimulator()
                        }}
                        disabled={mode === 'Guided' || mode === 'Challenge'}
                        className={`py-2 rounded-xl text-xs font-bold border transition-colors ${
                          driftType === d
                            ? 'bg-slate-900 text-white border-slate-900'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-2">Retraining Trigger</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['Manual', 'Auto'] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => {
                          setRetrainTrigger(t)
                          if (t === 'Auto') resetSimulator()
                        }}
                        className={`py-2 rounded-xl text-xs font-bold border transition-colors ${
                          retrainTrigger === t
                            ? 'bg-slate-900 text-white border-slate-900'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {t === 'Manual' ? 'Manual Retrain' : 'Auto Retrain (PSI)'}
                      </button>
                    ))}
                  </div>
                </div>

                {retrainTrigger === 'Manual' && (
                  <button
                    onClick={triggerRetrainManual}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-bold shadow-md shadow-emerald-50 transition-colors"
                  >
                    Retrain Model Now
                  </button>
                )}
              </div>
            }
            resultsPanel={
              <div className="space-y-6 font-semibold flex-1 flex flex-col justify-between">
                {/* Accuracy timeline chart simulation */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex-1 min-h-[160px] flex flex-col justify-between">
                  <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <span>Accuracy Over Time (Timeline)</span>
                    <span className="text-indigo-600">Current: {(accuracy * 100).toFixed(0)}%</span>
                  </div>

                  <div className="flex items-end space-x-1 h-24 pt-4 border-b border-slate-200">
                    {accuracyHistory.map((val, idx) => (
                      <div
                        key={idx}
                        className={`flex-1 rounded-t transition-all ${
                          val > 0.85 ? 'bg-emerald-400' : val > 0.75 ? 'bg-amber-400' : 'bg-rose-400'
                        }`}
                        style={{ height: `${val * 100}%` }}
                        title={`Week ${idx + 1}: ${(val * 100).toFixed(0)}%`}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between text-[9px] text-slate-400 pt-1 font-mono">
                    <span>Week 1</span>
                    <span>Week {currentWeek}</span>
                  </div>
                </div>

                {/* PSI gauge */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center justify-center p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                      Population Stability Index (PSI)
                    </span>
                    <span className="text-xl font-extrabold text-slate-800">{psi.toFixed(3)}</span>
                    <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded mt-1.5 ${
                      psi > 0.20 ? 'bg-rose-100 text-rose-700' : psi > 0.10 ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {psi > 0.20 ? 'High Drift' : psi > 0.10 ? 'Moderate Drift' : 'Minimal Drift'}
                    </span>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col justify-between text-xs text-slate-600">
                    <div>
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block mb-1">Alert Logs</span>
                      {psi > 0.20 ? (
                        <div className="text-rose-600 font-bold">⚠️ PSI Critical Warning! Feature age distribution shifted significantly. Retraining advised.</div>
                      ) : lastRetrained === currentWeek ? (
                        <div className="text-emerald-600 font-bold">✅ Model retrained successfully at week {currentWeek}. Baseline restored.</div>
                      ) : (
                        <div className="text-slate-400 italic">No warnings active. Model monitoring running normal.</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            }
            explanationPanel={
              <ul className="list-disc pl-4 space-y-1">
                <li>**Feature Drift:** Occurs when input distributions (e.g. buyer demographics) change over time. The model's boundaries no longer map to correct targets.</li>
                <li>**PSI (Population Stability Index):** Measures differences between a baseline distribution and a target validation set. Values &gt; 0.20 signal severe drift.</li>
                <li>**Retraining:** Re-running fitting loops on newly collected, labeled production records aligns decision weights to fresh market conditions.</li>
              </ul>
            }
          />
        </div>
      </main>

      <Footer />
    </div>
  )
}
