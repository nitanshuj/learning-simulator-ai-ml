import React, { useState } from 'react'
import { Navbar } from '../../components/Navbar'
import { Footer } from '../../components/Footer'

interface TokenData {
  id: number
  text: string
  pos: number
}

export const TransformersModule: React.FC = () => {
  const [inputText, setInputText] = useState('I love AI and NLP')
  const [activeTab, setActiveTab] = useState<'architecture' | 'attention' | 'positional'>('architecture')
  const [selectedBlock, setSelectedBlock] = useState<string | null>('Multi-Head Attention')

  // Attention sandbox states
  const [headCount, setHeadCount] = useState(4)
  const [embedDim, setEmbedDim] = useState(64)
  const [selectedHead, setSelectedHead] = useState(1)

  // Tokenize
  const tokens: TokenData[] = inputText.split(' ').map((word, index) => ({
    id: index,
    text: word,
    pos: index,
  }))

  // Generate fake attention matrix for visualization
  const getAttentionMatrix = (words: string[], head: number) => {
    const size = words.length
    const matrix: number[][] = []
    for (let i = 0; i < size; i++) {
      let row: number[] = []
      let sum = 0
      for (let j = 0; j < size; j++) {
        // Shift attention weights based on the active head to simulate multiple attention views
        const seed = (i + j + head) % size
        const base = seed === 0 ? 0.6 : Math.random() * 0.15
        row.push(base)
        sum += base
      }
      // Normalize to sum to 1 (softmax simulation)
      row = row.map((val) => val / sum)
      matrix.push(row)
    }
    return matrix
  }

  const attentionMatrix = getAttentionMatrix(tokens.map(t => t.text), selectedHead)

  // Positional wave simulation
  const getPositionalEncoding = (pos: number, dim: number) => {
    const result: number[] = []
    for (let i = 0; i < dim; i++) {
      if (i % 2 === 0) {
        result.push(Math.sin(pos / Math.pow(10000, i / dim)))
      } else {
        result.push(Math.cos(pos / Math.pow(10000, (i - 1) / dim)))
      }
    }
    return result
  }

  const architectureBlocks = [
    { name: 'Multi-Head Self-Attention', section: 'Encoder', desc: 'Allows the encoder to weigh the importance of all tokens across different contextual perspectives simultaneously.' },
    { name: 'Feed Forward Network', section: 'Encoder', desc: 'Applies position-wise independent neural transforms to extract higher-order text characteristics.' },
    { name: 'Masked Attention', section: 'Decoder', desc: 'Prevents the decoder from looking ahead to future tokens ensuring sequential prediction parity.' },
    { name: 'Cross-Attention', section: 'Decoder', desc: 'Integrates the encoders computed global features directly into the target generation loop.' },
  ]

  return (
    <div className="min-h-screen bg-[#fafbfc] font-sans flex flex-col justify-between">
      <Navbar />

      <main className="flex-grow pt-28 pb-16 container-wide">
        <section className="mb-8">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-600 border border-purple-100 mb-3 animate-pulse">
            🤖 Advanced AI Visualization
          </span>
          <h1 className="text-4xl font-bold text-slate-800 tracking-tight">
            The Transformer Architecture
          </h1>
          <p className="text-sm text-slate-500 max-w-xl mt-1 leading-relaxed">
            Break down the groundbreaking Attention-based design powering generative AI pipelines.
          </p>
        </section>

        {/* Tab Controls */}
        <section className="flex border-b border-slate-200 mb-8 space-x-6">
          <button
            onClick={() => setActiveTab('architecture')}
            className={`pb-4 text-sm font-bold border-b-2 transition-all ${
              activeTab === 'architecture'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            📋 Architecture Flow
          </button>
          <button
            onClick={() => setActiveTab('attention')}
            className={`pb-4 text-sm font-bold border-b-2 transition-all ${
              activeTab === 'attention'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            🔥 Attention Sandbox
          </button>
          <button
            onClick={() => setActiveTab('positional')}
            className={`pb-4 text-sm font-bold border-b-2 transition-all ${
              activeTab === 'positional'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            🌊 Positional Encoding
          </button>
        </section>

        {/* Tab content */}
        {activeTab === 'architecture' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Visual Flow diagram */}
            <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 p-8 shadow-sm flex flex-col justify-center items-center relative overflow-hidden">
              <style>{`
                @keyframes dash {
                  to {
                    stroke-dashoffset: -20;
                  }
                }
                .flow-path {
                  stroke-dasharray: 4, 4;
                  animation: dash 0.8s linear infinite;
                }
                .pulse-circle {
                  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
                @keyframes pulse {
                  0%, 100% { opacity: 1; transform: scale(1); }
                  50% { opacity: .7; transform: scale(1.1); }
                }
              `}</style>
              
              <div className="w-full text-center text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></span>
                Vaswani Attention Pipeline Engine
              </div>

              <svg viewBox="0 0 700 850" className="w-full max-w-2xl h-auto font-sans">
                {/* 1. INPUTS & ENCODING (Left Column, X=150) */}
                <g transform="translate(0, 0)">
                  {/* Input Tokens */}
                  <rect x="70" y="780" width="160" height="40" rx="8" fill="#dcfce7" stroke="#86efac" strokeWidth="2" />
                  <text x="150" y="805" textAnchor="middle" className="text-xs font-bold fill-emerald-800">Input Tokens (e.g. I love NLP)</text>
                  
                  {/* Token Embedding */}
                  <rect x="70" y="710" width="160" height="40" rx="8" fill="#fbcfe8" stroke="#f472b6" strokeWidth="2" />
                  <text x="150" y="735" textAnchor="middle" className="text-xs font-bold fill-pink-800">Token Embedding</text>
                  <path d="M 150 780 L 150 750" fill="none" stroke="#f472b6" strokeWidth="2" className="flow-path" />

                  {/* Positional Encoding */}
                  <circle cx="150" cy="640" r="18" fill="#fef08a" stroke="#facc15" strokeWidth="2" />
                  <text x="150" y="645" textAnchor="middle" className="text-sm font-black fill-yellow-800">+</text>
                  <path d="M 150 710 L 150 658" fill="none" stroke="#f472b6" strokeWidth="2" className="flow-path" />
                  
                  <path d="M 80 640 L 132 640" fill="none" stroke="#facc15" strokeWidth="1.5" strokeDasharray="2 2" />
                  <text x="50" y="643" textAnchor="middle" className="text-[9px] font-bold fill-slate-400">Positional Encoding</text>

                  {/* ENCODER BOUNDARY */}
                  <rect x="50" y="190" width="200" height="410" rx="16" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="6 6" />
                  <text x="150" y="215" textAnchor="middle" className="text-xs font-black fill-emerald-600 tracking-widest">ENCODER (N_x layers)</text>
                  <path d="M 150 622 L 150 560" fill="none" stroke="#10b981" strokeWidth="2" className="flow-path" />

                  {/* Multi-Head Self Attention */}
                  <g onClick={() => setSelectedBlock('Multi-Head Self-Attention')} className="cursor-pointer group">
                    <rect x="70" y="500" width="160" height="60" rx="12" fill={selectedBlock === 'Multi-Head Self-Attention' ? '#0f172a' : '#ffedd5'} stroke="#fed7aa" strokeWidth="2" className="transition-all group-hover:stroke-blue-500" />
                    <text x="150" y="535" textAnchor="middle" className={`text-xs font-bold ${selectedBlock === 'Multi-Head Self-Attention' ? 'fill-white' : 'fill-orange-800'}`}>Multi-Head Self-Attn</text>
                  </g>

                  {/* Add & Norm 1 */}
                  <rect x="70" y="420" width="160" height="40" rx="8" fill="#fef08a" stroke="#facc15" strokeWidth="2" />
                  <text x="150" y="445" textAnchor="middle" className="text-xs font-bold fill-yellow-800">Add & Norm</text>
                  <path d="M 150 500 L 150 460" fill="none" stroke="#facc15" strokeWidth="2" className="flow-path" />
                  
                  {/* Residual Connection 1 */}
                  <path d="M 150 580 L 235 580 L 235 440 L 230 440" fill="none" stroke="#6b7280" strokeWidth="1.5" strokeDasharray="2 2" />

                  {/* Feed Forward Network */}
                  <g onClick={() => setSelectedBlock('Feed Forward Network')} className="cursor-pointer group">
                    <rect x="70" y="310" width="160" height="60" rx="12" fill={selectedBlock === 'Feed Forward Network' ? '#0f172a' : '#bfdbfe'} stroke="#93c5fd" strokeWidth="2" className="transition-all group-hover:stroke-blue-500" />
                    <text x="150" y="345" textAnchor="middle" className={`text-xs font-bold ${selectedBlock === 'Feed Forward Network' ? 'fill-white' : 'fill-blue-800'}`}>Feed Forward Network</text>
                  </g>
                  <path d="M 150 420 L 150 370" fill="none" stroke="#93c5fd" strokeWidth="2" className="flow-path" />

                  {/* Add & Norm 2 */}
                  <rect x="70" y="240" width="160" height="40" rx="8" fill="#fef08a" stroke="#facc15" strokeWidth="2" />
                  <text x="150" y="265" textAnchor="middle" className="text-xs font-bold fill-yellow-800">Add & Norm</text>
                  <path d="M 150 310 L 150 280" fill="none" stroke="#facc15" strokeWidth="2" className="flow-path" />
                  
                  {/* Residual Connection 2 */}
                  <path d="M 150 395 L 235 395 L 235 260 L 230 260" fill="none" stroke="#6b7280" strokeWidth="1.5" strokeDasharray="2 2" />
                </g>

                {/* 2. DECODER COLUMN (Right Column, X=450) */}
                <g transform="translate(100, 0)">
                  {/* Output Tokens */}
                  <rect x="300" y="780" width="160" height="40" rx="8" fill="#dcfce7" stroke="#86efac" strokeWidth="2" />
                  <text x="380" y="805" textAnchor="middle" className="text-xs font-bold fill-emerald-800">Outputs (shifted right)</text>
                  
                  {/* Token Embedding */}
                  <rect x="300" y="710" width="160" height="40" rx="8" fill="#fbcfe8" stroke="#f472b6" strokeWidth="2" />
                  <text x="380" y="735" textAnchor="middle" className="text-xs font-bold fill-pink-800">Token Embedding</text>
                  <path d="M 380 780 L 380 750" fill="none" stroke="#f472b6" strokeWidth="2" className="flow-path" />

                  {/* Positional Encoding */}
                  <circle cx="380" cy="640" r="18" fill="#fef08a" stroke="#facc15" strokeWidth="2" />
                  <text x="380" y="645" textAnchor="middle" className="text-sm font-black fill-yellow-800">+</text>
                  <path d="M 380 710 L 380 658" fill="none" stroke="#f472b6" strokeWidth="2" className="flow-path" />
                  
                  <path d="M 400 640 L 450 640" fill="none" stroke="#facc15" strokeWidth="1.5" strokeDasharray="2 2" />
                  <text x="475" y="643" textAnchor="middle" className="text-[9px] font-bold fill-slate-400">Positional Encoding</text>

                  {/* DECODER BOUNDARY */}
                  <rect x="280" y="190" width="200" height="410" rx="16" fill="none" stroke="#a855f7" strokeWidth="2" strokeDasharray="6 6" />
                  <text x="380" y="215" textAnchor="middle" className="text-xs font-black fill-purple-600 tracking-widest">DECODER (N_x layers)</text>
                  <path d="M 380 622 L 380 560" fill="none" stroke="#a855f7" strokeWidth="2" className="flow-path" />

                  {/* Masked Multi-Head Self Attention */}
                  <g onClick={() => setSelectedBlock('Masked Attention')} className="cursor-pointer group">
                    <rect x="300" y="500" width="160" height="60" rx="12" fill={selectedBlock === 'Masked Attention' ? '#0f172a' : '#ffe4e6'} stroke="#fecdd3" strokeWidth="2" className="transition-all group-hover:stroke-blue-500" />
                    <text x="380" y="535" textAnchor="middle" className={`text-xs font-bold ${selectedBlock === 'Masked Attention' ? 'fill-white' : 'fill-rose-800'}`}>Masked Self-Attn</text>
                  </g>

                  {/* Add & Norm 1 */}
                  <rect x="300" y="435" width="160" height="35" rx="8" fill="#fef08a" stroke="#facc15" strokeWidth="2" />
                  <text x="380" y="455" textAnchor="middle" className="text-xs font-bold fill-yellow-800">Add & Norm</text>
                  <path d="M 380 500 L 380 470" fill="none" stroke="#facc15" strokeWidth="2" className="flow-path" />
                  
                  {/* Residual Connection Decoder 1 */}
                  <path d="M 380 580 L 465 580 L 465 450 L 460 450" fill="none" stroke="#6b7280" strokeWidth="1.5" strokeDasharray="2 2" />

                  {/* Multi-Head Cross Attention */}
                  <g onClick={() => setSelectedBlock('Cross-Attention')} className="cursor-pointer group">
                    <rect x="300" y="330" width="160" height="60" rx="12" fill={selectedBlock === 'Cross-Attention' ? '#0f172a' : '#ffe4e6'} stroke="#fecdd3" strokeWidth="2" className="transition-all group-hover:stroke-blue-500" />
                    <text x="380" y="365" textAnchor="middle" className={`text-xs font-bold ${selectedBlock === 'Cross-Attention' ? 'fill-white' : 'fill-rose-800'}`}>Cross-Attention</text>
                  </g>
                  <path d="M 380 435 L 380 390" fill="none" stroke="#f472b6" strokeWidth="2" className="flow-path" />

                  {/* Add & Norm 2 */}
                  <rect x="300" y="260" width="160" height="35" rx="8" fill="#fef08a" stroke="#facc15" strokeWidth="2" />
                  <text x="380" y="280" textAnchor="middle" className="text-xs font-bold fill-yellow-800">Add & Norm</text>
                  <path d="M 380 330 L 380 295" fill="none" stroke="#facc15" strokeWidth="2" className="flow-path" />
                  
                  {/* Residual Connection Decoder 2 */}
                  <path d="M 380 410 L 465 410 L 465 275 L 460 275" fill="none" stroke="#6b7280" strokeWidth="1.5" strokeDasharray="2 2" />

                  {/* CROSS-ATTENTION CONNECTOR LINE FROM ENCODER */}
                  <path d="M 150 240 C 150 200, 200 350, 400 350" fill="none" stroke="#6366f1" strokeWidth="2.5" className="flow-path" />
                  <circle cx="150" cy="240" r="4" fill="#6366f1" />
                  <circle cx="400" cy="350" r="4" fill="#6366f1" />

                  {/* OUTPUTS OUT OF DECODER */}
                  {/* Linear */}
                  <rect x="300" y="110" width="160" height="40" rx="8" fill="#e0e7ff" stroke="#818cf8" strokeWidth="2" />
                  <text x="380" y="135" textAnchor="middle" className="text-xs font-bold fill-indigo-800">Linear Layer</text>
                  <path d="M 380 190 L 380 150" fill="none" stroke="#818cf8" strokeWidth="2" className="flow-path" />

                  {/* Softmax */}
                  <rect x="300" y="40" width="160" height="40" rx="8" fill="#dcfce7" stroke="#86efac" strokeWidth="2" />
                  <text x="380" y="65" textAnchor="middle" className="text-xs font-bold fill-emerald-800">Softmax Probabilities</text>
                  <path d="M 380 110 L 380 80" fill="none" stroke="#86efac" strokeWidth="2" className="flow-path" />
                </g>
              </svg>
            </div>

            {/* Block Inspector */}
            <div className="bg-slate-900 text-slate-200 p-8 rounded-3xl flex flex-col justify-between shadow-xl">
              <div>
                <span className="text-[10px] font-black tracking-widest text-blue-400 uppercase">
                  Block Inspector
                </span>
                <h3 className="text-xl font-bold text-white mt-2 mb-4">
                  {selectedBlock || 'Select a block'}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  {architectureBlocks.find((b) => b.name === selectedBlock)?.desc ||
                    'Click any block on the left diagram to view detailed structural explanations.'}
                </p>
              </div>

              {selectedBlock && (
                <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700/50">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                    Internal Math:
                  </span>
                  <div className="text-xs font-mono text-blue-300 bg-slate-950 p-3 rounded mt-2 overflow-x-auto">
                    {selectedBlock.includes('Attention')
                      ? 'Attention(Q,K,V) = softmax(QK^T / √d_k)V'
                      : 'FFN(x) = max(0, xW_1 + b_1)W_2 + b_2'}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'attention' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Input Controls */}
            <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm flex flex-col space-y-6">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-2">
                  Input Phrase
                </label>
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-700"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-2">
                  Select Active Head (Multi-Head Visuals)
                </label>
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: Math.min(headCount, 4) }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedHead(idx + 1)}
                      className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                        selectedHead === idx + 1
                          ? 'bg-indigo-600 text-white shadow-md'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      Head {idx + 1}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1">
                    Total Heads
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="8"
                    value={headCount}
                    onChange={(e) => setHeadCount(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-xs font-bold text-slate-600">{headCount} Heads</span>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1">
                    {"Dim ($d_k$)"}
                  </label>
                  <input
                    type="range"
                    min="16"
                    max="128"
                    step="16"
                    value={embedDim}
                    onChange={(e) => setEmbedDim(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-xs font-bold text-slate-600">{embedDim} dims</span>
                </div>
              </div>

              <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100 mt-auto">
                <span className="text-[10px] font-black text-indigo-700 uppercase tracking-wider block mb-1">
                  Scaled Dot-Product Formula:
                </span>
                <p className="text-xs font-mono text-indigo-600 leading-relaxed font-semibold">
                  {"Attention(Q,K,V) = Softmax(QK^T / √d_k)V"}
                </p>
                <span className="text-[9px] text-indigo-400 block mt-2 leading-relaxed">
                  {"Queries ($Q$) and Keys ($K$) produce matching scores. Scaled by dimension square root ($\\sqrt{d_k}$) to prevent vanishing gradients."}
                </span>
              </div>
            </div>

            {/* Matrix heatmap */}
            <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 p-8 shadow-sm overflow-x-auto flex flex-col justify-center">
              <span className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-6 text-center">
                🔥 Attention Weight Heatmap (Head {selectedHead})
              </span>
              <div className="flex flex-col items-center">
                <div className="flex">
                  <div className="w-16 h-16" />
                  {tokens.map((t) => (
                    <div
                      key={t.id}
                      className="w-16 h-12 flex items-center justify-center text-xs font-extrabold text-slate-700 border-b border-slate-100"
                    >
                      {t.text}
                    </div>
                  ))}
                </div>

                {tokens.map((rowToken, i) => (
                  <div key={rowToken.id} className="flex">
                    <div className="w-16 h-16 flex items-center justify-center text-xs font-extrabold text-slate-700 border-r border-slate-100 pr-2">
                      {rowToken.text}
                    </div>
                    {tokens.map((colToken, j) => {
                      const value = attentionMatrix[i]?.[j] || 0
                      const opacity = Math.min(value * 2.0, 1) 
                      return (
                        <div
                          key={colToken.id}
                          className="w-16 h-16 border border-slate-50 flex items-center justify-center text-[11px] font-bold transition-all duration-300 relative group cursor-crosshair"
                          style={{ 
                            backgroundColor: `rgba(79, 70, 229, ${opacity})`, 
                            color: opacity > 0.45 ? 'white' : '#1e293b' 
                          }}
                        >
                          {(value * 100).toFixed(0)}%
                          <div className="absolute hidden group-hover:block bg-slate-900 text-slate-100 text-[10px] p-2.5 rounded-xl shadow-2xl z-20 w-44 left-10 top-10 border border-slate-800">
                            <strong>{rowToken.text}</strong> correlates with <strong>{colToken.text}</strong> by {(value * 100).toFixed(1)}%
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center text-[10px] text-slate-400 font-bold tracking-wide uppercase">
                Hover over percentage matrix points to reveal semantic tie coefficients
              </div>
            </div>
          </div>
        )}

        {activeTab === 'positional' && (
          <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm flex flex-col space-y-6">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1">
                {"Positional Sine/Cosine Grid ($PE_{(pos, 2i)} = \\sin(pos/10000^{2i/d})$)"}
              </span>
              <p className="text-xs text-slate-400 mb-4">
                Each token is injected with a persistent geometric coordinate sequence to determine absolute ordering.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tokens.map((t) => {
                const pe = getPositionalEncoding(t.pos, 8)
                return (
                  <div key={t.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/50">
                    <span className="text-sm font-bold text-slate-800">
                      Token: <span className="text-blue-600 font-mono">{t.text}</span> (Pos: {t.pos})
                    </span>
                    <div className="flex gap-1 mt-3">
                      {pe.map((val, idx) => {
                        const height = Math.abs(val * 40)
                        return (
                          <div
                            key={idx}
                            className="flex-1 rounded-sm flex flex-col justify-end items-center"
                            style={{ height: '50px' }}
                          >
                            <div
                              className={`w-full rounded-xs ${val > 0 ? 'bg-indigo-500' : 'bg-rose-500'}`}
                              style={{ height: `${height}px` }}
                            />
                            <span className="text-[8px] text-slate-400 mt-1 font-mono">{val.toFixed(1)}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
