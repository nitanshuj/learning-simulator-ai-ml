
import React, { useEffect, useState, useCallback } from 'react'
import { ClassificationPlot, Button, Card, Quiz, Navbar, Footer, BackButton, SimpleLossChart, Sidebar } from '@/components'
import { 
  LogisticRegression, 
  LogisticRegressionState, 
  generateMultiClassData, 
  ClassificationData 
} from '@/simulators'

export const LogisticRegressionModule: React.FC = () => {
  const [simulator, setSimulator] = useState<LogisticRegression | null>(null)
  const [state, setState] = useState<LogisticRegressionState | null>(null)
  const [data, setData] = useState<ClassificationData | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [learningRate, setLearningRate] = useState(0.1)
  const [numClasses, setNumClasses] = useState(2)
  const [regType, setRegType] = useState<'none' | 'l1' | 'l2'>('none')
  const [regLambda, setRegLambda] = useState(0.01)
  const [showQuiz, setShowQuiz] = useState(false)

  // Initialize simulator
  useEffect(() => {
    const sim = new LogisticRegression({ 
      learningRate: 0.1, 
      numClasses: 2,
      regularization: 'none',
      regLambda: 0.01
    })
    const initialData = generateMultiClassData(60, 2, 1.8)
    sim.setData(initialData)
    
    setSimulator(sim)
    setData(initialData)
    setState(sim.getState())
  }, [])

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
      
      if (newState.isConverged || iterations >= 100) {
        clearInterval(interval)
        setIsRunning(false)
      }
    }, 40)
  }, [simulator, isRunning])

  const handleTrain = () => {
    if (!simulator || isRunning) return
    setIsRunning(true)
    setTimeout(() => {
      let current = simulator.getState()
      for(let i=0; i<500; i++) {
        current = simulator.step()
        if (current.isConverged) break
      }
      setState(current)
      setIsRunning(false)
    }, 0)
  }

  const handleReset = () => {
    if (simulator) {
      simulator.setParams({ 
        learningRate: 0.1, 
        regularization: 'none', 
        regLambda: 0.01 
      })
      simulator.reset()
      setLearningRate(0.1)
      setRegType('none')
      setRegLambda(0.01)
      setState(simulator.getState())
    }
    setIsRunning(false)
  }

  const handleDataChange = (classes: number) => {
    setNumClasses(classes)
    const newData = generateMultiClassData(classes * 25, classes, 2.0)
    simulator?.setParams({ numClasses: classes })
    simulator?.setData(newData)
    setData(newData)
    setState(simulator?.getState() || null)
    setIsRunning(false)
  }

  const handleParamUpdate = (updates: any) => {
    if (!simulator) return
    if (updates.regType !== undefined) setRegType(updates.regType)
    if (updates.regLambda !== undefined) setRegLambda(updates.regLambda)
    if (updates.learningRate !== undefined) setLearningRate(updates.learningRate)

    simulator.setParams({
      learningRate: updates.learningRate ?? learningRate,
      regularization: updates.regType ?? regType,
      regLambda: updates.regLambda ?? regLambda
    })
    setState(simulator.getState())
  }

  if (!simulator || !state || !data) return null

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />
      <Sidebar />
      <div className="lg:pl-72 pt-16">
        <div className="max-w-6xl mx-auto space-y-8 p-6 lg:p-10">
          <BackButton />

        {/* Header (Matching Linear Regression Style) */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Logistic Regression Learning Simulator
          </h1>
          <p className="text-gray-600 text-lg">
            Master classification boundaries using Softmax, Gradient Descent, and Regularization
          </p>
        </div>

        {/* Top Explanation Card */}
        <Card title="What is Logistic Regression?" className="bg-blue-50 border-blue-200">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">The Model</h3>
              <p className="text-gray-700 text-lg font-mono bg-white p-3 rounded border border-gray-200">
                P(Class) = Softmax(weights × input + bias)
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">How it Works</h3>
              <p className="text-gray-700">
                Logistic Regression (and its multi-class version, Softmax Regression) predicts the probability that a data point belongs to a specific category. It uses <strong>gradient descent</strong> to optimize weights so that the <strong>Cross-Entropy Loss</strong> is minimized.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-3 rounded border border-gray-200">
                <p className="text-sm text-gray-600 font-semibold">Softmax/Sigmoid</p>
                <p className="text-gray-800 text-sm">Squashes values to probabilities (0-1)</p>
              </div>
              <div className="bg-white p-3 rounded border border-gray-200">
                <p className="text-sm text-gray-600 font-semibold">Decision Boundary</p>
                <p className="text-gray-800 text-sm">Separates classes in feature space</p>
              </div>
              <div className="bg-white p-3 rounded border border-gray-200">
                <p className="text-sm text-gray-600 font-semibold">Loss (Log Loss)</p>
                <p className="text-gray-800 text-sm">Penalizes confident wrong predictions</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Main Grid: Plot + Stats/Params */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Visualization - Left */}
          <div className="lg:col-span-2">
            <Card title="Decision Boundary & Probability Heatmap" className="h-full overflow-hidden">
              <ClassificationPlot 
                data={data}
                predictProb={(x1, x2) => simulator.predict(x1, x2)}
                height={450}
                isMultiClass={true}
                accuracy={state.accuracy}
                loss={state.loss}
                title={`${numClasses === 2 ? 'Binary' : numClasses + '-Class'} Decision Regions`}
              />
            </Card>
          </div>

          {/* Parameters & Quick Stats - Right */}
          <div className="space-y-8">
            <Card title="Parameters & Stats" className="h-full">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-tight">Learning Rate</label>
                    <span className="text-lg font-black text-indigo-600">{learningRate.toFixed(2)}</span>
                  </div>
                  <input 
                    type="range" min="0.01" max="1.0" step="0.01"
                    value={learningRate}
                    onChange={(e) => handleParamUpdate({ learningRate: parseFloat(e.target.value) })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                      <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Accuracy</p>
                      <p className="text-3xl font-black text-emerald-500">{(state.accuracy * 100).toFixed(0)}%</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                      <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Iterations</p>
                      <p className="text-3xl font-black text-gray-900">{state.iterations}</p>
                    </div>
                  </div>
                  <div className="mt-4 bg-gray-900 p-4 rounded-2xl text-center">
                    <p className="text-[10px] font-bold text-gray-500 uppercase mb-1">Total Loss</p>
                    <p className="text-xl font-mono font-bold text-emerald-400">{state.loss.toFixed(6)}</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Multi-Class Selection */}
        <Card title="Step 1: Data Setup">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-bold text-gray-700 uppercase tracking-tight block mb-3">Number of Classes</label>
              <div className="grid grid-cols-3 gap-3">
                {[2, 3, 4].map(n => (
                  <button
                    key={n}
                    onClick={() => handleDataChange(n)}
                    className={`py-3 rounded-xl text-sm font-black border-2 transition-all ${
                      numClasses === n
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300'
                    }`}
                  >
                    {n} Classes
                  </button>
                ))}
              </div>
            </div>
            <Button
              onClick={() => handleDataChange(numClasses)}
              variant="outline"
              size="sm"
              className="w-full mt-4 border-dashed border-2 hover:border-indigo-500 hover:text-indigo-600 transition-all"
            >
              🔄 Regenerate Current Data
            </Button>
          </div>
        </Card>

        {/* Regularization Options */}
        <Card title="Step 2: Regularization (Optional)">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
            <div className="md:col-span-2 flex gap-3">
              {(['none', 'l1', 'l2'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => handleParamUpdate({ regType: type })}
                  className={`flex-1 py-3 rounded-xl text-xs font-black border-2 transition-all uppercase tracking-widest ${
                    regType === type 
                    ? 'bg-gray-900 text-white border-gray-900' 
                    : 'bg-white text-gray-500 border-gray-100 hover:bg-gray-50'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
            {regType !== 'none' && (
              <div className="md:col-span-2 flex items-center gap-6 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="flex-1">
                  <div className="flex justify-between mb-2">
                    <span className="text-[10px] font-bold text-gray-400 uppercase">Penalty Strength (λ)</span>
                    <span className="text-xs font-bold text-gray-900">{regLambda.toFixed(3)}</span>
                  </div>
                  <input 
                    type="range" min="0.001" max="0.1" step="0.001"
                    value={regLambda}
                    onChange={(e) => handleParamUpdate({ regLambda: parseFloat(e.target.value) })}
                    className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-900"
                  />
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Training Controls */}
        <Card title="Step 3: Train the Model">
          <div className="flex flex-wrap gap-4 items-center">
            <Button onClick={handleStep} disabled={isRunning || state.isConverged} variant="primary" size="md">
              Single Step
            </Button>
            <Button onClick={handleRun} disabled={isRunning || state.isConverged} variant="primary" size="md">
              Run 100x
            </Button>
            <Button onClick={handleTrain} disabled={isRunning || state.isConverged} variant="primary" size="md">
              Train to Convergence
            </Button>
            <Button onClick={handleReset} variant="outline" size="md">
              Reset
            </Button>
            <div className="ml-auto">
               <span className={`text-xs font-black px-3 py-1 rounded-full uppercase tracking-tighter ${state.isConverged ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
                 {state.isConverged ? '✓ Converged' : isRunning ? '⏳ Training...' : '• Ready'}
               </span>
            </div>
          </div>
        </Card>

        {/* Loss History Chart */}
        {state.history.length > 0 && (
          <Card title="Training Progress (Loss Minimization)">
            <SimpleLossChart 
              iterations={state.history.map(h => h.iteration)}
              losses={state.history.map(h => h.loss)}
            />
          </Card>
        )}

        {/* Quiz Section */}
        <Card title="Test Your Knowledge">
          {!showQuiz ? (
            <div className="text-center py-8">
               <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Think you've mastered Logistic Regression?</h3>
               <Button onClick={() => setShowQuiz(true)}>Start Advanced Quiz</Button>
            </div>
          ) : (
            <Quiz 
              title="Softmax & Regularization Assessment"
              questions={[
                {
                  id: 'adv-log-1',
                  question: 'What is the multi-class version of the Sigmoid function?',
                  options: ['ReLU', 'Softmax', 'Tanh', 'Linear'],
                  correct: 1,
                  explanation: 'Softmax turns a vector of scores into a probability distribution where all values sum to 1.',
                },
                {
                  id: 'adv-log-2',
                  question: 'Which regularization is better at producing sparse models (zeroing out weights)?',
                  options: ['L2', 'L1 (Lasso)', 'No regularization', 'Standardization'],
                  correct: 1,
                  explanation: 'L1 regularization applies a penalty on absolute values, which encourages many weights to become exactly zero.',
                },
                {
                  id: 'adv-log-3',
                  question: 'What happens to the loss as the model becomes more confident in its correct predictions?',
                  options: ['Loss increases', 'Loss stays the same', 'Loss decreases towards zero', 'Loss becomes negative'],
                  correct: 2,
                  explanation: 'Cross-entropy loss approaches zero as the predicted probability for the correct class approaches 1.',
                },
                {
                  id: 'adv-log-4',
                  question: 'What does a high "λ" value in regularization imply?',
                  options: ['Faster training', 'Stronger penalty on weight magnitudes', 'Higher learning rate', 'More hidden layers'],
                  correct: 1,
                  explanation: 'λ controls the strength of the penalty. A high λ forces weights to be very small, which can prevent overfitting but may lead to underfitting.',
                },
                {
                  id: 'adv-log-5',
                  question: 'Is Logistic Regression a linear or non-linear classifier?',
                  options: ['Strictly non-linear', 'Linear (decision boundary is a line/plane)', 'It depends on the activation', 'Only non-linear when using Softmax'],
                  correct: 1,
                  explanation: 'Logistic Regression is a linear classifier because its decision boundary is a linear combination of features, even if the probability mapping is non-linear.',
                }
              ]}
            />
          )}
        </Card>
        </div>
      </div>
      <Footer />
    </div>
  )
}
