import { useSimulator } from './useSimulator'
import { Preset } from '@types/simulator'
import { hasParamsChanged } from '@utils/simulatorUtils'

/**
 * Custom hook for module-specific simulator management
 * Wraps useSimulator with module context
 */
export const useModuleSimulator = (moduleName: string) => {
  const simulator = useSimulator()

  const loadPresetWithDefaults = (preset: Preset) => {
    simulator.loadPreset(preset)
  }

  const updateParam = (paramId: string, value: number) => {
    simulator.setParam(paramId, value)
  }

  const getParamValue = (paramId: string, defaultValue: number = 0): number => {
    return simulator.state.params[paramId] ?? defaultValue
  }

  const getAllParams = () => {
    return { ...simulator.state.params }
  }

  return {
    ...simulator,
    loadPresetWithDefaults,
    updateParam,
    getParamValue,
    getAllParams,
  }
}
