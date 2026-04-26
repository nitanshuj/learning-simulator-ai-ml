import './App.css'
import { SimulatorProvider } from '@hooks'
import DemoSimulatorPage from '@/pages/DemoSimulatorPage'

function App() {
  return (
    <SimulatorProvider>
      <DemoSimulatorPage />
    </SimulatorProvider>
  )
}

export default App
