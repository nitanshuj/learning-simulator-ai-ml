import React, { useState, useMemo, useEffect } from 'react'
import { Card, Button, Navbar, Footer, BackButton, Quiz, Sidebar } from '@/components'
import Plotly from 'plotly.js-dist-min'
import { HierarchicalClustering, HierarchicalState, LinkageMethod } from '@/simulators'
import { Dendrogram } from '@/components/Dendrogram'

export const HierarchicalClusteringModule: React.FC = () => {
  const simulator = useMemo(() => new HierarchicalClustering('blobs', 'average'), [])
  const [state, setState] = useState<HierarchicalState>(simulator.getState())
  const [datasetName, setDatasetName] = useState('blobs')
  const [showQuiz, setShowQuiz] = useState(false)

  const handleParamChange = (params: Partial<HierarchicalState>) => {
    if (params.linkage) simulator.setLinkage(params.linkage)
    if (params.threshold !== undefined) simulator.setThreshold(params.threshold)
    setState(simulator.getState())
  }

  const handleDatasetChange = (dataset: string) => {
    simulator.changeDataset(dataset)
    setDatasetName(dataset)
    setState(simulator.getState())
  }

  // Plotly Scatter Effect
  useEffect(() => {
    const el = document.getElementById('clustering-plot')
    if (!el) return

    const uniqueClusters = Array.from(new Set(state.clusters)).sort((a, b) => a - b)
    const CLASS_COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16', '#6366f1']

    const traces = uniqueClusters.map(c => ({
      x: state.points.filter((_, i) => state.clusters[i] === c).map(p => p.x),
      y: state.points.filter((_, i) => state.clusters[i] === c).map(p => p.y),
      mode: 'markers',
      type: 'scatter' as const,
      name: `Cluster ${c}`,
      marker: {
        size: 10,
        color: CLASS_COLORS[c % CLASS_COLORS.length],
        line: { color: 'white', width: 1.5 }
      }
    }))

    const layout = {
      title: {
        text: 'Point Clusters',
        font: { size: 16, color: '#1e293b', weight: 'bold' }
      },
      xaxis: { range: [-6, 6], gridcolor: '#f1f5f9' },
      yaxis: { range: [-6, 6], gridcolor: '#f1f5f9' },
      margin: { l: 40, r: 20, t: 40, b: 40 },
      paper_bgcolor: '#fff',
      plot_bgcolor: '#fff',
      showlegend: false
    }

    Plotly.newPlot(el, traces, layout, { responsive: true, displaylogo: false })
  }, [state])

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />
      <Sidebar />
      <div className="lg:pl-72 pt-16">
        <main className="p-6 lg:p-10 max-w-6xl mx-auto space-y-8">
          <BackButton />
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Hierarchical Clustering
            </h1>
            <p className="text-gray-600 text-lg">
              Build a tree of clusters by progressively merging or splitting data points
            </p>
          </div>

          {/* Explanation Card */}
          <Card title="The Dendrogram Secret" className="bg-amber-50 border-amber-200">
            <div className="space-y-4 text-gray-700">
              <p>
                Unlike K-Means, <strong>Hierarchical Clustering</strong> doesn't require you to pick the number of clusters upfront. Instead, it creates a <strong>Dendrogram</strong> (tree diagram) that shows all possible clusterings at different levels of similarity.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded-xl border border-amber-100">
                  <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-1">Agglomerative</p>
                  <p className="text-sm">Bottom-up approach: Start with each point as its own cluster and merge the closest pairs.</p>
                </div>
                <div className="bg-white p-3 rounded-xl border border-amber-100">
                  <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-1">Linkage</p>
                  <p className="text-sm">Defines how distance between clusters is measured (Single, Complete, or Average).</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Main Visualization Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
               <div id="clustering-plot" className="h-[400px] bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden" />
               
               <div className="grid grid-cols-2 gap-4">
                  <Card className="text-center p-4">
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Total Clusters</p>
                    <p className="text-3xl font-black text-amber-500">{state.numClusters}</p>
                  </Card>
                  <Card className="text-center p-4">
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Max Distance</p>
                    <p className="text-3xl font-black text-indigo-600">{state.maxDistance.toFixed(2)}</p>
                  </Card>
                  <Card className="text-center p-4 col-span-2 bg-slate-900 border-slate-800">
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Silhouette Score (Quality)</p>
                    <p className={`text-3xl font-black ${state.silhouetteScore && state.silhouetteScore > 0.5 ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {state.silhouetteScore !== null ? state.silhouetteScore.toFixed(3) : 'N/A'}
                    </p>
                    <p className="text-[10px] text-slate-500 mt-1 italic">Higher is better (max 1.0)</p>
                  </Card>
               </div>
            </div>

            <div className="space-y-6">
              <Dendrogram 
                root={state.root} 
                threshold={state.threshold} 
                maxDistance={state.maxDistance}
                width={500}
                height={300}
              />
              
              <Card title="Interactive Controls">
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-2">Distance Threshold (Cut): {state.threshold.toFixed(2)}</label>
                    <input 
                      type="range" min="0" max={state.maxDistance} step="0.1"
                      className="w-full accent-amber-500"
                      value={state.threshold}
                      onChange={(e) => handleParamChange({ threshold: parseFloat(e.target.value) })}
                    />
                    <p className="text-[10px] text-slate-400 mt-1 italic">Slide to "cut" the tree and define clusters.</p>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-2">Linkage Method</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['single', 'complete', 'average'] as LinkageMethod[]).map(m => (
                        <Button 
                          key={m}
                          onClick={() => handleParamChange({ linkage: m })}
                          variant={state.linkage === m ? 'primary' : 'outline'}
                          size="sm"
                          className="capitalize"
                        >
                          {m}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-2">Dataset</label>
                    <div className="space-y-2">
                      {['blobs', 'circles', 'moons'].map((ds) => (
                        <button
                          key={ds}
                          onClick={() => handleDatasetChange(ds)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                            datasetName === ds
                              ? 'bg-amber-100 text-amber-700 border border-amber-300'
                              : 'hover:bg-slate-100 text-gray-600'
                          }`}
                        >
                          {ds}
                        </button>
                      ))}
                    </div>
                  </div>
                  <Button
                    onClick={() => handleDatasetChange(datasetName)}
                    variant="outline"
                    size="sm"
                    className="w-full mt-2 border-dashed border-2 hover:border-amber-500 hover:text-amber-600 transition-all"
                  >
                    🔄 Regenerate Current Data
                  </Button>
                </div>
              </Card>
            </div>
          </div>

          {/* Bottom Quiz */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center max-w-2xl mx-auto">
             <h3 className="text-2xl font-black text-slate-800 mb-2">Challenge Your Understanding</h3>
             <p className="text-slate-500 mb-6">Test how well you understand tree cutting and linkage methods.</p>
             <Button onClick={() => setShowQuiz(true)} variant="primary" className="px-12 py-6 rounded-2xl text-lg">Take Hierarchical Quiz</Button>
          </div>

          {showQuiz && (
            <div className="mt-8">
              <Quiz 
                title="Hierarchical Clustering Quiz"
                questions={[
                  {
                    id: 'hc-1',
                    question: 'What happens when you lower the threshold line on the dendrogram?',
                    options: ['The number of clusters decreases', 'The number of clusters increases', 'The points move closer together', 'Nothing changes'],
                    correct: 1,
                    explanation: 'Lowering the threshold line cuts the tree at a lower distance level, resulting in more, smaller clusters.'
                  },
                  {
                    id: 'hc-2',
                    question: 'Which linkage method is most sensitive to outliers?',
                    options: ['Complete Linkage', 'Single Linkage', 'Average Linkage', 'Centroid Linkage'],
                    correct: 1,
                    explanation: 'Single linkage (nearest neighbor) is very sensitive to noise and outliers, often leading to "chaining" where clusters are merged because of a few close points.'
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
