export interface ModelData {
  id: string
  title: string
  description: string
  category: 'Regression' | 'Classification' | 'Optimization' | 'Clustering' | 'Dimensionality Reduction' | 'Deep Learning' | 'Computer Vision' | 'NLP' | 'Generative' | 'Reinforcement'
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
    category: "Regression",
    difficulty: "Beginner",
    estimatedTime: "8-12 minutes",
    keyConcepts: ["Loss Functions", "Gradient Descent", "Model Fitting", "Predictions"],
    icon: "📈",
    color: "blue",
    status: "Active"
  },
  {
    id: "logistic-regression",
    title: "Logistic Regression",
    description: "Predicts the probability of a binary outcome using a logistic function.",
    category: "Classification",
    difficulty: "Beginner",
    estimatedTime: "10-15 minutes",
    keyConcepts: ["Classification", "Sigmoid Function", "Decision Boundaries", "Probability"],
    icon: "🎯",
    color: "emerald",
    status: "Active"
  },
  {
    id: "gradient-descent",
    title: "Gradient Descent",
    description: "Visualize how models optimize parameters by descending the loss surface.",
    category: "Optimization",
    difficulty: "Intermediate",
    estimatedTime: "12-18 minutes",
    keyConcepts: ["Gradients", "Learning Rate", "Convergence", "Optimization"],
    icon: "📉",
    color: "indigo",
    status: "Active"
  },
  {
    id: "kmeans-clustering",
    title: "K-Means Clustering",
    description: "Groups data into K clusters based on similarity.",
    category: "Clustering",
    difficulty: "Intermediate",
    estimatedTime: "15 minutes",
    keyConcepts: ["Centroids", "Euclidean Distance", "Clusters"],
    icon: "🧩",
    color: "amber",
    status: "Active"
  },
  {
    id: "decision-tree",
    title: "Decision Tree",
    description: "Splits data into branches based on feature values to make decisions.",
    category: "Classification",
    difficulty: "Beginner",
    estimatedTime: "12 minutes",
    keyConcepts: ["Entropy", "Information Gain", "Splits"],
    icon: "🌳",
    color: "emerald",
    status: "Active"
  },
  {
    id: "svm",
    title: "SVM (Support Vector Machine)",
    description: "Finds the optimal hyperplane that best separates classes.",
    category: "Classification",
    difficulty: "Advanced",
    estimatedTime: "20 minutes",
    keyConcepts: ["Hyperplanes", "Kernels", "Margins"],
    icon: "⚖️",
    color: "rose",
    status: "Coming Soon"
  },
  {
    id: "knn",
    title: "K-Nearest Neighbors",
    description: "Classifies a data point based on the classes of its nearest neighbors.",
    category: "Classification",
    difficulty: "Beginner",
    estimatedTime: "10 minutes",
    keyConcepts: ["Neighbors", "K-Value", "Distance"],
    icon: "👥",
    color: "emerald",
    status: "Coming Soon"
  },
  {
    id: "hierarchical-clustering",
    title: "Hierarchical Clustering",
    description: "Creates a hierarchy of clusters by progressively merging or splitting them.",
    category: "Clustering",
    difficulty: "Intermediate",
    estimatedTime: "18 minutes",
    keyConcepts: ["Dendrogram", "Agglomerative", "Divisive"],
    icon: "🪜",
    color: "amber",
    status: "Coming Soon"
  },
  {
    id: "pca",
    title: "Principal Component Analysis (PCA)",
    description: "Reduces dimensionality while preserving the most important information.",
    category: "Dimensionality Reduction",
    difficulty: "Intermediate",
    estimatedTime: "15 minutes",
    keyConcepts: ["Eigenvectors", "Variance", "Components"],
    icon: "📉",
    color: "indigo",
    status: "Coming Soon"
  },
  {
    id: "naive-bayes",
    title: "Naive Bayes",
    description: "Uses Bayes' theorem with strong independence assumptions between features.",
    category: "Classification",
    difficulty: "Beginner",
    estimatedTime: "10 minutes",
    keyConcepts: ["Probability", "Bayes Theorem", "Prior"],
    icon: "🔔",
    color: "emerald",
    status: "Coming Soon"
  },
  {
    id: "random-forest",
    title: "Random Forest",
    description: "An ensemble of decision trees that improves prediction accuracy.",
    category: "Classification",
    difficulty: "Intermediate",
    estimatedTime: "20 minutes",
    keyConcepts: ["Ensemble", "Bagging", "Voters"],
    icon: "🌲",
    color: "emerald",
    status: "Active"
  },
  {
    id: "tf-idf",
    title: "TF-IDF",
    description: "Evaluates how important a word is to a document in a collection.",
    category: "NLP",
    difficulty: "Beginner",
    estimatedTime: "10-15 minutes",
    keyConcepts: ["Term Frequency", "Inverse Document Frequency", "Vector Space", "Text Processing"],
    icon: "🔤",
    color: "fuchsia",
    status: "Active"
  },
  {
    id: "word2vec",
    title: "Word2Vec",
    description: "Learns continuous vector representations of words based on their context.",
    category: "NLP",
    difficulty: "Intermediate",
    estimatedTime: "15-20 minutes",
    keyConcepts: ["Embeddings", "Skip-gram", "CBOW", "Cosine Similarity"],
    icon: "🌌",
    color: "purple",
    status: "Active"
  },
  {
    id: "bag-of-words",
    title: "Bag-of-Words",
    description: "Represents text as an unordered collection of words, keeping track of frequencies.",
    category: "NLP",
    difficulty: "Beginner",
    estimatedTime: "10 minutes",
    keyConcepts: ["Corpus", "Vocabulary", "Word Counts", "Sparse Vectors"],
    icon: "🛍️",
    color: "sky",
    status: "Active"
  },
  {
    id: "n-grams",
    title: "N-Grams",
    description: "Analyzes sequences of N consecutive words to capture local context.",
    category: "NLP",
    difficulty: "Beginner",
    estimatedTime: "10-15 minutes",
    keyConcepts: ["Unigrams", "Bigrams", "Trigrams", "Context Window"],
    icon: "🔗",
    color: "teal",
    status: "Active"
  }
]
