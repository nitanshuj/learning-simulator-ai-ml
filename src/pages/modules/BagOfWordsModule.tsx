import React, { useState, useMemo } from 'react'
import { Card, Button, Navbar, Footer, BackButton, Quiz, Sidebar } from '@/components'
import { BagOfWords, BagOfWordsState } from '@/simulators/BagOfWords'

function initSim(docs: string[]) {
  const sim = new BagOfWords(docs);
  return { sim, state: sim.getState() };
}

const DEFAULT_DOCS = [
  "I love natural language processing",
  "natural language processing is fun",
  "I love learning new things"
];

export const BagOfWordsModule: React.FC = () => {
  const initial = useMemo(() => initSim(DEFAULT_DOCS), []);
  const [sim] = useState(initial.sim);
  const [state, setState] = useState<BagOfWordsState>(initial.state);
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
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Bag-of-Words (BoW) Simulator
            </h1>
            <p className="text-gray-600 text-lg">
              Convert raw text into numerical features by counting word occurrences
            </p>
          </div>

          {/* Top Explanation Card */}
          <Card title="What is Bag-of-Words?" className="bg-sky-50 border-sky-200">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">How it Works</h3>
                <p className="text-gray-700">
                  Bag-of-Words (BoW) is a simple way to represent text numerically. It treats each document as a "bag" of its words, ignoring grammar and order but keeping track of counts. It's the foundation for many text classification tasks.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-3 rounded border border-gray-200 text-center">
                  <p className="text-sm text-gray-600">Tokenization</p>
                  <p className="text-gray-800 font-bold">Splitting Words</p>
                </div>
                <div className="bg-white p-3 rounded border border-gray-200 text-center">
                  <p className="text-sm text-gray-600">Vocabulary</p>
                  <p className="text-gray-800 font-bold">Unique Terms</p>
                </div>
                <div className="bg-white p-3 rounded border border-gray-200 text-center">
                  <p className="text-sm text-gray-600">Sparsity</p>
                  <p className="text-gray-800 font-bold">Mostly Zeros</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Main Grid: Visualization + Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Visualization - Left */}
            <div className="lg:col-span-2 space-y-6">
              <Card title="Term Document Matrix" className="h-full overflow-hidden">
                <p className="text-sm text-slate-500 mb-4">
                  Each row is a document vector. Notice how the length is fixed to the vocabulary size.
                </p>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200 text-sm">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-3 py-2 text-left font-semibold text-slate-600">Doc ID</th>
                        {state.vocabulary.map((w, i) => (
                          <th key={i} className="px-3 py-2 text-center font-mono font-medium text-slate-500 whitespace-nowrap">
                            {w}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      {state.countsMatrix.map((row, docIdx) => (
                        <tr key={docIdx}>
                          <td className="px-3 py-2 font-medium text-slate-700">Doc {docIdx}</td>
                          {row.map((count, i) => (
                            <td key={i} className={`px-3 py-2 text-center font-mono ${count > 0 ? 'text-sky-600 font-bold bg-sky-50' : 'text-slate-300'}`}>
                              {count}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>

            {/* Controls - Right Side */}
            <div className="space-y-6">
              <Card title="Input Documents">
                <div className="space-y-4">
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Enter text (One per line)</p>
                  <textarea 
                    className="w-full h-40 p-3 border border-slate-200 rounded-xl text-sm text-slate-700 font-mono focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all outline-none"
                    value={docsInput}
                    onChange={(e) => setDocsInput(e.target.value)}
                  />
                  <Button onClick={handleApply} variant="primary" className="w-full">Process Text</Button>
                </div>
              </Card>

              <Card title="Vocabulary Dictionary">
                <p className="text-xs text-slate-500 mb-3 uppercase tracking-wider font-medium">
                  {state.vocabulary.length} Unique Terms
                </p>
                <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                  {state.vocabulary.map((w, i) => (
                    <span key={i} className="px-2 py-1 bg-slate-50 border border-slate-200 rounded text-xs font-mono text-slate-600 hover:border-sky-300 transition-colors">
                      {i}: {w}
                    </span>
                  ))}
                </div>
              </Card>

              <div className="text-center bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-2">Knowledge Check</h3>
                <Button onClick={() => setShowQuiz(true)} variant="primary" className="w-full">Start BoW Quiz</Button>
              </div>
            </div>
          </div>

          {showQuiz && (
            <div className="mt-12">
               <Quiz 
                  title="Bag-of-Words Mastery Quiz"
                  questions={[
                    {
                      id: 'bow-1',
                      question: 'What information is lost when using a Bag-of-Words model?',
                      options: ['Word frequency', 'Vocabulary size', 'Word order and grammar', 'The length of the document'],
                      correct: 2,
                      explanation: 'BoW only counts word frequencies, completely throwing away the order in which words appear.'
                    },
                    {
                      id: 'bow-2',
                      question: 'What does "sparse" mean in the context of BoW vectors?',
                      options: ['Most values in the vector are zero', 'The vectors are very short', 'The vectors contain decimal numbers', 'The vocabulary is very small'],
                      correct: 0,
                      explanation: 'Since any single document only uses a tiny fraction of the entire vocabulary, most counts in its vector will be zero.'
                    },
                    {
                      id: 'bow-3',
                      question: 'If a document has 5 words and the vocabulary has 10,000 words, how long is the document\'s BoW vector?',
                      options: ['5', '10,000', '10,005', '0'],
                      correct: 1,
                      explanation: 'The vector size is always equal to the total vocabulary size, even if the document only contains a few words.'
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
