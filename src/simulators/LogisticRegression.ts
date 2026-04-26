
/**
 * Logistic Regression Simulator Engine
 * 
 * Handles binary classification using the sigmoid function and binary cross-entropy loss.
 * Visualizes the decision boundary and probability heatmap.
 */

export interface LogisticRegressionParams {
  w1: number
  w2: number
  bias: number
  threshold: number
}

export interface LogisticRegressionState {
  params: LogisticRegressionParams
  loss: number
  accuracy: number
  iterations: number
  isConverged: boolean
  history: { iteration: number, loss: number, accuracy: number }[]
}

export interface ClassificationData {
  x1: number[]
  x2: number[]
  y: number[] // 0 or 1
}

export class LogisticRegression {
  private w1: number
  private w2: number
  private bias: number
  private learningRate: number
  private threshold: number
  private x1: number[] = []
  private x2: number[] = []
  private y: number[] = []
  private iterationCount: number = 0
  private history: { iteration: number, loss: number, accuracy: number }[] = []
  private isConverged: boolean = false
  private tolerance: number = 1e-5

  constructor(initialParams: Partial<LogisticRegressionParams & { learningRate: number }> = {}) {
    this.w1 = initialParams.w1 ?? Math.random() - 0.5
    this.w2 = initialParams.w2 ?? Math.random() - 0.5
    this.bias = initialParams.bias ?? 0
    this.learningRate = initialParams.learningRate ?? 0.1
    this.threshold = initialParams.threshold ?? 0.5
  }

  public setData(data: ClassificationData): void {
    this.x1 = data.x1
    this.x2 = data.x2
    this.y = data.y
    this.reset()
  }

  public reset(): void {
    this.iterationCount = 0
    this.history = []
    this.isConverged = false
    const initialMetrics = this.evaluate()
    this.history.push({ 
      iteration: 0, 
      loss: initialMetrics.loss, 
      accuracy: initialMetrics.accuracy 
    })
  }

  public setParams(params: Partial<LogisticRegressionParams>): void {
    if (params.w1 !== undefined) this.w1 = params.w1
    if (params.w2 !== undefined) this.w2 = params.w2
    if (params.bias !== undefined) this.bias = params.bias
    if (params.threshold !== undefined) this.threshold = params.threshold
  }

  public getParams(): LogisticRegressionParams {
    return { w1: this.w1, w2: this.w2, bias: this.bias, threshold: this.threshold }
  }

  /**
   * Sigmoid activation function
   */
  private sigmoid(z: number): number {
    return 1 / (1 + Math.exp(-z))
  }

  /**
   * Predict probability for a single point
   */
  public predictProb(x1: number, x2: number): number {
    const z = this.w1 * x1 + this.w2 * x2 + this.bias
    return this.sigmoid(z)
  }

  /**
   * Predict class for a single point
   */
  public predictClass(x1: number, x2: number): number {
    return this.predictProb(x1, x2) >= this.threshold ? 1 : 0
  }

  /**
   * Evaluate model on current data
   */
  public evaluate(): { loss: number, accuracy: number } {
    if (this.x1.length === 0) return { loss: 0, accuracy: 0 }

    let totalLoss = 0
    let correct = 0

    for (let i = 0; i < this.x1.length; i++) {
      const prob = this.predictProb(this.x1[i], this.x2[i])
      const target = this.y[i]
      
      // Binary Cross Entropy Loss: -(y*log(p) + (1-y)*log(1-p))
      // Adding epsilon to avoid log(0)
      const eps = 1e-15
      const p = Math.max(eps, Math.min(1 - eps, prob))
      totalLoss -= (target * Math.log(p) + (1 - target) * Math.log(1 - p))

      if ((prob >= this.threshold ? 1 : 0) === target) {
        correct++
      }
    }

    return {
      loss: totalLoss / this.x1.length,
      accuracy: correct / this.x1.length
    }
  }

  /**
   * Perform one step of gradient descent
   */
  public step(): LogisticRegressionState {
    if (this.isConverged || this.x1.length === 0) return this.getState()

    let dw1 = 0
    let dw2 = 0
    let db = 0

    for (let i = 0; i < this.x1.length; i++) {
      const prob = this.predictProb(this.x1[i], this.x2[i])
      const error = prob - this.y[i]
      
      dw1 += error * this.x1[i]
      dw2 += error * this.x2[i]
      db += error
    }

    const m = this.x1.length
    this.w1 -= (this.learningRate * dw1) / m
    this.w2 -= (this.learningRate * dw2) / m
    this.bias -= (this.learningRate * db) / m

    this.iterationCount++
    const metrics = this.evaluate()
    this.history.push({
      iteration: this.iterationCount,
      loss: metrics.loss,
      accuracy: metrics.accuracy
    })

    // Check for convergence based on loss change
    if (this.history.length > 1) {
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
      params: this.getParams(),
      loss: metrics.loss,
      accuracy: metrics.accuracy,
      iterations: this.iterationCount,
      isConverged: this.isConverged,
      history: [...this.history]
    }
  }

  /**
   * Calculate decision boundary points for plotting
   * w1*x1 + w2*x2 + bias = logit(threshold)
   * For threshold=0.5, logit=0, so w1*x1 + w2*x2 + bias = 0
   * x2 = (-w1*x1 - bias) / w2
   */
  public getBoundaryLine(xRange: [number, number]): { x1: number[], x2: number[] } {
    const logitThreshold = Math.log(this.threshold / (1 - this.threshold))
    
    // If w2 is near zero, the line is vertical
    if (Math.abs(this.w2) < 1e-9) {
      const x1_fixed = (logitThreshold - this.bias) / this.w1
      return {
        x1: [x1_fixed, x1_fixed],
        x2: [-10, 10] // Large enough range
      }
    }

    const x1_start = xRange[0]
    const x1_end = xRange[1]
    const x2_start = (logitThreshold - this.w1 * x1_start - this.bias) / this.w2
    const x2_end = (logitThreshold - this.w1 * x1_end - this.bias) / this.w2

    return {
      x1: [x1_start, x1_end],
      x2: [x2_start, x2_end]
    }
  }
}

/**
 * Data generation utility for classification
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
