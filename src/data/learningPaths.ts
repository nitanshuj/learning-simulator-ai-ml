import { PathId } from './models'

export interface PathTopic {
  topicId: string
  title: string
  route: string
}

export interface MiniProject {
  title: string
  description: string
  deliverable: string
}

export interface LearningPath {
  id: PathId
  title: string
  goal: string
  prerequisiteLevel: 'None' | 'Basic Math' | 'Beginner ML' | 'Intermediate ML' | 'NLP Basics'
  estimatedHours: number
  icon: string
  color: string
  gradient: string
  accentColor: string
  topics: PathTopic[]
  miniProject: MiniProject
}

export const learningPaths: LearningPath[] = [
  {
    id: 'beginner-ml',
    title: 'Beginner ML',
    goal: 'Go from zero to building your first end-to-end ML model that makes real predictions.',
    prerequisiteLevel: 'None',
    estimatedHours: 8,
    icon: '🌱',
    color: 'blue',
    gradient: 'from-blue-600 to-cyan-500',
    accentColor: 'text-blue-600',
    topics: [
      { topicId: 'data-cleaning',    title: 'Data Cleaning',       route: '/modules/data-cleaning' },
      { topicId: 'missing-data',     title: 'Missing Data',        route: '/simulators/missing-data' },
      { topicId: 'encoding',         title: 'Encoding',            route: '/modules/encoding' },
      { topicId: 'feature-scaling',  title: 'Feature Scaling',     route: '/modules/feature-scaling' },
      { topicId: 'train-test-split', title: 'Train/Test Split',    route: '/modules/train-test-split' },
      { topicId: 'linear-regression',title: 'Linear Regression',   route: '/linearregression' },
      { topicId: 'logistic-regression', title: 'Logistic Regression', route: '/logisticregression' },
      { topicId: 'eval-metrics',     title: 'Evaluation Metrics',  route: '/simulators/eval-metrics' },
      { topicId: 'cross-validation', title: 'Cross-Validation',    route: '/modules/cross-validation' },
      { topicId: 'bias-variance',    title: 'Bias-Variance Tradeoff', route: '/modules/bias-variance' },
    ],
    miniProject: {
      title: 'House Price Predictor',
      description: 'Clean a real estate dataset, handle missing values, encode categoricals, scale features, train a regression model, and evaluate it properly.',
      deliverable: 'A trained model that predicts house prices with documented evaluation metrics.',
    },
  },
  {
    id: 'intermediate-ml',
    title: 'Intermediate ML',
    goal: 'Move beyond basics — master tree-based models, handle imbalanced data, and interpret your models.',
    prerequisiteLevel: 'Beginner ML',
    estimatedHours: 10,
    icon: '🌿',
    color: 'indigo',
    gradient: 'from-indigo-600 to-purple-500',
    accentColor: 'text-indigo-600',
    topics: [
      { topicId: 'decision-tree',    title: 'Decision Tree',        route: '/decision-tree' },
      { topicId: 'random-forest',    title: 'Random Forest',        route: '/random-forest' },
      { topicId: 'class-imbalance',  title: 'Class Imbalance',      route: '/simulators/class-imbalance' },
      { topicId: 'threshold-tuning', title: 'Threshold Tuning',     route: '/modules/threshold-tuning' },
      { topicId: 'bias-variance',    title: 'Bias-Variance Tradeoff', route: '/modules/bias-variance' },
      { topicId: 'error-analysis',   title: 'Error Analysis',       route: '/modules/error-analysis' },
      { topicId: 'xgboost',          title: 'XGBoost',              route: '/xgboost' },
    ],
    miniProject: {
      title: 'Fraud Detection System',
      description: 'Build a fraud detection model on an imbalanced dataset. Apply resampling, tune threshold for high recall, and analyse model errors.',
      deliverable: 'A fraud classifier with documented precision/recall tradeoff and error analysis.',
    },
  },
  {
    id: 'nlp-basics',
    title: 'NLP Basics',
    goal: 'Understand how machines process text — from word counts to semantic embeddings.',
    prerequisiteLevel: 'None',
    estimatedHours: 7,
    icon: '📖',
    color: 'violet',
    gradient: 'from-violet-600 to-fuchsia-500',
    accentColor: 'text-violet-600',
    topics: [
      { topicId: 'bag-of-words',       title: 'Bag-of-Words',        route: '/bag-of-words' },
      { topicId: 'tf-idf',             title: 'TF-IDF',              route: '/tf-idf' },
      { topicId: 'n-grams',            title: 'N-Grams',             route: '/n-grams' },
      { topicId: 'word2vec',           title: 'Word2Vec',            route: '/word2vec' },
      { topicId: 'tokenization',       title: 'Tokenization',        route: '/modules/tokenization' },
      { topicId: 'embeddings',         title: 'Embeddings',          route: '/modules/embeddings' },
      { topicId: 'text-classification',title: 'Text Classification', route: '/modules/text-classification' },
      { topicId: 'similarity-search',  title: 'Similarity Search',   route: '/modules/similarity-search' },
    ],
    miniProject: {
      title: 'Document Search Engine',
      description: 'Build a semantic search engine over a small corpus using TF-IDF and embeddings, with ranked results.',
      deliverable: 'A working search UI that returns relevant documents for any query.',
    },
  },
  {
    id: 'genai-builder',
    title: 'GenAI Builder',
    goal: 'Learn to build production-ready GenAI applications with LLMs, RAG, and responsible guardrails.',
    prerequisiteLevel: 'NLP Basics',
    estimatedHours: 12,
    icon: '✨',
    color: 'amber',
    gradient: 'from-amber-500 to-orange-500',
    accentColor: 'text-amber-600',
    topics: [
      { topicId: 'transformers',        title: 'Transformers',           route: '/transformers' },
      { topicId: 'llm-basics',          title: 'LLM Basics',             route: '/modules/llm-basics' },
      { topicId: 'prompt-engineering',  title: 'Prompt Engineering',     route: '/simulators/prompt-engineering' },
      { topicId: 'context-windows',     title: 'Context Windows',        route: '/modules/context-windows' },
      { topicId: 'embeddings',          title: 'Embeddings',             route: '/modules/embeddings' },
      { topicId: 'vector-databases',    title: 'Vector Databases',       route: '/modules/vector-databases' },
      { topicId: 'rag',                 title: 'RAG',                    route: '/simulators/rag' },
      { topicId: 'hallucination-control', title: 'Hallucination Control', route: '/modules/hallucination-control' },
      { topicId: 'agents',              title: 'Agents',                 route: '/modules/agents' },
      { topicId: 'bias-fairness',       title: 'Responsible AI',         route: '/modules/bias-fairness' },
    ],
    miniProject: {
      title: 'RAG Q&A Assistant',
      description: 'Build a document Q&A system using embeddings and RAG. Tune chunk size, retrieval, and add hallucination guardrails.',
      deliverable: 'A working RAG pipeline that answers questions faithfully from a document corpus.',
    },
  },
  {
    id: 'production-ai',
    title: 'Production AI',
    goal: 'Learn to deploy, monitor, and maintain ML systems that work reliably in the real world.',
    prerequisiteLevel: 'Intermediate ML',
    estimatedHours: 10,
    icon: '🏭',
    color: 'rose',
    gradient: 'from-rose-600 to-pink-500',
    accentColor: 'text-rose-600',
    topics: [
      { topicId: 'deployment-basics',   title: 'Deployment Basics',      route: '/modules/deployment-basics' },
      { topicId: 'inference-patterns',  title: 'Inference Patterns',     route: '/modules/inference-patterns' },
      { topicId: 'drift-monitoring',    title: 'Drift Monitoring',       route: '/simulators/drift-monitoring' },
      { topicId: 'retraining-triggers', title: 'Retraining Triggers',    route: '/modules/retraining-triggers' },
      { topicId: 'ab-testing',          title: 'A/B Testing',            route: '/modules/ab-testing' },
      { topicId: 'failure-handling',    title: 'Failure Handling',       route: '/modules/failure-handling' },
      { topicId: 'bias-fairness',       title: 'Bias & Fairness',        route: '/modules/bias-fairness' },
    ],
    miniProject: {
      title: 'Live Model Monitor',
      description: 'Simulate deploying a classifier, introduce feature drift over time, detect performance degradation, and trigger a retrain.',
      deliverable: 'A monitoring dashboard showing model accuracy degradation and a retrain workflow.',
    },
  },
]

export const getPathById = (id: PathId): LearningPath | undefined =>
  learningPaths.find((p) => p.id === id)
