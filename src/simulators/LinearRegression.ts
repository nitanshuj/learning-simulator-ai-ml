import {
  calculateMSE,
  calculateR2,
  linearForward,
  calculateGradientsLinearMSE,
  gradientDescentStep,
  calculateResiduals,
} from './shared/math'
import { generateLinearDataset } from './shared/datasets'

export interface LinearRegressionParams {
  slope: number
  intercept: number
  regType: 'none' | 'l1' | 'l2'
  lambda: number
}

export interface LinearRegressionResults {
  predictions: number[]
  loss: number
  r2: number
  residuals: number[]
  gradients?: {
    slope: number
    intercept: number
  }
  iterationCount?: number
}

export interface LinearRegressionState {
  params: LinearRegressionParams
  trainLoss: number
  testLoss?: number
  trainR2: number
  testR2?: number
  iterations: number
  history: Array<{
    iteration: number
    loss: number
    slope: number
    intercept: number
  }>
}

/**
 * Linear Regression Simulator
 * Implements y = slope * x + intercept with gradient descent optimization
 */
export class LinearRegression {
  private params: LinearRegressionParams
  private history: Array<{
    iteration: number
    loss: number
    slope: number
    intercept: number
  }>
  private iterations: number

  // Data
  private trainX: number[]
  private trainY: number[]
  private testX?: number[]
  private testY?: number[]

  // Configuration
  private slopeBounds: [number, number]
  private interceptBounds: [number, number]
  private learningRate: number

  constructor(config?: {
    initialSlope?: number
    initialIntercept?: number
    slopeBounds?: [number, number]
    interceptBounds?: [number, number]
    learningRate?: number
    regType?: 'none' | 'l1' | 'l2'
    lambda?: number
  }) {
    this.params = {
      slope: config?.initialSlope ?? 1,
      intercept: config?.initialIntercept ?? 0,
      regType: config?.regType ?? 'none',
      lambda: config?.lambda ?? 0.1,
    }

    this.slopeBounds = config?.slopeBounds ?? [-10, 10]
    this.interceptBounds = config?.interceptBounds ?? [-20, 20]
    this.learningRate = config?.learningRate ?? 0.01

    this.history = []
    this.iterations = 0

    // Generate default dataset
    const data = generateLinearDataset(50, 2, 1, 1, -5, 5)
    this.trainX = data.x
    this.trainY = data.y
  }

  /**
   * Set training data
   */
  setTrainData(x: number[], y: number[]): void {
    if (x.length !== y.length) {
      throw new Error('X and Y must have same length')
    }
    this.trainX = x
    this.trainY = y
  }

  /**
   * Set test data
   */
  setTestData(x: number[], y: number[]): void {
    if (x.length !== y.length) {
      throw new Error('X and Y must have same length')
    }
    this.testX = x
    this.testY = y
  }

  /**
   * Forward pass: compute predictions
   */
  predict(x: number[]): number[] {
    return linearForward(x, this.params.slope, this.params.intercept)
  }

  /**
   * Compute training loss and metrics
   */
  evaluateTrain(): LinearRegressionResults {
    const predictions = this.predict(this.trainX)
    const loss = calculateMSE(this.trainY, predictions)
    const r2 = calculateR2(this.trainY, predictions)
    const residuals = calculateResiduals(this.trainY, predictions)

    return {
      predictions,
      loss,
      r2,
      residuals,
    }
  }

  /**
   * Compute test loss and metrics (if test data available)
   */
  evaluateTest(): LinearRegressionResults | null {
    if (!this.testX || !this.testY) {
      return null
    }

    const predictions = this.predict(this.testX)
    const loss = calculateMSE(this.testY, predictions)
    const r2 = calculateR2(this.testY, predictions)
    const residuals = calculateResiduals(this.testY, predictions)

    return {
      predictions,
      loss,
      r2,
      residuals,
    }
  }

