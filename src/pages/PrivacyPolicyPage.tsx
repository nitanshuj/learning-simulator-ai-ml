import React from 'react'
import { Navbar, Footer, BackButton } from '../components'

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col justify-between">
      <Navbar />
      <main className="flex-grow pt-28 pb-16 px-6 lg:px-10 max-w-4xl mx-auto w-full">
        <BackButton />
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm mt-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-6">Privacy Policy</h1>
          <div className="prose prose-slate max-w-none text-slate-600 space-y-4">
            <p>Last updated: April 2026</p>
            <p>At Viz Learn, we take your privacy seriously. This simple privacy policy outlines how we handle your data.</p>
            <h2 className="text-xl font-bold text-slate-800 mt-6 mb-2">1. Information We Collect</h2>
            <p>We may collect basic usage data to improve our educational platform. This includes interaction metrics with our ML simulators.</p>
            <h2 className="text-xl font-bold text-slate-800 mt-6 mb-2">2. How We Use Information</h2>
            <p>Any collected data is used exclusively for educational enhancement, debugging, and improving the visualizations. We do not sell your data.</p>
            <h2 className="text-xl font-bold text-slate-800 mt-6 mb-2">3. Third-Party Services</h2>
            <p>We may use third-party tools for hosting and analytics. These services are bound by their respective privacy agreements.</p>
            <h2 className="text-xl font-bold text-slate-800 mt-6 mb-2">4. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us via our GitHub repository.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
