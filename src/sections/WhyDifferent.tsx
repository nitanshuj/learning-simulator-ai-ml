import React from 'react'

export const WhyDifferent: React.FC = () => {
  const values = [
    {
      icon: (
        <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      title: "Visual Understanding",
      description: "See exactly how parameters affect outcomes. We transform abstract math into intuitive visual models."
    },
    {
      icon: (
        <svg className="w-8 h-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Real-time Interaction",
      description: "Instant feedback on every change. No more waiting for training loops to see results."
    },
    {
      icon: (
        <svg className="w-8 h-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: "Theory + Practice",
      description: "Learn the 'why' behind the 'how'. We bridge the gap between academic theory and practical application."
    }
  ]

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-lg sm:px-2xl lg:px-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4xl items-center">
          <div className="space-y-xl">
            <h2 className="text-h2 text-slate-900 leading-tight">
              Why our approach <br /> to learning is different
            </h2>
            <p className="text-slate-600 text-lg">
              Traditional ML education often focuses on equations or black-box libraries. We believe intuition is the foundation of mastery.
            </p>
            <div className="pt-xl space-y-2xl">
              {values.map((value, index) => (
                <div key={index} className="flex gap-xl">
                  <div className="flex-shrink-0 w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center">
                    {value.icon}
                  </div>
                  <div className="space-y-sm">
                    <h3 className="text-h4 text-slate-900">{value.title}</h3>
                    <p className="text-slate-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square bg-gradient-to-tr from-blue-100 to-indigo-100 rounded-3xl overflow-hidden shadow-xl border border-blue-50 p-xl">
              <div className="w-full h-full bg-white rounded-2xl shadow-inner border border-blue-100/50 flex items-center justify-center relative">
                 {/* Mock UI illustration */}
                 <div className="absolute inset-0 p-lg space-y-lg">
                    <div className="h-8 w-1/2 bg-slate-100 rounded animate-pulse" />
                    <div className="h-4 w-3/4 bg-slate-50 rounded" />
                    <div className="h-40 w-full bg-blue-50 rounded-lg flex items-center justify-center">
                       <svg className="w-24 h-24 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                       </svg>
                    </div>
                    <div className="grid grid-cols-2 gap-md">
                       <div className="h-10 bg-indigo-50 rounded" />
                       <div className="h-10 bg-slate-50 rounded" />
                    </div>
                 </div>
              </div>
            </div>
            {/* Floating decoration */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white p-lg rounded-2xl shadow-xl border border-slate-100 animate-bounce transition-all duration-[3000ms]">
               <div className="h-2 w-1/2 bg-blue-100 rounded mb-sm" />
               <div className="h-6 w-full bg-blue-600 rounded-md" />
               <div className="mt-md flex justify-between">
                  <div className="h-2 w-4 bg-slate-100 rounded" />
                  <div className="h-2 w-4 bg-slate-100 rounded" />
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
