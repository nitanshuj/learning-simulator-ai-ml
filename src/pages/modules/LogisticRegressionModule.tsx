import React, { useEffect, useState, useCallback } from 'react'
import { ClassificationPlot, Button, Card, Quiz, Navbar, Footer, BackButton } from '@/components'
import { LogisticRegression, LogisticRegressionState, generateClassificationData, ClassificationData } from '@/simulators'

export const LogisticRegressionModule: React.FC = () => {
  const [simulator, setSimulator] = useState<LogisticRegression | null>(null)
  const [state, setState] = useState<LogisticRegressionState | null>(null)
  const [data, setData] = useState<ClassificationData | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [learningRate, setLearningRate] = useState(0.1)
  const [showQuiz, setShowQuiz] = useState(false)

  // Initialize simulator
  useEffect(() => {
    const sim = new LogisticRegression({ learningRate: 0.1 })
    const initialData = generateClassificationData(40, 2, 2, -2, -2, 1.5)
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
    }, 50)
  }, [simulator, isRunning])

  const handleReset = () => {
    simulator?.reset()
    setState(simulator?.getState() || null)
    setIsRunning(false)
  }

  const handleNewData = () => {
    const newData = generateClassificationData(40, 2, 2, -2, -2, 1.5)
    simulator?.setData(newData)
    setData(newData)
    setState(simulator?.getState() || null)
    setIsRunning(false)
  }

  if (!simulator || !state || !data) return null

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />
      <BackButton />
      
      <main className="pt-24 pb-20 max-w-7xl mx-auto px-lg sm:px-2xl lg:px-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl">
          
          {/* Left Column: Lesson & Controls (4/12) */}
          <div className="lg:col-span-4 space-y-xl">
            <Card title="Logistic Regression">
              <div className="prose prose-slate prose-sm">
                <p>
                  Logistic Regression is for <strong>classification</strong>. It predicts the probability that a point belongs to a class (0 or 1).
                </p>
                <ul className="text-sm">
                  <li><strong>Sigmoid Function:</strong> Squashes any value into a range between 0 and 1.</li>
                  <li><strong>Decision Boundary:</strong> The line where the predicted probability is exactly 0.5.</li>
                </ul>
              </div>
            </Card>

            <Card title="Training Controls">
              <div className="space-y-xl">
                <div>
                  <div className="flex justify-between items-center mb-md">
                    <label className="text-sm font-semibold text-slate-700">Learning Rate</label>
                    <span className="text-sm font-bold text-blue-600">{learningRate.toFixed(2)}</span>
                  </div>
                  <input 
                    type="range" 
                    min="0.01" 
                    max="1.0" 
                    step="0.01"
                    value={learningRate}
                    onChange={(e) => {
                      const lr = parseFloat(e.target.value)
                      setLearningRate(lr)
                      simulator.setParams({ learningRate: lr } as any)
                    }}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                <div className="flex flex-wrap gap-md">
                  <Button onClick={handleStep} disabled={isRunning || state.isConverged} variant="primary" size="sm">
                    Step
                  </Button>
                  <Button onClick={handleRun} disabled={isRunning || state.isConverged} variant="primary" size="sm">
                    Train Model
                  </Button>
                  <Button onClick={handleReset} variant="outline" size="sm">
                    Reset
                  </Button>
                  <Button onClick={handleNewData} variant="outline" size="sm">
                    New Data
                  </Button>
                </div>
              </div>
            </Card>

            <Card title="Model Performance">
              <div className="grid grid-cols-2 gap-xl">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-xs">Accuracy</p>
                  <p className={`text-2xl font-bold ${state.accuracy > 0.9 ? 'text-emerald-500' : 'text-blue-600'}`}>
                    {(state.accuracy * 100).toFixed(0)}%
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-xs">Loss (BCE)</p>
                  <p className="text-2xl font-bold text-slate-900">{state.loss.toFixed(4)}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-xs">Decision Threshold</p>
                  <p className="text-sm font-medium text-slate-600">P(Class 1) ≥ {state.params.threshold}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column: Visualization (8/12) */}
          <div className="lg:col-span-8 space-y-xl">
            <ClassificationPlot 
              data={data}
              predictProb={(x1, x2) => simulator.predictProb(x1, x2)}
              boundaryLine={simulator.getBoundaryLine([-5, 5])}
              height={550}
            />

            {!showQuiz ? (
              <Card className="text-center py-xl">
                <h3 className="text-h4 mb-lg">Ready for a classification challenge?</h3>
                <Button onClick={() => setShowQuiz(true)}>Start Quiz</Button>
              </Card>
            ) : (
              <Quiz 
                title="Logistic Regression Quiz"
                questions={[
                  // ── Easy (1–7) ──
                  {
                    id: 'log-1',
                    question: 'What is the primary use of Logistic Regression?',
                    options: ['Predict continuous values', 'Classify data into categories', 'Cluster data', 'Reduce dimensions'],
                    correct: 1,
                    explanation: 'Logistic Regression is mainly used for classification problems, especially binary classification (e.g. spam vs. not spam).',
                  },
                  {
                    id: 'log-2',
                    question: 'What type of output does Logistic Regression produce?',
                    options: ['Any real number', 'Probability between 0 and 1', 'Integer values only', 'Complex numbers'],
                    correct: 1,
                    explanation: 'Logistic Regression outputs probabilities in the range (0, 1), which are then converted into class labels using a threshold.',
                  },
                  {
                    id: 'log-3',
                    question: 'Which function is used in Logistic Regression to squash outputs?',
                    options: ['Linear function', 'Sigmoid function', 'ReLU function', 'Softmax only'],
                    correct: 1,
                    explanation: 'The sigmoid function maps any real-valued input into the range (0, 1), making outputs interpretable as probabilities.',
                  },
                  {
                    id: 'log-4',
                    question: 'What is the formula of the sigmoid function?',
                    options: ['y = mx + c', 'y = 1 / (1 + e^(−x))', 'y = x²', 'y = log(x)'],
                    correct: 1,
                    explanation: 'σ(x) = 1 / (1 + e^(−x)) transforms any linear output into a probability between 0 and 1.',
                  },
                  {
                    id: 'log-5',
                    question: 'What is the decision boundary?',
                    options: ['Random threshold', 'Line or curve separating classes', 'Error value', 'Feature scaling step'],
                    correct: 1,
                    explanation: 'The decision boundary is the dividing line (or hyperplane) where the predicted probability equals 0.5 — separating the two classes.',
                  },
                  {
                    id: 'log-6',
                    question: 'What threshold is commonly used for binary classification?',
                    options: ['0', '0.25', '0.5', '1'],
                    correct: 2,
                    explanation: 'If predicted probability ≥ 0.5, classify as Class 1; otherwise Class 0. The threshold can be adjusted for imbalanced datasets.',
                  },
                  {
                    id: 'log-7',
                    question: 'Logistic Regression is primarily a:',
                    options: ['Regression algorithm only', 'Classification algorithm', 'Clustering method', 'Reinforcement learning method'],
                    correct: 1,
                    explanation: 'Despite its name, Logistic Regression is a classification algorithm. It predicts which category a data point belongs to.',
                  },
                  // ── Medium (8–14) ──
                  {
                    id: 'log-8',
                    question: 'What does the sigmoid function ensure about its output?',
                    options: ['Linear output', 'Output between 0 and 1', 'Output greater than 1', 'Output always zero'],
                    correct: 1,
                    explanation: 'The sigmoid function guarantees output in (0, 1), making it suitable for representing probabilities in classification.',
                  },
                  {
                    id: 'log-9',
                    question: 'What loss function is used to train Logistic Regression?',
                    options: ['Mean Squared Error', 'Cross-Entropy Loss', 'Hinge Loss', 'Absolute Error'],
                    correct: 1,
                    explanation: 'Cross-Entropy (Log Loss) penalises confident wrong predictions heavily, making it ideal for probability-based classifiers.',
                  },
                  {
                    id: 'log-10',
                    question: 'What is Log-Odds (Logit)?',
                    options: ['Probability directly', 'Log of odds ratio', 'Mean value', 'Variance'],
                    correct: 1,
                    explanation: 'Logit = log(p / (1 − p)) transforms probability into an unbounded linear scale. Logistic Regression models this as a linear function.',
                  },
                  {
                    id: 'log-11',
                    question: 'Which optimisation method is commonly used to train Logistic Regression?',
                    options: ['Gradient Descent', 'KNN', 'PCA', 'Random Forest'],
                    correct: 0,
                    explanation: 'Gradient Descent (or its variants like SGD, Adam) minimises the Cross-Entropy loss by iteratively updating the model coefficients.',
                  },
                  {
                    id: 'log-12',
                    question: 'What happens when input features are highly correlated?',
                    options: ['Improves accuracy always', 'Causes multicollinearity', 'Removes bias', 'No effect'],
                    correct: 1,
                    explanation: 'Multicollinearity makes coefficient estimates unstable and hard to interpret — regularisation can help mitigate this.',
                  },
                  {
                    id: 'log-13',
                    question: 'What does a coefficient represent in Logistic Regression?',
                    options: ['Direct change in output probability', 'Change in log-odds per unit feature change', 'Mean of feature', 'Error rate'],
                    correct: 1,
                    explanation: 'A coefficient β means a one-unit increase in that feature changes the log-odds by β — the effect on probability is nonlinear.',
                  },
                  {
                    id: 'log-14',
                    question: 'Which evaluation metric is most suitable for a classification task?',
                    options: ['R² score', 'Accuracy', 'MSE', 'RMSE'],
                    correct: 1,
                    explanation: 'Accuracy measures the fraction of predictions that are correct. For imbalanced classes, Precision, Recall, or F1 score are better.',
                  },
                  // ── Hard (15–20) ──
                  {
                    id: 'log-15',
                    question: 'What is the relationship between logit and probability?',
                    options: ['Direct linear relationship', 'Nonlinear transformation using log-odds', 'No relationship', 'Exponential decay'],
                    correct: 1,
                    explanation: 'Logistic Regression models log-odds as linear in features, but probability itself is a nonlinear sigmoid transformation of those log-odds.',
                  },
                  {
                    id: 'log-16',
                    question: 'What problem occurs when classes are highly imbalanced?',
                    options: ['Overfitting only', 'Model predicts majority class frequently', 'Faster convergence', 'Lower variance'],
                    correct: 1,
                    explanation: 'The model biases toward the majority class, giving high accuracy but poor recall for the minority class. Use resampling or class weights to fix.',
                  },
                  {
                    id: 'log-17',
                    question: 'What is Regularisation used for in Logistic Regression?',
                    options: ['Increase error', 'Prevent overfitting', 'Remove sigmoid function', 'Increase number of features'],
                    correct: 1,
                    explanation: 'L1/L2 regularisation penalises large coefficients, preventing the model from memorising training data and improving generalisation.',
                  },
                  {
                    id: 'log-18',
                    question: 'What does L1 regularisation (Lasso) do to coefficients?',
                    options: ['Shrinks all coefficients equally', 'Makes some coefficients exactly zero', 'Increases variance', 'Removes intercept'],
                    correct: 1,
                    explanation: 'L1 regularisation drives some coefficients to zero, performing automatic feature selection — unlike L2 which only shrinks them.',
                  },
                  {
                    id: 'log-19',
                    question: 'What is the role of Softmax in Logistic Regression?',
                    options: ['Used in binary classification', 'Used in multi-class classification', 'Used for regression', 'Used for clustering'],
                    correct: 1,
                    explanation: 'Softmax generalises sigmoid to multiple classes, outputting a probability distribution over all classes that sums to 1.',
                  },
                  {
                    id: 'log-20',
                    question: 'Why is Logistic Regression considered a linear classifier?',
                    options: ['Uses linear loss function', 'Decision boundary is linear in feature space', 'Output is linear', 'No transformation is applied'],
                    correct: 1,
                    explanation: 'The decision boundary (where P = 0.5) is a linear hyperplane in feature space, even though the probability mapping via sigmoid is nonlinear.',
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
