# Quick Reference Guide

## Components Cheat Sheet

### Import All Components
```typescript
import {
  Button,
  Slider,
  Card,
  LessonCard,
  ControlPanel,
  Visualization,
  SimulatorView,
  PresetButtons,
  Quiz,
} from '@components'
```

---

## Component Examples

### Button
```tsx
<Button variant="primary">Primary</Button>
<Button variant="secondary" size="sm">Small</Button>
<Button variant="danger" disabled>Disabled</Button>
```

### Slider
```tsx
<Slider
  label="Slope"
  value={1.5}
  min={-5}
  max={5}
  step={0.1}
  unit=""
  onChange={(value) => console.log(value)}
  description="Controls line steepness"
/>
```

### Card
```tsx
<Card hover className="p-8">
  <h2>Title</h2>
  <p>Content</p>
</Card>
```

### LessonCard
```tsx
<LessonCard
  title="Linear Regression"
  explanation="Fit a line through data..."
  keyPoints={[
    "y = mx + b equation",
    "m is slope, b is intercept"
  ]}
>
  <p>Additional content</p>
</LessonCard>
```

### ControlPanel
```tsx
const controls = [
  {
    id: 'lr',
    label: 'Learning Rate',
    type: 'slider',
    value: 0.01,
    min: 0.001,
    max: 1.0,
    unit: ''
  },
  {
    id: 'run-btn',
    label: 'Run',
    type: 'button'
  }
]

<ControlPanel
  controls={controls}
  onSliderChange={(id, val) => console.log(id, val)}
  onAction={(actionId) => console.log(actionId)}
/>
```

### Visualization
```tsx
<Visualization
  title="2D Plot"
  loss={0.234}
  accuracy={0.95}
>
  {/* Plotly plot goes here */}
</Visualization>
```

### SimulatorView (Complete Layout)
```tsx
<SimulatorView
  title="Linear Regression"
  explanation="Adjust slope and intercept..."
  keyPoints={["Point 1", "Point 2"]}
  controls={controlsArray}
  onSliderChange={(id, val) => handleSlider(id, val)}
  loss={0.234}
  accuracy={0.85}
  vizTitle="Data + Line"
>
  {/* Custom visualization content */}
</SimulatorView>
```

### PresetButtons
```tsx
<PresetButtons
  presets={[
    { id: 'good', name: 'Good Fit', description: 'Well fitted' },
    { id: 'poor', name: 'Poor Fit', description: 'Poorly fitted' }
  ]}
  onSelect={(id) => loadPreset(id)}
  selectedId="good"
/>
```

### Quiz
```tsx
<Quiz
  questions={[
    {
      id: 'q1',
      question: 'What is slope?',
      options: ['A', 'B', 'C', 'D'],
      correct: 0,
      explanation: 'Slope is...',
      difficulty: 'easy'
    }
  ]}
  onComplete={(score) => console.log(`Score: ${score}`)}
/>
```

---

## Hooks Cheat Sheet

### useSimulator Hook
```typescript
import { useSimulator } from '@hooks'

function MyComponent() {
  const {
    state,           // Current simulator state
    setParam,        // Update parameter
    run,            // Execute simulation
    reset,          // Reset to initial state
    loadPreset,     // Load preset config
    undo,           // Undo last action
    redo            // Redo next action
  } = useSimulator()

  return (
    <div>
      <button onClick={() => setParam('slope', 2)}>
        Set Slope to 2
      </button>
      <p>Current Loss: {state.results.loss}</p>
    </div>
  )
}
```

### useModuleSimulator Hook (Module-Specific)
```typescript
import { useModuleSimulator } from '@hooks'

function LinearRegressionModule() {
  const {
    state,
    getParamValue,
    getAllParams,
    updateParam,
    run,
    reset
  } = useModuleSimulator('linear-regression')

  const slope = getParamValue('slope', 1)
  const allParams = getAllParams()

  return (
    <div>
      <p>Slope: {slope}</p>
      <button onClick={() => updateParam('slope', 2)}>
        Change Slope
      </button>
    </div>
  )
}
```

---

## State Structure

```typescript
interface SimulatorState {
  // Current module name
  currentModule: 'linear-regression' | 'gradient-descent' | 'logistic-regression'
  
  // Current parameters
  params: {
    [paramId: string]: number
  }
  
  // Input dataset
  dataset: {
    X: number[][]     // Features (N x M)
    y: number[]       // Labels (N)
  }
  
  // Simulation output
  results: {
    predictions: number[]     // Model predictions
    loss: number             // Scalar loss value
    gradients?: Record<string, number>
    iterations?: number
    accuracy?: number
  }
  
  // Flag for active simulation
  isRunning: boolean
  
  // History snapshots
  history: SimulationSnapshot[]
}
```

---

## Utility Functions Cheat Sheet

