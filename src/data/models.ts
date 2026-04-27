
export type Category = 
  | 'Supervised Learning' 
  | 'Unsupervised Learning' 
  | 'Regression' 
  | 'Classification' 
  | 'Clustering' 
  | 'Dimensionality Reduction' 
  | 'NLP'

export interface ModelData {
  id: string
  title: string
  description: string
  categories: Category[]
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  estimatedTime: string
  keyConcepts: string[]
  icon: string
  color: string
  status: 'Active' | 'Coming Soon'
  featured?: boolean
}

export const models: ModelData[] = [
  {
    id: "linear-regression",
    title: "Linear Regression",
    description: "Predicts a continuous value based on a linear relationship between features.",
    categories: ["Regression", "Supervised Learning"],
    difficulty: "Beginner",
    estimatedTime: "8-12 minutes",
    keyConcepts: ["Loss Functions", "Gradient Descent", "Model Fitting", "Predictions"],
    icon: "📈",
    color: "blue",
    status: "Active"
  },
  {
    id: "gradient-descent",
    title: "Gradient Descent",
    description: "Visualize how models optimize parameters by descending the loss surface.",
    categories: ["Regression", "Classification", "Supervised Learning"],
    difficulty: "Intermediate",
    estimatedTime: "12-18 minutes",
    keyConcepts: ["Gradients", "Learning Rate", "Convergence", "Optimization"],
    icon: "📉",
    color: "indigo",
    status: "Active"
  },
  {
    id: "logistic-regression",
    title: "Logistic Regression",
    description: "Predicts the probability of a binary outcome using a logistic function.",
    categories: ["Classification", "Supervised Learning"],
    difficulty: "Beginner",
    estimatedTime: "10-15 minutes",
    keyConcepts: ["Classification", "Sigmoid Function", "Decision Boundaries", "Probability"],
    icon: "🎯",
    color: "emerald",
    status: "Active"
  },
  {
    id: "decision-tree",
    title: "Decision Tree",
    description: "Splits data into branches based on feature values to make decisions.",
    categories: ["Classification", "Regression", "Supervised Learning"],
    difficulty: "Beginner",
    estimatedTime: "12 minutes",
    keyConcepts: ["Entropy", "Information Gain", "Splits"],
    icon: "🌳",
    color: "emerald",
    status: "Active"
  },
  {
    id: "random-forest",
    title: "Random Forest",
    description: "An ensemble of decision trees that improves prediction accuracy.",
    categories: ["Classification", "Regression", "Supervised Learning"],
    difficulty: "Intermediate",
    estimatedTime: "20 minutes",
    keyConcepts: ["Ensemble", "Bagging", "Voters"],
    icon: "🌲",
    color: "emerald",
    status: "Active"
  },
  {
    id: "xgboost",
    title: "XGBoost",
    description: "Extreme Gradient Boosting - a highly efficient and accurate ensemble method.",
    categories: ["Classification", "Regression", "Supervised Learning"],
    difficulty: "Advanced",
    estimatedTime: "25 minutes",
    keyConcepts: ["Boosting", "Regularization", "Trees"],
    icon: "🚀",
    color: "orange",
    status: "Active"
  },
  {
    id: "adaboost",
    title: "AdaBoost",
    description: "Adaptive Boosting - focuses on hard-to-classify points by adjusting weights.",
    categories: ["Classification", "Regression", "Supervised Learning"],
    difficulty: "Intermediate",
    estimatedTime: "20 minutes",
    keyConcepts: ["Weak Learners", "Weighting", "Ensemble"],
    icon: "📈",
    color: "red",
    status: "Active"
  },
  {
    id: "catboost",
    title: "CatBoost",
    description: "Categorical Boosting - specialized for handling categorical features efficiently.",
    categories: ["Classification", "Regression", "Supervised Learning"],
    difficulty: "Advanced",
    estimatedTime: "25 minutes",
    keyConcepts: ["Categorical", "Symmetric Trees", "Ordered Boosting"],
    icon: "🐱",
    color: "purple",
    status: "Active"
  },
  {
    id: "svm",
    title: "SVM (Support Vector Machines)",
    description: "Finds the optimal hyperplane that best separates classes.",
    categories: ["Classification", "Regression", "Supervised Learning"],
    difficulty: "Advanced",
    estimatedTime: "20 minutes",
    keyConcepts: ["Hyperplanes", "Kernels", "Margins"],
    icon: "⚖️",
    color: "rose",
    status: "Active"
  },
  {
    id: "knn",
    title: "K-Nearest Neighbors",
    description: "Classifies a data point based on the classes of its nearest neighbors.",
    categories: ["Classification", "Regression", "Supervised Learning"],
    difficulty: "Beginner",
    estimatedTime: "10 minutes",
    keyConcepts: ["Neighbors", "K-Value", "Distance"],
    icon: "👥",
    color: "emerald",
    status: "Active"
  },
  {
    id: "naive-bayes",
    title: "Naive Bayes",
    description: "Uses Bayes' theorem with strong independence assumptions between features.",
    categories: ["Classification", "Supervised Learning"],
    difficulty: "Beginner",
    estimatedTime: "10 minutes",
    keyConcepts: ["Probability", "Bayes Theorem", "Prior"],
    icon: "🔔",
    color: "emerald",
    status: "Active"
  },
  {
    id: "kmeans-clustering",
    title: "K-Means Clustering",
    description: "Groups data into K clusters based on similarity.",
    categories: ["Clustering", "Unsupervised Learning"],
    difficulty: "Intermediate",
    estimatedTime: "15 minutes",
    keyConcepts: ["Centroids", "Euclidean Distance", "Clusters"],
    icon: "🧩",
    color: "amber",
    status: "Active"
  },
  {
    id: "hierarchical-clustering",
    title: "Hierarchical Clustering",
    description: "Creates a hierarchy of clusters by progressively merging or splitting them.",
    categories: ["Clustering", "Unsupervised Learning"],
    difficulty: "Intermediate",
    estimatedTime: "18 minutes",
    keyConcepts: ["Dendrogram", "Agglomerative", "Divisive"],
    icon: "🪜",
    color: "amber",
    status: "Active"
  },
  {
    id: "pca",
    title: "PCA (Principal Component Analysis)",
    description: "Reduces dimensionality while preserving the most important information.",
    categories: ["Dimensionality Reduction", "Unsupervised Learning"],
    difficulty: "Intermediate",
    estimatedTime: "15 minutes",
    keyConcepts: ["Eigenvectors", "Variance", "Components"],
    icon: "📉",
    color: "indigo",
    status: "Active"
  },
  {
    id: "bag-of-words",
    title: "Bag-of-Words",
    description: "Represents text as an unordered collection of words, keeping track of frequencies.",
    categories: ["NLP"],
    difficulty: "Beginner",
    estimatedTime: "10 minutes",
    keyConcepts: ["Corpus", "Vocabulary", "Word Counts", "Sparse Vectors"],
    icon: "🛍️",
    color: "sky",
    status: "Active"
  },
  {
    id: "tf-idf",
    title: "TF-IDF",
    description: "Evaluates how important a word is to a document in a collection.",
    categories: ["NLP"],
    difficulty: "Beginner",
    estimatedTime: "10-15 minutes",
    keyConcepts: ["Term Frequency", "Inverse Document Frequency", "Vector Space", "Text Processing"],
    icon: "🔤",
    color: "fuchsia",
    status: "Active"
  },
  {
    id: "n-grams",
    title: "N-Grams",
    description: "Analyzes sequences of N consecutive words to capture local context.",
    categories: ["NLP"],
    difficulty: "Beginner",
    estimatedTime: "10-15 minutes",
    keyConcepts: ["Unigrams", "Bigrams", "Trigrams", "Context Window"],
    icon: "🔗",
    color: "teal",
    status: "Active"
  },
  {
    id: "word2vec",
    title: "Word2Vec",
    description: "Learns continuous vector representations of words based on their context.",
    categories: ["NLP"],
    difficulty: "Intermediate",
    estimatedTime: "15-20 minutes",
    keyConcepts: ["Embeddings", "Skip-gram", "CBOW", "Cosine Similarity"],
    icon: "🌌",
    color: "purple",
    status: "Active"
  }
]
