import React, { useState, useMemo } from 'react'
import { Card, Button, Navbar, Footer, BackButton, Quiz, Sidebar } from '@/components'
import { Word2VecPlot } from '@/components/Word2VecPlot'
import { Word2VecSimulator, Word2VecState } from '@/simulators/Word2Vec'

export const Word2VecModule: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<'visual' | 'theory'>('visual');

  const sim = useMemo(() => new Word2VecSimulator(), []);
  const [state, setState] = useState<Word2VecState>(sim.getState());
  const [showQuiz, setShowQuiz] = useState(false);

  const toggleWord = (word: string) => {
    sim.selectWord(word);
    setState(sim.getState());
  };

  const clearSelection = () => {
    sim.clearSelection();
    setState(sim.getState());
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
              Word2Vec Simulator
            </h1>
            <p className="text-gray-600 text-lg">
              Understand semantic relationships through high-dimensional word embeddings
            </p>
          </div>

          {/* Top Explanation Card */}
          <Card title="What is Word2Vec?" className="bg-purple-50 border-purple-200">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">How it Works</h3>
                <p className="text-gray-700">
                  Word2Vec is a technique to learn word embeddings by predicting a word from its context (CBOW) or vice versa (Skip-gram). It produces dense vectors where words with similar meanings are located closer together in space.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-3 rounded border border-gray-200 text-center">
                  <p className="text-sm text-gray-600">Dense Vectors</p>
                  <p className="text-gray-800 font-bold">Fixed Dimension</p>
                </div>
                <div className="bg-white p-3 rounded border border-gray-200 text-center">
                  <p className="text-sm text-gray-600">Cos Similarity</p>
                  <p className="text-gray-800 font-bold">Semantic Meaning</p>
                </div>
                <div className="bg-white p-3 rounded border border-gray-200 text-center">
                  <p className="text-sm text-gray-600">Vector Math</p>
                  <p className="text-gray-800 font-bold">Analogies</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Main Grid: Visualization + Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Visualization - Left */}
            <div className="lg:col-span-2 space-y-6">
              <Card title="2D Embedding Space Visualization" className="h-full">
                <p className="text-sm text-slate-500 mb-4">
                  High-dimensional word vectors projected into 2D using PCA/t-SNE. Similar words naturally group together.
                </p>
                <Word2VecPlot embeddings={state.embeddings} selectedWords={state.selectedWords} height={480} />
              </Card>
            </div>

            {/* Controls - Right Side */}
            <div className="space-y-6">
              <Card title="Explore Vocabulary">
                <p className="text-xs text-slate-500 mb-4 uppercase tracking-wider font-medium">Click words to select up to 3</p>
                <div className="flex flex-wrap gap-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                  {state.embeddings.map(e => {
                    const isSelected = state.selectedWords.includes(e.word);
                    return (
                      <button
                        key={e.word}
                        onClick={() => toggleWord(e.word)}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                          isSelected 
                          ? 'bg-purple-600 text-white shadow-md border-purple-600' 
                          : 'bg-white border border-slate-200 text-slate-600 hover:border-purple-300'
                        }`}
                      >
                        {e.word}
                      </button>
                    );
                  })}
                </div>
                
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Arithmetic Selection ({state.selectedWords.length}/3)</p>
                  <div className="flex flex-wrap gap-2 min-h-[40px] items-center p-3 bg-slate-50 rounded-xl border border-slate-200">
                    {state.selectedWords.length === 0 && <span className="text-xs text-slate-400 italic">No words selected...</span>}
                    {state.selectedWords.map((w, i) => (
                       <span key={w} className="px-2 py-1 bg-white text-purple-700 border border-purple-100 rounded shadow-sm text-xs font-bold">
                         {i === 0 ? '' : i === 1 ? '− ' : '+ '} {w}
                       </span>
                    ))}
                  </div>
                  {state.selectedWords.length > 0 && (
                    <Button onClick={clearSelection} variant="outline" size="sm" className="mt-4 w-full">Reset Selection</Button>
                  )}
                </div>
              </Card>

              <Card title="Relationship Insights">
                 <ul className="text-xs text-slate-600 space-y-3">
                   <li className="flex gap-2">
                     <span className="text-purple-500 font-bold">•</span>
                     <span><strong>Semantic Proximity:</strong> Similar meanings = closer distance.</span>
                   </li>
                   <li className="flex gap-2">
                     <span className="text-purple-500 font-bold">•</span>
                     <span><strong>Vector Analogies:</strong> King - Man + Woman ≈ Queen.</span>
                   </li>
                 </ul>
              </Card>

              <div className="text-center bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-2">Knowledge Check</h3>
                <Button onClick={() => setShowQuiz(true)} variant="primary" className="w-full">Start Word2Vec Quiz</Button>
              </div>
            </div>
          </div>

          {showQuiz && (
            <div className="mt-12">
               <Quiz 
                  title="Word2Vec Mastery Quiz"
                  questions={[
                    {
                      id: 'w2v-1',
                      question: 'What is the primary output of Word2Vec?',
                      options: ['A classification model', 'Dense vector embeddings for words', 'A syntax tree', 'Term frequency counts'],
                      correct: 1,
                      explanation: 'Word2Vec maps words to dense vectors (embeddings) where similar words have similar vectors.'
                    },
                    {
                      id: 'w2v-2',
                      question: 'How does Word2Vec learn embeddings?',
                      options: ['By counting vowels', 'By predicting words based on their surrounding context', 'By checking a dictionary', 'By alphabetical order'],
                      correct: 1,
                      explanation: 'It uses shallow neural networks (CBOW or Skip-gram) to predict a word from its context, or vice versa.'
                    },
                    {
                      id: 'w2v-3',
                      question: 'What happens when you subtract the vector for "Man" from "King" and add "Woman"?',
                      options: ['You get zero', 'The resulting vector is close to "Queen"', 'An error occurs', 'The vector magnitude doubles'],
                      correct: 1,
                      explanation: 'This famous vector arithmetic shows that Word2Vec captures semantic relationships like gender and royalty.'
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
