import React, { useState, useEffect } from 'react'
import { Navbar, Footer, BackButton, TopicHeader, SimulatorShell } from '@/components'

export const TreeVsForestSimulator: React.FC = () => {
  const [mode, setMode] = useState<'Guided' | 'Explore' | 'Challenge'>('Guided')

  // Controls
  const [maxDepth, setMaxDepth] = useState(5)
  const [numTrees, setNumTrees] = useState(10)
  const [noise, setNoise] = useState<'Low' | 'Medium' | 'High'>('Medium')


  // Outputs
  const [treeTrainAcc, setTreeTrainAcc] = useState(0.9)
  const [treeTestAcc, setTreeTestAcc] = useState(0.8)
  const [forestTrainAcc, setForestTrainAcc] = useState(0.95)
  const [forestTestAcc, setForestTestAcc] = useState(0.85)

  // Guided step
  const [guidedStep, setGuidedStep] = useState(1)

  // Challenge metrics
  const [challengeSuccess, setChallengeSuccess] = useState(false)
  const [challengeScore, setChallengeScore] = useState(0)

  useEffect(() => {
    // Noise penalty
    const noiseVal = noise === 'Low' ? 0.02 : noise === 'Medium' ? 0.08 : 0.18

    // Tree simulation logic
    // Deep trees overfit
    const treeOverfit = Math.max(0, (maxDepth - 4) * 0.02)
    const computedTreeTrain = Math.min(1.0, 0.82 + maxDepth * 0.02 - noiseVal * 0.2)
    const computedTreeTest = Math.max(0.5, 0.80 + Math.min(maxDepth, 4) * 0.02 - treeOverfit - noiseVal * 0.8)

    // Forest simulation logic
    // More trees reduce variance/overfitting
    const forestBenefit = Math.min(0.08, Math.log10(numTrees) * 0.04)
    const computedForestTrain = Math.min(1.0, 0.85 + maxDepth * 0.022 - noiseVal * 0.1)
    const computedForestTest = Math.max(0.5, 0.83 + Math.min(maxDepth, 6) * 0.015 - Math.max(0, (maxDepth - 6) * 0.005) + forestBenefit - noiseVal * 0.3)

    setTreeTrainAcc(computedTreeTrain)
    setTreeTestAcc(computedTreeTest)
    setForestTrainAcc(computedForestTrain)
    setForestTestAcc(computedForestTest)

    // Challenge condition: Under High Noise, get Forest Test Acc >= 83%
    if (mode === 'Challenge') {
      const isHighNoise = noise === 'High'
      const metGoal = isHighNoise && computedForestTest >= 0.82
      setChallengeSuccess(metGoal)
      setChallengeScore(metGoal ? Math.round(computedForestTest * 100) : Math.round(computedForestTest * 80))
    }
  }, [maxDepth, numTrees, noise, mode])

  const scenario = {
    title: 'Customer Churn Noise Control',
    situation: 'Your customer churn dataset is filled with noisy markers (accidental clicks, random events). A single deep Decision Tree keeps overfitting (memorizing the noise), causing poor accuracy on new monthly cohorts.',
    userGoal: 'Configure a Random Forest to achieve at least 82% Test Accuracy under High Noise dataset conditions.',
    coreQuestion: 'How does bagging in Random Forest prevent overfitting compared to a single Decision Tree?'
  }


  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 space-y-8">
          <BackButton />

          <TopicHeader
            title="Decision Tree vs Random Forest"
            trackTitle="Model Training"
            trackRoute="/tracks/model-training"
            difficulty="Intermediate"
            estimatedTime="20 mins"
            prerequisites={[{ id: 'decision-tree', title: 'Decision Tree', route: '/decision-tree' }]}
            paths={[{ id: 'intermediate-ml', title: 'Intermediate ML', route: '/learning-paths/intermediate-ml' }]}
          />

          <SimulatorShell
            scenario={scenario}
            mode={mode}
            onModeChange={(newMode) => {
              setMode(newMode)
              if (newMode === 'Challenge') {
                setNoise('High')
                setMaxDepth(12)
                setNumTrees(2)
              }
            }}
            challengeInstructions={
              <ul className="list-disc pl-4 space-y-1 mt-1 font-medium">
                <li>Set **Noise Level** to **High**.</li>
                <li>Tune **Max Depth** and **Number of Trees** to achieve **Test Accuracy &gt;= 82%** on the Random Forest.</li>
              </ul>
            }
            challengeTarget="Forest Test Acc >= 82% at High Noise"
            challengeCurrent={`Forest Test Acc: ${(forestTestAcc * 100).toFixed(0)}%`}
            challengeSuccess={challengeSuccess}
            challengeScore={challengeScore}
            onRetry={() => {
              setNoise('High')
              setMaxDepth(12)
              setNumTrees(2)
            }}
            guidedInstructions={
              <div className="space-y-3 font-medium">
                {guidedStep === 1 && (
                  <>
                    <p>👋 **Step 1:** Set the **Max Depth to 12** with **Medium Noise**. Notice the Decision Tree Train Acc goes to ~96% but Test Acc drops to ~70%. This is overfitting! Lower depth to **5**.</p>
                    <input 
                      type="range" min="1" max="15" step="1" value={maxDepth}
                      onChange={(e) => {
                        setMaxDepth(parseInt(e.target.value))
                        if (parseInt(e.target.value) <= 5) setGuidedStep(2)
                      }}
                      className="w-full mt-1 cursor-pointer accent-indigo-600"
                    />
                  </>
                )}
                {guidedStep === 2 && (
                  <>
                    <p>👍 **Step 2:** Reducing depth helped both models generalise. Now let's see the power of ensembles. Increase the **Number of Trees in Forest to 80** to average out predictions.</p>
                    <input 
                      type="range" min="1" max="150" step="5" value={numTrees}
                      onChange={(e) => {
                        setNumTrees(parseInt(e.target.value))
                        if (parseInt(e.target.value) >= 80) setGuidedStep(3)
                      }}
                      className="w-full mt-1 cursor-pointer accent-indigo-600"
                    />
                  </>
                )}
                {guidedStep === 3 && (
                  <p>🎉 Excellent! Under noise, Random Forests reduce model variance through bootstrap aggregating (bagging), keeping test accuracy high while Decision Trees collapse!</p>
                )}
              </div>
            }
            controlsPanel={
              <div className="space-y-6 font-medium">
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-wider">Max Tree Depth</label>
                    <span className="text-sm font-bold text-slate-800">{maxDepth}</span>
                  </div>
                  <input
                    type="range" min="1" max="15" step="1"
                    value={maxDepth}
                    disabled={mode === 'Guided' && guidedStep === 1 && maxDepth <= 5}
                    onChange={(e) => setMaxDepth(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-slate-800"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-wider">Number of Trees (Forest)</label>
                    <span className="text-sm font-bold text-slate-800">{numTrees}</span>
                  </div>
                  <input
                    type="range" min="1" max="150" step="5"
                    value={numTrees}
                    disabled={mode === 'Guided' && guidedStep < 2}
                    onChange={(e) => setNumTrees(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-slate-800"
                  />
                </div>

                <div>
                  <label className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-2">Dataset Noise Level</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['Low', 'Medium', 'High'] as const).map((n) => (
                      <button
                        key={n}
                        onClick={() => setNoise(n)}
                        disabled={mode === 'Guided'}
                        className={`py-2 rounded-xl text-xs font-bold border transition-colors ${
                          noise === n
                            ? 'bg-slate-900 text-white border-slate-900'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            }
            resultsPanel={
              <div className="space-y-6 font-semibold">
                {/* Accuracy Charts Comparison */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Decision Tree Card */}
                  <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-4">
                    <div className="text-center">
                      <span className="text-2xl">🌳</span>
                      <h4 className="text-sm font-bold text-slate-800 mt-1">Single Decision Tree</h4>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-xs font-bold text-slate-400 uppercase mb-1">
                          <span>Train Acc</span>
                          <span>{(treeTrainAcc * 100).toFixed(0)}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full bg-slate-800 rounded-full" style={{ width: `${treeTrainAcc * 100}%` }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs font-bold text-slate-400 uppercase mb-1">
                          <span>Test Acc</span>
                          <span className="text-indigo-600">{(treeTestAcc * 100).toFixed(0)}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${treeTestAcc * 100}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Random Forest Card */}
                  <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-4">
                    <div className="text-center">
                      <span className="text-2xl">🌲🌲</span>
                      <h4 className="text-sm font-bold text-slate-800 mt-1">Random Forest Ensemble</h4>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-xs font-bold text-slate-400 uppercase mb-1">
                          <span>Train Acc</span>
                          <span>{(forestTrainAcc * 100).toFixed(0)}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full bg-slate-800 rounded-full" style={{ width: `${forestTrainAcc * 100}%` }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs font-bold text-slate-400 uppercase mb-1">
                          <span>Test Acc</span>
                          <span className="text-emerald-600">{(forestTestAcc * 100).toFixed(0)}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${forestTestAcc * 100}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Overfitting alert indicator */}
                {treeTrainAcc - treeTestAcc > 0.12 && (
                  <div className="bg-rose-50 border border-rose-100 p-4 rounded-2xl flex items-center justify-center space-x-2 text-rose-700 text-xs">
                    <span>⚠️ Warning: Single Decision Tree is severely overfitting to noise (Gap: {Math.round((treeTrainAcc - treeTestAcc) * 100)}%).</span>
                  </div>
                )}
              </div>
            }
            explanationPanel={
              <ul className="list-disc pl-4 space-y-1">
                <li>**Decision Tree:** Recursively splits data partitions until leaf nodes are pure. In noisy conditions, splits represent noise memorization rather than actual generalizable boundaries.</li>
                <li>**Bagging (Bootstrap Aggregation):** Random Forest trains individual trees on random subset samples of the dataset. Averaging their predictions cancels out variance, maintaining high validation accuracy on noisy test sets.</li>
              </ul>
            }
          />
        </div>
      </main>

      <Footer />
    </div>
  )
}
