import React, { useState, useMemo } from 'react'
import { Card, Button, Navbar, Footer, BackButton, Quiz, Sidebar } from '@/components'
import { ClassificationPlot } from '@/components/ClassificationPlot'
import { AdaBoost } from '@/simulators'
import type { AdaBoostState } from '@/simulators'

export const AdaBoostModule: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<'visual' | 'theory'>('visual');

  const simulator = useMemo(() => new AdaBoost('moons', 10), [])
  const [state, setState] = useState<AdaBoostState>(simulator.getState())
  const [datasetName, setDatasetName] = useState('moons')
  const [showQuiz, setShowQuiz] = useState(false)

  const handleParamChange = (params: Partial<AdaBoostState>) => {
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
          
          
          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-8 mt-4">
            <button 
              className={`pb-4 px-6 font-medium text-lg border-b-2 transition-colors ${activeTab === 'visual' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('visual')}
            >
              Visual Implementation
            </button>
            <button 
              className={`pb-4 px-6 font-medium text-lg border-b-2 transition-colors ${activeTab === 'theory' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('theory')}
            >
              Theory & Notes
            </button>
          </div>

          <div className={activeTab === 'visual' ? 'block space-y-8' : 'hidden'}>
<div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              AdaBoost (Adaptive Boosting)
            </h1>
            <p className="text-gray-600 text-lg">
              Combining weak learners into a strong classifier through iterative sample weighting
            </p>
          </div>

          {/* Explanation Card */}
          <Card title="The Adaptive Power" className="bg-red-50 border-red-200">
            <div className="space-y-4 text-gray-700">
              <p>
                AdaBoost was the first successful boosting algorithm. It works by training a sequence of <strong>Decision Stumps</strong> (tiny 1-split trees). Each new stump focuses on the samples that the previous stumps <strong>got wrong</strong>.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                <div className="bg-white p-3 rounded-xl border border-red-100">
                  <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-1">Point Weights</p>
                  <p className="text-sm">Misclassified points get higher weights, forcing the next learner to focus on them.</p>
                </div>
                <div className="bg-white p-3 rounded-xl border border-red-100">
                  <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-1">Weighted Voting</p>
                  <p className="text-sm">Better learners (lower error) get a "louder voice" (Alpha) in the final prediction.</p>
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
                title={`AdaBoost Ensemble (${state.nEstimators} Stumps)`}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="text-center p-4">
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Final Accuracy</p>
                  <p className="text-2xl font-black text-red-500">{(state.accuracy * 100).toFixed(1)}%</p>
                </Card>
                <Card className="text-center p-4">
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Model State</p>
                  <p className="text-2xl font-black text-indigo-600">{state.nEstimators > 15 ? 'Complex' : 'Normal'}</p>
                </Card>
              </div>
            </div>

            <div className="space-y-6">
              <Card title="Ensemble Controls">
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-2">Number of Stumps: {state.nEstimators}</label>
                    <input 
                      type="range" min="1" max="50" step="1"
                      className="w-full accent-red-500"
                      value={state.nEstimators}
                      onChange={(e) => handleParamChange({ nEstimators: parseInt(e.target.value) })}
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                      <span>Low Variance</span>
                      <span>Low Bias</span>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Algorithm Note</h4>
                    <p className="text-xs text-slate-600 leading-relaxed italic">
                      "Stumps are like students who each know only one simple rule. AdaBoost is the teacher who combines their knowledge into a genius team."
                    </p>
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
                          ? 'bg-red-100 text-red-700 border border-red-300'
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
                  className="w-full mt-3 border-dashed border-2 hover:border-red-500 hover:text-red-600 transition-all"
                >
                  🔄 Regenerate Current Data
                </Button>
              </Card>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
                <h3 className="font-bold text-gray-800 mb-3">AdaBoost Challenge</h3>
                <Button onClick={() => setShowQuiz(true)} variant="primary" className="w-full">Start Quiz</Button>
              </div>
            </div>
          </div>

          {showQuiz && (
            <div className="mt-8">
              <Quiz 
                title="AdaBoost Mastery Quiz"
                questions={[
                  {
                    id: 'ada-1',
                    question: 'What is a "Decision Stump"?',
                    options: ['A full-grown decision tree', 'A tree with only one split (depth 1)', 'A point in the dataset', 'A type of regularization'],
                    correct: 1,
                    explanation: 'A decision stump is a decision tree with only one level of splitting, making it a very "weak" learner.'
                  },
                  {
                    id: 'ada-2',
                    question: 'How does AdaBoost handle misclassified points?',
                    options: ['It removes them from the dataset', 'It increases their weight for the next round', 'It decreases their weight', 'It ignores them'],
                    correct: 1,
                    explanation: 'By increasing the weights of misclassified points, AdaBoost forces the next weak learner to focus more on those hard-to-classify examples.'
                  }
                ]}
              />
            </div>
          )}
          </div>
          
          <div className={activeTab === 'theory' ? 'block' : 'hidden'}>
            <div className="bg-white p-12 rounded-3xl border border-gray-200 shadow-sm min-h-[400px] flex items-center justify-center">
              <p className="text-gray-400 text-xl font-medium">Theory and Notes coming soon...</p>
            </div>
          </div>

        </main>
      </div>
      <Footer />
    </div>
  )
}
