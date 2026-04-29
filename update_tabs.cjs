const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/pages/modules');
const files = fs.readdirSync(dir).filter(f => f.endsWith('Module.tsx') && f !== 'TransformersModule.tsx' && f !== 'RAGModule.tsx' && !f.includes('.test.'));

let successCount = 0;
let failCount = 0;

files.forEach(file => {
  const p = path.join(dir, file);
  let content = fs.readFileSync(p, 'utf-8');

  // Insert state
  if (!content.includes('activeTab')) {
    content = content.replace(/(export const \w+:\s*React\.FC(\<.*?\>)?\s*=\s*\([^)]*\)\s*=>\s*\{)/, "$1\n  const [activeTab, setActiveTab] = React.useState<'visual' | 'theory'>('visual');\n");
  }

  // Find where to insert the Tabs UI.
  // After <BackButton />
  const backButtonMatch = content.match(/<BackButton\s*\/>\s*/);
  if (backButtonMatch && !content.includes('activeTab === \'visual\'')) {
    const tabsUI = `
          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-8 mt-4">
            <button 
              className={\`pb-4 px-6 font-medium text-lg border-b-2 transition-colors \${activeTab === 'visual' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}\`}
              onClick={() => setActiveTab('visual')}
            >
              Visual Implementation
            </button>
            <button 
              className={\`pb-4 px-6 font-medium text-lg border-b-2 transition-colors \${activeTab === 'theory' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}\`}
              onClick={() => setActiveTab('theory')}
            >
              Theory & Notes
            </button>
          </div>

          <div className={activeTab === 'visual' ? 'block space-y-8' : 'hidden'}>
`;
    content = content.replace(backButtonMatch[0], backButtonMatch[0] + tabsUI);

    // Replace the ending
    const endMatch = content.match(/(\s*)(<\/(?:main|div)>\s*<\/div>\s*<Footer \/>\s*<\/div>\s*\)\s*\})/);
    if (endMatch) {
       const replacement = `
          </div>
          
          <div className={activeTab === 'theory' ? 'block' : 'hidden'}>
            <div className="bg-white p-12 rounded-3xl border border-gray-200 shadow-sm min-h-[400px] flex items-center justify-center">
              <p className="text-gray-400 text-xl font-medium">Theory and Notes coming soon...</p>
            </div>
          </div>
${endMatch[1]}${endMatch[2]}`;
       content = content.replace(endMatch[0], replacement);
       fs.writeFileSync(p, content);
       console.log('Updated ' + file);
       successCount++;
    } else {
       console.log('Failed to find ending in ' + file);
       failCount++;
    }
  } else {
    console.log('Already updated or no BackButton: ' + file);
  }
});

console.log(`Success: ${successCount}, Failed: ${failCount}`);
