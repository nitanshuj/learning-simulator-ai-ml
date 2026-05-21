import { TrackId } from './models'

export interface Track {
  id: TrackId
  title: string
  description: string
  icon: string
  color: string
  gradient: string
  borderColor: string
  topicIds: string[]
  difficultyRange: string
}

export const tracks: Track[] = [
  {
    id: 'data-preparation',
    title: 'Data Preparation',
    description: 'Learn to clean, transform, and prepare raw data before feeding it to any model.',
    icon: '🧹',
    color: 'blue',
    gradient: 'from-blue-500/10 to-cyan-500/10',
    borderColor: 'border-blue-200 hover:border-blue-400',
    difficultyRange: 'Beginner',
    topicIds: [
      'data-cleaning',
      'missing-data',
      'encoding',
      'feature-scaling',
      'train-test-split',
    ],
  },
  {
    id: 'model-training',
    title: 'Model Training',
    description: 'Master classical ML algorithms from linear models to powerful ensemble methods.',
    icon: '🏋️',
    color: 'indigo',
    gradient: 'from-indigo-500/10 to-purple-500/10',
    borderColor: 'border-indigo-200 hover:border-indigo-400',
    difficultyRange: 'Beginner → Advanced',
    topicIds: [
      'linear-regression',
      'logistic-regression',
      'gradient-descent',
      'decision-tree',
      'random-forest',
      'knn',
      'naive-bayes',
      'svm',
      'xgboost',
      'adaboost',
      'catboost',
      'class-imbalance',
    ],
  },
  {
    id: 'model-evaluation',
    title: 'Model Evaluation',
    description: "Understand how to measure, diagnose, and improve your model's real-world performance.",
    icon: '📊',
    color: 'emerald',
    gradient: 'from-emerald-500/10 to-teal-500/10',
    borderColor: 'border-emerald-200 hover:border-emerald-400',
    difficultyRange: 'Beginner → Intermediate',
    topicIds: [
      'eval-metrics',
      'cross-validation',
      'threshold-tuning',
      'error-analysis',
      'bias-variance',
    ],
  },
  {
    id: 'text-and-nlp',
    title: 'Text & NLP',
    description: 'From raw text to rich representations — explore how machines understand language.',
    icon: '📝',
    color: 'violet',
    gradient: 'from-violet-500/10 to-fuchsia-500/10',
    borderColor: 'border-violet-200 hover:border-violet-400',
    difficultyRange: 'Beginner → Intermediate',
    topicIds: [
      'bag-of-words',
      'tf-idf',
      'n-grams',
      'word2vec',
      'tokenization',
      'embeddings',
      'text-classification',
      'similarity-search',
    ],
  },
  {
    id: 'llm-and-rag',
    title: 'LLM & RAG',
    description: 'Explore large language models, prompt engineering, and retrieval-augmented generation.',
    icon: '🤖',
    color: 'amber',
    gradient: 'from-amber-500/10 to-orange-500/10',
    borderColor: 'border-amber-200 hover:border-amber-400',
    difficultyRange: 'Intermediate → Advanced',
    topicIds: [
      'transformers',
      'llm-basics',
      'prompt-engineering',
      'context-windows',
      'embeddings',
      'vector-databases',
      'rag',
      'hallucination-control',
      'chunking',
      'retrieval-quality',
      'agents',
    ],
  },
  {
    id: 'deployment-and-monitoring',
    title: 'Deployment & Monitoring',
    description: 'Take models from notebook to production. Monitor, maintain, and improve live systems.',
    icon: '🚀',
    color: 'rose',
    gradient: 'from-rose-500/10 to-pink-500/10',
    borderColor: 'border-rose-200 hover:border-rose-400',
    difficultyRange: 'Intermediate → Advanced',
    topicIds: [
      'deployment-basics',
      'inference-patterns',
      'drift-monitoring',
      'retraining-triggers',
      'ab-testing',
      'failure-handling',
    ],
  },
  {
    id: 'responsible-ai',
    title: 'Responsible AI',
    description: 'Build AI systems that are fair, private, safe, and trustworthy.',
    icon: '⚖️',
    color: 'teal',
    gradient: 'from-teal-500/10 to-green-500/10',
    borderColor: 'border-teal-200 hover:border-teal-400',
    difficultyRange: 'Intermediate',
    topicIds: ['bias-fairness', 'privacy', 'safety'],
  },
]

export const getTrackById = (id: TrackId): Track | undefined =>
  tracks.find((t) => t.id === id)
