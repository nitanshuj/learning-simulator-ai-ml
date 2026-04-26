import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useCallback,
} from 'react'
import { SimulatorState, SimulationSnapshot, Preset } from '@types/simulator'

interface SimulatorContextType {
  state: SimulatorState
  setParam: (paramId: string, value: number) => void
  run: () => void
  reset: () => void
  loadPreset: (preset: Preset) => void
  undo: () => void
  redo: () => void
}

const SimulatorContext = createContext<SimulatorContextType | undefined>(undefined)

export const SimulatorProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const initialState: SimulatorState = {
    currentModule: '',
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

  type Action =
    | { type: 'SET_PARAM'; payload: { paramId: string; value: number } }
    | { type: 'SET_PARAMS'; payload: Record<string, number> }
    | { type: 'UPDATE_RESULTS'; payload: SimulatorState['results'] }
    | { type: 'SET_RUNNING'; payload: boolean }
    | { type: 'RESET' }
    | { type: 'SET_DATASET'; payload: { X: number[][]; y: number[] } }
    | { type: 'PUSH_HISTORY'; payload: SimulationSnapshot }

  const reducer = (state: SimulatorState, action: Action): SimulatorState => {
    switch (action.type) {
      case 'SET_PARAM':
        return {
          ...state,
          params: {
            ...state.params,
            [action.payload.paramId]: action.payload.value,
          },
        }

      case 'SET_PARAMS':
        return {
          ...state,
          params: action.payload,
        }

      case 'UPDATE_RESULTS':
        return {
          ...state,
          results: action.payload,
        }

      case 'SET_RUNNING':
        return {
          ...state,
          isRunning: action.payload,
        }

      case 'SET_DATASET':
        return {
          ...state,
          dataset: action.payload,
        }

      case 'PUSH_HISTORY':
        return {
          ...state,
          history: [...state.history, action.payload],
        }

      case 'RESET':
        return initialState

      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const setParam = useCallback((paramId: string, value: number) => {
    dispatch({ type: 'SET_PARAM', payload: { paramId, value } })
  }, [])

  const updateResults = useCallback((results: SimulatorState['results']) => {
    dispatch({ type: 'UPDATE_RESULTS', payload: results })
  }, [])

  const setRunning = useCallback((isRunning: boolean) => {
    dispatch({ type: 'SET_RUNNING', payload: isRunning })
  }, [])

  const setDataset = useCallback((X: number[][], y: number[]) => {
    dispatch({ type: 'SET_DATASET', payload: { X, y } })
  }, [])

  const pushHistory = useCallback((snapshot: SimulationSnapshot) => {
    dispatch({ type: 'PUSH_HISTORY', payload: snapshot })
  }, [])

  const run = useCallback(() => {
    setRunning(true)
    // Simulate delay
    setTimeout(() => {
      const snapshot: SimulationSnapshot = {
        timestamp: Date.now(),
        params: { ...state.params },
        results: { ...state.results },
      }
      pushHistory(snapshot)
      setRunning(false)
    }, 500)
  }, [state.params, state.results, setRunning, pushHistory])

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' })
  }, [])

  const loadPreset = useCallback((preset: Preset) => {
    dispatch({ type: 'SET_PARAMS', payload: preset.params })
  }, [])

  const undo = useCallback(() => {
    if (state.history.length > 0) {
      const previousSnapshot = state.history[state.history.length - 1]
      dispatch({ type: 'SET_PARAMS', payload: previousSnapshot.params })
      dispatch({ type: 'UPDATE_RESULTS', payload: previousSnapshot.results })
    }
  }, [state.history])

  const redo = useCallback(() => {
    // Placeholder for redo functionality
    // Can be implemented with additional history tracking
  }, [])

  const value: SimulatorContextType = {
    state,
    setParam,
    run,
    reset,
    loadPreset,
    undo,
    redo,
  }

  return (
    <SimulatorContext.Provider value={value}>
      {children}
    </SimulatorContext.Provider>
  )
}

export const useSimulator = (): SimulatorContextType => {
  const context = useContext(SimulatorContext)
  if (!context) {
    throw new Error('useSimulator must be used within a SimulatorProvider')
  }
  return context
}
