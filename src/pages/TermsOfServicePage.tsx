import React from 'react'
import { Navbar, Footer, BackButton } from '../components'

export const TermsOfServicePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col justify-between">
      <Navbar />
      <main className="flex-grow pt-28 pb-16 px-6 lg:px-10 max-w-4xl mx-auto w-full">
        <BackButton />
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm mt-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-6">Terms of Service</h1>
          <div className="prose prose-slate max-w-none text-slate-600 space-y-4">
            <p>Last updated: April 2026</p>
            <p>Welcome to Viz Learn. By using our website, you agree to these Terms of Service.</p>
            <h2 className="text-xl font-bold text-slate-800 mt-6 mb-2">1. Educational Use</h2>
            <p>Viz Learn provides interactive machine learning simulators for educational purposes. The content provided is for informational learning only.</p>
            <h2 className="text-xl font-bold text-slate-800 mt-6 mb-2">2. User Conduct</h2>
            <p>You agree to use the platform responsibly and not to attempt to disrupt or harm the website's infrastructure.</p>
            <h2 className="text-xl font-bold text-slate-800 mt-6 mb-2">3. Intellectual Property</h2>
            <p>The code, text, graphics, and interactive modules on Viz Learn are the intellectual property of the author, unless otherwise noted as open-source.</p>
            <h2 className="text-xl font-bold text-slate-800 mt-6 mb-2">4. Disclaimer of Warranties</h2>
            <p>The service is provided "as is". We make no guarantees regarding the accuracy or completeness of the educational materials.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
