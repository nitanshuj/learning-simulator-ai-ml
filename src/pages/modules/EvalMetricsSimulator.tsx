import React, { useState, useEffect } from 'react'
import { Navbar, Footer, BackButton, TopicHeader, SimulatorShell } from '@/components'

export const EvalMetricsSimulator: React.FC = () => {
  const [mode, setMode] = useState<'Guided' | 'Explore' | 'Challenge'>('Guided')

  // Controls
  const [threshold, setThreshold] = useState(0.5)
  const [prevalence, setPrevalence] = useState(0.05) // 5% base rate


  // Metrics
  const [precision, setPrecision] = useState(0.7)
  const [recall, setRecall] = useState(0.8)
  const [f1, setF1] = useState(0.75)
  const [accuracy, setAccuracy] = useState(0.95)
  const [totalCost, setTotalCost] = useState(15000)

  // Guided step
  const [guidedStep, setGuidedStep] = useState(1)

  // Challenge metrics
  const [challengeSuccess, setChallengeSuccess] = useState(false)
  const [challengeScore, setChallengeScore] = useState(0)

  useEffect(() => {
    // Simulated patient size
    const totalPatients = 1000
    const sickPatients = Math.round(totalPatients * prevalence)
    const healthyPatients = totalPatients - sickPatients

    // Recall represents sensitivity. As threshold drops, recall goes up.
    const sensitivity = Math.max(0.02, Math.min(0.99, 1.0 - Math.pow(threshold, 1.8)))
    // Specificity represents healthy correctly predicted. As threshold goes up, specificity goes up (FPs drop, precision goes up).
    const specificity = Math.max(0.02, Math.min(0.99, Math.pow(threshold, 0.6)))

    const tp = Math.round(sickPatients * sensitivity)
    const fn = sickPatients - tp
    const fp = Math.round(healthyPatients * (1 - specificity))
    const tn = healthyPatients - fp

    const prec = tp + fp > 0 ? tp / (tp + fp) : 0
    const rec = tp + fn > 0 ? tp / (tp + fn) : 0
    const calculatedF1 = prec + rec > 0 ? (2 * prec * rec) / (prec + rec) : 0
    const acc = (tp + tn) / totalPatients

    // Cost calculations
    // False negative costs massive ($5,000 each - missed diagnosis)
    // False positive costs minor ($150 each - extra test required)
    const fnCost = fn * 5000
    const fpCost = fp * 150
    const costTotal = fnCost + fpCost

    setPrecision(prec)
    setRecall(rec)
    setF1(calculatedF1)
    setAccuracy(acc)
    setTotalCost(costTotal)

    // Challenge target: Minimize total cost to under $4,000
    if (mode === 'Challenge') {
      const metTarget = costTotal < 4000
      setChallengeSuccess(metTarget)
      
      let score = 0
      if (metTarget) {
        score = Math.round(100 - (costTotal / 150)) // lower cost = higher score
      } else {
        score = Math.round(Math.max(0, 100 - (costTotal / 300)))
      }
      setChallengeScore(Math.min(100, Math.max(0, score)))
    }
  }, [threshold, prevalence, mode])

  const scenario = {
    title: 'Oncology Screening Optimization',
    situation: 'You are deploying a breast cancer classification screening model. Currently, the default decision threshold is 0.50. You discover that the model misses 40% of positive cases. In medicine, a False Negative (missed tumor) carries a massive cost, whereas a False Positive only requires a harmless follow-up scan.',
    userGoal: 'Tune the probability threshold to minimize the medical and financial cost of diagnostic errors. Get total diagnostic penalty cost below $4,000.',
    coreQuestion: 'How does setting threshold boundaries change the diagnostic cost of classification errors?'
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 space-y-8">
          <BackButton />

          <TopicHeader
            title="Model Evaluation Metrics"
            trackTitle="Model Evaluation"
            trackRoute="/tracks/model-evaluation"
            difficulty="Beginner"
            estimatedTime="15 mins"
            prerequisites={[{ id: 'logistic-regression', title: 'Logistic Regression', route: '/logisticregression' }]}
            paths={[{ id: 'beginner-ml', title: 'Beginner ML', route: '/learning-paths/beginner-ml' }]}
          />

          <SimulatorShell
            scenario={scenario}
            mode={mode}
            onModeChange={(newMode) => {
              setMode(newMode)
              if (newMode === 'Challenge') {
                setPrevalence(0.05)
                setThreshold(0.5)
              }
            }}
            challengeInstructions={
              <ul className="list-disc pl-4 space-y-1 mt-1 font-medium">
                <li>Adjust the **Decision Threshold** slider.</li>
                <li>Reduce the **Total Diagnostics Cost** penalty to **under $4,000**.</li>
              </ul>
            }
            challengeTarget="Total Penalty < $4,000"
            challengeCurrent={`Total Penalty: $${totalCost.toLocaleString()}`}
            challengeSuccess={challengeSuccess}
            challengeScore={challengeScore}
            onRetry={() => {
              setThreshold(0.5)
            }}
            guidedInstructions={
              <div className="space-y-3 font-medium">
                {guidedStep === 1 && (
                  <>
                    <p>👋 **Step 1:** At a threshold of 0.50, we miss several cancer cases (False Negatives), resulting in high costs. Lower the **Threshold to 0.15** to catch more cases.</p>
                    <input 
                      type="range" min="0.05" max="0.95" step="0.05" value={threshold}
                      onChange={(e) => {
                        setThreshold(parseFloat(e.target.value))
                        if (parseFloat(e.target.value) <= 0.20) setGuidedStep(2)
                      }}
                      className="w-full mt-1 cursor-pointer accent-indigo-600"
                    />
                  </>
                )}
                {guidedStep === 2 && (
                  <>
                    <p>👍 **Step 2:** Recall reached ~95%, lowering False Negatives. However, now False Positives increased, creating patient overhead. Raise the **Threshold to 0.25** to balance precision and recall.</p>
                    <input 
                      type="range" min="0.05" max="0.95" step="0.05" value={threshold}
                      onChange={(e) => {
                        setThreshold(parseFloat(e.target.value))
                        if (parseFloat(e.target.value) >= 0.20 && parseFloat(e.target.value) <= 0.30) setGuidedStep(3)
                      }}
                      className="w-full mt-1 cursor-pointer accent-indigo-600"
                    />
                  </>
                )}
                {guidedStep === 3 && (
                  <p>🎉 Excellent! By setting the threshold to ~0.25, you minimized False Negatives (saving lives) while maintaining acceptable false alarms, driving down total risk costs!</p>
                )}
              </div>
            }
            controlsPanel={
              <div className="space-y-6 font-medium">
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-wider">Decision Threshold</label>
                    <span className="text-sm font-bold text-slate-800">{threshold.toFixed(2)}</span>
                  </div>
                  <input
                    type="range" min="0.05" max="0.95" step="0.05"
                    value={threshold}
                    disabled={mode === 'Guided' && guidedStep === 3}
                    onChange={(e) => setThreshold(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-slate-800"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-wider">Disease Prevalence</label>
                    <span className="text-sm font-bold text-slate-800">{(prevalence * 100).toFixed(0)}%</span>
                  </div>
                  <input
                    type="range" min="0.01" max="0.15" step="0.01"
                    value={prevalence}
                    disabled={mode === 'Guided'}
                    onChange={(e) => setPrevalence(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-slate-800"
                  />
                </div>
              </div>
            }
            resultsPanel={
              <div className="space-y-6 font-semibold">
                {/* Metric grid */}
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">Precision</span>
                    <span className="text-sm font-bold text-slate-800">{(precision * 100).toFixed(0)}%</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block text-indigo-600">Recall</span>
                    <span className="text-sm font-bold text-indigo-600">{(recall * 100).toFixed(0)}%</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">F1 Score</span>
                    <span className="text-sm font-bold text-slate-800">{(f1 * 100).toFixed(0)}%</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">Accuracy</span>
                    <span className="text-sm font-bold text-slate-800">{(accuracy * 100).toFixed(0)}%</span>
                  </div>
                </div>

                {/* Cost Scorecard */}
                <div className="bg-rose-50 border border-rose-100 rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest block">Total Diagnostic Penalty Cost</span>
                    <span className="text-2xl font-extrabold text-rose-800">${totalCost.toLocaleString()}</span>
                  </div>
                  <div className="text-[10px] font-bold text-rose-600 space-y-0.5 text-right font-mono">
                    <div>False Neg: $5,000 / case</div>
                    <div>False Pos: $150 / case</div>
                  </div>
                </div>
              </div>
            }
            explanationPanel={
              <ul className="list-disc pl-4 space-y-1">
                <li>**Threshold:** The probability boundary above which patient is classified as positive. Lowering this makes the model flag cases more aggressively, raising recall (sensitivity) but lowering precision (specificity).</li>
                <li>**Cost-Sensitive Tuning:** By matching classifier threshold probabilities to external business or medical penalties, we optimize actual output utility rather than abstract statistical accuracy.</li>
              </ul>
            }
          />
        </div>
      </main>

      <Footer />
    </div>
  )
}
