import React, { useState, useMemo } from 'react'
import { Card, Button, Navbar, Footer, BackButton, Quiz } from '@/components'
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
      <BackButton />

      <main className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-sky-50 border border-sky-100 text-sky-700 text-xs font-bold px-3 py-1 rounded-full mb-3">
            🛍️ NLP · Text Representation
          </div>
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Bag-of-Words (BoW)</h1>
          <p className="text-slate-500 text-lg max-w-2xl">
            Represents text as a collection of word counts, disregarding grammar and word order.
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

            <Card title="Vocabulary Dictionary">
              <p className="text-sm text-slate-500 mb-3">
                All unique words across all documents, sorted alphabetically.
              </p>
              <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
                {state.vocabulary.map((w, i) => (
                  <span key={i} className="px-2 py-1 bg-white border border-slate-200 rounded text-xs font-mono text-slate-600">
                    {i}: {w}
                  </span>
                ))}
              </div>
            </Card>
          </div>

          <div className="lg:col-span-8 space-y-5">
            <Card title="Term Document Matrix">
              <p className="text-sm text-slate-500 mb-4">
                Each document is represented as a vector of word counts. Notice how many zeros there are! This is called a "sparse" representation.
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

            {!showQuiz ? (
              <Card className="text-center py-6">
                <h3 className="text-lg font-bold text-slate-800 mb-3">Test your understanding</h3>
                <Button onClick={() => setShowQuiz(true)}>Take BoW Quiz</Button>
              </Card>
            ) : (
              <Quiz
                title="Bag-of-Words Quiz"
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
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
