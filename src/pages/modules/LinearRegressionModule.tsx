import React, { useEffect, useState } from 'react'
import { 
  SimplePlot, 
  SimpleLossChart, 
  PresetButtons, 
  Button, 
  Card, 
  Quiz, 
  Navbar, 
  Footer, 
  BackButton,
  Sidebar
} from '@/components'
import {
  LinearRegression,
  LINEAR_REGRESSION_PRESETS,
  LinearRegressionState,
} from '@/simulators'
import { generateLinearDataset } from '@/simulators'

/**
 * Linear Regression Module - Complete End-to-End Integration
 * Combines lesson content, simulator engine, controls, and visualization
 */
export const LinearRegressionModule: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<'visual' | 'theory'>('visual');

  const [simulator, setSimulator] = useState<LinearRegression | null>(null)
  const [state, setState] = useState<LinearRegressionState | null>(null)
  const [trainData, setTrainData] = useState<{ x: number[], y: number[] } | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [showQuiz, setShowQuiz] = useState(false)
  const [learningRate, setLearningRate] = useState(0.01)
  const [slope, setSlope] = useState(1)
  const [intercept, setIntercept] = useState(0)
  const [regType, setRegType] = useState<'none' | 'l1' | 'l2'>('none')
  const [lambda, setLambda] = useState(0.1)
  const [selectedPreset, setSelectedPreset] = useState<string | undefined>()

  // Initialize simulator
  useEffect(() => {
    const sim = new LinearRegression({
      initialSlope: 1,
      initialIntercept: 0,
      learningRate: 0.01,
    })

    // Generate training data
    const data = generateLinearDataset(50, 2, 1, 1, -5, 5)
    sim.setTrainData(data.x, data.y)

    // Generate test data
    const testData = generateLinearDataset(20, 2, 1, 0.8, -5, 5)
    sim.setTestData(testData.x, testData.y)

    setSimulator(sim)
    setTrainData({ x: data.x, y: data.y })

    // Set initial state
    const trainResults = sim.evaluateTrain()
    setState({
      params: sim.getParams(),
      trainLoss: trainResults.loss,
      trainR2: trainResults.r2,
      iterations: 0,
      history: [],
    })
  }, [])

  // Handle parameter changes
  const handleSlopeChange = (value: number) => {
    setSlope(value)
    if (simulator) {
      simulator.setParams({ slope: value })
      const trainResults = simulator.evaluateTrain()
      setState((prev) =>
        prev
          ? {
              ...prev,
              params: simulator.getParams(),
              trainLoss: trainResults.loss,
              trainR2: trainResults.r2,
            }
          : null,
      )
    }
  }

  const handleInterceptChange = (value: number) => {
    setIntercept(value)
    if (simulator) {
      simulator.setParams({ intercept: value })
      const trainResults = simulator.evaluateTrain()
      setState((prev) =>
        prev
          ? {
              ...prev,
              params: simulator.getParams(),
              trainLoss: trainResults.loss,
              trainR2: trainResults.r2,
            }
          : null,
      )
    }
  }

  const handleLearningRateChange = (value: number) => {
    setLearningRate(value)
    if (simulator) {
      // Re-initialize or update simulator config if needed
    }
  }

  // Unified parameter update
  const handleParamUpdate = (updates: any) => {
    if (!simulator) return

    if (updates.slope !== undefined) setSlope(updates.slope)
    if (updates.intercept !== undefined) setIntercept(updates.intercept)
    if (updates.regType !== undefined) setRegType(updates.regType)
    if (updates.lambda !== undefined) setLambda(updates.lambda)

    simulator.setParams(updates)
    
    const trainResults = simulator.evaluateTrain()
    setState((prev) => prev ? {
      ...prev,
      params: simulator.getParams(),
      trainLoss: trainResults.loss,
      trainR2: trainResults.r2,
    } : null)
  }

  // Single gradient descent step
  const handleStep = () => {
    if (!simulator || !state) return

    setIsRunning(true)
    const results = simulator.step()
    const history = simulator.getHistory()

    setState({
      params: simulator.getParams(),
      trainLoss: results.loss,
      trainR2: results.r2,
      iterations: results.iterationCount || 0,
      history,
    })

    setSlope(simulator.getParams().slope)
    setIntercept(simulator.getParams().intercept)
    setIsRunning(false)
  }

  // Run multiple steps
  const handleRun = () => {
    if (!simulator || !state || isRunning) return

    setIsRunning(true)

    // Run 20 steps with setInterval to show progress
    let stepCount = 0
    const interval = setInterval(() => {
      if (stepCount < 20) {
        const results = simulator.step()
        const history = simulator.getHistory()

        setState({
          params: simulator.getParams(),
          trainLoss: results.loss,
          trainR2: results.r2,
          iterations: results.iterationCount || 0,
          history,
        })

        setSlope(simulator.getParams().slope)
        setIntercept(simulator.getParams().intercept)
        stepCount++
      } else {
        clearInterval(interval)
        setIsRunning(false)
      }
    }, 50)
  }

  // Training to convergence
  const handleTrain = () => {
    if (!simulator || !state || isRunning) return

    setIsRunning(true)

    // Use setTimeout to allow UI to update
    setTimeout(() => {
      const finalState = simulator.fit(100)

      setState({
        params: simulator.getParams(),
        trainLoss: finalState.trainLoss,
        trainR2: finalState.trainR2,
        iterations: finalState.iterations,
        history: finalState.history,
      })

      setSlope(simulator.getParams().slope)
      setIntercept(simulator.getParams().intercept)
      setIsRunning(false)
    }, 0)
  }

  const handleReset = () => {
    if (!simulator) return
    simulator.setParams({ slope: 1, intercept: 0 })
    setSlope(1)
    setIntercept(0)
    setRegType('none')
    setLambda(0.1)
    setSelectedPreset(undefined)
    const trainResults = simulator.evaluateTrain()
    setState({
      params: simulator.getParams(),
      trainLoss: trainResults.loss,
      trainR2: trainResults.r2,
      iterations: 0,
      history: [],
    })
  }

  const handleRegenerateData = () => {
    if (!simulator) return
    const data = generateLinearDataset(50, 2, 1, 1, -5, 5)
    simulator.setTrainData(data.x, data.y)
    const testData = generateLinearDataset(20, 2, 1, 0.8, -5, 5)
    simulator.setTestData(testData.x, testData.y)
    setTrainData({ x: data.x, y: data.y })
    handleReset()
  }

  // Apply preset
  const handlePreset = (presetId: string) => {
    const preset = Object.values(LINEAR_REGRESSION_PRESETS).find(
      (p) => p.id === presetId,
    )
    if (!preset || !simulator) return

    simulator.setParams(preset.params)
    setSlope(preset.params.slope)
    setIntercept(preset.params.intercept)
    setSelectedPreset(presetId)

    const trainResults = simulator.evaluateTrain()
    setState((prev) =>
      prev
        ? {
            ...prev,
            params: simulator.getParams(),
            trainLoss: trainResults.loss,
            trainR2: trainResults.r2,
          }
        : null,
    )
  }

  if (!simulator || !state || !trainData) {
    return <div className="text-center py-8">Loading simulator...</div>
  }

  const { x, y } = trainData
  const predictions = simulator.predict(x)

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
{/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Linear Regression Learning Simulator
          </h1>
          <p className="text-gray-600 text-lg">
            Learn how linear regression uses gradient descent to find the best-fit line
          </p>
        </div>

        {/* Model Definition & Explanation - On Top */}
        <Card title="What is Linear Regression?" className="bg-blue-50 border-blue-200">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">The Model</h3>
              <p className="text-gray-700 text-lg font-mono bg-white p-3 rounded border border-gray-200">
                y = slope × x + intercept
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">How it Works</h3>
              <p className="text-gray-700">
                Linear regression finds the best-fit line through data points by minimizing the error 
                (Mean Squared Error) between predicted and actual values. We use <strong>gradient descent</strong> 
                to iteratively adjust the slope and intercept parameters until the loss is minimized.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-3 rounded border border-gray-200">
                <p className="text-sm text-gray-600">Slope (m)</p>
                <p className="text-gray-800">Controls the line's angle</p>
              </div>
              <div className="bg-white p-3 rounded border border-gray-200">
                <p className="text-sm text-gray-600">Intercept (b)</p>
                <p className="text-gray-800">Where line crosses Y-axis</p>
              </div>
              <div className="bg-white p-3 rounded border border-gray-200">
                <p className="text-sm text-gray-600">Loss (MSE)</p>
                <p className="text-gray-800">Average squared error</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Main Grid: Visualization + Parameter Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Visualization - Left/Full Width */}
          <div className="lg:col-span-2">
            <Card title="Data & Fitted Line" className="h-full">
              <SimplePlot
                title=""
                xData={x}
                yData={y}
                predictions={predictions}
                loss={state.trainLoss}
                r2={state.trainR2}
                xLabel="X Variable"
                yLabel="Y Variable"
                width="100%"
                height={400}
              />
            </Card>
          </div>

          {/* Parameter Controls - Right Side */}
          <div>
            <Card title="Adjust Parameters" className="h-full">
              <div className="space-y-6">
                {/* Slope Control */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-semibold text-gray-700">Slope (m)</label>
                    <span className="text-lg font-bold text-blue-600">{slope.toFixed(3)}</span>
                  </div>
                  <input
                    type="range"
                    min="-10"
                    max="10"
                    step="0.1"
                    value={slope}
                    onChange={(e) => handleSlopeChange(parseFloat(e.target.value))}
                    disabled={isRunning}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="text-xs text-gray-500 mt-1">-10 to 10</div>
                </div>

                {/* Intercept Control */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-semibold text-gray-700">Intercept (b)</label>
                    <span className="text-lg font-bold text-blue-600">{intercept.toFixed(3)}</span>
                  </div>
                  <input
                    type="range"
                    min="-20"
                    max="20"
                    step="0.1"
                    value={intercept}
                    onChange={(e) =>
                      handleInterceptChange(parseFloat(e.target.value))
                    }
                    disabled={isRunning}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="text-xs text-gray-500 mt-1">-20 to 20</div>
                </div>

                {/* Learning Rate Control */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-semibold text-gray-700">Learning Rate</label>
                    <span className="text-lg font-bold text-blue-600">{learningRate.toFixed(4)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.001"
                    max="0.1"
                    step="0.001"
                    value={learningRate}
                    onChange={(e) =>
                      handleLearningRateChange(parseFloat(e.target.value))
                    }
                    disabled={isRunning}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="text-xs text-gray-500 mt-1">0.001 to 0.1</div>
                </div>

                {/* Metrics */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg border border-gray-200 space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-gray-600">LOSS (MSE)</p>
                    <p
                      className={`text-2xl font-bold ${
                        state.trainLoss < 0.1
                          ? 'text-green-600'
                          : state.trainLoss < 0.5
                            ? 'text-amber-600'
                            : 'text-red-600'
                      }`}
                    >
                      {state.trainLoss.toFixed(4)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-600">R² SCORE</p>
                    <p
                      className={`text-2xl font-bold ${
                        state.trainR2 > 0.9
                          ? 'text-green-600'
                          : state.trainR2 > 0.7
                            ? 'text-amber-600'
                            : 'text-red-600'
                      }`}
                    >
                      {state.trainR2.toFixed(4)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-600">ITERATIONS</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {state.iterations}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Regularization Options (Like Logistic Regression) */}
        <Card title="Regularization (L1 / L2)">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
            <div className="md:col-span-2 flex gap-3">
              {(['none', 'l1', 'l2'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => handleParamUpdate({ regType: type })}
                  className={`flex-1 py-3 rounded-xl text-xs font-black border-2 transition-all uppercase tracking-widest ${
                    regType === type 
                    ? 'bg-gray-900 text-white border-gray-900 shadow-lg shadow-gray-200' 
                    : 'bg-white text-gray-500 border-gray-100 hover:bg-gray-50'
                  }`}
                >
                  {type === 'none' ? 'No Penalty' : type === 'l1' ? 'L1 (Lasso)' : 'L2 (Ridge)'}
                </button>
              ))}
            </div>
            
            <div className="md:col-span-2">
              <div className="flex justify-between items-center mb-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Penalty Strength (λ)
                </label>
                <span className="text-sm font-black text-indigo-600">{lambda.toFixed(3)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={lambda}
                onChange={(e) => handleParamUpdate({ lambda: parseFloat(e.target.value) })}
                className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>
          </div>
        </Card>

        {/* Presets */}
        <Card title="Try Preset Scenarios">
          <PresetButtons
            presets={Object.values(LINEAR_REGRESSION_PRESETS).map((p) => ({
              id: p.id,
              name: p.name,
              description: p.description,
            }))}
            onSelect={handlePreset}
            selectedId={selectedPreset}
          />
        </Card>

        {/* Training Controls */}
        <Card title="Training Controls">
          <div className="flex gap-3 flex-wrap">
            <Button
              onClick={handleStep}
              disabled={isRunning}
              variant="primary"
              size="md"
            >
              Step
            </Button>
            <Button
              onClick={handleRun}
              disabled={isRunning}
              variant="primary"
              size="md"
            >
              Run 20x
            </Button>
            <Button
              onClick={handleTrain}
              disabled={isRunning}
              variant="success"
              size="md"
            >
              Train to Convergence
            </Button>
            <Button
              onClick={handleReset}
              disabled={isRunning}
              variant="secondary"
              size="md"
            >
              Reset
            </Button>
            <Button
              onClick={handleRegenerateData}
              disabled={isRunning}
              variant="outline"
              size="md"
              className="border-dashed"
            >
              🔄 Regenerate Data
            </Button>
            <div className="ml-auto text-sm">
              Status: <span className={isRunning ? 'text-blue-600 font-semibold' : 'text-gray-600'}>
                {isRunning ? '⏳ Running...' : '✓ Ready'}
              </span>
            </div>
          </div>
        </Card>

        {/* Loss Over Time */}
        {state.history.length > 0 && (
          <Card title="Training Progress">
            <SimpleLossChart
              iterations={state.history.map((h) => h.iteration)}
              losses={state.history.map((h) => h.loss)}
            />
          </Card>
        )}

        {/* Assessment */}
        <Card title="Check Your Understanding">
          <div className="space-y-4">
            {!showQuiz ? (
              <Button
                onClick={() => setShowQuiz(true)}
                variant="primary"
                size="md"
              >
                Take Quiz
              </Button>
            ) : (
              <Quiz
                title="Linear Regression Quiz"
                questions={[
                  // ── Easy (1–7) ──
                  {
                    id: 'lr-1',
                    question: 'What is the main goal of Linear Regression?',
                    options: ['Classify data into categories', 'Predict a continuous numerical value', 'Group similar data points', 'Reduce dimensions'],
                    correct: 1,
                    explanation: 'Linear Regression predicts continuous values such as salary, house price, or sales — not categories or clusters.',
                  },
                  {
                    id: 'lr-2',
                    question: 'Which equation represents Simple Linear Regression?',
                    options: ['y = mx + c', 'y = x² + c', 'y = log(x)', 'y = 1/x'],
                    correct: 0,
                    explanation: 'Simple Linear Regression uses a straight-line equation y = mx + c to model the relationship between one input and one output variable.',
                  },
                  {
                    id: 'lr-3',
                    question: 'In y = mx + c, what does m represent?',
                    options: ['Error term', 'Intercept', 'Slope of the line', 'Mean'],
                    correct: 2,
                    explanation: 'm is the slope — it indicates how much y changes for a one-unit increase in x.',
                  },
                  {
                    id: 'lr-4',
                    question: 'What is the dependent variable in Linear Regression?',
                    options: ['Input feature', 'Predicted output variable', 'Constant term', 'Noise only'],
                    correct: 1,
                    explanation: 'The dependent variable (y) is the target we want to predict. Independent variables (x) are the inputs used to predict it.',
                  },
                  {
                    id: 'lr-5',
                    question: 'What does the intercept (c) represent?',
                    options: ['Rate of change', 'Predicted value when x = 0', 'Prediction error', 'Variance'],
                    correct: 1,
                    explanation: 'The intercept is the point where the regression line crosses the y-axis — the predicted value when all inputs equal zero.',
                  },
                  {
                    id: 'lr-6',
                    question: 'Which metric is commonly used to measure Linear Regression error?',
                    options: ['Accuracy', 'Precision', 'Mean Squared Error', 'Recall'],
                    correct: 2,
                    explanation: 'MSE measures the average squared difference between actual and predicted values. Lower MSE = better fit.',
                  },
                  {
                    id: 'lr-7',
                    question: 'What kind of relationship does Linear Regression assume?',
                    options: ['Circular', 'Random', 'Linear', 'Exponential only'],
                    correct: 2,
                    explanation: 'Linear Regression assumes a straight-line relationship between predictors and target. It will underfit if the true relationship is curved.',
                  },
                  // ── Medium (8–14) ──
                  {
                    id: 'lr-8',
                    question: 'What does the R² score measure?',
                    options: ['Prediction speed', 'Variance explained by the model', 'Number of features', 'Error percentage'],
                    correct: 1,
                    explanation: 'R² (coefficient of determination) shows how much of the variance in the target variable is explained by the model. R² = 1 is a perfect fit.',
                  },
                  {
                    id: 'lr-9',
                    question: 'If R² = 0.85, what does it mean?',
                    options: ['85% of variance is explained by the model', '85% predictions are exact', 'Error is 85%', 'Model is overfitting'],
                    correct: 0,
                    explanation: 'R² = 0.85 means the model explains 85% of the variance in the dependent variable. The remaining 15% is unexplained noise.',
                  },
                  {
                    id: 'lr-10',
                    question: 'What is Multicollinearity?',
                    options: ['Multiple outputs', 'High correlation among independent variables', 'Low target variance', 'Nonlinear target'],
                    correct: 1,
                    explanation: 'Multicollinearity occurs when predictor variables are highly correlated, causing unstable and unreliable coefficient estimates.',
                  },
                  {
                    id: 'lr-11',
                    question: 'Which method estimates coefficients in Linear Regression?',
                    options: ['K-Means', 'Least Squares', 'PCA', 'Decision Tree'],
                    correct: 1,
                    explanation: 'Ordinary Least Squares (OLS) finds the line that minimizes the sum of squared residual errors — the most common fitting method.',
                  },
                  {
                    id: 'lr-12',
                    question: 'What is a residual?',
                    options: ['Actual value', 'Predicted value', 'Difference between actual and predicted value', 'Coefficient value'],
                    correct: 2,
                    explanation: 'Residual = Actual − Predicted. Analysing residuals reveals whether model assumptions hold and where predictions go wrong.',
                  },
                  {
                    id: 'lr-13',
                    question: 'Which plot helps check regression assumptions?',
                    options: ['Pie chart', 'Residual plot', 'Histogram only', 'Scatter matrix only'],
                    correct: 1,
                    explanation: 'Residual plots help verify linearity, homoscedasticity (equal variance), and randomness of errors — key regression assumptions.',
                  },
                  {
                    id: 'lr-14',
                    question: 'What happens if irrelevant features are added to the model?',
                    options: ['Always improves model', 'May increase noise and reduce performance', 'Removes bias completely', 'Makes coefficients zero automatically'],
                    correct: 1,
                    explanation: 'Irrelevant variables add noise and can hurt generalisation. Feature selection and regularisation help keep only useful predictors.',
                  },
                  // ── Hard (15–20) ──
                  {
                    id: 'lr-15',
                    question: 'What does Homoscedasticity mean?',
                    options: ['Errors have constant variance', 'Errors are zero', 'Variables are independent', 'Features are normalised'],
                    correct: 0,
                    explanation: 'Homoscedasticity means residuals have equal, constant variance across all fitted values — a key OLS assumption.',
                  },
                  {
                    id: 'lr-16',
                    question: 'Which issue occurs when residuals are correlated over time?',
                    options: ['Multicollinearity', 'Autocorrelation', 'Underfitting', 'Regularisation'],
                    correct: 1,
                    explanation: 'Autocorrelation violates the independence assumption and is common in time-series data. It inflates R² and makes p-values unreliable.',
                  },
                  {
                    id: 'lr-17',
                    question: 'What is the purpose of Regularisation in Linear Regression?',
                    options: ['Increase training error intentionally', 'Penalise large coefficients to prevent overfitting', 'Remove all features', 'Increase intercept'],
                    correct: 1,
                    explanation: 'Ridge and Lasso regularisation shrink large coefficients, reducing overfitting and improving generalisation on unseen data.',
                  },
                  {
                    id: 'lr-18',
                    question: 'In Ridge Regression, which penalty is added?',
                    options: ['L1 penalty', 'L2 penalty', 'Log penalty', 'Entropy penalty'],
                    correct: 1,
                    explanation: 'Ridge adds the squared magnitude of coefficients (L2 norm). It shrinks all coefficients but rarely sets them to exactly zero.',
                  },
                  {
                    id: 'lr-19',
                    question: 'If the p-value of a coefficient is very high, it usually means:',
                    options: ['Strong evidence the feature is useful', 'Feature may not be statistically significant', 'Model is perfect', 'Coefficient must be negative'],
                    correct: 1,
                    explanation: 'A high p-value (e.g. > 0.05) suggests there is insufficient evidence the variable contributes meaningfully to prediction.',
                  },
                  {
                    id: 'lr-20',
                    question: 'Why can Linear Regression fail on nonlinear data?',
                    options: ['It uses too much memory', 'It assumes a linear relationship', 'It cannot use multiple variables', 'It only works on images'],
                    correct: 1,
                    explanation: 'Linear Regression fits a straight line. If the true relationship is curved or complex, the model will systematically underfit the data.',
                  },
                ]}
              />
            )}
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center text-gray-600 py-8 border-t border-gray-200">
          <p className="text-sm">
            Adjust the slope and intercept sliders to see how they affect the fitted line.
            Watch the loss decrease as you optimize the parameters!
          </p>
        </div>
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

export default LinearRegressionModule
