import React, { useState, useMemo } from 'react'
import { Card, Button, Navbar, Footer, BackButton, Quiz, Sidebar } from '@/components'
import { ClassificationPlot } from '@/components/ClassificationPlot'
import { CatBoost } from '@/simulators'
import type { CatBoostState } from '@/simulators'

export const CatBoostModule: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<'visual' | 'theory'>('visual');

  const simulator = useMemo(() => new CatBoost('circles', 5), [])
  const [state, setState] = useState<CatBoostState>(simulator.getState())
  const [datasetName, setDatasetName] = useState('circles')
  const [showQuiz, setShowQuiz] = useState(false)

  const handleParamChange = (params: Partial<CatBoostState>) => {
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
              CatBoost (Categorical Boosting)
            </h1>
            <p className="text-gray-600 text-lg">
              High-performance gradient boosting using symmetric "oblivious" decision trees
            </p>
          </div>

          {/* Explanation Card */}
          <Card title="The Symmetric Secret" className="bg-purple-50 border-purple-200">
            <div className="space-y-4 text-gray-700">
              <p>
                CatBoost is famous for its speed and handling of categorical data. Its core innovation is <strong>Symmetric Trees</strong> (also known as oblivious trees). Unlike normal trees, symmetric trees use the same feature and threshold for all nodes at the same depth.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded-xl border border-purple-100">
                  <p className="text-[10px] font-black text-purple-500 uppercase tracking-widest mb-1">Oblivious Trees</p>
                  <p className="text-sm">Provides strong regularization and makes prediction extremely fast on CPUs.</p>
                </div>
                <div className="bg-white p-3 rounded-xl border border-purple-100">
                  <p className="text-[10px] font-black text-purple-500 uppercase tracking-widest mb-1">Stability</p>
                  <p className="text-sm">The symmetric structure reduces variance and makes the model less likely to overfit.</p>
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
                title={`CatBoost Ensemble (${state.nEstimators} Symmetric Trees)`}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="text-center p-4">
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Training Accuracy</p>
                  <p className="text-2xl font-black text-purple-500">{(state.accuracy * 100).toFixed(1)}%</p>
                </Card>
                <Card className="text-center p-4">
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Tree Depth</p>
                  <p className="text-2xl font-black text-indigo-600">{state.maxDepth}</p>
                </Card>
              </div>
            </div>

            <div className="space-y-6">
              <Card title="Hyperparameters">
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-2">Number of Trees: {state.nEstimators}</label>
                    <input 
                      type="range" min="1" max="15" step="1"
                      className="w-full accent-purple-500"
                      value={state.nEstimators}
                      onChange={(e) => handleParamChange({ nEstimators: parseInt(e.target.value) })}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-2">Learning Rate: {state.learningRate}</label>
                    <input 
                      type="range" min="0.01" max="0.5" step="0.01"
                      className="w-full accent-purple-500"
                      value={state.learningRate}
                      onChange={(e) => handleParamChange({ learningRate: parseFloat(e.target.value) })}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-2">Symmetric Depth: {state.maxDepth}</label>
                    <input 
                      type="range" min="1" max="5" step="1"
                      className="w-full accent-purple-500"
                      value={state.maxDepth}
                      onChange={(e) => handleParamChange({ maxDepth: parseInt(e.target.value) })}
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
                          ? 'bg-purple-100 text-purple-700 border border-purple-300'
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
                  className="w-full mt-3 border-dashed border-2 hover:border-purple-500 hover:text-purple-600 transition-all"
                >
                  🔄 Regenerate Current Data
                </Button>
              </Card>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
                <h3 className="font-bold text-gray-800 mb-3">CatBoost Mastery</h3>
                <Button onClick={() => setShowQuiz(true)} variant="primary" className="w-full">Start Quiz</Button>
              </div>
            </div>
          </div>

          {showQuiz && (
            <div className="mt-8">
              <Quiz 
                title="CatBoost Mastery Quiz"
                questions={[
                  {
                    id: 'cat-1',
                    question: 'What is a "Symmetric" or "Oblivious" tree?',
                    options: ['A tree that grows randomly', 'A tree where all nodes at the same level share the same split criteria', 'A tree that only has two leaves', 'A tree used only for cat images'],
                    correct: 1,
                    explanation: 'Symmetric trees use the same feature and threshold for all splits at a given depth, which acts as a form of regularization.'
                  },
                  {
                    id: 'cat-2',
                    question: 'Why is CatBoost particularly efficient at prediction?',
                    options: ['Because it uses fewer trees', 'Because its symmetric structure allows for highly optimized CPU instructions', 'Because it ignores numerical data', 'Because it does not use a learning rate'],
                    correct: 1,
                    explanation: 'The balanced, symmetric structure of CatBoost trees allows them to be evaluated using bitwise operations, making them incredibly fast for inference.'
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
