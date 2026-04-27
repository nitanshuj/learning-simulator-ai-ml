
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
  RandomForest, 
  RandomForestState, 
  generateMultiClassData, 
  ClassificationData 
} from '@/simulators'

export const RandomForestModule: React.FC = () => {
  const [simulator, setSimulator] = useState<RandomForest | null>(null)
  const [state, setState] = useState<RandomForestState | null>(null)
  const [data, setData] = useState<ClassificationData | null>(null)
  const [showQuiz, setShowQuiz] = useState(false)
  const [numTrees, setNumTrees] = useState(10)
  const [numClasses, setNumClasses] = useState(2)
  const [selectedTreeIndex, setSelectedTreeIndex] = useState(0)

  // Initialize simulator
  useEffect(() => {
    const sim = new RandomForest({ numTrees: 10, maxDepth: 4 })
    const initialData = generateMultiClassData(80, 2, 2)
    sim.setData(initialData)
    
    setSimulator(sim)
    setData(initialData)
    setState(sim.getState())
  }, [])

  const handleParamChange = (n: number) => {
    setNumTrees(n)
    if (simulator) {
      simulator.setParams({ numTrees: n })
      setState(simulator.getState())
      setSelectedTreeIndex(0)
    }
  }

  const handleDataChange = (classes: number) => {
    setNumClasses(classes)
    const newData = generateMultiClassData(classes * 30, classes, 2)
    simulator?.setData(newData)
    setData(newData)
    setState(simulator?.getState() || null)
    setSelectedTreeIndex(0)
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
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
             <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                   <span className="bg-emerald-100 text-emerald-700 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest">Ensemble Model</span>
                   <h1 className="text-h2 font-black text-slate-900 tracking-tight">Random Forest Simulator</h1>
                </div>
                <p className="text-slate-500 max-w-xl">
                  Witness the "Wisdom of the Crowd". See how multiple independent decision trees 
                  collaborate to form a robust, multi-class decision boundary.
                </p>
             </div>
             <div className="flex gap-4">
                <Button onClick={handleNewData} variant="outline">New Data</Button>
                <Button onClick={() => setShowQuiz(true)} variant="primary">The Forest Quiz</Button>
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl">
            {/* Left Column (4/12) */}
            <div className="lg:col-span-4 space-y-xl">
              <Card title="Concept: Bagging">
                <div className="prose prose-slate prose-sm">
                  <p>
                    <strong>Bootstrap Aggregating</strong> (Bagging) is the secret sauce. Each tree only sees a random <em>subset</em> of the training data.
                  </p>
                  <p>
                    By averaging these "biased" trees, the forest eliminates individual errors and creates a much smoother classification boundary.
                  </p>
                </div>
              </Card>

              <Card title="Forest Controls">
                <div className="space-y-xl">
                  <div>
                    <div className="flex justify-between items-center mb-md">
                      <label className="text-sm font-black text-slate-700 uppercase tracking-tighter">Number of Trees</label>
                      <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded text-xs font-black">{numTrees}</span>
                    </div>
                    <input 
                      type="range" min="1" max="50" step="1"
                      value={numTrees}
                      onChange={(e) => handleParamChange(parseInt(e.target.value))}
                      className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase mb-4 block">Multi-Class Complexity</label>
                    <div className="grid grid-cols-3 gap-3">
                      {[2, 3, 4].map(n => (
                        <button
                          key={n}
                          onClick={() => handleDataChange(n)}
                          className={`py-2.5 rounded-xl text-xs font-black border-2 transition-all ${
                            numClasses === n 
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-100' 
                            : 'bg-white text-slate-600 border-slate-100 hover:border-emerald-200'
                          }`}
                        >
                          {n} Classes
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              <Card title="Ensemble Metrics">
                <div className="space-y-6">
                  <div className="text-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Ensemble Accuracy</p>
                    <p className="text-5xl font-black text-emerald-500 tracking-tighter">
                      {(state.accuracy * 100).toFixed(0)}%
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                     <div className="text-center">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Avg Depth</p>
                        <p className="text-xl font-bold text-slate-700">4.0</p>
                     </div>
                     <div className="text-center">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Bootstrap</p>
                        <p className="text-xl font-bold text-slate-700">63.2%</p>
                     </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Right Column (8/12) */}
            <div className="lg:col-span-8">
              <Card title="Ensemble Decision Boundary">
                <ClassificationPlot 
                  data={data}
                  predictProb={(x1, x2) => simulator.predict(x1, x2)}
                  height={500}
                  isMultiClass={true}
                  title={`Aggregate Voting (N=${numTrees} Trees)`}
                />
              </Card>
            </div>
          </div>

          {/* Full Width Row: Tree Inspection */}
          <div className="w-full">
            <Card title="Tree Inspection" className="overflow-hidden">
              <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-xs text-slate-500 font-medium">
                  Examine any individual tree from the forest. This window is expanded for better horizontal visibility.
                </p>
                <div className="flex items-center gap-3 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                   <span className="text-[10px] font-black text-slate-400 uppercase">Selected Tree Index</span>
                   <select 
                     className="bg-transparent border-none text-sm font-black text-blue-600 focus:ring-0 cursor-pointer"
                     value={selectedTreeIndex}
                     onChange={(e) => setSelectedTreeIndex(parseInt(e.target.value))}
                   >
                     {state.treeStates.map((_, i) => (
                       <option key={i} value={i}>Tree #{i + 1}</option>
                     ))}
                   </select>
                </div>
              </div>
              <TreeVisualizer node={state.treeStates[selectedTreeIndex].tree} />
            </Card>
          </div>
        </div>

        {showQuiz && (
          <div className="mt-12">
            <Quiz 
              title="Advanced Random Forest Quiz"
              questions={[
                {
                  id: 'arf-1',
                  question: 'Why does Random Forest use random subsets of data (Bootstrapping)?',
                  options: [
                    'To save memory', 
                    'To ensure trees are diverse and don\'t all make the same mistakes', 
                    'To make training slower', 
                    'Because it can\'t handle large datasets'
                  ],
                  correct: 1,
                  explanation: 'Diversity is key. If all trees saw the same data, they would all be identical.',
                },
                {
                  id: 'arf-2',
                  question: 'How does the forest decide the final class for a data point?',
                  options: [
                    'Weighted average of all tree depths', 
                    'Majority vote (the class predicted by most trees)', 
                    'Only using the most accurate tree', 
                    'A random selection from tree predictions'
                  ],
                  correct: 1,
                  explanation: 'Majority voting allows the collective wisdom of the forest to override individual errors.',
                },
                {
                  id: 'arf-3',
                  question: 'What is "Feature Bagging"?',
                  options: [
                    'Deleting features', 
                    'Randomly selecting a subset of features at each split', 
                    'Adding more features', 
                    'Scaling features'
                  ],
                  correct: 1,
                  explanation: 'By only looking at a few random features for each split, trees are forced to find different patterns.',
                },
                {
                  id: 'arf-4',
                  question: 'As the number of trees increases, what happens to the chance of overfitting?',
                  options: [
                    'It increases significantly', 
                    'It decreases or stays stable (unlike single trees)', 
                    'It depends on the learning rate', 
                    'Random Forests always overfit'
                  ],
                  correct: 1,
                  explanation: 'Random Forests are remarkably resistant to overfitting due to averaging.',
                },
                {
                  id: 'arf-5',
                  question: 'Which is a disadvantage of Random Forests compared to single Decision Trees?',
                  options: [
                    'They are less accurate', 
                    'They are harder to interpret (Black Box)', 
                    'They only work for binary classification', 
                    'They don\'t work on small datasets'
                  ],
                  correct: 1,
                  explanation: 'While single trees are easy to explain, a forest of 100+ trees is difficult for humans to parse.',
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
