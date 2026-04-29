import React, { useState } from 'react'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'

export const DataScienceConceptsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const allConcepts = [
    {
      title: "Data Preprocessing and Cleaning",
      description: "Preparing raw data by handling inconsistencies, formatting errors, duplicates, and standardizing values. This foundational step significantly impacts downstream model quality and performance, often consuming majority of data science time.",
      icon: "🧹"
    },
    {
      title: "Handling Missing Data",
      description: "Techniques for dealing with incomplete datasets, including deletion (removal of rows/columns), imputation (mean, median, forward-fill), and advanced methods like KNN imputation or prediction-based filling.",
      icon: "🧩"
    },
    {
      title: "Outlier Detection and Treatment",
      description: "Identifying and handling anomalous data points using statistical methods (z-score, IQR), isolation forests, or domain knowledge. Outliers can be removed, capped, or separately modeled depending on their origin and impact.",
      icon: "🎯"
    },
    {
      title: "Encoding Categorical Variables",
      description: "Converting categorical features into numerical representations using one-hot encoding, label encoding, target encoding, or ordinal encoding, enabling algorithms to process non-numeric data effectively.",
      icon: "🔠"
    },
    {
      title: "Feature Scaling and Normalization",
      description: "Standardizing input features to a common scale (e.g., 0-1 or mean=0, std=1) to ensure that features with larger ranges don't dominate the model training process and to improve convergence speed of optimization algorithms.",
      icon: "📏"
    },
    {
      title: "Data Sampling and Stratification",
      description: "Techniques for selecting subsets of data (random, systematic, stratified) to manage large datasets, ensure representative samples, and maintain class distribution in classification problems for unbiased training and evaluation.",
      icon: "📊"
    },
    {
      title: "Data Splitting",
      description: "Dividing data into training, validation, and test sets to properly evaluate model performance. Proper splitting ensures unbiased performance estimates and prevents data leakage that could overestimate model effectiveness.",
      icon: "✂️"
    },
    {
      title: "Train-Test Data Leakage",
      description: "A critical problem where information from the test set inadvertently influences model training, leading to overly optimistic performance estimates. Prevention involves careful ordering of preprocessing and proper data splitting.",
      icon: "💧"
    },
    {
      title: "Class Imbalance",
      description: "A problem where the distribution of target classes is skewed (e.g., 95% negative, 5% positive). Solutions include oversampling, undersampling, SMOTE, adjusted class weights, and threshold tuning to handle imbalanced datasets effectively.",
      icon: "⚖️"
    },
    {
      title: "Feature Engineering",
      description: "The process of creating new features from raw data or transforming existing features to make them more predictive and informative. This includes domain expertise application, feature creation, and feature selection to improve model performance.",
      icon: "🛠️"
    },
    {
      title: "Multicollinearity Detection",
      description: "Identifying when features are highly correlated with each other, which can cause instability in coefficient estimates and reduce model interpretability. Detected using correlation matrices and VIF (Variance Inflation Factor) analysis.",
      icon: "🔍"
    },
    {
      title: "Dimensionality Reduction",
      description: "Techniques like PCA, t-SNE, and UMAP that reduce the number of features while preserving important information, reducing computational complexity, eliminating multicollinearity, and improving visualization of high-dimensional data.",
      icon: "📉"
    },
    {
      title: "Feature Selection",
      description: "The process of choosing a subset of relevant features to improve model interpretability and performance. Methods include filter methods (correlation), wrapper methods (recursive elimination), and embedded methods (L1 regularization).",
      icon: "✅"
    },
    {
      title: "Evaluation Metrics Selection",
      description: "Choosing appropriate metrics (accuracy, precision, recall, F1, ROC-AUC, RMSE) based on business objectives and problem type. Different metrics suit different scenarios; selecting the wrong metric can mislead model performance assessment.",
      icon: "📈"
    },
    {
      title: "Bias-Variance Tradeoff",
      description: "A fundamental concept describing the tension between model simplicity (high bias, low variance) and complexity (low bias, high variance). Understanding this tradeoff helps select appropriate model complexity for optimal generalization.",
      icon: "🤹"
    },
    {
      title: "Cross-Validation",
      description: "A model evaluation technique that splits data into multiple folds to assess model performance more robustly. K-fold, stratified, and time-series cross-validation help prevent overfitting and provide reliable performance estimates.",
      icon: "🔁"
    },
    {
      title: "Regularization Techniques",
      description: "Methods like L1 (Lasso), L2 (Ridge), and Elastic Net that add penalty terms to the loss function to prevent overfitting by constraining model complexity and encouraging simpler models with better generalization.",
      icon: "🚧"
    },
    {
      title: "Hyperparameter Tuning",
      description: "The process of optimizing hyperparameters (learning rate, tree depth, regularization strength) using techniques like grid search, random search, or Bayesian optimization to maximize model performance on validation data.",
      icon: "⚙️"
    },
    {
      title: "Ensemble Methods and Stacking",
      description: "Combining multiple models to improve predictions through voting, averaging, or weighted combinations. Techniques like bagging, boosting, and stacking leverage model diversity to achieve better performance than individual models.",
      icon: "🤝"
    },
    {
      title: "Feature Importance and Interpretation",
      description: "Analyzing which features most strongly influence model predictions using techniques like permutation importance, SHAP values, and LIME. This aids model understanding, debugging, and communication of results to stakeholders.",
      icon: "💡"
    }
  ]

  const filteredConcepts = allConcepts.filter(concept =>
    concept.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    concept.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#fafbfc] font-sans flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 pb-24 container-wide px-6 md:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 tracking-tight">
            Data Science <span className="font-hand text-blue-600">Concepts</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-3xl mx-auto mb-8 leading-relaxed">
            Master the core concepts of Data Science and Machine Learning. The learning path is thoughtfully ordered below—starting from foundational data processing and moving through model evaluation and optimization.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              type="text" 
              placeholder="Search concepts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 pl-14 pr-6 bg-white border border-slate-200 rounded-2xl text-base shadow-sm group-hover:shadow-md focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-slate-300"
            />
          </div>
        </div>

        {filteredConcepts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {filteredConcepts.map((concept, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-6xl transform translate-x-4 -translate-y-4">
                  {concept.icon}
                </div>
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-2xl mb-5 shadow-sm border border-blue-100 relative z-10">
                  {concept.icon}
                </div>
                <div className="flex items-center space-x-3 mb-3 relative z-10">
                  <h3 className="text-xl font-bold text-slate-800 leading-tight">
                    {concept.title}
                  </h3>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed relative z-10 flex-grow">
                  {concept.description}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-slate-400 text-lg">No concepts found matching your search.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
