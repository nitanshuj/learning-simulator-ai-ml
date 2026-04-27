
import React, { useEffect, useState } from 'react'
import { 
  ClassificationPlot, 
  TreeVisualizer, 
  Button, 
  Card, 
  Quiz, 
  Navbar, 
  Footer, 
  BackButton,
  Sidebar
} from '@/components'
import { 
  DecisionTree, 
  DecisionTreeState, 
  generateMultiClassData, 
  ClassificationData 
} from '@/simulators'

export const DecisionTreeModule: React.FC = () => {
  const [simulator, setSimulator] = useState<DecisionTree | null>(null)
  const [state, setState] = useState<DecisionTreeState | null>(null)
  const [data, setData] = useState<ClassificationData | null>(null)
  const [showQuiz, setShowQuiz] = useState(false)
  
  // Hyperparameters
  const [maxDepth, setMaxDepth] = useState(5)
  const [numClasses, setNumClasses] = useState(2)
  const [minSamplesSplit, setMinSamplesSplit] = useState(2)

  // Initialize simulator
  useEffect(() => {
    const sim = new DecisionTree({ maxDepth, minSamplesSplit })
    const initialData = generateMultiClassData(60, numClasses, 2.8)
    sim.setData(initialData)
    
    setSimulator(sim)
    setData(initialData)
    setState(sim.getState())
  }, [])

  const handleParamChange = (params: { depth?: number, split?: number }) => {
    const d = params.depth ?? maxDepth
    const s = params.split ?? minSamplesSplit
    setMaxDepth(d)
    setMinSamplesSplit(s)
    if (simulator) {
      simulator.setParams({ maxDepth: d, minSamplesSplit: s })
      setState(simulator.getState())
    }
  }

  const handleDataChange = (classes: number) => {
    setNumClasses(classes)
    const newData = generateMultiClassData(classes * 25, classes, 2.8)
    simulator?.setData(newData)
    setData(newData)
    setState(simulator?.getState() || null)
  }

  const handleNewData = () => {
    handleDataChange(numClasses)
  }

  if (!simulator || !state || !data) return null

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
              Decision Tree Learning Simulator
            </h1>
            <p className="text-gray-600 text-lg">
              Explore how recursive partitioning creates hierarchical decision boundaries
            </p>
          </div>

          {/* Top Explanation Card */}
          <Card title="What is a Decision Tree?" className="bg-emerald-50 border-emerald-200">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">How it Works</h3>
                <p className="text-gray-700">
                  A Decision Tree splits the data into branches based on feature values. It repeatedly asks "if-then" questions (e.g., Is X &gt; 5?) to partition the space into pure rectangles. Each final "leaf" represents a predicted class.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-3 rounded border border-gray-200 text-center">
                  <p className="text-sm text-gray-600">Recursive Splits</p>
                  <p className="text-gray-800 font-bold">Partitioning Space</p>
                </div>
                <div className="bg-white p-3 rounded border border-gray-200 text-center">
                  <p className="text-sm text-gray-600">Purity</p>
                  <p className="text-gray-800 font-bold">Gini/Entropy</p>
                </div>
                <div className="bg-white p-3 rounded border border-gray-200 text-center">
                  <p className="text-sm text-gray-600">Leaf Nodes</p>
                  <p className="text-gray-800 font-bold">Final Decision</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Main Grid: Visualization + Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Visualization - Left */}
            <div className="lg:col-span-2 space-y-6">
              <Card title="Decision Boundaries" className="h-full">
                <ClassificationPlot 
                  data={data} 
                  predictProb={(x, y) => simulator.predict(x, y)} 
                />
              </Card>
            </div>

            {/* Controls - Right Side */}
            <div className="space-y-6">
              <Card title="Hyperparameters">
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-semibold text-gray-700 uppercase tracking-tighter">Max Depth</label>
                      <span className="text-lg font-bold text-emerald-600">{maxDepth}</span>
                    </div>
                    <input 
                      type="range" min="1" max="10" step="1"
                      value={maxDepth}
                      onChange={(e) => handleParamChange({ depth: parseInt(e.target.value) })}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                    />
                    <div className="text-xs text-gray-500 mt-1">1 to 10 (Higher = more complex)</div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-semibold text-gray-700 uppercase tracking-tighter">Min Samples Split</label>
                      <span className="text-lg font-bold text-slate-600">{minSamplesSplit}</span>
                    </div>
                    <input 
                      type="range" min="2" max="20" step="1"
                      value={minSamplesSplit}
                      onChange={(e) => handleParamChange({ split: parseInt(e.target.value) })}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-slate-600"
                    />
                  </div>

                  <div className="pt-2">
                    <label className="text-xs font-bold text-slate-500 uppercase mb-3 block">Data Complexity</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[2, 3, 4].map(n => (
                        <button
                          key={n}
                          onClick={() => handleDataChange(n)}
                          className={`py-2 rounded-lg text-xs font-bold border transition-all ${
                            numClasses === n 
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-md' 
                            : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-300'
                          }`}
                        >
                          {n} Classes
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button onClick={handleNewData} variant="outline" size="md" className="w-full">Regenerate Data</Button>
                </div>
              </Card>

              <Card title="Statistics">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Accuracy</p>
                    <p className="text-2xl font-bold text-emerald-500">
                      {(state.accuracy * 100).toFixed(0)}%
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Nodes</p>
                    <p className="text-2xl font-bold text-slate-900">{state.iterations}</p>
                  </div>
                  <div className="col-span-2 pt-2 border-t border-slate-50">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Actual Tree Depth</p>
                    <p className="text-lg font-bold text-blue-600">
                      {state.totalDepth} / {maxDepth} (Limit)
                    </p>
                  </div>
                </div>
              </Card>
              
              <div className="text-center bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-2">Knowledge Check</h3>
                <Button onClick={() => setShowQuiz(true)} variant="primary" className="w-full">Start Quiz</Button>
              </div>
            </div>
          </div>

          {/* Full Width Row: Hierarchical Tree Visualizer */}
          <div className="w-full">
            <Card title="Hierarchical Tree Structure" className="overflow-hidden">
              <p className="text-xs text-slate-500 mb-6 px-1 italic">
                The tree visualization shows the actual branching logic learned from the data.
              </p>
              <TreeVisualizer node={state.tree} />
            </Card>
          </div>

          {showQuiz && (
            <div className="mt-12">
               <Quiz 
                  title="Deep Decision Trees Quiz"
                  questions={[
                    {
                      id: 'mdt-1',
                      question: 'How does a Decision Tree handle multi-class classification?',
                      options: [
                        'It only works for 2 classes', 
                        'By splitting nodes until each leaf belongs to one of many classes', 
                        'By combining multiple binary trees (OvR)', 
                        'It converts labels into continuous numbers'
                      ],
                      correct: 1,
                      explanation: 'Decision Trees naturally handle multiple classes by evaluating the majority class in each leaf node.',
                    },
                    {
                      id: 'mdt-2',
                      question: 'In the visualization, what do the rectangular regions represent?',
                      options: [
                        'Randomly drawn boxes', 
                        'Feature space partitions where the tree makes the same prediction', 
                        'Error margins', 
                        'Clusters found by similarity'
                      ],
                      correct: 1,
                      explanation: 'Each path from the root to a leaf defines a rectangular region in the 2D feature space.',
                    },
                    {
                      id: 'mdt-3',
                      question: 'What happens if you increase "Max Depth" too much?',
                      options: [
                        'The model becomes simpler', 
                        'The model may overfit (memorize noise)', 
                        'The model will stop working', 
                        'The accuracy always increases'
                      ],
                      correct: 1,
                      explanation: 'A very deep tree can create complex boundaries that capture noise in the data, leading to poor generalization.',
                    },
                    {
                      id: 'mdt-4',
                      question: 'What is Gini Impurity?',
                      options: [
                        'A measure of how "mixed" the classes are in a node', 
                        'The speed of the algorithm', 
                        'The number of trees in the forest', 
                        'The distance between data points'
                      ],
                      correct: 0,
                      explanation: 'Gini impurity measures the probability of a randomly chosen element being incorrectly labeled if it was randomly labeled according to the distribution of labels in the subset.',
                    },
                    {
                      id: 'mdt-5',
                      question: 'Why are Decision Trees called "Non-Linear"?',
                      options: [
                        'Because they use curved lines', 
                        'Because they can capture complex non-linear patterns through nested splits', 
                        'Because they only work on text', 
                        'They aren\'t, they are strictly linear'
                      ],
                      correct: 1,
                      explanation: 'While each split is linear, the combination of multiple nested splits can model highly complex non-linear boundaries.',
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
