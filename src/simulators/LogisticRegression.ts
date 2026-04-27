
/**
 * Logistic Regression Simulator Engine (General for Multi-Class)
 * 
 * Supports Binary Classification (Sigmoid) and Multi-Class (Softmax).
 * Uses Cross-Entropy Loss and Gradient Descent.
 */

export interface LogisticRegressionParams {
  learningRate: number
  numClasses: number
  regularization: 'none' | 'l1' | 'l2'
  regLambda: number
}

export interface LogisticRegressionState {
  params: LogisticRegressionParams
  loss: number
  accuracy: number
  iterations: number
  isConverged: boolean
  weights: number[][] // [classIndex][featureIndex]
  biases: number[]   // [classIndex]
  history: { iteration: number, loss: number, accuracy: number }[]
}

export interface ClassificationData {
  x1: number[]
  x2: number[]
  y: number[] // 0, 1, 2, ...
}

export class LogisticRegression {
  private weights: number[][] = []
  private biases: number[] = []
  private learningRate: number
  private numClasses: number
  private regularization: 'none' | 'l1' | 'l2'
  private regLambda: number
  
  private x1: number[] = []
  private x2: number[] = []
  private y: number[] = []
  private iterationCount: number = 0
  private history: { iteration: number, loss: number, accuracy: number }[] = []
  private isConverged: boolean = false
  private tolerance: number = 1e-6

  constructor(params: Partial<LogisticRegressionParams> = {}) {
    this.numClasses = params.numClasses ?? 2
    this.learningRate = params.learningRate ?? 0.1
    this.regularization = params.regularization ?? 'none'
    this.regLambda = params.regLambda ?? 0.01
    this.initParams()
  }

  private initParams(): void {
    this.weights = Array.from({ length: this.numClasses }, () => [
      Math.random() * 0.1 - 0.05, 
      Math.random() * 0.1 - 0.05
    ])
    this.biases = Array.from({ length: this.numClasses }, () => 0)
  }

  public setData(data: ClassificationData): void {
    this.x1 = data.x1
    this.x2 = data.x2
    this.y = data.y
    // Re-init params if num classes changed in data
    const maxClass = Math.max(...this.y, 0) + 1
    if (maxClass > this.numClasses) {
      this.numClasses = maxClass
      this.initParams()
    }
    this.reset()
  }

  public reset(): void {
    this.iterationCount = 0
    this.history = []
    this.isConverged = false
    this.initParams()
    const metrics = this.evaluate()
    this.history.push({ 
      iteration: 0, 
      loss: metrics.loss, 
      accuracy: metrics.accuracy 
    })
  }

  public setParams(params: Partial<LogisticRegressionParams>): void {
    if (params.numClasses !== undefined && params.numClasses !== this.numClasses) {
      this.numClasses = params.numClasses
      this.initParams()
    }
    if (params.learningRate !== undefined) this.learningRate = params.learningRate
    if (params.regularization !== undefined) this.regularization = params.regularization
    if (params.regLambda !== undefined) this.regLambda = params.regLambda
  }

  /**
   * Softmax function
   */
  private softmax(scores: number[]): number[] {
    const maxScore = Math.max(...scores)
    const expScores = scores.map(s => Math.exp(s - maxScore))
    const sumExp = expScores.reduce((a, b) => a + b, 0)
    return expScores.map(s => s / sumExp)
  }

  /**
   * Predict probabilities for all classes
   */
  public predictProbs(x1: number, x2: number): number[] {
    const scores = this.weights.map((w, i) => w[0] * x1 + w[1] * x2 + this.biases[i])
    return this.softmax(scores)
  }

  /**
   * Predict class (highest probability)
   */
  public predict(x1: number, x2: number): number {
    const probs = this.predictProbs(x1, x2)
    return probs.indexOf(Math.max(...probs))
  }

