import React, { useState, useMemo } from 'react'
import { Card, Button, Navbar, Footer, BackButton, Quiz } from '@/components'
import { Word2VecPlot } from '@/components/Word2VecPlot'
import { Word2VecSimulator, Word2VecState } from '@/simulators/Word2Vec'

export const Word2VecModule: React.FC = () => {
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
      <BackButton />

      <main className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-purple-50 border border-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-full mb-3">
            🌌 NLP · Embeddings
          </div>
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Word2Vec</h1>
          <p className="text-slate-500 text-lg max-w-2xl">
            Word embeddings map words to high-dimensional vectors, capturing semantic meaning.
            Select up to 3 words to see vector arithmetic in action!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 space-y-5">
            <Card title="Vocabulary">
              <p className="text-sm text-slate-500 mb-4">Click words to select them. Select 3 to see the classic analogy calculation (e.g. King - Man + Woman = ?).</p>
              <div className="flex flex-wrap gap-2">
                {state.embeddings.map(e => {
                  const isSelected = state.selectedWords.includes(e.word);
                  return (
                    <button
                      key={e.word}
                      onClick={() => toggleWord(e.word)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        isSelected 
                        ? 'bg-purple-500 text-white shadow-md' 
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {e.word}
                    </button>
                  );
                })}
              </div>
              
              <div className="mt-6 pt-4 border-t border-slate-100">
                <p className="text-sm font-bold text-slate-700 mb-2">Current Selection ({state.selectedWords.length}/3)</p>
                <div className="flex gap-2 min-h-8">
                  {state.selectedWords.map((w, i) => (
                     <span key={w} className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs font-mono">
                       {i === 0 ? '' : i === 1 ? '- ' : '+ '} {w}
                     </span>
                  ))}
                </div>
                {state.selectedWords.length > 0 && (
                  <Button onClick={clearSelection} variant="outline" size="sm" className="mt-4 w-full">Clear Selection</Button>
                )}
              </div>
            </Card>

            <Card title="How it works">
               <ul className="text-sm text-slate-600 space-y-2">
                 <li><strong>Embedding Space:</strong> Words with similar meanings are grouped closer together.</li>
                 <li><strong>Vector Math:</strong> The relationship between words encodes concepts like gender or pluralization.</li>
                 <li><strong>Example:</strong> The distance and direction from 'man' to 'king' is similar to 'woman' to 'queen'.</li>
               </ul>
            </Card>
          </div>

          <div className="lg:col-span-8 space-y-5">
            <Card title="2D Embedding Space">
              <Word2VecPlot embeddings={state.embeddings} selectedWords={state.selectedWords} height={480} />
            </Card>

            {!showQuiz ? (
              <Card className="text-center py-6">
                <h3 className="text-lg font-bold text-slate-800 mb-3">Check your knowledge</h3>
                <Button onClick={() => setShowQuiz(true)}>Take Word2Vec Quiz</Button>
              </Card>
            ) : (
              <Quiz
                title="Word2Vec Quiz"
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
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
