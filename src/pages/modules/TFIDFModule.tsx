import React, { useState, useMemo } from 'react'
import { Card, Button, Navbar, Footer, BackButton, Quiz, Sidebar } from '@/components'
import { TFIDFPlot } from '@/components/TFIDFPlot'
import { TFIDF, TFIDFState } from '@/simulators/TFIDF'

function initSim(docs: string[]) {
  const sim = new TFIDF(docs);
  return { sim, state: sim.getState() };
}

const DEFAULT_DOCS = [
  "machine learning is fascinating",
  "deep learning and machine learning",
  "artificial intelligence is the future"
];

export const TFIDFModule: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<'visual' | 'theory'>('visual');

  const initial = useMemo(() => initSim(DEFAULT_DOCS), []);
  const [sim] = useState(initial.sim);
  const [state, setState] = useState<TFIDFState>(initial.state);
  const [showQuiz, setShowQuiz] = useState(false);
  const [docsInput, setDocsInput] = useState(DEFAULT_DOCS.join('\n'));

  const handleApply = () => {
    const docs = docsInput.split('\n').filter(d => d.trim().length > 0);
    if (docs.length > 0) {
      sim.setDocuments(docs);
      setState(sim.getState());
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />
      <Sidebar />
      <div className="lg:pl-72 pt-16">
        <main className="p-6 lg:p-10 max-w-6xl mx-auto space-y-8">
          <BackButton />
          
          
          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-8 mt-4">
            <button 
              className={`pb-4 px-6 font-medium text-lg border-b-2 transition-colors ${activeTab === 'visual' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('visual')}
            >
              Visual Implementation
            </button>
            <button 
              className={`pb-4 px-6 font-medium text-lg border-b-2 transition-colors ${activeTab === 'theory' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('theory')}
            >
              Theory & Notes
            </button>
          </div>

          <div className={activeTab === 'visual' ? 'block space-y-8' : 'hidden'}>
{/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              TF-IDF Simulator
            </h1>
            <p className="text-gray-600 text-lg">
              Evaluate word importance using Term Frequency and Inverse Document Frequency
            </p>
          </div>

          {/* Top Explanation Card */}
          <Card title="What is TF-IDF?" className="bg-fuchsia-50 border-fuchsia-200">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">How it Works</h3>
                <p className="text-gray-700">
                  TF-IDF stands for Term Frequency-Inverse Document Frequency. It's a numerical statistic intended to reflect how important a word is to a document in a collection. It scales up rare words and scales down common words like "the" or "is".
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-3 rounded border border-gray-200 text-center">
                  <p className="text-sm text-gray-600">TF (Term Freq)</p>
                  <p className="text-gray-800 font-bold">Local Importance</p>
                </div>
                <div className="bg-white p-3 rounded border border-gray-200 text-center">
                  <p className="text-sm text-gray-600">IDF (Inv Doc Freq)</p>
                  <p className="text-gray-800 font-bold">Global Rarity</p>
                </div>
                <div className="bg-white p-3 rounded border border-gray-200 text-center">
                  <p className="text-sm text-gray-600">TF × IDF</p>
                  <p className="text-gray-800 font-bold">Final Weight</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Main Grid: Visualization + Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Visualization - Left */}
            <div className="lg:col-span-2 space-y-6">
              <Card title="Vector Space Representation" className="h-full">
                <p className="text-sm text-slate-500 mb-4">
                  Documents are projected into a 2D space. Similar documents will appear closer together based on their TF-IDF profiles.
                </p>
                <TFIDFPlot points={state.projectedPoints} height={480} />
              </Card>
            </div>

            {/* Controls - Right Side */}
            <div className="space-y-6">
              <Card title="Input Documents">
                <div className="space-y-4">
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Enter text (One per line)</p>
                  <textarea 
                    className="w-full h-40 p-3 border border-slate-200 rounded-xl text-sm text-slate-700 font-mono focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 transition-all outline-none"
                    value={docsInput}
                    onChange={(e) => setDocsInput(e.target.value)}
                  />
                  <Button onClick={handleApply} variant="primary" className="w-full">Recompute TF-IDF</Button>
                  <Button 
                    onClick={() => {
                      setDocsInput(DEFAULT_DOCS.join('\n'));
                      sim.setDocuments(DEFAULT_DOCS);
                      setState(sim.getState());
                    }} 
                    variant="outline" 
                    className="w-full border-dashed"
                  >
                    🔄 Reset to Defaults
                  </Button>
                </div>
              </Card>

              <Card title="Vocabulary & IDF Scores">
                <p className="text-xs text-slate-500 mb-3 uppercase tracking-wider font-medium">
                  {state.vocabulary.length} Terms Found
                </p>
                <div className="space-y-2 text-sm text-slate-600 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                  {state.vocabulary.map((w, i) => (
                    <div key={i} className="flex justify-between items-center border-b border-slate-100 py-2 hover:bg-slate-50 transition-colors px-1">
                      <span className="font-mono text-xs">{w}</span>
                      <span className="text-[10px] font-bold bg-fuchsia-100 text-fuchsia-700 px-2 py-0.5 rounded">IDF: {state.idfVector[i].toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <div className="text-center bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-2">Knowledge Check</h3>
                <Button onClick={() => setShowQuiz(true)} variant="primary" className="w-full">Start TF-IDF Quiz</Button>
              </div>
            </div>
          </div>

          {showQuiz && (
            <div className="mt-12">
               <Quiz 
                  title="TF-IDF Mastery Quiz"
                  questions={[
                    {
                      id: 'tfidf-1',
                      question: 'What does TF stand for?',
                      options: ['Total Frequency', 'Term Frequency', 'Text Format', 'Term Format'],
                      correct: 1,
                      explanation: 'TF stands for Term Frequency, which measures how often a word appears in a document.'
                    },
                    {
                      id: 'tfidf-2',
                      question: 'What is the purpose of IDF?',
                      options: ['To penalize frequent words like "the"', 'To increase the weight of long documents', 'To count words', 'To translate text'],
                      correct: 0,
                      explanation: 'Inverse Document Frequency reduces the weight of words that appear in many documents, highlighting unique terms.'
                    },
                    {
                      id: 'tfidf-3',
                      question: 'If a word appears in every document in a large corpus, its IDF score will be:',
                      options: ['Very high', 'Negative', 'Close to zero or very low', 'Undefined'],
                      correct: 2,
                      explanation: 'Words appearing everywhere have little discriminatory power, so their IDF is very low.'
                    }
                  ]}
                />
            </div>
          )}
          </div>
          
          <div className={activeTab === 'theory' ? 'block' : 'hidden'}>
            <div className="bg-white p-12 rounded-3xl border border-gray-200 shadow-sm min-h-[400px] flex items-center justify-center">
              <p className="text-gray-400 text-xl font-medium">Theory and Notes coming soon...</p>
            </div>
          </div>

        </main>
      </div>
      <Footer />
    </div>
  )
}