  public evaluate(): { loss: number, accuracy: number } {
    if (this.x1.length === 0) return { loss: 0, accuracy: 0 }

    let totalLoss = 0
    let correct = 0

    for (let i = 0; i < this.x1.length; i++) {
      const probs = this.predictProbs(this.x1[i], this.x2[i])
      const target = this.y[i]
      
      // Cross Entropy Loss: -log(p_target)
      const p = Math.max(1e-15, probs[target])
      totalLoss -= Math.log(p)

      if (probs.indexOf(Math.max(...probs)) === target) {
        correct++
      }
    }

    // Add Regularization Loss
    let regLoss = 0
    if (this.regularization === 'l2') {
      this.weights.forEach(w => {
        regLoss += (w[0] * w[0] + w[1] * w[1])
      })
      regLoss *= (0.5 * this.regLambda)
    } else if (this.regularization === 'l1') {
      this.weights.forEach(w => {
        regLoss += (Math.abs(w[0]) + Math.abs(w[1]))
      })
      regLoss *= this.regLambda
    }

    return {
      loss: (totalLoss / this.x1.length) + regLoss,
      accuracy: correct / this.x1.length
    }
  }

  public step(): LogisticRegressionState {
    if (this.isConverged || this.x1.length === 0) return this.getState()

    const m = this.x1.length
    const gradW = Array.from({ length: this.numClasses }, () => [0, 0])
    const gradB = Array.from({ length: this.numClasses }, () => 0)

    for (let i = 0; i < m; i++) {
      const probs = this.predictProbs(this.x1[i], this.x2[i])
      const target = this.y[i]

      for (let c = 0; c < this.numClasses; c++) {
        const error = probs[c] - (c === target ? 1 : 0)
        gradW[c][0] += error * this.x1[i]
        gradW[c][1] += error * this.x2[i]
        gradB[c] += error
      }
    }

    // Update weights and biases with regularization gradient
    for (let c = 0; c < this.numClasses; c++) {
      let regW0 = 0, regW1 = 0
      if (this.regularization === 'l2') {
        regW0 = this.regLambda * this.weights[c][0]
        regW1 = this.regLambda * this.weights[c][1]
      } else if (this.regularization === 'l1') {
        regW0 = this.regLambda * Math.sign(this.weights[c][0])
        regW1 = this.regLambda * Math.sign(this.weights[c][1])
      }

      this.weights[c][0] -= (this.learningRate * (gradW[c][0] / m + regW0))
      this.weights[c][1] -= (this.learningRate * (gradW[c][1] / m + regW1))
      this.biases[c] -= (this.learningRate * gradB[c] / m)
    }

    this.iterationCount++
    const metrics = this.evaluate()
    this.history.push({
      iteration: this.iterationCount,
      loss: metrics.loss,
      accuracy: metrics.accuracy
    })

    if (this.history.length > 5) {
      const prevLoss = this.history[this.history.length - 2].loss
      if (Math.abs(prevLoss - metrics.loss) < this.tolerance) {
        this.isConverged = true
      }
    }

    return this.getState()
  }

  public getState(): LogisticRegressionState {
    const metrics = this.evaluate()
    return {
      params: {
        learningRate: this.learningRate,
        numClasses: this.numClasses,
        regularization: this.regularization,
        regLambda: this.regLambda
      },
      loss: metrics.loss,
      accuracy: metrics.accuracy,
      iterations: this.iterationCount,
      isConverged: this.isConverged,
      weights: this.weights.map(w => [...w]),
      biases: [...this.biases],
      history: [...this.history]
    }
  }
}

/**
 * Data generation utility (moved from old implementation)
 */
export function generateClassificationData(
  n: number = 50, 
  centerX1: number = 2, 
  centerY1: number = 2,
  centerX2: number = -2,
  centerY2: number = -2,
  noise: number = 1
): ClassificationData {
  const x1: number[] = []
  const x2: number[] = []
  const y: number[] = []

  // Class 0
  for (let i = 0; i < n / 2; i++) {
    x1.push(centerX1 + (Math.random() - 0.5) * 2 * noise)
    x2.push(centerY1 + (Math.random() - 0.5) * 2 * noise)
    y.push(0)
  }

  // Class 1
  for (let i = 0; i < n / 2; i++) {
    x1.push(centerX2 + (Math.random() - 0.5) * 2 * noise)
    x2.push(centerY2 + (Math.random() - 0.5) * 2 * noise)
    y.push(1)
  }

  return { x1, x2, y }
}
