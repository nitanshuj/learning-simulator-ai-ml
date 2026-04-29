
import React, { useEffect, useState, useCallback } from 'react'
import { OptimizationPlot, Button, Card, Quiz, Navbar, Footer, BackButton, Sidebar } from '@/components'
import { GradientDescent, GradientDescentState, CostFunctionType } from '@/simulators'

export const GradientDescentModule: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<'visual' | 'theory'>('visual');

  const [simulator, setSimulator] = useState<GradientDescent | null>(null)
  const [state, setState] = useState<GradientDescentState | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [learningRate, setLearningRate] = useState(0.1)
  const [functionType, setFunctionType] = useState<CostFunctionType>('quadratic')
  const [viewMode, setViewMode] = useState<'2d' | '3d'>('2d')
  const [showQuiz, setShowQuiz] = useState(false)

  // Initialize simulator
  useEffect(() => {
    const sim = new GradientDescent({
      learningRate: 0.1,
      initialX: 4,
      initialY: 4,
      functionType: 'quadratic'
    })
    setSimulator(sim)
    setState(sim.getState())
  }, [])

  // Handle parameter changes
  const handleLRChange = (lr: number) => {
    setLearningRate(lr)
    simulator?.setLearningRate(lr)
  }

  const handleFunctionChange = (type: CostFunctionType) => {
    setFunctionType(type)
    simulator?.setFunctionType(type)
    setState(simulator?.getState() || null)
  }

  const handleStep = useCallback(() => {
    if (!simulator) return
    const newState = simulator.step()
    setState(newState)
  }, [simulator])

  const handleRun = useCallback(() => {
    if (!simulator || isRunning) return
    setIsRunning(true)
    
    let iterations = 0
    const interval = setInterval(() => {
      const newState = simulator.step()
      setState(newState)
      iterations++
      
      if (newState.isConverged || iterations >= 50) {
        clearInterval(interval)
        setIsRunning(false)
      }
    }, 100)
  }, [simulator, isRunning])

  const handleReset = () => {
    simulator?.reset(4, 4)
    setState(simulator?.getState() || null)
    setIsRunning(false)
  }

  if (!simulator || !state) return null

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />
      <Sidebar />
      <div className="lg:pl-72 pt-16">
        <div className="max-w-6xl mx-auto space-y-8 p-6 lg:p-10">
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
{/* Header (Linear Regression Style) */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Gradient Descent Learning Simulator
          </h1>
          <p className="text-gray-600 text-lg">
            Visualize how optimization algorithms "walk" down the error landscape to find the global minimum.
          </p>
        </div>

        {/* Theory Card (Linear Regression Style) */}
        <Card title="What is Gradient Descent?" className="bg-blue-50 border-blue-200">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">The Algorithm</h3>
              <p className="text-gray-700 text-lg font-mono bg-white p-3 rounded border border-gray-200">
                θ := θ - α · ∇J(θ)
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">How it Works</h3>
              <p className="text-gray-700">
                Gradient Descent is an iterative optimization algorithm used to find the minimum of a function. 
                In Machine Learning, we use it to minimize the <strong>Loss Function</strong> by calculating the gradient (slope) at our current position and taking a small step in the opposite direction.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-3 rounded border border-gray-200">
                <p className="text-sm text-gray-600 font-semibold">Learning Rate (α)</p>
                <p className="text-gray-800 text-sm">Size of the step taken each iteration</p>
              </div>
              <div className="bg-white p-3 rounded border border-gray-200">
                <p className="text-sm text-gray-600 font-semibold">Gradient (∇)</p>
                <p className="text-gray-800 text-sm">Direction of steepest ascent</p>
              </div>
              <div className="bg-white p-3 rounded border border-gray-200">
                <p className="text-sm text-gray-600 font-semibold">Convergence</p>
                <p className="text-gray-800 text-sm">Finding the point where loss is minimal</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Main Grid: Plot + Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Visualization - Left */}
          <div className="lg:col-span-2">
            <Card 
              title="Optimization Landscape" 
              className="h-full"
              headerAction={
                <div className="bg-gray-100 p-1 rounded-lg flex gap-1">
                  <button 
                    onClick={() => setViewMode('2d')}
                    className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${viewMode === '2d' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:bg-gray-200'}`}
                  >
                    Contour (2D)
                  </button>
                  <button 
                    onClick={() => setViewMode('3d')}
                    className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${viewMode === '3d' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:bg-gray-200'}`}
                  >
                    Surface (3D)
                  </button>
                </div>
              }
            >
              <OptimizationPlot 
                currentPoint={state.currentPoint}
                path={state.path}
                functionType={functionType}
                calculateCost={(x, y) => simulator.calculateCost(x, y)}
                viewMode={viewMode}
                height={500}
              />
            </Card>
          </div>

          {/* Parameters & Stats - Right */}
          <div className="space-y-8">
            <Card title="Adjust Parameters" className="h-full">
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Cost Function</label>
                  <select 
                    value={functionType}
                    onChange={(e) => handleFunctionChange(e.target.value as CostFunctionType)}
                    className="w-full p-3 border-2 border-gray-100 rounded-xl bg-white text-sm font-bold text-gray-700 focus:border-blue-500 outline-none transition-colors"
                  >
                    <option value="quadratic">Simple Bowl (Quadratic)</option>
                    <option value="bowl">Elliptical Bowl</option>
                    <option value="valley">Rosenbrock Valley</option>
                    <option value="saddle">Saddle Point</option>
                    <option value="local_minima">Local Minima</option>
                  </select>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Learning Rate</label>
                    <span className="text-lg font-black text-blue-600">{learningRate.toFixed(3)}</span>
                  </div>
                  <input 
                    type="range" min="0.001" max="1.5" step="0.01"
                    value={learningRate}
                    onChange={(e) => handleLRChange(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400 mt-2 font-bold uppercase">
                    <span>Stable</span>
                    <span>Unstable</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-50 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-center">
                      <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Iterations</p>
                      <p className="text-2xl font-black text-gray-900">{state.iterationCount}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-center">
                      <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Status</p>
                      <p className={`text-sm font-black uppercase ${state.isConverged ? 'text-emerald-500' : 'text-amber-500'}`}>
                        {state.isConverged ? 'Converged' : 'Optimizing'}
                      </p>
                    </div>
                  </div>
                  <div className="bg-blue-600 p-4 rounded-2xl text-center shadow-lg shadow-blue-100">
                    <p className="text-[10px] font-bold text-blue-200 uppercase mb-1">Current Cost (Z)</p>
                    <p className="text-xl font-mono font-black text-white">{state.currentPoint.z.toFixed(6)}</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Training Controls */}
        <Card title="Training Controls">
          <div className="flex gap-4 flex-wrap items-center">
            <Button onClick={handleStep} disabled={isRunning || state.isConverged} variant="primary" size="md">
              Single Step
            </Button>
            <Button onClick={handleRun} disabled={isRunning || state.isConverged} variant="primary" size="md">
              Run Animation
            </Button>
            <Button onClick={handleReset} variant="outline" size="md">
              Reset Optimizer
            </Button>
            <div className="ml-auto text-sm text-gray-500 font-bold uppercase tracking-tighter">
              {isRunning ? '⏳ Optimizing Landscape...' : '✓ Ready to descent'}
            </div>
          </div>
        </Card>

        {/* Quiz Section */}
        <Card title="Test Your Knowledge">
          {!showQuiz ? (
            <div className="text-center py-8">
               <h3 className="text-xl font-bold text-gray-800 mb-4">Mastered the landscape?</h3>
               <p className="text-gray-500 mb-8 max-w-md mx-auto">Take the Optimization Quiz to test your understanding of gradients, learning rates, and convergence.</p>
               <Button onClick={() => setShowQuiz(true)}>Start Quiz</Button>
            </div>
          ) : (
            <Quiz 
              title="Gradient Descent & Optimization Assessment"
              questions={[
                {
                  id: 'gd-1',
                  question: 'What is the main purpose of Gradient Descent?',
                  options: ['Increase model error', 'Minimize the loss function', 'Split the dataset', 'Normalize features'],
                  correct: 1,
                  explanation: 'Gradient Descent is an optimization algorithm that minimizes the cost/loss function by iteratively updating model parameters.',
                },
                {
                  id: 'gd-2',
                  question: 'What does the gradient vector point towards?',
                  options: ['The local minimum', 'The steepest increase in the function', 'The average value', 'The origin (0,0)'],
                  correct: 1,
                  explanation: 'The gradient points uphill. That is why we move in the OPPOSITE direction to find the minimum.',
                },
                {
                  id: 'gd-3',
                  question: 'If the learning rate is too small, what happens?',
                  options: ['The model will never converge', 'Training will be very slow', 'The model will overshoot the minimum', 'The gradients will vanish'],
                  correct: 1,
                  explanation: 'Small learning rates result in tiny steps, requiring many more iterations to reach the optimum.',
                },
                {
                  id: 'gd-4',
                  question: 'What is a "local minimum" in optimization?',
                  options: ['The best possible point in the entire function', 'A valley that is lower than its immediate neighbors but not necessarily the lowest overall', 'A point where the gradient is infinite', 'The starting point of the optimization'],
                  correct: 1,
                  explanation: 'A local minimum is a valley where the optimizer might get "stuck", even if a deeper global minimum exists elsewhere.',
                },
                {
                  id: 'gd-5',
                  question: 'In the update rule θ := θ − α · ∇J(θ), what does α represent?',
                  options: ['The gradient', 'The learning rate', 'The loss', 'The momentum'],
                  correct: 1,
                  explanation: 'Alpha (α) is the learning rate, controlling the size of the steps we take down the gradient.',
                }
              ]}
            />
          )}
        </Card>
          </div>
          
          <div className={activeTab === 'theory' ? 'block' : 'hidden'}>
            <div className="bg-white p-12 rounded-3xl border border-gray-200 shadow-sm min-h-[400px] flex items-center justify-center">
              <p className="text-gray-400 text-xl font-medium">Theory and Notes coming soon...</p>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  )
}
