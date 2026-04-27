// Linear Regression
export { LinearRegression } from './LinearRegression'
export { LINEAR_REGRESSION_PRESETS } from './LinearRegression'
export type {
  LinearRegressionParams,
  LinearRegressionResults,
  LinearRegressionState,
} from './LinearRegression'

// Gradient Descent
export { GradientDescent } from './GradientDescent'
export type {
  GradientDescentOptions,
  GradientDescentState,
  Point2D,
  CostFunctionType,
} from './GradientDescent'

// Logistic Regression
export { LogisticRegression, generateClassificationData } from './LogisticRegression'
export type {
  LogisticRegressionParams,
  LogisticRegressionState,
  ClassificationData,
} from './LogisticRegression'

// Shared utilities
export * from './shared'

// K-Means Clustering
export { KMeans, generateKMeansData } from './KMeans'
export type {
  KMeansPoint,
  KMeansCentroid,
  KMeansState,
  KMeansDataset,
} from './KMeans'

// TF-IDF
export { TFIDF } from './TFIDF'
export type { TFIDFState, Document as TFIDFDocument } from './TFIDF'

// Word2Vec
export { Word2VecSimulator } from './Word2Vec'
export type { Word2VecState, WordEmbedding } from './Word2Vec'

// Bag of Words
export { BagOfWords } from './BagOfWords'
export type { BagOfWordsState, Document as BoWDocument } from './BagOfWords'

// N-Grams
export { NGramsSimulator } from './NGrams'
export type { NGramsState, NGram } from './NGrams'

// Decision Tree
export { DecisionTree, generateMultiClassData } from './DecisionTree'
export type { DecisionTreeNode, DecisionTreeParams, DecisionTreeState } from './DecisionTree'


// Random Forest
export { RandomForest } from './RandomForest'
export type { RandomForestParams, RandomForestState } from './RandomForest'


