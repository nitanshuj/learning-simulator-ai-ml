import React, { useState, useMemo } from 'react'
import { Card, Button, Navbar, Footer, BackButton, Quiz } from '@/components'
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
      <BackButton />

      <main className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-fuchsia-50 border border-fuchsia-100 text-fuchsia-700 text-xs font-bold px-3 py-1 rounded-full mb-3">
            🔤 NLP · Text Processing
          </div>
          <h1 className="text-4xl font-bold text-slate-800 mb-2">TF-IDF</h1>
          <p className="text-slate-500 text-lg max-w-2xl">
            Term Frequency-Inverse Document Frequency evaluates how important a word is to a document in a collection.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 space-y-5">
            <Card title="Input Documents">
              <div className="space-y-4">
                <p className="text-sm text-slate-600">Enter documents (one per line):</p>
                <textarea 
                  className="w-full h-32 p-3 border border-slate-200 rounded-lg text-sm text-slate-700 font-mono"
                  value={docsInput}
                  onChange={(e) => setDocsInput(e.target.value)}
                />
                <Button onClick={handleApply} variant="primary" className="w-full">Process Documents</Button>
              </div>
            </Card>

            <Card title="Vocabulary & IDF">
              <div className="space-y-2 text-sm text-slate-600 max-h-64 overflow-y-auto pr-2">
                {state.vocabulary.map((w, i) => (
                  <div key={i} className="flex justify-between border-b border-slate-100 py-1">
                    <span className="font-mono">{w}</span>
                    <span className="text-slate-400">IDF: {state.idfVector[i].toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="lg:col-span-8 space-y-5">
            <Card title="Vector Space Representation">
              <p className="text-sm text-slate-500 mb-4">
                Documents are projected into a pseudo-2D space based on their TF-IDF vectors.
                Similar documents will cluster closer together.
              </p>
              <TFIDFPlot points={state.projectedPoints} height={400} />
            </Card>

            {!showQuiz ? (
              <Card className="text-center py-6">
                <h3 className="text-lg font-bold text-slate-800 mb-3">Test your understanding</h3>
                <Button onClick={() => setShowQuiz(true)}>Take TF-IDF Quiz</Button>
              </Card>
            ) : (
              <Quiz
                title="TF-IDF Quiz"
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
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
