# Data Scientist Skills Checklist

A 100-skill, category-by-category checklist for becoming a proficient Data Scientist.
Inspired by the AI Engineering Skills Checklist by Marina Wyss (https://www.linkedin.com/in/marina-wyss/).

---

## 1. Statistics & Probability (9 skills)

- [ ] Descriptive statistics: mean, median, variance, standard deviation
- [ ] Probability theory: conditional probability, Bayes theorem
- [ ] Common distributions: normal, binomial, Poisson, exponential
- [ ] Central limit theorem and its practical implications
- [ ] Hypothesis testing: t-tests, chi-square, ANOVA
- [ ] p-values and statistical significance (and their limitations)
- [ ] Confidence intervals and margin of error
- [ ] Correlation vs. causation
- [ ] Effect size and statistical power

---

## 2. Python for Data Science (7 skills)

- [ ] Data manipulation with Pandas and Polars
- [ ] Numerical computing with NumPy
- [ ] Visualization with Matplotlib and Seaborn
- [ ] Interactive notebooks with Jupyter
- [ ] Writing reusable functions and analysis scripts
- [ ] Virtual environments and dependency management
- [ ] Reading documentation and source code to understand library behavior

---

## 3. Data Wrangling & EDA (8 skills)

- [ ] Loading data from CSV, JSON, Parquet, databases
- [ ] Handling missing values: imputation strategies and trade-offs
- [ ] Detecting and treating outliers
- [ ] Exploratory data analysis: distributions, correlations, anomalies
- [ ] Data profiling for quality assessment
- [ ] Merging, joining, and reshaping datasets
- [ ] Dealing with imbalanced datasets
- [ ] Identifying data leakage before training

---

## 4. SQL & Databases (7 skills)

- [ ] Writing complex SQL: joins, subqueries, window functions
- [ ] Aggregations and GROUP BY patterns for analysis
- [ ] Writing queries that perform well at scale
- [ ] Working with both relational and NoSQL data stores
- [ ] Extracting features from production databases safely
- [ ] Understanding database indexes and query plans at a high level
- [ ] Optimizing query execution with EXPLAIN ANALYZE and index tuning

---

## 5. Core ML Concepts (8 skills)

- [ ] Supervised vs. unsupervised vs. self-supervised learning
- [ ] Linear and logistic regression in depth
- [ ] Decision trees, random forests, and gradient boosted trees (XGBoost, LightGBM)
- [ ] Clustering algorithms: k-means, DBSCAN, hierarchical
- [ ] Training/validation/test splits and cross-validation
- [ ] Bias-variance tradeoff and regularization (L1, L2)
- [ ] Hyperparameter tuning: grid search, random search, Bayesian methods
- [ ] Dimensionality reduction: PCA, t-SNE, UMAP

---

## 6. Model Evaluation & Metrics (7 skills)

- [ ] Classification: precision, recall, F1, AUC-ROC, log loss
- [ ] Regression: RMSE, MAE, R-squared, MAPE
- [ ] Ranking and recommendation metrics: NDCG, MAP
- [ ] Calibration of predicted probabilities
- [ ] Confusion matrix analysis and error decomposition
- [ ] Choosing the right metric for the business problem
- [ ] Evaluating models under distribution shift (OOD data)

---

## 7. Experimentation & A/B Testing (6 skills)

- [ ] Designing statistically valid A/B tests
- [ ] Sample size calculation and power analysis
- [ ] Handling multiple testing and Type I error inflation
- [ ] Interpreting experiment results without overfitting to noise
- [ ] Novelty effects and how to account for them
- [ ] Bayesian vs. frequentist approaches to experimentation

---

## 8. Deep Learning Fundamentals (7 skills)

- [ ] Neural network architecture: layers, activations, forward pass
- [ ] Backpropagation and gradient descent intuitively
- [ ] CNNs for vision and RNNs / transformers for sequences
- [ ] Transfer learning and pretrained models
- [ ] PyTorch or TensorFlow basics for building and training models
- [ ] Fine-tuning pretrained embeddings and language models
- [ ] Knowing when deep learning is overkill

---

## 9. Feature Engineering (6 skills)

- [ ] Encoding categorical variables: one-hot, target, ordinal
- [ ] Numerical feature transformations: log, standardization, binning
- [ ] Date/time feature extraction
- [ ] Interaction features and polynomial features
- [ ] Text features: TF-IDF, embeddings
- [ ] Domain-driven feature creation from business knowledge

---

## 10. Storytelling & Communication (7 skills)

- [ ] Building clear, insightful data visualizations
- [ ] Translating analytical findings into business recommendations
- [ ] Writing data science reports and executive summaries
- [ ] Structuring presentations: problem ? insight ? recommendation
- [ ] Explaining model behavior to non-technical audiences
- [ ] Visualizing uncertainty and confidence intervals
- [ ] Avoiding misleading charts and statistics

---

## 11. ML in Production (6 skills)

- [ ] Packaging models for serving (pickle, ONNX, joblib)
- [ ] Building lightweight REST APIs for model serving (FastAPI)
- [ ] Monitoring model performance post-deployment
- [ ] Detecting and responding to data and model drift
- [ ] Retraining pipelines and trigger strategies
- [ ] Collaborating with ML engineers on production handoff

---

## 12. Causal Inference & Business Analytics (6 skills)

- [ ] Difference-in-differences for policy evaluation
- [ ] Regression discontinuity design
- [ ] Instrumental variables at a conceptual level
- [ ] Counterfactual thinking for business decisions
- [ ] Propensity score matching for observational studies
- [ ] Synthetic control methods and sensitivity analysis

---

## 13. NLP & Text Analytics (6 skills)

- [ ] Text preprocessing: tokenization, stemming, lemmatization
- [ ] Bag-of-words and TF-IDF representations
- [ ] Sentiment analysis and semantic similarity
- [ ] Topic modeling with BERTopic and LDA
- [ ] Using pretrained language models (BERT, sentence transformers)
- [ ] Building text classifiers end-to-end

---

## 14. MLOps & Reproducibility (5 skills)

- [ ] Version controlling datasets and experiments with DVC or MLflow
- [ ] Reproducible analysis: seeds, pinned dependencies, locked environments
- [ ] Building modular, testable analysis pipelines
- [ ] Scheduling recurring analyses and reports
- [ ] Documenting data science work for teammates and future-you

---

## 15. Responsible Data Science (5 skills)

- [ ] Bias detection: measuring fairness across demographic groups
- [ ] Model interpretability: SHAP, LIME, partial dependence plots
- [ ] Ethical implications of the decisions your model drives
- [ ] Data privacy: anonymization, differential privacy concepts
- [ ] Model cards and documentation for transparency

---

**Total: 100 skills across 15 categories**

> The one thing to take away: data science is not about running models � it is about answering hard questions with data. Start with the question, not the technique. The best analysts are the ones who push back and ask "what decision will this actually change?"
