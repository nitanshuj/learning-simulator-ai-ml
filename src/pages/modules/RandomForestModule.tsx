
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
  RandomForest, 
  RandomForestState, 
  generateMultiClassData, 
  ClassificationData 
} from '@/simulators'

export const RandomForestModule: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<'visual' | 'theory'>('visual');

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
              Random Forest Learning Simulator
            </h1>
            <p className="text-gray-600 text-lg">
              Witness the "Wisdom of the Crowd" with an ensemble of decision trees
            </p>
          </div>

          {/* Top Explanation Card */}
          <Card title="What is a Random Forest?" className="bg-emerald-50 border-emerald-200">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">How it Works</h3>
                <p className="text-gray-700">
                  A Random Forest is an ensemble of many Decision Trees. Each tree is trained on a random subset of data and features. By combining their predictions (usually through voting), the forest becomes much more robust and accurate than any single tree.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-3 rounded border border-gray-200 text-center">
                  <p className="text-sm text-gray-600">Bagging</p>
                  <p className="text-gray-800 font-bold">Random Subsets</p>
                </div>
                <div className="bg-white p-3 rounded border border-gray-200 text-center">
                  <p className="text-sm text-gray-600">Voting</p>
                  <p className="text-gray-800 font-bold">Wisdom of Crowd</p>
                </div>
                <div className="bg-white p-3 rounded border border-gray-200 text-center">
                  <p className="text-sm text-gray-600">Robustness</p>
                  <p className="text-gray-800 font-bold">Low Variance</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Main Grid: Visualization + Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Visualization - Left */}
            <div className="lg:col-span-2 space-y-6">
              <Card title="Ensemble Decision Boundary" className="h-full">
                <ClassificationPlot 
                  data={data} 
                  predictProb={(x, y) => Number(simulator.predict(x, y))} 
                />
              </Card>
            </div>

            {/* Controls - Right Side */}
            <div className="space-y-6">
              <Card title="Forest Controls">
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-semibold text-gray-700 uppercase tracking-tighter">Number of Trees</label>
                      <span className="text-lg font-bold text-emerald-600">{numTrees}</span>
                    </div>
                    <input 
                      type="range" min="1" max="50" step="1"
                      value={numTrees}
                      onChange={(e) => handleParamChange(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                    />
                    <div className="text-xs text-gray-500 mt-1">1 to 50 (More trees = smoother boundary)</div>
                  </div>

                  <div>
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

              <Card title="Ensemble Metrics">
                <div className="space-y-6">
                  <div className="text-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Overall Accuracy</p>
                    <p className="text-5xl font-black text-emerald-500 tracking-tighter">
                      {(state.accuracy * 100).toFixed(0)}%
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                     <div className="text-center">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Trees</p>
                        <p className="text-xl font-bold text-slate-700">{numTrees}</p>
                     </div>
                     <div className="text-center">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Bootstrap</p>
                        <p className="text-xl font-bold text-slate-700">63.2%</p>
                     </div>
                  </div>
                </div>
              </Card>

              <div className="text-center bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-2">Knowledge Check</h3>
                <Button onClick={() => setShowQuiz(true)} variant="primary" className="w-full">Start Quiz</Button>
              </div>
            </div>
          </div>

          {/* Full Width Row: Tree Inspection */}
          <div className="w-full">
            <Card title="Individual Tree Inspection" className="overflow-hidden">
              <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-xs text-slate-500 font-medium">
                  Examine any individual tree from the forest to see how it contributes to the collective decision.
                </p>
                <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Select Tree</span>
                   <select 
                     className="bg-transparent border-none text-sm font-black text-emerald-600 focus:ring-0 cursor-pointer"
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
                      explanation: 'Random Forests are very resistant to overfitting as you add more trees, because the variance reduces while bias stays stable.',
                    },
                    {
                      id: 'arf-5',
                      question: 'What does "Wisdom of the Crowd" refer to in this context?',
                      options: [
                        'Asking users for labels', 
                        'The collective prediction of many independent trees', 
                        'The size of the training dataset', 
                        'The complexity of the decision boundary'
                      ],
                      correct: 1,
                      explanation: 'It refers to the fact that a large group of independent trees will almost always outperform a single tree by canceling out each other\'s random errors.',
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
