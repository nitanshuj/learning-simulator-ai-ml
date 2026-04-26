import * as tf from '@tensorflow/tfjs'

/**
 * Mean Squared Error (MSE) loss calculation
 * MSE = (1/n) * Σ(y - ŷ)²
 */
export const calculateMSE = (actual: number[], predicted: number[]): number => {
  if (actual.length !== predicted.length) {
    throw new Error('Actual and predicted arrays must have same length')
  }

  const squared_errors = actual.map((a, i) => Math.pow(a - predicted[i], 2))
  const mse = squared_errors.reduce((sum, val) => sum + val, 0) / actual.length

  return mse
}

/**
 * Mean Absolute Error (MAE) loss calculation
 * MAE = (1/n) * Σ|y - ŷ|
 */
export const calculateMAE = (actual: number[], predicted: number[]): number => {
  if (actual.length !== predicted.length) {
    throw new Error('Actual and predicted arrays must have same length')
  }

  const absolute_errors = actual.map((a, i) => Math.abs(a - predicted[i]))
  const mae = absolute_errors.reduce((sum, val) => sum + val, 0) / actual.length

  return mae
}

/**
 * R² (R-squared) score
 * R² = 1 - (SS_res / SS_tot)
 * where SS_res = Σ(y - ŷ)² and SS_tot = Σ(y - ȳ)²
 */
export const calculateR2 = (actual: number[], predicted: number[]): number => {
  if (actual.length !== predicted.length) {
    throw new Error('Actual and predicted arrays must have same length')
  }

  const mean = actual.reduce((sum, val) => sum + val, 0) / actual.length

  const ss_tot = actual.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0)
  const ss_res = actual.reduce((sum, val, i) => sum + Math.pow(val - predicted[i], 2), 0)

  if (ss_tot === 0) return 0 // Handle edge case

  return 1 - ss_res / ss_tot
}

/**
 * Sigmoid activation function
 * sigmoid(x) = 1 / (1 + e^-x)
 */
export const sigmoid = (x: number): number => {
  return 1 / (1 + Math.exp(-x))
}

/**
 * Sigmoid derivative with respect to output
 * If output = sigmoid(x), then d/dx = output * (1 - output)
 */
export const sigmoidDerivative = (output: number): number => {
  return output * (1 - output)
}

/**
 * ReLU activation function
 * relu(x) = max(0, x)
 */
export const relu = (x: number): number => {
  return Math.max(0, x)
}

/**
 * ReLU derivative
 * d/dx relu(x) = 1 if x > 0, else 0
 */
export const reluDerivative = (x: number): number => {
  return x > 0 ? 1 : 0
}

/**
 * Linear transformation: y = mx + b
 */
export const linearForward = (x: number[], slope: number, intercept: number): number[] => {
  return x.map((val) => slope * val + intercept)
}

/**
 * Calculate gradient of MSE loss with respect to slope and intercept
 * For y = mx + b:
 * dL/dm = (2/n) * Σ(ŷ - y) * x
 * dL/db = (2/n) * Σ(ŷ - y)
 */
export const calculateGradientsLinearMSE = (
  x: number[],
  y: number[],
  predictions: number[],
): { slopeGradient: number; interceptGradient: number } => {
  if (x.length !== y.length || x.length !== predictions.length) {
    throw new Error('Input arrays must have same length')
  }

  const n = x.length
  const errors = predictions.map((pred, i) => pred - y[i])

  const slopeGradient = (2 / n) * errors.reduce((sum, err, i) => sum + err * x[i], 0)
  const interceptGradient = (2 / n) * errors.reduce((sum, err) => sum + err, 0)

  return { slopeGradient, interceptGradient }
}

/**
 * Gradient descent step
 * param = param - learningRate * gradient
 */
export const gradientDescentStep = (
  param: number,
  gradient: number,
  learningRate: number,
): number => {
  return param - learningRate * gradient
}

/**
 * Normalize data to [0, 1] range
 */
export const normalize = (data: number[]): { normalized: number[]; min: number; max: number } => {
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min

  if (range === 0) {
    return { normalized: data.map(() => 0), min, max }
  }

  return {
    normalized: data.map((val) => (val - min) / range),
    min,
    max,
  }
}

/**
 * Denormalize data back to original range
 */
export const denormalize = (data: number[], min: number, max: number): number[] => {
  const range = max - min
  return data.map((val) => val * range + min)
}

/**
 * Standardize data (zero mean, unit variance)
 */
export const standardize = (
  data: number[],
): { standardized: number[]; mean: number; std: number } => {
  const mean = data.reduce((sum, val) => sum + val, 0) / data.length
  const variance =
    data.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / data.length
  const std = Math.sqrt(variance)

  if (std === 0) {
    return { standardized: data.map(() => 0), mean, std }
  }

  return {
    standardized: data.map((val) => (val - mean) / std),
    mean,
    std,
  }
}

