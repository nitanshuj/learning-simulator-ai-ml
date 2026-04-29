import React from 'react'
import { Navbar, Footer, BackButton } from '../components'

export const CookiePolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col justify-between">
      <Navbar />
      <main className="flex-grow pt-28 pb-16 px-6 lg:px-10 max-w-4xl mx-auto w-full">
        <BackButton />
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm mt-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-6">Cookie Policy</h1>
          <div className="prose prose-slate max-w-none text-slate-600 space-y-4">
            <p>Last updated: April 2026</p>
            <p>This Cookie Policy explains how Viz Learn uses cookies and similar technologies.</p>
            <h2 className="text-xl font-bold text-slate-800 mt-6 mb-2">1. What are Cookies?</h2>
            <p>Cookies are small text files stored on your device when you visit a website. They help the site remember your preferences and understand how you interact with its features.</p>
            <h2 className="text-xl font-bold text-slate-800 mt-6 mb-2">2. How We Use Cookies</h2>
            <p>We use cookies primarily to enhance your educational experience. For example, we might use local storage or session cookies to save the state of a simulator so you don't lose your progress if you refresh the page.</p>
            <h2 className="text-xl font-bold text-slate-800 mt-6 mb-2">3. Third-Party Cookies</h2>
            <p>Some external tools we integrate (like analytics or embedded media) may place their own cookies on your device.</p>
            <h2 className="text-xl font-bold text-slate-800 mt-6 mb-2">4. Managing Cookies</h2>
            <p>You can control or delete cookies through your browser settings. However, disabling cookies might affect the functionality of some of our interactive simulators.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
