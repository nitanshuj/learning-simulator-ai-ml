const fs = require('fs');
const path = require('path');

const p = path.join(__dirname, 'src/pages/modules/RAGModule.tsx');
let content = fs.readFileSync(p, 'utf-8');

// Update state
content = content.replace(
  "const [activeTab, setActiveTab] = useState<'basic' | 'advanced'>('basic')",
  "const [activeTab, setActiveTab] = useState<'basic' | 'advanced' | 'theory'>('basic')"
);

// Add Tab Button
const tabButtonsStr = `          <button
            onClick={() => setActiveTab('advanced')}
            className={\`pb-4 text-sm font-bold border-b-2 transition-all \${
              activeTab === 'advanced'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }\`}
          >
            🚀 Advanced Production RAG
          </button>
        </section>`;

const newTabButtonsStr = `          <button
            onClick={() => setActiveTab('advanced')}
            className={\`pb-4 text-sm font-bold border-b-2 transition-all \${
              activeTab === 'advanced'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }\`}
          >
            🚀 Advanced Production RAG
          </button>
          <button
            onClick={() => setActiveTab('theory')}
            className={\`pb-4 text-sm font-bold border-b-2 transition-all \${
              activeTab === 'theory'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }\`}
          >
            📚 Theory & Notes
          </button>
        </section>`;

content = content.replace(tabButtonsStr, newTabButtonsStr);

// Conditionally wrap the body
const bodyStartStr = `        {/* CSS Animation definitions */}`;
const newBodyStartStr = `        {activeTab !== 'theory' && (
          <>
        {/* CSS Animation definitions */}`;

content = content.replace(bodyStartStr, newBodyStartStr);

const bodyEndStr = `          </div>
        </div>
      </main>

      <Footer />`;

const newBodyEndStr = `          </div>
        </div>
        </>
        )}

        {activeTab === 'theory' && (
          <div className="bg-white p-12 rounded-3xl border border-slate-100 shadow-sm min-h-[400px] flex items-center justify-center">
            <p className="text-slate-400 text-xl font-medium">Theory and Notes coming soon...</p>
          </div>
        )}
      </main>

      <Footer />`;

content = content.replace(bodyEndStr, newBodyEndStr);

fs.writeFileSync(p, content);
console.log('Updated RAGModule.tsx');
