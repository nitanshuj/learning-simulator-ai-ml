import React, { useEffect, useState, useCallback } from 'react'
import { OptimizationPlot, Button, Card, Quiz, Navbar, Footer, BackButton } from '@/components'
import { GradientDescent, GradientDescentState, CostFunctionType } from '@/simulators'

export const GradientDescentModule: React.FC = () => {
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
      <BackButton />
      
      <main className="pt-24 pb-20 max-w-7xl mx-auto px-lg sm:px-2xl lg:px-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl">
          
          {/* Left Column: Lesson & Controls (4/12) */}
          <div className="lg:col-span-4 space-y-xl">
            <Card title="Gradient Descent Intuition">
              <div className="prose prose-slate prose-sm">
                <p>
                  Gradient Descent is an optimization algorithm used to find the minimum of a function. 
                  In machine learning, we use it to minimize the <strong>Loss Function</strong>.
                </p>
                <ul className="text-sm">
                  <li><strong>Gradient:</strong> The direction of steepest ascent.</li>
                  <li><strong>Learning Rate:</strong> The size of the step we take in the <em>opposite</em> direction of the gradient.</li>
                </ul>
              </div>
            </Card>

            <Card title="Optimizer Controls">
              <div className="space-y-xl">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-md">Cost Function</label>
                  <select 
                    value={functionType}
                    onChange={(e) => handleFunctionChange(e.target.value as CostFunctionType)}
                    className="w-full p-md border border-divider rounded-xs bg-white text-sm"
                  >
                    <option value="quadratic">Simple Bowl (Quadratic)</option>
                    <option value="bowl">Elliptical Bowl</option>
                    <option value="valley">Rosenbrock Valley</option>
                    <option value="saddle">Saddle Point</option>
                    <option value="local_minima">Local Minima</option>
                  </select>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-md">
                    <label className="text-sm font-semibold text-slate-700">Learning Rate</label>
                    <span className="text-sm font-bold text-blue-600">{learningRate.toFixed(3)}</span>
                  </div>
                  <input 
                    type="range" 
                    min="0.001" 
                    max="1.5" 
                    step="0.01"
                    value={learningRate}
                    onChange={(e) => handleLRChange(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-xs">
                    <span>Low (Stable)</span>
                    <span>High (Fast/Unstable)</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-md">
                  <Button onClick={handleStep} disabled={isRunning || state.isConverged} variant="primary" size="sm">
                    Step
                  </Button>
                  <Button onClick={handleRun} disabled={isRunning || state.isConverged} variant="primary" size="sm">
                    Run Animation
                  </Button>
                  <Button onClick={handleReset} variant="outline" size="sm">
                    Reset
                  </Button>
                </div>
              </div>
            </Card>

            <Card title="Metrics">
              <div className="grid grid-cols-2 gap-xl">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-xs">Iterations</p>
                  <p className="text-2xl font-bold text-slate-900">{state.iterationCount}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-xs">Status</p>
                  <p className={`text-lg font-bold ${state.isConverged ? 'text-emerald-500' : 'text-amber-500'}`}>
                    {state.isConverged ? 'Converged' : 'Optimizing...'}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-xs">Current Cost</p>
                  <p className="text-2xl font-bold text-blue-600">{state.currentPoint.z.toFixed(6)}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column: Visualization (8/12) */}
          <div className="lg:col-span-8 space-y-xl">
            <div className="flex justify-between items-center mb-md">
              <h2 className="text-h3 text-slate-900">Optimization Landscape</h2>
              <div className="bg-white border border-divider p-1 rounded-md flex gap-1">
                <button 
                  onClick={() => setViewMode('2d')}
                  className={`px-3 py-1 text-xs font-semibold rounded ${viewMode === '2d' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  Contour
                </button>
                <button 
                  onClick={() => setViewMode('3d')}
                  className={`px-3 py-1 text-xs font-semibold rounded ${viewMode === '3d' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  Surface
                </button>
              </div>
            </div>
            
            <OptimizationPlot 
              currentPoint={state.currentPoint}
              path={state.path}
              functionType={functionType}
              calculateCost={(x, y) => simulator.calculateCost(x, y)}
              viewMode={viewMode}
              height={600}
            />

            {!showQuiz ? (
              <Card className="text-center py-xl">
                <h3 className="text-h4 mb-lg">Think you understand it?</h3>
                <Button onClick={() => setShowQuiz(true)}>Take the Optimization Quiz</Button>
              </Card>
            ) : (
              <Quiz 
                title="Gradient Descent Quiz"
                questions={[
                  // ── Easy (1–7) ──
                  {
                    id: 'gd-1',
                    question: 'What is the main purpose of Gradient Descent?',
                    options: ['Increase model error', 'Minimize the loss function', 'Split the dataset', 'Normalize features'],
                    correct: 1,
                    explanation: 'Gradient Descent is an optimization algorithm that minimizes the cost/loss function by iteratively updating model parameters.',
                  },
                  {
                    id: 'gd-2',
                    question: 'In machine learning, Gradient Descent is mainly used to:',
                    options: ['Evaluate metrics', 'Optimize model parameters', 'Visualize data', 'Encode labels'],
                    correct: 1,
                    explanation: 'It finds the best values for weights and biases that minimize prediction error during training.',
                  },
                  {
                    id: 'gd-3',
                    question: 'What does the gradient represent?',
                    options: ['Dataset size', 'Direction of steepest increase of the loss', 'Number of epochs', 'Accuracy score'],
                    correct: 1,
                    explanation: 'The gradient is a vector that points in the direction where the loss increases fastest with respect to model parameters.',
                  },
                  {
                    id: 'gd-4',
                    question: 'Why do we move in the negative gradient direction?',
                    options: ['To maximize loss', 'To minimize loss', 'To randomize weights', 'To increase learning rate'],
                    correct: 1,
                    explanation: 'The gradient points uphill, so moving opposite to it (downhill) reduces the loss most efficiently.',
                  },
                  {
                    id: 'gd-5',
                    question: 'What is the learning rate?',
                    options: ['Number of features', 'Step size for parameter updates', 'Number of classes', 'Size of dataset'],
                    correct: 1,
                    explanation: 'The learning rate (α) controls how large each parameter update step is during optimization. Too large diverges; too small is slow.',
                  },
                  {
                    id: 'gd-6',
                    question: 'What can happen if the learning rate is too high?',
                    options: ['Faster perfect convergence always', 'Overshooting or divergence', 'No updates happen', 'Model becomes linear'],
                    correct: 1,
                    explanation: 'A very high learning rate causes large jumps that skip past the minimum, making training unstable or divergent.',
                  },
                  {
                    id: 'gd-7',
                    question: 'What can happen if the learning rate is too low?',
                    options: ['Training may be very slow', 'Model instantly converges', 'Loss becomes zero immediately', 'Features disappear'],
                    correct: 0,
                    explanation: 'A very small learning rate takes tiny steps — the model may eventually converge but will require many more iterations.',
                  },
                  // ── Medium (8–14) ──
                  {
                    id: 'gd-8',
                    question: 'Which formula correctly updates a parameter θ in Gradient Descent?',
                    options: ['θ := θ + J(θ)', 'θ := θ − α · ∂J/∂θ', 'θ := α · θ', 'θ := θ²'],
                    correct: 1,
                    explanation: 'We subtract the gradient (scaled by learning rate α) from the current parameter value to step towards the minimum.',
                  },
                  {
                    id: 'gd-9',
                    question: 'What does α typically represent in the update rule?',
                    options: ['Accuracy', 'Learning rate', 'Gradient value', 'Number of layers'],
                    correct: 1,
                    explanation: 'α (alpha) is the standard symbol for the learning rate — the step size used in each parameter update.',
                  },
                  {
                    id: 'gd-10',
                    question: 'What is Batch Gradient Descent?',
                    options: ['Uses one sample per update', 'Uses the full dataset per update', 'Uses random half of data', 'Uses no data'],
                    correct: 1,
                    explanation: 'Batch GD computes the gradient using the entire training set each step — precise but slow on large datasets.',
                  },
                  {
                    id: 'gd-11',
                    question: 'What is Stochastic Gradient Descent (SGD)?',
                    options: ['Uses one training example per update', 'Uses all examples every step', 'Uses no gradient', 'Uses only test data'],
                    correct: 0,
                    explanation: 'SGD updates parameters after each single training example — much faster per step but introduces noisy updates.',
                  },
                  {
                    id: 'gd-12',
                    question: 'What is Mini-Batch Gradient Descent?',
                    options: ['Uses small subsets of data per update', 'Uses exactly one sample only', 'Uses the complete dataset only', 'Uses validation data only'],
                    correct: 0,
                    explanation: 'Mini-batch GD balances efficiency and stability by computing gradients on small batches (e.g. 32 or 64 samples).',
                  },
                  {
                    id: 'gd-13',
                    question: 'Why is feature scaling helpful for Gradient Descent?',
                    options: ['Reduces labels', 'Speeds up convergence', 'Removes overfitting completely', 'Increases dataset size'],
                    correct: 1,
                    explanation: 'When features have different scales, the loss surface is elongated. Scaling makes it more circular so GD converges faster.',
                  },
                  {
                    id: 'gd-14',
                    question: 'What does convergence mean in the context of Gradient Descent?',
                    options: ['Parameters stop changing significantly near minimum', 'Accuracy becomes 100%', 'Dataset becomes smaller', 'Features become zero'],
                    correct: 0,
                    explanation: 'Convergence means updates have become very small and the loss has stabilised — the optimizer has found a minimum.',
                  },
                  // ── Hard (15–20) ──
                  {
                    id: 'gd-15',
                    question: 'What problem occurs when gradients become extremely small in deep networks?',
                    options: ['Exploding gradients', 'Vanishing gradients', 'Multicollinearity', 'Under-sampling'],
                    correct: 1,
                    explanation: 'Vanishing gradients cause earlier layers to learn very slowly or not at all — common with sigmoid/tanh activations in deep nets.',
                  },
                  {
                    id: 'gd-16',
                    question: 'What problem occurs when gradients become extremely large?',
                    options: ['Vanishing gradients', 'Exploding gradients', 'Regularization', 'Underfitting'],
                    correct: 1,
                    explanation: 'Exploding gradients produce massive parameter updates that destabilise training. Gradient clipping is a common fix.',
                  },
                  {
                    id: 'gd-17',
                    question: 'Why can SGD escape shallow local minima better than Batch GD?',
                    options: ['Because of noisy updates', 'Because it uses exact gradients', 'Because it never updates weights', 'Because it removes learning rate'],
                    correct: 0,
                    explanation: 'The noise from individual samples can push the optimizer out of shallow local minima and saddle points that Batch GD gets stuck in.',
                  },
                  {
                    id: 'gd-18',
                    question: 'What does Momentum add to Gradient Descent?',
                    options: ['Stops all updates', 'Past update direction to smooth optimization', 'Increases dataset size', 'Removes gradients'],
                    correct: 1,
                    explanation: 'Momentum accumulates a velocity vector in the direction of past gradients, accelerating convergence and reducing oscillation.',
                  },
                  {
                    id: 'gd-19',
                    question: 'Why are adaptive optimizers like Adam popular?',
                    options: ['They adjust learning rates per parameter', 'They need no data', 'They remove loss functions', 'They always find the global minimum'],
                    correct: 0,
                    explanation: 'Adam (Adaptive Moment Estimation) maintains per-parameter learning rates using gradient history, combining momentum and RMSProp.',
                  },
                  {
                    id: 'gd-20',
                    question: 'If the loss oscillates and does not settle, what is a common cause?',
                    options: ['Learning rate too high', 'Dataset too clean', 'Too few features', 'Zero gradients everywhere'],
                    correct: 0,
                    explanation: 'Large update steps overshoot the minimum and bounce around it. Reducing the learning rate or using a scheduler usually fixes this.',
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
