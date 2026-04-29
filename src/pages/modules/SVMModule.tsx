import React, { useState, useEffect, useMemo } from 'react'
import { Card, Button, Navbar, Footer, BackButton, Quiz, Sidebar } from '@/components'
import { ClassificationPlot } from '@/components/ClassificationPlot'
import { SVM, SVMState, SVMKernel } from '@/simulators'

export const SVMModule: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<'visual' | 'theory'>('visual');

  const simulator = useMemo(() => new SVM('circles', 'rbf', 1.0), [])
  const [state, setState] = useState<SVMState>(simulator.getState())
  const [isAnimating, setIsAnimating] = useState(false)
  const [datasetName, setDatasetName] = useState('circles')
  const [showQuiz, setShowQuiz] = useState(false)

  useEffect(() => {
    let timer: number
    if (isAnimating && !state.converged) {
      timer = window.setInterval(() => {
        const newState = simulator.step()
        setState({ ...newState })
        if (newState.converged) setIsAnimating(false)
      }, 50)
    }
    return () => clearInterval(timer)
  }, [isAnimating, state.converged, simulator])

  const handleStep = () => {
    const newState = simulator.step()
    setState({ ...newState })
  }

  const handleRun = () => {
    setIsAnimating(!isAnimating)
  }

  const handleReset = () => {
    simulator.reset()
    setState(simulator.getState())
    setIsAnimating(false)
  }

  const handleParamChange = (params: Partial<SVMState>) => {
    simulator.setParams(params)
    setState(simulator.getState())
    setIsAnimating(false)
  }

  const handleDatasetChange = (dataset: string) => {
    simulator.changeDataset(dataset)
    setDatasetName(dataset)
    setState(simulator.getState())
    setIsAnimating(false)
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
{/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Support Vector Machines (SVM)
            </h1>
            <p className="text-gray-600 text-lg">
              Maximize the margin between classes using kernels and support vectors
            </p>
          </div>

          {/* Top Explanation Card */}
          <Card title="What is SVM?" className="bg-indigo-50 border-indigo-200">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">The Optimal Hyperplane</h3>
                <p className="text-gray-700">
                  Support Vector Machines (SVM) find the hyperplane that best separates classes by maximizing the "margin" (distance to the nearest points). These nearest points are called <strong>Support Vectors</strong>.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-3 rounded border border-gray-200 text-center">
                  <p className="text-sm text-gray-600">The Kernel Trick</p>
                  <p className="text-gray-800 font-bold">Map to High Dim</p>
                </div>
                <div className="bg-white p-3 rounded border border-gray-200 text-center">
                  <p className="text-sm text-gray-600">Max Margin</p>
                  <p className="text-gray-800 font-bold">Robust Separation</p>
                </div>
                <div className="bg-white p-3 rounded border border-gray-200 text-center">
                  <p className="text-sm text-gray-600">Regularization (C)</p>
                  <p className="text-gray-800 font-bold">Bias-Variance Tradeoff</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Main Grid: Visualization + Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Visualization - Left */}
            <div className="lg:col-span-2 space-y-6">
              <ClassificationPlot 
                data={state.data}
                predictProb={(x, y) => simulator.predict(x, y)}
                accuracy={state.accuracy}
                supportVectors={state.supportVectors}
                showMarginLines={true}
                title={`${state.kernel.toUpperCase()} Kernel Decision Boundary`}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="text-center p-4">
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Iteration</p>
                  <p className="text-2xl font-black text-indigo-600">{state.iteration}</p>
                </Card>
                <Card className="text-center p-4">
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Accuracy</p>
                  <p className="text-2xl font-black text-emerald-500">{(state.accuracy * 100).toFixed(1)}%</p>
                </Card>
                <Card className="text-center p-4">
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Support Vectors</p>
                  <p className="text-2xl font-black text-amber-500">{state.supportVectors.length}</p>
                </Card>
              </div>
            </div>

            {/* Controls - Right Side */}
            <div className="space-y-6">
              <Card title="Algorithm Controls">
                <div className="space-y-6">
                  <div className="flex gap-2">
                    <Button 
                      onClick={handleRun} 
                      variant={isAnimating ? 'outline' : 'primary'}
                      className="flex-1"
                    >
                      {isAnimating ? 'Pause' : 'Run SMO'}
                    </Button>
                    <Button onClick={handleStep} variant="outline" disabled={isAnimating}>Step</Button>
                    <Button onClick={handleReset} variant="outline">Reset</Button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-semibold text-gray-700 block mb-2">Kernel Type</label>
                      <select 
                        className="w-full p-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                        value={state.kernel}
                        onChange={(e) => handleParamChange({ kernel: e.target.value as SVMKernel })}
                      >
                        <option value="linear">Linear</option>
                        <option value="rbf">RBF (Gaussian)</option>
                        <option value="poly">Polynomial</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-gray-700 block mb-2">Complexity (C): {state.C}</label>
                      <input 
                        type="range" min="0.1" max="10" step="0.1"
                        className="w-full accent-indigo-600"
                        value={state.C}
                        onChange={(e) => handleParamChange({ C: parseFloat(e.target.value) })}
                      />
                    </div>

                    {state.kernel === 'rbf' && (
                      <div>
                        <label className="text-sm font-semibold text-gray-700 block mb-2">Gamma: {state.gamma}</label>
                        <input 
                          type="range" min="0.01" max="2" step="0.01"
                          className="w-full accent-indigo-600"
                          value={state.gamma}
                          onChange={(e) => handleParamChange({ gamma: parseFloat(e.target.value) })}
                        />
                      </div>
                    )}

                    {state.kernel === 'poly' && (
                      <div>
                        <label className="text-sm font-semibold text-gray-700 block mb-2">Degree: {state.degree}</label>
                        <input 
                          type="range" min="1" max="5" step="1"
                          className="w-full accent-indigo-600"
                          value={state.degree}
                          onChange={(e) => handleParamChange({ degree: parseInt(e.target.value) })}
                        />
                      </div>
                    )}

                    <div>
                      <label className="text-sm font-semibold text-gray-700 block mb-2">Learning Rate: {state.learningRate}</label>
                      <input 
                        type="range" min="0.001" max="0.1" step="0.001"
                        className="w-full accent-indigo-600"
                        value={state.learningRate}
                        onChange={(e) => handleParamChange({ learningRate: parseFloat(e.target.value) })}
                      />
                    </div>
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
                          ? 'bg-indigo-100 text-indigo-700 border border-indigo-300'
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
                  className="w-full mt-3 border-dashed border-2 hover:border-indigo-500 hover:text-indigo-600 transition-all"
                >
                  🔄 Regenerate Current Data
                </Button>
              </Card>

              <div className="text-center bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-2">Knowledge Check</h3>
                <Button onClick={() => setShowQuiz(true)} variant="primary" className="w-full">Start SVM Quiz</Button>
              </div>
            </div>
          </div>

          {showQuiz && (
            <div className="mt-12">
               <Quiz 
                  title="SVM Mastery Quiz"
                  questions={[
                    {
                      id: 'svm-1',
                      question: 'What is the "margin" in an SVM?',
                      options: ['The error rate of the model', 'The distance between the decision boundary and the nearest data points', 'The number of support vectors', 'The learning rate'],
                      correct: 1,
                      explanation: 'SVM aims to find the hyperplane that maximizes the distance (margin) to the nearest points of any class.'
                    },
                    {
                      id: 'svm-2',
                      question: 'What are "Support Vectors"?',
                      options: ['Vectors that represent the class centroids', 'The data points that lie closest to the decision boundary', 'The weights of the model', 'Incorrectly classified points'],
                      correct: 1,
                      explanation: 'Support Vectors are the critical data points that define the position and orientation of the decision boundary.'
                    },
                    {
                      id: 'svm-3',
                      question: 'What does the "Kernel Trick" allow SVMs to do?',
                      options: ['Speed up training', 'Solve non-linearly separable problems by mapping to higher dimensions', 'Reduce the number of support vectors', 'Automatically clean the data'],
                      correct: 1,
                      explanation: 'Kernels allow SVM to find complex boundaries in low dimensions by implicitly operating in a high-dimensional feature space.'
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