/**
 * Unstandardize data back to original scale
 */
export const unstandardize = (data: number[], mean: number, std: number): number[] => {
  return data.map((val) => val * std + mean)
}

/**
 * Calculate residuals (errors)
 */
export const calculateResiduals = (actual: number[], predicted: number[]): number[] => {
  if (actual.length !== predicted.length) {
    throw new Error('Actual and predicted arrays must have same length')
  }
  return actual.map((a, i) => a - predicted[i])
}

/**
 * Calculate correlation coefficient (Pearson)
 */
export const calculateCorrelation = (x: number[], y: number[]): number => {
  if (x.length !== y.length || x.length === 0) {
    throw new Error('Arrays must have same non-zero length')
  }

  const n = x.length
  const meanX = x.reduce((a, b) => a + b, 0) / n
  const meanY = y.reduce((a, b) => a + b, 0) / n

  const numerator = x.reduce((sum, xi, i) => sum + (xi - meanX) * (y[i] - meanY), 0)
  const denominator = Math.sqrt(
    x.reduce((sum, xi) => sum + Math.pow(xi - meanX, 2), 0) *
      y.reduce((sum, yi) => sum + Math.pow(yi - meanY, 2), 0),
  )

  if (denominator === 0) return 0

  return numerator / denominator
}

/**
 * Batch normalization parameters
 */
export interface BatchNormParams {
  gamma: number // Scale
  beta: number // Shift
  mean: number
  variance: number
  epsilon: number
}

/**
 * Softmax function for multi-class classification
 */
export const softmax = (logits: number[]): number[] => {
  const maxLogit = Math.max(...logits)
  const exps = logits.map((x) => Math.exp(x - maxLogit))
  const sumExps = exps.reduce((a, b) => a + b, 0)
  return exps.map((x) => x / sumExps)
}

/**
 * Cross-entropy loss for binary classification
 * Loss = -(y * log(ŷ) + (1-y) * log(1-ŷ))
 */
export const binaryCrossEntropy = (actual: number[], predicted: number[]): number => {
  if (actual.length !== predicted.length) {
    throw new Error('Arrays must have same length')
  }

  const epsilon = 1e-15 // Prevent log(0)
  const clipped = predicted.map((p) => Math.max(epsilon, Math.min(1 - epsilon, p)))

  const loss = actual.reduce((sum, a, i) => {
    const p = clipped[i]
    return sum - (a * Math.log(p) + (1 - a) * Math.log(1 - p))
  }, 0)

  return loss / actual.length
}

/**
 * Confusion matrix for binary classification
 */
export interface ConfusionMatrix {
  tp: number // True Positives
  tn: number // True Negatives
  fp: number // False Positives
  fn: number // False Negatives
}

export const calculateConfusionMatrix = (
  actual: number[],
  predicted: number[],
  threshold: number = 0.5,
): ConfusionMatrix => {
  if (actual.length !== predicted.length) {
    throw new Error('Arrays must have same length')
  }

  let tp = 0,
    tn = 0,
    fp = 0,
    fn = 0

  for (let i = 0; i < actual.length; i++) {
    const pred = predicted[i] >= threshold ? 1 : 0
    const actual_val = actual[i]

    if (actual_val === 1 && pred === 1) tp++
    else if (actual_val === 0 && pred === 0) tn++
    else if (actual_val === 0 && pred === 1) fp++
    else if (actual_val === 1 && pred === 0) fn++
  }

  return { tp, tn, fp, fn }
}

/**
 * Calculate accuracy from confusion matrix
 */
export const calculateAccuracy = (cm: ConfusionMatrix): number => {
  const total = cm.tp + cm.tn + cm.fp + cm.fn
  return total === 0 ? 0 : (cm.tp + cm.tn) / total
}

/**
 * Calculate precision from confusion matrix
 */
export const calculatePrecision = (cm: ConfusionMatrix): number => {
  const total = cm.tp + cm.fp
  return total === 0 ? 0 : cm.tp / total
}

/**
 * Calculate recall (sensitivity) from confusion matrix
 */
export const calculateRecall = (cm: ConfusionMatrix): number => {
  const total = cm.tp + cm.fn
  return total === 0 ? 0 : cm.tp / total
}

/**
 * Calculate F1 score from confusion matrix
 */
export const calculateF1 = (cm: ConfusionMatrix): number => {
  const precision = calculatePrecision(cm)
  const recall = calculateRecall(cm)

  if (precision + recall === 0) return 0

  return (2 * precision * recall) / (precision + recall)
}
