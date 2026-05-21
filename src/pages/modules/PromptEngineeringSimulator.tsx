import React, { useState, useEffect } from 'react'
import { Navbar, Footer, BackButton, TopicHeader, SimulatorShell } from '@/components'


export const PromptEngineeringSimulator: React.FC = () => {
  const [mode, setMode] = useState<'Guided' | 'Explore' | 'Challenge'>('Guided')

  // Controls
  const [style, setStyle] = useState<'Zero-shot' | 'Few-shot' | 'Chain-of-thought'>('Zero-shot')
  const [instructions, setInstructions] = useState<'Vague' | 'Moderate' | 'Specific'>('Vague')
  const [context, setContext] = useState<'None' | 'Partial' | 'Full'>('None')

  // Outputs
  const [promptText, setPromptText] = useState('')
  const [llmOutput, setLlmOutput] = useState('')
  const [relevance, setRelevance] = useState(40)
  const [completeness, setCompleteness] = useState(30)
  const [hallucinationRisk, setHallucinationRisk] = useState(80)

  // Guided step
  const [guidedStep, setGuidedStep] = useState(1)

  // Challenge status
  const [challengeSuccess, setChallengeSuccess] = useState(false)
  const [challengeScore, setChallengeScore] = useState(0)

  // Static lookup table of answers based on settings
  useEffect(() => {
    // Construct Prompt preview
    let p = `[SYSTEM]: You are a customer support agent.
[CONTEXT]: ${context === 'None' ? 'No docs loaded.' : context === 'Partial' ? 'Docs: We sell shoes. Return policy is 30 days.' : 'Docs: Return policy: 30 days, must be unworn, in original box. Return fee is $5. Return label printed online.'}
[INSTRUCTIONS]: ${instructions === 'Vague' ? 'Answer customer questions.' : instructions === 'Moderate' ? 'Help customers return their items.' : 'Help return items. Validate return conditions: 30 days, unworn, original box. Mention $5 return fee.'}
[CUSTOMER]: "Hi, I bought boots 2 weeks ago. Worn them once. Can I return them?"`

    if (style === 'Few-shot') {
      p = `Example 1:
Q: Return 40 day old unworn sandals?
A: No, return window is 30 days.
\n` + p
    } else if (style === 'Chain-of-thought') {
      p = p + `\n[THINKING PROCESS REQUIRED]: Think step-by-step before answering.`
    }

    setPromptText(p)

    // Calculate score coefficients
    let rel = 40
    let comp = 30
    let hal = 80
    let response = "I don't have enough information about returns. We might accept them, just bring them to a store or send them back whenever."

    if (context === 'Partial') {
      rel = 60
      comp = 50
      hal = 40
      response = "Yes, you can return them. Our return policy is 30 days, so you are within the return window."
    } else if (context === 'Full') {
      rel = 75
      comp = 65
      hal = 25
      response = "Yes, since you purchased them 2 weeks ago, you are within the 30-day window. You can return them by printing a label online for a $5 fee."
    }

    // Instruction modifiers
    if (instructions === 'Moderate') {
      rel += 10
      comp += 10
      hal -= 10
    } else if (instructions === 'Specific') {
      rel += 15
      comp += 20
      hal -= 15
    }

    // Style modifiers
    if (style === 'Few-shot') {
      rel += 5
      comp += 5
      hal -= 5
      if (context === 'Full') {
        response = `Example reply: Yes, returns are allowed within 30 days.\nResponse: Yes, you can return the boots as it is within 2 weeks (30 day limit). Note that you worn them once. Our policy states returns must be unworn, so we technically cannot accept them if worn. Please contact manager.`
      }
    } else if (style === 'Chain-of-thought') {
      rel += 10
      comp += 10
      hal -= 15
      if (context === 'Full') {
        response = `Thinking Process:
1. Customer bought boots 14 days ago (within 30-day limit).
2. Customer states they "worn them once".
3. Return policy requires items to be "unworn, in original box".
4. Therefore, this return does not meet the unworn condition.
Response: Unfortunately, because the boots have been worn, they do not qualify for a return under our policy, which requires items to be completely unworn and in their original box.`
      }
    }

    setRelevance(Math.min(100, rel))
    setCompleteness(Math.min(100, comp))
    setHallucinationRisk(Math.max(5, hal))
    setLlmOutput(response)

    // Challenge evaluation: Relevance >= 85% and Hallucination Risk <= 15%
    if (mode === 'Challenge') {
      const met = rel >= 85 && hal <= 15
      setChallengeSuccess(met)
      setChallengeScore(met ? 95 : 50)
    }

  }, [style, instructions, context, mode])

  const scenario = {
    title: 'Customer Support LLM Refinement',
    situation: 'Your AI support bot is answering customer return questions. By default, it hallucinated policies, gave incomplete answers, or failed to check return eligibility conditions (such as unworn/worn items).',
    userGoal: 'Minimize hallucination risk (<= 15%) and maximize relevance (>= 85%) to make the bot safe for deployment.',
    coreQuestion: 'How do grounding context and instruction precision prevent LLM hallucinations?'
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 space-y-8">
          <BackButton />

          <TopicHeader
            title="Prompt Engineering"
            trackTitle="LLM & RAG"
            trackRoute="/tracks/llm-and-rag"
            difficulty="Beginner"
            estimatedTime="15 mins"
            prerequisites={[{ id: 'llm-basics', title: 'LLM Basics', route: '/modules/llm-basics' }]}
            paths={[{ id: 'genai-builder', title: 'GenAI Builder', route: '/learning-paths/genai-builder' }]}
          />

          <SimulatorShell
            scenario={scenario}
            mode={mode}
            onModeChange={(newMode) => {
              setMode(newMode)
              if (newMode === 'Challenge') {
                setContext('None')
                setInstructions('Vague')
                setStyle('Zero-shot')
              }
            }}
            challengeInstructions={
              <ul className="list-disc pl-4 space-y-1 mt-1 font-medium">
                <li>Ground the model with **Full** document context.</li>
                <li>Tune **Instructions** and **Prompt Style** to get **Relevance &gt;= 85%** and **Hallucination Risk &lt;= 15%**.</li>
              </ul>
            }
            challengeTarget="Relevance >= 85% & Hallucination <= 15%"
            challengeCurrent={`Relevance: ${relevance}% & Hallucination: ${hallucinationRisk}%`}
            challengeSuccess={challengeSuccess}
            challengeScore={challengeScore}
            onRetry={() => {
              setContext('None')
              setInstructions('Vague')
              setStyle('Zero-shot')
            }}
            guidedInstructions={
              <div className="space-y-3 font-medium">
                {guidedStep === 1 && (
                  <>
                    <p>👋 **Step 1:** Without documents loaded, the LLM hallucinates return policies. Ground it by setting **Context to Full**.</p>
                    <button 
                      onClick={() => {
                        setContext('Full')
                        setGuidedStep(2)
                      }}
                      className="px-3 py-1 bg-indigo-600 text-white rounded text-xs font-bold"
                    >
                      Load Full Documents Context
                    </button>
                  </>
                )}
                {guidedStep === 2 && (
                  <>
                    <p>👍 **Step 2:** The response improved, but it missed that the user wore the boots once. Let's make instructions **Specific**.</p>
                    <button 
                      onClick={() => {
                        setInstructions('Specific')
                        setGuidedStep(3)
                      }}
                      className="px-3 py-1 bg-indigo-600 text-white rounded text-xs font-bold"
                    >
                      Make Instructions Specific
                    </button>
                  </>
                )}
                {guidedStep === 3 && (
                  <>
                    <p>🔥 **Step 3:** The LLM still struggles to perform condition checks sequentially. Force logical reasoning by switching to **Chain-of-thought**.</p>
                    <button 
                      onClick={() => {
                        setStyle('Chain-of-thought')
                        setGuidedStep(4)
                      }}
                      className="px-3 py-1 bg-indigo-600 text-white rounded text-xs font-bold"
                    >
                      Use Chain-of-thought Style
                    </button>
                  </>
                )}
                {guidedStep === 4 && (
                  <p>🎉 Awesome! Setting **Grounding Context**, **Specific Instructions**, and forcing **Chain-of-thought** reasoning allows the LLM to inspect return requirements step-by-step before printing final responses!</p>
                )}
              </div>
            }
            controlsPanel={
              <div className="space-y-6 font-medium">
                <div>
                  <label className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-2">Grounding Context</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['None', 'Partial', 'Full'] as const).map((c) => (
                      <button
                        key={c}
                        onClick={() => setContext(c)}
                        disabled={mode === 'Guided'}
                        className={`py-2 rounded-xl text-xs font-bold border transition-colors ${
                          context === c
                            ? 'bg-slate-900 text-white border-slate-900'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {c === 'None' ? 'No Docs' : `${c} Docs`}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-2">System Instructions</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['Vague', 'Moderate', 'Specific'] as const).map((inst) => (
                      <button
                        key={inst}
                        onClick={() => setInstructions(inst)}
                        disabled={mode === 'Guided' && guidedStep < 2}
                        className={`py-2 rounded-xl text-xs font-bold border transition-colors ${
                          instructions === inst
                            ? 'bg-slate-900 text-white border-slate-900'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {inst}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-2">Prompt Reasoning Style</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['Zero-shot', 'Few-shot', 'Chain-of-thought'] as const).map((s) => (
                      <button
                        key={s}
                        onClick={() => setStyle(s)}
                        disabled={mode === 'Guided' && guidedStep < 3}
                        className={`py-2 rounded-xl text-xs font-bold border transition-colors text-center ${
                          style === s
                            ? 'bg-slate-900 text-white border-slate-900'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {s === 'Chain-of-thought' ? 'CoT' : s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            }
            resultsPanel={
              <div className="space-y-6 font-semibold flex-1 flex flex-col justify-between">
                {/* Metric gauges */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center justify-center p-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Relevance</span>
                    <span className="text-sm font-extrabold text-slate-800">{relevance}%</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Completeness</span>
                    <span className="text-sm font-extrabold text-slate-800">{completeness}%</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Hallucination</span>
                    <span className={`text-sm font-extrabold ${hallucinationRisk > 40 ? 'text-rose-600' : 'text-emerald-600'}`}>
                      {hallucinationRisk}%
                    </span>
                  </div>
                </div>

                {/* Prompt Preview */}
                <div className="space-y-2 flex-1 flex flex-col justify-end">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Rendered Prompt Preview</span>
                  <pre className="p-3 bg-slate-50 border border-slate-100 text-[10px] font-mono text-slate-600 rounded-xl overflow-y-auto max-h-[120px] whitespace-pre-wrap">
                    {promptText}
                  </pre>
                </div>

                {/* LLM Response */}
                <div className="space-y-2">
                  <span className="text-[10px] font-black text-indigo-500 uppercase tracking-wider block">LLM Answer Output</span>
                  <div className="p-4 bg-indigo-50/30 border border-indigo-100/50 rounded-2xl text-xs text-slate-800 font-medium whitespace-pre-wrap">
                    {llmOutput}
                  </div>
                </div>
              </div>
            }
            explanationPanel={
              <ul className="list-disc pl-4 space-y-1">
                <li>**Grounding context:** Feeding relevant document facts prevents LLMs from guessing or hallucinating false policy information.</li>
                <li>**Instruction Precision:** Stating exact rules restricts the search space of output patterns.</li>
                <li>**Chain of Thought (CoT):** Asking the model to "think step-by-step" allocates computational steps to checking conditional parameters before writing the output answer.</li>
              </ul>
            }
          />
        </div>
      </main>

      <Footer />
    </div>
  )
}
