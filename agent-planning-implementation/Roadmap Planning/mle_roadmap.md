# ML Engineer Skills Checklist

A 100-skill, category-by-category checklist for becoming a proficient Machine Learning Engineer.
Inspired by the AI Engineering Skills Checklist by Marina Wyss (https://www.linkedin.com/in/marina-wyss/).

---

## 1. Technical Foundation (8 skills)

- [ ] Basic statistics and probability
- [ ] Probability distributions and their applications
- [ ] Hypothesis testing and p-values
- [ ] Linear algebra: vectors, matrices, matrix factorization
- [ ] Calculus: derivatives, gradients, chain rule
- [ ] Understanding of numerical precision (float16, float32, bfloat16)
- [ ] Data structures and algorithm complexity (Big-O)
- [ ] Information theory basics: entropy, KL divergence

---

## 2. Python for ML (7 skills)

- [ ] Functions, classes, and modules
- [ ] Core data structures and when to use each
- [ ] Writing readable, well-documented code
- [ ] Virtual environments and dependency management
- [ ] Reading and debugging tracebacks
- [ ] Working with configuration files and CLI arguments
- [ ] Profiling and benchmarking Python code

---

## 3. Data Engineering & Wrangling (8 skills)

- [ ] Loading and parsing data with Pandas and Polars
- [ ] Handling missing values and data quality issues
- [ ] Exploratory data analysis (EDA) and visualization
- [ ] Feature engineering: encoding, scaling, binning
- [ ] Working with large datasets that don't fit in memory
- [ ] SQL for data retrieval and transformation
- [ ] Building reproducible data pipelines (e.g., DVC, Prefect, Airflow)
- [ ] Joining, aggregating, and reshaping structured data

---

## 4. Core ML Concepts (8 skills)

- [ ] Supervised vs. unsupervised vs. self-supervised learning
- [ ] Common algorithms: linear/logistic regression, decision trees, SVMs, k-NN
- [ ] Ensemble methods: bagging, boosting, gradient boosted trees
- [ ] Training/validation/test splits and cross-validation
- [ ] Overfitting, underfitting, and bias-variance tradeoff
- [ ] Regularization techniques: L1, L2, dropout, early stopping
- [ ] Hyperparameter tuning: grid search, random search, Bayesian optimization
- [ ] Dimensionality reduction: PCA, t-SNE, UMAP

---

## 5. Deep Learning (8 skills)

- [ ] Feedforward neural networks and backpropagation
- [ ] Convolutional neural networks (CNNs) for vision
- [ ] Recurrent networks: RNNs, LSTMs, GRUs for sequences
- [ ] Transformer architecture and self-attention
- [ ] Loss functions and when to use each
- [ ] Optimizers: SGD, Adam, AdaGrad, and their tradeoffs
- [ ] Batch normalization, layer normalization
- [ ] Learning rate schedules and warm-up strategies

---

## 6. ML Frameworks & Tooling (6 skills)

- [ ] PyTorch training loop: forward pass, loss, backward, optimizer step
- [ ] TensorFlow / Keras for production and serving
- [ ] Scikit-learn for classical ML pipelines
- [ ] Experiment tracking with MLflow or W&B
- [ ] Debugging NaN losses and training instabilities
- [ ] Profiling GPU utilization and memory usage

---

## 7. Model Evaluation & Metrics (7 skills)

- [ ] Classification metrics: precision, recall, F1, AUC-ROC
- [ ] Regression metrics: RMSE, MAE, R-squared
- [ ] Ranking and retrieval metrics: NDCG, MAP, MRR
- [ ] Calibration of predicted probabilities
- [ ] Confusion matrix analysis and error attribution
- [ ] Evaluation under distribution shift (OOD performance)
- [ ] Defining a meaningful offline evaluation strategy before training

---

## 8. Feature Stores & Data Pipelines (5 skills)

- [ ] Difference between online and offline feature stores
- [ ] Point-in-time correctness to prevent data leakage
- [ ] Feature versioning and lineage tracking
- [ ] Building a training data pipeline end-to-end
- [ ] Using tools like Feast, Tecton, or Hopsworks

---

## 9. Model Training at Scale (7 skills)

- [ ] Distributed training: data parallelism vs. model parallelism
- [ ] Mixed-precision training (fp16/bf16 with gradient scaling)
- [ ] Gradient accumulation and checkpointing
- [ ] Multi-GPU training with DDP or FSDP
- [ ] Handling training instabilities (exploding/vanishing gradients)
- [ ] Efficient data loading with multi-process DataLoaders
- [ ] Resuming training from checkpoints reliably

---

## 10. Model Optimization & Compression (6 skills)

- [ ] Quantization: post-training and quantization-aware training
- [ ] Pruning: structured vs. unstructured sparsity
- [ ] Knowledge distillation: teacher-student training
- [ ] TensorRT and ONNX export for optimized inference
- [ ] Benchmarking latency and throughput tradeoffs
- [ ] Choosing the right optimization strategy for the target hardware

---

## 11. MLOps & Experimentation (7 skills)

- [ ] Version control for models, datasets, and configs
- [ ] Automated retraining pipelines and triggers
- [ ] A/B testing and shadow mode deployments
- [ ] Model registry for staging and production
- [ ] Feature flags for safe rollouts
- [ ] Building reproducible training runs (seeds, determinism, and config versioning)
- [ ] Documentation, experiment logging best practices, and model lineage tracking

---

## 12. Production Deployment (7 skills)

- [ ] Serving models with REST APIs (FastAPI, Flask, TorchServe)
- [ ] Containerizing ML services with Docker
- [ ] Kubernetes basics for scalable model serving
- [ ] Batch inference vs. real-time inference architectures
- [ ] Autoscaling and load balancing for inference endpoints
- [ ] Blue/green and canary deployment strategies
- [ ] Cloud ML platforms: SageMaker, Vertex AI, Azure ML

---

## 13. Monitoring & Observability (6 skills)

- [ ] Data drift detection in production
- [ ] Model performance degradation alerts
- [ ] Logging predictions, inputs, and feature distributions
- [ ] Setting up dashboards for model health (Grafana, DataDog)
- [ ] Root cause analysis of production model failures
- [ ] Feedback loops: capturing ground truth labels post-deployment

---

## 14. ML System Design (5 skills)

- [ ] Framing a business problem as an ML problem
- [ ] Choosing between heuristics, classical ML, and deep learning
- [ ] Designing a training-serving architecture end-to-end
- [ ] Estimating compute, data, and cost requirements upfront
- [ ] Trade-offs between model accuracy and system latency

---

## 15. Responsible AI & Ethics (5 skills)

- [ ] Bias detection and fairness metrics across demographic groups
- [ ] Interpretability methods: SHAP, LIME, attention maps
- [ ] Model cards and documentation for transparency
- [ ] Data privacy considerations and regulatory compliance (GDPR)
- [ ] Thinking critically about the downstream impact of your model

---

**Total: 100 skills across 15 categories**

> The one thing to take away: don't wait until you know everything. Pick a project, build a pipeline end-to-end, and go deep on whatever breaks. That's how real ML engineers learn.
