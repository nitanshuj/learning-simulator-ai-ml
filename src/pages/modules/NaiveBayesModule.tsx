import React, { useState, useMemo } from 'react'
import { Card, Button, Navbar, Footer, BackButton, Quiz, Sidebar } from '@/components'
import { ClassificationPlot } from '@/components/ClassificationPlot'
import { NaiveBayes, NaiveBayesState } from '@/simulators/NaiveBayes'

export const NaiveBayesModule: React.FC = () => {
  const simulator = useMemo(() => new NaiveBayes('blobs'), [])
  const [state, setState] = useState<NaiveBayesState>(simulator.getState())
  const [datasetName, setDatasetName] = useState('blobs')
  const [showQuiz, setShowQuiz] = useState(false)

  const handleDatasetChange = (dataset: string) => {
    simulator.changeDataset(dataset)
    setDatasetName(dataset)
    setState(simulator.getState())
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />
      <Sidebar />
      <div className="lg:pl-72 pt-16">
        <main className="p-6 lg:p-10 max-w-6xl mx-auto space-y-8">
          <BackButton />
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Naive Bayes Classifier
            </h1>
            <p className="text-gray-600 text-lg">
              Probabilistic classification based on Bayes' Theorem and feature independence
            </p>
          </div>

          {/* Explanation Card */}
          <Card title="Bayes' Theorem in Action" className="bg-blue-50 border-blue-200">
            <div className="space-y-4">
              <p className="text-gray-700">
                Naive Bayes calculates the probability of a class given the observed features. It is called "Naive" because it assumes all features are <strong>independent</strong> of each other, which simplifies the math significantly.
              </p>
              <div className="bg-white p-4 rounded-xl border border-blue-100 font-mono text-sm text-center text-blue-800">
                P(Class | Features) = [P(Features | Class) * P(Class)] / P(Features)
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded border border-gray-200">
                  <p className="text-xs text-blue-500 font-bold uppercase mb-1">Gaussian Assumption</p>
                  <p className="text-gray-800 text-sm">We assume feature values for each class follow a Normal (Bell Curve) distribution.</p>
                </div>
                <div className="bg-white p-3 rounded border border-gray-200">
                  <p className="text-xs text-blue-500 font-bold uppercase mb-1">Efficiency</p>
                  <p className="text-gray-800 text-sm">Extremely fast to train and predict, even with high-dimensional data.</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <ClassificationPlot 
                data={state.data}
                predictProb={(x, y) => simulator.predict(x, y)}
                accuracy={state.accuracy}
                title={`Naive Bayes Decision Boundary (${datasetName.toUpperCase()})`}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Model Statistics</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Training Accuracy</span>
                      <span className="text-lg font-black text-emerald-500">{(state.accuracy * 100).toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Prior P(Class 0)</span>
                      <span className="text-sm font-bold text-blue-600">{(state.priors[0] * 100).toFixed(0)}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Prior P(Class 1)</span>
                      <span className="text-sm font-bold text-red-600">{(state.priors[1] * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                </Card>
                <Card className="p-4 flex flex-col justify-center">
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-2 text-center">Feature Distribution</p>
                  <p className="text-sm text-gray-600 text-center italic">
                    The smooth contours above represent the product of Gaussian probabilities for each feature.
                  </p>
                </Card>
              </div>
            </div>

            <div className="space-y-6">
              <Card title="Dataset Selection">
                <div className="grid grid-cols-2 gap-2">
                  {['blobs', 'linear', 'moons', 'circles'].map(ds => (
                    <Button 
                      key={ds}
                      onClick={() => handleDatasetChange(ds)}
                      variant={datasetName === ds ? 'primary' : 'outline'}
                      size="sm"
                      className="capitalize"
                    >
                      {ds}
                    </Button>
                  ))}
                </div>
              </Card>

              <Card title="Why use Naive Bayes?">
                <ul className="space-y-3">
                  <li className="flex gap-2 text-sm text-gray-700">
                    <span className="text-blue-500">✔</span>
                    Works well with small datasets
                  </li>
                  <li className="flex gap-2 text-sm text-gray-700">
                    <span className="text-blue-500">✔</span>
                    Handles missing data effectively
                  </li>
                  <li className="flex gap-2 text-sm text-gray-700">
                    <span className="text-blue-500">✔</span>
                    Scales linearly with feature count
                  </li>
                </ul>
              </Card>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
                <h3 className="font-bold text-gray-800 mb-3">Quiz Time</h3>
                <Button onClick={() => setShowQuiz(true)} variant="primary" className="w-full">Start Quiz</Button>
              </div>
            </div>
          </div>

          {showQuiz && (
            <div className="mt-8">
              <Quiz 
                title="Naive Bayes Mastery Quiz"
                questions={[
                  {
                    id: 'nb-1',
                    question: 'What is the "Naive" assumption in Naive Bayes?',
                    options: ['That the data is always Gaussian', 'That features are completely independent of each other', 'That the model will never overfit', 'That priors are always equal'],
                    correct: 1,
                    explanation: 'Naive Bayes assumes that the presence of one feature is unrelated to the presence of any other feature, given the class label.'
                  },
                  {
                    id: 'nb-2',
                    question: 'When does Gaussian Naive Bayes perform best?',
                    options: ['When features are highly correlated', 'When feature values follow a normal distribution within each class', 'Only for binary features (0 or 1)', 'When the dataset is extremely large'],
                    correct: 1,
                    explanation: 'Gaussian Naive Bayes is designed for continuous data and assumes that feature values for each class are sampled from a Gaussian distribution.'
                  }
                ]}
              />
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  )
}
