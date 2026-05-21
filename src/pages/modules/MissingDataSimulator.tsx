import React, { useState, useEffect } from 'react'
import { Navbar, Footer, BackButton, TopicHeader, SimulatorShell } from '@/components'


export const MissingDataSimulator: React.FC = () => {
  const [mode, setMode] = useState<'Guided' | 'Explore' | 'Challenge'>('Guided')
  
  // Controls
  const [missingRate, setMissingRate] = useState(0.2)
  const [pattern, setPattern] = useState<'Random' | 'Systematic' | 'Block'>('Random')
  const [imputation, setImputation] = useState<'Drop' | 'Mean' | 'Median' | 'KNN' | 'Forward Fill'>('Drop')
  const [modelType, setModelType] = useState<'Logistic Regression' | 'Decision Tree'>('Logistic Regression')

  // Scores
  const [accuracy, setAccuracy] = useState(0.85)
  const [challengeSuccess, setChallengeSuccess] = useState(false)
  const [challengeScore, setChallengeScore] = useState(0)

  // Guided instructions
  const [guidedStep, setGuidedStep] = useState(1)

  // Simulation run logic
  useEffect(() => {
    // Run simple simulation formula
    let baseAcc = modelType === 'Logistic Regression' ? 0.88 : 0.84
    
    // Penalize based on missing rate and strategy efficiency
    let penalty = 0
    if (imputation === 'Drop') {
      penalty = missingRate * 0.4 // dropping rows hurts a lot as missing rate increases
    } else if (imputation === 'Mean' || imputation === 'Median') {
      penalty = missingRate * 0.15
      if (pattern === 'Systematic') penalty += 0.05 // mean is bad if bias is systematic
    } else if (imputation === 'KNN') {
      penalty = missingRate * 0.05 // KNN is robust
    } else if (imputation === 'Forward Fill') {
      penalty = missingRate * 0.2
      if (pattern === 'Random') penalty += 0.08 // forward fill needs sequence structure
    }

    const finalAcc = Math.max(0.4, baseAcc - penalty)
    setAccuracy(finalAcc)

    // Challenge validation
    if (mode === 'Challenge') {
      // Challenge goal: Get Accuracy >= 83% with at least 30% missing rate
      const success = missingRate >= 0.3 && finalAcc >= 0.80
      setChallengeSuccess(success)
      
      let score = 0
      if (success) {
        score = Math.round((finalAcc * 100) + (missingRate * 25))
      } else {
        score = Math.round(finalAcc * 80)
      }
      setChallengeScore(Math.min(100, score))
    }
  }, [missingRate, pattern, imputation, modelType, mode])

  // Sample medical dataset rows
  const originalData = [
    { id: 1, age: 45, cholesterol: 210, blood_pressure: 130, outcome: 'Healthy' },
    { id: 2, age: 58, cholesterol: 245, blood_pressure: 142, outcome: 'Heart Disease' },
    { id: 3, age: 34, cholesterol: 185, blood_pressure: 118, outcome: 'Healthy' },
    { id: 4, age: 67, cholesterol: 290, blood_pressure: 155, outcome: 'Heart Disease' },
    { id: 5, age: 52, cholesterol: 230, blood_pressure: 128, outcome: 'Healthy' },
  ]

  const getImputedData = () => {
    return originalData.map((row, idx) => {
      let cholesterol: string | number = row.cholesterol
      let blood_pressure: string | number = row.blood_pressure
      let status = 'Original'

      // Introduce artificial missingness based on index/pattern
      const shouldBeMissing = (pattern === 'Random' && idx % 3 === 1 && missingRate > 0.1) ||
                              (pattern === 'Systematic' && row.age > 50 && missingRate > 0.15) ||
                              (pattern === 'Block' && idx >= 3 && missingRate > 0.25)

      if (shouldBeMissing) {
        status = 'Imputed'
        if (imputation === 'Drop') {
          return null
        } else if (imputation === 'Mean') {
          cholesterol = 232 // mean of others
          blood_pressure = 134
        } else if (imputation === 'Median') {
          cholesterol = 230
          blood_pressure = 130
        } else if (imputation === 'KNN') {
          cholesterol = row.age > 50 ? 267 : 197 // KNN uses nearest matches
          blood_pressure = row.age > 50 ? 148 : 124
        } else if (imputation === 'Forward Fill') {
          // get previous row values
          cholesterol = idx > 0 ? originalData[idx - 1].cholesterol : 210
          blood_pressure = idx > 0 ? originalData[idx - 1].blood_pressure : 130
        }
      }

      return { ...row, cholesterol, blood_pressure, status }
    }).filter(Boolean) as any[]
  }

  const imputedRows = getImputedData()

  // Scenario definition
  const scenario = {
    title: 'Hospital Records Missing Lab Values',
    situation: 'You are a healthcare data scientist. A cardiac risk model is failing in production because patient admission records are missing cholesterol and blood pressure readings.',
    userGoal: 'impute values using the best strategy to maximize model accuracy. Try to maintain accuracy even when missingness rate is high.',
    coreQuestion: 'Which imputation strategy is most robust to high data missingness?'
  }



  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 space-y-8">
          <BackButton />

          <TopicHeader
            title="Missing Data Imputation"
            trackTitle="Data Preparation"
            trackRoute="/tracks/data-preparation"
            difficulty="Beginner"
            estimatedTime="15 mins"
            prerequisites={[{ id: 'data-cleaning', title: 'Data Cleaning', route: '/modules/data-cleaning' }]}
            paths={[{ id: 'beginner-ml', title: 'Beginner ML', route: '/learning-paths/beginner-ml' }]}
          />

          <SimulatorShell
            scenario={scenario}
            mode={mode}
            onModeChange={(newMode) => {
              setMode(newMode)
              if (newMode === 'Challenge') {
                setMissingRate(0.3)
                setImputation('Drop')
              }
            }}
            challengeInstructions={
              <ul className="list-disc pl-4 space-y-1 mt-1 font-medium">
                <li>Set **Missing Rate** to **30% (0.30)** or higher.</li>
                <li>Find an Imputation Strategy that achieves at least **80% Accuracy**.</li>
              </ul>
            }
            challengeTarget="Acc >= 80% & Missing Rate >= 30%"
            challengeCurrent={`Acc: ${(accuracy * 100).toFixed(0)}% & Missing Rate: ${(missingRate * 100).toFixed(0)}%`}
            challengeSuccess={challengeSuccess}
            challengeScore={challengeScore}
            onRetry={() => {
              setMissingRate(0.3)
              setImputation('Drop')
            }}
            guidedInstructions={
              <div className="space-y-3 font-medium">
                {guidedStep === 1 && (
                  <>
                    <p>👋 **Step 1:** Observe what happens when missing rate is 20% and we use **Drop Rows** imputation. Note the accuracy.</p>
                    <button 
                      onClick={() => {
                        setImputation('Mean')
                        setGuidedStep(2)
                      }}
                      className="px-3 py-1 bg-indigo-600 text-white rounded text-xs font-bold"
                    >
                      Change to Mean Imputation
                    </button>
                  </>
                )}
                {guidedStep === 2 && (
                  <>
                    <p>👍 **Step 2:** Switching to **Mean Imputation** recovered some accuracy. Now increase the **Missing Rate to 45%** and see performance degrade.</p>
                    <input 
                      type="range" min="0.1" max="0.6" step="0.05" value={missingRate}
                      onChange={(e) => {
                        setMissingRate(parseFloat(e.target.value))
                        setGuidedStep(3)
                      }}
                      className="w-full mt-1 cursor-pointer accent-indigo-600"
                    />
                  </>
                )}
                {guidedStep === 3 && (
                  <>
                    <p>🔥 **Step 3:** At high missing rates, mean/median introduce bias. Try **KNN Imputation** for multi-dimensional similarity mapping.</p>
                    <button 
                      onClick={() => {
                        setImputation('KNN')
                        setGuidedStep(4)
                      }}
                      className="px-3 py-1 bg-indigo-600 text-white rounded text-xs font-bold"
                    >
                      Use KNN Impute
                    </button>
                  </>
                )}
                {guidedStep === 4 && (
                  <p>🎉 Excellent! **KNN Imputer** leverages other patient indicators to estimate missing values, yielding the highest accuracy. Ready to try Explore or Challenge modes!</p>
                )}
              </div>
            }
            controlsPanel={
              <div className="space-y-6 font-medium">
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-wider">Missing Rate</label>
                    <span className="text-sm font-bold text-slate-800">{(missingRate * 100).toFixed(0)}%</span>
                  </div>
                  <input
                    type="range" min="0.05" max="0.60" step="0.05"
                    value={missingRate}
                    disabled={mode === 'Guided' && guidedStep < 2}
                    onChange={(e) => setMissingRate(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-slate-800"
                  />
                </div>

                <div>
                  <label className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-2">Missing Pattern</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['Random', 'Systematic', 'Block'] as const).map((p) => (
                      <button
                        key={p}
                        onClick={() => setPattern(p)}
                        className={`py-2 rounded-xl text-xs font-bold border transition-colors ${
                          pattern === p
                            ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-2">Imputation Strategy</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['Drop', 'Mean', 'Median', 'KNN', 'Forward Fill'] as const).map((imp) => (
                      <button
                        key={imp}
                        onClick={() => setImputation(imp)}
                        disabled={mode === 'Guided'}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors ${
                          imputation === imp
                            ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 disabled:opacity-50'
                        }`}
                      >
                        {imp === 'Drop' ? 'Drop Rows' : `${imp} Impute`}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-2">Model Architecture</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['Logistic Regression', 'Decision Tree'] as const).map((mod) => (
                      <button
                        key={mod}
                        onClick={() => setModelType(mod)}
                        className={`py-2 rounded-xl text-xs font-bold border transition-colors ${
                          modelType === mod
                            ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {mod}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            }
            resultsPanel={
              <div className="space-y-6 font-semibold">
                {/* Accuracy gauge */}
                <div className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Classifier Accuracy</span>
                  <div className="text-4xl font-extrabold text-slate-800">{(accuracy * 100).toFixed(1)}%</div>
                  <div className="w-full max-w-[200px] h-2 bg-slate-200 rounded-full mt-3 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all ${
                        accuracy > 0.82 ? 'bg-emerald-500' : accuracy > 0.70 ? 'bg-amber-500' : 'bg-rose-500'
                      }`}
                      style={{ width: `${accuracy * 100}%` }}
                    />
                  </div>
                </div>

                {/* Table representation */}
                <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                  <table className="min-w-full divide-y divide-slate-200 text-left text-xs">
                    <thead className="bg-slate-50 text-slate-400 font-bold uppercase tracking-wider">
                      <tr>
                        <th className="px-4 py-3">Patient ID</th>
                        <th className="px-4 py-3">Age</th>
                        <th className="px-4 py-3">Cholesterol</th>
                        <th className="px-4 py-3">Blood Pressure</th>
                        <th className="px-4 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {imputedRows.map((row) => (
                        <tr key={row.id}>
                          <td className="px-4 py-3 font-mono">#{row.id}</td>
                          <td className="px-4 py-3">{row.age}</td>
                          <td className="px-4 py-3">
                            <span className={row.status === 'Imputed' ? 'text-indigo-600 font-extrabold' : 'text-slate-800'}>
                              {row.cholesterol}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={row.status === 'Imputed' ? 'text-indigo-600 font-extrabold' : 'text-slate-800'}>
                              {row.blood_pressure}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              row.status === 'Imputed' ? 'bg-indigo-50 text-indigo-700' : 'bg-slate-50 text-slate-600'
                            }`}>
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                      {imputedRows.length < originalData.length && (
                        <tr>
                          <td colSpan={5} className="px-4 py-3 text-center text-rose-500 font-bold italic bg-rose-50/20">
                            {originalData.length - imputedRows.length} rows dropped due to missingness strategy!
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            }
            explanationPanel={
              <ul className="list-disc pl-4 space-y-1">
                <li>**Drop Rows:** Simple but destroys statistical power. When missing rate is high, this drastically reduces training sample size.</li>
                <li>**Mean/Median:** Fills gaps fast, but deflates variance and ignores relationship with other features (like age vs cholesterol).</li>
                <li>**KNN (K-Nearest Neighbors):** Estimates missing fields based on similarities across multiple dimensions, yielding the most calibrated predictions.</li>
              </ul>
            }
          />
        </div>
      </main>

      <Footer />
    </div>
  )
}
