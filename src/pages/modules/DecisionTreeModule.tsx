
import React, { useEffect, useState } from 'react'
import { 
  ClassificationPlot, 
  TreeVisualizer, 
  Button, 
  Card, 
  Quiz, 
  Navbar, 
  Footer, 
  BackButton 
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
      <BackButton />
      
      <main className="pt-24 pb-20 max-w-7xl mx-auto px-lg sm:px-2xl lg:px-4xl">
        <div className="flex flex-col gap-xl">
          
          <div className="flex flex-col md:flex-row gap-lg items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-4">
             <div className="flex-1">
                <h1 className="text-h2 text-slate-900 font-black mb-2">Decision Tree Simulator</h1>
                <p className="text-slate-500 max-w-2xl">
                  Explore how recursive partitioning creates hierarchical decision boundaries. 
                  Adjust the complexity to see the balance between underfitting and overfitting.
                </p>
             </div>
             <div className="flex gap-3">
                <Button onClick={handleNewData} variant="outline" size="sm">Regenerate Data</Button>
                <Button onClick={() => setShowQuiz(true)} variant="primary" size="sm">Take Quiz</Button>
             </div>
          </div>

          {/* Top Section: Logic & Plot */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl">
            {/* Left Column: Controls */}
            <div className="lg:col-span-4 space-y-xl">
              <Card title="Module Lesson">
                <div className="prose prose-slate prose-sm">
                  <p>
                    <strong>Recursive Partitioning:</strong> The tree splits the space into rectangles. Each split aims to maximize <em>purity</em> in the resulting subsets.
                  </p>
                  <p>
                    <strong>Depth Limits:</strong> Setting a Max Depth acts as a hard stop to prevent the tree from becoming overly complex and overfitting.
                  </p>
                </div>
              </Card>

              <Card title="Hyperparameters">
                <div className="space-y-lg">
                  <div>
                    <div className="flex justify-between items-center mb-md">
                      <label className="text-sm font-bold text-slate-700 uppercase tracking-tighter">Max Depth</label>
                      <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs font-black">{maxDepth}</span>
                    </div>
                    <input 
                      type="range" min="1" max="10" step="1"
                      value={maxDepth}
                      onChange={(e) => handleParamChange({ depth: parseInt(e.target.value) })}
                      className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-md">
                      <label className="text-sm font-bold text-slate-700 uppercase tracking-tighter">Min Samples Split</label>
                      <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-xs font-black">{minSamplesSplit}</span>
                    </div>
                    <input 
                      type="range" min="2" max="20" step="1"
                      value={minSamplesSplit}
                      onChange={(e) => handleParamChange({ split: parseInt(e.target.value) })}
                      className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-slate-600"
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
                            ? 'bg-blue-600 text-white border-blue-600 shadow-md' 
                            : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300'
                          }`}
                        >
                          {n} Classes
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              <Card title="Statistics">
                <div className="grid grid-cols-2 gap-xl">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-xs">Accuracy</p>
                    <p className="text-2xl font-bold text-emerald-500">
                      {(state.accuracy * 100).toFixed(0)}%
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-xs">Nodes</p>
                    <p className="text-2xl font-bold text-slate-900">{state.iterations}</p>
                  </div>
                  <div className="col-span-2 pt-2 border-t border-slate-50">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-xs">Actual Tree Depth</p>
                    <p className="text-lg font-bold text-blue-600">
                      {state.totalDepth} / {maxDepth} (Limit)
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Right Column: Plot */}
            <div className="lg:col-span-8">
              <Card title="Decision Boundary & Data Partitioning">
                <ClassificationPlot 
                  data={data}
                  predictProb={(x1, x2) => simulator.predict(x1, x2)}
                  height={500}
                  isMultiClass={true}
                  title={`${numClasses}-Class Partitioning (Depth ${maxDepth})`}
                />
              </Card>
            </div>
          </div>

          {/* Full Width Row: Hierarchical Tree Visualizer */}
          <div className="w-full">
            <Card title="Hierarchical Tree Structure" className="overflow-hidden">
              <p className="text-xs text-slate-500 mb-6 px-1 italic">
                The window below is expanded to show more of the tree horizontally. Use scroll to navigate wide branches.
              </p>
              <TreeVisualizer node={state.tree} />
            </Card>
          </div>
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
                    question: 'What is a "pure" node?',
                    options: [
                      'A node with no children', 
                      'A node where all samples belong to the same class', 
                      'A node with Gini impurity of 1', 
                      'A node at the very top of the tree'
                    ],
                    correct: 1,
                    explanation: 'A node is pure if it contains data from only one class. Its Gini impurity is 0.',
                  },
                  {
                    id: 'mdt-4',
                    question: 'What happens to the tree size as you increase "Min Samples Split"?',
                    options: [
                      'The tree gets deeper', 
                      'The tree gets shallower/smaller', 
                      'The tree disappears', 
                      'No change'
                    ],
                    correct: 1,
                    explanation: 'Higher min_samples_split prevents splitting small groups, leading to a smaller tree.',
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

      <Footer />
    </div>
  )
}
