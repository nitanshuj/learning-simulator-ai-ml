import React, { useState, useMemo } from 'react'
import { Card, Button, Navbar, Footer, BackButton, Quiz, Sidebar } from '@/components'
import { ClassificationPlot } from '@/components/ClassificationPlot'
import { KNN, KNNState, DistanceMetric } from '@/simulators'

export const KNNModule: React.FC = () => {
  const simulator = useMemo(() => new KNN('moons', 3), [])
  const [state, setState] = useState<KNNState>(simulator.getState())
  const [datasetName, setDatasetName] = useState('moons')
  const [showQuiz, setShowQuiz] = useState(false)

  const handleParamChange = (params: Partial<KNNState>) => {
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
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              K-Nearest Neighbors (K-NN)
            </h1>
            <p className="text-gray-600 text-lg">
              Classify data points based on their closest neighbors in the feature space
            </p>
          </div>

          {/* Explanation Card */}
          <Card title="How K-NN Works" className="bg-emerald-50 border-emerald-200">
            <div className="space-y-4">
              <p className="text-gray-700">
                K-NN is a simple, <strong>lazy learning</strong> algorithm. It doesn't build a model during training. Instead, it stores the dataset and makes predictions by finding the <strong>K</strong> most similar points to a new input.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-3 rounded border border-gray-200 text-center">
                  <p className="text-sm text-gray-600 font-bold uppercase tracking-tighter mb-1">K Value</p>
                  <p className="text-gray-800 text-sm">Small K is sensitive to noise; large K is smoother.</p>
                </div>
                <div className="bg-white p-3 rounded border border-gray-200 text-center">
                  <p className="text-sm text-gray-600 font-bold uppercase tracking-tighter mb-1">Distance Metric</p>
                  <p className="text-gray-800 text-sm">Euclidean (direct) or Manhattan (grid-based).</p>
                </div>
                <div className="bg-white p-3 rounded border border-gray-200 text-center">
                  <p className="text-sm text-gray-600 font-bold uppercase tracking-tighter mb-1">Voting</p>
                  <p className="text-gray-800 text-sm">The majority class among the K neighbors wins.</p>
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
                title={`K-NN Decision Boundary (K=${state.k}, ${state.metric})`}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="text-center p-4">
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Accuracy (Training)</p>
                  <p className="text-2xl font-black text-emerald-500">{(state.accuracy * 100).toFixed(1)}%</p>
                </Card>
                <Card className="text-center p-4">
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Complexity</p>
                  <p className="text-2xl font-black text-indigo-600">{state.k < 5 ? 'High' : 'Low'}</p>
                </Card>
              </div>
            </div>

            <div className="space-y-6">
              <Card title="Model Parameters">
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-2">Number of Neighbors (K): {state.k}</label>
                    <input 
                      type="range" min="1" max="21" step="2"
                      className="w-full accent-emerald-600"
                      value={state.k}
                      onChange={(e) => handleParamChange({ k: parseInt(e.target.value) })}
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                      <span>More Complex (Overfit)</span>
                      <span>Smoother (Underfit)</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-2">Distance Metric</label>
                    <div className="grid grid-cols-2 gap-2">
                      {(['euclidean', 'manhattan'] as DistanceMetric[]).map(m => (
                        <Button 
                          key={m}
                          onClick={() => handleParamChange({ metric: m })}
                          variant={state.metric === m ? 'primary' : 'outline'}
                          size="sm"
                          className="capitalize"
                        >
                          {m}
                        </Button>
                      ))}
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
                          ? 'bg-emerald-100 text-emerald-700 border border-emerald-300'
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
                  className="w-full mt-3 border-dashed border-2 hover:border-emerald-500 hover:text-emerald-600 transition-all"
                >
                  🔄 Regenerate Current Data
                </Button>
              </Card>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
                <h3 className="font-bold text-gray-800 mb-3">Mastery Quiz</h3>
                <Button onClick={() => setShowQuiz(true)} variant="primary" className="w-full">Test Your Knowledge</Button>
              </div>
            </div>
          </div>

          {showQuiz && (
            <div className="mt-8">
              <Quiz 
                title="K-NN Quiz"
                questions={[
                  {
                    id: 'knn-1',
                    question: 'What happens to the decision boundary as K increases?',
                    options: ['It becomes more jagged and complex', 'It becomes smoother and less sensitive to noise', 'It stays exactly the same', 'It becomes a perfect circle'],
                    correct: 1,
                    explanation: 'Larger K values average out noise, leading to smoother boundaries and less overfitting.'
                  },
                  {
                    id: 'knn-2',
                    question: 'Why is K-NN called a "lazy learner"?',
                    options: ['Because it is slow to predict', 'Because it does not learn a general model during training', 'Because it requires very little data', 'Because it only works on small datasets'],
                    correct: 1,
                    explanation: 'Lazy learning means the algorithm simply stores the training data and waits until a query is made to do any computation.'
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
