const fs = require('fs');
const path = require('path');

const p = path.join(__dirname, 'src/pages/modules/TransformersModule.tsx');
let content = fs.readFileSync(p, 'utf-8');

// We want to replace the entire section below {/* Tab Controls */}
// with a consistent grid layout.

const newBody = `        {/* Tab content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Left Col */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {activeTab === 'architecture' && (
              <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm flex flex-col justify-center items-center relative overflow-hidden">
                <style>{\`
                  @keyframes dash {
                    to { stroke-dashoffset: -20; }
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
                \`}</style>
                <div className="w-full text-center text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center justify-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></span>
                  Vaswani Attention Pipeline Engine
                </div>
                {/* SVG START */}
` + 
// We will extract the SVG from the original file.
`                {/* SVG END */}
              </div>
            )}

            {activeTab === 'attention' && (
              <>
                {/* Input Controls */}
                <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm flex flex-col space-y-6">
                  {/* INPUT_CONTROLS_START */}
                  {/* INPUT_CONTROLS_END */}
                </div>
                {/* Matrix heatmap */}
                <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm overflow-x-auto flex flex-col justify-center">
                  {/* MATRIX_HEATMAP_START */}
                  {/* MATRIX_HEATMAP_END */}
                </div>
              </>
            )}

            {activeTab === 'positional' && (
              <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm flex flex-col space-y-6">
                {/* POSITIONAL_ENCODING_START */}
                {/* POSITIONAL_ENCODING_END */}
              </div>
            )}

            {activeTab === 'theory' && (
              <div className="bg-white p-12 rounded-3xl border border-slate-100 shadow-sm min-h-[400px] flex items-center justify-center">
                <p className="text-slate-400 text-xl font-medium">Theory and Notes coming soon...</p>
              </div>
            )}
          </div>

          {/* Block Inspector Right Col */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900 text-slate-200 p-8 rounded-3xl flex flex-col justify-between shadow-xl sticky top-28 h-[calc(100vh-140px)] max-h-[800px]">
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
        </div>
      </main>`;

// Now we need to extract the parts and build the final content.
const svgStartIdx = content.indexOf('<svg viewBox="0 0 700 850"');
const svgEndIdx = content.indexOf('</svg>', svgStartIdx) + 6;
const svgContent = content.substring(svgStartIdx, svgEndIdx);

const inputControlsStartIdx = content.indexOf('<div>\n                <label className="text-xs font-bold text-slate-500');
const inputControlsEndIdx = content.indexOf('</div>\n            </div>\n\n            {/* Matrix heatmap */}');
const inputControlsContent = content.substring(inputControlsStartIdx, inputControlsEndIdx);

const matrixHeatmapStartIdx = content.indexOf('<span className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-6 text-center">');
const matrixHeatmapEndIdx = content.indexOf('</div>\n            </div>\n          </div>\n        )}');
const matrixHeatmapContent = content.substring(matrixHeatmapStartIdx, matrixHeatmapEndIdx);

const positionalStartIdx = content.indexOf('<div>\n              <span className="text-xs font-bold text-slate-500');
const positionalEndIdx = content.indexOf('</div>\n          </div>\n        )}');
const positionalContent = content.substring(positionalStartIdx, positionalEndIdx);

let finalBody = newBody
  .replace('{/* SVG START */}\n{/* SVG END */}', svgContent)
  .replace('{/* INPUT_CONTROLS_START */}\n                  {/* INPUT_CONTROLS_END */}', inputControlsContent)
  .replace('{/* MATRIX_HEATMAP_START */}\n                  {/* MATRIX_HEATMAP_END */}', matrixHeatmapContent)
  .replace('{/* POSITIONAL_ENCODING_START */}\n                {/* POSITIONAL_ENCODING_END */}', positionalContent);

const topPart = content.substring(0, content.indexOf('{/* Tab content */}'));
const bottomPart = content.substring(content.indexOf('</main>'));

fs.writeFileSync(p, topPart + finalBody + '\n\n      ' + bottomPart);
console.log('Restructured TransformersModule.tsx');
