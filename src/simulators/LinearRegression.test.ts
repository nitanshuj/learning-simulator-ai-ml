import { describe, it, expect, beforeEach } from 'vitest'
import {
  LinearRegression,
  LINEAR_REGRESSION_PRESETS,
} from './LinearRegression'

describe('LinearRegression', () => {
  let regressor: LinearRegression

  beforeEach(() => {
    regressor = new LinearRegression()
  })

  describe('initialization', () => {
    it('should initialize with default parameters', () => {
      const params = regressor.getParams()
      expect(params.slope).toBe(1)
      expect(params.intercept).toBe(0)
    })

    it('should initialize with custom parameters', () => {
      const custom = new LinearRegression({
        initialSlope: 2.5,
        initialIntercept: -3.7,
      })
      const params = custom.getParams()
      expect(params.slope).toBe(2.5)
      expect(params.intercept).toBe(-3.7)
    })

    it('should generate default training data', () => {
      const results = regressor.evaluateTrain()
      expect(results.predictions.length).toBeGreaterThan(0)
    })
  })

  describe('predict', () => {
    it('should make predictions using y = mx + b', () => {
      regressor.setParams({ slope: 2, intercept: 1 })
      const predictions = regressor.predict([0, 1, 2, 3])
      expect(predictions[0]).toBe(1) // b
      expect(predictions[1]).toBe(3) // 2*1 + 1
      expect(predictions[2]).toBe(5) // 2*2 + 1
      expect(predictions[3]).toBe(7) // 2*3 + 1
    })

    it('should handle negative inputs', () => {
      regressor.setParams({ slope: 3, intercept: 2 })
      const predictions = regressor.predict([-2, -1, 0, 1])
      expect(predictions[0]).toBe(-4) // 3*(-2) + 2
      expect(predictions[1]).toBe(-1) // 3*(-1) + 2
      expect(predictions[2]).toBe(2) // 3*0 + 2
      expect(predictions[3]).toBe(5) // 3*1 + 2
    })

    it('should return array of same length as input', () => {
      const x = [1, 2, 3, 4, 5]
      const predictions = regressor.predict(x)
      expect(predictions.length).toBe(x.length)
    })
  })

  describe('data management', () => {
    it('should set training data', () => {
      const x = [1, 2, 3]
      const y = [2, 4, 6]
      regressor.setTrainData(x, y)
      const results = regressor.evaluateTrain()
      expect(results.predictions.length).toBe(3)
    })

    it('should set test data', () => {
      const x = [1, 2, 3]
      const y = [2, 4, 6]
      regressor.setTestData(x, y)
      const results = regressor.evaluateTest()
      expect(results).not.toBeNull()
      expect(results!.predictions.length).toBe(3)
    })

    it('should throw error if X and Y lengths do not match (train)', () => {
      expect(() => {
        regressor.setTrainData([1, 2], [1, 2, 3])
      }).toThrow('X and Y must have same length')
    })

    it('should throw error if X and Y lengths do not match (test)', () => {
      expect(() => {
        regressor.setTestData([1, 2], [1, 2, 3])
      }).toThrow('X and Y must have same length')
    })

    it('should return null for test evaluation if no test data set', () => {
      const results = regressor.evaluateTest()
      expect(results).toBeNull()
    })
  })

  describe('evaluation', () => {
    it('should compute training loss', () => {
      regressor.setTrainData([1, 2, 3], [2, 4, 6])
      regressor.setParams({ slope: 2, intercept: 0 })
      const results = regressor.evaluateTrain()
      expect(results.loss).toBe(0) // Perfect fit
    })

    it('should compute training R²', () => {
      regressor.setTrainData([1, 2, 3], [2, 4, 6])
      regressor.setParams({ slope: 2, intercept: 0 })
      const results = regressor.evaluateTrain()
      expect(results.r2).toBe(1) // Perfect fit
    })

    it('should compute residuals', () => {
      regressor.setTrainData([1, 2, 3], [2, 4, 6])
      regressor.setParams({ slope: 2, intercept: 0 })
      const results = regressor.evaluateTrain()
      expect(results.residuals.length).toBe(3)
      expect(results.residuals.every((r) => Math.abs(r) < 1e-10)).toBe(true)
    })

    it('should handle imperfect fits with high loss', () => {
      regressor.setTrainData([1, 2, 3], [2, 4, 6])
      regressor.setParams({ slope: 1, intercept: 1 })
      const results = regressor.evaluateTrain()
      expect(results.loss).toBeGreaterThan(0)
    })
  })

  describe('gradient descent step', () => {
    it('should improve loss over steps', () => {
      // Linear data: y = 2x + 1
      const x = [1, 2, 3, 4, 5]
      const y = [3, 5, 7, 9, 11]
      regressor.setTrainData(x, y)
      regressor.setParams({ slope: 1, intercept: 0 })

      // Initial loss
      const initialResults = regressor.evaluateTrain()
      const initialLoss = initialResults.loss

      // Take one step
      const stepResults = regressor.step()
      expect(stepResults.loss).toBeLessThan(initialLoss)
    })

    it('should return gradients', () => {
      const x = [1, 2, 3, 4, 5]
      const y = [3, 5, 7, 9, 11]
      regressor.setTrainData(x, y)
      regressor.setParams({ slope: 1, intercept: 0 })

      const results = regressor.step()
      expect(results.gradients).toBeDefined()
      expect(typeof results.gradients!.slope).toBe('number')
      expect(typeof results.gradients!.intercept).toBe('number')
    })

    it('should increment iteration count', () => {
      regressor.step()
      regressor.step()
      const results = regressor.step()
      expect(results.iterationCount).toBe(3)
    })

    it('should respect parameter bounds', () => {
      const custom = new LinearRegression({
        initialSlope: 9.9,
        initialIntercept: 19.9,
        slopeBounds: [-10, 10],
        interceptBounds: [-20, 20],
        learningRate: 0.1,
      })

      const x = [1, 2, 3]
      const y = [100, 100, 100]
      custom.setTrainData(x, y)

      // Take many steps to try to exceed bounds
      for (let i = 0; i < 100; i++) {
        custom.step()
      }

      const params = custom.getParams()
      expect(params.slope).toBeGreaterThanOrEqual(-10)
      expect(params.slope).toBeLessThanOrEqual(10)
      expect(params.intercept).toBeGreaterThanOrEqual(-20)
      expect(params.intercept).toBeLessThanOrEqual(20)
    })
  })

  describe('fit method', () => {
    it('should fit for N steps', () => {
      const x = [1, 2, 3, 4, 5]
      const y = [2, 4, 6, 8, 10]
      regressor.setTrainData(x, y)
      regressor.setParams({ slope: 0.1, intercept: 0.1 })

      const state = regressor.fit(50)
      expect(state.iterations).toBe(50)
    })

    it('should return state object with all fields', () => {
      const x = [1, 2, 3, 4, 5]
      const y = [2, 4, 6, 8, 10]
      regressor.setTrainData(x, y)

      const state = regressor.fit(10)
      expect(state.params).toBeDefined()
      expect(state.trainLoss).toBeDefined()
      expect(state.trainR2).toBeDefined()
      expect(state.iterations).toBe(10)
      expect(state.history).toBeDefined()
      expect(state.history.length).toBe(10)
    })

    it('should improve fit over iterations', () => {
      const x = [1, 2, 3, 4, 5]
      const y = [2, 4, 6, 8, 10]
      regressor.setTrainData(x, y)
      regressor.setParams({ slope: 0.1, intercept: 0.1 })

      const state = regressor.fit(100)
      expect(state.trainLoss).toBeLessThan(5) // Much better than initial
      expect(state.trainR2).toBeGreaterThan(0.9) // Good fit
    })

    it('should include test loss if test data available', () => {
      const trainX = [1, 2, 3, 4]
      const trainY = [2, 4, 6, 8]
      const testX = [1.5, 2.5, 3.5]
      const testY = [3, 5, 7]

      regressor.setTrainData(trainX, trainY)
      regressor.setTestData(testX, testY)

      const state = regressor.fit(50)
      expect(state.testLoss).toBeDefined()
      expect(state.testR2).toBeDefined()
    })
  })

  describe('parameter management', () => {
    it('should set parameters', () => {
      regressor.setParams({ slope: 3.5, intercept: -2.1 })
      const params = regressor.getParams()
      expect(params.slope).toBe(3.5)
      expect(params.intercept).toBe(-2.1)
    })

    it('should partially update parameters', () => {
      regressor.setParams({ slope: 5 })
      let params = regressor.getParams()
      expect(params.slope).toBe(5)
      expect(params.intercept).toBe(0) // Unchanged

      regressor.setParams({ intercept: 3 })
      params = regressor.getParams()
      expect(params.slope).toBe(5) // Still unchanged
      expect(params.intercept).toBe(3)
    })

    it('should reset to initial state', () => {
      regressor.setParams({ slope: 5, intercept: -3 })
      regressor.fit(10)
      regressor.reset()

      const params = regressor.getParams()
      expect(params.slope).toBe(1)
      expect(params.intercept).toBe(0)

      const history = regressor.getHistory()
      expect(history.length).toBe(0)
    })
  })

  describe('convergence detection', () => {
    it('should detect convergence when loss stabilizes', () => {
      const x = [1, 2, 3, 4, 5]
      const y = [2, 4, 6, 8, 10]
      regressor.setTrainData(x, y)

      // Train to convergence
      for (let i = 0; i < 1000; i++) {
        regressor.step()
      }

      const converged = regressor.isConverged(1e-6)
      expect(converged).toBe(true)
    })

    it('should return false if not enough history', () => {
      const converged = regressor.isConverged()
      expect(converged).toBe(false)
    })

    it('should respect threshold parameter', () => {
      const x = [1, 2, 3, 4, 5]
      const y = [2, 4, 6, 8, 10]
      regressor.setTrainData(x, y)
      regressor.fit(10)

      // Large threshold should detect convergence quickly
      const convergedLoose = regressor.isConverged(1000)
      expect(convergedLoose).toBe(true)

      // Small threshold might not detect convergence
      const convergedStrict = regressor.isConverged(1e-12)
      // Result depends on actual loss, just check it returns boolean
      expect(typeof convergedStrict).toBe('boolean')
    })
  })

  describe('history tracking', () => {
    it('should track history through steps', () => {
      const x = [1, 2, 3]
      const y = [2, 4, 6]
      regressor.setTrainData(x, y)
      regressor.setParams({ slope: 0.5, intercept: 0 })

      regressor.step()
      regressor.step()
      regressor.step()

      const history = regressor.getHistory()
      expect(history.length).toBe(3)
      expect(history[0].iteration).toBe(1)
      expect(history[1].iteration).toBe(2)
      expect(history[2].iteration).toBe(3)
    })

    it('should record loss and parameters in history', () => {
      const x = [1, 2, 3]
      const y = [2, 4, 6]
      regressor.setTrainData(x, y)
      regressor.setParams({ slope: 0.5, intercept: 0 })

      regressor.step()
      const history = regressor.getHistory()
      const entry = history[0]

      expect(entry.iteration).toBe(1)
      expect(typeof entry.loss).toBe('number')
      expect(typeof entry.slope).toBe('number')
      expect(typeof entry.intercept).toBe('number')
    })

    it('should show improving loss in history', () => {
      const x = [1, 2, 3, 4, 5]
      const y = [2, 4, 6, 8, 10]
      regressor.setTrainData(x, y)
      regressor.setParams({ slope: 0.1, intercept: 0.1 })

      regressor.fit(50)
      const history = regressor.getHistory()

      // Loss should generally decrease
      const firstLoss = history[0].loss
      const lastLoss = history[history.length - 1].loss
      expect(lastLoss).toBeLessThan(firstLoss)
    })
  })

  describe('presets', () => {
    it('should define all preset configurations', () => {
      expect(LINEAR_REGRESSION_PRESETS.goodFit).toBeDefined()
      expect(LINEAR_REGRESSION_PRESETS.poorFit).toBeDefined()
      expect(LINEAR_REGRESSION_PRESETS.overfit).toBeDefined()
      expect(LINEAR_REGRESSION_PRESETS.underfit).toBeDefined()
      expect(LINEAR_REGRESSION_PRESETS.horizontal).toBeDefined()
    })

    it('should have required fields in each preset', () => {
      Object.values(LINEAR_REGRESSION_PRESETS).forEach((preset) => {
        expect(preset.id).toBeDefined()
        expect(preset.name).toBeDefined()
        expect(preset.description).toBeDefined()
        expect(preset.params).toBeDefined()
        expect(preset.params.slope).toBeDefined()
        expect(preset.params.intercept).toBeDefined()
      })
    })

    it('should be applicable to regressor', () => {
      const preset = LINEAR_REGRESSION_PRESETS.goodFit
      regressor.setParams(preset.params)
      const params = regressor.getParams()
      expect(params.slope).toBe(preset.params.slope)
      expect(params.intercept).toBe(preset.params.intercept)
    })
  })

  describe('edge cases', () => {
    it('should handle zero slope', () => {
      regressor.setParams({ slope: 0, intercept: 5 })
      const predictions = regressor.predict([1, 2, 3])
      expect(predictions).toEqual([5, 5, 5])
    })

    it('should handle negative intercept', () => {
      regressor.setParams({ slope: 1, intercept: -10 })
      regressor.setTrainData(
        [1, 2, 3],
        [-9, -8, -7],
      )
      const results = regressor.evaluateTrain()
      expect(results.loss).toBe(0)
    })

    it('should handle very small gradients', () => {
      const x = [1000, 2000, 3000]
      const y = [1001, 2001, 3001]
      regressor.setTrainData(x, y)
      regressor.setParams({ slope: 1.1, intercept: 1 })

      const results = regressor.step()
      expect(typeof results.loss).toBe('number')
      expect(results.loss).not.toBeNaN()
    })

    it('should handle empty array inputs', () => {
      expect(() => {
        regressor.predict([])
      }).not.toThrow()
      expect(regressor.predict([])).toEqual([])
    })
  })
})
