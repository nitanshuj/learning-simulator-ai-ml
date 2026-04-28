
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { models } from '@/data/models'

export const Sidebar: React.FC = () => {
  const location = useLocation()

  // Map of model IDs to their route paths
  const routeMap: Record<string, string> = {
    'linear-regression': '/linearregression',
    'gradient-descent': '/gradientdescent',
    'logistic-regression': '/logisticregression',
    'kmeans-clustering': '/kmeansclustering',
    'tf-idf': '/tf-idf',
    'word2vec': '/word2vec',
    'bag-of-words': '/bag-of-words',
    'n-grams': '/n-grams',
    'decision-tree': '/decision-tree',
    'random-forest': '/random-forest',
    'svm': '/svm',
    'knn': '/knn',
    'naive-bayes': '/naive-bayes',
    'hierarchical-clustering': '/hierarchical-clustering',
    'xgboost': '/xgboost',
    'adaboost': '/adaboost',
    'catboost': '/catboost',
    'pca': '/modules/pca',
  }

  return (
    <aside className="w-72 bg-white border-r border-slate-200 h-[calc(100vh-64px)] fixed left-0 top-16 overflow-y-auto hidden lg:block z-20">
      <div className="p-6">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">
          Learning Path
        </h3>
        <nav className="space-y-1">
          {models.map((model) => {
            const path = routeMap[model.id]
            const isActive = location.pathname === path
            const isComingSoon = model.status === 'Coming Soon'

            return (
              <Link
                key={model.id}
                to={!isComingSoon && path ? path : '#'}
                className={`flex items-center px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 shadow-sm shadow-blue-100/50'
                    : isComingSoon
                    ? 'text-slate-300 cursor-not-allowed'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                }`}
                onClick={(e) => (isComingSoon || !path) && e.preventDefault()}
              >
                <span className="mr-3 text-lg">{model.icon}</span>
                <span className="flex-1">{model.title}</span>
                {isActive && (
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600 ml-2" />
                )}
                {isComingSoon && (
                  <span className="text-[8px] bg-slate-100 text-slate-400 px-1 py-0.5 rounded uppercase font-black">
                    Soon
                  </span>
                )}
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
