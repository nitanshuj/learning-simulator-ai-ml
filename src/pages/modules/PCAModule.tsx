import React, { useState, useMemo, useEffect } from 'react'
import { Card, Button, Navbar, Footer, BackButton, Quiz, Sidebar } from '@/components'
import Plotly from 'plotly.js-dist-min'
import { PCA, PCAState, generatePCAData } from '@/simulators'

export const PCAModule: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<'visual' | 'theory'>('visual');

  const [datasetType, setDatasetType] = useState<'correlated' | 'blobs' | 'random'>('correlated')
  const [showQuiz, setShowQuiz] = useState(false)
  
  // Initialize simulator
  const initialData = useMemo(() => generatePCAData(datasetType, 100), [datasetType])
  const simulator = useMemo(() => new PCA(initialData), [initialData])
  const [state, setState] = useState<PCAState>(simulator.getState())

  // Sync state whenever simulator is recreated (datasetType change)
  useEffect(() => {
    setState(simulator.getState())
  }, [simulator])

  // Handle data regeneration
  const handleRegenerateData = () => {
    const newData = generatePCAData(datasetType, 100)
    simulator.setData(newData)
    setState(simulator.getState())
  }

  // Effect to update Plotly visualization
  useEffect(() => {
    const el = document.getElementById('pca-plot')
    if (!el) return

    const { originalData, principalComponents } = state

    // Trace 1: Original Data
    const trace1 = {
      x: originalData.map(p => p[0]),
      y: originalData.map(p => p[1]),
      mode: 'markers',
      type: 'scatter' as const,
      name: 'Original Data',
      marker: { color: '#cbd5e1', size: 6, opacity: 0.5 }
    }

    // Trace 2: Principal Components (Eigenvectors)
    // We scale them for visibility
    const scale = 3
    const pcTraces = principalComponents.map((pc, i) => ({
      x: [0, pc[0] * scale],
      y: [0, pc[1] * scale],
      mode: 'lines+markers',
      type: 'scatter' as const,
      name: `PC ${i + 1}`,
      line: { 
        color: i === 0 ? '#3b82f6' : '#ef4444', 
        width: 3,
        dash: i === 1 ? 'dot' : 'solid'
      },
      marker: { size: 8 }
    }))

    const layout = {
      title: {
        text: 'Principal Components in Feature Space',
        font: { size: 16, color: '#1e293b', weight: 'bold' }
      },
      xaxis: { range: [-6, 6], gridcolor: '#f1f5f9', zerolinecolor: '#94a3b8' },
      yaxis: { range: [-6, 6], gridcolor: '#f1f5f9', zerolinecolor: '#94a3b8' },
      margin: { l: 40, r: 20, t: 40, b: 40 },
      paper_bgcolor: '#fff',
      plot_bgcolor: '#fff',
      showlegend: true,
      legend: { x: 1, xanchor: 'right', y: 1 }
    }

    Plotly.newPlot(el, [trace1, ...pcTraces], layout, { responsive: true, displaylogo: false })
  }, [state])

  // Effect for Variance Chart
  useEffect(() => {
    const el = document.getElementById('variance-plot')
    if (!el) return

    const trace = {
      x: state.explainedVariance.map((_, i) => `PC${i+1}`),
      y: state.explainedVariance.map(v => v * 100),
      type: 'bar' as const,
      marker: {
        color: ['#3b82f6', '#ef4444'],
        line: { color: 'white', width: 1 }
      }
    }

    const layout = {
      title: {
        text: 'Explained Variance (%)',
        font: { size: 14, color: '#64748b' }
      },
      yaxis: { range: [0, 100], gridcolor: '#f1f5f9' },
      margin: { l: 40, r: 20, t: 40, b: 40 },
      height: 250
    }

    Plotly.newPlot(el, [trace], layout, { responsive: true, displaylogo: false })
  }, [state])

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
              Principal Component Analysis (PCA)
            </h1>
            <p className="text-gray-600 text-lg">
              Reduce complexity while preserving the most important patterns in your data
            </p>
          </div>

          {/* Explanation Card */}
          <Card title="The Power of Projection" className="bg-indigo-50 border-indigo-200">
            <div className="space-y-4 text-gray-700">
              <p>
                <strong>PCA</strong> is a dimensionality reduction technique that transforms a large set of variables into a smaller one that still contains most of the information. It finds the <strong>Principal Components</strong>—directions where the data varies the most.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-3 rounded-xl border border-indigo-100">
                  <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-1">Step 1: Center</p>
                  <p className="text-sm">Subtract the mean from each feature so the data is centered at zero.</p>
                </div>
                <div className="bg-white p-3 rounded-xl border border-indigo-100">
                  <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-1">Step 2: Covariance</p>
                  <p className="text-sm">Calculate how features vary together to find correlated directions.</p>
                </div>
                <div className="bg-white p-3 rounded-xl border border-indigo-100">
                  <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-1">Step 3: Eigen-Decomposition</p>
                  <p className="text-sm">Identify the vectors (PCs) that capture the maximum variance.</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Main Visualization Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
               <div id="pca-plot" className="h-[500px] bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden" />
               
               <div className="grid grid-cols-2 gap-6">
                 <Card title="Explained Variance">
                    <div id="variance-plot" />
                 </Card>
                 <Card title="Mathematical Insights">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-xl border border-blue-100">
                        <span className="text-xs font-bold text-blue-800">PC1 (Primary Axis)</span>
                        <span className="text-sm font-black text-blue-600">{(state.explainedVariance[0] * 100).toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-red-50 rounded-xl border border-red-100">
                        <span className="text-xs font-bold text-red-800">PC2 (Secondary Axis)</span>
                        <span className="text-sm font-black text-red-600">{(state.explainedVariance[1] * 100).toFixed(1)}%</span>
                      </div>
                      <p className="text-xs text-slate-500 italic text-center">
                        The axes shown on the plot are the eigenvectors. PC1 points in the direction of maximum spread.
                      </p>
                    </div>
                 </Card>
               </div>
            </div>

            <div className="space-y-6">
              <Card title="Simulation Controls">
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-3">Dataset Type</label>
                    <div className="grid grid-cols-1 gap-2">
                      {(['correlated', 'blobs', 'random'] as const).map(type => (
                        <Button 
                          key={type}
                          onClick={() => setDatasetType(type)}
                          variant={datasetType === type ? 'primary' : 'outline'}
                          size="md"
                          className="capitalize justify-start"
                        >
                          {type === 'correlated' ? '📈 Highly Correlated' : type === 'blobs' ? '🫧 Distributed Blobs' : '🎲 Random Noise'}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <Button 
                      onClick={handleRegenerateData}
                      variant="outline"
                      size="md"
                      className="w-full border-dashed border-2 hover:border-indigo-500 hover:text-indigo-600 transition-all"
                    >
                      🔄 Regenerate Current Data
                    </Button>
                  </div>

                  <div className="p-4 bg-slate-900 rounded-2xl text-white">
                    <p className="text-[10px] font-black text-slate-500 uppercase mb-2">PC1 Vector</p>
                    <div className="font-mono text-sm text-emerald-400">
                      [{state.principalComponents[0][0].toFixed(3)}, {state.principalComponents[0][1].toFixed(3)}]
                    </div>
                  </div>
                </div>
              </Card>

              <Card title="Why use PCA?">
                 <ul className="space-y-3">
                   <li className="flex gap-3 text-sm text-slate-600">
                     <span className="text-indigo-500 font-bold">✔</span>
                     <span><strong>Data Compression:</strong> Store data using fewer variables.</span>
                   </li>
                   <li className="flex gap-3 text-sm text-slate-600">
                     <span className="text-indigo-500 font-bold">✔</span>
                     <span><strong>Visualization:</strong> View high-D data in 2D or 3D.</span>
                   </li>
                   <li className="flex gap-3 text-sm text-slate-600">
                     <span className="text-indigo-500 font-bold">✔</span>
                     <span><strong>Noise Reduction:</strong> Filter out low-variance components.</span>
                   </li>
                 </ul>
              </Card>

              <div className="text-center bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-2">Ready to Test?</h3>
                <Button onClick={() => setShowQuiz(true)} variant="primary" className="w-full">Start PCA Quiz</Button>
              </div>
            </div>
          </div>

          {showQuiz && (
            <div className="mt-8">
              <Quiz 
                title="PCA & Dimensionality Assessment"
                questions={[
                  {
                    id: 'pca-1',
                    question: 'What is the goal of the first Principal Component (PC1)?',
                    options: [
                      'To find the direction of minimum variance',
                      'To find the direction of maximum variance in the data',
                      'To delete all outliers',
                      'To sort the data alphabetically'
                    ],
                    correct: 1,
                    explanation: 'PC1 is the direction in the feature space along which the data points are most spread out.'
                  },
                  {
                    id: 'pca-2',
                    question: 'What does "Explained Variance" tell us?',
                    options: [
                      'How many data points we have',
                      'How much of the total information is captured by a specific component',
                      'The error rate of the model',
                      'The speed of the algorithm'
                    ],
                    correct: 1,
                    explanation: 'It measures the proportion of the dataset\'s total variance that lies along the axis of each principal component.'
                  },
                  {
                    id: 'pca-3',
                    question: 'Which of the following is a common preprocessing step for PCA?',
                    options: [
                      'Feature Scaling (Standardization)',
                      'Deleting all negative numbers',
                      'Converting all text to uppercase',
                      'Adding more random features'
                    ],
                    correct: 0,
                    explanation: 'PCA is sensitive to the scale of features. Standardization ensures that features with larger ranges don\'t dominate the analysis.'
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
