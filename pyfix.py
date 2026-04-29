import sys

path = 'src/pages/modules/TransformersModule.tsx'
with open(path, 'r', encoding='utf-8') as f:
    c = f.read()

# Add theory state
c = c.replace(
  "useState<'architecture' | 'attention' | 'positional'>('architecture')",
  "useState<'architecture' | 'attention' | 'positional' | 'theory'>('architecture')"
)

# Add theory button
btn_old = """            🌊 Positional Encoding
          </button>
        </section>"""
btn_new = """            🌊 Positional Encoding
          </button>
          <button
            onClick={() => setActiveTab('theory')}
            className={`pb-4 text-sm font-bold border-b-2 transition-all ${
              activeTab === 'theory'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            📚 Theory & Notes
          </button>
        </section>"""
c = c.replace(btn_old, btn_new)

# Split at Tab content
parts = c.split('{/* Tab content */}')
topHtml = parts[0]
rest = parts[1]

# Split at main end
parts2 = rest.split('</main>')
oldTabs = parts2[0]
bottomHtml = parts2[1]

# Extract visualFlow
vf_start = oldTabs.find('<div className="lg:col-span-2')
vf_end = oldTabs.find('{/* Block Inspector */}')
visualFlow = oldTabs[vf_start:vf_end].strip()

# Extract inspector
insp_start = oldTabs.find('<div className="bg-slate-900', vf_end)
insp_end = oldTabs.find('</div>\\n          </div>\\n        )}', insp_start)
if insp_end == -1: insp_end = oldTabs.find('</div>\n          </div>\n        )}', insp_start)
inspector = oldTabs[insp_start:insp_end].strip()

# Extract attention controls
att_start = oldTabs.find("{activeTab === 'attention' && (")
ac_start = oldTabs.find('<div className="bg-white', att_start)
ac_end = oldTabs.find('{/* Matrix heatmap */}', ac_start)
attentionControls = oldTabs[ac_start:ac_end].strip()

# Extract attention heatmap
hm_start = oldTabs.find('<div className="lg:col-span-2', ac_end)
hm_end = oldTabs.find('</div>\\n          </div>\\n        )}', hm_start)
if hm_end == -1: hm_end = oldTabs.find('</div>\n          </div>\n        )}', hm_start)
attentionHeatmap = oldTabs[hm_start:hm_end].strip()

# Extract positional
pos_start = oldTabs.find("{activeTab === 'positional' && (")
ps_start = oldTabs.find('<div className="bg-white', pos_start)
ps_end = oldTabs.find('</div>\\n        )}', ps_start)
if ps_end == -1: ps_end = oldTabs.find('</div>\n        )}', ps_start)
positional = oldTabs[ps_start:ps_end].strip()

newTabs = f"""
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-8">
            {{activeTab === 'architecture' && (
              {visualFlow}
            )}}

            {{activeTab === 'attention' && (
              <>
                {attentionControls}
                {attentionHeatmap}
              </>
            )}}

            {{activeTab === 'positional' && (
              {positional}
            )}}

            {{activeTab === 'theory' && (
              <div className="bg-white p-12 rounded-3xl border border-slate-100 shadow-sm min-h-[400px] flex items-center justify-center">
                <p className="text-slate-400 text-xl font-medium">Theory and Notes coming soon...</p>
              </div>
            )}}
          </div>

          <div className="lg:col-span-1">
            {inspector}
          </div>
        </div>
      """

finalContent = topHtml + '{/* Tab content */}' + newTabs + '</main>' + bottomHtml
with open(path, 'w', encoding='utf-8') as f:
    f.write(finalContent)

print('Done python script')
