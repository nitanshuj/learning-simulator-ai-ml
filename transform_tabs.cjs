const fs = require('fs');

const p = 'src/pages/modules/TransformersModule.tsx';
let content = fs.readFileSync(p, 'utf-8');

// Add theory state
content = content.replace(
  "useState<'architecture' | 'attention' | 'positional'>('architecture')",
  "useState<'architecture' | 'attention' | 'positional' | 'theory'>('architecture')"
);

// Add theory button
content = content.replace(
  `            🌊 Positional Encoding\n          </button>\n        </section>`,
  `            🌊 Positional Encoding\n          </button>\n          <button\n            onClick={() => setActiveTab('theory')}\n            className={\`pb-4 text-sm font-bold border-b-2 transition-all \${activeTab === 'theory' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'}\`}\n          >\n            📚 Theory & Notes\n          </button>\n        </section>`
);

// We need to extract the parts and rebuild the tabs.
const extractBlock = (startMarker, endStr) => {
  const start = content.indexOf(startMarker);
  if (start === -1) return '';
  const end = content.indexOf(endStr, start);
  return content.substring(start, end);
};

const visualFlowStr = extractBlock('{/* Visual Flow diagram */}', '{/* Block Inspector */}').replace('{/* Visual Flow diagram */}', '').trim();
// Extract the div that wraps it
let visualFlowInner = visualFlowStr.substring(visualFlowStr.indexOf('<div'), visualFlowStr.lastIndexOf('</div>') + 6);

const inspectorStr = extractBlock('{/* Block Inspector */}', '</div>\\n          </div>\\n        )}');
let inspectorInner = inspectorStr.substring(inspectorStr.indexOf('<div'), inspectorStr.lastIndexOf('</div>') + 6);

const attentionControlsStr = extractBlock('{/* Input Controls */}', '{/* Matrix heatmap */}').replace('{/* Input Controls */}', '').trim();
let attentionControlsInner = attentionControlsStr.substring(attentionControlsStr.indexOf('<div'), attentionControlsStr.lastIndexOf('</div>') + 6);

const attentionHeatmapStr = extractBlock('{/* Matrix heatmap */}', '</div>\\n          </div>\\n        )}');
let attentionHeatmapInner = attentionHeatmapStr.substring(attentionHeatmapStr.indexOf('<div'), attentionHeatmapStr.lastIndexOf('</div>') + 6);

const positionalStr = extractBlock('{activeTab === \\'positional\\' && (', '</div>\\n        )}');
let positionalInner = positionalStr.substring(positionalStr.indexOf('<div'), positionalStr.lastIndexOf('</div>') + 6);

const topHtml = content.substring(0, content.indexOf('{/* Tab content */}'));
const bottomHtml = content.substring(content.indexOf('</main>'));

const newTabContent = `        {/* Tab content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-8">
            {activeTab === 'architecture' && (
              \${visualFlowInner}
            )}

            {activeTab === 'attention' && (
              <>
                \${attentionControlsInner}
                \${attentionHeatmapInner}
              </>
            )}

            {activeTab === 'positional' && (
              \${positionalInner}
            )}

            {activeTab === 'theory' && (
              <div className="bg-white p-12 rounded-3xl border border-slate-100 shadow-sm min-h-[400px] flex items-center justify-center">
                <p className="text-slate-400 text-xl font-medium">Theory and Notes coming soon...</p>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            \${inspectorInner}
          </div>
        </div>
      `;

// Replace `\n` in strings, need to be careful with escaping. Wait, the template literal interpolates directly.
const finalContent = topHtml + newTabContent + bottomHtml;
fs.writeFileSync(p, finalContent);
console.log('Restructured TransformersModule.tsx successfully.');
