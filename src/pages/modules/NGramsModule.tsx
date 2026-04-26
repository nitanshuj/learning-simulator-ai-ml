import React, { useState, useMemo } from 'react'
import { Card, Button, Navbar, Footer, BackButton, Quiz } from '@/components'
import { NGramsSimulator, NGramsState } from '@/simulators/NGrams'

function initSim(doc: string, n: number) {
  const sim = new NGramsSimulator(doc, n);
  return { sim, state: sim.getState() };
}

const DEFAULT_DOC = "the quick brown fox jumps over the lazy dog the quick brown fox";

export const NGramsModule: React.FC = () => {
  const initial = useMemo(() => initSim(DEFAULT_DOC, 2), []);
  const [sim] = useState(initial.sim);
  const [state, setState] = useState<NGramsState>(initial.state);
  const [showQuiz, setShowQuiz] = useState(false);
  const [docInput, setDocInput] = useState(DEFAULT_DOC);
  const [nInput, setNInput] = useState(2);

  const handleApply = () => {
    if (docInput.trim().length > 0) {
      sim.setDocument(docInput);
      sim.setN(nInput);
      setState(sim.getState());
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />
      <BackButton />

      <main className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-100 text-teal-700 text-xs font-bold px-3 py-1 rounded-full mb-3">
            🔗 NLP · Sequences
          </div>
          <h1 className="text-4xl font-bold text-slate-800 mb-2">N-Grams</h1>
          <p className="text-slate-500 text-lg max-w-2xl">
            Analyze sequences of N consecutive words to capture local context and word relationships.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 space-y-5">
            <Card title="Input Configuration">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Enter a document:</p>
                  <textarea 
                    className="w-full h-32 p-3 border border-slate-200 rounded-lg text-sm text-slate-700 font-mono"
                    value={docInput}
                    onChange={(e) => setDocInput(e.target.value)}
                  />
                </div>
                
                <div>
                   <p className="text-sm text-slate-600 mb-1">N (Sequence Length): {nInput}</p>
                   <input 
                     type="range" 
                     min="1" max="5" step="1" 
                     value={nInput} 
                     onChange={e => setNInput(parseInt(e.target.value))} 
                     className="w-full"
                   />
                   <div className="flex justify-between text-xs text-slate-400 mt-1">
                     <span>1 (Unigram)</span>
                     <span>2 (Bigram)</span>
                     <span>3 (Trigram)</span>
                     <span>4</span>
                     <span>5</span>
                   </div>
                </div>

                <Button onClick={handleApply} variant="primary" className="w-full">Generate {state.n === 1 ? 'Unigrams' : state.n === 2 ? 'Bigrams' : state.n === 3 ? 'Trigrams' : `${state.n}-grams`}</Button>
              </div>
            </Card>

            <Card title="Context Window Visualization">
               <p className="text-sm text-slate-500 mb-3">How the sliding window works for n={state.n}:</p>
               <div className="flex flex-wrap gap-1 p-3 bg-slate-50 rounded-lg border border-slate-200 text-sm font-mono">
                 {docInput.split(' ').slice(0, 10).map((w, i) => (
                   <span key={i} className={`px-1 py-0.5 rounded ${i < state.n ? 'bg-teal-200 text-teal-800 font-bold' : 'text-slate-400'}`}>
                     {w}
                   </span>
                 ))}
                 {docInput.split(' ').length > 10 && <span className="text-slate-400">...</span>}
               </div>
               <p className="text-xs text-slate-400 mt-2 text-center">First {state.n}-gram is highlighted.</p>
            </Card>
          </div>

          <div className="lg:col-span-7 space-y-5">
            <Card title={`Generated ${state.n === 1 ? 'Unigrams' : state.n === 2 ? 'Bigrams' : state.n === 3 ? 'Trigrams' : `${state.n}-grams`}`}>
              <div className="overflow-x-auto max-h-96 overflow-y-auto">
                <table className="min-w-full divide-y divide-slate-200 text-sm">
                  <thead className="bg-slate-50 sticky top-0">
                    <tr>
                      <th className="px-3 py-2 text-left font-semibold text-slate-600">N-Gram</th>
                      <th className="px-3 py-2 text-right font-semibold text-slate-600 w-24">Count</th>
                      <th className="px-3 py-2 text-left font-semibold text-slate-600">Frequency</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {state.ngrams.map((ngram, i) => {
                      // rough relative freq bar
                      const maxCount = state.ngrams.length > 0 ? state.ngrams[0].count : 1;
                      const percent = (ngram.count / maxCount) * 100;
                      return (
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="px-3 py-2 font-mono text-slate-700 font-medium">"{ngram.text}"</td>
                        <td className="px-3 py-2 text-right text-slate-600 font-bold">{ngram.count}</td>
                        <td className="px-3 py-2">
                           <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                             <div className="bg-teal-500 h-full rounded-full" style={{ width: `${percent}%` }}></div>
                           </div>
                        </td>
                      </tr>
                    )})}
                    {state.ngrams.length === 0 && (
                      <tr><td colSpan={3} className="text-center py-4 text-slate-400">No n-grams found. Try a longer document.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Card>

            {!showQuiz ? (
              <Card className="text-center py-6">
                <h3 className="text-lg font-bold text-slate-800 mb-3">Test your understanding</h3>
                <Button onClick={() => setShowQuiz(true)}>Take N-Grams Quiz</Button>
              </Card>
            ) : (
              <Quiz
                title="N-Grams Quiz"
                questions={[
                  {
                    id: 'ng-1',
                    question: 'What is a Bigram?',
                    options: ['A sequence of two documents', 'A sequence of two consecutive words', 'Two letters', 'A graph with two axes'],
                    correct: 1,
                    explanation: 'A Bigram (N=2) is a sequence of two consecutive words in a document (e.g. "machine learning").'
                  },
                  {
                    id: 'ng-2',
                    question: 'If a document has 10 words, how many Trigrams (N=3) can be extracted from it?',
                    options: ['3', '10', '8', '7'],
                    correct: 2,
                    explanation: 'The number of n-grams is (Total Words - N + 1). So, 10 - 3 + 1 = 8 trigrams.'
                  },
                  {
                    id: 'ng-3',
                    question: 'Why are N-Grams useful in NLP compared to Bag-of-Words?',
                    options: ['They take up less memory', 'They preserve some local word order and context', 'They remove punctuation', 'They translate text to numbers'],
                    correct: 1,
                    explanation: 'Unlike BoW which completely shuffles words, N-Grams keep small windows of consecutive words together, preserving local context like "not good".'
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
