import type { SimulatorState, SimulationSnapshot } from '../types/simulator'

/**
 * Create initial state for a specific module
 */
export const createInitialState = (moduleName: string): SimulatorState => {
  return {
    currentModule: moduleName,
    params: {},
    dataset: {
      X: [],
      y: [],
    },
    results: {
      predictions: [],
      loss: 0,
    },
    isRunning: false,
    history: [],
  }
}

/**
 * Generate a snapshot of current state
 */
export const createSnapshot = (state: SimulatorState): SimulationSnapshot => {
  return {
    timestamp: Date.now(),
    params: { ...state.params },
    results: { ...state.results },
  }
}

/**
 * Check if parameters have changed
 */
export const hasParamsChanged = (
  prevParams: Record<string, number>,
  currentParams: Record<string, number>,
): boolean => {
  const prevKeys = Object.keys(prevParams)
  const currentKeys = Object.keys(currentParams)

  if (prevKeys.length !== currentKeys.length) return true

  return prevKeys.some(
    (key) => prevParams[key] !== currentParams[key]
  )
}

/**
 * Reset all parameters to zero/default
 */
export const resetParams = (params: Record<string, number>): Record<string, number> => {
  const reset: Record<string, number> = {}
  Object.keys(params).forEach((key) => {
    reset[key] = 0
  })
  return reset
}

/**
 * Merge two param objects
 */
export const mergeParams = (
  base: Record<string, number>,
  overlay: Record<string, number>,
): Record<string, number> => {
  return {
    ...base,
    ...overlay,
  }
}

/**
 * Validate parameter bounds
 */
export const validateParam = (
  value: number,
  min: number,
  max: number,
): number => {
  return Math.max(min, Math.min(max, value))
}

/**
 * Get history item by index
 */
export const getHistorySnapshot = (
  history: SimulationSnapshot[],
  index: number,
): SimulationSnapshot | null => {
  if (index >= 0 && index < history.length) {
    return history[index]
  }
  return null
}

/**
 * Calculate average loss from history
 */
export const getAverageLoss = (history: SimulationSnapshot[]): number => {
  if (history.length === 0) return 0
  const totalLoss = history.reduce((sum, snapshot) => sum + snapshot.results.loss, 0)
  return totalLoss / history.length
}

/**
 * Check if convergence is achieved
 */
export const isConverged = (
  history: SimulationSnapshot[],
  threshold: number = 1e-6,
): boolean => {
  if (history.length < 2) return false

  const lastLoss = history[history.length - 1].results.loss
  const prevLoss = history[history.length - 2].results.loss

  return Math.abs(prevLoss - lastLoss) < threshold
}
