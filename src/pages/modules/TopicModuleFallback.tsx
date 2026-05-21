import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Navbar, Footer, BackButton, TopicHeader, SimulatorShell, NextTopicBar } from '@/components'
import { models } from '@/data/models'
import { getTrackById } from '@/data/tracks'
import { learningPaths } from '@/data/learningPaths'

interface SimulatorConfig {
  title: string
  situation: string
  userGoal: string
  coreQuestion: string
  challengeTarget: string
  challengeInstructions: string
  controls: Array<{
    id: string
    label: string
    min: number
    max: number
    step: number
    defaultValue: number
    options?: string[]
  }>
  guidedSteps: Array<{
    step: number
    text: string
    buttonText: string
    action: (setVal: (id: string, val: any) => void) => void
  }>
  compute: (vals: Record<string, number>) => {
    metrics: Array<{ label: string; value: string; color?: string }>
    explanation: string[]
    challengeSuccess: boolean
    challengeCurrent: string
    challengeScore: number
    chart: React.ReactNode
  }
}

export const TopicModuleFallback: React.FC = () => {
  const { topicId } = useParams<{ topicId: string }>()
  const topic = models.find((m) => m.id === topicId)

  const [mode, setMode] = useState<'Guided' | 'Explore' | 'Challenge'>('Guided')
  const [controls, setControls] = useState<Record<string, number>>({})
  const [guidedStep, setGuidedStep] = useState(1)

  // Dictionary of dynamic scenario configurations
  const SIMULATOR_CONFIGS: Record<string, SimulatorConfig> = {
    'data-cleaning': {
      title: 'Data Quality Cleaning Simulator',
      situation: 'You are preprocessing a user clickstream dataset containing duplicate purchases and extreme outlier quantities (e.g. 10,000 units in 1 second). Uncleaned noise is degrading classifier performance.',
      userGoal: 'Set filters to achieve clean data accuracy >= 90% while retaining >= 75% of the original sample size.',
      coreQuestion: 'How does outlier clipping threshold affect dataset size and downstream accuracy?',
      challengeTarget: 'Accuracy >= 90% & Size >= 75%',
      challengeInstructions: 'Adjust the IQR Outlier Threshold and Duplicate strategy to filter noise without destroying good records.',
      controls: [
        { id: 'iqr', label: 'Outlier Cutoff (IQR Multiplier)', min: 1.0, max: 3.5, step: 0.1, defaultValue: 3.0 },
        { id: 'duplicates', label: 'Duplicate Click Strategy (0=Keep, 1=Drop)', min: 0, max: 1, step: 1, defaultValue: 0 }
      ],
      guidedSteps: [
        {
          step: 1,
          text: '👋 Step 1: Currently, duplicate clicks are inflating metrics. Set Duplicate Strategy to 1 to drop duplicates.',
          buttonText: 'Drop Duplicates',
          action: (setVal) => setVal('duplicates', 1)
        },
        {
          step: 2,
          text: '👍 Step 2: Outlier threshold is too loose, leaving fake data. Tighten Outlier Cutoff to 1.5 IQR.',
          buttonText: 'Set Cutoff to 1.5 IQR',
          action: (setVal) => setVal('iqr', 1.5)
        }
      ],
      compute: (vals) => {
        const iqr = vals['iqr'] ?? 3.0
        const dups = vals['duplicates'] ?? 0
        
        const mockRows = [
          { id: 1, user: 'Alice', item: 'Laptop', qty: 1, price: 1200, isDuplicate: false, isOutlierQty: false },
          { id: 2, user: 'Alice', item: 'Laptop', qty: 1, price: 1200, isDuplicate: true, isOutlierQty: false },
          { id: 3, user: 'Bob', item: 'Mouse', qty: 2, price: 40, isDuplicate: false, isOutlierQty: false },
          { id: 4, user: 'Charlie', item: 'Keyboard', qty: 150, price: 80, isDuplicate: false, isOutlierQty: true },
          { id: 5, user: 'Dave', item: 'Monitor', qty: 1, price: 350, isDuplicate: false, isOutlierQty: false },
          { id: 6, user: 'Eve', item: 'GPU Block', qty: 1, price: 1400, isDuplicate: false, isOutlierQty: false },
          { id: 7, user: 'Frank', item: 'USB Cable', qty: 1, price: 15, isDuplicate: false, isOutlierQty: false },
          { id: 8, user: 'Grace', item: 'Desk Lamp', qty: 1, price: 45, isDuplicate: false, isOutlierQty: false },
          { id: 9, user: 'Henry', item: 'Headphones', qty: 1, price: 180, isDuplicate: false, isOutlierQty: false },
          { id: 10, user: 'Ivy', item: 'Webcam', qty: 1, price: 90, isDuplicate: false, isOutlierQty: false },
        ]

        const isDupFiltered = dups === 1
        const isOutlierFiltered = iqr < 2.5
        
        let activeCount = 10
        if (isDupFiltered) activeCount -= 1
        if (isOutlierFiltered) activeCount -= 1
        
        const size = activeCount * 10
        
        let accuracy = 72
        if (isDupFiltered) accuracy += 13
        if (isOutlierFiltered) accuracy += 7

        const success = accuracy >= 90 && size >= 75
        return {
          metrics: [
            { label: 'Clean Dataset Size', value: `${size}%`, color: size >= 75 ? 'text-indigo-600' : 'text-rose-600' },
            { label: 'Model Accuracy', value: `${accuracy}%`, color: accuracy >= 90 ? 'text-emerald-600' : 'text-slate-800' },
            { label: 'Clean Rows Count', value: `${activeCount} / 10` }
          ],
          explanation: [
            '**IQR Multiplier:** Lower cutoffs filter more records as outliers. Setting it below 2.5 clips the outlier keyboard purchase of 150 units.',
            '**Duplicates:** Toggling to drop duplicates removes Alice\'s duplicate laptop purchase, correcting parameter estimation bias.'
          ],
          challengeSuccess: success,
          challengeCurrent: `Accuracy: ${accuracy}% & Size: ${size}%`,
          challengeScore: success ? 95 : 55,
          chart: (
            <div className="space-y-4 w-full">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Live Clickstream Database Preview</span>
              <div className="overflow-x-auto border border-slate-100 rounded-2xl shadow-sm">
                <table className="min-w-full text-xs text-left text-slate-600 bg-white">
                  <thead>
                    <tr className="bg-slate-50 text-slate-400 border-b border-slate-100 text-[10px] font-black uppercase tracking-wider">
                      <th className="p-3">User</th>
                      <th className="p-3">Item</th>
                      <th className="p-3">Qty</th>
                      <th className="p-3">Price</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 font-semibold">
                    {mockRows.map(row => {
                      const isRowRemoved = (row.isDuplicate && isDupFiltered) || (row.isOutlierQty && isOutlierFiltered)
                      
                      let statusBadge = <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md text-[9px] uppercase font-black">Clean</span>
                      if (row.isDuplicate) {
                        statusBadge = isDupFiltered 
                          ? <span className="text-slate-400 bg-slate-100 line-through px-2 py-0.5 rounded-md text-[9px] uppercase font-black">Dropped Duplicate</span>
                          : <span className="text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md text-[9px] uppercase font-black">Duplicate Click</span>
                      } else if (row.isOutlierQty) {
                        statusBadge = isOutlierFiltered
                          ? <span className="text-rose-400 bg-rose-50 line-through px-2 py-0.5 rounded-md text-[9px] uppercase font-black">Dropped Outlier</span>
                          : <span className="text-red-600 bg-red-50 px-2 py-0.5 rounded-md text-[9px] uppercase font-black">Outlier Qty</span>
                      }

                      return (
                        <tr key={row.id} className={`transition-all duration-300 ${isRowRemoved ? 'bg-slate-50/50 opacity-40' : 'hover:bg-slate-50/30'}`}>
                          <td className="p-3">{row.user}</td>
                          <td className="p-3">{row.item}</td>
                          <td className={`p-3 ${row.isOutlierQty && !isOutlierFiltered ? 'text-red-600 font-bold' : ''}`}>{row.qty}</td>
                          <td className="p-3">${row.price}</td>
                          <td className="p-3">{statusBadge}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )
        }
      }
    },
    'encoding': {
      title: 'Categorical Encoding Dimensionality Simulator',
      situation: 'You are encoding a customer profile category "User Country" (120 unique countries) to predict conversions. One-hot encoding creates sparse dimensions that overfit, while label encoding distorts distances.',
      userGoal: 'Choose the encoding strategy to maximize downstream F1 Score >= 88% while keeping feature count <= 5.',
      coreQuestion: 'How does high cardinality categories explode dimensions during One-Hot encoding?',
      challengeTarget: 'F1 Score >= 88% & Dimensions <= 5',
      challengeInstructions: 'Adjust the strategy and cardinality level to optimize representation quality.',
      controls: [
        { id: 'strategy', label: 'Strategy (0=Label, 1=One-Hot, 2=Target)', min: 0, max: 2, step: 1, defaultValue: 1 },
        { id: 'cardinality', label: 'Category Cardinality (Unique levels)', min: 5, max: 120, step: 5, defaultValue: 50 }
      ],
      guidedSteps: [
        {
          step: 1,
          text: '👋 Step 1: One-hot encoding generates 1 feature per category level. Change encoding strategy to Target Encoding (2).',
          buttonText: 'Set Target Encoding',
          action: (setVal) => setVal('strategy', 2)
        }
      ],
      compute: (vals) => {
        const strat = vals['strategy'] ?? 1
        const card = vals['cardinality'] ?? 50
        
        let dims = 1
        if (strat === 1) dims = card
        
        let f1 = 70
        if (strat === 0) f1 = 65 // label distortion
        else if (strat === 1) f1 = card > 30 ? 78 : 86 // sparseness penalty
        else if (strat === 2) f1 = 89 // target encoding works well
        
        const success = f1 >= 88 && dims <= 5
        return {
          metrics: [
            { label: 'Feature Dimensions', value: `${dims}`, color: dims <= 5 ? 'text-indigo-600' : 'text-rose-600' },
            { label: 'F1 Score Output', value: `${f1}%`, color: f1 >= 88 ? 'text-emerald-600' : 'text-slate-800' },
            { label: 'Information Loss', value: strat === 0 ? 'High' : 'Low' }
          ],
          explanation: [
            '**One-Hot Encoding:** Creates N binary columns for N categories. Ideal for low cardinality, but causes data sparsity at high cardinality.',
            '**Target Encoding:** Calculates mean target value per category. Keeps feature dimension at 1, preserving model efficiency.'
          ],
          challengeSuccess: success,
          challengeCurrent: `F1: ${f1}% & Dims: ${dims}`,
          challengeScore: success ? 98 : 50,
          chart: (
            <div className="space-y-3 w-full">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Feature Cardinality Expansion</span>
              <div className="h-32 bg-slate-50 border border-slate-100 rounded-2xl flex items-end justify-around p-4 relative">
                <div className="w-16 bg-slate-900 rounded-t-lg transition-all" style={{ height: `${Math.min(100, dims * 0.8)}%` }} />
                <div className="w-16 bg-indigo-500 rounded-t-lg transition-all" style={{ height: `${f1}%` }} />
              </div>
              <div className="flex justify-around text-[9px] font-black text-slate-400 uppercase text-center">
                <span>Dims count</span>
                <span>F1 Accuracy</span>
              </div>
            </div>
          )
        }
      }
    },
    'feature-scaling': {
      title: 'Feature Scaling & Convergence Simulator',
      situation: 'You are training a distance-based classifier (like KNN or SVM) where Age ranges from 18-90, but Annual Income ranges from $10k-$500k. The model ignores Age because of scale differences.',
      userGoal: 'Scale the features to achieve accuracy >= 92% and model convergence steps <= 20.',
      coreQuestion: 'How does normalization prevent gradients from oscillating?',
      challengeTarget: 'Accuracy >= 92% & Steps <= 20',
      challengeInstructions: 'Adjust the scaling method to Z-Score Standardization or Min-Max normalization.',
      controls: [
        { id: 'scaling', label: 'Scaling Method (0=None, 1=Min-Max, 2=Z-Score)', min: 0, max: 2, step: 1, defaultValue: 0 },
        { id: 'outliers', label: 'Outlier Ratio', min: 0.0, max: 0.2, step: 0.05, defaultValue: 0.05 }
      ],
      guidedSteps: [
        {
          step: 1,
          text: '👋 Step 1: Standardize features to balance scales. Set Scaling Method to Z-Score Standardization (2).',
          buttonText: 'Standardize Features',
          action: (setVal) => setVal('scaling', 2)
        }
      ],
      compute: (vals) => {
        const scaling = vals['scaling'] ?? 0
        const outliers = vals['outliers'] ?? 0.05
        
        let acc = 62
        let steps = 180
        if (scaling === 1) {
          acc = Math.round(91 - outliers * 40) // minmax affected by outliers
          steps = 15
        } else if (scaling === 2) {
          acc = 94
          steps = 10
        }
        
        const success = acc >= 92 && steps <= 20
        return {
          metrics: [
            { label: 'Downstream Accuracy', value: `${acc}%`, color: acc >= 92 ? 'text-emerald-600' : 'text-rose-600' },
            { label: 'Convergence Iterations', value: `${steps} steps`, color: steps <= 20 ? 'text-indigo-600' : 'text-slate-800' }
          ],
          explanation: [
            '**Min-Max Scaling:** Scales inputs to [0,1]. Outliers pull normal coordinates tight, reducing density.',
            '**Z-Score Standardisation:** Centers values around 0 with standard deviation 1, which handles outliers robustly.'
          ],
          challengeSuccess: success,
          challengeCurrent: `Acc: ${acc}% & Steps: ${steps}`,
          challengeScore: success ? 96 : 40,
          chart: (
            <div className="space-y-3 w-full">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Gradient Bounds</span>
              <div className="h-32 bg-slate-50 border border-slate-100 rounded-2xl flex items-end justify-center p-4 gap-6 relative">
                <div className="w-16 bg-slate-900 rounded-t-lg transition-all" style={{ height: `${(steps/180)*100}%` }} />
                <div className="w-16 bg-indigo-500 rounded-t-lg transition-all" style={{ height: `${acc}%` }} />
              </div>
              <div className="flex justify-center gap-12 text-[9px] font-black text-slate-400 uppercase text-center">
                <span>Optimizer Steps</span>
                <span>Accuracy</span>
              </div>
            </div>
          )
        }
      }
    },
    'train-test-split': {
      title: 'Stratified Dataset Splitting Playground',
      situation: 'You are splitting a rare-event customer fraud dataset (1.5% positive class rate). A standard random split leaves the test set without any fraud cases, making evaluation useless.',
      userGoal: 'Set up split ratios to guarantee Test set fraud representation within +/- 0.2% of true rate.',
      coreQuestion: 'Why does stratification prevent target shift between training and test distributions?',
      challengeTarget: 'Fraud representation within +/- 0.2%',
      challengeInstructions: 'Enable Stratified splitting and set appropriate split ratios.',
      controls: [
        { id: 'ratio', label: 'Test Split Ratio', min: 0.1, max: 0.5, step: 0.05, defaultValue: 0.3 },
        { id: 'stratified', label: 'Stratify Splits (0=Off, 1=On)', min: 0, max: 1, step: 1, defaultValue: 0 }
      ],
      guidedSteps: [
        {
          step: 1,
          text: '👋 Step 1: Turn Stratification ON (1) to enforce balanced class proportions in both sets.',
          buttonText: 'Turn Stratify On',
          action: (setVal) => setVal('stratified', 1)
        }
      ],
      compute: (vals) => {
        const ratio = vals['ratio'] ?? 0.3
        const strat = vals['stratified'] ?? 0
        
        const trueRate = 1.50
        const testRate = strat === 1 ? 1.50 : Number((0.4 + Math.sin(ratio * 12) * 1.6).toFixed(2))
        const delta = Math.abs(testRate - trueRate)
        const success = delta <= 0.2
        
        return {
          metrics: [
            { label: 'Train Fraud Rate', value: '1.5%', color: 'text-indigo-600' },
            { label: 'Test Fraud Rate', value: `${testRate}%`, color: success ? 'text-emerald-600' : 'text-rose-600' },
            { label: 'Rate Shift Delta', value: `${delta.toFixed(2)}%` }
          ],
          explanation: [
            '**Stratification:** Forces the splitter to maintain minority class ratios (e.g. fraud, disease labels) identical across train and test partitions.'
          ],
          challengeSuccess: success,
          challengeCurrent: `Delta: ${delta.toFixed(2)}%`,
          challengeScore: success ? 97 : 45,
          chart: (
            <div className="space-y-3 w-full">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Partition Target Balance</span>
              <div className="h-32 bg-slate-50 border border-slate-100 rounded-2xl flex items-end justify-center p-4 gap-8">
                <div className="w-16 bg-slate-800 rounded-t-lg transition-all text-center text-white text-[10px] py-1" style={{ height: '70%' }}>Train (1.5%)</div>
                <div className="w-16 bg-indigo-500 rounded-t-lg transition-all text-center text-white text-[10px] py-1" style={{ height: `${(testRate/1.5)*70}%` }}>Test ({testRate}%)</div>
              </div>
            </div>
          )
        }
      }
    },
    'cross-validation': {
      title: 'K-Fold Cross-Validation Sandbox',
      situation: 'Your model performs exceptionally well on your single validation set, but scores terribly in production. You suspect validation data leakage or a lucky split.',
      userGoal: 'Configure K-Folds to get a validation variance (SD) <= 0.02 and average test score >= 88%.',
      coreQuestion: 'How does K-Fold decrease evaluation variance?',
      challengeTarget: 'SD <= 0.02 & Avg Score >= 88%',
      challengeInstructions: 'Adjust the fold count K and complexity controls.',
      controls: [
        { id: 'folds', label: 'Fold Count K', min: 2, max: 10, step: 1, defaultValue: 3 },
        { id: 'complexity', label: 'Model Complexity', min: 1, max: 5, step: 1, defaultValue: 4 }
      ],
      guidedSteps: [
        {
          step: 1,
          text: '👋 Step 1: Increase Fold Count K to 10 to averaging out split bias.',
          buttonText: 'Set K=10 Folds',
          action: (setVal) => setVal('folds', 10)
        },
        {
          step: 2,
          text: '👍 Step 2: Reduce Model Complexity to 2 to generalize better across folds.',
          buttonText: 'Reduce Complexity',
          action: (setVal) => setVal('complexity', 2)
        }
      ],
      compute: (vals) => {
        const folds = vals['folds'] ?? 3
        const comp = vals['complexity'] ?? 4
        
        const avg = Math.round(91 - (comp * 1.5) + (folds * 0.5))
        const sd = Number((0.15 / folds + (comp * 0.01)).toFixed(3))
        
        const success = sd <= 0.02 && avg >= 88
        return {
          metrics: [
            { label: 'CV Avg Accuracy', value: `${avg}%`, color: avg >= 88 ? 'text-emerald-600' : 'text-slate-800' },
            { label: 'Standard Deviation (SD)', value: `${sd}`, color: sd <= 0.02 ? 'text-indigo-600' : 'text-rose-600' }
          ],
          explanation: [
            '**K-Fold Validation:** Divides the dataset into K segments. It trains on K-1 and tests on the remaining slice. Averaging K folds cancels split biases.'
          ],
          challengeSuccess: success,
          challengeCurrent: `SD: ${sd} & Accuracy: ${avg}%`,
          challengeScore: success ? 99 : 60,
          chart: (
            <div className="space-y-2 w-full">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">CV Splits Fold Grid</span>
              <div className="grid grid-cols-5 gap-1.5 p-3 bg-slate-50 border border-slate-100 rounded-xl">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-8 rounded flex items-center justify-center text-[10px] font-bold text-white transition-all ${
                      i < folds ? 'bg-indigo-600' : 'bg-slate-200'
                    }`}
                  >
                    {i < folds ? `K-${i+1}` : 'Idle'}
                  </div>
                ))}
              </div>
            </div>
          )
        }
      }
    },
    'threshold-tuning': {
      title: 'Cost-Sensitive Classification Threshold Tuner',
      situation: 'You are deploying a transaction fraud model. Adjust the probability threshold to balance false alarms and missed frauds.',
      userGoal: 'Tune probability threshold to get F1 Score >= 85% while keeping penalty cost <= $2,000.',
      coreQuestion: 'How does probability threshold shift precision/recall tradeoffs?',
      challengeTarget: 'F1 >= 85% & Penalty <= $2k',
      challengeInstructions: 'Shift the classification decision threshold slider.',
      controls: [
        { id: 'thresh', label: 'Decision Threshold', min: 0.1, max: 0.9, step: 0.05, defaultValue: 0.5 },
        { id: 'fraud_cost', label: 'Cost of Missed Fraud', min: 100, max: 1000, step: 50, defaultValue: 500 }
      ],
      guidedSteps: [
        {
          step: 1,
          text: '👋 Step 1: Standard threshold of 0.50 misses several frauds. Lower the threshold to 0.25.',
          buttonText: 'Set Threshold to 0.25',
          action: (setVal) => setVal('thresh', 0.25)
        }
      ],
      compute: (vals) => {
        const thresh = vals['thresh'] ?? 0.5
        const fCost = vals['fraud_cost'] ?? 500
        
        const recall = Math.max(0.1, 1 - thresh)
        const precision = Math.max(0.1, thresh * 1.1)
        const f1 = Math.round((2 * precision * recall) / (precision + recall) * 100)
        
        const missedFrauds = Math.round(15 * thresh)
        const falseAlarms = Math.round(40 * (1 - thresh))
        const cost = Math.round(missedFrauds * fCost + falseAlarms * 40)
        
        const success = f1 >= 85 && cost <= 2000
        return {
          metrics: [
            { label: 'F1 Classifier Score', value: `${f1}%`, color: f1 >= 85 ? 'text-emerald-600' : 'text-slate-800' },
            { label: 'Financial Cost Penalty', value: `$${cost}`, color: cost <= 2000 ? 'text-indigo-600' : 'text-rose-600' }
          ],
          explanation: [
            '**Threshold:** Shifting the probability threshold changes the classification boundary. Lower thresholds increase sensitivity (recall), while higher thresholds decrease false alerts (precision).'
          ],
          challengeSuccess: success,
          challengeCurrent: `F1: ${f1}% & Cost: $${cost}`,
          challengeScore: success ? 94 : 50,
          chart: (
            <div className="space-y-3 w-full">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Cost Curves</span>
              <div className="h-32 bg-slate-50 border border-slate-100 rounded-2xl flex items-end justify-center p-4 gap-6">
                <div className="w-16 bg-slate-900 rounded-t-lg" style={{ height: `${(cost/4000)*100}%` }} />
                <div className="w-16 bg-indigo-500 rounded-t-lg" style={{ height: `${f1}%` }} />
              </div>
              <div className="flex justify-center gap-12 text-[9px] font-black text-slate-400 uppercase text-center">
                <span>Penalty</span>
                <span>F1 Score</span>
              </div>
            </div>
          )
        }
      }
    },
    'tokenization': {
      title: 'LLM Tokenization Boundaries Playground',
      situation: 'You are configuring a subword Byte-Pair Encoding (BPE) tokenizer for a LLM chat app. Small vocabs cause long tokens sequences (slow inference); massive vocabs waste embedding memory space.',
      userGoal: 'Configure vocab size to get sequence compression ratio >= 2.2x and OOV rate <= 1%.',
      coreQuestion: 'How does vocabulary size determine average token sequence length?',
      challengeTarget: 'Compression >= 2.2x & OOV <= 1%',
      challengeInstructions: 'Adjust the Vocabulary Size and Text complexity sliders.',
      controls: [
        { id: 'vocab', label: 'Vocabulary Size (Tokens)', min: 1000, max: 40000, step: 1000, defaultValue: 5000 },
        { id: 'text_length', label: 'Sequence Character Count', min: 100, max: 1000, step: 50, defaultValue: 500 }
      ],
      guidedSteps: [
        {
          step: 1,
          text: '👋 Step 1: Increase vocab size to 25,000 to compress subwords into full word tokens.',
          buttonText: 'Set Vocab to 25k',
          action: (setVal) => setVal('vocab', 25000)
        }
      ],
      compute: (vals) => {
        const vocab = vals['vocab'] ?? 5000
        const ratio = Number((1.2 + (vocab / 18000)).toFixed(2))
        const oov = Math.max(0.1, Number((20 / (vocab / 1000)).toFixed(1)))
        
        const success = ratio >= 2.2 && oov <= 1
        return {
          metrics: [
            { label: 'Token Compression', value: `${ratio}x`, color: ratio >= 2.2 ? 'text-emerald-600' : 'text-rose-600' },
            { label: 'Out of Vocab (OOV) Rate', value: `${oov}%`, color: oov <= 1 ? 'text-indigo-600' : 'text-slate-800' }
          ],
          explanation: [
            '**Vocabulary Size:** Determines the dictionary size. High vocabularies support longer subwords, compressing texts into fewer total tokens.',
            '**OOV rate:** Proportion of inputs that must be split into raw character bytes because they are not present in the subword list.'
          ],
          challengeSuccess: success,
          challengeCurrent: `Compression: ${ratio}x & OOV: ${oov}%`,
          challengeScore: success ? 95 : 50,
          chart: (
            <div className="space-y-3 w-full">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Tokenized Sentence View</span>
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-mono flex flex-wrap gap-1 leading-loose">
                <span className="bg-indigo-100 text-indigo-800 px-1 rounded">Deep</span>
                <span className="bg-indigo-100 text-indigo-800 px-1 rounded">learn</span>
                <span className="bg-indigo-100 text-indigo-800 px-1 rounded">ing</span>
                <span className="bg-slate-200 text-slate-700 px-1 rounded">to</span>
                <span className="bg-emerald-100 text-emerald-800 px-1 rounded">ken</span>
                <span className="bg-emerald-100 text-emerald-800 px-1 rounded">izer</span>
              </div>
            </div>
          )
        }
      }
    },
    'embeddings': {
      title: 'Word Embedding Space Dimensions Simulator',
      situation: 'You are embedding synonyms into a continuous vector space. Low embedding dimensions fail to capture complex semantic context; large vectors cause slow cosine distance checks.',
      userGoal: 'Balance parameters to get Semantic Accuracy >= 86% and Cosine Latency <= 45ms.',
      coreQuestion: 'How does embedding dimension size control vector representation details?',
      challengeTarget: 'Accuracy >= 86% & Latency <= 45ms',
      challengeInstructions: 'Adjust the embedding dimensions and lookup vocabulary.',
      controls: [
        { id: 'dims', label: 'Vector Dimensions', min: 16, max: 1024, step: 16, defaultValue: 128 },
        { id: 'vocab_size', label: 'Index Search Space', min: 500, max: 5000, step: 500, defaultValue: 1000 }
      ],
      guidedSteps: [
        {
          step: 1,
          text: '👋 Step 1: Set Vector Dimensions to 256 to get high semantics while staying under late limit.',
          buttonText: 'Set Dims to 256',
          action: (setVal) => setVal('dims', 256)
        }
      ],
      compute: (vals) => {
        const dims = vals['dims'] ?? 128
        const space = vals['vocab_size'] ?? 1000
        
        const accuracy = Math.min(99, Math.round(55 + Math.log2(dims) * 5.2))
        const latency = Math.round((dims * space) / 8000)
        
        const success = accuracy >= 86 && latency <= 45
        return {
          metrics: [
            { label: 'Semantic Accuracy', value: `${accuracy}%`, color: accuracy >= 86 ? 'text-emerald-600' : 'text-rose-600' },
            { label: 'Distance Latency', value: `${latency}ms`, color: latency <= 45 ? 'text-indigo-600' : 'text-rose-600' }
          ],
          explanation: [
            '**Dimensions:** Larger dimensions can represent finer semantic shades (e.g. king - man + woman = queen), but require more mathematical distance checks.'
          ],
          challengeSuccess: success,
          challengeCurrent: `Accuracy: ${accuracy}% & Latency: ${latency}ms`,
          challengeScore: success ? 97 : 55,
          chart: (
            <div className="space-y-3 w-full">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Semantic Distance Projection</span>
              <div className="h-32 bg-slate-50 border border-slate-100 rounded-2xl p-4 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/4 h-2 w-2 rounded-full bg-slate-900" title="Man" />
                <div className="absolute top-1/3 left-2/3 h-2 w-2 rounded-full bg-slate-900" title="King" />
                <div className="absolute top-2/3 left-2/3 h-2 w-2 rounded-full bg-indigo-600" title="Queen" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-[8px] font-black text-slate-300">
                  {dims}D SPACE
                </div>
              </div>
            </div>
          )
        }
      }
    },
    'chunking': {
      title: 'RAG Text Chunking & Context Window Playground',
      situation: 'You are preparing documents for a RAG system. Large chunks retain context but fill the LLM context window with noisy/irrelevant tokens; small chunks miss important sentences.',
      userGoal: 'Configure chunk sizes to get Relevance >= 85% and Retrieval Quality >= 90%.',
      coreQuestion: 'How does overlap prevent semantic splits at chunk boundaries?',
      challengeTarget: 'Relevance >= 85% & Quality >= 90%',
      challengeInstructions: 'Optimize the chunk size and overlap sliders.',
      controls: [
        { id: 'size', label: 'Chunk Size (Tokens)', min: 64, max: 1024, step: 64, defaultValue: 256 },
        { id: 'overlap', label: 'Chunk Overlap (%)', min: 0, max: 50, step: 5, defaultValue: 10 }
      ],
      guidedSteps: [
        {
          step: 1,
          text: '👋 Step 1: Set Chunk Size to 512 tokens to increase sentence integration.',
          buttonText: 'Set Size to 512',
          action: (setVal) => setVal('size', 512)
        },
        {
          step: 2,
          text: '👍 Step 2: Set Chunk Overlap to 25% to restore context on boundary splits.',
          buttonText: 'Set Overlap to 25%',
          action: (setVal) => setVal('overlap', 25)
        }
      ],
      compute: (vals) => {
        const size = vals['size'] ?? 256
        const overlap = vals['overlap'] ?? 10
        
        const rel = Math.round(92 - Math.abs(size - 512) * 0.04)
        const qual = Math.round(80 + (overlap / 5) * 2)
        
        const success = rel >= 85 && qual >= 90
        return {
          metrics: [
            { label: 'Context Relevance', value: `${rel}%`, color: rel >= 85 ? 'text-emerald-600' : 'text-rose-600' },
            { label: 'Retrieval Quality', value: `${qual}%`, color: qual >= 90 ? 'text-indigo-600' : 'text-slate-800' }
          ],
          explanation: [
            '**Chunk Size:** Determines segment length. Ideal chunks isolate single concepts.',
            '**Chunk Overlap:** Copies words at boundary lines to ensure sentences cut in half can still be queried.'
          ],
          challengeSuccess: success,
          challengeCurrent: `Relevance: ${rel}% & Quality: ${qual}%`,
          challengeScore: success ? 94 : 50,
          chart: (
            <div className="space-y-3 w-full">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Overlapping Chunk Panels</span>
              <div className="h-32 bg-slate-50 border border-slate-100 rounded-2xl p-4 flex flex-col justify-around">
                <div className="h-4 bg-indigo-500 rounded transition-all text-white text-[8px] px-2" style={{ width: `${(size/1024)*100}%` }}>Chunk A</div>
                <div className="h-4 bg-indigo-400 rounded transition-all text-white text-[8px] px-2" style={{ width: `${(size/1024)*100}%`, marginLeft: `${(1 - (overlap/100)) * 30}%` }}>Chunk B</div>
              </div>
            </div>
          )
        }
      }
    },
    'retraining': {
      title: 'Automated Retraining Threshold Simulator',
      situation: 'You are maintaining a churn prediction model. Real-world target distributions drift constantly, causing accuracy to decay. Set a retraining schedule or trigger to handle decay.',
      userGoal: 'Get Average Model Accuracy >= 90% while keeping monthly retraining cost <= $1,200.',
      coreQuestion: 'How does retraining frequency and trigger threshold control deployment budgets?',
      challengeTarget: 'Accuracy >= 90% & Cost <= $1,200',
      challengeInstructions: 'Adjust the auto-retrain accuracy threshold trigger.',
      controls: [
        { id: 'trigger', label: 'Retrain Threshold (Trigger if Acc drops below)', min: 0.70, max: 0.95, step: 0.01, defaultValue: 0.85 },
        { id: 'drift', label: 'Feature Drift Severity', min: 1, max: 3, step: 1, defaultValue: 2 }
      ],
      guidedSteps: [
        {
          step: 1,
          text: '👋 Step 1: Set Retrain Threshold to 0.88 to balance cost and accuracy.',
          buttonText: 'Set Trigger to 0.88',
          action: (setVal) => setVal('trigger', 0.88)
        }
      ],
      compute: (vals) => {
        const trigger = vals['trigger'] ?? 0.85
        const drift = vals['drift'] ?? 2
        
        const cost = Math.round(300 + (trigger - 0.70) * 4500 * (drift / 2))
        const acc = Math.round(96 - (1 - trigger) * 45)
        
        const success = acc >= 90 && cost <= 1200
        return {
          metrics: [
            { label: 'Avg Model Accuracy', value: `${acc}%`, color: acc >= 90 ? 'text-emerald-600' : 'text-rose-600' },
            { label: 'Retraining Cost', value: `$${cost}/mo`, color: cost <= 1200 ? 'text-indigo-600' : 'text-slate-800' }
          ],
          explanation: [
            '**Retrain Trigger:** Initiates retraining when model accuracy drops below target. High triggers maintain high accuracy but waste computer power/cost.'
          ],
          challengeSuccess: success,
          challengeCurrent: `Accuracy: ${acc}% & Cost: $${cost}`,
          challengeScore: success ? 96 : 45,
          chart: (
            <div className="space-y-3 w-full">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Accuracy Decay Sawtooth</span>
              <div className="h-32 bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-end justify-center gap-1">
                <div className="h-20 w-8 bg-indigo-500 rounded-t" />
                <div className="h-16 w-8 bg-indigo-500 rounded-t" />
                <div className="h-12 w-8 bg-indigo-400 rounded-t" />
                <div className="h-24 w-8 bg-emerald-500 rounded-t" />
                <div className="h-20 w-8 bg-indigo-500 rounded-t" />
              </div>
            </div>
          )
        }
      }
    },
    'bias-fairness': {
      title: 'Model Fairness & Demographics Optimizer',
      situation: 'Your automated credit approval model rejects minority applicant groups at much higher rates than majority applicants. Adjust classification constraints to achieve fair outcomes.',
      userGoal: 'Achieve minority approval parity ratio >= 80% while keeping overall accuracy >= 85%.',
      coreQuestion: 'How do demographic parity constraints reduce overall accuracy?',
      challengeTarget: 'Parity Ratio >= 80% & Accuracy >= 85%',
      challengeInstructions: 'Adjust the fairness constraint level and decision threshold.',
      controls: [
        { id: 'constraint', label: 'Fairness Constraint (0=None, 1=Parity, 2=Opportunity)', min: 0, max: 2, step: 1, defaultValue: 0 },
        { id: 'thresh', label: 'Decision Threshold', min: 0.1, max: 0.9, step: 0.05, defaultValue: 0.5 }
      ],
      guidedSteps: [
        {
          step: 1,
          text: '👋 Step 1: Apply Equal Opportunity constraint (2) to balance true positive rates.',
          buttonText: 'Set Equal Opportunity',
          action: (setVal) => setVal('constraint', 2)
        }
      ],
      compute: (vals) => {
        const c = vals['constraint'] ?? 0
        const thresh = vals['thresh'] ?? 0.5
        
        let parity = 45
        let acc = 92
        
        if (c === 1) {
          parity = Math.round(95 - Math.abs(thresh - 0.5) * 10)
          acc = Math.round(81 + (thresh - 0.5) * 5)
        } else if (c === 2) {
          parity = Math.round(86 - Math.abs(thresh - 0.5) * 15)
          acc = Math.round(88 - (thresh - 0.5) * 8)
        } else {
          parity = Math.round(45 + (thresh - 0.5) * 20)
          acc = Math.round(92 - Math.abs(thresh - 0.5) * 10)
        }
        
        const success = parity >= 80 && acc >= 85
        return {
          metrics: [
            { label: 'Demographic Parity', value: `${parity}%`, color: parity >= 80 ? 'text-emerald-600' : 'text-rose-600' },
            { label: 'Overall Accuracy', value: `${acc}%`, color: acc >= 85 ? 'text-indigo-600' : 'text-slate-800' }
          ],
          explanation: [
            '**Demographic Parity:** Forces equal selection rates regardless of demographic group.',
            '**Equal Opportunity:** Mandates equal True Positive rates (ensuring qualified candidates get equal approval rates).'
          ],
          challengeSuccess: success,
          challengeCurrent: `Parity: ${parity}% & Accuracy: ${acc}%`,
          challengeScore: success ? 97 : 50,
          chart: (
            <div className="space-y-3 w-full">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Group Approval Ratios</span>
              <div className="h-32 bg-slate-50 border border-slate-100 rounded-2xl flex items-end justify-center p-4 gap-8">
                <div className="w-16 bg-slate-800 rounded-t-lg transition-all text-center text-white text-[10px] py-1" style={{ height: '80%' }}>Majority</div>
                <div className="w-16 bg-indigo-500 rounded-t-lg transition-all text-center text-white text-[10px] py-1" style={{ height: `${parity}%` }}>Minority</div>
              </div>
            </div>
          )
        }
      }
    },
    'privacy': {
      title: 'Differential Privacy Epsilon Sandbox',
      situation: 'You are releasing clinical records to research partners. Inject Gaussian noise using Differential Privacy to prevent adversary link attacks.',
      userGoal: 'Tune Epsilon to get privacy protection level >= 90% and data utility >= 80%.',
      coreQuestion: 'How does Epsilon scale the privacy-utility tradeoff?',
      challengeTarget: 'Protection >= 90% & Utility >= 80%',
      challengeInstructions: 'Adjust the Privacy Budget (Epsilon) slider. Lower epsilon = more noise.',
      controls: [
        { id: 'epsilon', label: 'Privacy Budget (Epsilon ε)', min: 0.05, max: 4.0, step: 0.05, defaultValue: 1.0 }
      ],
      guidedSteps: [
        {
          step: 1,
          text: '👋 Step 1: Lower privacy budget ε to 0.40 to inject robust privacy protection noise.',
          buttonText: 'Set ε = 0.40',
          action: (setVal) => setVal('epsilon', 0.40)
        }
      ],
      compute: (vals) => {
        const eps = vals['epsilon'] ?? 1.0
        
        const prot = Math.round(100 - eps * 22)
        const util = Math.round(55 + Math.log2(eps + 1) * 22)
        
        const success = prot >= 90 && util >= 80
        return {
          metrics: [
            { label: 'Privacy Protection', value: `${prot}%`, color: prot >= 90 ? 'text-emerald-600' : 'text-rose-600' },
            { label: 'Data Utility Level', value: `${util}%`, color: util >= 80 ? 'text-indigo-600' : 'text-slate-800' }
          ],
          explanation: [
            '**Epsilon (ε):** Privacy budget. Small values add heavy random noise, protecting patient identity but reducing stats utility.'
          ],
          challengeSuccess: success,
          challengeCurrent: `Protection: ${prot}% & Utility: ${util}%`,
          challengeScore: success ? 94 : 50,
          chart: (
            <div className="space-y-3 w-full">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Noised Data Distribution</span>
              <div className="h-32 bg-slate-50 border border-slate-100 rounded-2xl flex items-end justify-center p-4 gap-1">
                {Array.from({ length: 15 }).map((_, i) => (
                  <div key={i} className="bg-indigo-500 rounded-t w-3 transition-all" style={{ height: `${Math.round(20 + Math.random() * (prot / 2))}%` }} />
                ))}
              </div>
            </div>
          )
        }
      }
    }
  }

  const getGenericConfig = (tId: string, title: string, keyConcepts: string[]): SimulatorConfig => {
    return {
      title: `${title} Playground`,
      situation: `You are optimizing a production ML system where ${title} is a bottleneck. Tune hyperparameters to hit target efficiency and prediction confidence.`,
      userGoal: `Tune settings to get System Efficiency >= 85% and Prediction Confidence >= 90%.`,
      coreQuestion: `How does hyperparameter tuning impact convergence speed and error rates?`,
      challengeTarget: `Efficiency >= 85% & Confidence >= 90%`,
      challengeInstructions: `Adjust sliders to maximize accuracy and minimize computing time.`,
      controls: [
        { id: 'parameter1', label: 'Hyperparameter Alpha', min: 0.1, max: 1.0, step: 0.05, defaultValue: 0.5 },
        { id: 'parameter2', label: 'Dataset Subsample', min: 0.1, max: 1.0, step: 0.05, defaultValue: 0.7 }
      ],
      guidedSteps: [
        {
          step: 1,
          text: '👋 Step 1: Increase Hyperparameter Alpha to 0.85 to stabilize convergence.',
          buttonText: 'Set Alpha to 0.85',
          action: (setVal) => setVal('parameter1', 0.85)
        },
        {
          step: 2,
          text: '👍 Step 2: Raise Subsample to 0.90 to provide more training data.',
          buttonText: 'Set Subsample to 0.90',
          action: (setVal) => setVal('parameter2', 0.90)
        }
      ],
      compute: (vals) => {
        const p1 = vals['parameter1'] ?? 0.5
        const p2 = vals['parameter2'] ?? 0.7
        
        const efficiency = Math.round(70 + (1 - p1) * 20 + p2 * 10)
        const confidence = Math.round(65 + p1 * 20 + p2 * 10)
        const success = efficiency >= 85 && confidence >= 90
        
        return {
          metrics: [
            { label: 'System Efficiency', value: `${efficiency}%`, color: efficiency >= 85 ? 'text-emerald-600' : 'text-slate-800' },
            { label: 'Model Confidence', value: `${confidence}%`, color: confidence >= 90 ? 'text-indigo-600' : 'text-slate-800' },
            { label: 'Compute Cost', value: `$${Math.round(200 * p1 * p2)}/mo` }
          ],
          explanation: [
            `**Hyperparameter Alpha:** Balancing regularization limits prediction noise for topic ${tId}.`,
            `**Dataset Subsample:** Higher subsample sizes yield better confidence bounds for concepts like ${keyConcepts.join(', ')}.`
          ],
          challengeSuccess: success,
          challengeCurrent: `Efficiency: ${efficiency}% & Confidence: ${confidence}%`,
          challengeScore: success ? 95 : 60,
          chart: (
            <div className="space-y-4 w-full">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-500 mb-1">
                <span>Hyperparameter Alpha ({p1})</span>
                <span>Dataset Subsample ({p2})</span>
              </div>
              <div className="h-32 bg-slate-50 border border-slate-100 rounded-2xl flex items-end justify-around p-4 relative overflow-hidden">
                <div className="w-12 bg-slate-900 rounded-t-xl transition-all duration-300" style={{ height: `${efficiency}%` }} />
                <div className="w-12 bg-indigo-500 rounded-t-xl transition-all duration-300" style={{ height: `${confidence}%` }} />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-2xl opacity-20">📊 Simulation Plot</span>
                </div>
              </div>
              <div className="flex justify-around text-[9px] font-black text-slate-400 uppercase tracking-wider text-center">
                <span className="w-12">Efficiency</span>
                <span className="w-12">Confidence</span>
              </div>
            </div>
          )
        }
      }
    }
  }

  // Find or fallback to generic config
  const currentConfig = (topic && SIMULATOR_CONFIGS[topic.id]) || (topic ? getGenericConfig(topic.id, topic.title, topic.keyConcepts) : null)

  // Initialize control values
  useEffect(() => {
    if (currentConfig) {
      const initial: Record<string, number> = {}
      currentConfig.controls.forEach(c => {
        initial[c.id] = c.defaultValue
      })
      setControls(initial)
      setGuidedStep(1)
    }
  }, [topicId])

  if (!topic || !currentConfig) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800">Topic not found</h2>
          <Link to="/tracks" className="text-blue-600 hover:underline mt-4 inline-block">Back to Tracks</Link>
        </div>
      </div>
    )
  }

  const track = getTrackById(topic.track)

  // Compute live metrics
  const results = currentConfig.compute(controls)

  // Prerequisites formatting
  const prerequisites = topic.prerequisites.map((prereqId) => {
    const pModel = models.find((m) => m.id === prereqId)
    const route = pModel?.isSimulator && pModel.simulatorRoute
      ? pModel.simulatorRoute
      : `/modules/${prereqId}`
    return {
      id: prereqId,
      title: pModel?.title || prereqId,
      route,
    }
  })

  // Paths mapping
  const paths = topic.paths.map((pathId) => {
    const pPath = learningPaths.find((p) => p.id === pathId)
    return {
      id: pathId,
      title: pPath?.title || pathId,
      route: `/learning-paths/${pathId}`,
    }
  })

  // Next topic recommendation
  const nextTopicModel = topic.nextTopics[0] 
    ? models.find((m) => m.id === topic.nextTopics[0])
    : null
  
  const nextTopic = nextTopicModel
    ? {
        title: nextTopicModel.title,
        route: nextTopicModel.isSimulator && nextTopicModel.simulatorRoute
          ? nextTopicModel.simulatorRoute
          : `/modules/${nextTopicModel.id}`,
      }
    : null

  const pathForProgress = learningPaths.find(p => p.topics.some(t => t.topicId === topic.id))
  const stepIdx = pathForProgress ? pathForProgress.topics.findIndex(t => t.topicId === topic.id) : -1
  
  const currentPath = pathForProgress && stepIdx !== -1
    ? {
        title: pathForProgress.title,
        stepN: stepIdx + 1,
        totalSteps: pathForProgress.topics.length,
        route: `/learning-paths/${pathForProgress.id}`
      }
    : undefined

  // Helper to set control values
  const setControlValue = (id: string, val: number) => {
    setControls(prev => ({ ...prev, [id]: val }))
  }

  // Render controls panel
  const controlsPanel = (
    <div className="space-y-6">
      {currentConfig.controls.map(c => (
        <div key={c.id}>
          <div className="flex justify-between items-center mb-1.5 font-medium">
            <label className="text-xs font-black text-slate-500 uppercase tracking-wider">{c.label}</label>
            <span className="text-sm font-bold text-slate-800">
              {controls[c.id] ?? c.defaultValue}
            </span>
          </div>
          <input
            type="range"
            min={c.min}
            max={c.max}
            step={c.step}
            value={controls[c.id] ?? c.defaultValue}
            onChange={(e) => setControlValue(c.id, parseFloat(e.target.value))}
            className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-slate-800"
          />
        </div>
      ))}
      <button
        onClick={() => {
          const initial: Record<string, number> = {}
          currentConfig.controls.forEach(c => {
            initial[c.id] = c.defaultValue
          })
          setControls(initial)
          setGuidedStep(1)
        }}
        className="w-full mt-2 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl text-xs font-bold transition-all border border-slate-100 flex items-center justify-center gap-1.5 shadow-sm"
      >
        <span>🔄</span> Reset to Defaults
      </button>
    </div>
  )

  // Render results panel
  const resultsPanel = (
    <div className="space-y-6 flex-1 flex flex-col justify-between">
      {/* Metric Grid */}
      <div className="grid grid-cols-3 gap-4 font-semibold">
        {results.metrics.map((m, i) => (
          <div key={i} className="flex flex-col items-center justify-center p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{m.label}</span>
            <span className={`text-sm font-extrabold ${m.color || 'text-slate-800'}`}>{m.value}</span>
          </div>
        ))}
      </div>

      {/* Visual Chart */}
      <div className="flex-grow flex items-center justify-center pt-6">
        {results.chart}
      </div>
    </div>
  )

  // Render explanation panel
  const explanationPanel = (
    <ul className="list-disc pl-4 space-y-1">
      {results.explanation.map((e, i) => (
        <li key={i} dangerouslySetInnerHTML={{ __html: e.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
      ))}
    </ul>
  )

  // Guided step UI
  const currentStepInfo = currentConfig.guidedSteps.find(s => s.step === guidedStep)
  const guidedInstructions = (
    <div className="space-y-3 font-medium">
      {currentStepInfo ? (
        <>
          <p>{currentStepInfo.text}</p>
          <button 
            onClick={() => {
              currentStepInfo.action((id, val) => setControlValue(id, val))
              setGuidedStep(prev => prev + 1)
            }}
            className="px-3 py-1 bg-indigo-600 text-white rounded text-xs font-bold shadow hover:bg-indigo-700 transition-colors"
          >
            {currentStepInfo.buttonText}
          </button>
        </>
      ) : (
        <p>🎉 Excellent! You have completed the guided steps. Switch to Explore or Challenge mode to test your limits!</p>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 space-y-8">
          <BackButton />

          <TopicHeader
            title={topic.title}
            trackTitle={track?.title || topic.track}
            trackRoute={`/tracks/${topic.track}`}
            difficulty={topic.difficulty}
            estimatedTime={topic.estimatedTime}
            prerequisites={prerequisites}
            paths={paths}
          />

          <SimulatorShell
            scenario={{
              title: currentConfig.title,
              situation: currentConfig.situation,
              userGoal: currentConfig.userGoal,
              coreQuestion: currentConfig.coreQuestion
            }}
            mode={mode}
            onModeChange={(newMode) => {
              setMode(newMode)
              // Reset values on mode change
              const initial: Record<string, number> = {}
              currentConfig.controls.forEach(c => {
                initial[c.id] = c.defaultValue
              })
              setControls(initial)
              setGuidedStep(1)
            }}
            challengeInstructions={
              <ul className="list-disc pl-4 space-y-1 mt-1 font-medium text-slate-300">
                <li>{currentConfig.challengeInstructions}</li>
              </ul>
            }
            challengeTarget={currentConfig.challengeTarget}
            challengeCurrent={results.challengeCurrent}
            challengeSuccess={results.challengeSuccess}
            challengeScore={results.challengeScore}
            guidedInstructions={guidedInstructions}
            controlsPanel={controlsPanel}
            resultsPanel={resultsPanel}
            explanationPanel={explanationPanel}
            onRetry={() => {
              const initial: Record<string, number> = {}
              currentConfig.controls.forEach(c => {
                initial[c.id] = c.defaultValue
              })
              setControls(initial)
            }}
          />
        </div>
      </main>

      <NextTopicBar nextTopic={nextTopic} currentPath={currentPath} />
      <Footer />
    </div>
  )
}
