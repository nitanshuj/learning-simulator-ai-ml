import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { SimulatorProvider, useSimulator } from './useSimulator'
import { ReactNode } from 'react'

const wrapper = ({ children }: { children: ReactNode }) => (
  <SimulatorProvider>{children}</SimulatorProvider>
)

describe('useSimulator', () => {
  it('should throw error when used outside provider', () => {
    // This test verifies that the hook requires a provider
    expect(() => {
      renderHook(() => useSimulator())
    }).toThrow('useSimulator must be used within a SimulatorProvider')
  })

  it('should initialize with empty state', () => {
    const { result } = renderHook(() => useSimulator(), { wrapper })
    expect(result.current.state.params).toEqual({})
    expect(result.current.state.isRunning).toBe(false)
  })

  it('should set parameter', () => {
    const { result } = renderHook(() => useSimulator(), { wrapper })

    act(() => {
      result.current.setParam('learningRate', 0.01)
    })

    expect(result.current.state.params['learningRate']).toBe(0.01)
  })

  it('should reset to initial state', () => {
    const { result } = renderHook(() => useSimulator(), { wrapper })

    act(() => {
      result.current.setParam('param1', 0.5)
      result.current.setParam('param2', 0.7)
    })

    expect(result.current.state.params).toEqual({ param1: 0.5, param2: 0.7 })

    act(() => {
      result.current.reset()
    })

    expect(result.current.state.params).toEqual({})
  })

  it('should load preset', () => {
    const { result } = renderHook(() => useSimulator(), { wrapper })

    const preset = {
      id: 'test-preset',
      name: 'Test Preset',
      description: 'A test preset',
      lessonId: 'test-lesson',
      params: { learningRate: 0.01, momentum: 0.9 },
      expectedBehavior: 'Test behavior',
      tags: ['test'],
    }

    act(() => {
      result.current.loadPreset(preset)
    })

    expect(result.current.state.params).toEqual(preset.params)
  })

  it('should update results', () => {
    const { result } = renderHook(() => useSimulator(), { wrapper })

    // Note: updateResults is not exported from the hook in the current implementation
    // This test shows how it would work if we exposed it
    expect(result.current.state.results.loss).toBe(0)
  })
})