```typescript
import {
  createInitialState,
  createSnapshot,
  hasParamsChanged,
  resetParams,
  mergeParams,
  validateParam,
  getHistorySnapshot,
  getAverageLoss,
  isConverged
} from '@utils'

// Create new state
const state = createInitialState('linear-regression')

// Take snapshot
const snapshot = createSnapshot(state)

// Check if params changed
const changed = hasParamsChanged(prev, current)

// Reset params to 0
const reset = resetParams(params)

// Merge param objects
const merged = mergeParams(base, overlay)

// Clip param to valid range
const value = validateParam(5, 0, 1) // Returns 1

// Get average loss from history
const avgLoss = getAverageLoss(history)

// Check convergence
const converged = isConverged(history, threshold)
```

---

## Common Patterns

### Pattern 1: Setting Up a Simulator Module
```tsx
import { useSimulator } from '@hooks'
import { SimulatorView } from '@components'

export function MySimulator() {
  const { state, setParam, run } = useSimulator()

  const controls = [
    {
      id: 'param1',
      label: 'Parameter 1',
      type: 'slider',
      value: state.params.param1 || 0,
      min: -10,
      max: 10
    },
    {
      id: 'run',
      label: 'Run',
      type: 'button'
    }
  ]

  return (
    <SimulatorView
      title="My Simulator"
      explanation="Description..."
      keyPoints={['Point 1', 'Point 2']}
      controls={controls}
      onSliderChange={(id, val) => setParam(id, val)}
      onAction={(id) => id === 'run' && run()}
      loss={state.results.loss}
    />
  )
}
```

### Pattern 2: Loading Presets
```tsx
const { loadPreset } = useSimulator()

const preset = {
  id: 'good-fit',
  name: 'Good Fit',
  description: 'Well-fitted line',
  lessonId: 'linear-regression',
  params: { slope: 2, intercept: 1 },
  expectedBehavior: 'Low loss',
  tags: ['example']
}

<button onClick={() => loadPreset(preset)}>
  Load Good Fit Preset
</button>
```

### Pattern 3: Conditional Rendering Based on State
```tsx
const { state } = useSimulator()

return (
  <div>
    {state.isRunning && <p>⏳ Simulating...</p>}
    {!state.isRunning && state.results.loss < 0.1 && (
      <p>✅ Great results!</p>
    )}
    <p>Loss: {state.results.loss.toFixed(4)}</p>
  </div>
)
```

---

## Styling with Tailwind

### Color Classes
```jsx
<div className="bg-primary-500">Primary blue</div>
<div className="text-secondary-600">Secondary purple text</div>
<div className="border-success-200">Success green border</div>
```

### Button Classes
```jsx
<button className="btn-primary">Primary Button</button>
<button className="btn-secondary">Secondary Button</button>
<button className="btn-success">Success Button</button>
<button className="btn-danger">Danger Button</button>
```

### Card Classes
```jsx
<div className="card">Simple card</div>
<div className="card-hover">Card with hover effect</div>
```

### Layout Classes
```jsx
<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
  <div>Left (40%)</div>
  <div className="lg:col-span-2">Right (60%)</div>
</div>
```

---

## Tips & Tricks

### 1. Always wrap app with SimulatorProvider
```tsx
import { SimulatorProvider } from '@hooks'

function App() {
  return (
    <SimulatorProvider>
      <YourComponents />
    </SimulatorProvider>
  )
}
```

### 2. Use path aliases for imports
```typescript
// ✅ Good
import { Button } from '@components'
import { useSimulator } from '@hooks'

// ❌ Avoid
import { Button } from '../../components/Button'
```

### 3. Memoize callbacks in components
```tsx
import { useCallback } from 'react'

function MyComponent() {
  const handleChange = useCallback((value) => {
    setParam('id', value)
  }, [])

  return <Slider onChange={handleChange} />
}
```

### 4. Extract control definitions to variables
```typescript
const CONTROLS = [
  { id: 'slope', label: 'Slope', type: 'slider', ... },
  { id: 'intercept', label: 'Intercept', type: 'slider', ... }
]

// Reuse in multiple places
<ControlPanel controls={CONTROLS} />
```

### 5. Use TypeScript interfaces
```typescript
import type { ControlItem, PresetOption } from '@components'

const controls: ControlItem[] = [...]
const presets: PresetOption[] = [...]
```

---

## File Organization

When adding code, follow this structure:

```
src/
├── components/       → UI components only
├── hooks/           → React hooks (useSimulator, etc.)
├── simulators/      → ML engine (math, algorithms)
├── lessons/         → Lesson configurations (JSON)
├── types/           → TypeScript interfaces
├── utils/           → Helper functions
├── pages/           → Full page components
└── styles/          → Global CSS
```

---

## Next: Steps 4-8

Ready to implement the ML engines? See `IMPLEMENTATION_GUIDE.md` for:
- Step 4: TensorFlow.js setup
- Step 5: Linear Regression simulator
- Step 6: Visualization with Plotly
- Step 7: Integration
- Step 8+: More modules
