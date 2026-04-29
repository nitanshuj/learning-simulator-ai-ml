const fs = require('fs');

const p = 'src/pages/modules/TransformersModule.tsx';
let c = fs.readFileSync(p, 'utf-8');

// Add theory state
c = c.replace(
  "useState<'architecture' | 'attention' | 'positional'>('architecture')",
  "useState<'architecture' | 'attention' | 'positional' | 'theory'>('architecture')"
);

// Add theory button
c = c.replace(
  `            🌊 Positional Encoding\n          </button>\n        </section>`,
  `            🌊 Positional Encoding\n          </button>\n          <button\n            onClick={() => setActiveTab('theory')}\n            className={\`pb-4 text-sm font-bold border-b-2 transition-all \${activeTab === 'theory' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'}\`}\n          >\n            📚 Theory & Notes\n          </button>\n        </section>`
);

// We replace the layout.
// Find `{/* Tab content */}` and everything below it until `</main>`
const tabContentStart = c.indexOf('{/* Tab content */}');
const mainEnd = c.indexOf('</main>');

// We already know the exact structure.
const oldTabs = c.substring(tabContentStart, mainEnd);

// Extract parts
const flowIdx1 = oldTabs.indexOf('<div className="lg:col-span-2');
const flowIdx2 = oldTabs.indexOf('{/* Block Inspector */}');
const visualFlow = oldTabs.substring(flowIdx1, flowIdx2).trim();

const inspIdx1 = oldTabs.indexOf('<div className="bg-slate-900', flowIdx2);
const inspIdx2 = oldTabs.indexOf('</div>\n          </div>\n        )}', inspIdx1);
const inspector = oldTabs.substring(inspIdx1, inspIdx2).trim();

const attStart = oldTabs.indexOf('{activeTab === \'attention\' && (');
const ctrlIdx1 = oldTabs.indexOf('<div className="bg-white', attStart);
const hmIdx = oldTabs.indexOf('{/* Matrix heatmap */}', ctrlIdx1);
const attentionControls = oldTabs.substring(ctrlIdx1, hmIdx).trim();

const hmIdx1 = oldTabs.indexOf('<div className="lg:col-span-2', hmIdx);
const hmIdx2 = oldTabs.indexOf('</div>\n          </div>\n        )}', hmIdx1);
const attentionHeatmap = oldTabs.substring(hmIdx1, hmIdx2).trim();

const posStart = oldTabs.indexOf('{activeTab === \'positional\' && (');
const posIdx1 = oldTabs.indexOf('<div className="bg-white', posStart);
const posIdx2 = oldTabs.indexOf('</div>\n        )}', posIdx1);
const positional = oldTabs.substring(posIdx1, posIdx2).trim();

const newTabs = `{/* Tab content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-8">
            {activeTab === 'architecture' && (
              \${visualFlow}
            )}

            {activeTab === 'attention' && (
              <>
                \${attentionControls}
                \${attentionHeatmap}
              </>
            )}

            {activeTab === 'positional' && (
              \${positional}
            )}

            {activeTab === 'theory' && (
              <div className="bg-white p-12 rounded-3xl border border-slate-100 shadow-sm min-h-[400px] flex items-center justify-center">
                <p className="text-slate-400 text-xl font-medium">Theory and Notes coming soon...</p>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            \${inspector}
          </div>
        </div>
      `;

c = c.substring(0, tabContentStart) + newTabs + c.substring(mainEnd);
fs.writeFileSync(p, c);
console.log('Done TransformersModule');
