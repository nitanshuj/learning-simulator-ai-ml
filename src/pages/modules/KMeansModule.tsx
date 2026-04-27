import React, { useState, useRef } from 'react'
import { Card, Button, Quiz, Navbar, Footer, BackButton, Sidebar } from '@/components'
import { KMeansPlot } from '@/components/KMeansPlot'
import { KMeans, KMeansState, KMeansDataset, generateKMeansData } from '@/simulators/KMeans'

const INERTIA_COLOR = (v: number) =>
  v === Infinity ? '#94a3b8' : v < 20 ? '#10b981' : v < 60 ? '#f59e0b' : '#ef4444'

const SILHOUETTE_COLOR = (v: number | null) => {
  if (v === null) return '#94a3b8'
  if (v > 0.7) return '#10b981' // Excellent
  if (v > 0.5) return '#3b82f6' // Good
  if (v > 0.25) return '#f59e0b' // Fair
  return '#ef4444' // Poor
}

// ── Initialise synchronously so we never have a null state ──
function initState(ds: KMeansDataset, numK: number) {
  const pts = generateKMeansData(ds, 150)
  const sim = new KMeans(pts, numK)
  return { sim, state: sim.getState() }
}

export const KMeansModule: React.FC = () => {
  const [k, setK] = useState(3)
  const [dataset, setDataset] = useState<KMeansDataset>('blobs')
  const [showQuiz, setShowQuiz] = useState(false)
  const [isRunning, setIsRunning] = useState(false)

  const initial = React.useMemo(() => initState('blobs', 3), [])
  const simRef = useRef<KMeans>(initial.sim)
  const [state, setState] = useState<KMeansState>(initial.state)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  function createSim(ds: KMeansDataset, numK: number) {
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null }
    const pts = generateKMeansData(ds, 150)
    const sim = new KMeans(pts, numK)
    simRef.current = sim
    setState(sim.getState())
    setIsRunning(false)
  }

  function handleStep() {
    if (!simRef.current || state.converged) return
    setState(simRef.current.step())
  }

  function handleRun() {
    if (isRunning || state.converged) return
    setIsRunning(true)
    intervalRef.current = setInterval(() => {
      const s = simRef.current.step()
      setState({ ...s })
      if (s.converged) {
        clearInterval(intervalRef.current!)
        intervalRef.current = null
        setIsRunning(false)
      }
    }, 180)
  }

  function handleReset() { createSim(dataset, k) }
  function handleKChange(newK: number) { setK(newK); createSim(dataset, newK) }
  function handleDatasetChange(d: KMeansDataset) { setDataset(d); createSim(d, k) }

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />
      <Sidebar />
      <div className="lg:pl-72 pt-16">
        <main className="p-6 lg:p-10 max-w-6xl mx-auto space-y-8">
          <BackButton />
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              K-Means Clustering Simulator
            </h1>
            <p className="text-gray-600 text-lg">
              Explore how data points are grouped into K clusters iteratively
            </p>
          </div>

          {/* Top Explanation Card */}
          <Card title="What is K-Means Clustering?" className="bg-amber-50 border-amber-200">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">How it Works</h3>
                <p className="text-gray-700">
                  K-Means is an unsupervised learning algorithm that partitions data into K distinct clusters. It works by placing K centroids in the space and iteratively: 1) Assigning each point to its nearest centroid, and 2) Moving centroids to the average position of their assigned points.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-3 rounded border border-gray-200 text-center">
                  <p className="text-sm text-gray-600">Centroids</p>
                  <p className="text-gray-800 font-bold">Cluster Centers</p>
                </div>
                <div className="bg-white p-3 rounded border border-gray-200 text-center">
                  <p className="text-sm text-gray-600">Assignment</p>
                  <p className="text-gray-800 font-bold">Nearest Neighbor</p>
                </div>
                <div className="bg-white p-3 rounded border border-gray-200 text-center">
                  <p className="text-sm text-gray-600">Convergence</p>
                  <p className="text-gray-800 font-bold">No More Changes</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Main Grid: Visualization + Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Visualization - Left */}
            <div className="lg:col-span-2 space-y-6">
              <Card title="Clustering Process" className="h-full">
                <KMeansPlot 
                  points={state.points} 
                  centroids={state.centroids} 
                />
              </Card>
            </div>

            {/* Controls - Right Side */}
            <div className="space-y-6">
              <Card title="Algorithm Controls">
                <div className="space-y-6">
                  {/* K Selector */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-semibold text-gray-700">Clusters (K)</label>
                      <span className="text-lg font-bold text-amber-500">{k}</span>
                    </div>
                    <div className="flex gap-2">
                      {[2, 3, 4, 5, 6].map(n => (
                        <button
                          key={n}
                          onClick={() => handleKChange(n)}
                          className={`flex-1 py-2 rounded-lg text-sm font-bold border transition-all ${
                            k === n
                              ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                              : 'bg-white text-slate-600 border-slate-200 hover:border-amber-300'
                          }`}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Dataset */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Dataset Type</label>
                    <div className="grid grid-cols-2 gap-2">
                      {(['blobs', 'moons', 'rings', 'random'] as KMeansDataset[]).map(d => (
                        <button
                          key={d}
                          onClick={() => handleDatasetChange(d)}
                          className={`py-2 rounded-lg text-xs font-bold capitalize border transition-all ${
                            dataset === d
                              ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                              : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300'
                          }`}
                        >
                          {d === 'blobs' ? '🫧 Blobs' : d === 'moons' ? '🌙 Moons' : d === 'rings' ? '💍 Rings' : '🎲 Random'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Button onClick={handleStep} disabled={isRunning || state.converged} variant="primary" className="flex-1">
                      Step
                    </Button>
                    <Button onClick={handleRun} disabled={isRunning || state.converged} variant="secondary" className="flex-1">
                      {isRunning ? 'Running...' : 'Run'}
                    </Button>
                    <Button onClick={handleReset} variant="outline" className="flex-1">
                      Reset
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Metrics */}
              <Card title="Current Metrics">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Iteration</p>
                    <p className="text-3xl font-bold text-slate-800">{state.iteration}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Status</p>
                    <p className={`text-sm font-bold uppercase mt-2 px-2 py-1 rounded inline-block ${
                      state.converged ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {state.converged ? 'Converged' : 'In Progress'}
                    </p>
                  </div>
                  <div className="col-span-2 pt-2 border-t border-slate-50">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total Inertia (WCSS)</p>
                    <div className="flex items-end gap-2">
                      <p className="text-3xl font-black tracking-tighter" style={{ color: INERTIA_COLOR(state.inertia) }}>
                        {state.inertia === Infinity ? 'N/A' : state.inertia.toFixed(1)}
                      </p>
                      <span className="text-[10px] text-slate-400 font-medium mb-1 text-xs">Lower is better</span>
                    </div>
                  </div>
                  <div className="col-span-2 pt-2 border-t border-slate-50">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Silhouette Score</p>
                    <div className="flex items-end gap-2">
                      <p className="text-3xl font-black tracking-tighter" style={{ color: SILHOUETTE_COLOR(state.silhouetteScore) }}>
                        {state.silhouetteScore === null ? 'N/A' : state.silhouetteScore.toFixed(3)}
                      </p>
                      <span className="text-[10px] text-slate-400 font-medium mb-1 text-xs">Higher is better (-1 to 1)</span>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="text-center bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-2">Knowledge Check</h3>
                <Button onClick={() => setShowQuiz(true)} variant="primary" className="w-full">Start Clustering Quiz</Button>
              </div>
            </div>
          </div>

          {showQuiz && (
            <div className="mt-12">
               <Quiz 
                  title="K-Means Clustering Quiz"
                  questions={[
                    {
                      id: 'km-1',
                      question: 'What does the "K" in K-Means represent?',
                      options: [
                        'The number of data points', 
                        'The number of iterations', 
                        'The number of clusters to form', 
                        'The size of each cluster'
                      ],
                      correct: 2,
                      explanation: 'K is a hyperparameter that specifies how many distinct groups the algorithm should find.',
                    },
                    {
                      id: 'km-2',
                      question: 'Is K-Means a Supervised or Unsupervised learning algorithm?',
                      options: [
                        'Supervised (uses labels)', 
                        'Unsupervised (finds hidden patterns in unlabeled data)', 
                        'Reinforcement learning', 
                        'Semi-supervised'
                      ],
                      correct: 1,
                      explanation: 'K-Means does not use target labels; it groups data based on feature similarity alone.',
                    },
                    {
                      id: 'km-3',
                      question: 'What is a "Centroid"?',
                      options: [
                        'A data point at the edge of a cluster', 
                        'The geometric center of a cluster', 
                        'A point that belongs to multiple clusters', 
                        'The distance between two points'
                      ],
                      correct: 1,
                      explanation: 'The centroid is the average position of all the points currently assigned to a cluster.',
                    },
                    {
                      id: 'km-4',
                      question: 'What happens when the algorithm "converges"?',
                      options: [
                        'The centroids stop moving', 
                        'The accuracy reaches 100%', 
                        'The computer runs out of memory', 
                        'All points are deleted'
                      ],
                      correct: 0,
                      explanation: 'Convergence occurs when point assignments no longer change, meaning the centroids have found a stable position.',
                    },
                    {
                      id: 'km-5',
                      question: 'Why is K-Means sensitive to the initial placement of centroids?',
                      options: [
                        'It isn\'t sensitive at all', 
                        'Different starting positions can lead to different final clusters (local optima)', 
                        'It only works if centroids start at zero', 
                        'It requires centroids to be sorted alphabetically'
                      ],
                      correct: 1,
                      explanation: 'K-Means can get stuck in a "local optimum" depending on where the centroids start. Techniques like K-Means++ help solve this.',
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
