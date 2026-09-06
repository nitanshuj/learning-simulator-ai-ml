import React from 'react'
import { AuthorCitation } from '@/data/roadmaps'

interface MarinaWyssCitationProps {
  citation: AuthorCitation
}

export const MarinaWyssCitation: React.FC<MarinaWyssCitationProps> = ({ citation }) => {
  return (
    <div className="mt-14 pt-10 border-t border-slate-200">
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white rounded-3xl p-8 sm:p-10 shadow-xl relative overflow-hidden">
        {/* Background glow and subtle circuit mesh */}
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            {/* Attribution Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30">
              <span>Curated & Designed by</span>
              <span className="font-bold text-white">{citation.name}</span>
            </div>

            {/* Core Takeaway Quote */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                The One Core Takeaway
              </span>
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed italic">
                "{citation.quote}"
              </p>
            </div>

            {citation.note && (
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                {citation.note}
              </p>
            )}
          </div>

          {/* Connect & Verification Links */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto shrink-0">
            {/* LinkedIn Profile Embed Button */}
            <a
              href={citation.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-2.5 px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-900/40 hover:shadow-blue-800/60 transform hover:-translate-y-0.5 transition-all"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              <span>Connect with {citation.name}</span>
              <svg className="w-4 h-4 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>

            {/* Personal Website */}
            {citation.websiteUrl && (
              <a
                href={citation.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-white/10 hover:bg-white/15 text-slate-200 font-semibold text-xs rounded-xl border border-white/10 hover:border-white/20 transition-all text-center"
              >
                <span>Visit {citation.websiteUrl.replace('https://', '')}</span>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
