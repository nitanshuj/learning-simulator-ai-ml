import React, { useState } from 'react'
import { Navbar, Footer, BackButton, Sidebar } from '../../components'

interface NodeExplanation {
  title: string
  desc: string
  details: string[]
}

export const RAGModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'basic' | 'advanced' | 'theory'>('basic')
  const [selectedNode, setSelectedNode] = useState<string | null>('Retrieval')

  const explanations: Record<string, NodeExplanation> = {
    'User Query': {
      title: 'User Query & Input',
      desc: 'The starting point of the RAG cycle. A natural language instruction or question.',
      details: ['Includes prompt context', 'Implicit chat history', 'Format instructions'],
    },
    'Ingestion': {
      title: 'Data Ingestion Pipeline',
      desc: 'The process of collecting, extracting, and breaking down external text before querying.',
      details: ['Connects to APIs/PDFs', 'Handles OCR text extraction', 'Schedules updates'],
    },
    'Chunking': {
      title: 'Semantic Chunking',
      desc: 'Splits raw text files into overlapping segments optimized for maximum contextual retrieval.',
      details: ['Sentence boundary detection', 'Overlap margins', 'Chunk constraints'],
    },
    'Retrieval': {
      title: 'Vector Store Retrieval',
      desc: 'Executing semantic cosine similarity to extract the Top-K closest embeddings.',
      details: ['Uses metadata filters', 'Similarity distance metrics', 'Keyword matching fallback'],
    },
    'Reranker': {
      title: 'Cross-Encoder Reranking',
      desc: 'Sorts raw retrieval vectors by deep contextual parity to filter irrelevant nodes.',
      details: ['Avoids garbage noise', 'Minimizes LLM distraction', 'Boosts benchmark accuracy'],
    },
    'Orchestration': {
      title: 'Agent Orchestration',
      desc: 'The routing hub managing intent checks, query expansion, and internal logic flows.',
      details: ['Multi-hop decisions', 'Guardrail checks', 'Tool call executions'],
    },
    'LLM': {
      title: 'Generative LLM',
      desc: 'The neural core generating grounded final prose from enriched context inputs.',
      details: ['Synthesizes multi-document data', 'Preserves safety alignments', 'Attributes sources'],
    },
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />
      <Sidebar />
      <div className="lg:pl-72 pt-16">
        <div className="max-w-6xl mx-auto space-y-8 p-6 lg:p-10">
          <BackButton />

        <section className="mb-8">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-600 border border-indigo-100 mb-3">
            📚 AI Engineering Simulator
          </span>
          <h1 className="text-4xl font-bold text-slate-800 tracking-tight">
            Retrieval-Augmented Generation (RAG)
          </h1>
          <p className="text-sm text-slate-500 max-w-xl mt-1 leading-relaxed">
            Enhance reasoning reliability by linking LLMs with curated data repositories.
          </p>
        </section>

        {/* Tab Controls */}
        <div className="flex border-b border-gray-200 mb-8 mt-4">
          <button
            onClick={() => setActiveTab('basic')}
            className={`pb-4 px-6 font-medium text-lg border-b-2 transition-colors ${
              activeTab === 'basic'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            📊 Basic RAG Flow
          </button>
          <button
            onClick={() => setActiveTab('advanced')}
            className={`pb-4 px-6 font-medium text-lg border-b-2 transition-colors ${
              activeTab === 'advanced'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            🚀 Advanced Production RAG
          </button>
          <button
            onClick={() => setActiveTab('theory')}
            className={`pb-4 px-6 font-medium text-lg border-b-2 transition-colors ${
              activeTab === 'theory'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            📚 Theory & Notes
          </button>
        </div>

        {activeTab !== 'theory' && (
          <>
        {/* CSS Animation definitions */}
        <style>{`
          @keyframes flow {
            0% { stroke-dashoffset: 24; }
            100% { stroke-dashoffset: 0; }
          }
          .rag-flow-path {
            stroke-dasharray: 6, 6;
            animation: flow 1s linear infinite;
          }
        `}</style>

        <div className="flex flex-col gap-8">
          {/* Main Visual SVG Container */}
          <div className="bg-white rounded-3xl border border-slate-100 p-6 flex flex-col justify-center items-center shadow-sm relative w-full">
            {activeTab === 'basic' ? (
              /* BASIC RAG SVG */
              <svg viewBox="0 0 800 500" className="w-full h-auto max-h-[70vh]">
                <defs>
                  <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                    <path d="M0,0 L0,6 L9,3 z" fill="#94a3b8" />
                  </marker>
                </defs>
                <text x="400" y="30" textAnchor="middle" className="text-sm font-black fill-slate-800 tracking-widest uppercase">Simple RAG Architecture</text>
                
                {/* Phase 1: Indexing Phase */}
                <rect x="20" y="60" width="760" height="150" rx="16" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="8 4" />
                <text x="40" y="90" className="text-[11px] font-bold fill-slate-500 uppercase tracking-wider">Phase 1: Indexing</text>

                {/* Documents */}
                <g onClick={() => setSelectedNode('Ingestion')} className="cursor-pointer">
                  <rect x="60" y="110" width="100" height="60" rx="8" fill="#e0e7ff" stroke="#818cf8" strokeWidth="2" />
                  <text x="110" y="145" textAnchor="middle" className="text-[11px] font-bold fill-indigo-900">Documents</text>
                </g>

                <path d="M 160 140 L 220 140" fill="none" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" className="rag-flow-path" />

                {/* Chunking */}
                <g onClick={() => setSelectedNode('Chunking')} className="cursor-pointer">
                  <rect x="220" y="110" width="100" height="60" rx="8" fill="#e0e7ff" stroke="#818cf8" strokeWidth="2" />
                  <text x="270" y="145" textAnchor="middle" className="text-[11px] font-bold fill-indigo-900">Chunking</text>
                </g>

                <path d="M 320 140 L 380 140" fill="none" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" className="rag-flow-path" />

                {/* Embedding Model 1 */}
                <g onClick={() => setSelectedNode('LLM')} className="cursor-pointer">
                  <rect x="380" y="110" width="120" height="60" rx="8" fill="#fce7f3" stroke="#f472b6" strokeWidth="2" />
                  <text x="440" y="145" textAnchor="middle" className="text-[11px] font-bold fill-pink-900">Embedding Model</text>
                </g>

                <path d="M 500 140 L 560 140" fill="none" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" className="rag-flow-path" />

                {/* Vector Database */}
                <g onClick={() => setSelectedNode('Retrieval')} className="cursor-pointer">
                  <rect x="560" y="100" width="140" height="220" rx="16" fill="#bfdbfe" stroke="#3b82f6" strokeWidth="2" />
                  <text x="630" y="150" textAnchor="middle" className="text-[12px] font-bold fill-blue-900">Vector</text>
                  <text x="630" y="165" textAnchor="middle" className="text-[12px] font-bold fill-blue-900">Database</text>
                  <circle cx="630" cy="230" r="25" fill="#eff6ff" stroke="#60a5fa" strokeWidth="2" />
                  <circle cx="630" cy="250" r="25" fill="#eff6ff" stroke="#60a5fa" strokeWidth="2" />
                  <circle cx="630" cy="270" r="25" fill="#eff6ff" stroke="#60a5fa" strokeWidth="2" />
                </g>


                {/* Phase 2: Retrieval & Generation */}
                <rect x="20" y="240" width="500" height="230" rx="16" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="8 4" />
                <text x="40" y="270" className="text-[11px] font-bold fill-slate-500 uppercase tracking-wider">Phase 2: Retrieval & Generation</text>

                {/* User Query */}
                <g onClick={() => setSelectedNode('User Query')} className="cursor-pointer">
                  <rect x="60" y="300" width="100" height="50" rx="8" fill="#fef3c7" stroke="#fbbf24" strokeWidth="2" />
                  <text x="110" y="330" textAnchor="middle" className="text-[11px] font-bold fill-yellow-900">User Query</text>
                </g>

                <path d="M 160 325 L 200 325" fill="none" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" className="rag-flow-path" />

                {/* Embedding Model 2 */}
                <g onClick={() => setSelectedNode('LLM')} className="cursor-pointer">
                  <rect x="200" y="300" width="120" height="50" rx="8" fill="#fce7f3" stroke="#f472b6" strokeWidth="2" />
                  <text x="260" y="330" textAnchor="middle" className="text-[11px] font-bold fill-pink-900">Embedding Model</text>
                </g>

                {/* To Vector DB */}
                <path d="M 320 325 L 560 325" fill="none" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow)" className="rag-flow-path" />

                {/* From Vector DB -> Context */}
                <path d="M 560 210 L 440 210 C 400 210, 400 395, 360 395" fill="none" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrow)" className="rag-flow-path" />
                
                {/* Query -> Context */}
                <path d="M 110 350 L 110 395 L 240 395" fill="none" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrow)" className="rag-flow-path" />

                {/* Augmented Prompt (Context + Query) */}
                <g onClick={() => setSelectedNode('Orchestration')} className="cursor-pointer">
                  <rect x="240" y="370" width="120" height="50" rx="8" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
                  <text x="300" y="395" textAnchor="middle" className="text-[10px] font-bold fill-slate-800">Augmented Prompt</text>
                  <text x="300" y="410" textAnchor="middle" className="text-[9px] fill-slate-600">(Query + Top-K)</text>
                </g>

                <path d="M 360 395 L 400 395" fill="none" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" className="rag-flow-path" />

                {/* LLM */}
                <g onClick={() => setSelectedNode('LLM')} className="cursor-pointer">
                  <rect x="400" y="370" width="100" height="50" rx="8" fill="#dcfce7" stroke="#4ade80" strokeWidth="2" />
                  <text x="450" y="400" textAnchor="middle" className="text-[11px] font-bold fill-green-900">LLM Generation</text>
                </g>

                <path d="M 500 395 L 600 395" fill="none" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrow)" className="rag-flow-path" />

                {/* Response */}
                <g onClick={() => setSelectedNode('User Query')} className="cursor-pointer">
                  <rect x="600" y="370" width="100" height="50" rx="8" fill="#fef08a" stroke="#eab308" strokeWidth="2" />
                  <text x="650" y="400" textAnchor="middle" className="text-[11px] font-bold fill-yellow-900">Final Answer</text>
                </g>

              </svg>
            ) : (
              /* ADVANCED RAG SVG */
              <svg viewBox="0 0 1200 850" className="w-full h-auto max-h-[75vh]">
                <defs>
                  <marker id="arrowHead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                    <path d="M0,0 L0,6 L9,3 z" fill="#94a3b8" />
                  </marker>
                  <marker id="arrowHeadBlue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                    <path d="M0,0 L0,6 L9,3 z" fill="#3b82f6" />
                  </marker>
                  <marker id="arrowHeadGreen" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                    <path d="M0,0 L0,6 L9,3 z" fill="#10b981" />
                  </marker>
                </defs>

                <text x="600" y="30" textAnchor="middle" className="text-2xl font-black fill-slate-800 tracking-widest uppercase">INDUSTRY-GRADE RAG APPLICATION ARCHITECTURE</text>
                <text x="600" y="55" textAnchor="middle" className="text-sm font-bold fill-slate-500 tracking-widest uppercase">Scalable • Secure • Observable • Production Ready</text>

                {/* --- COLUMN 1: DATA INGESTION PIPELINE --- */}
                <g onClick={() => setSelectedNode('Ingestion')} className="cursor-pointer">
                  <rect x="20" y="90" width="220" height="580" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" />
                  <text x="130" y="115" textAnchor="middle" className="text-xs font-black fill-indigo-800 uppercase tracking-wider">1. Data Ingestion Pipeline</text>
                  
                  {/* Data Sources */}
                  <rect x="40" y="125" width="180" height="110" rx="8" fill="#ffffff" stroke="#e2e8f0" />
                  <text x="130" y="145" textAnchor="middle" className="text-[11px] font-bold fill-slate-700">Data Sources</text>
                  <text x="130" y="165" textAnchor="middle" className="text-[10px] fill-slate-500">Websites</text>
                  <text x="130" y="185" textAnchor="middle" className="text-[10px] fill-slate-500">Documents (PDF, DOCX)</text>
                  <text x="130" y="205" textAnchor="middle" className="text-[10px] fill-slate-500">Databases (SQL/NoSQL)</text>
                  <text x="130" y="225" textAnchor="middle" className="text-[10px] fill-slate-500">APIs / SaaS</text>

                  {/* Connectors */}
                  <rect x="40" y="265" width="180" height="50" rx="8" fill="#ffffff" stroke="#e2e8f0" />
                  <text x="130" y="285" textAnchor="middle" className="text-[11px] font-bold fill-slate-700">Ingestion Connectors</text>
                  <text x="130" y="305" textAnchor="middle" className="text-[10px] fill-slate-500">Web Crawlers • Parsers</text>
                  <path d="M 130 235 L 130 265" fill="none" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowHead)" className="rag-flow-path" />

                  {/* Document Processing */}
                  <rect x="40" y="345" width="180" height="85" rx="8" fill="#f0fdf4" stroke="#86efac" />
                  <text x="130" y="365" textAnchor="middle" className="text-[11px] font-bold fill-green-800">Document Processing</text>
                  <text x="130" y="385" textAnchor="middle" className="text-[10px] fill-green-700">Text Extraction (OCR)</text>
                  <text x="130" y="405" textAnchor="middle" className="text-[10px] fill-green-700">Cleaning & Normalization</text>
                  <text x="130" y="425" textAnchor="middle" className="text-[10px] fill-green-700">PII Redaction</text>
                  <path d="M 130 315 L 130 345" fill="none" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowHead)" className="rag-flow-path" />

                  {/* Chunking */}
                  <rect x="40" y="460" width="180" height="70" rx="8" fill="#eff6ff" stroke="#93c5fd" />
                  <text x="130" y="480" textAnchor="middle" className="text-[11px] font-bold fill-blue-800">Chunking</text>
                  <text x="130" y="500" textAnchor="middle" className="text-[10px] fill-blue-700">Semantic Chunking</text>
                  <text x="130" y="520" textAnchor="middle" className="text-[10px] fill-blue-700">Configurable Overlap</text>
                  <path d="M 130 430 L 130 460" fill="none" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowHead)" className="rag-flow-path" />

                  {/* Enrichment */}
                  <rect x="40" y="560" width="180" height="90" rx="8" fill="#faf5ff" stroke="#d8b4fe" />
                  <text x="130" y="580" textAnchor="middle" className="text-[11px] font-bold fill-purple-800">Enrichment</text>
                  <text x="130" y="600" textAnchor="middle" className="text-[10px] fill-purple-700">Metadata Extraction</text>
                  <text x="130" y="620" textAnchor="middle" className="text-[10px] fill-purple-700">Tags / Categories</text>
                  <text x="130" y="640" textAnchor="middle" className="text-[10px] fill-purple-700">Document Summary</text>
                  <path d="M 130 530 L 130 560" fill="none" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowHead)" className="rag-flow-path" />
                </g>


                {/* --- COLUMN 2: USER & ORCHESTRATION --- */}
                {/* User Query */}
                <g onClick={() => setSelectedNode('User Query')} className="cursor-pointer">
                  <rect x="270" y="90" width="140" height="150" rx="16" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
                  <text x="340" y="115" textAnchor="middle" className="text-xs font-black fill-slate-800 uppercase tracking-wider">2. User Query</text>
                  <circle cx="340" cy="150" r="20" fill="#e2e8f0" />
                  <circle cx="340" cy="145" r="8" fill="#94a3b8" />
                  <path d="M 325 160 Q 340 140 355 160" stroke="#94a3b8" strokeWidth="2" fill="none" />
                  <text x="340" y="195" textAnchor="middle" className="text-[10px] fill-slate-600 font-bold">Natural Language</text>
                  <text x="340" y="215" textAnchor="middle" className="text-[10px] fill-slate-600 font-bold">Chat History</text>
                </g>

                <path d="M 410 165 L 450 165" fill="none" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowHead)" className="rag-flow-path" />

                {/* Orchestration Layer */}
                <g onClick={() => setSelectedNode('Orchestration')} className="cursor-pointer">
                  <rect x="450" y="90" width="220" height="280" rx="16" fill="#fef2f2" stroke="#fca5a5" strokeWidth="2" />
                  <text x="560" y="115" textAnchor="middle" className="text-xs font-black fill-red-800 uppercase tracking-wider">3. Orchestration Layer</text>
                  <text x="560" y="130" textAnchor="middle" className="text-[9px] font-bold fill-red-600">(Query Understanding & Routing)</text>

                  <rect x="470" y="145" width="180" height="30" rx="6" fill="#ffffff" stroke="#fecaca" />
                  <text x="560" y="163" textAnchor="middle" className="text-[10px] font-bold fill-slate-700">Intent Classification</text>
                  
                  <rect x="470" y="185" width="180" height="30" rx="6" fill="#ffffff" stroke="#fecaca" />
                  <text x="560" y="203" textAnchor="middle" className="text-[10px] font-bold fill-slate-700">Query Rewriting / Expansion</text>

                  <rect x="470" y="225" width="180" height="55" rx="6" fill="#ffffff" stroke="#fecaca" />
                  <text x="560" y="240" textAnchor="middle" className="text-[10px] font-bold fill-slate-700">Retrieval Strategy Logic</text>
                  <text x="560" y="255" textAnchor="middle" className="text-[9px] fill-slate-500">Simple QA • Multi-hop</text>
                  <text x="560" y="270" textAnchor="middle" className="text-[9px] fill-slate-500">Routing to Tools</text>

                  <rect x="470" y="290" width="180" height="60" rx="6" fill="#fee2e2" stroke="#ef4444" strokeDasharray="4 2" />
                  <text x="560" y="310" textAnchor="middle" className="text-[10px] font-bold fill-red-900">Guardrail Check</text>
                  <text x="560" y="325" textAnchor="middle" className="text-[9px] fill-red-700">Safety / Policy</text>
                </g>

                {/* Path from Ingestion -> KB */}
                <path d="M 240 605 L 350 605" fill="none" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowHead)" className="rag-flow-path" />

                {/* Knowledge Base */}
                <g onClick={() => setSelectedNode('Retrieval')} className="cursor-pointer">
                  <rect x="350" y="460" width="320" height="210" rx="16" fill="#f0f9ff" stroke="#7dd3fc" strokeWidth="2" />
                  <text x="510" y="485" textAnchor="middle" className="text-xs font-black fill-sky-800 uppercase tracking-wider">Knowledge Base (Vector Store)</text>
                  
                  <rect x="370" y="505" width="140" height="110" rx="8" fill="#ffffff" stroke="#bae6fd" />
                  <text x="440" y="525" textAnchor="middle" className="text-[11px] font-bold fill-slate-700">Vector Database</text>
                  <text x="440" y="550" textAnchor="middle" className="text-[10px] fill-slate-500">Pinecone</text>
                  <text x="440" y="570" textAnchor="middle" className="text-[10px] fill-slate-500">Weaviate</text>
                  <text x="440" y="590" textAnchor="middle" className="text-[10px] fill-slate-500">Milvus / pgvector</text>

                  <rect x="530" y="505" width="120" height="110" rx="8" fill="#ffffff" stroke="#bae6fd" />
                  <text x="590" y="525" textAnchor="middle" className="text-[11px] font-bold fill-slate-700">Metadata Store</text>
                  <text x="590" y="550" textAnchor="middle" className="text-[10px] fill-slate-500">Document Info</text>
                  <text x="590" y="570" textAnchor="middle" className="text-[10px] fill-slate-500">Tags / Source</text>
                  <text x="590" y="590" textAnchor="middle" className="text-[10px] fill-slate-500">Timestamps</text>

                  <rect x="370" y="625" width="280" height="30" rx="8" fill="#e0f2fe" stroke="#7dd3fc" />
                  <text x="510" y="643" textAnchor="middle" className="text-[10px] font-bold fill-sky-900">Object Storage / Data Lake (Raw Documents)</text>
                </g>

                {/* Path Orch <-> KB */}
                <path d="M 560 370 L 560 460" fill="none" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowHead)" className="rag-flow-path" />
                <path d="M 550 460 L 550 370" fill="none" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowHead)" className="rag-flow-path" />

                {/* --- COLUMN 3: RETRIEVAL & MEMORY & TOOLS --- */}
                
                {/* Memory */}
                <g onClick={() => setSelectedNode('Orchestration')} className="cursor-pointer">
                  <rect x="700" y="460" width="130" height="210" rx="16" fill="#f5f3ff" stroke="#c4b5fd" strokeWidth="2" />
                  <text x="765" y="485" textAnchor="middle" className="text-xs font-black fill-purple-800 uppercase tracking-wider">Memory</text>
                  
                  <rect x="710" y="500" width="110" height="60" rx="8" fill="#ffffff" stroke="#ddd6fe" />
                  <text x="765" y="525" textAnchor="middle" className="text-[10px] font-bold fill-slate-700">Short-term Memory</text>
                  <text x="765" y="545" textAnchor="middle" className="text-[9px] fill-slate-500">(Chat History)</text>

                  <rect x="710" y="580" width="110" height="75" rx="8" fill="#ffffff" stroke="#ddd6fe" />
                  <text x="765" y="605" textAnchor="middle" className="text-[10px] font-bold fill-slate-700">Long-term Memory</text>
                  <text x="765" y="625" textAnchor="middle" className="text-[9px] fill-slate-500">(User Preferences,</text>
                  <text x="765" y="640" textAnchor="middle" className="text-[9px] fill-slate-500">Facts & Interactions)</text>
                </g>

                {/* Path Orch <-> Memory */}
                <path d="M 670 230 L 765 230 L 765 460" fill="none" stroke="#c4b5fd" strokeWidth="2" markerEnd="url(#arrowHead)" className="rag-flow-path" />

                {/* Retrieval Pipeline */}
                <g onClick={() => setSelectedNode('Retrieval')} className="cursor-pointer">
                  <rect x="700" y="90" width="220" height="240" rx="16" fill="#eff6ff" stroke="#93c5fd" strokeWidth="2" />
                  <text x="810" y="115" textAnchor="middle" className="text-xs font-black fill-blue-800 uppercase tracking-wider">4. Retrieval Pipeline</text>

                  <rect x="715" y="130" width="90" height="50" rx="6" fill="#ffffff" stroke="#bfdbfe" />
                  <text x="760" y="150" textAnchor="middle" className="text-[10px] font-bold fill-slate-700">Embedding Gen</text>
                  <text x="760" y="165" textAnchor="middle" className="text-[9px] fill-slate-500">Models</text>

                  <rect x="815" y="130" width="90" height="50" rx="6" fill="#ffffff" stroke="#bfdbfe" />
                  <text x="860" y="150" textAnchor="middle" className="text-[10px] font-bold fill-slate-700">Retriever</text>
                  <text x="860" y="165" textAnchor="middle" className="text-[9px] fill-slate-500">Top-K Vector</text>

                  <rect x="715" y="210" width="190" height="50" rx="6" fill="#e0f2fe" stroke="#7dd3fc" />
                  <text x="810" y="230" textAnchor="middle" className="text-[10px] font-bold fill-sky-900">Hybrid Search</text>
                  <text x="810" y="245" textAnchor="middle" className="text-[9px] fill-sky-700">Keyword (BM25) + Dense Vector</text>

                  <rect x="715" y="270" width="190" height="40" rx="6" fill="#ffffff" stroke="#bfdbfe" />
                  <text x="810" y="285" textAnchor="middle" className="text-[10px] font-bold fill-slate-700">Candidate Documents (Top-N)</text>
                </g>

                {/* Path Orch -> Retrieval */}
                <path d="M 670 155 L 700 155" fill="none" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowHeadBlue)" className="rag-flow-path" />

                {/* Tools & Actions */}
                <g onClick={() => setSelectedNode('Orchestration')} className="cursor-pointer">
                  <rect x="850" y="460" width="140" height="210" rx="16" fill="#fff7ed" stroke="#fdba74" strokeWidth="2" />
                  <text x="920" y="485" textAnchor="middle" className="text-[11px] font-black fill-orange-800 uppercase tracking-wider">Tools & Actions</text>
                  
                  <rect x="860" y="505" width="120" height="145" rx="8" fill="#ffffff" stroke="#fed7aa" />
                  <text x="920" y="530" textAnchor="middle" className="text-[10px] font-bold fill-slate-700">Web Search</text>
                  <text x="920" y="555" textAnchor="middle" className="text-[10px] font-bold fill-slate-700">Calculator</text>
                  <text x="920" y="580" textAnchor="middle" className="text-[10px] font-bold fill-slate-700">SQL Query</text>
                  <text x="920" y="605" textAnchor="middle" className="text-[10px] font-bold fill-slate-700">API Calls</text>
                  <text x="920" y="630" textAnchor="middle" className="text-[10px] font-bold fill-slate-700">Business Logic</text>
                </g>

                {/* --- COLUMN 4: RERANK, CONTEXT, LLM & RESPONSE --- */}
                
                {/* Reranking & Filtering */}
                <g onClick={() => setSelectedNode('Reranker')} className="cursor-pointer">
                  <rect x="950" y="90" width="120" height="110" rx="16" fill="#fce7f3" stroke="#f472b6" strokeWidth="2" />
                  <text x="1010" y="115" textAnchor="middle" className="text-[11px] font-black fill-pink-800 uppercase tracking-wider">5. Reranking</text>
                  
                  <rect x="960" y="130" width="100" height="60" rx="6" fill="#ffffff" stroke="#fbcfe8" />
                  <text x="1010" y="145" textAnchor="middle" className="text-[10px] font-bold fill-slate-700">Cross-Encoder</text>
                  <text x="1010" y="160" textAnchor="middle" className="text-[10px] fill-slate-500">Relevance</text>
                  <text x="1010" y="175" textAnchor="middle" className="text-[10px] fill-slate-500">Filtering</text>
                </g>

                {/* Path Retrieval -> Rerank */}
                <path d="M 920 155 L 950 155" fill="none" stroke="#f472b6" strokeWidth="2" markerEnd="url(#arrowHead)" className="rag-flow-path" />

                {/* Context Builder */}
                <g onClick={() => setSelectedNode('LLM')} className="cursor-pointer">
                  <rect x="950" y="235" width="120" height="115" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
                  <text x="1010" y="255" textAnchor="middle" className="text-[11px] font-black fill-slate-700 uppercase tracking-wider">6. Context</text>
                  <text x="1010" y="275" textAnchor="middle" className="text-[9px] font-bold fill-slate-500">Assemble Context</text>
                  <text x="1010" y="295" textAnchor="middle" className="text-[9px] fill-slate-500">Sort by Relevance</text>
                  <text x="1010" y="310" textAnchor="middle" className="text-[9px] fill-slate-500">Add Citations</text>
                  <text x="1010" y="325" textAnchor="middle" className="text-[9px] fill-slate-500">Fit Token Limit</text>
                </g>

                {/* Path Rerank -> Context */}
                <path d="M 1010 200 L 1010 235" fill="none" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowHead)" className="rag-flow-path" />

                {/* LLM Generation */}
                <g onClick={() => setSelectedNode('LLM')} className="cursor-pointer">
                  <rect x="1090" y="90" width="100" height="115" rx="16" fill="#dcfce7" stroke="#4ade80" strokeWidth="2" />
                  <text x="1140" y="115" textAnchor="middle" className="text-[11px] font-black fill-green-800 uppercase tracking-wider">7. LLM Gen</text>
                  
                  <rect x="1100" y="130" width="80" height="60" rx="6" fill="#ffffff" stroke="#bbf7d0" />
                  <text x="1140" y="145" textAnchor="middle" className="text-[10px] font-bold fill-slate-700">GPT-4o</text>
                  <text x="1140" y="160" textAnchor="middle" className="text-[10px] font-bold fill-slate-700">Claude</text>
                  <text x="1140" y="175" textAnchor="middle" className="text-[9px] fill-slate-500">Grounded Ans</text>
                </g>

                {/* Path Context -> LLM */}
                <path d="M 1070 295 L 1080 295 L 1080 155 L 1090 155" fill="none" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowHeadGreen)" className="rag-flow-path" />
                
                {/* Path Orch -> LLM (Query intent) */}
                <path d="M 670 110 L 685 110 L 685 70 L 1080 70 L 1080 110 L 1090 110" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="6 6" markerEnd="url(#arrowHeadGreen)" className="rag-flow-path" />

                {/* Response */}
                <g onClick={() => setSelectedNode('User Query')} className="cursor-pointer">
                  <rect x="1090" y="235" width="100" height="115" rx="16" fill="#fef08a" stroke="#eab308" strokeWidth="2" />
                  <text x="1140" y="255" textAnchor="middle" className="text-[11px] font-black fill-yellow-800 uppercase tracking-wider">8. Response</text>
                  <text x="1140" y="280" textAnchor="middle" className="text-[10px] font-bold fill-slate-700">Final Answer</text>
                  <text x="1140" y="300" textAnchor="middle" className="text-[9px] fill-slate-500">Citations</text>
                  <text x="1140" y="320" textAnchor="middle" className="text-[9px] fill-slate-500">Confidence</text>
                </g>

                {/* Path LLM -> Response */}
                <path d="M 1140 205 L 1140 235" fill="none" stroke="#eab308" strokeWidth="2" markerEnd="url(#arrowHead)" className="rag-flow-path" />


                {/* Observability & Governance */}
                <g onClick={() => setSelectedNode('Orchestration')} className="cursor-pointer">
                  <rect x="1010" y="460" width="180" height="210" rx="16" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 4" />
                  <text x="1100" y="485" textAnchor="middle" className="text-[11px] font-black fill-slate-600 uppercase tracking-wider">Observability & Gov</text>
                  
                  <text x="1030" y="520" className="text-[10px] font-bold fill-slate-700">Logging (ELK)</text>
                  <text x="1030" y="545" className="text-[10px] font-bold fill-slate-700">Monitoring (Grafana)</text>
                  <text x="1030" y="570" className="text-[10px] font-bold fill-slate-700">Tracing (Jaeger)</text>
                  <text x="1030" y="595" className="text-[10px] font-bold fill-slate-700">Evaluation Metrics</text>
                  <text x="1030" y="620" className="text-[10px] font-bold fill-slate-700">Audit & Compliance</text>
                  <text x="1030" y="645" className="text-[10px] font-bold fill-slate-700">Hallucination Checks</text>
                </g>

                {/* Bottom Platform Services Row */}
                <rect x="20" y="690" width="1170" height="60" rx="12" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
                <text x="600" y="710" textAnchor="middle" className="text-[11px] font-black fill-slate-500 uppercase tracking-wider">Infrastructure & Platform Services</text>
                <text x="600" y="735" textAnchor="middle" className="text-[10px] font-bold fill-slate-600">Containerized Services (Docker/K8s) • Serverless • Message Queues • Caching • Secrets Management</text>

                {/* Security Bottom Row */}
                <rect x="20" y="760" width="1170" height="60" rx="12" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
                <text x="600" y="780" textAnchor="middle" className="text-[11px] font-black fill-slate-500 uppercase tracking-wider">Security & Best Practices (Built-In)</text>
                <text x="600" y="805" textAnchor="middle" className="text-[10px] font-bold fill-slate-600">Auth (RBAC) • Data Privacy (PII) • Access Control • Rate Limiting • Backup & Recovery</text>

              </svg>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          {/* Main Theory Left Col */}
          <div className="lg:col-span-2">
            {activeTab === 'basic' && (
              <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm h-full">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">How Simple RAG Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold mr-3">1</div>
                  <h3 className="text-xl font-bold text-slate-700">Indexing Phase</h3>
                </div>
                <div className="text-sm text-slate-600 space-y-4 leading-relaxed">
                  <p>Documents are collected and split into chunks (using fixed-size or semantic boundaries) to ensure the text can fit within an LLM's context window.</p>
                  <p>Each chunk is converted into a numerical vector representation (embedding) using an embedding model (e.g., Sentence-BERT or OpenAI embeddings).</p>
                  <p>These embeddings are stored securely in a vector database (like Pinecone, Weaviate, or Milvus) alongside the original text. This creates a highly scalable and searchable index of your document collection.</p>
                </div>
              </div>

              <div>
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mr-3">2</div>
                  <h3 className="text-xl font-bold text-slate-700">Retrieval and Generation Phase</h3>
                </div>
                <div className="text-sm text-slate-600 space-y-4 leading-relaxed">
                  <p>When a user query is received, it is immediately converted into an embedding using the <strong>exact same embedding model</strong> used during indexing.</p>
                  <p>The system performs a rapid similarity search in the vector database to find the most relevant chunks. The Top-K chunks are retrieved based on cosine similarity or other semantic distance metrics.</p>
                  <p>The retrieved chunks are combined with the original query to form an <strong>Augmented Prompt</strong>. This prompt is sent to an LLM (like GPT-4 or Claude), which generates an accurate, context-grounded response for the user.</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 bg-slate-50 p-6 rounded-2xl">
              <h4 className="text-sm font-bold text-slate-800 mb-3 uppercase tracking-wider">Key Characteristics</h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-semibold text-slate-600">Straightforward similarity-based retrieval</span>
                <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-semibold text-slate-600">Minimal preprocessing of documents</span>
                <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-semibold text-slate-600">Single retrieval step</span>
                <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-semibold text-slate-600">Basic embedding models</span>
                <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-semibold text-slate-600">Limited to exact semantic matching</span>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'advanced' && (
          <section className="mt-12 bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Advanced RAG (Industry-Grade) Architecture</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
              <div>
                <h3 className="text-lg font-bold text-slate-700 mb-2 border-b border-slate-100 pb-2">1. Document Processing & Indexing</h3>
                <ul className="list-disc list-inside text-sm text-slate-600 space-y-1.5 ml-1">
                  <li>Advanced chunking strategies (semantic, recursive, sliding window)</li>
                  <li>Multi-modal document handling (text, images, tables, PDFs)</li>
                  <li>Metadata extraction and structured tagging</li>
                  <li>Named Entity Recognition (NER) for entity-based indexing</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-700 mb-2 border-b border-slate-100 pb-2">2. Multi-Level Retrieval</h3>
                <ul className="list-disc list-inside text-sm text-slate-600 space-y-1.5 ml-1">
                  <li>Hybrid search combining dense (vector) and sparse (BM25)</li>
                  <li>Metadata filters for pre-filtering documents</li>
                  <li>Ensemble retrieval combining results from different strategies</li>
                  <li>Time-aware retrieval for temporal documents</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-700 mb-2 border-b border-slate-100 pb-2">3. Re-ranking and Filtering</h3>
                <ul className="list-disc list-inside text-sm text-slate-600 space-y-1.5 ml-1">
                  <li>Cross-encoder re-ranking models to score retrieved chunks</li>
                  <li>Diversity re-ranking to avoid redundant results</li>
                  <li>Relevance thresholding to filter low-quality matches</li>
                  <li>Fusion algorithms (reciprocal rank fusion, weighted combinations)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-700 mb-2 border-b border-slate-100 pb-2">4. Query Processing</h3>
                <ul className="list-disc list-inside text-sm text-slate-600 space-y-1.5 ml-1">
                  <li>Advanced query understanding and intent detection</li>
                  <li>Query decomposition into sub-queries</li>
                  <li>Multi-hop reasoning for complex questions</li>
                  <li>Coreference resolution in conversational contexts</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-700 mb-2 border-b border-slate-100 pb-2">5. Context Management</h3>
                <ul className="list-disc list-inside text-sm text-slate-600 space-y-1.5 ml-1">
                  <li>Sliding window context with proper chunking</li>
                  <li>Parent document retrieval to maintain context</li>
                  <li>Knowledge graph integration for entity relationships</li>
                  <li>Dynamic context augmentation based on retrieval quality</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-700 mb-2 border-b border-slate-100 pb-2">6. Generation and Output</h3>
                <ul className="list-disc list-inside text-sm text-slate-600 space-y-1.5 ml-1">
                  <li>Instruction-tuned LLMs with RAG-specific fine-tuning</li>
                  <li>Fact verification against source documents</li>
                  <li>Citation and attribution of sources</li>
                  <li>Confidence scoring for generated responses</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-700 mb-2 border-b border-slate-100 pb-2">7. Feedback and Learning Loop</h3>
                <ul className="list-disc list-inside text-sm text-slate-600 space-y-1.5 ml-1">
                  <li>User feedback collection on answer quality</li>
                  <li>Retrieval quality metrics tracking</li>
                  <li>A/B testing of different retrieval strategies</li>
                  <li>Retraining of ranking models based on user feedback</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-700 mb-2 border-b border-slate-100 pb-2">8. Security and Governance</h3>
                <ul className="list-disc list-inside text-sm text-slate-600 space-y-1.5 ml-1">
                  <li>Access control and document-level permissions</li>
                  <li>PII detection and redaction</li>
                  <li>Audit logging of retrieval and generation</li>
                  <li>Compliance with data regulations and line tracing</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <h3 className="text-lg font-bold text-indigo-900 mb-4 uppercase tracking-wider">Advanced Techniques</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                  <h4 className="text-xs font-bold text-indigo-800 mb-1">Dense Passage Retrieval (DPR)</h4>
                  <p className="text-xs text-indigo-700/80">Using dual-encoder architecture for better semantic matching.</p>
                </div>
                <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                  <h4 className="text-xs font-bold text-indigo-800 mb-1">HyDE (Hypothetical Embeddings)</h4>
                  <p className="text-xs text-indigo-700/80">Generating hypothetical relevant documents to improve semantic retrieval overlap.</p>
                </div>
                <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                  <h4 className="text-xs font-bold text-indigo-800 mb-1">Graph-Based Retrieval</h4>
                  <p className="text-xs text-indigo-700/80">Leveraging knowledge graphs for entity relationships and indirect connections.</p>
                </div>
                <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                  <h4 className="text-xs font-bold text-indigo-800 mb-1">Iterative Retrieval</h4>
                  <p className="text-xs text-indigo-700/80">Multi-turn retrieval where intermediate answers inform subsequent querying sub-tasks.</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-slate-100 bg-slate-50 p-6 rounded-2xl">
              <h4 className="text-sm font-bold text-slate-800 mb-3 uppercase tracking-wider">Key Differences from Simple RAG</h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-semibold text-slate-600">Multiple retrieval stages with quality gates</span>
                <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-semibold text-slate-600">Sophisticated ranking and filtering mechanisms</span>
                <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-semibold text-slate-600">Metadata and structured data integration</span>
                <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-semibold text-slate-600">Continuous learning from user interactions</span>
                <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-semibold text-slate-600">Production-grade monitoring and observability</span>
                <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-semibold text-slate-600">Explicit error handling and fallback mechanisms</span>
              </div>
              <p className="mt-4 text-xs text-slate-500 font-medium">
                Advanced RAG systems are designed for enterprise use with strict quality requirements, large-scale deployments, domain-specific accuracy needs, and continuous improvement cycles.
              </p>
            </div>
          </section>
        )}
        </div>

          {/* Selector Inspector Right Col */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900 text-slate-200 p-8 rounded-3xl flex flex-col justify-between shadow-xl sticky top-28 h-[calc(100vh-140px)] max-h-[800px]">
              <div>
                <span className="text-[10px] font-black tracking-widest text-indigo-400 uppercase">
                  Architecture Inspector
                </span>
                <h3 className="text-2xl font-bold text-white mt-2 mb-4">
                  {selectedNode ? explanations[selectedNode]?.title : 'Select a component'}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  {selectedNode ? explanations[selectedNode]?.desc : 'Click elements on the visual diagram to drill into core modular data logic.'}
                </p>

                {selectedNode && (
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                      Under the hood:
                    </span>
                    <ul className="space-y-2">
                      {explanations[selectedNode]?.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center text-xs text-slate-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mr-2" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="text-[9px] text-slate-500 font-mono pt-6 border-t border-slate-800">
                RAG optimizes pipeline grounding for business applications.
              </div>
            </div>
          </div>
        </div>
        </>
        )}

        {activeTab === 'theory' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
            <div className="lg:col-span-2 bg-white p-12 rounded-3xl border border-slate-100 shadow-sm min-h-[400px] flex items-center justify-center">
              <p className="text-slate-400 text-xl font-medium">Theory and Notes coming soon...</p>
            </div>
          </div>
        )}
        </div>
      </div>


      <Footer />
    </div>
  )
}
