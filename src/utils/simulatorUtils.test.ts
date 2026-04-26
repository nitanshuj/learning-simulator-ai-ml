import { describe, it, expect } from 'vitest'
import {
  createInitialState,
  createSnapshot,
  hasParamsChanged,
  validateParam,
  isConverged,
} from './simulatorUtils'

describe('simulatorUtils', () => {
  it('should create initial state', () => {
    const state = createInitialState('linear-regression')
    expect(state.currentModule).toBe('linear-regression')
    expect(state.params).toEqual({})
    expect(state.isRunning).toBe(false)
  })

  it('should create a snapshot', () => {
    const state = createInitialState('linear-regression')
    state.params = { slope: 1, intercept: 0 }
    state.results = { predictions: [1, 2, 3], loss: 0.5 }

    const snapshot = createSnapshot(state)
    expect(snapshot.params).toEqual({ slope: 1, intercept: 0 })
    expect(snapshot.results.loss).toBe(0.5)
    expect(snapshot.timestamp).toBeGreaterThan(0)
  })

  it('should detect parameter changes', () => {
    const prev = { a: 1, b: 2 }
    const current = { a: 1, b: 2 }
    expect(hasParamsChanged(prev, current)).toBe(false)

    current.b = 3
    expect(hasParamsChanged(prev, current)).toBe(true)

    current.c = 4
    expect(hasParamsChanged(prev, current)).toBe(true)
  })

  it('should validate parameter bounds', () => {
    expect(validateParam(0.5, 0, 1)).toBe(0.5)
    expect(validateParam(-1, 0, 1)).toBe(0)
    expect(validateParam(2, 0, 1)).toBe(1)
  })

  it('should check convergence', () => {
    const history = [
      {
        timestamp: 0,
        params: {},
        results: { predictions: [], loss: 1 },
      },
      {
        timestamp: 1,
        params: {},
        results: { predictions: [], loss: 0.9 },
      },
      {
        timestamp: 2,
        params: {},
        results: { predictions: [], loss: 0.9 + 1e-7 },
      },
    ]

    expect(isConverged(history)).toBe(true)
    expect(isConverged(history, 0.01)).toBe(false)
  })
})
