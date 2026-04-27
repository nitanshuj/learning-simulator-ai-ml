import React, { useState, useMemo } from 'react'
import { Card, Button, Navbar, Footer, BackButton, Quiz, Sidebar } from '@/components'
import { ClassificationPlot } from '@/components/ClassificationPlot'
import { XGBoost, XGBoostState } from '@/simulators'

export const XGBoostModule: React.FC = () => {
  const simulator = useMemo(() => new XGBoost('circles', 5), [])
  const [state, setState] = useState<XGBoostState>(simulator.getState())
  const [datasetName, setDatasetName] = useState('circles')
  const [showQuiz, setShowQuiz] = useState(false)

  const handleParamChange = (params: Partial<XGBoostState>) => {
    simulator.setParams(params)
    setState(simulator.getState())
  }

  const handleDatasetChange = (dataset: string) => {
    simulator.changeDataset(dataset)
    setDatasetName(dataset)
    setState(simulator.getState())
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />
      <Sidebar />
      <div className="lg:pl-72 pt-16">
        <main className="p-6 lg:p-10 max-w-6xl mx-auto space-y-8">
          <BackButton />
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              XGBoost (Extreme Gradient Boosting)
            </h1>
            <p className="text-gray-600 text-lg">
              Optimized gradient boosting with regularization and second-order gradients
            </p>
          </div>

          {/* Explanation Card */}
          <Card title="Why XGBoost Wins" className="bg-orange-50 border-orange-200">
            <div className="space-y-4 text-gray-700">
              <p>
                XGBoost is the industry standard for tabular data. It improves upon traditional Gradient Boosting by adding <strong>Regularization</strong> (to prevent overfitting) and using <strong>Newton Boosting</strong> (second-order derivatives) for faster convergence.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-3 rounded-xl border border-orange-100">
                  <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-1">Additive Trees</p>
                  <p className="text-sm italic">Each tree fixes the errors of the previous ones.</p>
                </div>
                <div className="bg-white p-3 rounded-xl border border-orange-100">
                  <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-1">Similarity Score</p>
                  <p className="text-sm italic">Splits are chosen to maximize the Gain in similarity.</p>
                </div>
                <div className="bg-white p-3 rounded-xl border border-orange-100">
                  <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-1">Pruning</p>
                  <p className="text-sm italic">Controlled by Gamma and Lambda to keep trees simple.</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <ClassificationPlot 
                data={state.data}
                predictProb={(x, y) => simulator.predict(x, y)}
                accuracy={state.accuracy}
                title={`XGBoost Decision Boundary (${state.nEstimators} Trees, Depth ${state.maxDepth})`}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="text-center p-4">
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Training Accuracy</p>
                  <p className="text-2xl font-black text-orange-500">{(state.accuracy * 100).toFixed(1)}%</p>
                </Card>
                <Card className="text-center p-4">
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Learning Rate (Eta)</p>
                  <p className="text-2xl font-black text-indigo-600">{state.learningRate}</p>
                </Card>
              </div>
            </div>

            <div className="space-y-6">
              <Card title="Hyperparameters">
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-2">Estimators (Trees): {state.nEstimators}</label>
                    <input 
                      type="range" min="1" max="20" step="1"
                      className="w-full accent-orange-500"
                      value={state.nEstimators}
                      onChange={(e) => handleParamChange({ nEstimators: parseInt(e.target.value) })}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-2">Learning Rate (Eta): {state.learningRate}</label>
                    <input 
                      type="range" min="0.05" max="1.0" step="0.05"
                      className="w-full accent-orange-500"
                      value={state.learningRate}
                      onChange={(e) => handleParamChange({ learningRate: parseFloat(e.target.value) })}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-2">Max Depth: {state.maxDepth}</label>
                    <input 
                      type="range" min="1" max="6" step="1"
                      className="w-full accent-orange-500"
                      value={state.maxDepth}
                      onChange={(e) => handleParamChange({ maxDepth: parseInt(e.target.value) })}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-2">L2 Regularization (Lambda): {state.lambda}</label>
                    <input 
                      type="range" min="0" max="10" step="0.5"
                      className="w-full accent-orange-500"
                      value={state.lambda}
                      onChange={(e) => handleParamChange({ lambda: parseFloat(e.target.value) })}
                    />
                  </div>
                </div>
              </Card>

              <Card title="Dataset">
                <div className="space-y-2">
                  {['circles', 'moons', 'blobs'].map((ds) => (
                    <button
                      key={ds}
                      onClick={() => handleDatasetChange(ds)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                        datasetName === ds
                          ? 'bg-orange-100 text-orange-700 border border-orange-300'
                          : 'hover:bg-slate-100 text-gray-600'
                      }`}
                    >
                      {ds}
                    </button>
                  ))}
                </div>
                <Button
                  onClick={() => handleDatasetChange(datasetName)}
                  variant="outline"
                  size="sm"
                  className="w-full mt-3 border-dashed border-2 hover:border-orange-500 hover:text-orange-600 transition-all"
                >
                  🔄 Regenerate Current Data
                </Button>
              </Card>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
                <h3 className="font-bold text-gray-800 mb-3">XGBoost Mastery</h3>
                <Button onClick={() => setShowQuiz(true)} variant="primary" className="w-full">Take Quiz</Button>
              </div>
            </div>
          </div>

          {showQuiz && (
            <div className="mt-8">
              <Quiz 
                title="XGBoost Quiz"
                questions={[
                  {
                    id: 'xgb-1',
                    question: 'What does the "Learning Rate" (Eta) do in XGBoost?',
                    options: ['It controls the number of trees', 'It shrinks the contribution of each tree to prevent overfitting', 'It makes the trees grow deeper', 'It increases the training speed'],
                    correct: 1,
                    explanation: 'A lower learning rate makes the model more robust by allowing more trees to contribute small updates, reducing the risk of overfitting.'
                  },
                  {
                    id: 'xgb-2',
                    question: 'How does XGBoost determine the best split?',
                    options: ['By random selection', 'By maximizing the Gain calculated from Similarity Scores', 'By minimizing the depth of the tree', 'By following the path of the nearest neighbor'],
                    correct: 1,
                    explanation: 'XGBoost uses Similarity Scores (derived from gradients and hessians) to calculate the Gain of a potential split.'
                  }
                ]}
              />
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  )
}
