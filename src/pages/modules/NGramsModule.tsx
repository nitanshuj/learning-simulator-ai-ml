import React, { useState, useMemo } from 'react'
import { Card, Button, Navbar, Footer, BackButton, Quiz, Sidebar } from '@/components'
import { NGramsSimulator, NGramsState } from '@/simulators/NGrams'

function initSim(doc: string, n: number) {
  const sim = new NGramsSimulator(doc, n);
  return { sim, state: sim.getState() };
}

const DEFAULT_DOC = "the quick brown fox jumps over the lazy dog the quick brown fox";

export const NGramsModule: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<'visual' | 'theory'>('visual');

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
              N-Grams Simulator
            </h1>
            <p className="text-gray-600 text-lg">
              Capture local context by analyzing sequences of N consecutive words
            </p>
          </div>

          {/* Top Explanation Card */}
          <Card title="What are N-Grams?" className="bg-teal-50 border-teal-200">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">How it Works</h3>
                <p className="text-gray-700">
                  An N-Gram is a contiguous sequence of n items from a given sample of text or speech. Unlike Bag-of-Words, N-Grams preserve local word order, allowing models to understand context like "not good" vs "very good".
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-3 rounded border border-gray-200 text-center">
                  <p className="text-sm text-gray-600">Unigrams (N=1)</p>
                  <p className="text-gray-800 font-bold">Single Words</p>
                </div>
                <div className="bg-white p-3 rounded border border-gray-200 text-center">
                  <p className="text-sm text-gray-600">Bigrams (N=2)</p>
                  <p className="text-gray-800 font-bold">Word Pairs</p>
                </div>
                <div className="bg-white p-3 rounded border border-gray-200 text-center">
                  <p className="text-sm text-gray-600">Trigrams (N=3)</p>
                  <p className="text-gray-800 font-bold">Word Triplets</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Main Grid: Visualization + Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Visualization - Left */}
            <div className="lg:col-span-2 space-y-6">
              <Card title={`Generated ${state.n === 1 ? 'Unigrams' : state.n === 2 ? 'Bigrams' : state.n === 3 ? 'Trigrams' : `${state.n}-grams`}`} className="h-full overflow-hidden">
                <div className="overflow-x-auto max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                  <table className="min-w-full divide-y divide-slate-200 text-sm">
                    <thead className="bg-slate-50 sticky top-0 z-10">
                      <tr>
                        <th className="px-3 py-3 text-left font-semibold text-slate-600">N-Gram Sequence</th>
                        <th className="px-3 py-3 text-right font-semibold text-slate-600 w-24">Count</th>
                        <th className="px-3 py-3 text-left font-semibold text-slate-600">Frequency Distribution</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {state.ngrams.map((ngram, i) => {
                        const maxCount = state.ngrams.length > 0 ? state.ngrams[0].count : 1;
                        const percent = (ngram.count / maxCount) * 100;
                        return (
                        <tr key={i} className="hover:bg-slate-50 transition-colors">
                          <td className="px-3 py-3 font-mono text-teal-700 font-bold">"{ngram.text}"</td>
                          <td className="px-3 py-3 text-right text-slate-600 font-bold">{ngram.count}</td>
                          <td className="px-3 py-3">
                             <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                               <div className="bg-teal-500 h-full rounded-full transition-all duration-500" style={{ width: `${percent}%` }}></div>
                             </div>
                          </td>
                        </tr>
                      )})}
                      {state.ngrams.length === 0 && (
                        <tr><td colSpan={3} className="text-center py-10 text-slate-400 italic">No n-grams found. Try entering more text or decreasing N.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>

            {/* Controls - Right Side */}
            <div className="space-y-6">
              <Card title="Input Configuration">
                <div className="space-y-6">
                  <div>
                    <label className="text-xs text-slate-500 font-medium uppercase tracking-wider block mb-2">Source Document</label>
                    <textarea 
                      className="w-full h-32 p-3 border border-slate-200 rounded-xl text-sm text-slate-700 font-mono focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all outline-none"
                      value={docInput}
                      onChange={(e) => setDocInput(e.target.value)}
                    />
                  </div>
                  
                  <div>
                     <div className="flex justify-between items-center mb-3">
                       <label className="text-sm font-semibold text-gray-700">Sequence Length (N)</label>
                       <span className="text-lg font-bold text-teal-600">{nInput}</span>
                     </div>
                     <input 
                       type="range" 
                       min="1" max="5" step="1" 
                       value={nInput} 
                       onChange={e => setNInput(parseInt(e.target.value))} 
                       className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-500"
                     />
                     <div className="flex justify-between text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-tighter">
                       <span>Unigram</span>
                       <span>Bigram</span>
                       <span>Trigram</span>
                       <span>4-Gram</span>
                       <span>5-Gram</span>
                     </div>
                  </div>

                  <Button onClick={handleApply} variant="primary" className="w-full">Update Sequences</Button>
                  <Button 
                    onClick={() => {
                      setDocInput(DEFAULT_DOC);
                      setNInput(2);
                      sim.setDocument(DEFAULT_DOC);
                      sim.setN(2);
                      setState(sim.getState());
                    }} 
                    variant="outline" 
                    className="w-full border-dashed"
                  >
                    🔄 Reset to Defaults
                  </Button>
                </div>
              </Card>

              <Card title="Sliding Window Preview">
                 <p className="text-xs text-slate-500 mb-3 uppercase tracking-wider font-medium">How n={state.n} extracts grams:</p>
                 <div className="flex flex-wrap gap-1 p-4 bg-slate-50 rounded-xl border border-slate-200 text-sm font-mono leading-relaxed">
                   {docInput.split(/\s+/).slice(0, 15).map((w, i) => (
                     <span key={i} className={`px-1.5 py-0.5 rounded transition-colors ${i < state.n ? 'bg-teal-500 text-white font-bold shadow-sm' : 'text-slate-400'}`}>
                       {w}
                     </span>
                   ))}
                   {docInput.split(/\s+/).length > 15 && <span className="text-slate-400">...</span>}
                 </div>
                 <p className="text-[10px] text-slate-400 mt-3 text-center italic">The first {state.n}-gram in your text is highlighted above.</p>
              </Card>

              <div className="text-center bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-2">Knowledge Check</h3>
                <Button onClick={() => setShowQuiz(true)} variant="primary" className="w-full">Start N-Grams Quiz</Button>
              </div>
            </div>
          </div>

          {showQuiz && (
            <div className="mt-12">
               <Quiz 
                  title="N-Grams Mastery Quiz"
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