  /**
   * Single gradient descent step
   */
  step(): LinearRegressionResults {
    // Get current predictions
    const predictions = this.predict(this.trainX)

    // Calculate gradients
    let { slopeGradient, interceptGradient } = calculateGradientsLinearMSE(
      this.trainX,
      this.trainY,
      predictions,
    )

    // Apply Regularization to slope (usually intercept is not regularized)
    if (this.params.regType === 'l1') {
      slopeGradient += this.params.lambda * Math.sign(this.params.slope)
    } else if (this.params.regType === 'l2') {
      slopeGradient += this.params.lambda * this.params.slope
    }

    // Update parameters
    this.params.slope = gradientDescentStep(
      this.params.slope,
      slopeGradient,
      this.learningRate,
    )
    this.params.intercept = gradientDescentStep(
      this.params.intercept,
      interceptGradient,
      this.learningRate,
    )

    // Apply bounds
    this.params.slope = Math.max(
      this.slopeBounds[0],
      Math.min(this.slopeBounds[1], this.params.slope),
    )
    this.params.intercept = Math.max(
      this.interceptBounds[0],
      Math.min(this.interceptBounds[1], this.params.intercept),
    )

    // Calculate results
    const newPredictions = this.predict(this.trainX)
    const loss = calculateMSE(this.trainY, newPredictions)
    const r2 = calculateR2(this.trainY, newPredictions)
    const residuals = calculateResiduals(this.trainY, newPredictions)

    // Record in history
    this.iterations++
    this.history.push({
      iteration: this.iterations,
      loss,
      slope: this.params.slope,
      intercept: this.params.intercept,
    })

    return {
      predictions: newPredictions,
      loss,
      r2,
      residuals,
      gradients: { slope: slopeGradient, intercept: interceptGradient },
      iterationCount: this.iterations,
    }
  }

  /**
   * Run N steps of gradient descent
   */
  fit(numSteps: number = 100): LinearRegressionState {
    for (let i = 0; i < numSteps; i++) {
      this.step()
    }

    const trainResults = this.evaluateTrain()
    const testResults = this.evaluateTest()

    return {
      params: this.params,
      trainLoss: trainResults.loss,
      trainR2: trainResults.r2,
      testLoss: testResults?.loss,
      testR2: testResults?.r2,
      iterations: this.iterations,
      history: this.history,
    }
  }

  /**
   * Set parameters directly (for presets)
   */
  setParams(params: Partial<LinearRegressionParams>): void {
    if (params.slope !== undefined) {
      this.params.slope = params.slope
    }
    if (params.intercept !== undefined) {
      this.params.intercept = params.intercept
    }
  }

  /**
   * Get current parameters
   */
  getParams(): LinearRegressionParams {
    return { ...this.params }
  }

  /**
   * Reset to initial state
   */
  reset(): void {
    this.params = {
      slope: 1,
      intercept: 0,
      regType: 'none',
      lambda: 0.1,
    }
    this.history = []
    this.iterations = 0
  }

  /**
   * Get training history
   */
  getHistory(): Array<{
    iteration: number
    loss: number
    slope: number
    intercept: number
  }> {
    return [...this.history]
  }

  /**
   * Check if converged (loss change below threshold)
   */
  isConverged(threshold: number = 1e-6): boolean {
    if (this.history.length < 2) return false

    const lastLoss = this.history[this.history.length - 1].loss
    const prevLoss = this.history[this.history.length - 2].loss

    return Math.abs(prevLoss - lastLoss) < threshold
  }
}

/**
 * Preset configurations for Linear Regression
 */
export const LINEAR_REGRESSION_PRESETS = {
  goodFit: {
    id: 'good-fit',
    name: 'Good Fit',
    description: 'Line fits the data well, low loss',
    params: {
      slope: 2,
      intercept: 1,
    },
  },
  poorFit: {
    id: 'poor-fit',
    name: 'Poor Fit',
    description: 'Line does not fit the data well, high loss',
    params: {
      slope: 0.5,
      intercept: 5,
    },
  },
  overfit: {
    id: 'overfit',
    name: 'Overfitting',
    description: 'Overly steep slope, overfits to noise',
    params: {
      slope: 5,
      intercept: -2,
    },
  },
  underfit: {
    id: 'underfit',
    name: 'Underfitting',
    description: 'Too gentle slope, underfits the data',
    params: {
      slope: 0.2,
      intercept: 2,
    },
  },
  horizontal: {
    id: 'horizontal',
    name: 'Horizontal Line',
    description: 'Slope = 0, predicts mean',
    params: {
      slope: 0,
      intercept: 2,
    },
  },
}
