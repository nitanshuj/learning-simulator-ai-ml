import React, { useState, useEffect } from 'react'
import { Navbar, Footer, BackButton, TopicHeader, SimulatorShell } from '@/components'


export const ClassImbalanceSimulator: React.FC = () => {
  const [mode, setMode] = useState<'Guided' | 'Explore' | 'Challenge'>('Guided')

  // Controls
  const [fraudRate, setFraudRate] = useState(0.02) // 2% fraud cases
  const [threshold, setThreshold] = useState(0.5)
  const [resampling, setResampling] = useState<'None' | 'SMOTE' | 'Undersample' | 'Oversample'>('None')

  // Output stats
  const [precision, setPrecision] = useState(0)
  const [recall, setRecall] = useState(0)
  const [f1, setF1] = useState(0)

  // Guided instructions step
  const [guidedStep, setGuidedStep] = useState(1)

  // Success indicator for challenge
  const [challengeSuccess, setChallengeSuccess] = useState(false)
  const [challengeScore, setChallengeScore] = useState(0)

  // Standard simulation logic
  useEffect(() => {
    // Generate simulated confusion matrix
    const totalTransactions = 1000
    const actualFraud = Math.round(totalTransactions * fraudRate)
    const actualLegit = totalTransactions - actualFraud

    // base logic: classifier is heavily biased towards majority class
    // unless resampling is applied or threshold is lowered.
    let baseSensitivity = 0.1 // baseline recall is very low
    let baseSelectivity = 0.995 // precision is high but recall is terrible

    if (resampling === 'SMOTE') {
      baseSensitivity = 0.75
      baseSelectivity = 0.94
    } else if (resampling === 'Oversample') {
      baseSensitivity = 0.65
      baseSelectivity = 0.90
    } else if (resampling === 'Undersample') {
      baseSensitivity = 0.85
      baseSelectivity = 0.70 // undersampling destroys precision
    }

    // Apply threshold modification
    // lowering threshold increases sensitivity (recall) but decreases precision (selectivity)
    const thresholdFactor = (0.5 - threshold) * 2 // ranges from -1 to 1
    const finalRecall = Math.max(0.01, Math.min(0.99, baseSensitivity + thresholdFactor * 0.25))
    const finalPrecision = Math.max(0.01, Math.min(0.99, baseSelectivity - thresholdFactor * 0.35))

    const tp = Math.round(actualFraud * finalRecall)
    const fn = actualFraud - tp
    const fp = Math.round(actualLegit * (1 - finalPrecision))


    const calcPrec = tp + fp > 0 ? tp / (tp + fp) : 0
    const calcRec = tp + fn > 0 ? tp / (tp + fn) : 0
    const calcF1 = calcPrec + calcRec > 0 ? (2 * calcPrec * calcRec) / (calcPrec + calcRec) : 0

    setPrecision(calcPrec)
    setRecall(calcRec)
    setF1(calcF1)

    // Challenge condition: Get F1 >= 70% with fraud rate = 2%
    if (mode === 'Challenge') {
      const success = fraudRate <= 0.03 && calcF1 >= 0.70
      setChallengeSuccess(success)
      setChallengeScore(success ? Math.round(calcF1 * 100) : Math.round(calcF1 * 80))
    }
  }, [fraudRate, threshold, resampling, mode])

  const scenario = {
    title: 'Credit Card Fraud Alerts',
    situation: 'You are working for a bank. Your fraud detection classifier reports a 98% accuracy score. However, actual fraud is only 2% of the dataset, and the model currently flags 0 fraudulent transactions, causing major financial losses.',
    userGoal: 'Use resampling and adjust the probability decision threshold to catch at least 70% of fraudulent charges while maintaining reasonable precision.',
    coreQuestion: 'How do resampling methods and threshold values impact precision-recall tradeoff?'
  }

  // Matrix values
  const total = 1000
  const actualFraud = Math.round(total * fraudRate)
  const actualLegit = total - actualFraud
  const tp = Math.round(actualFraud * recall)
  const fn = actualFraud - tp
  const fp = Math.round(actualLegit * (1 - (precision > 0 ? (tp / (precision * actualLegit)) : 0.99))) // approximate fp
  const tn = actualLegit - fp

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 space-y-8">
          <BackButton />

          <TopicHeader
            title="Class Imbalance & Resampling"
            trackTitle="Model Training"
            trackRoute="/tracks/model-training"
            difficulty="Intermediate"
            estimatedTime="15 mins"
            prerequisites={[{ id: 'random-forest', title: 'Random Forest', route: '/random-forest' }]}
            paths={[{ id: 'intermediate-ml', title: 'Intermediate ML', route: '/learning-paths/intermediate-ml' }]}
          />

          <SimulatorShell
            scenario={scenario}
            mode={mode}
            onModeChange={(newMode) => {
              setMode(newMode)
              if (newMode === 'Challenge') {
                setFraudRate(0.02)
                setResampling('None')
                setThreshold(0.5)
              }
            }}
            challengeInstructions={
              <ul className="list-disc pl-4 space-y-1 mt-1 font-medium">
                <li>Set **Fraud Rate** to **2% (0.02)**.</li>
                <li>Find a combination of Resampling and Threshold to achieve an **F1-Score &gt;= 70%**.</li>
              </ul>
            }
            challengeTarget="F1-Score >= 70% at 2% Fraud"
            challengeCurrent={`F1-Score: ${(f1 * 100).toFixed(0)}%`}
            challengeSuccess={challengeSuccess}
            challengeScore={challengeScore}
            onRetry={() => {
              setResampling('None')
              setThreshold(0.5)
            }}
            guidedInstructions={
              <div className="space-y-3 font-medium">
                {guidedStep === 1 && (
                  <>
                    <p>👋 **Step 1:** With threshold at 0.50 and no resampling, observe the **Recall is 10% or lower**. The model misses almost all fraud. Click to apply **SMOTE resampling** to generate synthetic fraud points.</p>
                    <button 
                      onClick={() => {
                        setResampling('SMOTE')
                        setGuidedStep(2)
                      }}
                      className="px-3 py-1 bg-indigo-600 text-white rounded text-xs font-bold"
                    >
                      Apply SMOTE Resampling
                    </button>
                  </>
                )}
                {guidedStep === 2 && (
                  <>
                    <p>👍 **Step 2:** SMOTE immediately raised recall and improved the **F1-Score**. Now lower the **Threshold to 0.35** to predict fraud more aggressively.</p>
                    <input 
                      type="range" min="0.1" max="0.9" step="0.05" value={threshold}
                      onChange={(e) => {
                        setThreshold(parseFloat(e.target.value))
                        setGuidedStep(3)
                      }}
                      className="w-full mt-1 cursor-pointer accent-indigo-600"
                    />
                  </>
                )}
                {guidedStep === 3 && (
                  <p>🎉 Excellent! By combining **SMOTE** (balancing representations) and a **lower threshold** (accepting slight false alarms to block transactions), you achieved a balanced fraud detection profile!</p>
                )}
              </div>
            }
            controlsPanel={
              <div className="space-y-6 font-medium">
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-wider">Fraud Base Rate</label>
                    <span className="text-sm font-bold text-slate-800">{(fraudRate * 100).toFixed(0)}%</span>
                  </div>
                  <input
                    type="range" min="0.01" max="0.15" step="0.01"
                    value={fraudRate}
                    disabled={mode === 'Guided'}
                    onChange={(e) => setFraudRate(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-slate-800"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-wider">Decision Threshold</label>
                    <span className="text-sm font-bold text-slate-800">{threshold.toFixed(2)}</span>
                  </div>
                  <input
                    type="range" min="0.15" max="0.85" step="0.05"
                    value={threshold}
                    disabled={mode === 'Guided' && guidedStep === 1}
                    onChange={(e) => setThreshold(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-slate-800"
                  />
                </div>

                <div>
                  <label className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-2">Resampling Strategy</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['None', 'SMOTE', 'Undersample', 'Oversample'] as const).map((r) => (
                      <button
                        key={r}
                        onClick={() => setResampling(r)}
                        disabled={mode === 'Guided'}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors ${
                          resampling === r
                            ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {r === 'None' ? 'No Resampling' : r}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            }
            resultsPanel={
              <div className="space-y-6 font-semibold">
                {/* Metric Gauges */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center justify-center p-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Precision</span>
                    <span className="text-xl font-extrabold text-slate-800">{(precision * 100).toFixed(0)}%</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Recall</span>
                    <span className="text-xl font-extrabold text-slate-800">{(recall * 100).toFixed(0)}%</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-3 bg-slate-50 rounded-2xl border border-indigo-100 bg-indigo-50/20">
                    <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-1">F1 Score</span>
                    <span className="text-xl font-extrabold text-indigo-600">{(f1 * 100).toFixed(0)}%</span>
                  </div>
                </div>

                {/* Confusion Matrix Table */}
                <div className="space-y-2">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">Confusion Matrix</h4>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                    <div className="bg-slate-50 font-bold p-3 rounded-xl border border-slate-100 flex items-center justify-center">Actual \ Pred</div>
                    <div className="bg-slate-50 font-bold p-3 rounded-xl border border-slate-100">Predict Legit</div>
                    <div className="bg-slate-50 font-bold p-3 rounded-xl border border-slate-100">Predict Fraud</div>

                    <div className="bg-slate-50 font-bold p-3 rounded-xl border border-slate-100 flex items-center justify-center">Actual Legit</div>
                    <div className="bg-emerald-50 text-emerald-800 border border-emerald-100 p-3 rounded-xl">
                      <span className="block font-bold">{tn}</span>
                      <span className="text-[9px] uppercase font-black text-emerald-600">True Neg</span>
                    </div>
                    <div className="bg-rose-50 text-rose-800 border border-rose-100 p-3 rounded-xl">
                      <span className="block font-bold">{fp}</span>
                      <span className="text-[9px] uppercase font-black text-rose-600">False Pos</span>
                    </div>

                    <div className="bg-slate-50 font-bold p-3 rounded-xl border border-slate-100 flex items-center justify-center">Actual Fraud</div>
                    <div className="bg-rose-50 text-rose-800 border border-rose-100 p-3 rounded-xl">
                      <span className="block font-bold">{fn}</span>
                      <span className="text-[9px] uppercase font-black text-rose-600">False Neg</span>
                    </div>
                    <div className="bg-emerald-50 text-emerald-800 border border-emerald-100 p-3 rounded-xl">
                      <span className="block font-bold">{tp}</span>
                      <span className="text-[9px] uppercase font-black text-emerald-600">True Pos</span>
                    </div>
                  </div>
                </div>
              </div>
            }
            explanationPanel={
              <ul className="list-disc pl-4 space-y-1">
                <li>**SMOTE:** Synthesizes minority cases (fraud) using nearest neighbor vectors, teaching models structural differences instead of ignoring fraud.</li>
                <li>**Undersampling:** Throws away majority cases (legitimate). Drastically speeds up training but compromises precision (leads to false alarms).</li>
                <li>**Threshold Tuning:** Modifying decision margins lets you prioritize catching all fraud (recall) vs minimizing customer friction (precision).</li>
              </ul>
            }
          />
        </div>
      </main>

      <Footer />
    </div>
  )
}
