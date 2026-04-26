import React, { useState, useRef } from 'react'
import { Card, Button, Quiz, Navbar, Footer, BackButton } from '@/components'
import { KMeansPlot } from '@/components/KMeansPlot'
import { KMeans, KMeansState, KMeansDataset, generateKMeansData } from '@/simulators/KMeans'

const INERTIA_COLOR = (v: number) =>
  v === Infinity ? '#94a3b8' : v < 20 ? '#10b981' : v < 60 ? '#f59e0b' : '#ef4444'

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
    <div className="min-h-screen bg-[#fafbfc] font-sans">
      <Navbar />
      <BackButton />

      <main className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-full mb-3">
            🧩 Clustering · Unsupervised Learning
          </div>
          <h1 className="text-4xl font-bold text-slate-800 mb-2">K-Means Clustering</h1>
          <p className="text-slate-500 text-lg max-w-2xl">
            Watch how the algorithm groups data into <strong>K clusters</strong> by iteratively assigning points
            to centroids and updating their positions until convergence.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* ── Left Column ── */}
          <div className="lg:col-span-4 space-y-5">

            <Card title="Algorithm Controls">
              <div className="space-y-5">

                {/* K Selector */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-bold text-slate-700">Number of Clusters (K)</label>
                    <span className="text-xl font-bold text-amber-500">K = {k}</span>
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
                  <label className="block text-sm font-bold text-slate-700 mb-2">Dataset</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['blobs', 'moons', 'rings', 'random'] as KMeansDataset[]).map(d => (
                      <button
                        key={d}
                        onClick={() => handleDatasetChange(d)}
                        className={`py-2 rounded-lg text-sm font-bold capitalize border transition-all ${
                          dataset === d
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300'
                        }`}
                      >
                        {d === 'blobs' ? '🫧 Blobs' : d === 'moons' ? '🌙 Moons' : d === 'rings' ? '💍 Rings' : '🎲 Random'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 pt-1">
                  <Button onClick={handleStep} disabled={isRunning || state.converged} variant="primary" size="sm">
                    Step
                  </Button>
                  <Button onClick={handleRun} disabled={isRunning || state.converged} variant="secondary" size="sm">
                    {isRunning ? 'Running…' : 'Run'}
                  </Button>
                  <Button onClick={handleReset} variant="outline" size="sm">
                    Reset
                  </Button>
                </div>
              </div>
            </Card>

            {/* Metrics */}
            <Card title="Metrics">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Iteration</p>
                  <p className="text-3xl font-bold text-slate-800">{state.iteration}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Phase</p>
                  <p className={`text-base font-bold ${
                    state.phase === 'done' ? 'text-emerald-500' :
                    state.phase === 'assign' ? 'text-blue-500' : 'text-amber-500'
                  }`}>
                    {state.phase === 'done' ? '✓ Converged' : state.phase === 'assign' ? 'Assigning' : 'Updating'}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Inertia</p>
                  <p className="text-2xl font-bold" style={{ color: INERTIA_COLOR(state.inertia) }}>
                    {state.inertia === Infinity ? '—' : state.inertia.toFixed(2)}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">Sum of squared distances to nearest centroid</p>
                </div>
              </div>
            </Card>

            {/* How It Works */}
            <Card title="How it works">
              <ol className="space-y-3 text-sm text-slate-600">
                <li className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-bold flex items-center justify-center flex-shrink-0">1</span>
                  <span><strong>Initialize</strong> — Place K centroids using KMeans++ for better coverage</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 text-xs font-bold flex items-center justify-center flex-shrink-0">2</span>
                  <span><strong>Assign</strong> — Each point joins its nearest centroid</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 text-xs font-bold flex items-center justify-center flex-shrink-0">3</span>
                  <span><strong>Update</strong> — Move each centroid to the mean of its cluster</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 text-xs font-bold flex items-center justify-center flex-shrink-0">4</span>
                  <span><strong>Repeat</strong> until no assignments change</span>
                </li>
              </ol>
            </Card>

          </div>

          {/* ── Right Column ── */}
          <div className="lg:col-span-8 space-y-5">

            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold text-slate-800">Cluster Visualization</h2>
                <span className="text-xs text-slate-400">★ = centroid</span>
              </div>
              <KMeansPlot
                points={state.points}
                centroids={state.centroids}
                height={480}
              />
            </div>

            {!showQuiz ? (
              <Card className="text-center py-6">
                <h3 className="text-lg font-bold text-slate-800 mb-3">Think you've got it?</h3>
                <Button onClick={() => setShowQuiz(true)}>Take the Clustering Quiz</Button>
              </Card>
            ) : (
              <Quiz
                title="K-Means Challenge"
                questions={[
                  {
                    id: 'km-1',
                    question: "What does 'K' represent in K-Means?",
                    options: ['Number of data points', 'Number of iterations', 'Number of clusters', 'Learning rate'],
                    correct: 2,
                    explanation: "K is the number of clusters you want the algorithm to find. You must choose K before running the algorithm.",
                  },
                  {
                    id: 'km-2',
                    question: "What does inertia measure?",
                    options: [
                      'Distance between centroids',
                      'Sum of squared distances from each point to its nearest centroid',
                      'Number of iterations to converge',
                      'Size of each cluster',
                    ],
                    correct: 1,
                    explanation: "Inertia (within-cluster sum of squares) measures how tight the clusters are. Lower inertia means more compact clusters.",
                  },
                  {
                    id: 'km-3',
                    question: "When does K-Means stop iterating?",
                    options: [
                      'After 100 iterations',
                      'When inertia is zero',
                      'When cluster assignments no longer change',
                      'When all points are equidistant',
                    ],
                    correct: 2,
                    explanation: "K-Means has converged when the assign step produces no changes — every point is already in its closest cluster.",
                  },
                  {
                    id: 'km-4',
                    question: "What is a key limitation of K-Means?",
                    options: [
                      'It can only find 2 clusters',
                      'It requires labeled data',
                      'You must specify K in advance',
                      'It always finds the global optimum',
                    ],
                    correct: 2,
                    explanation: "You must specify K before running the algorithm. Choosing the wrong K leads to poor clustering. Tools like the Elbow Method help pick a good K.",
                  },
                ]}
              />
            )}
          </div>

        </div>
      </main>
      <Footer />
    </div>
  )
}
